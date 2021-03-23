import {Enemy, EnemyConfig, EnemyType} from "./enemy";

export class VampireEnemy extends Enemy {
    constructor(enemyConfig: EnemyConfig) {
        super({enemyType: EnemyType.vampire, maxLives: 25, speed: 7, ...enemyConfig});
    }
}
