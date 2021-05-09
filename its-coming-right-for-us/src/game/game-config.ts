import { StageConfig, stagesConfig } from './stage/stages-config';
import { sprites } from './sprites/sprites-config';
import { DrawableConfig } from './drawing/drawable-config';
import { getGrassHeight } from './global-functions';
import { AudioConfig } from './assets/audio-config';

export interface GameConfig {
    soundtrack: HTMLAudioElement,
    text: {
        fontFamily: string
        fontSize: number,
        fontColor: string
    },
    shootingCrosshair: DrawableConfig & AudioConfig,
    grenade: DrawableConfig,
    stages: StageConfig[];
    grassHeight: number;
    duckNoises: HTMLAudioElement [];
    reloadNoises: HTMLAudioElement [];
    voices: HTMLAudioElement [];
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
        image: sprites.crosshair,
        sounds: {
            audio: [
                // FIXME duplication (+instantiation?)
                new Audio(require('../../sounds/Shoot 1.mp3').default),
                new Audio(require('../../sounds/Shoot 2.mp3').default),
                new Audio(require('../../sounds/Shoot 3.mp3').default),
                new Audio(require('../../sounds/Shoot 4.mp3').default),
                new Audio(require('../../sounds/Shoot 5.mp3').default),
                new Audio(require('../../sounds/Shoot 6.mp3').default),
            ]
        }
    },
    grenade: {
        x: 265,
        y: 500,
        width: 100,
        height: 100,
        image: sprites.grenade
    },
    stages: stagesConfig,
    grassHeight: getGrassHeight(),
    soundtrack: new Audio(require('../../sounds/soundtrack.mp3').default),
    duckNoises: [
        new Audio(require('../../sounds/Coin 1.mp3').default),
        new Audio(require('../../sounds/Coin 2.mp3').default),
        new Audio(require('../../sounds/Coin 3.mp3').default),
        new Audio(require('../../sounds/Coin 4.mp3').default),
        new Audio(require('../../sounds/Coin 5.mp3').default),
        new Audio(require('../../sounds/Coin 6.mp3').default),
        new Audio(require('../../sounds/Coin 7.mp3').default),
        new Audio(require('../../sounds/Coin 8.mp3').default),
        new Audio(require('../../sounds/Coin 9.mp3').default),
        new Audio(require('../../sounds/Coin 10.mp3').default),
        new Audio(require('../../sounds/Coin 11.mp3').default),
        new Audio(require('../../sounds/Coin 12.mp3').default),
    ],
    reloadNoises: [
        new Audio(require('../../sounds/Reload 1.mp3').default),
        new Audio(require('../../sounds/Reload 2.mp3').default),
    ],
    voices: [
        new Audio(require('../../sounds/Voice_I don\'t wanna hurt you, go away.mp3').default),
        new Audio(require('../../sounds/Voice_Duck.mp3').default),
        new Audio(require('../../sounds/Voice_Go.mp3').default),
        new Audio(require('../../sounds/Voice_Hein.mp3').default),
        new Audio(require('../../sounds/Voice_A good duck is a dead duck.mp3').default),
        new Audio(require('../../sounds/Voice_Birds everywhere.mp3').default),
        // new Audio(require('../../sounds/Voice_don\'t shoot the dog.mp3').default),
        new Audio(require('../../sounds/Voice_Go away from my sky.mp3').default),
        new Audio(require('../../sounds/Voice_Hasta la vista ducky.mp3').default),
        new Audio(require('../../sounds/Voice_I see one.mp3').default),
        new Audio(require('../../sounds/Voice_Oh mama.mp3').default),
        new Audio(require('../../sounds/Voice_Oh no, again.mp3').default),
        new Audio(require('../../sounds/Voice_So much duck.mp3').default),
        new Audio(require('../../sounds/Voice_They are averywhere.mp3').default),
    ]
};
