import {Drawable} from "../drawing/drawable";
import {Missile} from "./missile";
import {Enemy} from "../enemy/enemy";
import {Position} from "../math/position/position";
import {override} from "../utils/override.decorator";
import {AscOrDesc, PositionComparator} from "../math/position/position-comparator";
import {Constants} from "../constants";

const sprites = require('../../../assets/towers.png')

export class Tower extends Drawable {

    public readonly reloadTime = 1000;
    public readonly shootingRadius = 120;

    constructor(
        public position: Position = {x: 0, y: 0},
        public lastShootTimestamp = 0,
        public missiles: Missile[] = []
    ) {
        super({
            height: Constants.tileSize * 3,
            width: Constants.tileSize * 2,
            image: sprites,
            x: position.x,
            y: position.y,
            color: 'green',
            filledWithColor: true,
            tileConfig: {
                start: {x: 0, y: 0},
                dimensions: {height: 250, width: 110}
            }
        });
    }

    @override()
    getChildren(): Drawable[] {
        return this.missiles;
    }

    findEnemyToShoot(enemies: Enemy[]): Enemy | null {
        if (this.lastShootTimestamp + this.reloadTime < Date.now()) {
            return enemies
                .sort(PositionComparator.compareByYPosition(AscOrDesc.desc)) // shoot the one closer to bottom first
                .find(enemy => this.isInRadius(enemy.center)) || null;
        }
        return null;
    }

    private isInRadius(center: Position): boolean {
        const squareDist = (this.center.x - center.x) ** 2 + (this.center.y - center.y) ** 2;
        return squareDist <= this.shootingRadius ** 2;
    }
}
