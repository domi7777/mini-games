import {Service} from "typedi";
import {AStarFinder, DiagonalMovement, Grid} from "pathfinding";
import {Position} from "../math/position";
import {Drawable} from "../drawing/drawable";

@Service()
export class PathFinderService {

    readonly tileSize = 10;

    private readonly width = this.canvas.width;
    private readonly height = this.canvas.height;
    private readonly tilesPerWidth = this.width / this.tileSize;
    private readonly tilesPerHeight = this.height / this.tileSize;

    readonly board: Array<Array<0 | 1>> = new Array(this.tilesPerHeight).fill( // +1 because of 0 based array convenience
        new Array(this.tilesPerWidth).fill(0)
    )

    readonly grid = new Grid(this.board)
    private readonly finder = new AStarFinder({
        diagonalMovement: DiagonalMovement.OnlyWhenNoObstacles
    });

    constructor(private canvas: HTMLCanvasElement) {
        console.log(this.grid)
    }

    findNextPathPosition(startPosition: Position, endPosition: Position, grid: Grid = this.grid.clone()): Position | null {
        if (startPosition.y < 0) {
            return {
                x: startPosition.x,
                y: endPosition.y
            }
        }

        const startPositionTile = this.canvasPositionToTilePosition(startPosition);
        const endPositionTile = this.canvasPositionToTilePosition(endPosition);

        const path = this.finder.findPath(
            startPositionTile.x, // FIXME cache for perf
            startPositionTile.y,
            Math.min(endPositionTile.x, this.tilesPerWidth - 1),
            Math.min(endPositionTile.y, this.tilesPerHeight - 1),
            grid
        );
        // console.log(path)
        // fixme cache path by enemy while grid not modified
        const nextPositionPath = path[1] || path[0];
        if (!nextPositionPath) {
            return null;
        }
        const nextTilePosition = {
            x: nextPositionPath[0],
            y: nextPositionPath[1]
        }
        return this.tilePositionToCanvasPosition(nextTilePosition);
    }

    setObstacle(obstacle: Drawable, grid: Grid = this.grid): void {
        const startTile = this.canvasPositionToTilePosition({x: obstacle.x, y: obstacle.y});
        const endTile = this.canvasPositionToTilePosition({x: obstacle.x + obstacle.width, y: obstacle.y + obstacle.height});
        this.setUnwalkableBetweenTiles(startTile, endTile, grid);
    }

    isObstacleBreakingPath(obstacle: Drawable, startPosition: Position, endPosition: Position): boolean {
        const draftGrid = this.grid.clone();
        this.setObstacle(obstacle, draftGrid);
        return !this.findNextPathPosition(startPosition, endPosition, draftGrid);
    }

    normalizePositionToTilePosition(position: Position): Position {
        return this.tilePositionToCanvasPosition(
            this.canvasPositionToTilePosition(position)
        );
    }

    getGridInfo(): Array<Array<string>> {
        return (this.grid as any)['nodes'].map(
            (subnodes: any[]) => subnodes.map(node => node.walkable ? ' ' : 'X')
        )
    }

    private setUnwalkableBetweenTiles(startTile: Position, endTile: Position, grid: Grid) {
        for (let tileX = startTile.x; tileX < endTile.x; tileX++) {
            for (let tileY = startTile.y; tileY < endTile.y; tileY++) {
                if (grid.isInside(tileX, tileY)) {
                    grid.setWalkableAt(tileX, tileY, false);
                }
            }
        }
    }

    private tilePositionToCanvasPosition(nextPosOnTiles: Position): Position {
        return {
            x: nextPosOnTiles.x * this.tileSize,
            y: nextPosOnTiles.y * this.tileSize
        };
    }

    private canvasPositionToTilePosition(position: Position): Position {
        return {
            x: Math.round(position.x / this.tileSize),
            y: Math.round(position.y / this.tileSize)
        };
    }
}
