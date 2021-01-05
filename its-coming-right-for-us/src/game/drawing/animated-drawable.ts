import {AnimatedDrawableConfig} from "../../config";
import {Drawable} from "./drawable";
import {Direction} from "./direction.enum";

export class AnimatedDrawable extends Drawable {
    currentFrameNumber = 0;
    fps = 7; //fixme
    totalNumberOfFrames: number;
    direction = Direction.right;
    frames: {
        [Direction.right]: number[];
        [Direction.left]: number[]
    };

    constructor(config: AnimatedDrawableConfig) {
        super(config);
        this.totalNumberOfFrames = config.numberOfFrames;
        this.frames = config.frames;
        this.currentFrameNumber = this.frames[this.direction][0];
    }

    setDirection(direction: Direction) {
        this.direction = direction;
        this.currentFrameNumber = this.frames[this.direction][0];
    }

    setNextFrameNumber(): void {
        const frames = this.frames[this.direction];
        if (this.currentFrameNumber === frames[frames.length - 1]) {
            this.currentFrameNumber = frames[0];
        } else {
            this.currentFrameNumber = frames[1] // fixme if more than 2 frames
            this.currentFrameNumber = frames[1] // fixme if more than 2 frames
        }
    }
}
