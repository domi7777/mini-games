import {get2DContext, getCanvas, getHeight, getWidth} from "./global-functions";
import {Drawable} from "./drawing/drawable";
import {Direction} from "./drawing/direction.enum";
import {ShootingCrosshair} from "./shooting-crosshair";
import {Point} from "./drawing/point";
import {CollisionUtils} from "./collision-utils";
import {AnimationType} from "./animations/animation-type.enum";
import {Duck} from "./enemy/duck";
import {StageConfig} from "./config/stages-config";

export class Stage {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private resolvePromise?: (value: unknown) => void;
    private rejectPromise?: (reason?: any) => void;

    ducks: Duck[] = [];

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
        if (this.ducks.length === 0) {
            if (!this.resolvePromise) {
                throw new Error('no this.resolvePromise')
            }
            this.resolvePromise(`Stage ${this.stageNumber} completed!`);
        }
    }

    private handleEnemiesMovment() {
        this.ducks
            .filter(duck => !duck.death)
            .forEach(duck => {
                // TODO change movment
                if (duck.y < duck.height) {
                    duck.y += duck.speed;
                } else {
                    const isAtLeftLimit = duck.x < duck.width / 2;
                    const isAtRightLimit = duck.x > getWidth() - duck.width / 2;

                    if (isAtRightLimit || isAtLeftLimit) {
                        duck.setDirection(isAtLeftLimit ? Direction.right : Direction.left);
                        duck.x = isAtLeftLimit ? duck.width : getWidth() - duck.width;
                        duck.speed = -duck.speed;
                        duck.y += duck.height;
                    }
                    duck.x += duck.speed;
                }
            });
        this.ducks
            .filter(duck => duck.death && duck.falling)
            .forEach(duck => {
                duck.y += duck.animations.fallingSpeed;
                if (duck.y > getHeight() - this.grassHeight) {
                    this.ducks.splice(this.ducks.indexOf(duck), 1);
                }
            });
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

    private createEnemies() { // TODO refactor to create enemies once at a time (config)
        for (let i = 0; i < this.config.numberOfEnemies; i++) {
            const enemy = new Duck(this.config.enemy, AnimationType.horizontal)
            enemy.y = (enemy.height * i * 1.5) - 200;
            enemy.x = enemy.width * i * 5;
            this.ducks.push(enemy);
        }
    }


    private destroyEnemy(duck: Duck) {
        duck.death = true;
        //TODO this.spaceship.score += duck.scoreValue;
        duck.setAnimation(AnimationType.death);
        setTimeout(() => {
            duck.falling = true;
            duck.setAnimation(AnimationType.fall)
        }, duck.animations.timeBetweenDeathAndFallTime)
    }

}
