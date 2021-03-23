import {RequiredAsset} from "../assets/asset";
import {Position} from "../math/position/position";
import {Enemy} from "../enemy/enemy";
import {StageDifficulty} from "./stage-difficulty";
import {StageType} from "./stage-type";
import {Constants} from "../constants";

export abstract class Stage {
    readonly name: string;
    readonly mapImage: HTMLImageElement;
    readonly entryPosition: Position = Object.seal({x: Constants.tileSize, y: 0});

    protected readonly timeBetweenWaves: number = 15000;
    protected abstract readonly moneyPerDifficulty: {[difficulty in StageDifficulty]: number};

    protected constructor(
        private requiredAsset: RequiredAsset,
        public stageType: StageType,
        public subtitle: string = ''
    ) {
        this.mapImage = new Image();
        this.mapImage.src = requiredAsset.default;
        this.name = Stage.formatStageName(this.stageType);
    }

    getStartMoney(difficulty: StageDifficulty): number {
        return this.moneyPerDifficulty[difficulty];
    }

    getEnemies(difficulty: StageDifficulty): Enemy[] {
        switch (difficulty) {
            case StageDifficulty.easy:
                return this.getEasyDifficultyEnemies();
            case StageDifficulty.medium:
                return this.getMediumDifficultyEnemies();
            case StageDifficulty.hard:
                return this.getHardDifficultyEnemies();
        }
    }

    private static formatStageName(stageType: StageType): string {
        return stageType.toString()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    protected abstract getEasyDifficultyEnemies(): Enemy[];

    protected abstract getMediumDifficultyEnemies(): Enemy[];

    protected abstract getHardDifficultyEnemies(): Enemy[];
}
