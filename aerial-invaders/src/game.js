import Spaceship from "./spaceship.js"
import MouseUtils from "./mouse-utils.js"
import Stage from "./stage.js";


export default class Game {
    framesPerSecond = 60;
    pause = false;
    spaceship;
    currentStage;

    everyFrameActionsInterval;

    constructor(config, canvas, drawService) {
        this.config = config;
        this.canvas = canvas;
        this.drawService = drawService;
        document.onvisibilitychange = () => this.pause = document.hidden;
    }

    async run() {
        this.canvas.classList.add('in-game');
        this.spaceship = new Spaceship(this.config.spaceship);
        this.canvas.onmousemove = (event) => {
            const position = MouseUtils.getMousePos(this.canvas, event);
            this.spaceship.x = position.x;
            this.spaceship.y = position.y;
        }

        this.everyFrameActionsInterval = setInterval(
            this.executeEveryFrameActions.bind(this),
            1000 / this.framesPerSecond
        );

        try {
            for (let i = 0; i < this.config.stages.length; i++) {
                this.currentStage = new Stage(i + 1, this.config.stages[i], this.canvas, this.spaceship);
                await this.currentStage.run();
            }
            this.gameOver('Congratulations! ', 'Earth is saved!');
        } catch (error) {
            this.gameOver(error.message);
        }
    }

    executeEveryFrameActions() {
        if (!this.pause && this.currentStage) {
            this.currentStage.executeEveryFrameActions();
            this.drawScreen();
            if (this.spaceship.lives <= 0) {
                this.spaceship.shouldDraw = false;
                this.gameOver('Your spaceship was destroyed...');
            }
        }
    }

    drawScreen() {
        this.drawService.draw(...this.currentStage.getElementsToDraw());
        this.drawService.drawText(`Lives: ${this.spaceship.lives}`, {x: 420, y: 490});
        this.drawService.drawText(`Score: ${this.spaceship.score}`, {x: 220, y: 490});
        this.drawService.drawText(`Stage ${this.currentStage.number}`, {x: 20, y: 490});
    }

    gameOver(reason, gameOverText = 'Game over') {
        this.drawScreen();
        clearInterval(this.everyFrameActionsInterval);
        setTimeout(() => this.drawService.drawText(reason, {x: 40, y: 220}, 30), 200);
        setTimeout(() => this.drawService.drawText(gameOverText, {x: 120, y: 280}, 50), 1000);
        setTimeout(() => {
            this.canvas.classList.remove('in-game');
            this.drawService.drawText('Retry?', {x: 190, y: 340}, 30);
            const retry = () => {
                this.canvas.removeEventListener('click', retry);
                this.run();
            }
            this.canvas.addEventListener('click', retry);
        }, 2000);
    }
}
