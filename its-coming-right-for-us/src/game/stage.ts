import {StageConfig} from "../config";
import {get2DContext, getCanvas, getHeight, getWidth} from "./global-functions";
import {Drawable} from "./drawing/drawable";
import {Enemy} from "./enemy";
import {Direction} from "./drawing/direction.enum";
import {ShootingCrosshair} from "./shooting-crosshair";
import {Point} from "./drawing/point";
import {CollisionUtils} from "./collision-utils";
import {AnimationType} from "./animations/animation-type.enum";
import {Duck} from "./duck";

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
        if (this.enemies.length === 0) {
            if (!this.resolvePromise) {
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
            ...this.enemies,
            this.shootingCrosshair
        ];
    }

    shoot(point: Point) {
        //console.log('shoot', point)
        this.enemies
            .filter(enemy => !enemy.death && CollisionUtils.isPointInDrawableBounds(point, enemy))
            .forEach(enemy => this.destroyEnemy(enemy));
    }

    private createEnemies() { // TODO refactor to create enemies once at a time (config)
        for (let i = 0; i < this.config.numberOfEnemies; i++) {
            const enemy = new Duck(this.config.enemy, AnimationType.horizontal)
            enemy.y = (enemy.height * i * 1.5) - 200;
            enemy.x = enemy.width * i * 5;
            this.enemies.push(enemy);
        }
    }


    private destroyEnemy(enemy: Enemy) {
        console.log('destroy enemy')
        enemy.death = true;
        //TODO this.spaceship.score += enemy.scoreValue;
        enemy.setAnimation(AnimationType.death);
        setTimeout(() => {
            enemy.falling = true;
            enemy.setAnimation(AnimationType.fall)
        }, 350/*TODO configurable*/)
    }

}
