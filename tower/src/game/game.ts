import {Service} from "typedi";
import {animationFrameScheduler, fromEvent, merge, Observable, of, scheduled, Subscription} from "rxjs";
import {DrawingService} from "./drawing/drawing-service";
import {distinctUntilChanged, map, repeat, startWith, tap, withLatestFrom} from "rxjs/operators";
import {Wall} from "./wall/wall";

import {PathFinderService} from "./path/path-finder.service";
import {EnemyService} from "./enemy/enemy.service";
import {GameState, MapObjectType} from "./game-state";
import {MouseClickEvent} from "./utils/mouse-click.event";
import {PositionComparator} from "./math/position/position-comparator";
import {WallService} from "./wall/wall-service";
import {TowerService} from "./tower/tower-service";
import {GameCanvas} from "./canvas/game-canvas";
import {MapService} from "./map/map-service";
import {Tower} from "./tower/tower";
import {AssetsPreloaderService} from "./assets/assets-preloader-service";
import {StageZ} from "./stage/stages/stage-z";
import {StageService} from "./stage/stage-service";
import {Store} from "./store";
import {HtmlUtils} from "./utils/html-utils";
import {OverlayService} from "./hud/overlay-service";
import {StageDifficulty} from "./stage/stage-difficulty";
import {StageType} from "./stage/stage-type";
import {StageSnake} from "./stage/stages/stage-snake";
import {Stage} from "./stage/stage";
import {Trophy} from "./score/trophy";

@Service()
export class Game {

    private static GAME_CSS = {
        in: 'in-game',
        out: 'out-game',
    }

    private stages: Stage[] = [
        new StageZ(),
        new StageSnake(),
        // TODO add some more
    ]

    private mouseMove$ = fromEvent<MouseEvent>(this.canvas, 'mousemove').pipe(startWith(new MouseEvent('')));
    private mouseDown$ = fromEvent<MouseEvent>(this.canvas, 'mousedown');
    private mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');

    private mouseClick$: Observable<MouseClickEvent> = merge(
        this.mouseUp$.pipe(map((event) => ({...event, released: true}))),
        this.mouseDown$.pipe(map((event) => ({...event, released: false}))),
        of({...new MouseEvent(''), released: true})
    )
    private frames$ = scheduled(of(0), animationFrameScheduler)
        .pipe(repeat());
    private gameLoopSubscription?: Subscription;

    constructor(
        private canvas: GameCanvas,
        private store: Store,
        private pathFinder: PathFinderService,
        private drawService: DrawingService,
        private assetsLoader: AssetsPreloaderService,
        private mapService: MapService,
        private stageService: StageService,
        private enemyService: EnemyService,
        private towerService: TowerService,
        private wallService: WallService,
        private overlayService: OverlayService
    ) {
        //setInterval(() => console.log((<any>performance).memory.usedJSHeapSize / (1000 * 1000)), 1000)
        this.renderWhenStateChanges();
    }

    /**
     * Starts the whole thing
     */
    async run() {
        console.log('starting game');
        this.overlayService.showInstructions();
        await this.assetsLoader.preloadAssets();
        this.canvas.classList.add(Game.GAME_CSS.in);

        const startButtonSelector = '#start-button';
        const startGame = () => {
            HtmlUtils.getHtmlElement(startButtonSelector).removeEventListener('click', startGame);
            this.overlayService.hideInstructions();
            this.gotoStageSelectionScreen();
        }
        HtmlUtils.getHtmlElement(startButtonSelector).addEventListener('click', startGame);
    }

    private gotoStageSelectionScreen(): void {
        this.createGameLoop();
        this.overlayService.showStageSelection();
        const stagesContainer = HtmlUtils.getHtmlElement('#stages');

        stagesContainer.innerHTML = this.stages
            .map(stage => stage.stageType)
            .map(stageType =>
                `<li>
                    <a class="stage-select-button" data-stage="${stageType}">
                        The ${this.formatStageName(stageType)}
                    </a> 
                    <span class="trophies">
                ${
                    this.getTrophies(stageType)
                        .map(trophy => '<span class="trophy-' + trophy + '"></span>')
                        .join('')
                }
                    </span>
                 </li>`
            ).join('');

        const stageSelector = '.stage-select-button'
        const stageButtons = HtmlUtils.getHtmlElements(stageSelector);

        const stageSelected = (e: any) => {
            const selectedStage = e.target.getAttribute('data-stage');
            stageButtons.forEach(button => button.removeEventListener('click', stageSelected));
            this.overlayService.hideStageSelection();
            this.goToDifficultySelectionScreen(selectedStage);
        }
        stageButtons.forEach(button => button.addEventListener('click', stageSelected));
    }

    private getTrophies(stageType: StageType): Trophy[] {
        return this.store.scores$.value[stageType] || [];
    }

