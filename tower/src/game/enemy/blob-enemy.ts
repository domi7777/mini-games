import {Enemy, EnemyConfig, EnemyType} from "./enemy";

export class BlobEnemy extends Enemy {
    constructor(enemyConfig: EnemyConfig) {
        super({enemyType: EnemyType.blob, maxLives: 3, scoreValue: 5, ...enemyConfig});
    }
}
