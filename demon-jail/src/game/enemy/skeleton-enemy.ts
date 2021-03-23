import {Enemy, EnemyConfig, EnemyType} from "./enemy";

export class SkeletonEnemy extends Enemy {
    constructor(enemyConfig: EnemyConfig) {
        super({enemyType: EnemyType.skeleton, maxLives: 30, speed: 4, ...enemyConfig});
    }
}
