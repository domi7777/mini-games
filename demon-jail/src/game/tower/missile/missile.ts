import {Drawable} from "../../drawing/drawable";
import {Position} from "../../math/position/position";
import {Enemy} from "../../enemy/enemy";

export interface MissileConfig {
    startPosition: Position,
    target: Enemy,
    damage: number
    position?: Position,
    endPosition?: Position,
    rotation?: number,
    scale?: number,
}

export class Missile extends Drawable {
    private static sprites = require('../../../../assets/missiles.png')

    readonly speed = 7;
    readonly startPosition: Position;
    readonly endPosition: Position;
    readonly target: Enemy;
    readonly damage: number;

    constructor(config: MissileConfig) {
        super({
            x: config.position?.x || config.startPosition.x,
            y: config.position?.y || config.startPosition.y,
            width: 25,
            height: 25,
            image: Missile.sprites,
            tileConfig: {
                start: {x: 0, y: 0},
                dimensions: {height: 50, width: 50}
            },
            drawShape: false,
            rotation: config.rotation,
        });
        this.target = config.target;
        this.startPosition = config.startPosition;
        this.endPosition = config.endPosition || this.target.center;
        this.damage = config.damage;
        // re-center the missile
        this.center = this.position;
    }

}
