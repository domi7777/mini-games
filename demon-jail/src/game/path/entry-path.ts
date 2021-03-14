import {Drawable} from "../drawing/drawable";
import {Position} from "../math/position/position";
import {Dimension} from "../math/dimension";

export class EntryPath extends Drawable {

    constructor(
        public readonly position: Position,
        public readonly dimensions: Dimension,
    ) {
        super({
            width: dimensions.width,
            height: dimensions.height,
            image: null,
            filledWithColor: false,
            x: position.x,
            y: position.y,
            color: 'grey',
            opacity: 0
        });
    }
}
