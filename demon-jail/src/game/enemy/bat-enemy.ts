import {Enemy, EnemyConfig, EnemyType} from "./enemy";

export class BatEnemy extends Enemy {
    constructor(enemyConfig: EnemyConfig) {
        super({enemyType: EnemyType.bat, maxLives: 5, scoreValue: 10, ...enemyConfig});
    }
}
