import {Drawable} from "./drawing/drawable";
import {Point} from "./drawing/point";

export abstract class CollisionUtils {

    static isPointInDrawableBounds(point: Point, drawable: Drawable) {
        //console.log(point, drawable.x, drawable.y, drawable.width, drawable.height)
        return point.x < drawable.x + drawable.width / 1.5 // todo configurable bounds?
            && point.x > drawable.x - drawable.width / 1.5
            && point.y < drawable.y + drawable.height / 1.5
            && point.y > drawable.y - drawable.height / 1.5
    }

}
