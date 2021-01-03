import ViewUtils from "./view-utils.js"

export default class DrawService {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }

    get width() {
        return ViewUtils.getWidth(this.canvas);
    }

    get height() {
        return ViewUtils.getHeight(this.canvas);
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
        this.#wrapText(text, position.x, position.y, this.width - 50,  size);
    }

    // credits: https://stackoverflow.com/a/27503574
    #wrapText(text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = this.context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                this.context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        this.context.fillText(line, x, y);
    }

    #draw(drawable) {
        this.context.fillStyle = drawable.color;
        this.context.translate(drawable.x, drawable.y);
        if (drawable.config.path2DLeft && drawable.speed && drawable.speed < 0) {
            drawable.path2D = drawable.config.path2DLeft;
        }
        if (drawable.config.path2DRight && drawable.speed && drawable.speed > 0) {
            drawable.path2D = drawable.config.path2DRight;
        }
        this.context.fill(drawable.path2D);
        this.#resetContextTransform();
    }

    #resetContextTransform() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }

}
