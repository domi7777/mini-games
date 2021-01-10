import {Drawable} from "./drawing/drawable";
import {Point} from "./drawing/point";
import {DrawableConfig} from "./drawing/drawable-config";

export class ShootingCrosshair extends Drawable {
    constructor(config: DrawableConfig) {
        super(config)
    }

    setPosition(point: Point) {
        this.position = {
            x: point.x - this.width/2,
            y: point.y - this.height/2
        }
    }
}
