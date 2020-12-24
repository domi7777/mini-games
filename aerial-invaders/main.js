import config from "./config.js"
import Game from "./src/game.js"
import DrawService from "./src/draw-service.js"


const canvas = document.querySelector('#game');

const game = new Game(
    config,
    canvas,
    new DrawService(canvas)
);
game.run()
    .then(() => console.log('Game finished.'))
    .catch(error => console.error(error));

console.log(game);


