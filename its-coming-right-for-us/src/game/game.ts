import {getCanvas, getHeight, getWidth} from "./global-functions";
import {Stage} from "./stage";
import {DrawUtils} from "./drawing/draw-utils";
import {AnimatedDrawable} from "./animations/animated-drawable";
import {Point} from "./drawing/point";
import {ShootingCrosshair} from "./shooting-crosshair";
import {AnimationUtils} from "./animations/animation-utils";
import {GameConfig} from "./config/game-config";
import {TimeUtils} from "./time-utils";

export class Game {
    private pause = false;
    private canvas = getCanvas();
    private height = getHeight();
    private width = getWidth();
    private currentTime = 0;
    private currentStage?: Stage;
    private running = false;
    private shootingCrosshair: ShootingCrosshair;

    constructor(private config: GameConfig) {
        document.onvisibilitychange = () => this.pause = document.hidden;
        this.shootingCrosshair = new ShootingCrosshair(this.config.shootingCrosshair)
    }

    async start() {
        this.running = true;
        console.log('starting game');
        this.canvas.classList.add('in-game');

        this.listenOnUserInputs();
        try {
            for (let i = 0; i < this.config.stages.length; i++) {
                const roundNumber = i + 1;
                this.drawText(`Round ${roundNumber}`, {x: 70, y: 250}, 25);
                await TimeUtils.waitMillis(3000);
                this.running = true;
                window.requestAnimationFrame(this.executeEveryFrameActions.bind(this));
                this.currentStage = new Stage(
                    roundNumber,
                    this.config.stages[i],
                    this.config.grassHeight,
                    this.shootingCrosshair
                );
                const missedDucks: number = <number>await this.currentStage.run();
                if (missedDucks > 3) {
                    throw new Error('You missed too many birds!');
                } else {
                    this.running = false;
                    this.drawText(`You missed ${missedDucks} ducks.`, {x: 70, y: 300});
                    await TimeUtils.waitMillis(3000);
                    this.drawText(`You missed ${missedDucks} ducks.`, {x: 70, y: 300});
                }
            }
            this.gameOver('Congratulations! ', `Score: ${this.shootingCrosshair.score}`);
        } catch (error) {
            this.gameOver(error.message);
        }
    }

    private listenOnUserInputs() {
        this.canvas.onmousemove = event => this.shootingCrosshair.setPosition(this.getMousePos(event));
        this.canvas.ontouchmove = event => this.shootingCrosshair.setPosition(this.getMousePos(event.touches[0]));
        // this.canvas.ontouchstart = (event) // TODO
        this.canvas.onclick = (event: MouseEvent) => {
            this.shootingCrosshair.setPosition(this.getMousePos(event));
            this.currentStage?.shoot(this.shootingCrosshair.position);
        }
    }

    executeEveryFrameActions(date: number): void {
        if (!this.pause && this.currentStage && this.running) {
            this.currentTime = date;
            this.currentStage.executeEveryFrameActions();
            this.drawScreen();
            window.requestAnimationFrame(this.executeEveryFrameActions.bind(this));
        }
    }

    drawScreen() {
        if (this.currentStage) {
            const elementsToDraw = this.currentStage.getElementsToDraw();
            elementsToDraw
                .filter(element => element instanceof AnimatedDrawable)
                .forEach(element => this.setNextAnimationFrameIfNeeded(element as AnimatedDrawable));
            DrawUtils.draw(...elementsToDraw);
            this.drawHUD();
        }
    }

    private setNextAnimationFrameIfNeeded(drawable: AnimatedDrawable) {
        const animations = drawable.animations;
        const currentAnimation = drawable.getCurrentAnimation();
        if (this.currentTime > drawable.lastFrameChangeTime + animations.timeBetweenFrameChange) {
            drawable.currentFrameNumber = AnimationUtils.getNextAnimationFrame(drawable, currentAnimation);
            drawable.lastFrameChangeTime = this.currentTime;
        }
    }

    drawHUD() {
        const bottomY = this.height - this.config.text.fontSize + 5;

        // bottom left
        this.drawText(`Round ${this.currentStage?.stageNumber}`, {
            x: 5,
            y: bottomY - 25
        });

        this.drawText(`Missed: ${this.currentStage?.missed}`, {
            x: 5,
            y: bottomY
        });

        // bottom center
        this.drawText(`Score: ${this.shootingCrosshair.score}`, {
            x: 200,
            y: bottomY
        });
        // DrawUtils.drawText(`Lives: ${this.spaceship.lives}`, {x: this.width - 80, y: y}, bottomY);
    }

    private drawText(text: string, point: Point, fontSize = this.config.text.fontSize) {
        const fontFamily = this.config.text.fontFamily;
        const fontColor = this.config.text.fontColor;
        DrawUtils.drawText(text, point, fontSize, fontColor, fontFamily);
    }

    getMousePos(evt: MouseEvent | Touch): Point {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    gameOver(reason: string, gameOverText = 'Game over') {
        this.drawScreen();
        this.running = false;
        setTimeout(() => this.drawText(reason, {x: 40, y: 220}), 200);
        setTimeout(() => this.drawText(gameOverText, {x: 40, y: 300}), 1000);
        setTimeout(() => {
            this.canvas.classList.remove('in-game');
            this.drawText('Retry?', {x: (this.width / 2) - 40, y: 360}, 30);
            const retry = () => {
                this.canvas.removeEventListener('click', retry);
                this.start();
            }
            this.canvas.addEventListener('click', retry);
        }, 2000);
    }
}
