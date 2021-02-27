import {Service} from "typedi";
import {Drawable} from "./drawable";
import {AnimatedDrawable} from "../animations/animated-drawable";
import {Direction} from "./direction.enum";

@Service()
export class DrawService {

    private context: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    private width = this.canvas.getBoundingClientRect().width;
    private height = this.canvas.getBoundingClientRect().height;

    constructor(private canvas: HTMLCanvasElement) {
    }

    draw(...drawables: Drawable[]) {
        drawables
            .filter(drawable => drawable.shouldDraw)
            .forEach(drawable => this.doDraw(drawable));
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    drawText(text: string | number,
             position = {x: 10, y: 10},
             fontSize = 20,
             fontColor = 'White',
             fontFamily = 'Arial') {
        this.context.fillStyle = fontColor;
        this.context.font = `${fontSize}px '${fontFamily}'`;
        this.wrapText(`${text}`, position.x, position.y, this.width - 50, fontSize);
    }

    drawGrid(step: number, color: string): void {
        this.context.strokeStyle = color;
        this.context.beginPath();
        for (let x = 0; x <= this.width; x += step) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.height);
        }
        for (let y = 0; y <= this.height; y += step) {
            this.context.moveTo(0, y);
            this.context.lineTo(this.width, y);
        }
        this.context.stroke();
    }

    // credits: https://stackoverflow.com/a/27503574
    private wrapText(text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
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

    private doDraw(drawable: Drawable) {
        this.context.beginPath();
        const scale = drawable.scale;

        if (1 === 1/*FIXME*/) {
            const color = drawable.color || 'red';
            this.context.strokeStyle = color;
            this.context.fillStyle = color;

            const drawMethod = drawable.filledWithColor
                ? this.context.fillRect.bind(this.context)
                : this.context.strokeRect.bind(this.context);

            drawMethod(drawable.x, drawable.y, drawable.width * drawable.scale, drawable.height * drawable.scale);

            this.context.stroke();
        }

        if (drawable.image) {
            if (drawable instanceof AnimatedDrawable) {
                this.drawAnimatedImage(drawable, drawable.image, scale);
            } else {
                this.drawImage(drawable, drawable.image);
            }
        }

        this.resetContextTransform();
    }

    private drawImage(drawable: Drawable, image: HTMLImageElement) {
        this.context.drawImage(
            image,
            drawable.x,
            drawable.y,
            drawable.width,
            drawable.height
        );
    }

    private drawAnimatedImage(drawable: AnimatedDrawable<unknown>, image: HTMLImageElement, scale: number) {
        const isReverse = drawable.direction === Direction.left;

        if (isReverse) {
            this.context.save();
            this.context.translate(this.canvas.width, 0);
            this.context.scale(-scale, scale);
        } else {
            this.context.save();
            this.context.translate(0, 0);
            this.context.scale(scale, scale);
        }

        this.context.drawImage(
            image,
            // locate frames in sprite:
            drawable.getCurrentAnimation().x + (drawable.width * drawable.currentFrameNumber),
            drawable.getCurrentAnimation().y,
            drawable.width,
            drawable.height,
            // where to draw it on canvas:
            isReverse
                ? (this.canvas.width / scale) - (drawable.x / scale) - drawable.width
                : drawable.x / scale,
            drawable.y / scale,
            drawable.width,
            drawable.height
        );
        this.context.restore();
    }

    private resetContextTransform() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }

}
