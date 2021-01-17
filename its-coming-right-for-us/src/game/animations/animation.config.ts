import {Point} from "../drawing/point";

export interface AnimationConfig extends Point {
    frames: number;
}

export type AbstractAnimationsConfig = {
    timeBetweenFrameChange: number;
}
