import {AbstractAnimationsConfig} from "../animations/animations-config";
import {Direction} from "./direction.enum";

export interface DrawableConfig {
    x: number,
    y: number,
    width: number,
    height: number,
    image: any; // TODO not sure which type (webpack)
}

export interface AnimatedDrawableConfig extends DrawableConfig {
    animations: AbstractAnimationsConfig;
    defaultDirection: Direction;
}
