import {Position} from "../math/position/position";
import {AnimatedDrawable} from "../animations/animated-drawable";
import {Direction} from "../drawing/direction.enum";
import {Drawable} from "../drawing/drawable";
import {override} from "../utils/override.decorator";

const sprites = require('../../../assets/monsters.png') // 48 x 72

const spriteEnemyWidth = 48;
const spriteEnemyHeight = 72;
const numberOfFramesPerAnimation = 3;
const numberOfAnimations = 4;

export enum EnemyType {
    bat = 'bat',
    blob = 'blob',
    orc = 'orc',
    bull = 'bull',
    vampire = 'vampire',
    skeleton = 'skeleton',
    ghost = 'ghost',
    succubus = 'succubus'
}

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

const defaultEnemyType = EnemyType.blob;

interface EnemyConfig {
    position?: Position,
    center?: Position,
    maxLives?: number,
    lives?: number,
    id?: number;
    currentFrameXNumber?: number;
    currentFrameYNumber?: number;
    lastFrameChangeTime?: number;
    direction?: Direction;
    enemyType?: EnemyType;
}

export class Enemy extends AnimatedDrawable {
    readonly speed = 0.7; // 1px per frame === 60px per sec

    readonly scoreValue: number = 100;
    readonly maxLives: number;
    lives: number;
    readonly enemyType: EnemyType;

    constructor(config: EnemyConfig) {
        super({
            height: 72,
            width: 48,
            // image: null,
            color: 'red',
            image: sprites, // TODO config
            scale: 0.6,
            drawShape: false,
            framesStartPosition: config.enemyType
                ? spriteFramesConfig[config.enemyType]
                : spriteFramesConfig[defaultEnemyType],
            numberOfFrames: 3,
            x: config.position?.x || 150,
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
        this.enemyType = config.enemyType || defaultEnemyType;
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
