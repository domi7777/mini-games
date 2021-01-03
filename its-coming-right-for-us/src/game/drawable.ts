import {DrawableConfig} from "../config";

export class Drawable {
    shouldDraw = true;
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    private config: DrawableConfig;

    constructor(config: DrawableConfig) {
        this.x = config.x
        this.y = config.y
        this.width = config.width;
        this.height = config.height;
        this.image = new Image();
        this.image.src = config.image.default;
        this.config = config;
    }
}
