import {Direction} from "./direction.enum";
import {AbstractAnimationsConfig} from "../animations/animation.config";

export interface DrawableConfig {
    x: number,
    y: number,
    width: number,
    height: number,
    image?: any; // TODO not sure which type (webpack)
    scale?: number;
    color?: string;
    filledWithColor?: boolean;
}


export interface AnimatedDrawableConfig<T> extends DrawableConfig {
    animations: AbstractAnimationsConfig;
    defaultDirection: Direction;
    defaultAnimationType: T;
}
