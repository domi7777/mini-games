import {Drawable} from "./drawing/drawable";
import {Point} from "./drawing/point";

export abstract class CollisionUtils {

    static isPointInDrawableBounds(point: Point, drawable: Drawable) {
        //console.log(point, drawable.x, drawable.y, drawable.width, drawable.height)
        const boundRatio = 2;
        return point.x < drawable.x + drawable.width / boundRatio  // todo configurable bounds?
            && point.x > drawable.x - drawable.width / boundRatio
            && point.y < drawable.y + drawable.height / boundRatio
            && point.y > drawable.y - drawable.height / boundRatio
    }

}
