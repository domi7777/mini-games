import {Drawable} from "../drawing/drawable";
import {Position} from "../math/position";
import {Enemy} from "../enemy/enemy";

export class Missile extends Drawable {
    readonly speed = 6;

    constructor(
        public readonly startPosition: Position,
        public readonly target: Enemy,
        public readonly position = startPosition,
        public readonly endPosition: Position = target.center) {
        super({
            x: position.x,
            y: position.y,
            width: 5,
            height: 5,
            color: 'yellow'
        });
    }

    move(): Missile {
        // xy?
        /*
        start: x = 10, y = 10;
        end: x = 50, y = 100;
        speedX = end.x - start.x (40)
        speedY = end.y - start.y (90)
        x += (speedX
        y += speed
         */
        // console.log(this.position, this.endPosition)
        // FIXME speed is not constant (see enemy movement)
        const speedX = ((this.endPosition.x - this.startPosition.x) / 100) * this.speed;
        const speedY = ((this.endPosition.y - this.startPosition.y) / 100) * this.speed;
        const minSpeed = 1;
        // const velocity = {
        //     x: Math.abs(speedX) < minSpeed ? (speedX < 0 ? -minSpeed : minSpeed) : speedX,
        //     y:  Math.abs(speedY) < minSpeed ? (speedY < 0 ? -minSpeed : minSpeed) : speedY,
        // }
        return new Missile(
            this.startPosition,
            this.target,
            {x: this.x + speedX, y: this.y + speedY}
        );
    }
}
