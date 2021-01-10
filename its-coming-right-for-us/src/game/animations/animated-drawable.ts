import {Drawable} from "../drawing/drawable";
import {Direction} from "../drawing/direction.enum";
import {AbstractAnimationsConfig, AnimationConfig} from "./animations-config";
import {AnimationType} from "./animation-type.enum";
import {AnimatedDrawableConfig} from "../drawing/drawable-config";

export abstract class AnimatedDrawable extends Drawable {
    currentFrameNumber = 0;
    lastFrameChangeTime = 0;
    direction: Direction;
    animations: AbstractAnimationsConfig;

    protected constructor(config: AnimatedDrawableConfig, public animationType: AnimationType) {
        super(config);
        this.direction = config.defaultDirection;
        this.animations = config.animations;
    }

    abstract getCurrentAnimation(): AnimationConfig;

    setAnimation(animationType: AnimationType) {
        this.currentFrameNumber = 0;
        this.animationType = animationType;
    }

}
