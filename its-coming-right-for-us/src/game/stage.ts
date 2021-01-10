import {get2DContext, getCanvas, getHeight, getWidth} from "./global-functions";
import {Drawable} from "./drawing/drawable";
import {Direction} from "./drawing/direction.enum";
import {ShootingCrosshair} from "./shooting-crosshair";
import {Point} from "./drawing/point";
import {CollisionUtils} from "./collision-utils";
import {AnimationType} from "./animations/animation-type.enum";
import {Duck} from "./enemy/duck";
import {StageConfig} from "./config/stages-config";
import {TimeUtils} from "./time-utils";

export class Stage {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private resolvePromise?: (value: unknown) => void;
    private rejectPromise?: (reason?: any) => void;

    ducks: Duck[] = [];
    private allEnemiesCreated = false;
    missed = 0;

    constructor(public stageNumber: number,
                private config: StageConfig,
                private grassHeight: number,
                private shootingCrosshair: ShootingCrosshair) {
        this.canvas = getCanvas();
        this.context = get2DContext()
    }

    async run() {
        console.log('current stage.run', this.stageNumber)
        const promise = new Promise((resolve, reject) => {
            this.resolvePromise = resolve;
            this.rejectPromise = reject;
        });
        this.createEnemies();
        return promise;
    }

    executeEveryFrameActions() {
        this.handleEnemiesMovment();
        if (this.allEnemiesCreated && this.ducks.length === 0) {
            if (!this.resolvePromise) {
                throw new Error('no this.resolvePromise')
            }
            this.resolvePromise(this.missed);
        }
    }

    private handleEnemiesMovment() {
        this.ducks
            .filter(duck => !duck.death)
            .forEach(duck => {
                // TODO change movment

                const isOutsidePLayableArea = duck.x < -duck.width
                    || duck.x > getWidth()
                    || duck.y > getHeight() - this.grassHeight
                    || duck.y < -duck.height;

                if (isOutsidePLayableArea) {
                    this.missed++;
                    this.removeDuck(duck);
                    console.log('missed', duck)
                } else {
                    const speedXY = this.getSpeedIncrease(duck);
                    duck.x += speedXY.x;
                    duck.y += speedXY.y;
                }

            });
        [...this.ducks]
            .filter(duck => duck.death && duck.falling)
            .forEach(duck => {
                duck.y += duck.animations.fallingSpeed;
                if (duck.y > getHeight() - this.grassHeight) {
                    this.removeDuck(duck);
                }
            });
    }

    private removeDuck(duck: Duck) {
        this.ducks.splice(this.ducks.indexOf(duck), 1);
    }

    getElementsToDraw(): Drawable[] {
        return [
            ...this.ducks,
            this.shootingCrosshair
        ];
    }

    shoot(point: Point) {
        // console.log('shoot', point)
        const duck = this.ducks.find(duck => !duck.death && CollisionUtils.isPointInDrawableBounds(point, duck));
        if (duck) {
            this.destroyEnemy(duck)
        }
    }

    private async createEnemies() {
        for (let enemyConfig of this.config.enemies) {
            await TimeUtils.waitMillis(enemyConfig.creationDelay);
            const enemy = new Duck(enemyConfig);
            this.ducks.push(enemy);
        }
        this.allEnemiesCreated = true;
    }


    private destroyEnemy(duck: Duck) {
        duck.death = true;
        this.shootingCrosshair.score += duck.scoreValue;
        duck.setAnimation(AnimationType.death);
        setTimeout(() => {
            duck.falling = true;
            duck.setAnimation(AnimationType.fall)
        }, duck.animations.timeBetweenDeathAndFallTime)
    }

    private getSpeedIncrease(duck: Duck): Point {
        const speedX = duck.direction === Direction.right ? duck.enemyConfig.speed : -duck.enemyConfig.speed;
        switch (duck.animationType) {
            case AnimationType.horizontal:
                return {x: speedX, y: 0};
            case AnimationType.vertical:
                return {x: 0, y: -duck.speed};
            case AnimationType.diagonal:
                return {x: speedX, y: -duck.speed};
            default:
                return {x: 0, y: 0};
        }
    }
}
