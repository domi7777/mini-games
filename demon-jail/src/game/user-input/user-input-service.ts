import {Service} from "typedi";
import {Position} from "../math/position/position";
import {PathFinderService} from "../path/path-finder.service";
import {GameCanvas} from "../canvas/game-canvas";
import {MouseOrTouchEvent} from "../utils/mouse-or-touch.event";

@Service()
export class UserInputService {

    constructor(private canvas: GameCanvas, private pathFinder: PathFinderService) {
    }

    getNormalizedMousePosition(event: MouseOrTouchEvent): Position {
        const mousePosition = this.getMousePosition(event);
        const centerDiff = this.pathFinder.tileSize / 2;
        return this.pathFinder.normalizePositionToTilePosition({
            x: mousePosition.x - centerDiff,
            y: mousePosition.y - centerDiff,
        });
    }

    getMousePosition(event: MouseOrTouchEvent): Position {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

}
