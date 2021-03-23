import {Stage} from "../stage";
import {Enemy} from "../../enemy/enemy";
import {BatEnemy} from "../../enemy/bat-enemy";
import {BlobEnemy} from "../../enemy/blob-enemy";
import {StageType} from "../stage-type";
import {GhostEnemy} from "../../enemy/ghost-enemy";
import {StageDifficulty} from "../stage-difficulty";

export class StageWhichWay extends Stage {
    protected moneyPerDifficulty = {
        [StageDifficulty.easy]: 1000,
        [StageDifficulty.medium]: 500,
        [StageDifficulty.hard]: 250,
    };

    constructor() {
        super(
            require('../../../../assets/stages/which-way.png'),
            StageType.which_way,
            ''
        );
    }

    protected getEasyDifficultyEnemies(): Enemy[] {
        const enemies: Enemy[] = [];
        let delay = 1000;
        enemies.push(new BatEnemy({position: this.entryPosition, spawnDelay: delay}));
        delay += 2000;
        for (let i = 1; i <= 20; i++) {
            delay += 2000;
            enemies.push(new BatEnemy({position: this.entryPosition, spawnDelay: delay}));
        }
        delay += this.timeBetweenWaves;

        for (let i = 1; i <= 30; i++) {
            delay += 800;
            enemies.push(new BlobEnemy({position: this.entryPosition, spawnDelay: delay}));
        }

        delay += this.timeBetweenWaves;
        enemies.push(new GhostEnemy({position: this.entryPosition, spawnDelay: delay}));

        return enemies;
    }

    protected getMediumDifficultyEnemies(): Enemy[] {
        return [];
    }


    protected getHardDifficultyEnemies(): Enemy[] {
        console.error('TODO getHardDifficultyEnemies')
        return [];
    }
}
