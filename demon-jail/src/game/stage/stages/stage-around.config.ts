import {StageConfig, stageEnemyConfigs, WaveConfig} from "./stage-config";
import {StageType} from "../stage-type";
import {StageDifficulty} from "../stage-difficulty";
import {EnemyType} from "../../enemy/enemy-type.enum";

const waves: WaveConfig[] = [
    {enemies: [...stageEnemyConfigs(5, {type: EnemyType.skeleton})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.skeleton})]},
    {enemies: [...stageEnemyConfigs(5, {type: EnemyType.ghost})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.ghost})]},
    {enemies: [{type: EnemyType.skeleton, scale: 1, lives: 50/*TODO multiplier?*/}]},
    {enemies: [...stageEnemyConfigs(5, {type: EnemyType.ghost}, {type: EnemyType.skeleton})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.ghost}, {type: EnemyType.skeleton})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.ghost}, {type: EnemyType.skeleton})]},
    {enemies: [{type: EnemyType.skeleton, scale: 1, lives: 50}, {type: EnemyType.ghost, scale: 1, lives: 60}]},
    {enemies: [...stageEnemyConfigs(1, {type: EnemyType.vampire})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.vampire})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.vampire}, {type: EnemyType.skeleton}, {type: EnemyType.ghost})]},
];

export const stageAroundConfig: StageConfig = {
    type: StageType.around,
    subtitle: '...the world',
    asset: require('../../../../assets/stages/around.png'),
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
