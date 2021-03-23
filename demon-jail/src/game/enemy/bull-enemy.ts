import {Enemy, EnemyConfig, EnemyType} from "./enemy";

export class BullEnemy extends Enemy {
    constructor(enemyConfig: EnemyConfig) {
        super({enemyType: EnemyType.bull, maxLives: 50, speed: 3, ...enemyConfig});
    }
}
