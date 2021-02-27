import {Service} from "typedi";
import {Enemy} from "./enemy";
import {Position} from "../math/position";
import {PathFinderService} from "../math/path-finder.service";
import {CollisionUtils} from "../math/collision-utils";
import {Drawable} from "../drawing/drawable";

@Service()
export class EnemyService {

    private enemySpeed = 0.7; // === 1px per frame === 60px per sec

    constructor(private pathFinder: PathFinderService) {
    }

    getNextEnemies(enemies: Enemy[], goal: Drawable): { nextEnemies: Enemy[], missedEnemies: Enemy[] } {
        const missedEnemies = enemies.filter(enemy => CollisionUtils.isPointInDrawableBounds(enemy.center, goal))
        const nextEnemies = enemies
            .filter(enemy => enemy.lives > 0 && !missedEnemies.includes(enemy))
            .map(enemy => enemy.move(this.getNextEnemyPosition(enemy, goal.center)));
        return {nextEnemies, missedEnemies};
    }

    // fixme too big
    private getNextEnemyPosition(enemy: Enemy, goal: Position): Position {
        const currentPosition = enemy.center;// TODO base position on center?
        const futurePosition = this.pathFinder.findNextPathPosition(currentPosition, goal);

        if (!futurePosition) {
            console.error('No path found', enemy.center, goal, this.pathFinder.getGridInfo())
            throw new Error('No path found!')
        }

        // Pytagore to the rescue
        const width = futurePosition.x - currentPosition.x;
        const height = futurePosition.y - currentPosition.y;
        if (width === 0 && height === 0) {
            return goal;
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
        return nextPosition;
    }
}
