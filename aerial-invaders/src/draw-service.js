import ViewUtils from "./view-utils.js"

export default class DrawService {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }

    get width() {
        return ViewUtils.getHeight(this.canvas);
    }

    get height() {
        return ViewUtils.getWidth(this.canvas);
    }

    draw(...drawables) {
        this.context.clearRect(0, 0, this.width, this.height);
        drawables
            .filter(drawable => !!drawable.shouldDraw)
            .forEach(drawable => this.#draw(drawable));
    }

    drawText(text, position = {x: 10, y: 10}, size = 20) {
        this.context.fillStyle = 'White';
        this.context.font = `${size}px Arial`;
        this.context.fillText(text, position.x, position.y);
    }

    #draw(drawable) {
        this.context.fillStyle = drawable.color;
        this.context.translate(drawable.x, drawable.y);
        this.context.fill(drawable.path2D);
        this.#resetContextTransform();
    }

    #resetContextTransform() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
}
