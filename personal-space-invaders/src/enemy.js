import Drawable from "./drawable.js"

export default class Enemy extends Drawable {
    constructor(config) {
        super(config);
        this.speed = config.speed;
        this.reloadTime = config.reloadTime;
        this.scoreValue = config.scoreValue;
    }
}
