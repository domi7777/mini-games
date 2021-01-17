import {AnimatedDrawable} from "../animations/animated-drawable";
import {DogAnimationType} from "./dog-animation.type";
import {DogAnimationsConfig, DogConfig} from "./dog.config";
import {AnimationConfig} from "../animations/animation.config";
import {RandomUtils} from "../utils/random.utils";
import {getWidth} from "../global-functions";

export class Dog extends AnimatedDrawable<DogAnimationType> {
    animations: DogAnimationsConfig;
    animationType: DogAnimationType;
    private showingUpAnimationFinished?: (value?: unknown) => void;
    private showingOffAnimationFinished?: (value?: unknown) => void;
    private readonly speed: number;
    showingUp = true;

    constructor(public config: DogConfig, animationType: DogAnimationType) {
        super(config);
        this.animations = Object.seal(config.animations);
        this.animationType = animationType;
        this.speed = config.speed;
        this.height = 0;
        this.x = RandomUtils.getNumber(0, getWidth() - this.width * this.scale);
    }

    getCurrentAnimation(): AnimationConfig {
        return this.animations[this.animationType];
    }

    runNextAnimationFrame() {
        if (this.showingUp) {
            if (this.height < this.config.height) {
                this.height += this.speed / this.scale;
                this.y -= this.speed;
            } else {
                this.showingUpAnimationFinished?.();
                this.showingUpAnimationFinished = undefined;
            }
        } else {
            if (this.height > 0) {
                this.height -= this.speed / this.scale;
                this.y += this.speed;
            } else {
                this.showingOffAnimationFinished?.();
                this.showingOffAnimationFinished = undefined;
            }
        }
    }

    showOff() {
        this.showingUp = false;
    }

    onShowingUpAnimationFinished() {
        return new Promise((_resolve) => this.showingUpAnimationFinished = _resolve);
    }

    onShowingOffAnimationFinished() {
        return new Promise((_resolve) => this.showingOffAnimationFinished = _resolve);
    }
}
