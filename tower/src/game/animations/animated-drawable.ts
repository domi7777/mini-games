import {Drawable, DrawableConfig} from "../drawing/drawable";
import {Direction} from "../drawing/direction.enum";
import {Position} from "../math/position";

export interface AnimatedDrawableConfig extends DrawableConfig {
    framesStartPosition: Position,
    lastFrameChangeTime?: number;
    currentFrameXNumber?: number;
    currentFrameYNumber?: number;
    numberOfFrames?: number,
    direction?: Direction;
}

export abstract class AnimatedDrawable extends Drawable {
    readonly currentFrameXNumber: number;
    readonly currentFrameYNumber: number;
    readonly lastFrameChangeTime: number;
    readonly numberOfFrames: number;
    readonly framesStartPosition: Position;
    readonly direction?: Direction;

    protected constructor(config: AnimatedDrawableConfig) {
        super(config);
        this.direction = config.direction || Direction.right;
        this.numberOfFrames = config.numberOfFrames || 1;
        this.currentFrameXNumber = config.currentFrameXNumber || 0;
        this.currentFrameYNumber = config.currentFrameYNumber || 0;
        this.lastFrameChangeTime = config.lastFrameChangeTime || 0;
        this.framesStartPosition = config.framesStartPosition;
    }

}
