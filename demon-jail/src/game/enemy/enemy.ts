import {Position} from "../math/position/position";
import {AnimatedDrawable} from "../animations/animated-drawable";
import {Direction} from "../drawing/direction.enum";
import {Drawable} from "../drawing/drawable";
import {override} from "../utils/override.decorator";
import {Constants} from "../constants";
import {EnemyType} from "./enemy-type.enum";

const sprites = require('../../../assets/monsters.png') // 48 x 72

const spriteEnemyWidth = 48;
const spriteEnemyHeight = 72;
const numberOfFramesPerAnimation = 3;
const numberOfAnimations = 4;

// FIXME move to enemiesConfig?
const spriteFramesConfig = {
    [EnemyType.bat]: {x: 0, y: 0},
    [EnemyType.blob]: {x: numberOfFramesPerAnimation * spriteEnemyWidth, y: 0},
    [EnemyType.orc]: {x: 2 * numberOfFramesPerAnimation * spriteEnemyWidth, y: 0},
    [EnemyType.bull]: {x: 3 * numberOfFramesPerAnimation * spriteEnemyWidth, y: 0},
    [EnemyType.vampire]: {x: 0, y: numberOfAnimations * spriteEnemyHeight},
    [EnemyType.skeleton]: {x: numberOfFramesPerAnimation * spriteEnemyWidth, y: numberOfAnimations * spriteEnemyHeight},
    [EnemyType.ghost]: {x: 2 * numberOfFramesPerAnimation * spriteEnemyWidth, y: numberOfAnimations * spriteEnemyHeight},
    [EnemyType.succubus]: {x: 3 * numberOfFramesPerAnimation * spriteEnemyWidth, y: numberOfAnimations * spriteEnemyHeight},
}

export interface EnemyConfig {
    spawnDelay?: number,
    position?: Position,
    center?: Position,
    maxLives?: number,
    lives?: number,
    currentFrameXNumber?: number;
    currentFrameYNumber?: number;
    lastFrameChangeTime?: number;
    direction?: Direction;
    enemyType: EnemyType;
    scoreValue?: number;
    speed?: number;
    scale?: number;
}

export class Enemy extends AnimatedDrawable {
    static readonly defaultSpeed = 5;
    private static readonly speedMultiplier = 0.17; // to make speed param more convenient

    readonly speed;// 1px per frame === 60px per sec. Is multiplied by speedMultiplier
    readonly scoreValue: number;
    readonly maxLives: number;
    readonly enemyType: EnemyType;
    readonly spawnDelay: number;
    lives: number;

    constructor(config: EnemyConfig) {
        super({
            height: 72,
            width: 48,
            color: 'red',
            image: sprites, // TODO config
            scale: config.scale || 0.6,
            drawShape: false,
            framesStartPosition: spriteFramesConfig[config.enemyType],
            numberOfFrames: 3,
            x: config.position?.x || Constants.tileSize * 2,
            y: config.position?.y || -15,
            direction: config.direction,
            currentFrameXNumber: config.currentFrameXNumber, // FIXME remove useless stuff
            currentFrameYNumber: config.currentFrameYNumber,
            lastFrameChangeTime: config.lastFrameChangeTime,
        });
        this.maxLives = config.maxLives || 10;
        this.lives = (config.lives !== undefined) ? config.lives : this.maxLives;
        if (config.center) {
            this.center = config.center; // FIXME make everything use center position by default
        }
        this.enemyType = config.enemyType;
        this.spawnDelay = config.spawnDelay || 0;
        this.speed = (config.speed || Enemy.defaultSpeed) * Enemy.speedMultiplier;
        this.scoreValue = config.scoreValue || this.maxLives * this.speed * 1.5;
    }

    @override()
    getChildren(): Drawable[] {
        return this.getLifeBarDrawables();
    }

    private getLifeBarDrawables() {
        const width = this.width * this.scale;
        const height = 5;
        const opacity = 0.3;
        const y = this.y - 5;
        return [
            new class extends Drawable {
            }({
                height: height,
                width: width,
                image: null,
                x: this.x,
                y: y,
                color: 'white',
                opacity: opacity
            }),
            new class extends Drawable {
            }({
                height: height,
                width: width * (this.lives / this.maxLives),
                image: null,
                x: this.x,
                y: y,
                color: 'red',
                filledWithColor: true,
                opacity: opacity
            }),
        ]
    }
}
