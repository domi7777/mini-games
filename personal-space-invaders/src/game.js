import Spaceship from "./spaceship.js"
import MouseUtils from "./mouse-utils.js"
import Stage from "./stage.js";
import ViewUtils from "./view-utils.js";


export default class Game {
    pause = false;
    spaceship;
    currentStage;
    running = false;

    constructor(config, canvas, drawService) {
        this.config = config;
        this.canvas = canvas;
        this.drawService = drawService;
        document.onvisibilitychange = () => this.pause = document.hidden;
    }

    get width() {
        return ViewUtils.getWidth(this.canvas);
    }

    get height() {
        return ViewUtils.getHeight(this.canvas);
    }

    run() {
        this.drawService.drawText('Protect your couch from the kitties at all costs!', {x: 20, y: 150});
        this.drawService.drawText('Use your water gun but beware of the scratches.', {x: 20, y: 220});
        setTimeout(() => this.drawService.drawText('Click here to start.', {x: 20, y: 290}, 30), 2000)
        const startGame = () => {
            this.canvas.removeEventListener('click', startGame);
            this.start();
        }
        this.canvas.addEventListener('click', startGame);
    }

    async start() {
        this.running = true;
        this.canvas.classList.add('in-game');
        this.spaceship = new Spaceship(
            this.config.spaceship,
            this.width / 2,
            this.height / 2
        );
        this.canvas.onmousemove = (event) => {
            const position = MouseUtils.getMousePos(this.canvas, event);
            this.spaceship.x = position.x;
            this.spaceship.y = position.y;
        }
        this.canvas.ontouchmove = (event) => {
            const position = MouseUtils.getMousePos(this.canvas, event.touches[0]);
            this.spaceship.x = position.x;
            this.spaceship.y = position.y;
        }
        window.requestAnimationFrame(
            this.executeEveryFrameActions.bind(this)
        )

        try {
            for (let i = 0; i < this.config.stages.length; i++) {
                this.currentStage = new Stage(i + 1, this.config.stages[i], this.canvas, this.spaceship);
                await this.currentStage.run();
            }
            this.gameOver('Congratulations! ', 'Your couch is saved!');
        } catch (error) {
            this.gameOver(error.message);
        }
    }

    executeEveryFrameActions(time) {
        if (!this.pause && this.currentStage && this.running) {
            this.currentStage.executeEveryFrameActions();
            this.drawScreen();
            if (this.spaceship.lives <= 0) {
                this.spaceship.shouldDraw = false;
                this.gameOver('Your hand was bitten too badly...');
            }
            window.requestAnimationFrame(
                this.executeEveryFrameActions.bind(this)
            )
        }
    }

    drawScreen() {
        this.drawService.draw(...this.currentStage.getElementsToDraw());
        this.drawHUD();
    }

    drawHUD() {
        const lineHeight = 20;
        const y = this.height - lineHeight;
        this.drawService.drawText(`Stage ${this.currentStage.number}`, {x: 20, y: y}, lineHeight);
        this.drawService.drawText(`Score: ${this.spaceship.score}`, {x: (this.width / 2) - 30, y: y}, lineHeight);
        this.drawService.drawText(`Lives: ${this.spaceship.lives}`, {x: this.width - 80, y: y}, lineHeight);
    }

    gameOver(reason, gameOverText = 'Game over') {
        this.drawScreen();
        this.running = false;
        setTimeout(() => this.drawService.drawText(reason, {x: 40, y: 220}, 30), 200);
        setTimeout(() => this.drawService.drawText(gameOverText, {x: 40, y: 300}, 50), 1000);
        setTimeout(() => {
            this.canvas.classList.remove('in-game');
            this.drawService.drawText('Retry?', {x: (this.width / 2) - 40, y: 360}, 30);
            const retry = () => {
                this.canvas.removeEventListener('click', retry);
                this.start();
            }
            this.canvas.addEventListener('click', retry);
        }, 2000);
    }
}
