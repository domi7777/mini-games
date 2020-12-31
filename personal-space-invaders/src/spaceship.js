import Drawable from "./drawable.js"

export default class Spaceship extends Drawable {
    score = 0;

    constructor(config, x = 0, y = 0) {
        super(config);
        this.lives = config.lives;
        this.x = x;
        this.y = y;
    }
}
