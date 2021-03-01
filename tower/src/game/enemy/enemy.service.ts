import {Service} from "typedi";
import {Enemy} from "./enemy";
import {Position} from "../math/position";
import {PathFinderService} from "../path/path-finder.service";
import {CollisionUtils} from "../math/collision-utils";
import {Drawable} from "../drawing/drawable";
import {Missile} from "../tower/missile";
import {Direction} from "../drawing/direction.enum";

@Service()
export class EnemyService {
    private readonly enemySpeed = 0.7; // === 1px per frame === 60px per sec

    private directionToFrameRow = {
        [Direction.down]: 0,
        [Direction.left]: 1,
        [Direction.right]: 2,
        [Direction.up]: 3,
    }

    constructor(private pathFinder: PathFinderService) {
    }

    getNextEnemies(enemies: Enemy[], goal: Drawable, missiles: Missile[]): { nextEnemies: Enemy[], missedEnemies: Enemy[] } {
        const missedEnemies = enemies.filter(enemy => CollisionUtils.isPointInDrawableBounds(enemy.center, goal))
        const nextEnemies = enemies
            .filter(enemy => !missedEnemies.includes(enemy))
            .map(enemy => this.nextEnemy(enemy, goal, missiles))
            .filter(enemy => enemy.lives > 0)
            .sort(this.compare.bind(this))
        return {nextEnemies, missedEnemies};
    }

    private nextEnemy(enemy: Enemy, goal: Drawable, missiles: Missile[]): Enemy {
        const hasBeenHit = !!missiles.find(missile => missile.target.id === enemy.id
            && CollisionUtils.isCollidingWith(missile, enemy))
        const {position, direction} = this.getNextEnemyPositionAndDirection(enemy, goal.center);
        const {currentFrameNumber, lastFrameChangeTime} = this.getNextAnimationFrames(enemy, direction);
        return new Enemy({
            id: enemy.id,
            enemyType: enemy.enemyType,
            center: position,
            maxLives: enemy.maxLives,
            lives: hasBeenHit ? enemy.lives - 1 : enemy.lives,
            lastFrameChangeTime: lastFrameChangeTime,
            currentFrameXNumber: currentFrameNumber,
            currentFrameYNumber: this.directionToFrameRow[direction],
            direction: direction,
        });
    }

    // fixme too big
    private getNextEnemyPositionAndDirection(enemy: Enemy, goal: Position): { position: Position, direction: Direction } {
        const currentPosition = enemy.center;// TODO base position on center
        const futurePosition = this.pathFinder.findNextPathPosition(currentPosition, goal);

        if (!futurePosition) {
            console.error('No path found', enemy.center, goal, this.pathFinder.getGridInfo())
            throw new Error('No path found!')
        }

        // Pytagore to the rescue
        const width = futurePosition.x - currentPosition.x + 5 /*FIXME hardcoded to direct to center of grid square*/;
        const height = futurePosition.y - currentPosition.y;
        if (width === 0 && height === 0) {
            return {position: goal, direction: Direction.right};
        }

        const diagonal = Math.sqrt(width ** 2 + height ** 2);

        // width / diagonal === newWidth / stepSize => stepSize * width / diagonal
        const xStep = this.enemySpeed * width / diagonal;
        const yStep = this.enemySpeed * height / diagonal;

        const nextPosition = {
            x: currentPosition.x + xStep,
            y: currentPosition.y + yStep
        };
        if (isNaN(nextPosition.x)) {
            throw new Error('isNan')
        }
        const direction = this.getNextDirection(xStep, yStep);

        return {position: nextPosition, direction: direction};
    }


    private compare(enemy1: Enemy, enemy2: Enemy): number {
        return enemy1.y < enemy2.y ? -1 : enemy1.y > enemy2.y ? 1 : 0
    }

    // FIXME put in super?
    private getNextAnimationFrames(enemy: Enemy, direction: Direction) {
        if (Date.now() > enemy.lastFrameChangeTime + 200) {
            return {
                currentFrameNumber: enemy.currentFrameXNumber >= enemy.numberOfFrames - 1 ? 0 : enemy.currentFrameXNumber + 2,
                lastFrameChangeTime: Date.now()
            }
        }
        return {
            currentFrameNumber: enemy.currentFrameXNumber,
            lastFrameChangeTime: enemy.lastFrameChangeTime
        }
    }

    private getNextDirection(xStep: number, yStep: number): Direction {
        const isLateral = Math.abs(xStep) > Math.abs(yStep);
        if (isLateral) {
            return xStep > 0 ? Direction.right : Direction.left;
        }
        return yStep > 0 ? Direction.down : Direction.up
    }

}
