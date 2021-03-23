import {Service} from "typedi";
import {Missile} from "./missile";
import {Enemy} from "../../enemy/enemy";
import {Tower} from "../tower";
import {GameState} from "../../game-state";
import {CollisionUtils} from "../../math/collision-utils";
import {GameCanvas} from "../../canvas/game-canvas";
import {existing} from "../../utils/existing-function";
import {Position} from "../../math/position/position";


@Service()
export class MissileService {
    private width = this.canvas.width;
    private height = this.canvas.height;

    constructor(private canvas: GameCanvas) {
    }

    getNextMissiles(tower: Tower, gameState: GameState): { lastShootTs: number, nextMissiles: Missile[] } {
        const enemyToShoot = tower.findEnemyToShoot(gameState.enemies);
        const lastShootTs = enemyToShoot ? Date.now() : tower.lastShootTimestamp;
        const missiles = enemyToShoot
            ? [...tower.missiles, this.createNewMissile(enemyToShoot, tower)]
            : tower.missiles;
        const nextMissiles: Missile[] = missiles
            .filter(missile => !this.isMissileDestroyed(missile, gameState.enemies))
            .map(missile => this.getNextMissile(missile, gameState.enemies))
            .filter(existing);
        return {lastShootTs, nextMissiles};
    }

    private createNewMissile(enemyToShoot: Enemy, tower: Tower): Missile {
        return new Missile({
            target: enemyToShoot,
            damage: tower.damage,
            startPosition: tower.center,
            rotation: this.getRotationAngle(tower.center, enemyToShoot.center)
        });
    }

    private getNextMissile(missile: Missile, enemies: Enemy[]): Missile | null {
        if (!enemies.some(enemy => enemy === missile.target)) {
            return null;
        }
        const width = missile.target.center.x - missile.startPosition.x;
        const height = missile.target.center.y - missile.startPosition.y;
        const diagonal = Math.sqrt(width ** 2 + height ** 2);
        const xStep = missile.speed * width / diagonal;
        const yStep = missile.speed * height / diagonal;
        missile.center = {x: missile.center.x + xStep, y: missile.center.y + yStep};
        return missile;
    }

    private isMissileDestroyed(missile: Missile, enemies: Enemy[]/*fixme useless param?*/): boolean {
        return missile.y > this.height
            || missile.y < 0
            || missile.x > this.width
            || missile.x < 0
            || missile.target.y < 0
            || missile.target.y > this.height
            || CollisionUtils.isCollidingWith(missile, missile.target)
    }

    private getRotationAngle(startPosition: Position, endPosition: Position): number {
        const width = endPosition.x - startPosition.x;
        const height = endPosition.y - startPosition.y;
        const hypotenuse = Math.sqrt(width ** 2 + height ** 2);

        // sin(x) = opposite side/hypotenuse
        const angle = Math.asin(height / hypotenuse) * 180 / Math.PI;
        return width < 0 ? 180 - angle /*not sure why this is needed yolo*/ : angle;
    }
}
