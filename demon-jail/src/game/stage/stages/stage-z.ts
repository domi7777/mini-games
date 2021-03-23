import {Stage} from "../stage";
import {Enemy} from "../../enemy/enemy";
import {BatEnemy} from "../../enemy/bat-enemy";
import {BlobEnemy} from "../../enemy/blob-enemy";
import {StageType} from "../stage-type";
import {GhostEnemy} from "../../enemy/ghost-enemy";
import {StageDifficulty} from "../stage-difficulty";

export class StageZ extends Stage {
    protected moneyPerDifficulty = {
        [StageDifficulty.easy]: 500,
        [StageDifficulty.medium]: 300,
        [StageDifficulty.hard]: 200,
    };
    protected timeBetweenWaves = 10000;

    constructor() {
        super(
            require('../../../../assets/stages/z.png'),
            StageType.the_z,
            'Add some towers'
        );
    }

    protected getEasyDifficultyEnemies(): Enemy[] {
        const enemies: Enemy[] = [];
        let delay = 1000;
        enemies.push(new BatEnemy({position: this.entryPosition, spawnDelay: delay}));
        delay += 5000;
        for (let i = 1; i <= 20; i++) {
            delay += 2000;
            enemies.push(new BatEnemy({position: this.entryPosition, spawnDelay: delay}));
        }
        delay += this.timeBetweenWaves;

        for (let i = 1; i <= 30; i++) {
            delay += 1000;
            enemies.push(new BlobEnemy({position: this.entryPosition, spawnDelay: delay}));
        }

        delay += this.timeBetweenWaves;
        enemies.push(new GhostEnemy({position: this.entryPosition, spawnDelay: delay}));

        return enemies;
    }

    protected getMediumDifficultyEnemies(): Enemy[] {
        const enemies: Enemy[] = [];
        let delay = 1000;
        enemies.push(new BatEnemy({position: this.entryPosition, spawnDelay: delay, maxLives: 5, scoreValue: 10}));
        delay += 5000;
        for (let i = 1; i <= 20; i++) {
            delay += 1000;
            enemies.push(new BatEnemy({position: this.entryPosition, spawnDelay: delay, maxLives: 5, scoreValue: 10,}));
        }
        delay += this.timeBetweenWaves;

        for (let i = 1; i <= 30; i++) {
            delay += 500;
            enemies.push(new BlobEnemy({position: this.entryPosition, spawnDelay: delay, maxLives: 3, scoreValue: 5}));
        }

        return enemies;
    }


    protected getHardDifficultyEnemies(): Enemy[] {
        console.error('TODO getHardDifficultyEnemies')
        return [];
    }
}
