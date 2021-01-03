export interface DrawableConfig {
    x: number,
    y: number,
    width: number,
    height: number,
    image: any; // TODO not sure
    frames: number; // animated... fixme
}

export interface EnemyConfig extends DrawableConfig {
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
        numberOfEnemies: 10,
        enemy: {
            image: require('../images/pink-duck.png'),
            frames: 8,
            x: 0,
            y: 0,
            width: 314,
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
