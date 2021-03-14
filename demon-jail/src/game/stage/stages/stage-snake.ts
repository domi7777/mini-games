import {Stage} from "../stage";
import {Position} from "../../math/position/position";
import {Constants} from "../../constants";
import {Enemy} from "../../enemy/enemy";
import {StageType} from "../stage-type";

export class StageSnake extends Stage {

    readonly stageType = StageType.snake;
    readonly entryPosition: Position = Object.seal({x: Constants.tileSize, y: 0});
    readonly startMoney = 50000;

    constructor() {
        super(
            require('../../../../assets/stages/snake.png'),
            'The Snake', // fixme duplicated
            ''
        );
    }

    protected getEasyDifficultyEnemies(): Enemy[] {
        return [];
    }

    protected getMediumDifficultyEnemies(): Enemy[] {
        return [];
    }

    protected getHardDifficultyEnemies(): Enemy[] {
        return [];
    }

}
