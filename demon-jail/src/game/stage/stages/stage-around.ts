import {Stage} from "../stage";
import {Enemy} from "../../enemy/enemy";
import {BatEnemy} from "../../enemy/bat-enemy";
import {StageType} from "../stage-type";
import {StageDifficulty} from "../stage-difficulty";

export class StageAround extends Stage {
    timeBetweenWaves = 0;
    protected moneyPerDifficulty = {
        [StageDifficulty.easy]: 1000,
        [StageDifficulty.medium]: 500,
        [StageDifficulty.hard]: 250,
    };

    constructor() {
        super(
            require('../../../../assets/stages/around.png'),
            StageType.around,
            '...the world'
        );
    }

    protected getEasyDifficultyEnemies(): Enemy[] {
        const enemies: Enemy[] = [];
        let delay = 0;
        enemies.push(new BatEnemy({position: this.entryPosition, spawnDelay: delay, maxLives: 50}));
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
