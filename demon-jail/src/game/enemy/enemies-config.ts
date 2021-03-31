import {EnemyType} from "./enemy-type.enum";
import {StageDifficulty} from "../stage/stage-difficulty";

interface BaseEnemyConfig {
    lives: number,
    speed: number
}

type EnemiesConfig = { [enemy in EnemyType]: BaseEnemyConfig };

export const enemiesConfig: EnemiesConfig = Object.seal({
    [EnemyType.blob]:/******/ {lives: 5, speed: 5},
    [EnemyType.bat]:/*******/ {lives: 7, speed: 7},
    [EnemyType.orc]:/*******/ {lives: 10, speed: 5},
    [EnemyType.skeleton]:/**/ {lives: 15, speed: 5},
    [EnemyType.ghost]:/*****/ {lives: 20, speed: 5},
    [EnemyType.bull]:/******/ {lives: 30, speed: 4},
    [EnemyType.vampire]:/***/ {lives: 40, speed: 7},
    [EnemyType.succubus]:/**/ {lives: 50, speed: 6},
});

// TODO service?
export function increaseStatsForDifficulty(enemyConfig: BaseEnemyConfig, difficulty: StageDifficulty): BaseEnemyConfig {
    switch (difficulty) {
        case StageDifficulty.easy:
            return enemyConfig;
        case StageDifficulty.medium:
            return {...enemyConfig, lives: enemyConfig.lives * 1.5, speed: enemyConfig.speed * 1.2};
        case StageDifficulty.hard:
            return {...enemyConfig, lives: enemyConfig.lives * 2, speed: enemyConfig.speed * 1.5};
    }
}
