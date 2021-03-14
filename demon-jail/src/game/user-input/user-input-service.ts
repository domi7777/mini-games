import {Service} from "typedi";
import {Position} from "../math/position/position";
import {PathFinderService} from "../path/path-finder.service";
import {GameCanvas} from "../canvas/game-canvas";

@Service()
export class UserInputService {

    constructor(private canvas: GameCanvas, private pathFinder: PathFinderService) {
    }

    getNormalizedMousePosition(evt: MouseEvent | Touch): Position {
        const mousePosition = this.getMousePosition(evt);
        const centerDiff = this.pathFinder.tileSize / 2;
        return this.pathFinder.normalizePositionToTilePosition({
            x: mousePosition.x - centerDiff,
            y: mousePosition.y - centerDiff,
        });
    }

    getMousePosition(evt: MouseEvent | Touch): Position {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

}
