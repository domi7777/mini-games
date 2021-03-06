import config from "./config.js"
import Game from "./src/game.js"
import DrawService from "./src/draw-service.js"

(() => {
    document.ontouchmove = (e) => {
        e.stopPropagation();
    }
    const canvas = document.querySelector('#game');

    const game = new Game(
        config,
        canvas,
        new DrawService(canvas)
    );
    game.run();

    console.log(game);
})();




