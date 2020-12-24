import Drawable from "./drawable.js"

export default class Spaceship extends Drawable {
    score = 0;
    constructor(config) {
        super(config);
        this.lives = config.lives;
    }
}
