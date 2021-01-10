import {AnimatedDrawableConfig} from "../../config";
import {Drawable} from "../drawing/drawable";
import {Direction} from "../drawing/direction.enum";
import {AbstractAnimationsConfig, AnimationConfig} from "../../animations-config";
import {AnimationType} from "./animation-type.enum";

export abstract class AnimatedDrawable extends Drawable {
    currentFrameNumber = 0;
    lastFrameChangeTime = 0;
    direction = Direction.right;
    animations: AbstractAnimationsConfig;

    protected constructor(config: AnimatedDrawableConfig, public animationType: AnimationType) {
        super(config);
        this.animations = config.animations;
    }

    abstract getCurrentAnimation(): AnimationConfig;

    setDirection(direction: Direction) {
        this.direction = direction;
    }

    setAnimation(animationType: AnimationType) {
        this.animationType = animationType;
    }

}