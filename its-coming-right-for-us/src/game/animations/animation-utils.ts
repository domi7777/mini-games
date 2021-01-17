import {AnimatedDrawable} from "./animated-drawable";
import {AnimationConfig} from "./animation.config";

export abstract class AnimationUtils {
    static getNextAnimationFrame<T>(drawable: AnimatedDrawable<T>, currentAnimation: AnimationConfig): number {
        return drawable.currentFrameNumber >= currentAnimation.frames - 1
            ? 0
            : drawable.currentFrameNumber + 1;
    }
}
