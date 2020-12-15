export default class Drawable {
    x = 0;
    y = 0;

    constructor(config) {
        this.path2D = config.path2D;
        this.color = config.color;
    }
}
