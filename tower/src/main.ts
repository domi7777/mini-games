import 'reflect-metadata';
import {Game} from './game/game';
import Container from "typedi";

require("./style.css");

// see https://github.com/qiao/PathFinding.js/issues/167
require('../node_modules/pathfinding/visual/lib/pathfinding-browser.min.js');

(async () => {
    Container.set(HTMLCanvasElement, document.querySelector('#game') as HTMLCanvasElement);
    Container.get(Game).start();
})();
