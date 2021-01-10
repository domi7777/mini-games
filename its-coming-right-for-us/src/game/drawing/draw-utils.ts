import {Drawable} from "./drawable";
import {get2DContext, getCanvas, getHeight, getWidth} from "../global-functions";
import {AnimatedDrawable} from "../animations/animated-drawable";
import {Direction} from "./direction.enum";

export abstract class DrawUtils {

    static context = get2DContext();
    static width = getWidth();
    static height = getHeight();

    static draw(...drawables: Drawable[]) {
        get2DContext().clearRect(0, 0, getWidth(), getHeight());
        drawables
            .filter(drawable => drawable.shouldDraw)
            .forEach(drawable => this.doDraw(drawable));
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
        if (drawable instanceof AnimatedDrawable) {
            const isReverse = drawable.direction === Direction.left;
            if (isReverse) {
                this.context.save();
                this.context.translate(getCanvas().width, 0);
                this.context.scale(-1, 1);
            }
            this.context.drawImage(
                drawable.image,
                drawable.getCurrentAnimation().x + (drawable.width * drawable.currentFrameNumber),
                drawable.getCurrentAnimation().y,
                drawable.width,
                drawable.height,
                isReverse ? getCanvas().width - drawable.x - drawable.width / 2 : drawable.x + drawable.width / 2,
                drawable.y + drawable.height / 2,
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
