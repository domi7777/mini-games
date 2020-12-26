export default class ViewUtils {
    static getWidth(canvas) {
        return canvas.getBoundingClientRect().width;
    }

    static getHeight(canvas) {
        return canvas.getBoundingClientRect().height;
    }
}
