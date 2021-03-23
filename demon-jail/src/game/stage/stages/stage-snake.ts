import {Stage} from "../stage";
import {Enemy} from "../../enemy/enemy";
import {StageType} from "../stage-type";
import {StageDifficulty} from "../stage-difficulty";

export class StageSnake extends Stage {
    protected moneyPerDifficulty = {
        [StageDifficulty.easy]: 500,
        [StageDifficulty.medium]: 300,
        [StageDifficulty.hard]: 200,
    };

    constructor() {
        super(
            require('../../../../assets/stages/snake.png'),
            StageType.the_snake,
            ''
        );
    }

    protected getEasyDifficultyEnemies(): Enemy[] {
        // FIXME
        return [];
    }

    protected getMediumDifficultyEnemies(): Enemy[] {
        // FIXME
        return [];
    }

    protected getHardDifficultyEnemies(): Enemy[] {
        // FIXME
        return [];
    }

}
