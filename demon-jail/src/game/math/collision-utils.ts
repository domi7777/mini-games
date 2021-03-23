import {Drawable} from "../drawing/drawable";
import {Position} from "./position/position";


export abstract class CollisionUtils {

    static isCollidingWith(drawable1: Drawable, drawable2: Drawable): boolean {
        return this.isPointInDrawableBounds(drawable1.center, drawable2)
            || this.isPointInDrawableBounds(drawable2.center, drawable1)
            || this.arePointsInDrawableBounds([
                drawable1.topLeft,
                drawable1.topRight,
                drawable1.bottomRight,
                drawable1.bottomLeft
            ], drawable2);
    }

    private static isPointInDrawableBounds(position: Position, drawable: Drawable) {
        return position.x < drawable.x + drawable.width * drawable.scale
            && position.x > drawable.x
            && position.y < drawable.y + drawable.height * drawable.scale
            && position.y > drawable.y
    }

    private static arePointsInDrawableBounds(points: Position[], drawable: Drawable) {
        return points.some(point => this.isPointInDrawableBounds(point, drawable));
    }

}
