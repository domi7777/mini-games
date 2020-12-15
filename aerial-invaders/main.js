import config from "./config.js"
import Game from "./game.js"

const game = new Game(config).run();

console.log(game);


