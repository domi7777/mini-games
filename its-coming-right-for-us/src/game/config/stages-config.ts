import {animationsConfig} from "../animations/animations-config";
import {sprites} from "./sprites-config";
import {EnemyConfig} from "../enemy/enemy-config";

export interface StageConfig {
    numberOfEnemies: number;
    enemy: EnemyConfig;
}

const defaultDuckConfig = {
    speed: 2,
    image: sprites.duckHunt,
    x: 50,
    y: 50,
    width: 40,
    height: 31
}

export const stagesConfig: StageConfig[] = [
    {
        numberOfEnemies: 5,
        enemy: {
            ...defaultDuckConfig,
            animations: animationsConfig.purpleDuck
        }
    },
    {
        numberOfEnemies: 7,
        enemy: {
            ...defaultDuckConfig,
            animations: animationsConfig.greenDuck
        }
    },
    {
        numberOfEnemies: 9,
        enemy: {
            ...defaultDuckConfig,
            animations: animationsConfig.brownDuck
        }
    }
];
