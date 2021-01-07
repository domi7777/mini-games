import {Point} from "./game/drawing/point";

const sprites = require('../images/duck-hunt-sprites.png');
const crosshair = require('../images/crosshair.png')

export interface AnimatedDrawableConfig extends DrawableConfig {
    numberOfFrames: number;
    timeBetweenFrameChange: number;
    spriteStartingPoint: Point;
}

export interface DrawableConfig {
    x: number,
    y: number,
    width: number,
    height: number,
    image: any; // TODO not sure
}

export interface EnemyConfig extends AnimatedDrawableConfig {
    speed: number;
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

const spriteStartingPoints = {
    purpleDuck: {x: 0, y: 117},
    greenDuck: {x: 129, y: 117}
}
const defaultDuckConfig = {
    speed: 2,
    image: sprites,
    timeBetweenFrameChange: 200,
    numberOfFrames: 3,
    x: 50,
    y: 50,
    width: 40,
    height: 31
}


const stages: StageConfig[] = [
    {
        numberOfEnemies: 7,
        enemy: {
            ...defaultDuckConfig,
            spriteStartingPoint: spriteStartingPoints.purpleDuck,
        }
    },
    {
        numberOfEnemies: 9,
        enemy: {
            ...defaultDuckConfig,
            spriteStartingPoint: spriteStartingPoints.greenDuck,
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
