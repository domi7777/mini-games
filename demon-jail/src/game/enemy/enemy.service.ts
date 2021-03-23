import {Service} from "typedi";
import {Enemy} from "./enemy";
import {Position} from "../math/position/position";
import {PathFinderService} from "../path/path-finder.service";
import {CollisionUtils} from "../math/collision-utils";
import {Drawable} from "../drawing/drawable";
import {Missile} from "../tower/missile/missile";
import {Direction} from "../drawing/direction.enum";

type EnemiesState = {
    nextEnemies: Enemy[],
    missedEnemies: Enemy[],
    killedEnemies: Enemy[];
};
type PositionAndDirection = { position: Position; direction: Direction };
type XYStep = { xStep: number, yStep: number };

const DirectionToFrameRow = {
    [Direction.down]: 0,
    [Direction.left]: 1,
    [Direction.right]: 2,
    [Direction.up]: 3,
}

@Service()
export class EnemyService {

    constructor(private pathFinder: PathFinderService) {
    }

    getNextEnemiesState(enemies: Enemy[], goal: Drawable, missiles: Missile[], stageFrame: number): EnemiesState {
        enemies.forEach(enemy => this.updateEnemyState(enemy, goal, missiles, stageFrame))
        const missedEnemies = enemies.filter(enemy => CollisionUtils.isCollidingWith(enemy, goal))
        const killedEnemies = enemies.filter(enemy => enemy.lives <= 0);
        const nextEnemies = enemies.filter(enemy => ![...missedEnemies, ...killedEnemies].includes(enemy));
        return {
            nextEnemies,
            missedEnemies,
            killedEnemies
        };
    }

    private updateEnemyState(enemy: Enemy, goal: Drawable, missiles: Missile[], stageFrame: number): void {
        if (stageFrame > enemy.spawnDelay) {
            this.updatePositionAndAnimation(enemy, goal);
            const hasBeenHit = !!missiles.find(missile => missile.target === enemy
                && CollisionUtils.isCollidingWith(missile, enemy))
            if (hasBeenHit) {
                enemy.lives--;
            }
        }
    }

    private updatePositionAndAnimation(enemy: Enemy, goal: Drawable) : void{
        const {position, direction} = this.getNextEnemyPositionAndDirection(enemy.center, goal.center, enemy.speed);
        if (Date.now() > enemy.lastFrameChangeTime + 200) {
            enemy.lastFrameChangeTime = Date.now();
            enemy.currentFrameXNumber = enemy.currentFrameXNumber >= enemy.numberOfFrames - 1
                ? 0
                : enemy.currentFrameXNumber + 2; // TODO hardcoded: skip the middle frame (which is idle movement)
        }
        enemy.currentFrameYNumber = DirectionToFrameRow[direction];
        enemy.direction = direction;
        enemy.center = position;
    }

    private getNextEnemyPositionAndDirection(currentPosition: Position,
                                             goal: Position, speed: number): PositionAndDirection {
        const futurePosition = this.pathFinder.findNextPathPosition(currentPosition, goal);
        if (!futurePosition) {
            console.error('No path found', currentPosition, goal, this.pathFinder.getGridInfo())
            throw new Error('No path found!')
        }
        const {xStep, yStep} = this.getNextStep(currentPosition, futurePosition, speed);
        const nextPosition: Position = {
            x: currentPosition.x + xStep,
            y: currentPosition.y + yStep
        };
        const direction = this.getNextDirection(xStep, yStep);
        return {position: nextPosition, direction: direction};
    }

    private getNextStep(currentPosition: Position, futurePosition: Position, speed: number): XYStep {
        // Pythagore to the rescue
        const width = futurePosition.x - currentPosition.x + 5 /*FIXME hardcoded to redirect to center of grid square*/;
        const height = futurePosition.y - currentPosition.y;

        const diagonal = Math.sqrt(width ** 2 + height ** 2);

        // width / diagonal === newWidth / stepSize => stepSize * width / diagonal
        const xStep = speed * width / diagonal;
        const yStep = speed * height / diagonal;
        if (isNaN(xStep)) {
            throw new Error('xStep isNan')
        }
        if (isNaN(yStep)) {
            throw new Error('yStep isNan')
        }
        return {xStep, yStep};
    }

    private getNextDirection(xStep: number, yStep: number): Direction {
        const isHorizontalMovementBigger = Math.abs(xStep) > Math.abs(yStep);
        if (isHorizontalMovementBigger) {
            return xStep > 0 ? Direction.right : Direction.left;
        }
        return yStep > 0 ? Direction.down : Direction.up
    }

}
