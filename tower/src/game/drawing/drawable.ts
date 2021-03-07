import {Position} from "../math/position/position";
import {Dimension} from "../math/dimension";

export interface DrawableConfig {
    x: number,
    y: number,
    width: number,
    height: number,
    image?: any; // TODO not sure which type (webpack)
    scale?: number;
    color?: string;
    filledWithColor?: boolean;
    drawShape?: boolean;
    opacity?: number
    tileConfig?: TileConfig;
}

export interface TileConfig {
    start: Position;
    dimensions: Dimension;
}

export abstract class Drawable implements Position, Dimension {
    shouldDraw = true;
    position: Position;
    width: number;
    height: number;
    image?: HTMLImageElement;
    scale: number;
    color?: string;
    filledWithColor?: boolean;
    drawShape = true;
    opacity = 1;
    tileConfig?: TileConfig;

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
        this.scale = config.scale || 1;
        if (config.drawShape !== undefined) {
            this.drawShape = config.drawShape;
        }
        if (config.opacity !== undefined) {
            this.opacity = config.opacity;
        }
        this.tileConfig = config.tileConfig;
    }

    getChildren(): Drawable[] {
        return [];
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
            x: this.x + (this.width / 2) * this.scale,
            y: this.y + (this.height / 2) * this.scale
        }
    }

    set center(position: Position) {
        this.x = position.x - (this.width / 2) * this.scale;
        this.y = position.y - (this.height / 2) * this.scale;
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

    asPositionAndDimension(): Dimension & Position {
        return {
            y: this.y,
            x: this.x,
            width: this.width,
            height: this.height
        }
    }

}
