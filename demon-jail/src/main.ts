import 'reflect-metadata';
import {DemonJailGame} from './game/demon-jail-game';
import Container from "typedi";
import {GameCanvas} from "./game/canvas/game-canvas";
import {Constants} from "./game/constants";
import {BackgroundCanvas} from "./game/canvas/background-canvas";

require("./style.css");

// see https://github.com/qiao/PathFinding.js/issues/167
require('../node_modules/pathfinding/visual/lib/pathfinding-browser.min.js');

(async () => {
    const container = document.querySelector('#container') as HTMLElement;
    const hud = document.querySelector('.hud') as HTMLElement;
    container.style.width = hud.style.width = `${Constants.gameWidth}px`;
    container.style.height = `${Constants.gameHeight}px`;

    const gameCanvas = document.querySelector('#game') as HTMLCanvasElement;
    const wallsCanvas = document.querySelector('#walls') as HTMLCanvasElement;
    const mapCanvas = document.querySelector('#map') as HTMLCanvasElement;

    gameCanvas.width = wallsCanvas.width = Constants.gameWidth;
    gameCanvas.height = wallsCanvas.height = Constants.gameHeight;
    Container.set(GameCanvas, gameCanvas);
    Container.set(BackgroundCanvas, wallsCanvas);

    await Container.get(DemonJailGame).run();
})();
