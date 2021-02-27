import {Drawable} from "../drawing/drawable";
import {Position} from "../math/position";

export class Enemy extends Drawable /*TODO animated*/ {
    speed = 1;
    scoreValue: number = 100;

    constructor(position: Position = {x: 150, y: -15}, public lives = 10) {
        super({
            height: 15,
            width: 15,
            image: null,
            x: position.x,
            y: position.y,
            color: 'red'
        });
    }

    // FIXME mutation?
    move(position: Position): Enemy {
        if(isNaN(position.x)) {
            throw new Error('isNan')
        }
        this.center = position;
        return this;
    }
}
