import {RequiredAsset} from "../assets/asset";
import {Position} from "../math/position/position";
import {Enemy} from "../enemy/enemy";
import {StageDifficulty} from "./stage-difficulty";
import {StageType} from "./stage-type";

export abstract class Stage {
    readonly abstract stageType: StageType;
    readonly abstract entryPosition: Position;
    readonly abstract startMoney: number;

    readonly mapImage: HTMLImageElement;
    readonly timeBetweenWaves = 15000;

    protected constructor(
        private requiredAsset: RequiredAsset,
        public title: string,
        public subtitle: string = ''
    ) {
        this.mapImage = new Image();
        this.mapImage.src = requiredAsset.default;
    }

    getEnemies(difficulty: StageDifficulty): Enemy[] {
        switch (difficulty){
            case StageDifficulty.easy: return this.getEasyDifficultyEnemies();
            case StageDifficulty.medium: return this.getMediumDifficultyEnemies();
            case StageDifficulty.hard: return this.getHardDifficultyEnemies();
        };
    }

    protected abstract getEasyDifficultyEnemies(): Enemy[];
    protected abstract getMediumDifficultyEnemies(): Enemy[];
    protected abstract getHardDifficultyEnemies(): Enemy[];
}
