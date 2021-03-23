import {Stage} from "../stage";
import {Enemy} from "../../enemy/enemy";
import {StageType} from "../stage-type";
import {StageDifficulty} from "../stage-difficulty";
import {OrcEnemy} from "../../enemy/orc-enemy";

export class StageCross extends Stage {
    timeBetweenWaves = 0;
    protected moneyPerDifficulty = {
        [StageDifficulty.easy]: 1500,
        [StageDifficulty.medium]: 500,
        [StageDifficulty.hard]: 250,
    };

    constructor() {
        super(
            require('../../../../assets/stages/cross.png'),
            StageType.cross,
            '...fingers'
        );
    }

    protected getEasyDifficultyEnemies(): Enemy[] {// FIXME more like medium/hard, with 1500 and simple towers
        const enemies: Enemy[] = [];
        let delay = 0;

        for (let i = 0; i < 25; i++) {
            delay += 1000;
            enemies.push(new OrcEnemy({position: this.entryPosition, spawnDelay: delay}));
        }
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
