import {AnimatedDrawable} from "./animated-drawable";
import {AnimationConfig} from "../../animations-config";

export abstract class AnimationUtils {
    static getNextAnimationFrame(drawable: AnimatedDrawable, currentAnimation: AnimationConfig): number {
        return drawable.currentFrameNumber >= currentAnimation.frames - 1
            ? 0
            : drawable.currentFrameNumber + 1;
    }
}
