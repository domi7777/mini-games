import {Enemy, EnemyConfig, EnemyType} from "./enemy";

export class SuccubusEnemy extends Enemy {
    constructor(enemyConfig: EnemyConfig) {
        super({enemyType: EnemyType.succubus, maxLives: 100, speed: 5, ...enemyConfig});
    }
}
