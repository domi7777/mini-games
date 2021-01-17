import {Drawable} from "./drawable";
import {get2DContext, getCanvas, getHeight, getWidth, isDebug} from "../global-functions";
import {AnimatedDrawable} from "../animations/animated-drawable";
import {Direction} from "./direction.enum";

export abstract class DrawUtils {

    static context = get2DContext();
    static width = getWidth();
    static height = getHeight();

    static draw(...drawables: Drawable[]) {
        this.clearScreen();
        drawables
            .filter(drawable => drawable.shouldDraw)
            .forEach(drawable => this.doDraw(drawable));
    }

    static clearScreen() {
        get2DContext().clearRect(0, 0, getWidth(), getHeight());
    }

    static drawText(text: string,
                    position = {x: 10, y: 10},
                    fontSize = 20,
                    fontColor = 'White',
                    fontFamily = 'Arial') {
        this.context.fillStyle = fontColor;
        this.context.font = `${fontSize}px '${fontFamily}'`;
        this.wrapText(text, position.x, position.y, this.width - 50, fontSize);
    }

    // credits: https://stackoverflow.com/a/27503574
    private static wrapText(text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
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

    private static doDraw(drawable: Drawable) {
        this.context.beginPath();
        const scale = drawable.scale;

        if (isDebug()) {
            this.context.strokeStyle = 'red';
            this.context.moveTo(drawable.x, drawable.y);
            this.context.lineTo(drawable.x + drawable.width * scale, drawable.y);
            this.context.lineTo(drawable.x + drawable.width * scale, drawable.y + drawable.height * scale);
            this.context.lineTo(drawable.x, drawable.y + drawable.height * scale);
            this.context.lineTo(drawable.x, drawable.y);
            this.context.stroke();
        }

        if (drawable instanceof AnimatedDrawable) {
            const isReverse = drawable.direction === Direction.left;

            if (isReverse) {
                this.context.save();
                this.context.translate(getCanvas().width, 0);
                this.context.scale(-scale, scale);
            } else {
                this.context.save();
                this.context.translate(0, 0);
                this.context.scale(scale, scale);
            }

            this.context.drawImage(
                drawable.image,
                // locate frames in sprite:
                drawable.getCurrentAnimation().x + (drawable.width * drawable.currentFrameNumber),
                drawable.getCurrentAnimation().y,
                drawable.width,
                drawable.height,
                // where to draw it on canvas:
                isReverse
                    ? (getCanvas().width / scale) - (drawable.x / scale) - drawable.width
                    : drawable.x / scale,
                drawable.y / scale,
                drawable.width,
                drawable.height
            );
            this.context.restore();
        } else {
            this.context.drawImage(
                drawable.image,
                drawable.x,
                drawable.y,
                drawable.width,
                drawable.height
            );
        }
        this.resetContextTransform();
    }

    private static resetContextTransform() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }

}
