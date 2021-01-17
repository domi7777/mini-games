import {DogAnimationType} from "./dog-animation.type";
import {AnimatedDrawableConfig} from "../drawing/drawable-config";
import {Direction} from "../drawing/direction.enum";
import {sprites} from "../sprites/sprites-config";
import {AbstractAnimationsConfig, AnimationConfig} from "../animations/animation.config";

export interface DogAnimationsConfig extends AbstractAnimationsConfig {
    [DogAnimationType.oneDuck]: AnimationConfig;
    [DogAnimationType.twoDucks]: AnimationConfig;
    [DogAnimationType.laughing]: AnimationConfig;
}

export interface DogConfig extends AnimatedDrawableConfig<DogAnimationType> {
    animations: DogAnimationsConfig;
    speed: number;
}

const dogAnimationsConfig: DogAnimationsConfig = {
    timeBetweenFrameChange: 100,
    [DogAnimationType.oneDuck]: {x: 318, y: 0, frames: 1},
    [DogAnimationType.twoDucks]: {x: 318, y: 61, frames: 1},
    [DogAnimationType.laughing]: {x: 192, y: 61, frames: 2},
}

export const dogConfig: DogConfig = {
    animations: dogAnimationsConfig,
    x: 0, // this one is random
    y: 520,
    defaultDirection: Direction.right,
    height: 45,
    width: 60,
    image: sprites.duckHunt,
    defaultAnimationType: DogAnimationType.oneDuck,
    scale: 2,
    speed: 3,
}


