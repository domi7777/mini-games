import {Direction} from "./game/drawing/direction.enum";
import {Point} from "./game/drawing/point";

export interface AnimatedDrawableConfig extends DrawableConfig {
    numberOfFrames: number;
    timeBetweenFrameChange: number;
    spriteStartingPoint: Point;
    frames: {
        [Direction.right]: number [];
        [Direction.left]: number [];
    }
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

/*
* duck hunt sprites:
* normal duck: 3 frames
* y: starts at 117px, height: 32px
* x: starts at 0, width: 38px
 */
const sprites = require('../images/duck-hunt-sprites.png');
const crosshair = require('../images/crosshair.png')


const stages: StageConfig[] = [
    {
        numberOfEnemies: 1,
        enemy: {
            speed: 2,
            image: sprites,
            timeBetweenFrameChange: 200,
            numberOfFrames: 3,
            spriteStartingPoint: {x: 0, y: 117},
            frames: {
                [Direction.left]: [4, 7], // first frame = 0
                [Direction.right]: [5, 6],

            },
            x: 50,
            y: 50,
            width: 40,
            height: 31
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
