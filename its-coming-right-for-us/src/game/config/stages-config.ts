import {animationsConfig as ducks} from "../animations/animations-config";
import {sprites} from "./sprites-config";
import {EnemyConfig} from "../enemy/enemy-config";
import {AnimationType} from "../animations/animation-type.enum";
import {Direction} from "../drawing/direction.enum";
import {getGrassHeight, getHeight, getWidth} from "../global-functions";

export interface StageConfig {
    enemies: EnemyConfig[];
}

const defaultDuckConfig: EnemyConfig = { // fixme enemyConfig should be in enemy-config.ts
    speed: 1,
    scoreValue: 100,
    image: sprites.duckHunt,
    x: 0,
    y: 50,
    width: 40,
    height: 31,
    defaultAnimationType: AnimationType.horizontal,
    defaultDirection: Direction.right,
    animations: ducks.purpleDuck,
    creationDelay: 500
}

const verticalDuck = {
    ...defaultDuckConfig,
    speed: 1,
    y: getHeight() - getGrassHeight(),
    defaultDirection: Direction.right,
    defaultAnimationType: AnimationType.vertical
}

const horizontalDuck = {
    ...defaultDuckConfig,
    speed: 1,
    x: 0,
    defaultDirection: Direction.right,
    defaultAnimationType: AnimationType.horizontal
}

const diagonalDuck = {
    ...defaultDuckConfig,
    speed: 1,
    x: 0,
    y: verticalDuck.y,
    defaultDirection: Direction.right,
    defaultAnimationType: AnimationType.diagonal
}

