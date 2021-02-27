import {Position} from "../math/position";
import {DrawableConfig} from "./drawable-config";

export abstract class Drawable {
    shouldDraw = true;
    position: Position;
    width: number;
    height: number;
    image?: HTMLImageElement;
    config: DrawableConfig;
    scale: number;
    color?: string;
    filledWithColor?: boolean;

    protected constructor(config: DrawableConfig) {
        this.position = {x: config.x, y: config.y}
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
        this.filledWithColor = config.filledWithColor;
        if (config.image) {
            this.image = new Image();
            this.image.src = config.image.default;
        }
        this.config = config;
        this.scale = config.scale || 1;

    }

    get x() {
        return this.position.x;
    }

    set x(x: number) {
        if (isNaN(x)) {
            throw new Error('isNan');
        }
        this.position.x = x;
    }

    get y() {
        return this.position.y;
    }

    set y(y: number) {
        this.position.y = y
    }

    get center(): Position {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
    }
    set center(position: Position) {
        this.x = position.x - this.width / 2;
        this.y = position.y - this.height / 2;
    }

    get bottom(): Position {
        return {
            x: this.center.x,
            y: this.center.y + this.height / 2
        }
    }

    get top(): Position {
        return {
            x: this.center.x,
            y: this.center.y - this.height / 2
        }
    }

    get left(): Position {
        return {
            x: this.center.x - this.width / 2,
            y: this.center.y
        }
    }

    get right(): Position {
        return {
            x: this.center.x + this.width / 2,
            y: this.center.y
        }
    }

    get topLeft(): Position {
        return {
            x: this.center.x - this.width / 2,
            y: this.center.y - this.height / 2
        }
    }

    get bottomLeft(): Position {
        return {
            x: this.center.x - this.width / 2,
            y: this.center.y + this.height / 2
        }
    }

    get topRight(): Position {
        return {
            x: this.center.x + this.width / 2,
            y: this.center.y - this.height / 2
        }
    }

    get bottomRight(): Position {
        return {
            x: this.center.x + this.width / 2,
            y: this.center.y + this.height / 2
        }
    }


}
