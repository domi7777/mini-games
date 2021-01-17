import {Drawable} from "../drawing/drawable";
import {Point} from "../drawing/point";

export abstract class CollisionUtils {

    static isPointInDrawableBounds(point: Point, drawable: Drawable) {
        return point.x < drawable.x + drawable.width * drawable.scale
            && point.x > drawable.x
            && point.y < drawable.y + drawable.height * drawable.scale
            && point.y > drawable.y
    }

}
