import {Service} from "typedi";
import {GameState, MapObjectType} from "../game-state";
import {Tower, TowerConfigs, TowerType} from "./tower";
import {CollisionUtils} from "../math/collision-utils";
import {GameCanvas} from "../canvas/game-canvas";
import {MouseOrTouchEvent} from "../utils/mouse-or-touch.event";
import {UserInputService} from "../user-input/user-input-service";
import {PathFinderService} from "../path/path-finder.service";
import {Drawable} from "../drawing/drawable";
import {MissileService} from "./missile/missile-service";

@Service()
export class TowerService {

    constructor(private canvas: GameCanvas,
                private pathFinder: PathFinderService,
                private userInputService: UserInputService,
                private missileService: MissileService
    ) {
    }

    getTowerMouseCursor(mouseOrTouchEvent: MouseOrTouchEvent, gameState: GameState): Drawable {
        const towerType = TowerType.basic; // fixme param?
        const nextTower = gameState.cursorMode === MapObjectType.Tower
            ? <Tower>gameState.mouseCursor
            : new Tower();
        nextTower.position = this.userInputService.getNormalizedMousePosition(mouseOrTouchEvent);
        const canConstructTower = this.canConstructTower(gameState, nextTower, towerType);
        nextTower.color = canConstructTower ? 'green' : 'red';
        nextTower.filledWithColor = true;
        nextTower.opacity = 0.5;
        if (mouseOrTouchEvent.isTouch) {
            nextTower.shouldDraw = !mouseOrTouchEvent.released;
        } else {
            nextTower.shouldDraw = true;
        }
        return nextTower;
    }

    getNextTowers(gameState: GameState, mouseOrTouchEvent: MouseOrTouchEvent): Tower[] {
        gameState.towers.forEach(tower => {
            const {lastShootTs, nextMissiles} = this.missileService.getNextMissiles(tower, gameState);
            tower.lastShootTimestamp = lastShootTs;
            tower.missiles = nextMissiles;
        });
        return this.doGetNextTowers(mouseOrTouchEvent, gameState);
    }

    private doGetNextTowers(mouseOrTouchEvent: MouseOrTouchEvent, gameState: GameState): Tower[] {
        const towerType: TowerType = TowerType.basic;

        if (gameState.cursorMode === MapObjectType.Tower && mouseOrTouchEvent.released && !mouseOrTouchEvent.isMove) {
            const tower = new Tower(towerType, this.userInputService.getNormalizedMousePosition(mouseOrTouchEvent));
            if (this.canConstructTower(gameState, tower, towerType)) {
                this.pathFinder.setObstacle(tower);
                return [...gameState.towers, tower];
            }
        }
        return gameState.towers;
    }

    private canConstructTower(gameState: GameState, nextTower: Tower, towerType: TowerType) {
        return !this.isEnemiesPathBroken(gameState, nextTower)
            && [...gameState.towers, gameState.startPoint, ...gameState.walls]
                .every(drawable => !CollisionUtils.isCollidingWith(drawable, nextTower))
            && gameState.money >= TowerConfigs[towerType].cost;
    }

    private isEnemiesPathBroken(gameState: GameState, tower: Tower) {
        return this.pathFinder.isObstacleBreakingPath(tower, gameState.startPoint.center, gameState.exitPoint.center);
    }

}
