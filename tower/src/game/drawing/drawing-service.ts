import {Service} from "typedi";
import {Drawable} from "./drawable";
import {AnimatedDrawable} from "../animations/animated-drawable";
import {GameCanvas} from "../canvas/game-canvas";
import {BackgroundCanvas} from "../canvas/background-canvas";

@Service()
export class DrawingService {

    private context: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    private backgroundContext: CanvasRenderingContext2D = this.backgroundCanvas.getContext('2d') as CanvasRenderingContext2D;
    private width = this.canvas.getBoundingClientRect().width;
    private height = this.canvas.getBoundingClientRect().height;

    constructor(private canvas: GameCanvas, private backgroundCanvas: BackgroundCanvas) {
    }

    draw(...drawables: Drawable[]) {
        [...drawables, ...drawables.flatMap(drawable => drawable.getChildren())]
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
        this.writeWrappedText(`${text}`, position.x, position.y, this.width - 50, fontSize);
    }

    drawGrid(step: number, color: string): void {
        this.backgroundContext.strokeStyle = color;
        this.backgroundContext.beginPath();
        for (let x = 0; x <= this.width; x += step) {
            this.backgroundContext.moveTo(x, 0);
            this.backgroundContext.lineTo(x, this.height);
        }
        for (let y = 0; y <= this.height; y += step) {
            this.backgroundContext.moveTo(0, y);
            this.backgroundContext.lineTo(this.width, y);
        }
        this.backgroundContext.stroke();
    }


    drawOnBackground(...drawables: Drawable[]) {
        drawables.forEach(drawable => {
            if (drawable.tileConfig) {
                this.drawTileImage(drawable, this.backgroundContext);
            } else {
                this.drawImage(drawable, this.backgroundContext);
            }
        });
    }

    // credits: https://stackoverflow.com/a/27503574
    private writeWrappedText(text: string, x: number, y: number, maxWidth: number, lineHeight: number): void {
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
        const scale = drawable.scale;
        this.context.globalAlpha = drawable.opacity;

        if (drawable.drawShape) {
            this.context.beginPath();
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
            } else if (drawable.tileConfig) {
                this.drawTileImage(drawable, this.context);
            } else {
                this.drawImage(drawable, this.context);
            }
        }

        this.resetContextTransform();
    }

    private drawImage(drawable: Drawable, context: CanvasRenderingContext2D) {
        context.drawImage(
            <HTMLImageElement>drawable.image,
            drawable.x,
            drawable.y,
            drawable.width,
            drawable.height
        );
    }

    private drawTileImage(drawable: Drawable, context: CanvasRenderingContext2D) {
        if (!drawable.tileConfig) {
            throw new Error('no tileConfig')
        }
        context.drawImage(
            <HTMLImageElement>drawable.image,
            // locate frames in sprite:
            drawable.tileConfig.start.x,
            drawable.tileConfig.start.y,
            drawable.tileConfig.dimensions.width,
            drawable.tileConfig.dimensions.height,
            // where to draw it on canvas:
            drawable.x,
            drawable.y,
            drawable.width,
            drawable.height
        );
    }

    private drawAnimatedImage(drawable: AnimatedDrawable, image: HTMLImageElement, scale: number) {
        this.context.save();
        this.context.translate(0, 0);
        this.context.scale(scale, scale);

        this.context.drawImage(
            image,
            // locate frames in sprite:
            drawable.framesStartPosition.x + (drawable.width * drawable.currentFrameXNumber),
            drawable.framesStartPosition.y + (drawable.height * drawable.currentFrameYNumber),
            drawable.width,
            drawable.height,
            // where to draw it on canvas:
            drawable.x / scale,
            drawable.y / scale,
            drawable.width,
            drawable.height
        );
        this.context.restore();
    }

    private resetContextTransform() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.globalAlpha = 1;
    }

}
