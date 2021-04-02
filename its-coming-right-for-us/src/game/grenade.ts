import {Drawable} from "./drawing/drawable";
import {DrawableConfig} from "./drawing/drawable-config";

export class Grenade extends Drawable {
    max = 3;
    remaining = this.max;

    constructor(config: DrawableConfig) {
        super(config)
    }
}
