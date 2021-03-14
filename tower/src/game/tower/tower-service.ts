import {Service} from "typedi";
import {GameState, MapObjectType} from "../game-state";
import {Missile} from "./missile";
import {Tower, TowerConfigs, TowerType} from "./tower";
import {Enemy} from "../enemy/enemy";
import {CollisionUtils} from "../math/collision-utils";
import {GameCanvas} from "../canvas/game-canvas";
import {MouseClickEvent} from "../utils/mouse-click.event";
import {UserInputService} from "../user-input/user-input-service";
import {PathFinderService} from "../path/path-finder.service";
import {Drawable} from "../drawing/drawable";

@Service()
export class TowerService {

    private width = this.canvas.width;
    private height = this.canvas.height;

    constructor(private canvas: GameCanvas, private pathFinder: PathFinderService, private userInputService: UserInputService) {
    }

    getTowerMouseCursor(mouseMove: MouseEvent, gameState: GameState): Drawable {
        const position = this.userInputService.getNormalizedMousePosition(mouseMove);
        const towerType = TowerType.basic; // fixme param?
        const nextTower = gameState.cursorMode === MapObjectType.Tower
            ? <Tower>gameState.mouseCursor
            : new Tower();
        // wall.center = this.getNormalizedMousePosition(mouseMove);
        nextTower.position = position;
        const canConstructTower = !this.isEnemiesPathBroken(gameState, nextTower)
            && gameState.towers.every(tower => !CollisionUtils.isCollidingWith(tower, nextTower))
            && gameState.money >= TowerConfigs[towerType].cost;
        nextTower.color = canConstructTower ? 'green' : 'red';
        nextTower.filledWithColor = true;
        nextTower.opacity = 0.5;
        return nextTower;
    }

    getNextTowers(gameState: GameState, mouseClickEvent: MouseClickEvent, mouseMove: MouseEvent): Tower[] {
        gameState.towers.forEach(tower => {
            const {lastShootTs, nextMissiles} = this.getNextMissiles(tower, gameState);
            tower.lastShootTimestamp = lastShootTs;
            tower.missiles = nextMissiles;
        });
        return this.doGetNextTowers(mouseClickEvent, gameState, mouseMove);
    }

    private getNextMissiles(tower: Tower, gameState: GameState): { lastShootTs: number, nextMissiles: Missile[] } {
        const enemyToShoot = tower.findEnemyToShoot(gameState.enemies);
        const lastShootTs = enemyToShoot ? Date.now() : tower.lastShootTimestamp;
        const missiles = enemyToShoot
            ? [...tower.missiles, new Missile({target: enemyToShoot, startPosition: tower.center})]
            : tower.missiles;
        const nextMissiles: Missile[] = <Missile[]>missiles
            .filter(missile => !this.isMissileDestroyed(missile, gameState.enemies))
            .map(missile => this.getNextMissile(missile, gameState.enemies))
            .filter(missile => missile !== null);
        return {lastShootTs, nextMissiles};
    }

    private doGetNextTowers(mouseClickEvent: MouseClickEvent, gameState: GameState, mouseMove: MouseEvent): Tower[] {
        const towerType: TowerType = TowerType.basic; // FIXME param?
        const selectedTowerCost = TowerConfigs[towerType].cost;
        if (!mouseClickEvent.released && gameState.cursorMode === MapObjectType.Tower && gameState.money >= selectedTowerCost) {
            const position = this.userInputService.getNormalizedMousePosition(mouseMove);
            const alreadyExist = gameState.towers
                .map(tower => tower.position)
                .some(existingPosition => existingPosition.x === position.x && existingPosition.y === position.y);
            // fixme towers are bigger + duplication with red
            if (!alreadyExist) {
                const tower = new Tower(towerType, position)
                if (!this.isEnemiesPathBroken(gameState, tower)) {
                    this.pathFinder.setObstacle(tower);
                    return [...gameState.towers, tower];
                }
            }
        }
        return gameState.towers;
    }

    private isMissileDestroyed(missile: Missile, enemies: Enemy[]) {
        const b = missile.y > this.height
            || missile.y < 0
            || missile.x > this.width
            || missile.x < 0
            || missile.target.y < 0
            || missile.target.y > this.height
            || CollisionUtils.isCollidingWith(missile, missile.target)
        return b
    }

    private getNextMissile(missile: Missile, enemies: Enemy[]): Missile | null {
        // FIXME speed not constant
        const speedX = ((missile.endPosition.x - missile.startPosition.x) / 100) * missile.speed;
        const speedY = ((missile.endPosition.y - missile.startPosition.y) / 100) * missile.speed;
        const minSpeed = 1;
        // const velocity = {
        //     x: Math.abs(speedX) < minSpeed ? (speedX < 0 ? -minSpeed : minSpeed) : speedX,
        //     y:  Math.abs(speedY) < minSpeed ? (speedY < 0 ? -minSpeed : minSpeed) : speedY,
        // }
        const target = enemies.find(enemy => enemy === missile.target);
        if (!target) {
            return null;
        }
        return new Missile({
            startPosition: missile.startPosition,
            position: {x: missile.x + speedX, y: missile.y + speedY},
            target: target
        });
    }

    private isEnemiesPathBroken(gameState: GameState, tower: Tower) {
        return this.pathFinder.isObstacleBreakingPath(tower, gameState.startPoint.center, gameState.exitPoint.center);
    }

}
