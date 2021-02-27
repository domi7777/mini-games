import {Drawable} from "../drawing/drawable";
import {Position} from "../math/position";
import {Dimension} from "../math/dimension";

export class Wall extends Drawable {

    constructor(
        public readonly position: Position = {x: 0, y: 0},
        public readonly dimensions: Dimension = {height: 10, width: 10},// FIXME should be tile compliant
    ) {
        super({
            width: dimensions.width,
            height: dimensions.height,
            image: null,
            x: position.x,
            y: position.y,
            color: '#777777', // FIXME texture
            filledWithColor: true
        });
    }
}
