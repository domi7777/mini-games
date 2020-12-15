import Drawable from "./drawable.js"

export default class Missile extends Drawable {
    constructor(config) {
        super(config);
        this.timestamp = Date.now();
        this.speed = config.speed;
        this.reloadTime = config.reloadTime;
    }
}
