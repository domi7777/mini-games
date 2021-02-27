import {Drawable} from "../drawing/drawable";
import {Missile} from "./missile";
import {Enemy} from "../enemy/enemy";
import {Position} from "../math/position";

export class Tower extends Drawable {

    public readonly reloadTime = 1000;
    public readonly shootingRadius = 120;

    constructor(
        public readonly position: Position,
        public readonly lastShootTimestamp = 0,
        public readonly missiles: Missile[] = []
    ) {
        super({
            height: 30,
            width: 30,
            image: null,
            x: position.x,
            y: position.y,
            color: 'green',
            filledWithColor: true
        });
    }

    findEnemyToShoot(enemies: Enemy[]): Enemy | null {
        if (this.lastShootTimestamp + this.reloadTime < Date.now()) {
            return enemies.find(enemy => this.isInRadius(enemy.center)) || null;
        }
        return null;
    }

    private isInRadius(center: Position): boolean {
        const squareDist = (this.center.x - center.x) ** 2 + (this.center.y - center.y) ** 2;
        return squareDist <= this.shootingRadius ** 2;
    }
}
