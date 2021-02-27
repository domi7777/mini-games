import {Drawable} from "../drawing/drawable";
import {Direction} from "../drawing/direction.enum";
import {AnimatedDrawableConfig} from "../drawing/drawable-config";
import {AbstractAnimationsConfig, AnimationConfig} from "./animation.config";

export abstract class AnimatedDrawable<T> extends Drawable {
    currentFrameNumber = 0;
    lastFrameChangeTime = 0;
    direction: Direction;
    animations: AbstractAnimationsConfig;
    animationType: T;

    protected constructor(config: AnimatedDrawableConfig<T>) {
        super(config);
        this.direction = config.defaultDirection;
        this.animations = config.animations;
        this.animationType = config.defaultAnimationType;
    }

    abstract getCurrentAnimation(): AnimationConfig;

    setAnimation(animationType: T) {
        this.currentFrameNumber = 0;
        this.animationType = animationType;
    }

}
