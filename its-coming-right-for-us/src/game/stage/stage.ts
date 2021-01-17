import {get2DContext, getCanvas, getHeight, getWidth} from "../global-functions";
import {Drawable} from "../drawing/drawable";
import {Direction} from "../drawing/direction.enum";
import {ShootingCrosshair} from "../shooting-crosshair";
import {Point} from "../drawing/point";
import {CollisionUtils} from "../utils/collision-utils";
import {DuckAnimationType} from "../duck/duck-animation-type.enum";
import {Duck} from "../duck/duck";
import {StageConfig} from "./stages-config";
import {TimeUtils} from "../utils/time-utils";
import {EnemyConfig} from "../enemy/enemy-config";

export class Stage {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private resolvePromise?: (value: unknown) => void;
    private rejectPromise?: (reason?: any) => void;

    ducks: Duck[] = [];
    private allEnemiesCreated = false;
    missed = 0;
    private enemiesConfig: EnemyConfig<DuckAnimationType>[] = [];
    private previousEnemyCreated = true;
    private previousEnemy?: Duck;

    constructor(public stageNumber: number,
                private config: StageConfig,
                private grassHeight: number,
                private shootingCrosshair: ShootingCrosshair) {
        this.canvas = getCanvas();
        this.context = get2DContext()
    }

    async run(): Promise<number> {
        console.log('current stage.run', this.stageNumber)
        const promise = new Promise((resolve, reject) => {
            this.resolvePromise = resolve;
            this.rejectPromise = reject;
        });
        this.enemiesConfig = [...this.config.enemies];
        return promise as Promise<number>;
    }

    executeEveryFrameActions() {
        this.handleEnemiesMovment();
        this.createNextEnemy().catch(console.error);
        if (this.allEnemiesCreated && this.ducks.length === 0) {
            if (!this.resolvePromise) {
                throw new Error('no this.resolvePromise')
            }
            this.resolvePromise(this.missed);
        }
    }

    private async createNextEnemy(): Promise<void> {
        if (this.previousEnemyCreated) {
            this.previousEnemyCreated = false;
            const enemyConfig = this.enemiesConfig.shift()
            if (enemyConfig) {
                await TimeUtils.waitMillis(enemyConfig.creationDelay);
                if (this.previousEnemy) { // FIXME should this be done somewhere else?
                    if (enemyConfig.relativeToPreviousEnemyX) {
                        enemyConfig.x = this.previousEnemy.enemyConfig.x + enemyConfig.relativeToPreviousEnemyX;
                    }
                    if (enemyConfig.relativeToPreviousEnemyY) {
                        enemyConfig.y = this.previousEnemy.enemyConfig.y + enemyConfig.relativeToPreviousEnemyY;
                    }
                }
                const duck = new Duck(enemyConfig);

                this.ducks.push(duck);
                this.previousEnemy = duck;
                this.previousEnemyCreated = true;
            } else {
                this.allEnemiesCreated = true;
            }
        }
    }

    private handleEnemiesMovment() {
        this.ducks
            .filter(duck => !duck.death)
            .forEach(duck => {
                const isOutsidePLayableArea = duck.x < -duck.width
                    || duck.x > getWidth()
                    || duck.y > getHeight() - this.grassHeight
                    || duck.y < -duck.height;

                if (isOutsidePLayableArea) {
                    this.missed++;
                    this.removeDuck(duck);
                    console.log('missed', duck);
                    if (duck.lives > 3 && this.rejectPromise) {
                        this.rejectPromise(new Error('You failed to kill the ducktator!'));
                    }
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
            this.shootEnemy(duck)
        }
    }

    private shootEnemy(duck: Duck) {
        duck.lives--;
        duck.setAnimation(DuckAnimationType.hit);
        if (duck.lives <= 0) {
            duck.death = true;
            this.shootingCrosshair.score += duck.scoreValue;
            setTimeout(() => {
                duck.falling = true;
                duck.setAnimation(DuckAnimationType.fall)
            }, duck.animations.timeBetweenDeathAndFallTime)
        } else {
            setTimeout(() => {
                duck.setAnimation(duck.enemyConfig.defaultAnimationType)
            }, 200);
        }

    }

    private getSpeedIncrease(duck: Duck): Point {
        const speedX = duck.direction === Direction.right ? duck.enemyConfig.speed : -duck.enemyConfig.speed;
        switch (duck.animationType) {
            case DuckAnimationType.horizontal:
                return {x: speedX, y: 0};
            case DuckAnimationType.vertical:
                return {x: 0, y: -duck.speed};
            case DuckAnimationType.diagonal:
                return {x: speedX, y: -duck.speed};
            default:
                return {x: 0, y: 0};
        }
    }
}
