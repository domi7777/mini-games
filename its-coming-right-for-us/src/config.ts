import {Direction} from "./game/drawing/direction.enum";

export interface AnimatedDrawableConfig extends DrawableConfig {
    numberOfFrames: number;
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
    stages: StageConfig[]
}


const stages: StageConfig[] = [
    {
        numberOfEnemies: 1,
        enemy: {
            speed: 4,
            image: require('../images/pink-duck.png'),
            numberOfFrames: 8,
            frames: {
                [Direction.left]: [4, 7], // first frame = 0
                [Direction.right]: [5, 6]
            },
            x: 100,
            y: 100,
            width: 38,
            height: 38
        }
    }
];
export const config: GameConfig = {
    text: {
        fontFamily: 'Press Start 2P',
        fontSize: 12,
        fontColor: '#FFFFFF'
    },
    stages: stages,
}
