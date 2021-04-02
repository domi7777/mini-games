import {StageConfig, stageEnemyConfigs, WaveConfig} from "./stage-config";
import {StageType} from "../stage-type";
import {StageDifficulty} from "../stage-difficulty";
import {EnemyType} from "../../enemy/enemy-type.enum";

const waves: WaveConfig[] = [
    {enemies: [...stageEnemyConfigs(5, {type: EnemyType.orc})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.orc})]},
    {enemies: [...stageEnemyConfigs(5, {type: EnemyType.bull})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.bull})]},
    {enemies: [{type: EnemyType.orc, scale: 1, lives: 50/*TODO multiplier?*/}]},
    {enemies: [...stageEnemyConfigs(5, {type: EnemyType.bull}, {type: EnemyType.orc})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.bull}, {type: EnemyType.orc})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.bull}, {type: EnemyType.orc})]},
    {enemies: [{type: EnemyType.orc, scale: 1, lives: 50}, {type: EnemyType.bull, scale: 1, lives: 100}]},
    {enemies: [...stageEnemyConfigs(1, {type: EnemyType.succubus})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.succubus})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.succubus}, {type: EnemyType.orc}, {type: EnemyType.bull})]},
];

export const stageCrossConfig: StageConfig = {
    type: StageType.cross,
    subtitle: '...fingers',
    asset: require('../../../../assets/stages/cross.png'),
    configPerDifficulty: {
        [StageDifficulty.easy]: {
            startMoney: 3000,
            waves: waves
        },
        [StageDifficulty.medium]: {
            startMoney: 2000,
            waves: waves
        },
        [StageDifficulty.hard]: {
            startMoney: 1000,
            waves: waves
        }
    }
}