    private goToDifficultySelectionScreen(selectedStage: StageType): void {
        this.overlayService.showDifficultySelection();
        const difficultyButtonSelector = '.difficulty-select-button'
        const difficultyButtons = HtmlUtils.getHtmlElements(difficultyButtonSelector);

        const difficultySelected = (e: any) => {
            const selectedDifficulty = e.target.getAttribute('data-difficulty');
            difficultyButtons.forEach(button => button.removeEventListener('click', difficultySelected));
            this.overlayService.hideDifficultySelection();
            this.startStage(selectedStage, selectedDifficulty);
        }
        difficultyButtons.forEach(button => button.addEventListener('click', difficultySelected));
    }

    private async startStage(selectedStage: StageType, selectedDifficulty: StageDifficulty): Promise<void> {
        console.log(`Starting stage "${selectedStage}" with difficulty "${selectedDifficulty}"`);
        const stage = this.stages.find(stage => stage.stageType === selectedStage)
        if (!stage) {
            throw new Error(`Stage "${selectedStage}" not found!`);
        }
        try {
            await this.stageService.run(stage, selectedDifficulty);
        } catch (e) {
            console.warn(e);
        }
        this.drawService.clearBackgroundScreen();
        console.log('stages ended');
        this.run();
    }

    private createGameLoop() {
        if (!this.gameLoopSubscription) {
            this.gameLoopSubscription = this.frames$
                .pipe(
                    tap(() => this.drawService.clearScreen()),
                    withLatestFrom(
                        this.store.gameState$,
                        this.mouseClick$,
                        this.mouseMove$,
                    ),
                    map(([_, gameState, click, mouseMove]) => this.getNextGameState(gameState, click, mouseMove)),
                    tap(gameState => this.store.gameState$.next(gameState))
                )
                .subscribe(gameState => this.render(gameState));
        }
    }

    private renderWhenStateChanges() {
        this.store.gameState$.pipe(
            map(gameState => gameState.walls),
            distinctUntilChanged((walls1, walls2) => walls1.length === walls2.length)
        ).subscribe(walls => this.drawService.drawOnBackground(...walls))

        this.store.gameState$.pipe(
            map(gameState => gameState.towers),
            distinctUntilChanged((towers1, towers2) => towers1.length === towers2.length)
        ).subscribe(towers => this.drawService.drawOnBackground(...towers.sort(PositionComparator.compareByYPosition())));

        this.store.gameState$.pipe(
            map(gameState => gameState.lives),
            distinctUntilChanged()
        ).subscribe(lives => HtmlUtils.setTextOnHtmlElement('.lives', lives)); // fixme use overlayService

        this.store.gameState$.pipe(
            map(gameState => gameState.money),
            distinctUntilChanged()
        ).subscribe(score => HtmlUtils.setTextOnHtmlElement('.money', score));// fixme use overlayService
    }

    private render(gameState: GameState) {
        this.drawService.draw(
            gameState.mouseCursor,
            gameState.startPoint,
            gameState.exitPoint,
            ...gameState.towers
                .flatMap(tower => tower.getChildren()), // towers themselves are rendered on demand
            ...gameState.enemies
                .filter(enemy => gameState.currentStageCreationTime > enemy.spawnDelay) // filter out not yet spawn
                .sort(PositionComparator.compareByYPosition()) // render top ones first
        );
    }

    private getNextGameState(gameState: GameState,
                             mouseClickEvent: MouseClickEvent,
                             mouseMove: MouseEvent): GameState {
        const {nextEnemies, missedEnemies, killedEnemies} = this.enemyService.getNextEnemiesState(
            gameState.enemies,
            gameState.exitPoint,
            gameState.towers.flatMap(tower => tower.missiles),
            gameState.currentStageCreationTime
        );
        const rewardMoney = killedEnemies
            .map(enemy => enemy.scoreValue)
            .reduce((sum, score) => sum + score, 0);
        const nextTowers = this.towerService.getNextTowers(gameState, mouseClickEvent, mouseMove);
        const newTowerPrice = nextTowers.length > gameState.towers.length ? nextTowers[nextTowers.length - 1].price : 0;
        return {
            money: gameState.money + rewardMoney - newTowerPrice,
            lives: gameState.lives - missedEnemies.length,
            startPoint: gameState.startPoint,
            exitPoint: gameState.exitPoint,
            enemies: nextEnemies,
            towers: nextTowers,
            walls: this.wallService.getNextWalls(gameState, mouseClickEvent, mouseMove),
            mouseCursor: this.getNextCursor(gameState, mouseMove),
            cursorMode: gameState.cursorMode,
            currentStageCreationTime: gameState.currentStageCreationTime + 17 // 60 fps * 17 ~= 1000 to mimic elapsed ms
        };
    }

    private getNextCursor(gameState: GameState, mouseMove: MouseEvent): Wall | Tower {
        return gameState.cursorMode === MapObjectType.Wall
            ? this.wallService.getWallMouseCursor(mouseMove, gameState)
            : this.towerService.getTowerMouseCursor(mouseMove, gameState);
    }


    private formatStageName(stageType: StageType): string {
        const name = stageType.toString();
        const withFirstLetterCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
        return withFirstLetterCapitalized.split('_').join(' ');
    }
}
