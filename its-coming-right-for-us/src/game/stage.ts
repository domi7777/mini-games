import {StageConfig} from "../config";
import {get2DContext, getCanvas, getWidth} from "./global-functions";
import {Drawable} from "./drawing/drawable";
import {Enemy} from "./enemy";
import {Direction} from "./drawing/direction.enum";

export class Stage {

    private config: StageConfig;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private resolvePromise?: (value: unknown) => void;
    private rejectPromise?: (reason?: any) => void;

    enemies: Enemy[] = [];
    lastMissileFiredTimeStamp = Date.now();

    stageNumber: number;

    constructor(number: number, config: StageConfig) {
        this.stageNumber = number;
        this.config = config;
        this.canvas = getCanvas();
        this.context = get2DContext()
    }

    async run() {
        console.log('currentsage.run', this.stageNumber)
        const promise = new Promise((resolve, reject) => {
            this.resolvePromise = resolve;
            this.rejectPromise = reject;
        });
        this.createEnemies();
        return promise;
    }

    executeEveryFrameActions() {
        this.enemies.forEach(enemy => {
            if (enemy.y < enemy.height) {
                enemy.y += enemy.speed;
            } else {
                const isAtLeftLimit = enemy.x < enemy.width;
                const isAtRightLimit = enemy.x > getWidth() - enemy.width;

                if (isAtRightLimit || isAtLeftLimit) {
                    enemy.setDirection(isAtLeftLimit ? Direction.right : Direction.left);
                    enemy.x = isAtLeftLimit ? enemy.width : getWidth() - enemy.width;
                    enemy.speed = -enemy.speed;
                    enemy.y += enemy.height;
                }
                enemy.x += enemy.speed;
            }
        });

        // this.#runMissilesActions();
        // this.#runEnemiesActions();
        // this.#runSpaceshipActions();
        // this.#checkCollisions();
    }

    getElementsToDraw(): Drawable[] {
        return [
            // ...this.missiles,
            ...this.enemies,
            // this.spaceship
        ];
    }

    //
    // #runMissilesActions() {
    //     // destroy missiles out of screen
    //     this.missiles = this.missiles.filter(missile => missile.y > 0 && !missile.death);
    //
    //     // create new missiles
    //     if (this.#canCreateNewMissile()) {
    //         const missile = new Missile(this.spaceship.config.missile);
    //         missile.x = this.spaceship.x - 3; /* so it's aligned with ship*/
    //         missile.y = this.spaceship.y;
    //         this.missiles.push(missile);
    //         this.lastMissileFiredTimeStamp = Date.now();
    //     }
    //     // moves missiles
    //     this.missiles.forEach(missile => missile.y -= missile.speed);
    // }
    //
    // #canCreateNewMissile() {
    //     return this.lastMissileFiredTimeStamp + this.spaceship.config.missile.reloadTime < Date.now();
    // }
    //
    // #runEnemiesActions() {
    //     this.enemies = this.enemies.filter(enemy => enemy.y < this.#getStageHeight() + enemy.height && !enemy.death);
    //     if (this.enemies.length === 0) {
    //         this.resolvePromise();
    //     }
    //     if (this.enemies.some(enemy => enemy.y + enemy.height > this.#getStageHeight())) {
    //         this.rejectPromise(new Error('Your couch was invaded by furballs')); // TODO error class instead
    //     }
    //     this.#handleEnemiesMovement();
    // }
    //
    // #handleEnemiesMovement() {
    //     this.enemies.forEach(enemy => {
    //         if (enemy.y < enemy.height) {
    //             enemy.y += enemy.speed;
    //         } else {
    //             const isAtLeftLimit = enemy.x < enemy.width;
    //             const isAtRightLimit = enemy.x > this.#getStageWidth() - enemy.width;
    //             if (isAtRightLimit || isAtLeftLimit) {
    //                 enemy.x = isAtLeftLimit ? enemy.width : this.#getStageWidth() - enemy.width;
    //                 enemy.speed = -enemy.speed;
    //                 enemy.y += enemy.height;
    //             }
    //             enemy.x += enemy.speed;
    //         }
    //     });
    // }
    //
    //
    // #getStageWidth() {
    //     return ViewUtils.getWidth(this.canvas);
    // }
    //
    // #getStageHeight() {
    //     return ViewUtils.getHeight(this.canvas);
    // }
    //
    // #isColliding(drawable1, drawable2) {
    //     return this.context.isPointInPath(drawable1.path2D, drawable2.x - drawable1.x, drawable2.y - drawable1.y);
    // }
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
    // #runSpaceshipActions() {
    //     if (this.#isSpaceshipInSafePeriod()) {
    //         // fixme
    //     } else if (this.spaceship.death) {
    //         this.spaceship.lives--;
    //         const blinkInterval = setInterval(
    //             () => this.spaceship.shouldDraw = !this.spaceship.shouldDraw,
    //             20 // todo config
    //         );
    //         setTimeout(() => {
    //             clearInterval(blinkInterval);
    //             this.spaceship.shouldDraw = true;
    //         }, this.spaceship.config.safeDeathPeriod);
    //         this.spaceship.timeOfDeath = Date.now();
    //         this.spaceship.death = false;
    //     }
    //
    // }
    //
    // #isSpaceshipInSafePeriod() {
    //     return this.spaceship.timeOfDeath + this.spaceship.config.safeDeathPeriod > Date.now();
    // }
    //
    createEnemies() {
        for (let i = 0; i < this.config.numberOfEnemies; i++) {
            const enemy = new Enemy(this.config.enemy)
            // enemy.y = (-enemy.height * i * 1.5) - 200;
            // enemy.x = enemy.width * 2;
            this.enemies.push(enemy);
        }
    }
    //
    // #destroyEnemy(enemy) {
    //     enemy.death = true;
    //     this.spaceship.score += enemy.scoreValue;
    // }
}
