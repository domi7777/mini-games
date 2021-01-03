import {config} from "../config";
import {getCanvas, getHeight, getWidth} from "./global-functions";
import {Stage} from "./stage";
import {DrawUtils} from "./draw-utils";

export class Game {
    private pause = false;
    private canvas = getCanvas();
    private height = getHeight();
    private width = getWidth();
    private config = config;
    private everyFrameActionsInterval?: NodeJS.Timeout;
    private framesPerSecond = 30;
    private currentStage?: Stage;

    constructor() {
        document.onvisibilitychange = () => this.pause = document.hidden;
    }

    async start() {
        console.log('starting game3');
        this.canvas.classList.add('in-game');

        this.canvas.onmousemove = (event) => {
            const position = this.getMousePos(event);
            // this.spaceship.x = position.x;
            // this.spaceship.y = position.y;
        }
        // this.canvas.ontouchmove = (event) => {
        //     const position = MouseUtils.getMousePos(this.canvas, event.touches[0]);
        //     this.spaceship.x = position.x;
        //     this.spaceship.y = position.y;
        // }
        this.everyFrameActionsInterval = setInterval(
            this.executeEveryFrameActions.bind(this),
            1000 / this.framesPerSecond
        );
        try {
            for (let i = 0; i < this.config.stages.length; i++) {
                this.currentStage = new Stage(i + 1, this.config.stages[i]);
                await this.currentStage.run();
            }
            // this.gameOver('Congratulations! ', 'Your couch is saved!');
        } catch (error) {
            // this.gameOver(error.message);
        }
    }

    executeEveryFrameActions(): void {
        if (!this.pause && this.currentStage) {
            this.currentStage.executeEveryFrameActions();
            this.drawScreen();
            // if (this.spaceship.lives <= 0) {
            //     this.spaceship.shouldDraw = false;
            //     this.gameOver('Your hand was bitten too badly...');
            // }
        }
    }

    drawScreen() {
        if (this.currentStage) {
            DrawUtils.draw(...this.currentStage.getElementsToDraw());
            this.drawHUD();
        }
    }

    drawHUD() {
        const fontSize = this.config.text.fontSize;
        const fontFamily = this.config.text.fontFamily;
        const fontColor = this.config.text.fontColor;
        const y = this.height - fontSize;
        DrawUtils.drawText(`Stage ${this.currentStage?.stageNumber}`, {x: 5, y: fontSize + 5}, fontSize, fontColor, fontFamily);
        // DrawUtils.drawText(`Score: ${this.spaceship.score}`, {x: (this.width / 2) - 30, y: y}, fontSize);
        // DrawUtils.drawText(`Lives: ${this.spaceship.lives}`, {x: this.width - 80, y: y}, fontSize);
    }

    getMousePos(evt: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
}
