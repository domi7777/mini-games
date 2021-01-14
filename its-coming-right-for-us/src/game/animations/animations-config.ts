import {Point} from "../drawing/point";
import {AnimationType} from "./animation-type.enum";

export interface AnimationConfig extends Point {
    frames: number;
}

export interface AbstractAnimationsConfig {
    timeBetweenFrameChange: number;
}

export interface DuckAnimationsConfig extends AbstractAnimationsConfig {
    timeBetweenDeathAndFallTime: number;
    fallingSpeed: number;
    [AnimationType.horizontal]: AnimationConfig;
    [AnimationType.diagonal]: AnimationConfig;
    [AnimationType.vertical]: AnimationConfig;
    [AnimationType.hit]: AnimationConfig;
    [AnimationType.fall]: AnimationConfig;
}

export type AnimationsConfig = {
    purpleDuck: DuckAnimationsConfig;
    greenDuck: DuckAnimationsConfig;
    brownDuck: DuckAnimationsConfig;
}
const defaultConfig = {
    timeBetweenFrameChange: 150,
    timeBetweenDeathAndFallTime: 350,
    fallingSpeed: 4
}
export const animationsConfig: AnimationsConfig = {
    purpleDuck: {
        ...defaultConfig,
        [AnimationType.horizontal]: {frames: 3, x: 0, y: 117},
        [AnimationType.diagonal]: {frames: 3, x: 0, y: 156},
        [AnimationType.vertical]: {frames: 3, x: 0, y: 199},
        [AnimationType.hit]: {frames: 1, x: 0, y: 236},
        [AnimationType.fall]: {frames: 1, x: 40, y: 236},
    },
    greenDuck: {
        ...defaultConfig,
        [AnimationType.horizontal]: {frames: 3, x: 130, y: 117},
        [AnimationType.diagonal]: {frames: 3, x: 130, y: 156},
        [AnimationType.vertical]: {frames: 3, x: 130, y: 199},
        [AnimationType.hit]: {frames: 1, x: 130, y: 236},
        [AnimationType.fall]: {frames: 1, x: 170, y: 236},
    },
    brownDuck: {
        ...defaultConfig,
        [AnimationType.horizontal]: {frames: 3, x: 260, y: 117},
        [AnimationType.diagonal]: {frames: 3, x: 260, y: 156},
        [AnimationType.vertical]: {frames: 3, x: 260, y: 199},
        [AnimationType.hit]: {frames: 1, x: 260, y: 236},
        [AnimationType.fall]: {frames: 1, x: 300, y: 236},
    }
}
