import {Service} from "typedi";
import {GameState, MapObjectType} from "../game-state";
import {MouseOrTouchEvent} from "../utils/mouse-or-touch.event";
import {Wall} from "./wall";
import {PathFinderService} from "../path/path-finder.service";
import {Drawable} from "../drawing/drawable";
import {UserInputService} from "../user-input/user-input-service";
import {Position} from "../math/position/position";
import {Dimension} from "../math/dimension";
import {Constants} from "../constants";

@Service()
export class WallService {

    constructor(private pathFinder: PathFinderService, private userInputService: UserInputService) {
    }

    getNextWalls(gameState: GameState, mouseOrTouchEvent: MouseOrTouchEvent) {
        if (!mouseOrTouchEvent.released && gameState.cursorMode === MapObjectType.Wall) {
            console.log('mouse released')
            // FIXME if mouse if moved "too" fast some blocks are not built
            const position = this.userInputService.getNormalizedMousePosition(mouseOrTouchEvent);
            const alreadyExist = gameState.walls
                .map(wall => wall.position)
                .some(existingPosition => existingPosition.x === position.x && existingPosition.y === position.y);
            if (!alreadyExist) {
                const wall = new Wall(position)
                if (!this.isEnemiesPathBroken(gameState, wall)) {
                    this.pathFinder.setObstacle(wall);
                    return [wall, ...gameState.walls];
                }
            }
        }
        return gameState.walls;
    }

    // FIXME duplication with towerService
    getWallMouseCursor(mouseOrTouchEvent: MouseOrTouchEvent, gameState: GameState): Drawable {
        const position = this.userInputService.getNormalizedMousePosition(mouseOrTouchEvent);
        const wall = gameState.cursorMode === MapObjectType.Wall
            ? <Wall>gameState.mouseCursor
            : new Wall();
        // wall.center = this.getNormalizedMousePosition(mouseOrTouchEvent);
        wall.position = position;
        wall.color = this.isEnemiesPathBroken(gameState, wall) ? 'red' : 'green';
        wall.filledWithColor = true;
        wall.opacity = 0.5;
        return wall;
    }

    private isEnemiesPathBroken(gameState: GameState, wall: Wall) {
        return this.pathFinder.isObstacleBreakingPath(wall, gameState.startPoint.center, gameState.exitPoint.center);
    }
}
