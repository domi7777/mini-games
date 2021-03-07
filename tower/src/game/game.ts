import {Service} from "typedi";
import {animationFrameScheduler, BehaviorSubject, fromEvent, merge, Observable, of, scheduled} from "rxjs";
import {DrawingService} from "./drawing/drawing-service";
import {distinctUntilChanged, map, repeat, startWith, tap, withLatestFrom} from "rxjs/operators";
import {Enemy, EnemyType} from "./enemy/enemy";
import {Wall} from "./wall/wall";
import {Position} from "./math/position/position";
import {EntryPath} from "./path/entry-path";
import {ExitPath} from "./path/exit-path";

import {PathFinderService} from "./path/path-finder.service";
import {EnemyService} from "./enemy/enemy.service";
import {GameState, MapObjectType} from "./game-state";
import {MouseClickEvent} from "./utils/mouse-click.event";
import {PositionComparator} from "./math/position/position-comparator";
import {WallService} from "./wall/wall-service";
import {TowerService} from "./tower/tower-service";
import {GameCanvas} from "./canvas/game-canvas";
import {Constants} from "./constants";
import {MapService} from "./map/map-service";
import {Tower} from "./tower/tower";


@Service()
export class GameConfiguration {
    // TODO
}

@Service()
export class Game {

    private static GAME_CSS = {
        in: 'in-game',
        out: 'out-game',
    }

    private readonly entryPosition: Position = Object.seal({x: Constants.tileSize, y: 0});

    private width = this.canvas.width;
    private height = this.canvas.height;

    private gameState$ = new BehaviorSubject<GameState>({
        missed: 0,
        killed: 0,
        enemies: [
            new Enemy({enemyType: EnemyType.bat, position: this.entryPosition}),
            new Enemy({enemyType: EnemyType.orc, position: {x: this.entryPosition.x, y: -50}}),
            new Enemy({enemyType: EnemyType.blob, position: {x: this.entryPosition.x, y: -150}}),
            new Enemy({enemyType: EnemyType.bull, position: {x: this.entryPosition.x, y: -250}}),
            new Enemy({enemyType: EnemyType.vampire, position: {x: this.entryPosition.x, y: -350}}),
            new Enemy({enemyType: EnemyType.skeleton, position: {x: this.entryPosition.x, y: -450}}),
            new Enemy({enemyType: EnemyType.ghost, position: {x: this.entryPosition.x, y: -550}}),
            new Enemy({enemyType: EnemyType.succubus, position: {x: this.entryPosition.x, y: -650}}),
        ],
        towers: [],
        walls: [],
        startPoint: new EntryPath( // FIXME could be rendered on bg
            {x: this.entryPosition.x, y: this.entryPosition.y},
            {height: Constants.tileSize, width: Constants.tileSize * 2}
        ),
        exitPoint: new ExitPath(
            {x: this.width - Constants.tileSize * 3, y: this.canvas.height - Constants.tileSize},
            {height: Constants.tileSize, width: Constants.tileSize * 2}
        ),
        mouseCursor: new Wall(),
        cursorMode: MapObjectType.Wall
    });

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

    constructor(
        private canvas: GameCanvas,
        private pathFinder: PathFinderService,
        private drawService: DrawingService,
        private mapService: MapService,
        private enemyService: EnemyService,
        private towerService: TowerService,
        private wallService: WallService,
    ) {
        //setInterval(() => console.log((<any>performance).memory.usedJSHeapSize / (1000 * 1000)), 1000)

        this.gameState$.pipe(
            map(gameState => gameState.walls),
            distinctUntilChanged((walls1, walls2) => walls1.length === walls2.length)
        ).subscribe(drawables => this.drawService.drawOnBackground(...drawables))
        this.gameState$.pipe(
            map(gameState => gameState.towers),
            distinctUntilChanged((towers1, towers2) => towers1.length === towers2.length)
        ).subscribe(drawables => this.drawService.drawOnBackground(...drawables))

        // this.drawService.drawGrid(this.pathFinder.tileSize, '#32367e') // FIXME could be done once on bg?
    }

    async start() {
        console.log('starting game');
        this.canvas.classList.add(Game.GAME_CSS.in);

        const state = this.gameState$.getValue();
        this.pathFinder.setObstacles(state.towers); // TODO configure towers from map config png

        this.frames$
            .pipe(
                tap(() => this.drawService.clearScreen()),
                withLatestFrom(
                    this.gameState$,
                    this.mouseClick$,
                    this.mouseMove$,
                ),
                map(([_, gameState, click, mouseMove]) => this.nextGameState(gameState, click, mouseMove)),
                tap(gameState => this.gameState$.next(gameState))
            )
            .subscribe(gameState => { // TODO combine with other observables & game state
                this.render(gameState);
            });

        // TODO put that in stage
        const mapData = await this.mapService.getMapData();
        const walls = mapData
            .filter(data => data.type === MapObjectType.Wall)
            .map(data => new Wall(data.position));
        const towers = mapData
            .filter(data => data.type === MapObjectType.Tower)
            .map(data => new Tower(data.position)); // TODO towers are rendered a bit to low

        this.pathFinder.setObstacles(walls);
        this.pathFinder.setObstacles(towers);
        this.gameState$.next({
            ...this.gameState$.value,
            walls: walls,
            towers: towers
        });
    }

    private render(gameState: GameState) {
        this.drawService.draw(
            gameState.mouseCursor,
            gameState.startPoint,
            gameState.exitPoint,
            ...gameState.towers.flatMap(tower => tower.getChildren()),
            ...gameState.enemies.sort(PositionComparator.compareByYPosition()) // render top ones first
        );
        // TODO icons: lives, money
        this.drawService.drawText(`Missed: ${gameState.missed}`, {x: 10, y: 20});
        this.drawService.drawText(`Killed: ${gameState.killed}`, {x: 270, y: 20});
    }

    private nextGameState(gameState: GameState,
                          mouseClickEvent: MouseClickEvent,
                          mouseMove: MouseEvent): GameState {
        const {nextEnemies, missedEnemies, killedEnemies} = this.enemyService.getNextEnemiesState(
            gameState.enemies,
            gameState.exitPoint,
            gameState.towers.flatMap(tower => tower.missiles)
        );

        // FIXME duplicated code
        const mouseCursor = gameState.cursorMode === MapObjectType.Tower // FIXME
            ? this.wallService.getWallMouseCursor(mouseMove, gameState)
            : this.towerService.getTowerMouseCursor(mouseMove, gameState)

        return {
            missed: gameState.missed + missedEnemies.length,
            killed: gameState.killed + killedEnemies.length,
            startPoint: new EntryPath(gameState.startPoint.position, gameState.startPoint.dimensions),
            exitPoint: new ExitPath(gameState.exitPoint.position, gameState.exitPoint.dimensions),
            enemies: nextEnemies,
            towers: this.towerService.getNextTowers(gameState, mouseClickEvent, mouseMove),
            walls: this.wallService.getNextWalls(gameState, mouseClickEvent, mouseMove),
            mouseCursor: mouseCursor,
            cursorMode: gameState.cursorMode
        };
    }

}
