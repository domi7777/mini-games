import {Service} from "typedi";
import {GameState, MapObjectType} from "../game-state";
import {Missile} from "./missile";
import {Tower} from "./tower";
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

    getNextTowers(gameState: GameState, mouseClickEvent: MouseClickEvent, mouseMove: MouseEvent) {
        gameState.towers
            .forEach(tower => {
                const enemyToShoot = tower.findEnemyToShoot(gameState.enemies);
                const lastShootTs = enemyToShoot ? Date.now() : tower.lastShootTimestamp;
                const missiles = enemyToShoot
                    ? [...tower.missiles, new Missile({target: enemyToShoot, startPosition: tower.center})]
                    : tower.missiles;
                const nextMissiles: Missile[] = <Missile[]>missiles
                    .filter(missile => !this.isMissileDestroyed(missile, gameState.enemies))
                    .map(missile => this.getNextMissile(missile, gameState.enemies))
                    .filter(missile => missile !== null);
                tower.lastShootTimestamp = lastShootTs;
                tower.missiles = nextMissiles;
            });
        if (!mouseClickEvent.released /*TODO and is adding towers mode*/) {
            const position = this.userInputService.getNormalizedMousePosition(mouseMove);
            const alreadyExist = gameState.towers
                .map(tower => tower.position)
                .some(existingPosition => existingPosition.x === position.x && existingPosition.y === position.y); // fixme towers are bigger
            if (!alreadyExist) {
                const tower = new Tower(position)
                if (!this.isEnemiesPathBroken(gameState, tower)) {
                    this.pathFinder.setObstacle(tower);
                    return [tower, ...gameState.towers];
                }
            }
        }
        return gameState.towers;
    }

    getTowerMouseCursor(mouseMove: MouseEvent, gameState: GameState): Drawable {
        const position = this.userInputService.getNormalizedMousePosition(mouseMove);
        const tower = gameState.cursorMode === MapObjectType.Tower
            ? <Tower>gameState.mouseCursor
            : new Tower();
        // wall.center = this.getNormalizedMousePosition(mouseMove);
        tower.position = position;
        tower.color = this.isEnemiesPathBroken(gameState, tower) ? 'red' : 'green';
        tower.filledWithColor = true;
        tower.opacity = 0.5;
        return tower;
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
