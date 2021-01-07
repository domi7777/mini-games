import {config, StageConfig} from "../config";
import {getCanvas, getHeight, getWidth} from "./global-functions";
import {Stage} from "./stage";
import {DrawUtils} from "./drawing/draw-utils";
import {AnimatedDrawable} from "./drawing/animated-drawable";
import {Point} from "./drawing/point";
import {ShootingCrosshair} from "./shooting-crosshair";

export class Game {
    private pause = false;
    private canvas = getCanvas();
    private height = getHeight();
    private width = getWidth();
    private config = config;
    private currentTime = 0;
    private currentStage?: Stage;
    private running = false;
    private shootingCrosshair: ShootingCrosshair;

    constructor() {
        document.onvisibilitychange = () => this.pause = document.hidden;
        this.shootingCrosshair = new ShootingCrosshair(this.config.shootingCrosshair)
    }

    async start() {
        this.running = true;
        console.log('starting game');
        this.canvas.classList.add('in-game');

        this.listenOnUserInputs();
        window.requestAnimationFrame(this.executeEveryFrameActions.bind(this));
        try {
            for (let i = 0; i < this.config.stages.length; i++) {
                this.currentStage = new Stage(i + 1, this.config.stages[i], this.shootingCrosshair);
                await this.currentStage.run();
            }
            // this.gameOver('Congratulations! ', 'Your couch is saved!');
        } catch (error) {
            // this.gameOver(error.message);
        }
    }

    private listenOnUserInputs() {
        this.canvas.onmousemove = event => this.shootingCrosshair.position = this.getMousePos(event);
        this.canvas.ontouchmove = event => this.shootingCrosshair.position = this.getMousePos(event.touches[0]);
        // this.canvas.ontouchstart = (event) // TODO
        this.canvas.onclick = (event: MouseEvent) => {
            this.shootingCrosshair.position = this.getMousePos(event);
            this.currentStage?.shoot(this.shootingCrosshair.position);
        }
    }

    executeEveryFrameActions(date: number): void {
        if (!this.pause && this.currentStage && this.running) {
            this.currentTime = date;
            this.currentStage.executeEveryFrameActions();
            this.drawScreen();
            // if (this.spaceship.lives <= 0) {
            //     this.spaceship.shouldDraw = false;
            //     this.gameOver('Your hand was bitten too badly...');
            // }
            window.requestAnimationFrame(this.executeEveryFrameActions.bind(this));
        }
    }

    // 30 fps => called 30 per s
    // 4fps => 4 per s

    drawScreen() {
        if (this.currentStage) {
            const elementsToDraw = this.currentStage.getElementsToDraw();
            elementsToDraw
                .filter(element => element instanceof AnimatedDrawable)
                .forEach(element => {
                    const drawable = element as AnimatedDrawable;
                    if (this.currentTime > drawable.lastFrameChangeTime + drawable.timeBetweenFrameChange) {
                        drawable.setNextFrameNumber();
                        drawable.lastFrameChangeTime = this.currentTime;
                    }
                });
            DrawUtils.draw(...elementsToDraw);
            this.drawHUD();
        }
    }

    drawHUD() {
        const fontSize = this.config.text.fontSize;
        const fontFamily = this.config.text.fontFamily;
        const fontColor = this.config.text.fontColor;
        const y = this.height - fontSize;
        DrawUtils.drawText(`Stage ${this.currentStage?.stageNumber}`, {
            x: 5,
            y: fontSize + 5
        }, fontSize, fontColor, fontFamily);
        // DrawUtils.drawText(`Score: ${this.spaceship.score}`, {x: (this.width / 2) - 30, y: y}, fontSize);
        // DrawUtils.drawText(`Lives: ${this.spaceship.lives}`, {x: this.width - 80, y: y}, fontSize);
    }

    getMousePos(evt: MouseEvent | Touch): Point {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
}
