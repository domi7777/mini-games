import Missile from "./missile.js"
import Spaceship from "./spaceship.js"
import MouseUtils from "./mouse-utils.js"
import ViewUtils from "./view-utils.js"
import Enemy from "./enemy.js";
import CollisionUtils from "./collision-utils.js";

export default class Game {
    pause = false;
    spaceship;
    missiles = [];
    enemies = [];
    lastMissileFiredTimeStamp = Date.now();

    numberOfEnemies = 20; // fixme config
    actionsInterval;
    collisionsChecksInterval;

    constructor(config, canvas, drawService) {
        this.config = config;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.drawService = drawService;
        document.onvisibilitychange = () => this.pause = document.hidden;
    }

    run() {
        this.spaceship = new Spaceship(this.config.spaceship);
        this.createEnemies();
        this.canvas.onmousemove = (event) => {
            const position = MouseUtils.getMousePos(this.canvas, event);
            this.spaceship.x = position.x;
            this.spaceship.y = position.y;
        }

        this.actionsInterval = setInterval(this.executeEveryFrameActions.bind(this), 1000 / 60);
        this.collisionsChecksInterval = setInterval(() => this.checkCollisions(), 5);
        return this;
    }

    executeEveryFrameActions() {
        if (!this.pause) {
            this.runMissilesActions();
            this.runEnemiesActions();
            this.runSpaceshipActions();

            this.drawService.draw(
                ...this.missiles,
                ...this.enemies,
                this.spaceship
            );
            this.drawService.drawText(`lives: ${this.spaceship.lives}`, {x: 400, y: 490});
            //TODO this.drawService.drawText(`score: ${this.spaceship.lives}`, {x: 400, y: 490});
            if (this.spaceship.lives <= 0) {
                this.gameOver();
            }
        }
    }

    runMissilesActions() {
        // destroy missiles out of screen
        this.missiles = this.missiles.filter(missile => missile.y > 0 && !missile.death);

        // create new missiles
        if (this.canCreateNewMissile()) {
            const missile = new Missile(this.config.spaceship.missile);
            missile.x = this.spaceship.x - 3; /* so it's aligned with ship*/
            missile.y = this.spaceship.y;
            this.missiles.push(missile);
            this.lastMissileFiredTimeStamp = Date.now();
        }
        // moves missiles
        this.missiles.forEach(missile => missile.y -= missile.speed);
    }

    canCreateNewMissile() {
        return this.lastMissileFiredTimeStamp + this.config.spaceship.missile.reloadTime < Date.now();
    }

    runEnemiesActions() {
        this.enemies = this.enemies.filter(enemy => enemy.y < this.getStageHeight() + enemy.height && !enemy.death);
        this.handleEnemiesMovement();
    }


    handleEnemiesMovement() {
        this.enemies.forEach(enemy => {
            if (enemy.y < enemy.height) {
                enemy.y += enemy.speed;
            } else {
                const isAtLeftLimit = enemy.x < enemy.width;
                const isAtRightLimit = enemy.x > this.getStageWidth() - enemy.width;
                if (isAtRightLimit || isAtLeftLimit) {
                    enemy.x = isAtLeftLimit ? enemy.width : this.getStageWidth() - enemy.width;
                    enemy.speed = -enemy.speed;
                    enemy.y += enemy.height;
                }
                enemy.x += enemy.speed;
            }
        })
    }

    getStageWidth() {
        return ViewUtils.getWidth(this.canvas);
    }

    getStageHeight() {
        return ViewUtils.getHeight(this.canvas);
    }

    isColliding(drawable1, drawable2) {
        return this.context.isPointInPath(drawable1.path2D, drawable2.x - drawable1.x, drawable2.y - drawable1.y);
    }

    checkCollisions() {
        // check enemies/missiles collisions
        this.enemies
            .filter(enemy => !enemy.death)
            .forEach(enemy => {
                this.missiles.forEach(missile => {
                    if (this.isColliding(enemy, missile)) {
                        enemy.death = true;
                        missile.death = true;
                    }
                })
                if (CollisionUtils.getCollisionPoints(this.spaceship).some(position => this.isColliding(enemy, position))
                    && !this.spaceship.death && !this.isSpaceshipInSafePeriod()) {
                    this.spaceship.death = true;
                    enemy.death = true;
                }
            });
    }

    createEnemies() {
        for (let i = 0; i < this.numberOfEnemies; i++) {
            const enemy = new Enemy(this.config.enemy)
            enemy.y = (-enemy.height * i * 1.5) - 200;
            enemy.x = enemy.width * 2;
            this.enemies.push(enemy);
        }
    }

    runSpaceshipActions() {
        if (this.isSpaceshipInSafePeriod()) {
            //
        } else if (this.spaceship.death) {
            this.spaceship.lives--;
            const blinkInterval = setInterval(
                () => this.spaceship.shouldDraw = !this.spaceship.shouldDraw,
                20
            );
            setTimeout(() => {
                clearInterval(blinkInterval);
                this.spaceship.shouldDraw = true;
            }, this.config.spaceship.safeDeathPeriod);
            console.log('lives', this.spaceship.lives);
            this.spaceship.timeOfDeath = Date.now();
            this.spaceship.death = false;
        }

    }

    isSpaceshipInSafePeriod() {
        return this.spaceship.timeOfDeath + this.config.spaceship.safeDeathPeriod > Date.now();
    }

    gameOver() {
        clearInterval(this.actionsInterval);
        clearInterval(this.collisionsChecksInterval);
        this.drawService.drawText('Game over', {x: 120, y: 260}, 50);
    }
}
