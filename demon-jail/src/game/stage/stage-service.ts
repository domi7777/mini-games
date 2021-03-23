import {Service} from "typedi";
import {Stage} from "./stage";
import {GameState, MapObjectType} from "../game-state";
import {Wall} from "../wall/wall";
import {Tower, TowerType} from "../tower/tower";
import {MapService} from "../map/map-service";
import {PathFinderService} from "../path/path-finder.service";
import {Store} from "../store";
import {EntryPath} from "../path/entry-path";
import {Constants} from "../constants";
import {ExitPath} from "../path/exit-path";
import {GameCanvas} from "../canvas/game-canvas";
import {filter, first} from "rxjs/operators";
import {TimeUtils} from "../utils/time-utils";
import {OverlayService} from "../hud/overlay-service";
import {Trophy} from "../score/trophy";
import {StageDifficulty} from "./stage-difficulty";
import {ScoreService} from "../score/scoreService";
import {HtmlUtils} from "../utils/html-utils";

@Service()
export class StageService {

    private width = this.canvas.width;
    private height = this.canvas.height;

    constructor(
        private store: Store,
        private canvas: GameCanvas,
        private mapService: MapService,
        private pathFinder: PathFinderService,
        private overlayService: OverlayService,
        private scoreService: ScoreService
    ) {
    }

    async run(stage: Stage, difficulty: StageDifficulty): Promise<GameState> {
        const gameState = await this.setupNewGameState(stage, difficulty);
        this.store.gameState$.next(gameState); // show map without enemies until titles are hidden
        this.overlayService.showTitles(stage.name, stage.subtitle);
        await TimeUtils.waitMillis(3000);

        this.overlayService.hide();
        this.store.gameState$.next({
            ...gameState,
            enemies: stage.getEnemies(difficulty),
            cursorMode: MapObjectType.Tower,
            mouseCursor: new Tower()
        });

        return new Promise((resolve, reject) => {
            const subscription = this.store.gameState$.pipe(
                filter(gameState => gameState.lives > 0 && gameState.enemies.length === 0),
                first()
            ).subscribe(async (gameState) => { // success
                await TimeUtils.waitMillis(1000);
                this.store.gameState$.next({
                    ...gameState,
                    cursorMode: null,
                    mouseCursor: null
                });
                await this.showVictory(stage, gameState, difficulty);
                resolve(gameState);
            });
        });
        // FIXME fail condition
    }

    private async setupNewGameState(stage: Stage, difficulty: StageDifficulty) {
        const mapData = await this.mapService.getMapMetadata(stage);
        const walls = mapData
            .filter(data => data.type === MapObjectType.Wall)
            .map(data => new Wall(data.position));
        const towers = mapData
            .filter(data => data.type === MapObjectType.Tower)
            .map(data => new Tower(TowerType.basic, data.position)); // TODO towers are rendered a bit to low

        console.log(walls);
        this.pathFinder.resetGrid();
        this.pathFinder.setObstacles(walls);
        this.pathFinder.setObstacles(towers);

        return this.getGameState(stage, difficulty, walls, towers);
    }

    private getGameState(stage: Stage, difficulty: StageDifficulty, walls: Wall[], towers: Tower[]): GameState {
        return {
            lives: 20,
            money: stage.getStartMoney(difficulty),
            enemies: [],
            startPoint: new EntryPath(
                {x: stage.entryPosition.x, y: stage.entryPosition.y},
                {height: Constants.tileSize, width: Constants.tileSize * 2}
            ),
            exitPoint: new ExitPath(
                {x: this.width - Constants.tileSize * 3, y: this.canvas.height - Constants.tileSize},
                {height: Constants.tileSize, width: Constants.tileSize * 2}
            ),
            mouseCursor: null,
            cursorMode: null,
            walls: walls,
            towers: towers,
            currentStageCreationTime: 0
        };
    }

    private async showVictory(stage: Stage, gameState: GameState, difficulty: StageDifficulty): Promise<void> {
        const trophy: Trophy = StageDifficulty.toTrophy(difficulty);
        this.overlayService.showTitles(
            'Victory!',
            `Stage ${stage.name} successfully completed`,
            `<div class="trophy-${trophy}"></div>
                <h3><a id="victory-continue-button" style="display: none">Click here to continue</a></h3>`
        );
        this.scoreService.setNewScore(stage.stageType, trophy);
        await TimeUtils.waitMillis(2000);
        const button = HtmlUtils.getHtmlElement('#victory-continue-button');
        button.style.display = 'inline';
        return new Promise((resolve) => {
            const continueAction = () => {
                button.removeEventListener('click', continueAction);
                // remove walls to force re-rendering if same amount afterwards
                this.store.gameState$.next({...gameState, walls: []});
                resolve();
            }
            button.addEventListener('click', continueAction);
        });


    }
}
