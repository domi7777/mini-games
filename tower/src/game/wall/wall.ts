import {Position} from "../math/position/position";
import {Dimension} from "../math/dimension";
import {Constants} from "../constants";
import {Drawable} from "../drawing/drawable";
import {RandomUtils} from "../utils/random.utils";

const sprites = require('../../../assets/tiles.png');

const wallsPositions: Position[] = [
    {x: 96, y: 32},
    {x: 112, y: 32},
    {x: 96, y: 48},
    {x: 112, y: 48},
];

export class Wall extends Drawable {

    constructor(
        public position: Position = {x: 0, y: 0}
    ) {
        super({
            width: Constants.tileSize,
            height: Constants.tileSize,
            image: sprites,
            x: position.x,
            y: position.y,
            color: '#777777',
            filledWithColor: true,
            tileConfig: {
                dimensions: {width: Constants.tileSize, height: Constants.tileSize},
                start: wallsPositions[RandomUtils.getNumber(0, 4)]
            }
        });
    }

}
