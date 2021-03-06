import { getCanvas, getHeight, getWidth } from './global-functions';
import { Stage } from './stage/stage';
import { DrawUtils } from './drawing/draw-utils';
import { AnimatedDrawable } from './animations/animated-drawable';
import { Point } from './drawing/point';
import { ShootingCrosshair } from './shooting-crosshair';
import { AnimationUtils } from './animations/animation-utils';
import { GameConfig } from './game-config';
import { TimeUtils } from './utils/time-utils';
import { StageConfig } from './stage/stages-config';
import { DuckAnimationType } from './duck/duck-animation-type.enum';
import { Dog } from './dog/dog';
import { dogConfig } from './dog/dog.config';
import { Drawable } from './drawing/drawable';
import { DogAnimationType } from './dog/dog-animation.type';
import { Grenade } from './grenade';
import { CollisionUtils } from './utils/collision-utils';
import { RandomUtils } from './utils/random.utils';

export class Game {
    private pause = false;
    private canvas = getCanvas();
    private height = getHeight();
    private width = getWidth();
    private currentTime = 0;
    private currentStage?: Stage;
    private running = false;
    private shootingCrosshair: ShootingCrosshair;
    private grenade: Grenade;
    private continues = 3; // TODO configurable
    private previousRound = 0;
    private dogAnimation: Dog | null = null;
    private duckSoundsInterval?: NodeJS.Timeout;
    private voicesInterval?: NodeJS.Timeout;

    constructor(private config: GameConfig) {
        document.onvisibilitychange = () => this.pause = document.hidden;
        this.shootingCrosshair = new ShootingCrosshair(this.config.shootingCrosshair);
        this.grenade = new Grenade(this.config.grenade);
        this.playSoundtrackLoop(config.soundtrack); // TODO sth to mute all sounds
    }

    async start() { // FIXME too big refactor
        this.running = true;
        console.log('starting game');
        this.canvas.classList.add('in-game');
        if (this.continues === 0) {
            this.continues = 3;
        }
        this.grenade = new Grenade(this.config.grenade);

        this.listenOnUserInputs();
        try {
            for (let i = 1; i <= this.config.stages.length; i++) {
                const stageConfig = this.config.stages[i - 1];
                if (i < this.previousRound) {
                    continue;
                }
                this.previousRound = i;
                this.currentStage = await this.createNewStage(stageConfig);
                this.config.reloadNoises[RandomUtils.getNumber(0, this.config.reloadNoises.length)]
                    .play().catch(console.error);
                this.addRandomNoises();
                const missedDucks = await this.currentStage.run();
                this.removeRandomNoises();

                if (missedDucks > 3) {
                    throw new Error('You missed too many birds!');
                } else {
                    const dogAnimationType = missedDucks === 0 ? DogAnimationType.twoDucks : DogAnimationType.oneDuck;
                    await this.createDogAnimation(dogAnimationType);
                    this.running = false;
                    this.drawText(`You missed ${missedDucks} ducks.`, { x: 70, y: 300 });
                    await TimeUtils.waitMillis(3000);
                }
            }
            this.previousRound = 0;
            this.gameOver('Congratulations! ', `Score: ${this.shootingCrosshair.score}`);
        } catch (error) {
            this.removeRandomNoises();
            await this.createDogAnimation(DogAnimationType.laughing);
            this.continues--;
            console.log(this.continues);
            if (this.continues === 0) {
                this.previousRound = 0;
            }
            this.gameOver(error.message, this.continues > 0 ? `Continues: ${this.continues}` : 'Game Over');
        }
    }

    private async createNewStage(stageConfig: StageConfig): Promise<Stage> {
        DrawUtils.clearScreen();
        this.drawText(`Round ${this.previousRound}`, { x: 85, y: 150 }, 25);
        this.drawText(stageConfig.title, { x: 40, y: 220 }, 15);
        await TimeUtils.waitMillis(4000);
        this.running = true;
        window.requestAnimationFrame(this.executeNextAnimationFrameActions.bind(this));
        return new Stage(
            this.previousRound,
            stageConfig,
            this.config.grassHeight,
            this.shootingCrosshair,
            this.grenade
        );
    }

    private listenOnUserInputs() {
        this.canvas.onmousemove = event => this.shootingCrosshair.setPosition(this.getMousePos(event));
        this.canvas.ontouchmove = event => this.shootingCrosshair.setPosition(this.getMousePos(event.touches[0]));
        // this.canvas.ontouchstart = (event) // TODO
        this.canvas.onclick = (event: MouseEvent) => {
            this.shootingCrosshair.setPosition(this.getMousePos(event));
            const position = this.shootingCrosshair.position;
            const point = {
                // x, y are top left of the actual position clicked
                x: position.x + this.shootingCrosshair.width / 2,
                y: position.y + this.shootingCrosshair.height / 2
            };
            this.currentStage?.shoot(point);

            const sounds = this.shootingCrosshair.sounds;
            const randomIndex = RandomUtils.getNumber(0, sounds.length - 1);
            sounds[randomIndex].play().catch(console.error);

            // Rewards shooting the dog
            if (this.dogAnimation && CollisionUtils.isPointInDrawableBounds(point, this.dogAnimation)
                && this.grenade.remaining < this.grenade.max) {
                this.grenade.remaining++;
            }
        };
    }

