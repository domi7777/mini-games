import {Service} from "typedi";
import {animationFrameScheduler, fromEvent, merge, Observable, of, scheduled, Subscription} from "rxjs";
import {DrawingService} from "./drawing/drawing-service";
import {buffer, distinctUntilChanged, filter, map, repeat, shareReplay, tap, withLatestFrom} from "rxjs/operators";
import {Wall} from "./wall/wall";
import {EnemyService} from "./enemy/enemy.service";
import {GameState, MapObjectType} from "./game-state";
import {MouseOrTouchEvent} from "./utils/mouse-or-touch.event";
import {PositionComparator} from "./math/position/position-comparator";
import {WallService} from "./wall/wall-service";
import {TowerService} from "./tower/tower-service";
import {GameCanvas} from "./canvas/game-canvas";
import {Tower} from "./tower/tower";
import {AssetsPreloaderService} from "./assets/assets-preloader-service";
import {StageService} from "./stage/stage-service";
import {Store} from "./store";
import {HtmlUtils} from "./utils/html-utils";
import {OverlayService} from "./hud/overlay-service";
import {StageDifficulty} from "./stage/stage-difficulty";
import {StageType} from "./stage/stage-type";
import {Trophy} from "./score/trophy";
import {stageZConfig} from "./stage/stages/stage-z.config";
import {Stage} from "./stage/stage";
import {stageSnakeConfig} from "./stage/stages/stage-snake.config";
import {stageWhichWayConfig} from "./stage/stages/stage-which-way.config";
import {stageCrossConfig} from "./stage/stages/stage-cross.config";
import {stageAroundConfig} from "./stage/stages/stage-around.config";

@Service()
export class DemonJailGame {

    private static GAME_CSS = {
        in: 'in-game',
        out: 'out-game',
    }

    private quickTestStageType = StageType.cross;

    private stages = [
        stageZConfig,
        stageSnakeConfig,
        stageWhichWayConfig,
        stageCrossConfig,
        stageAroundConfig
        // TODO add some more
    ];

    private frames$ = scheduled(of(0), animationFrameScheduler)
        .pipe(repeat());

    private mouseDown$ = fromEvent<MouseEvent>(document, 'mousedown');
    private mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');
    private mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');

    private touchStart$ = fromEvent<TouchEvent>(this.canvas, 'touchstart');
    private touchEnd$ = fromEvent<TouchEvent>(document, 'touchend');
    private touchMove$ = fromEvent<TouchEvent>(this.canvas, 'touchmove');

    private mouseOrTouchReleasedEvent$: Observable<MouseOrTouchEvent> = merge(
        this.mouseDown$.pipe(map(event => new MouseOrTouchEvent(event, false))),
        this.mouseUp$.pipe(map(event => new MouseOrTouchEvent(event, true))),
        this.touchStart$.pipe(map(event => new MouseOrTouchEvent(event, false))),
        this.touchEnd$.pipe(map(event => new MouseOrTouchEvent(event, true))),
    ).pipe(
        buffer(this.frames$),
        map((frames: MouseOrTouchEvent[]) => frames[0]),
        filter(event => !!event)
    );

    private mouseOrTouchMoveEvent$: Observable<MouseOrTouchEvent> = merge(
        this.mouseMove$,
        this.touchMove$
    ).pipe(
        withLatestFrom(this.mouseOrTouchReleasedEvent$),
        map(([moveEvent, releaseEvent]) => new MouseOrTouchEvent(moveEvent, releaseEvent.released)),
        shareReplay(1) // to always have one mouseMoveEvent for game loop start
    );

    private mouseOrTouchEvent$: Observable<MouseOrTouchEvent> = merge(
        this.mouseOrTouchMoveEvent$,
        this.mouseOrTouchReleasedEvent$
    );

    private gameLoopSubscription?: Subscription;

    constructor(
        private canvas: GameCanvas,
        private store: Store,
        private drawService: DrawingService,
        private assetsLoader: AssetsPreloaderService,
        private stageService: StageService,
        private enemyService: EnemyService,
        private towerService: TowerService,
        private wallService: WallService,
        private overlayService: OverlayService
    ) {
        //setInterval(() => console.log((<any>performance).memory.usedJSHeapSize / (1000 * 1000)), 1000)
        this.renderWhenStateChanges();
        this.mouseOrTouchEvent$.subscribe();
        this.store.gameState$.subscribe();
    }

    /**
     * Starts the whole thing
     */
    async run() {
        console.log('starting game');
        this.overlayService.showInstructions();
        await this.assetsLoader.preloadAssets();
        this.canvas.classList.add(DemonJailGame.GAME_CSS.in);

        const quickTestStage = new URLSearchParams(window.location.search).get('stage');
        if (quickTestStage) {
            this.createGameLoop();
            const quickTestDifficulty = new URLSearchParams(window.location.search).get('difficulty');
            this.startStage(
                quickTestStage as StageType,
                quickTestDifficulty as StageDifficulty || StageDifficulty.easy
            );
        }

        const startButtonSelector = '#start-button';
        const startGame = () => {
            HtmlUtils.getHtmlElement(startButtonSelector).removeEventListener('click', startGame);
            this.overlayService.hideInstructions();
            this.gotoStageSelectionScreen();
        }
        HtmlUtils.getHtmlElement(startButtonSelector).addEventListener('click', startGame);
    }

