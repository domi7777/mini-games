import {Drawable} from "../drawing/drawable";
import {Position} from "../math/position/position";
import {Enemy} from "../enemy/enemy";

export interface MissileConfig {
    startPosition: Position,
    target: Enemy,
    position?: Position,
    endPosition?:Position
}

export class Missile extends Drawable {
    readonly speed = 6;
    readonly startPosition: Position;
    readonly endPosition: Position;
    readonly target: Enemy;

    constructor(config: MissileConfig){
        super({
            x: config.position?.x || config.startPosition.x,
            y: config.position?.y || config.startPosition.y,
            width: 5,
            height: 5,
            color: 'yellow',
            filledWithColor: true
        });
        this.target = config.target;
        this.startPosition = config.startPosition;
        this.endPosition = config.endPosition || this.target.center;
    }

}
