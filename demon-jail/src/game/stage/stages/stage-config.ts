import {StageType} from "../stage-type";
import {RequiredAsset} from "../../assets/asset";
import {StageDifficulty} from "../stage-difficulty";
import {EnemyType} from "../../enemy/enemy-type.enum";

interface StageEnemyConfig {
    type: EnemyType;
    delay?: number;
    lives?: number;
    scale?: number;
}

export interface WaveConfig {
    enemies: StageEnemyConfig[]
}

interface BaseStageConfig {
    startMoney: number;
    waves: WaveConfig[];
}

type StageConfigPerDifficulty = { [difficulty in StageDifficulty]: BaseStageConfig }

export interface StageConfig {
    type: StageType;
    subtitle: string;
    asset: RequiredAsset;
    configPerDifficulty/*FIXME name*/: StageConfigPerDifficulty;
}

export function stageEnemyConfigs(number: number, ...stageConfigs: StageEnemyConfig[]): StageEnemyConfig[] {
    const configs: StageEnemyConfig[] = [];
    for (let i = 0; i < number; i++) {
        stageConfigs.forEach((config, index) => {
            configs.push({...config, delay: index === 0 ? config.delay : 0});
        });
    }
    return configs;
}