    private gotoStageSelectionScreen(): void {
        this.overlayService.showStageSelection();
        const stagesContainer = HtmlUtils.getHtmlElement('#stages');

        stagesContainer.innerHTML = this.stages
            .map(stage =>
                `<li> <!-- TODO stage greyd out if no trophies of the previous one! -->
                    <a class="stage-select-button" data-stage="${stage.type}">
                        ${StageType.format(stage.type)}
                    </a> 
                    <span class="trophies">
                ${
                    this.getStoredTrophies(stage.type)
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

    private getStoredTrophies(stageType: StageType): Trophy[] {
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
        this.createGameLoop();
        console.log(`Starting stage "${selectedStage}" with difficulty "${selectedDifficulty}"`);
        const stageConfig = this.stages.find(stage => stage.type === selectedStage)
        if (!stageConfig) {
            throw new Error(`Stage "${selectedStage}" not found!`);
        }
        try {
            const gameState = await this.stageService.run(
                new Stage(selectedDifficulty, stageConfig)
            );
            this.store.gameState$.next({ // empties game board
                ...gameState,
                towers: [],
                walls: []
            });
        } catch (e) {
            console.warn(e);
        }
        this.drawService.clearBackgroundScreen();
        console.log('stages ended');
        this.gameLoopSubscription?.unsubscribe()
        this.gameLoopSubscription = undefined;
        this.gotoStageSelectionScreen();
    }

    private createGameLoop() {
        if (!this.gameLoopSubscription) {
            this.gameLoopSubscription = this.frames$.pipe(
                tap(() => this.drawService.clearScreen()),
                withLatestFrom(
                    this.store.gameState$,
                    this.mouseOrTouchEvent$,
                ),
                map(([_, gameState, mouseOrTouchEvent]) => this.getNextGameState(gameState, mouseOrTouchEvent)),
                tap(gameState => this.store.gameState$.next(gameState))
            ).subscribe(gameState => this.render(gameState));
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
            map(gameState => gameState.money.toFixed(0)),
            distinctUntilChanged()
        ).subscribe(score => HtmlUtils.setTextOnHtmlElement('.money', score));// fixme use overlayService
    }

    private render(gameState: GameState) {
        const drawables = [
            gameState.startPoint,
            gameState.exitPoint,
            ...gameState.towers
                .flatMap(tower => tower.getChildren()), // towers themselves are rendered on demand
            ...gameState.enemies
                .filter(enemy => gameState.currentStageCreationTime > enemy.spawnDelay) // filter out not yet spawn
                .sort(PositionComparator.compareByYPosition()) // render top ones first
        ]
        if (gameState.mouseCursor) {
            drawables.push(gameState.mouseCursor);
        }
        this.drawService.draw(...drawables);
    }

    private getNextGameState(gameState: GameState,
                             mouseOrTouchEvent: MouseOrTouchEvent): GameState {
        const {nextEnemies, missedEnemies, killedEnemies} = this.enemyService.getNextEnemiesState(
            gameState.enemies,
            gameState.exitPoint,
            gameState.towers.flatMap(tower => tower.missiles),
            gameState.currentStageCreationTime
        );
        const rewardMoney = killedEnemies
            .map(enemy => enemy.scoreValue)
            .reduce((sum, score) => sum + score, 0);
        const nextTowers = this.towerService.getNextTowers(gameState, mouseOrTouchEvent);
        const newTowerPrice = nextTowers.length > gameState.towers.length ? nextTowers[nextTowers.length - 1].price : 0;
        return {
            money: gameState.money + rewardMoney - newTowerPrice,
            lives: gameState.lives - missedEnemies.length,
            startPoint: gameState.startPoint,
            exitPoint: gameState.exitPoint,
            enemies: nextEnemies,
            towers: nextTowers,
            walls: this.wallService.getNextWalls(gameState, mouseOrTouchEvent),
            mouseCursor: this.getNextCursor(gameState, mouseOrTouchEvent),
            cursorMode: gameState.cursorMode,
            currentStageCreationTime: gameState.currentStageCreationTime + 17 // 60 fps * 17 ~= 1000 to mimic elapsed ms
        };
    }

    private getNextCursor(gameState: GameState, mouseOrTouchEvent: MouseOrTouchEvent): Wall | Tower | null {
        if (gameState.cursorMode === null) {
            return null;
        }
        return gameState.cursorMode === MapObjectType.Wall
            ? this.wallService.getWallMouseCursor(mouseOrTouchEvent, gameState)
            : this.towerService.getTowerMouseCursor(mouseOrTouchEvent, gameState);
    }

}