export const stagesConfig: StageConfig[] = [
    {
        enemies: [
            {...defaultDuckConfig},
            {
                ...defaultDuckConfig,
                creationDelay: 5000,
                y: 400,
                defaultDirection: Direction.right,
                defaultAnimationType: AnimationType.diagonal
            },
            {
                ...defaultDuckConfig,
                creationDelay: 3000,
                x: getWidth(),
                y: 350,
                defaultDirection: Direction.left,
            },
            {...verticalDuck, creationDelay: 5000, x: 50},
            {...verticalDuck, x: 150},
            {...verticalDuck, x: 250},
            {...horizontalDuck, creationDelay: 5000, y: 50},
            {...horizontalDuck, y: 100},
            {...horizontalDuck, y: 150},
            {...horizontalDuck, y: 200},
            {...horizontalDuck, y: 250},
            {...horizontalDuck, y: 300}
        ]
    },
    {
        enemies: [
            {...horizontalDuck, animations: ducks.greenDuck},
            {...verticalDuck, animations: ducks.greenDuck, creationDelay: 2000},
            {...horizontalDuck, animations: ducks.greenDuck, defaultDirection: Direction.left, x: getWidth(), y: 100},
            {...horizontalDuck, animations: ducks.greenDuck, defaultDirection: Direction.left, x: getWidth(), y: 150},
            {...horizontalDuck, animations: ducks.greenDuck, defaultDirection: Direction.left, x: getWidth(), y: 200},
            {...horizontalDuck, animations: ducks.greenDuck, defaultDirection: Direction.left, x: getWidth(), y: 250},
            {...horizontalDuck, animations: ducks.greenDuck, defaultDirection: Direction.left, x: getWidth(), y: 300},
            {...horizontalDuck, animations: ducks.greenDuck, defaultDirection: Direction.left, x: getWidth(), y: 350},

            {...diagonalDuck, animations: ducks.greenDuck, y: 400, creationDelay: 6000},
            {...diagonalDuck, animations: ducks.greenDuck, y: 350},
            {...diagonalDuck, animations: ducks.greenDuck, y: 300},
            {...diagonalDuck, animations: ducks.greenDuck, y: 250},

            {...verticalDuck, animations: ducks.greenDuck, speed: 1.5, x: 0, creationDelay: 2000},
            {...verticalDuck, animations: ducks.greenDuck, speed: 1.5, x: 25},
            {...verticalDuck, animations: ducks.greenDuck, speed: 1.5, x: 50},
            {...verticalDuck, animations: ducks.greenDuck, speed: 1.5, x: 75},
            {...verticalDuck, animations: ducks.greenDuck, speed: 1.5, x: 100},
            {...verticalDuck, animations: ducks.greenDuck, speed: 1.5, x: 125},
            {...verticalDuck, animations: ducks.greenDuck, speed: 1.5, x: 150},
            {...verticalDuck, animations: ducks.greenDuck, speed: 1.5, x: 175},
            {...verticalDuck, animations: ducks.greenDuck, speed: 1.5, x: 200},
            {...verticalDuck, animations: ducks.greenDuck, speed: 1.5, x: 225},
            {...verticalDuck, animations: ducks.greenDuck, speed: 1.5, x: 250},
        ]
    },
    {
        enemies: [
            {...horizontalDuck, animations: ducks.brownDuck, y: 25},
            {...horizontalDuck, animations: ducks.brownDuck, defaultDirection: Direction.left, x: getWidth(), y: 50},
            {...horizontalDuck, animations: ducks.brownDuck, defaultDirection: Direction.right, x: 0, y: 75},
            {...horizontalDuck, animations: ducks.brownDuck, defaultDirection: Direction.left, x: getWidth(), y: 100},
            {...horizontalDuck, animations: ducks.brownDuck, defaultDirection: Direction.right, x: 0, y: 125},
            {...horizontalDuck, animations: ducks.brownDuck, defaultDirection: Direction.left, x: getWidth(), y: 150},
            {...horizontalDuck, animations: ducks.brownDuck, defaultDirection: Direction.right, x: 0, y: 175},
            {...horizontalDuck, animations: ducks.brownDuck, defaultDirection: Direction.left, x: getWidth(), y: 200},

            {...diagonalDuck, animations: ducks.brownDuck, y: 400, creationDelay: 6000},
            {...diagonalDuck, animations: ducks.brownDuck, y: 375, defaultDirection: Direction.left, x: getWidth()},
            {...diagonalDuck, animations: ducks.brownDuck, y: 350},
            {...diagonalDuck, animations: ducks.brownDuck, y: 325, defaultDirection: Direction.left, x: getWidth()},
            {...diagonalDuck, animations: ducks.brownDuck, y: 300},
            {...diagonalDuck, animations: ducks.brownDuck, y: 275, defaultDirection: Direction.left, x: getWidth()},
            {...diagonalDuck, animations: ducks.brownDuck, y: 250},

            {...verticalDuck, animations: ducks.brownDuck},
            {...verticalDuck, animations: ducks.brownDuck},
            {...verticalDuck, animations: ducks.brownDuck},

            {...horizontalDuck, animations: ducks.brownDuck},
            {...horizontalDuck, animations: ducks.brownDuck},
            {...horizontalDuck, animations: ducks.brownDuck},

            {...diagonalDuck, animations: ducks.brownDuck},
            {...diagonalDuck, animations: ducks.brownDuck},
            {...diagonalDuck, animations: ducks.brownDuck},

            {...horizontalDuck, animations: ducks.brownDuck, x: getWidth(), defaultDirection: Direction.left},
            {...horizontalDuck, animations: ducks.brownDuck, x: getWidth(), defaultDirection: Direction.left},
            {...horizontalDuck, animations: ducks.brownDuck, x: getWidth(), defaultDirection: Direction.left},

            {...verticalDuck, animations: ducks.brownDuck, x: 150},
            {...verticalDuck, animations: ducks.brownDuck, x: 175},
            {...verticalDuck, animations: ducks.brownDuck, x: 125},
            {...verticalDuck, animations: ducks.brownDuck, x: 200},
            {...verticalDuck, animations: ducks.brownDuck, x: 100},
            {...verticalDuck, animations: ducks.brownDuck, x: 225},
            {...verticalDuck, animations: ducks.brownDuck, x: 75},
            {...verticalDuck, animations: ducks.brownDuck, x: 250},
            {...verticalDuck, animations: ducks.brownDuck, x: 50},
        ]
    },
    {
        enemies: [
            {...horizontalDuck, animations: ducks.purpleDuck, y: 225},
            {...horizontalDuck, animations: ducks.purpleDuck, y: 250},
            {...horizontalDuck, animations: ducks.purpleDuck, y: 200, creationDelay: 0},

            {...horizontalDuck, animations: ducks.greenDuck, y: 150},
            {...horizontalDuck, animations: ducks.greenDuck, y: 125},
            {...horizontalDuck, animations: ducks.greenDuck, y: 175, creationDelay: 0},

            {...horizontalDuck, animations: ducks.brownDuck, y: 300},
            {...horizontalDuck, animations: ducks.brownDuck, y: 325},
            {...horizontalDuck, animations: ducks.brownDuck, y: 275, creationDelay: 0},

            {...verticalDuck, animations: ducks.purpleDuck, x: 175, creationDelay: 3000},
            {...verticalDuck, animations: ducks.purpleDuck, x: 150},
            {...verticalDuck, animations: ducks.purpleDuck, x: 200, creationDelay: 0},

            {...verticalDuck, animations: ducks.brownDuck, x: 175, creationDelay: 500},
            {...verticalDuck, animations: ducks.brownDuck, x: 150},
            {...verticalDuck, animations: ducks.brownDuck, x: 200, creationDelay: 0},

            {...verticalDuck, animations: ducks.greenDuck, x: 175, creationDelay: 500},
            {...verticalDuck, animations: ducks.greenDuck, x: 150},
            {...verticalDuck, animations: ducks.greenDuck, x: 200, creationDelay: 0},

            {...horizontalDuck, animations: ducks.purpleDuck, y: 225},
            {...horizontalDuck, animations: ducks.purpleDuck, y: 250},
            {...horizontalDuck, animations: ducks.purpleDuck, y: 200, creationDelay: 0},

            {...verticalDuck, animations: ducks.greenDuck, x: 175, creationDelay: 0},
            {...verticalDuck, animations: ducks.greenDuck, x: 150},
            {...verticalDuck, animations: ducks.greenDuck, x: 200, creationDelay: 0},

            {...horizontalDuck, animations: ducks.brownDuck, y: 300},
            {...horizontalDuck, animations: ducks.brownDuck, y: 325},
            {...horizontalDuck, animations: ducks.brownDuck, y: 275, creationDelay: 0},
        ]
    }
];
