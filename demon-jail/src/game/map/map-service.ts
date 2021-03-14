import {Service} from "typedi";
import {Constants} from "../constants";
import {PathFinderService} from "../path/path-finder.service";
import {Position} from "../math/position/position";
import {MapObjectType} from "../game-state";
import {Stage} from "../stage/stage";


export interface MapMetadata {
    type: MapObjectType;
    position: Position;
}

@Service()
export class MapService {

    constructor(private pathFinder: PathFinderService) {
    }

    async getMapMetadata(stage: Stage): Promise<MapMetadata[]> {
        // read the stage map configuration using canvas
        const image = stage.mapImage;
        const canvas = document.querySelector('#map') as HTMLCanvasElement;
        const xTiles = this.pathFinder.tilesPerWidth; // FIXME should be constant
        const yTiles = this.pathFinder.tilesPerHeight;
        canvas.width = xTiles;
        canvas.height = yTiles;
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('no context');
        }
        context.drawImage(image, 0, 0, image.width, image.height);

        const mapObjects: MapMetadata[] = [];
        for (let xTilePosition = 0; xTilePosition < xTiles; xTilePosition++) {
            for (let yTilePosition = 0; yTilePosition < yTiles; yTilePosition++) {
                const mapObject = this.getMapObject(xTilePosition, yTilePosition, context);
                if (mapObject) {
                    mapObjects.push(mapObject);
                }
            }
        }
        // FIXME? context.clearRect(0, 0, image.width, image.height);
        return mapObjects;
    }

    private getMapObject(xTilePosition: number, yTilePosition: number, context: CanvasRenderingContext2D): MapMetadata | null {
        const x = xTilePosition * Constants.tileSize;
        const y = yTilePosition * Constants.tileSize;
        const pixelData = context.getImageData(xTilePosition, yTilePosition, 1, 1).data;
        if (pixelData[0] === 0) { // black
            return {type: MapObjectType.Wall, position: {x: x, y: y}};
        }
        if (pixelData[0] > 200 && pixelData[1] < 100 && pixelData[2] < 100) { // red-ish
            return {type: MapObjectType.Tower, position: {x: x, y: y}};
        }
        return null;
    }

}