    executeNextAnimationFrameActions(date: number): void {
        if (!this.pause && this.currentStage && this.running) {
            this.currentTime = date;
            this.currentStage?.executeEveryFrameActions();
            this.dogAnimation?.runNextAnimationFrame();
            this.drawScreen();
            window.requestAnimationFrame(this.executeNextAnimationFrameActions.bind(this));
        }
    }

    drawScreen() {
        if (this.currentStage) {
            const elementsToDraw = this.getElementsToDraw();
            elementsToDraw
                .filter(element => element instanceof AnimatedDrawable)
                .forEach(element => this.setNextAnimationFrameIfNeeded(element as AnimatedDrawable<DuckAnimationType>));
            DrawUtils.draw(...elementsToDraw);
            this.drawHUD();
        }
    }

    private playSoundtrackLoop(soundtrack: HTMLAudioElement) {
        try {
            // TODO audioService or sth
            const AudioContextConstructor = window.AudioContext || ( window as any ).webkitAudioContext;
            const audioContext: AudioContext = new AudioContextConstructor(); // needed for perfect looping
            const track = audioContext.createMediaElementSource(soundtrack);
            const gainNode = audioContext.createGain();
            track
                .connect(gainNode)
                .connect(audioContext.destination);
            gainNode.gain.value = 0.1;
            soundtrack.loop = true;
            soundtrack.play().catch(console.error);
        } catch (error) {
            console.log(error);
            const errorContainer = document.getElementById('error');
            if (errorContainer) {
                errorContainer.innerHTML =
                    `${error.message}
                    ${error.stack}`;
                errorContainer.style.display = 'block';
            }
        }
    }

    private addRandomNoises() { // not beautiful, but gets the job done
        this.duckSoundsInterval = setInterval(() => {
            if (RandomUtils.getBoolean()) {
                const duckNoises = this.config.duckNoises;
                const randomIndex = RandomUtils.getNumber(0, duckNoises.length);
                duckNoises[randomIndex].play().catch(console.error);
            }
        }, 500);
        this.voicesInterval = setInterval(() => {
            if (RandomUtils.getBoolean()) {
                const voices = this.config.voices;
                const randomIndex = RandomUtils.getNumber(0, voices.length);
                voices[randomIndex].play().catch(console.error);
            }
        }, 7000);
    }

    private removeRandomNoises() {
        if (this.duckSoundsInterval) {
            clearInterval(this.duckSoundsInterval);
        }
        if (this.voicesInterval) {
            clearInterval(this.voicesInterval);
        }
    }

    private getElementsToDraw(): Drawable[] {
        if (!this.currentStage) {
            throw new Error('no current stage');
        }
        const elementsToDraw = this.currentStage.getElementsToDraw();
        if (this.dogAnimation) {
            elementsToDraw.push(this.dogAnimation);
        }
        return elementsToDraw;
    }

    private setNextAnimationFrameIfNeeded(drawable: AnimatedDrawable<DuckAnimationType>) {
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
            x: 180,
            y: bottomY
        });

        // grenade
        this.drawText(`${this.grenade.remaining}`, {
            x: ( this.grenade.x + this.grenade.width / 2 ) - 8,
            y: ( this.grenade.y + this.grenade.height / 2 ) + 13
        });
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
        setTimeout(() => this.drawText(reason, { x: 40, y: 220 }), 200);
        setTimeout(() => this.drawText(gameOverText, { x: 40, y: 300 }), 1000);
        setTimeout(() => {
            this.canvas.classList.remove('in-game');
            this.drawText('Retry?', { x: ( this.width / 2 ) - 40, y: 360 }, 30);
            const retry = () => {
                this.canvas.removeEventListener('click', retry);
                this.start();
            };
            this.canvas.addEventListener('click', retry);
        }, 2000);
    }

    private async createDogAnimation(animationType: DogAnimationType) {
        await TimeUtils.waitMillis(700);
        this.dogAnimation = new Dog(dogConfig, animationType);
        await this.dogAnimation.onShowingUpAnimationFinished();
        await TimeUtils.waitMillis(1000);
        this.dogAnimation.showOff();
        await this.dogAnimation.onShowingOffAnimationFinished();
        this.dogAnimation = null;
    }

}
