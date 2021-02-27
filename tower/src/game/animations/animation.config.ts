import {Position} from "../math/position";

export interface AnimationConfig extends Position {
    frames: number;
}

export type AbstractAnimationsConfig = {
    timeBetweenFrameChange: number;
}
