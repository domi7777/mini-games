export default class DrawService {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }

    get width() {
        return this.canvas.getBoundingClientRect().width;
    }

    get height() {
        return this.canvas.getBoundingClientRect().height;
    }

    draw(...drawables) {
        this.context.clearRect(0, 0, this.width, this.height);
        console.log(drawables)
        drawables.forEach(drawable => this.#draw(drawable));
    }

    #draw (drawable) {
        this.context.fillStyle = drawable.color;
        this.context.translate(drawable.x, drawable.y);
        this.context.fill(drawable.path2D);
        this.#resetContextTransform();
    }

    #resetContextTransform() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
}
