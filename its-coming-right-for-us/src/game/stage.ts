import {StageConfig} from "../config";
import {get2DContext, getCanvas, getHeight, getWidth} from "./global-functions";
import {Drawable} from "./drawing/drawable";
import {Enemy} from "./enemy";
import {Direction} from "./drawing/direction.enum";
import {ShootingCrosshair} from "./shooting-crosshair";
import {Point} from "./drawing/point";
import {CollisionUtils} from "./collision-utils";

export class Stage {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private resolvePromise?: (value: unknown) => void;
    private rejectPromise?: (reason?: any) => void;

    enemies: Enemy[] = [];
    lastMissileFiredTimeStamp = Date.now();

    constructor(public stageNumber: number,
                private config: StageConfig,
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
        this.handleEnemiesDeaths();

        if (this.enemies.length === 0) {
            if(!this.resolvePromise) {
                throw new Error('no this.resolvePromise')
            }
            this.resolvePromise(`Stage ${this.stageNumber} completed!`);
        }
    }

    private handleEnemiesMovment() {
        this.enemies
            .filter(enemy => !enemy.death)
            .forEach(enemy => {
                // TODO change movment
                if (enemy.y < enemy.height) {
                    enemy.y += enemy.speed;
                } else {
                    const isAtLeftLimit = enemy.x < enemy.width / 2;
                    const isAtRightLimit = enemy.x > getWidth() - enemy.width / 2;

                    if (isAtRightLimit || isAtLeftLimit) {
                        enemy.setDirection(isAtLeftLimit ? Direction.right : Direction.left);
                        enemy.x = isAtLeftLimit ? enemy.width : getWidth() - enemy.width;
                        enemy.speed = -enemy.speed;
                        enemy.y += enemy.height;
                    }
                    enemy.x += enemy.speed;
                }
            });
        this.enemies
            .filter(enemy => enemy.death && enemy.falling)
            .forEach(enemy => {
                enemy.y += 5;
                if (enemy.y > getHeight() - 130) {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                }
            }); // todo configurable
    }

    getElementsToDraw(): Drawable[] {
        return [
            // ...this.missiles,
            ...this.enemies,
            this.shootingCrosshair
        ];
    }

    shoot(point: Point) {
        console.log('shoot', point)
        this.enemies
            .filter(enemy => !enemy.death && CollisionUtils.isPointInDrawableBounds(point, enemy))
            .forEach(enemy => this.destroyEnemy(enemy));
    }


    //
    // #checkCollisions() {
    //     // check enemies/missiles collisions
    //     this.enemies
    //         .filter(enemy => !enemy.death)
    //         .forEach(enemy => {
    //             this.missiles.forEach(missile => {
    //                 if (this.#isColliding(enemy, missile)) {
    //                     this.#destroyEnemy(enemy);
    //                     missile.death = true;
    //                 }
    //             })
    //             if (CollisionUtils.getCollisionPoints(this.spaceship).some(position => this.#isColliding(enemy, position))
    //                 && !this.spaceship.death && !this.#isSpaceshipInSafePeriod()) {
    //                 this.spaceship.death = true;
    //                 this.#destroyEnemy(enemy);
    //             }
    //         });
    // }
    //

    private createEnemies() {
        for (let i = 0; i < this.config.numberOfEnemies; i++) {
            const enemy = new Enemy(this.config.enemy)
            enemy.y = (enemy.height * i * 1.5) - 200;
            enemy.x = enemy.width * i * 5;
            this.enemies.push(enemy);
        }
    }


    private destroyEnemy(enemy: Enemy) {
        console.log('destroy enemy')
        enemy.death = true;
        //TODO this.spaceship.score += enemy.scoreValue;
        enemy.spriteStartingPoint.y = 236; // fixme configurable
        enemy.totalNumberOfFrames = 1;
        enemy.currentFrameNumber = 0;
        setTimeout(() => {
            enemy.falling = true;
            enemy.spriteStartingPoint.x = 40; // fixme configurable
        },250)
    }

    private handleEnemiesDeaths() {
        // this.enemies = this.enemies
        //     .filter(enemy => enemy.death)
        //     .forEach(enemy => {
        //
        //     })
    }
}
