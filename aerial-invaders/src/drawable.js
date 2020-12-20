export default class Drawable {
    x = 0;
    y = 0;
    shouldDraw = true;

    constructor(config) {
        this.path2D = config.path2D;
        this.color = config.color;
        this.width = config.width;
        this.height = config.height;
    }
}
