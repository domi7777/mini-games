import {Service} from "typedi";
import {GameState, MapObjectType} from "../game-state";
import {MouseClickEvent} from "../utils/mouse-click.event";
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

    getNextWalls(gameState: GameState, mouseClickEvent: MouseClickEvent, mouseMove: MouseEvent) {
        if (!mouseClickEvent.released && gameState.cursorMode === MapObjectType.Wall) {
            console.log('mouse released')
            // FIXME if mouse if moved "too" fast some blocks are not built
            const position = this.userInputService.getNormalizedMousePosition(mouseMove);
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

    getWallMouseCursor(mouseMove: MouseEvent, gameState: GameState): Drawable {
        const position = this.userInputService.getNormalizedMousePosition(mouseMove);
        const wall = gameState.cursorMode === MapObjectType.Wall
            ? <Wall>gameState.mouseCursor
            : new Wall();
        // wall.center = this.getNormalizedMousePosition(mouseMove);
        wall.position = position;
        wall.color = this.isEnemiesPathBroken(gameState, wall) ? 'red' : 'green';
        wall.filledWithColor = true;
        wall.opacity = 0.5;
        return wall;
    }

    _create(position: Position, dimensions: Dimension = {width: Constants.tileSize, height: Constants.tileSize}): Wall[] {
        const normalizedPosition = this.pathFinder.normalizePositionToTilePosition(position);
        const walls: Wall[] = [];
        const xWalls = Math.round(dimensions.width / Constants.tileSize);
        const yWalls = Math.round(dimensions.height / Constants.tileSize);
        for (let xWall = 0; xWall < xWalls; xWall++) {
            for (let yWall = 0; yWall < yWalls; yWall++) {
                walls.push(
                    new Wall({
                        x: normalizedPosition.x + (xWall * Constants.tileSize),
                        y: normalizedPosition.y + (yWall * Constants.tileSize)
                    })
                );
            }
        }
        return walls;
    }

    private isEnemiesPathBroken(gameState: GameState, wall: Wall) {
        return this.pathFinder.isObstacleBreakingPath(wall, gameState.startPoint.center, gameState.exitPoint.center);
    }
}
