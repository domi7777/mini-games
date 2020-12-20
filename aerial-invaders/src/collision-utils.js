export default class CollisionUtils {
    static getCollisionPoints(drawable) {
        return [
            {x: drawable.x, y: drawable.y},

            {x: drawable.x - drawable.width / 2, y: drawable.y},
            {x: drawable.x + drawable.width / 2, y: drawable.y},

            {x: drawable.x, y: drawable.y - drawable.height / 2},
            {x: drawable.x, y: drawable.y + drawable.height / 2},

            {x: drawable.x - drawable.width / 2, y: drawable.y - drawable.height / 2},
            {x: drawable.x + drawable.width / 2, y: drawable.y + drawable.height / 2}
        ];
    }
}
