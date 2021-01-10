import {AbstractAnimationsConfig, animationsConfig, DuckAnimationsConfig} from "./animations-config";

const sprites = require('../images/duck-hunt-sprites.png');
const crosshair = require('../images/crosshair.png')

export interface AnimatedDrawableConfig extends DrawableConfig {
    animations: AbstractAnimationsConfig;
}

export interface DrawableConfig {
    x: number,
    y: number,
    width: number,
    height: number,
    image: any; // TODO not sure which type
}

export interface EnemyConfig extends AnimatedDrawableConfig {
    speed: number;
    animations: DuckAnimationsConfig;
}

export interface StageConfig {
    numberOfEnemies: number;
    enemy: EnemyConfig;
}

export interface GameConfig {
    text: {
        fontFamily: string
        fontSize: number,
        fontColor: string
    },
    shootingCrosshair: DrawableConfig,
    stages: StageConfig[]
}

const defaultDuckConfig = {
    speed: 2,
    image: sprites,
    x: 50,
    y: 50,
    width: 40,
    height: 31
}


const stages: StageConfig[] = [
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
export const config: GameConfig = {
    text: {
        fontFamily: 'Press Start 2P',
        fontSize: 12,
        fontColor: '#FFFFFF'
    },
    shootingCrosshair: {
        x: 250,
        y: 250,
        width: 50,
        height: 50,
        image: crosshair
    },
    stages: stages,
}
