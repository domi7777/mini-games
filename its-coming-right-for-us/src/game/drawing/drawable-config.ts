import {AbstractAnimationsConfig} from "../animations/animations-config";

export interface DrawableConfig {
    x: number,
    y: number,
    width: number,
    height: number,
    image: any; // TODO not sure which type
}

export interface AnimatedDrawableConfig extends DrawableConfig {
    animations: AbstractAnimationsConfig;
}
