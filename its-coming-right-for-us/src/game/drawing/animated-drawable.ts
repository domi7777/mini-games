import {AnimatedDrawableConfig} from "../../config";
import {Drawable} from "./drawable";
import {Direction} from "./direction.enum";
import {Point} from "./point";

export class AnimatedDrawable extends Drawable {
    currentFrameNumber = 0;
    fps = 13; //fixme
    totalNumberOfFrames: number;
    direction = Direction.right;
    lastFrameChangeTime = 0;
    timeBetweenFrameChange: number;
    spriteStartingPoint: Point;

    constructor(config: AnimatedDrawableConfig) {
        super(config);
        this.totalNumberOfFrames = config.numberOfFrames;
        this.timeBetweenFrameChange = config.timeBetweenFrameChange;
        this.spriteStartingPoint = config.spriteStartingPoint;
    }

    setDirection(direction: Direction) {
        this.direction = direction;
    }

    setNextFrameNumber(): void {
        if (this.currentFrameNumber === this.totalNumberOfFrames - 1) {
            this.currentFrameNumber = 0;
        } else {
            this.currentFrameNumber++;
        }
    }
}
