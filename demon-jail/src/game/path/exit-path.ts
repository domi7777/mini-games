import {Drawable} from "../drawing/drawable";
import {Position} from "../math/position/position";
import {Dimension} from "../math/dimension";

export class ExitPath extends Drawable {

    constructor(
        public readonly position: Position,
        public readonly dimensions: Dimension,
    ) {
        super({
            width: dimensions.width,
            height: dimensions.height,
            image: null,
            x: position.x,
            y: position.y,
            filledWithColor: false,
            color: 'grey',
            opacity: 0
        });
    }
}
