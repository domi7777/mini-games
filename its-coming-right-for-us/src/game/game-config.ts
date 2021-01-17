import {StageConfig, stagesConfig} from "./stage/stages-config";
import {sprites} from "./sprites/sprites-config";
import {DrawableConfig} from "./drawing/drawable-config";
import {getGrassHeight} from "./global-functions";

export interface GameConfig {
    text: {
        fontFamily: string
        fontSize: number,
        fontColor: string
    },
    shootingCrosshair: DrawableConfig,
    stages: StageConfig[];
    grassHeight: number;
}

export const gameConfig: GameConfig = {
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
        image: sprites.crosshair
    },
    stages: stagesConfig,
    grassHeight: getGrassHeight()
}
