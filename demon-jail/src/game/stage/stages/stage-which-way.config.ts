import {StageConfig, stageEnemyConfigs, WaveConfig} from "./stage-config";
import {StageType} from "../stage-type";
import {StageDifficulty} from "../stage-difficulty";
import {EnemyType} from "../../enemy/enemy-type.enum";

const waves: WaveConfig[] = [
    {enemies: [...stageEnemyConfigs(5, {type: EnemyType.blob})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.blob})]},
    {enemies: [...stageEnemyConfigs(5, {type: EnemyType.bat})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.bat})]},
    {enemies: [{type: EnemyType.blob, scale: 1, lives: 30}]},
    {enemies: [...stageEnemyConfigs(5, {type: EnemyType.bat}, {type: EnemyType.blob})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.bat}, {type: EnemyType.blob})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.bat}, {type: EnemyType.blob})]},
    {enemies: [{type: EnemyType.blob, scale: 1, lives: 30}, {type: EnemyType.bat, scale: 1, lives: 30}]},
    {enemies: [...stageEnemyConfigs(1, {type: EnemyType.ghost})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.ghost})]},
    {enemies: [...stageEnemyConfigs(10, {type: EnemyType.ghost}, {type: EnemyType.blob}, {type: EnemyType.bat})]},

];

export const stageWhichWayConfig: StageConfig = {
    type: StageType.which_way,
    subtitle: '...is the pub?',
    asset: require('../../../../assets/stages/which-way.png'),
    configPerDifficulty: {
        [StageDifficulty.easy]: {
            startMoney: 300,
            waves: waves
        },
        [StageDifficulty.medium]: {
            startMoney: 200,
            waves: waves
        },
        [StageDifficulty.hard]: {
            startMoney: 100,
            waves: waves
        }
    }
}
