import {animationsConfig, DuckAnimationsConfig} from "../animations/animations-config";
import {sprites} from "./sprites-config";
import {EnemyConfig} from "../enemy/enemy-config";
import {AnimationType} from "../animations/animation-type.enum";
import {Direction} from "../drawing/direction.enum";
import {getGrassHeight, getHeight, getWidth} from "../global-functions";

export interface StageConfig {
    title: string;
    enemies: EnemyConfig[];
}

const defaultDuckConfig: EnemyConfig = { // fixme enemyConfig should be in enemy-config.ts
    speed: 1,
    scoreValue: 100,
    image: sprites.duckHunt,
    x: 0,
    y: 0,
    width: 38,
    height: 31,
    defaultAnimationType: AnimationType.horizontal,
    defaultDirection: Direction.right,
    animations: animationsConfig.purpleDuck,
    creationDelay: 500,
    lives: 1
}

const verticalDuck = {
    ...defaultDuckConfig,
    y: getHeight() - getGrassHeight(),
    defaultDirection: Direction.right,
    defaultAnimationType: AnimationType.vertical
}

const horizontalLeftDirectionDuck = {
    ...defaultDuckConfig,
    defaultAnimationType: AnimationType.horizontal,
    defaultDirection: Direction.left,
    x: getWidth()
}

const horizontalRightDirectionDuck = {
    ...defaultDuckConfig,
    defaultAnimationType: AnimationType.horizontal,
    defaultDirection: Direction.right,
    x: 0
}

const diagonalLeftDirectionDuck = {
    ...defaultDuckConfig,
    defaultAnimationType: AnimationType.diagonal,
    defaultDirection: Direction.left,
    x: getWidth(),
    y: verticalDuck.y
}

const diagonalRightDirectionDuck = {
    ...defaultDuckConfig,
    defaultAnimationType: AnimationType.diagonal,
    defaultDirection: Direction.right,
    x: 0,
    y: verticalDuck.y
}

interface DuckConfig {
    animations: DuckAnimationsConfig;
    speed: number
}

const purpleDuck: DuckConfig = {animations: animationsConfig.purpleDuck, speed: 1};
const greenDuck: DuckConfig = {animations: animationsConfig.greenDuck, speed: 1.2};
const brownDuck: DuckConfig = {animations: animationsConfig.brownDuck, speed: 1.5};

const createNArray = (n: number) => Array.from(Array(n).keys())
const minDistanceBetweenDucks = 20;
const maxNumberOfVerticalDucks = 15;

const verticalWave: (duckConfig: DuckConfig) => EnemyConfig[] = (duckConfig) => [
    ...createNArray(maxNumberOfVerticalDucks).map(n => ({
        ...verticalDuck, ...duckConfig,
        x: n * minDistanceBetweenDucks
    })),
    ...createNArray(maxNumberOfVerticalDucks).map(n => ({
        ...verticalDuck, ...duckConfig,
        x: 300 - n * minDistanceBetweenDucks
    })),
];

