import {Enemy, EnemyConfig, EnemyType} from "./enemy";

export class OrcEnemy extends Enemy {
    constructor(enemyConfig: EnemyConfig) {
        super({enemyType: EnemyType.orc, maxLives: 20, ...enemyConfig});
    }
}
