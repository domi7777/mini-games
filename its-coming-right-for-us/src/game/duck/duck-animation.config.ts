import {DuckAnimationType} from "./duck-animation-type.enum";
import {AbstractAnimationsConfig, AnimationConfig} from "../animations/animation.config";

export interface DuckAnimationsConfig extends AbstractAnimationsConfig {
    timeBetweenDeathAndFallTime: number;
    fallingSpeed: number;
    [DuckAnimationType.horizontal]: AnimationConfig;
    [DuckAnimationType.diagonal]: AnimationConfig;
    [DuckAnimationType.vertical]: AnimationConfig;
    [DuckAnimationType.hit]: AnimationConfig;
    [DuckAnimationType.fall]: AnimationConfig;
}

const defaultDuckConfig = {
    timeBetweenFrameChange: 150,
    timeBetweenDeathAndFallTime: 350,
    fallingSpeed: 5
}

type AnimationsConfig = {
    purpleDuck: DuckAnimationsConfig;
    greenDuck: DuckAnimationsConfig;
    brownDuck: DuckAnimationsConfig;
}

export const duckAnimationsConfig: AnimationsConfig = {
    purpleDuck: {
        ...defaultDuckConfig,
        [DuckAnimationType.horizontal]: {frames: 3, x: 0, y: 117},
        [DuckAnimationType.diagonal]: {frames: 3, x: 0, y: 156},
        [DuckAnimationType.vertical]: {frames: 3, x: 0, y: 199},
        [DuckAnimationType.hit]: {frames: 1, x: 0, y: 236},
        [DuckAnimationType.fall]: {frames: 1, x: 40, y: 236},
    },
    greenDuck: {
        ...defaultDuckConfig,
        [DuckAnimationType.horizontal]: {frames: 3, x: 130, y: 117},
        [DuckAnimationType.diagonal]: {frames: 3, x: 130, y: 156},
        [DuckAnimationType.vertical]: {frames: 3, x: 130, y: 199},
        [DuckAnimationType.hit]: {frames: 1, x: 130, y: 236},
        [DuckAnimationType.fall]: {frames: 1, x: 170, y: 236},
    },
    brownDuck: {
        ...defaultDuckConfig,
        [DuckAnimationType.horizontal]: {frames: 3, x: 260, y: 117},
        [DuckAnimationType.diagonal]: {frames: 3, x: 260, y: 156},
        [DuckAnimationType.vertical]: {frames: 3, x: 260, y: 199},
        [DuckAnimationType.hit]: {frames: 1, x: 260, y: 236},
        [DuckAnimationType.fall]: {frames: 1, x: 300, y: 236},
    }
}
