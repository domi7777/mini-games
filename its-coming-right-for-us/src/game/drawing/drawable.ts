import {Point} from "./point";
import {DrawableConfig} from "./drawable-config";

export abstract class Drawable {
    shouldDraw = true;
    position: Point;
    width: number;
    height: number;
    image: HTMLImageElement;
    private config: DrawableConfig;

    protected constructor(config: DrawableConfig) {
        this.position = {x: config.x, y: config.y}
        this.width = config.width;
        this.height = config.height;
        this.image = new Image();
        this.image.src = config.image.default;
        this.config = config;
    }

    get x() {
        return this.position.x;
    }

    set x(x: number) {
        this.position.x = x;
    }

    get y() {
        return this.position.y;
    }

    set y(y: number) {
        this.position.y = y
    }


}
