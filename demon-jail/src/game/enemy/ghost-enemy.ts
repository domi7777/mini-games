import {Enemy, EnemyConfig, EnemyType} from "./enemy";

export class GhostEnemy extends Enemy {
    constructor(enemyConfig: EnemyConfig) {
        super({enemyType: EnemyType.ghost, maxLives: 30, scoreValue: 60, ...enemyConfig});
    }
}
