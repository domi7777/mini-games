import config from "./config.js"
import Game from "./game.js"
import DrawService from "./draw-service.js"


const canvas = document.querySelector('#game');

const game = new Game(
    config,
    canvas,
    new DrawService(canvas)
).run();

console.log(game);


