import Missile from "./missile.js"
import Spaceship from "./spaceship.js"


export default class Game {
    pause = false;

    spaceship;
    missiles = [];

    constructor(config, canvas, drawService) {
        this.config = config;
        this.canvas = canvas;
        this.drawService = drawService;
        document.onvisibilitychange = () => this.pause = document.hidden;
    }

    run() {
        this.spaceship = new Spaceship(this.config.spaceship);

        this.canvas.onmousemove = (event) => {
            const position = this.getMousePos(this.canvas, event);
            this.spaceship.x = position.x;
            this.spaceship.y = position.y;
        }

        const interval = setInterval(this.executeEveryFrameActions.bind(this), 1000 / 60);
        return this;
    }

    getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }


    executeEveryFrameActions() {
        if (!this.pause) {
            // destroy missiles out of screen
            this.missiles = this.missiles.filter(missile => missile.y > 0);

            // create new missiles
            if (this.canCreateNewMissile()) {
                const missile = new Missile(this.config.missile);
                missile.x = this.spaceship.x - 3; /* so it's aligned with ship*/
                missile.y = this.spaceship.y;
                this.missiles.push(missile);
            }
            // moves missiles
            this.missiles.forEach(missile => missile.y -= missile.speed);

            // create enemies
            // move enemies

            this.drawService.draw(
                ...this.missiles,
                this.spaceship
            );
        }
    }

    canCreateNewMissile() {
        if (this.missiles.length === 0) {
            return true;
        }

        const lastMissile = this.missiles[this.missiles.length - 1];
        return lastMissile.timestamp + lastMissile.reloadTime < Date.now();
    }
}
