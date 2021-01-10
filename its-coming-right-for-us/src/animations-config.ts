import {Point} from "./game/drawing/point";
import {AnimationType} from "./game/animations/animation-type.enum";


export interface AnimationConfig extends Point {
    frames: number;
}

export interface AbstractAnimationsConfig {
    timeBetweenFrameChange: number;
}

export interface DuckAnimationsConfig extends AbstractAnimationsConfig {
    [AnimationType.horizontal]: AnimationConfig;
    [AnimationType.diagonal]: AnimationConfig;
    [AnimationType.vertical]: AnimationConfig;
    [AnimationType.death]: AnimationConfig;
    [AnimationType.fall]: AnimationConfig;
}

export type AnimationsConfig = {
    purpleDuck: DuckAnimationsConfig;
    greenDuck: DuckAnimationsConfig;
    brownDuck: DuckAnimationsConfig;
}
const timeBetweenDuckFrameChange = 200;
export const animationsConfig: AnimationsConfig = {
    purpleDuck: {
        timeBetweenFrameChange: timeBetweenDuckFrameChange,
        [AnimationType.horizontal]: {frames: 3, x: 0, y: 117},
        [AnimationType.diagonal]: {frames: 3, x: 0, y: 156},
        [AnimationType.vertical]: {frames: 3, x: 0, y: 199},
        [AnimationType.death]: {frames: 1, x: 0, y: 236},
        [AnimationType.fall]: {frames: 1, x: 40, y: 236},
    },
    greenDuck: {
        timeBetweenFrameChange:timeBetweenDuckFrameChange,
        [AnimationType.horizontal]: {frames: 3, x: 130, y: 117},
        [AnimationType.diagonal]: {frames: 3, x: 130, y: 156},
        [AnimationType.vertical]: {frames: 3, x: 130, y: 199},
        [AnimationType.death]: {frames: 1, x: 130, y: 236},
        [AnimationType.fall]: {frames: 1, x: 170, y: 236},
    },
    brownDuck: {
        timeBetweenFrameChange: timeBetweenDuckFrameChange,
        [AnimationType.horizontal]: {frames: 3, x: 260, y: 117},
        [AnimationType.diagonal]: {frames: 3, x: 260, y: 156},
        [AnimationType.vertical]: {frames: 3, x: 260, y: 199},
        [AnimationType.death]: {frames: 1, x: 260, y: 236},
        [AnimationType.fall]: {frames: 1, x: 300, y: 236},
    }
}
