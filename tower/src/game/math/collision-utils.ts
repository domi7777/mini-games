import {Drawable} from "../drawing/drawable";
import {Position} from "./position/position";


export abstract class CollisionUtils {

    static isCollidingWith(drawable1: Drawable, drawable2: Drawable): boolean {
        return this.isPointInDrawableBounds(drawable1.center, drawable2)
            || this.isPointInDrawableBounds(drawable2.center, drawable1)
    }

    static isPointInDrawableBounds(point: Position, drawable: Drawable) {
        return point.x < drawable.x + drawable.width * drawable.scale
            && point.x > drawable.x
            && point.y < drawable.y + drawable.height * drawable.scale
            && point.y > drawable.y
    }

    static arePointsInDrawableBounds(points: Position[], drawable: Drawable) {
        return points.some(point => this.isPointInDrawableBounds(point, drawable));
    }

}