export const stagesConfig: StageConfig[] = [
    {
        title: 'A good duck is a dead duck.',
        enemies: [
            {...defaultDuckConfig},
            {...diagonalRightDirectionDuck, y: 400, creationDelay: 5000},
            {...horizontalLeftDirectionDuck, y: 350, creationDelay: 3000},

            {...verticalDuck, x: 50, creationDelay: 5000},
            {...verticalDuck, x: 150},
            {...verticalDuck, x: 250},

            {...horizontalRightDirectionDuck, y: 50, creationDelay: 5000},
            {...horizontalRightDirectionDuck, y: 100},
            {...horizontalRightDirectionDuck, y: 150},
            {...horizontalRightDirectionDuck, y: 200},
            {...horizontalRightDirectionDuck, y: 250},
            {...horizontalRightDirectionDuck, y: 300},

            {...diagonalLeftDirectionDuck, creationDelay: 5000},
            {...diagonalLeftDirectionDuck},
            {...diagonalLeftDirectionDuck},
            {...diagonalLeftDirectionDuck},
            {...diagonalLeftDirectionDuck},
            {...diagonalLeftDirectionDuck},
            {...diagonalLeftDirectionDuck, ...greenDuck, creationDelay: 3000},
        ]
    },
    {
        title: 'If it looks like a duck and quacks like a duck...',
        enemies: [
            {...horizontalRightDirectionDuck, ...greenDuck},
            {...verticalDuck, ...greenDuck, creationDelay: 2000},
            {...horizontalLeftDirectionDuck, ...greenDuck, y: 100},
            {...horizontalLeftDirectionDuck, ...greenDuck, y: 150},
            {...horizontalLeftDirectionDuck, ...greenDuck, y: 200},
            {...horizontalLeftDirectionDuck, ...greenDuck, y: 250},
            {...horizontalLeftDirectionDuck, ...greenDuck, y: 300},
            {...horizontalLeftDirectionDuck, ...greenDuck, y: 350},

            {...diagonalRightDirectionDuck, ...greenDuck, y: 400, creationDelay: 6000},
            {...diagonalRightDirectionDuck, ...greenDuck, y: 350},
            {...diagonalRightDirectionDuck, ...greenDuck, y: 300},
            {...diagonalRightDirectionDuck, ...greenDuck, y: 250},

            {...verticalDuck, ...greenDuck, x: 0, creationDelay: 2000},
            {...verticalDuck, ...greenDuck, x: 25},
            {...verticalDuck, ...greenDuck, x: 50},
            {...verticalDuck, ...greenDuck, x: 75},
            {...verticalDuck, ...greenDuck, x: 100},
            {...verticalDuck, ...greenDuck, x: 125},
            {...verticalDuck, ...greenDuck, x: 150},
            {...verticalDuck, ...greenDuck, x: 175},
            {...verticalDuck, ...greenDuck, x: 200},
            {...verticalDuck, ...greenDuck, x: 225},
            {...verticalDuck, ...greenDuck, x: 250},
        ]
    },
    {
        title: 'If it doesn\'t work, try rubber duck debugging',
        enemies: [
            {...horizontalRightDirectionDuck, ...brownDuck, y: 25},
            {...horizontalLeftDirectionDuck, ...brownDuck, y: 50},
            {...horizontalRightDirectionDuck, ...brownDuck, y: 75},
            {...horizontalLeftDirectionDuck, ...brownDuck, y: 100},
            {...horizontalRightDirectionDuck, ...brownDuck, y: 125},
            {...horizontalLeftDirectionDuck, ...brownDuck, y: 150},
            {...horizontalRightDirectionDuck, ...brownDuck, y: 175},
            {...horizontalLeftDirectionDuck, ...brownDuck, y: 200},

            {...diagonalRightDirectionDuck, ...brownDuck, y: 400, creationDelay: 6000},
            {...horizontalLeftDirectionDuck, ...brownDuck, y: 375},
            {...diagonalRightDirectionDuck, ...brownDuck, y: 350},
            {...horizontalLeftDirectionDuck, ...brownDuck, y: 325},
            {...diagonalRightDirectionDuck, ...brownDuck, y: 300},
            {...horizontalLeftDirectionDuck, ...brownDuck, y: 275},
            {...diagonalRightDirectionDuck, ...brownDuck, y: 250},

            {...verticalDuck, ...brownDuck},
            {...verticalDuck, ...brownDuck},
            {...verticalDuck, ...brownDuck},
        ]
    },
    {
        title: 'We\'re sitting ducks here.',
        enemies: [
            {...horizontalRightDirectionDuck, ...brownDuck},
            {...horizontalRightDirectionDuck, ...brownDuck},
            {...horizontalRightDirectionDuck, ...brownDuck},

            {...diagonalRightDirectionDuck, ...brownDuck},
            {...diagonalRightDirectionDuck, ...brownDuck},
            {...diagonalRightDirectionDuck, ...brownDuck},

            {...horizontalLeftDirectionDuck, ...brownDuck},
            {...horizontalLeftDirectionDuck, ...brownDuck},
            {...horizontalLeftDirectionDuck, ...brownDuck},

            {...verticalDuck, ...brownDuck, x: 150},
            {...verticalDuck, ...brownDuck, x: 175},
            {...verticalDuck, ...brownDuck, x: 125},
            {...verticalDuck, ...brownDuck, x: 200},
            {...verticalDuck, ...brownDuck, x: 100},
            {...verticalDuck, ...brownDuck, x: 225},
            {...verticalDuck, ...brownDuck, x: 75},
            {...verticalDuck, ...brownDuck, x: 250},
            {...verticalDuck, ...brownDuck, x: 50},
        ]
    },
    {
        title: 'They\'ve been here since the quack of dawn.',
        enemies: [
            {...horizontalRightDirectionDuck, ...purpleDuck, y: 225},
            {...horizontalRightDirectionDuck, ...purpleDuck, y: 250},
            {...horizontalRightDirectionDuck, ...purpleDuck, y: 200, creationDelay: 0},

            {...horizontalRightDirectionDuck, ...greenDuck, y: 150},
            {...horizontalRightDirectionDuck, ...greenDuck, y: 125},
            {...horizontalRightDirectionDuck, ...greenDuck, y: 175, creationDelay: 0},

            {...horizontalRightDirectionDuck, ...brownDuck, y: 300},
            {...horizontalRightDirectionDuck, ...brownDuck, y: 325},
            {...horizontalRightDirectionDuck, ...brownDuck, y: 275, creationDelay: 0},

            {...verticalDuck, ...purpleDuck, x: 175, creationDelay: 3000},
            {...verticalDuck, ...purpleDuck, x: 150},
            {...verticalDuck, ...purpleDuck, x: 200, creationDelay: 0},

            {...verticalDuck, ...brownDuck, x: 175, creationDelay: 500},
            {...verticalDuck, ...brownDuck, x: 150},
            {...verticalDuck, ...brownDuck, x: 200, creationDelay: 0},

            {...verticalDuck, ...greenDuck, x: 175, creationDelay: 500},
            {...verticalDuck, ...greenDuck, x: 150},
            {...verticalDuck, ...greenDuck, x: 200, creationDelay: 0},

            {...horizontalRightDirectionDuck, ...purpleDuck, y: 225},
            {...horizontalRightDirectionDuck, ...purpleDuck, y: 250},
            {...horizontalRightDirectionDuck, ...purpleDuck, y: 200, creationDelay: 0},

            {...verticalDuck, ...greenDuck, x: 175, creationDelay: 0},
            {...verticalDuck, ...greenDuck, x: 150},
            {...verticalDuck, ...greenDuck, x: 200, creationDelay: 0},

            {...horizontalRightDirectionDuck, ...brownDuck, y: 300},
            {...horizontalRightDirectionDuck, ...brownDuck, y: 325},
            {...horizontalRightDirectionDuck, ...brownDuck, y: 275, creationDelay: 0},
        ]
    },
    {
        title: 'Don\'t duck with them.',
        enemies: [
            {...verticalDuck, ...greenDuck, x: 175},
            {...verticalDuck, ...greenDuck, x: 200},
            {...verticalDuck, ...greenDuck, x: 150},
            {...verticalDuck, ...greenDuck, x: 225},
            {...verticalDuck, ...greenDuck, x: 125},
            {...verticalDuck, ...greenDuck, x: 250},
            {...verticalDuck, ...greenDuck, x: 100},
            {...verticalDuck, ...greenDuck, x: 275},
            {...verticalDuck, ...greenDuck, x: 75},

            {...horizontalRightDirectionDuck, y: 200, creationDelay: 3000},
            {...horizontalRightDirectionDuck, y: 225},

            {...horizontalRightDirectionDuck, y: 175, creationDelay: 0},
            {...horizontalLeftDirectionDuck, y: 200, creationDelay: 0},
            {...horizontalLeftDirectionDuck, y: 225},
            {...horizontalLeftDirectionDuck, y: 175, creationDelay: 0},

            {...horizontalRightDirectionDuck, y: 250},
            {...horizontalRightDirectionDuck, y: 150, creationDelay: 0},
            {...horizontalLeftDirectionDuck, y: 250},
            {...horizontalLeftDirectionDuck, y: 150, creationDelay: 0},

            {...horizontalRightDirectionDuck, y: 275},
            {...horizontalRightDirectionDuck, y: 125, creationDelay: 0},
            {...horizontalLeftDirectionDuck, y: 275},
            {...horizontalLeftDirectionDuck, y: 125, creationDelay: 0},

            {...diagonalRightDirectionDuck, ...brownDuck, creationDelay: 5000},
            {...diagonalLeftDirectionDuck, ...greenDuck, creationDelay: 0},
            {...diagonalRightDirectionDuck, ...brownDuck},
            {...diagonalLeftDirectionDuck, ...greenDuck, creationDelay: 0},
            {...diagonalRightDirectionDuck, ...brownDuck},
            {...diagonalLeftDirectionDuck, ...greenDuck, creationDelay: 0},
            {...diagonalRightDirectionDuck, ...brownDuck},
            {...diagonalLeftDirectionDuck, ...greenDuck, creationDelay: 0},
            {...diagonalRightDirectionDuck, ...brownDuck},
            {...diagonalLeftDirectionDuck, ...greenDuck, creationDelay: 0},
            {...diagonalRightDirectionDuck, ...brownDuck},
            {...diagonalLeftDirectionDuck, ...greenDuck, creationDelay: 0},
            {...diagonalRightDirectionDuck, ...brownDuck},
            {...diagonalLeftDirectionDuck, ...greenDuck, creationDelay: 0},
            {...diagonalRightDirectionDuck, ...brownDuck},
            {...diagonalLeftDirectionDuck, ...greenDuck, creationDelay: 0},
            {...diagonalRightDirectionDuck, ...brownDuck},
            {...diagonalLeftDirectionDuck, ...greenDuck, creationDelay: 0},
            {...diagonalRightDirectionDuck, ...brownDuck},
            {...diagonalLeftDirectionDuck, ...greenDuck, creationDelay: 0},
        ]
    },
    {
        title: 'I hope you have enough ammo.',
        enemies: [
            ...verticalWave(purpleDuck),
            ...verticalWave(greenDuck),
            ...verticalWave(brownDuck),
        ]
    },
    {
        title: 'Duck Vader once said: I\'m your feather',
        enemies: [
            {...horizontalRightDirectionDuck, y: 100},
            {...horizontalRightDirectionDuck, y: 125},
            {...horizontalRightDirectionDuck, y: 75, creationDelay: 0},

            {...horizontalRightDirectionDuck, ...greenDuck, y: 200, creationDelay: 0},
            {...horizontalRightDirectionDuck, ...greenDuck, y: 225},
            {...horizontalRightDirectionDuck, ...greenDuck, y: 175, creationDelay: 0},

            {...horizontalRightDirectionDuck, ...brownDuck, y: 300, creationDelay: 0},
            {...horizontalRightDirectionDuck, ...brownDuck, y: 325},
            {...horizontalRightDirectionDuck, ...brownDuck, y: 275, creationDelay: 0},

            {...horizontalLeftDirectionDuck, y: 100},
            {...horizontalLeftDirectionDuck, y: 125},
            {...horizontalLeftDirectionDuck, y: 75, creationDelay: 0},

            {...horizontalLeftDirectionDuck, ...greenDuck, y: 200, creationDelay: 0},
            {...horizontalLeftDirectionDuck, ...greenDuck, y: 225},
            {...horizontalLeftDirectionDuck, ...greenDuck, y: 175, creationDelay: 0},

            {...horizontalLeftDirectionDuck, ...brownDuck, y: 300, creationDelay: 0},
            {...horizontalLeftDirectionDuck, ...brownDuck, y: 325},
            {...horizontalLeftDirectionDuck, ...brownDuck, y: 275, creationDelay: 0},

            {...horizontalRightDirectionDuck, ...purpleDuck, y: 10, creationDelay: 5000},
            {...verticalDuck, ...purpleDuck, x: 10, creationDelay: 0},
            {...diagonalLeftDirectionDuck, ...purpleDuck, creationDelay: 0},
            {...horizontalLeftDirectionDuck, ...purpleDuck, y: verticalDuck.y, creationDelay: 0},

            {...horizontalLeftDirectionDuck, ...greenDuck, y: verticalDuck.y, creationDelay: 5000},
            {...diagonalLeftDirectionDuck, ...greenDuck, creationDelay: 0},
            {...verticalDuck, ...greenDuck, x: 10, creationDelay: 0},
            {...horizontalRightDirectionDuck, ...greenDuck, y: 10, creationDelay: 0},

            {...diagonalLeftDirectionDuck, ...brownDuck, creationDelay: 5000},
            {...verticalDuck, ...brownDuck, x: 10, creationDelay: 0},
            {...horizontalLeftDirectionDuck, ...brownDuck, y: verticalDuck.y, creationDelay: 0},
            {...horizontalRightDirectionDuck, ...brownDuck, y: 10, creationDelay: 0},
            {...horizontalLeftDirectionDuck, ...brownDuck, y: 50, creationDelay: 0},

            {...horizontalLeftDirectionDuck, ...brownDuck, y: 200, speed: 3, creationDelay: 5000},
        ]
    },
    {
        title: 'Kids, if you see lava, just duck and cover',
        enemies: [
            {...horizontalRightDirectionDuck, ...purpleDuck},
            {...horizontalLeftDirectionDuck, ...purpleDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...horizontalRightDirectionDuck, ...purpleDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...horizontalLeftDirectionDuck, ...purpleDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...horizontalRightDirectionDuck, ...purpleDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...horizontalLeftDirectionDuck, ...purpleDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},

            {...horizontalRightDirectionDuck, ...greenDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks},
            {...horizontalLeftDirectionDuck, ...greenDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...horizontalRightDirectionDuck, ...greenDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...horizontalLeftDirectionDuck, ...greenDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...horizontalRightDirectionDuck, ...greenDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...horizontalLeftDirectionDuck, ...greenDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},

            {...horizontalRightDirectionDuck, ...brownDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks},
            {...horizontalLeftDirectionDuck, ...brownDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...horizontalRightDirectionDuck, ...brownDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...horizontalLeftDirectionDuck, ...brownDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...horizontalRightDirectionDuck, ...brownDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...horizontalLeftDirectionDuck, ...brownDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},

            {...diagonalRightDirectionDuck, ...purpleDuck, y: 200, creationDelay: 5000},
            {...diagonalLeftDirectionDuck, ...purpleDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...diagonalRightDirectionDuck, ...purpleDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...diagonalLeftDirectionDuck, ...purpleDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...diagonalRightDirectionDuck, ...purpleDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...diagonalLeftDirectionDuck, ...purpleDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},

            {...diagonalRightDirectionDuck, ...greenDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 2000},
            {...diagonalLeftDirectionDuck, ...greenDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...diagonalRightDirectionDuck, ...greenDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...diagonalLeftDirectionDuck, ...greenDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...diagonalRightDirectionDuck, ...greenDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...diagonalLeftDirectionDuck, ...greenDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},

            {...diagonalRightDirectionDuck, ...brownDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 2000},
            {...diagonalLeftDirectionDuck, ...brownDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...diagonalRightDirectionDuck, ...brownDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...diagonalLeftDirectionDuck, ...brownDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...diagonalRightDirectionDuck, ...brownDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
            {...diagonalLeftDirectionDuck, ...brownDuck, relativeToPreviousEnemyY: minDistanceBetweenDucks, creationDelay: 0},
        ]
    },
    {
        title: 'All hail the ducktator!',
        enemies: [
            {...verticalDuck, x: 120, scale: 3, lives: 50, scoreValue: 100000, creationDelay: 12000},
        ]
    }
];
