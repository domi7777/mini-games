import Drawable from "./drawable.js"

export default class Missile extends Drawable {
    constructor(config) {
        super(config);
        this.speed = config.speed;
    }
}
