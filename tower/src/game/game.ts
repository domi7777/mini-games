import {Service} from "typedi";
import {animationFrameScheduler, BehaviorSubject, fromEvent, merge, Observable, of, scheduled} from "rxjs";
import {DrawingService} from "./drawing/drawing-service";
import {map, repeat, startWith, tap, withLatestFrom} from "rxjs/operators";
import {Tower} from "./tower/tower";
import {Enemy, EnemyType} from "./enemy/enemy";
import {Missile} from "./tower/missile";
import {Wall} from "./wall/wall";
import {Position} from "./math/position";
import {CollisionUtils} from "./math/collision-utils";
import {EntryPath} from "./path/entry-path";
import {ExitPath} from "./path/exit-path";

import {PathFinderService} from "./path/path-finder.service";
import {EnemyService} from "./enemy/enemy.service";
import {GameState} from "./game-state";
import {Drawable} from "./drawing/drawable";
import {MouseClickEvent} from "./utils/mouse-click.event";

@Service()
export class GameConfiguration {

}

@Service()
export class Game {

    private static GAME_CSS = {
        in: 'in-game',
        out: 'out-game',
    }

    private readonly entryPosition: Position = Object.seal({x: 150, y: 0});

    private width = this.canvas.width;
    private height = this.canvas.height;

    private gameState$ = new BehaviorSubject<GameState>({
        missed: 0,
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
        towers: [
            new Tower({x: 250, y: 150}),
            new Tower({x: 250, y: 350}),
            new Tower({x: 150, y: 550}),
        ],
        walls: [ // TODO define in text file/csv (excel)?
            new Wall({x: 0, y: 150}, {height: 20, width: 280}),
            new Wall({x: 290, y: 150}, {height: 20, width: 500}),
            // new Wall({x: 220, y: 150}, {width: 25, height: 150}),
            // new Wall({x: 10, y: 400}, {width: 150, height: 25}),
        ],
        entry: new EntryPath({x: this.entryPosition.x - 25, y: this.entryPosition.y}, {height: 10, width: 50}),
        exit: new ExitPath({x: 300, y: this.canvas.height - 10}, {height: 10, width: 50}),
        mouseCursor: new Wall()
    });

    private mouseMove$ = fromEvent<MouseEvent>(this.canvas, 'mousemove').pipe(startWith(new MouseEvent('')));
    private mouseDown$ = fromEvent<MouseEvent>(this.canvas, 'mousedown');
    private mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup'); // TODO build walls until click button released

    private mouseClick$: Observable<MouseClickEvent> = merge(
        this.mouseUp$.pipe(map((event) => ({...event, released: true}))),
        this.mouseDown$.pipe(map((event) => ({...event, released: false}))),
        of({...new MouseEvent(''), released: true})
    )
    private frames$ = scheduled(of(0), animationFrameScheduler)
        .pipe(repeat());

    constructor(
        private canvas: HTMLCanvasElement,
        private pathFinder: PathFinderService,
        private drawService: DrawingService,
        private enemyService: EnemyService
    ) {
        //setInterval(() => console.log((<any>performance).memory.usedJSHeapSize / (1000 * 1000)), 1000)
    }

    start() {
        console.log('starting game');
        this.canvas.classList.add(Game.GAME_CSS.in);

        const state = this.gameState$.getValue();

        /* TODO make this somehow re-usable?*/
        [...state.walls, ...state.towers].forEach(wall => {
            this.pathFinder.setObstacle(wall);
        })

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
    }

    private render(gameState: GameState) {
        this.drawService.drawGrid(this.pathFinder.tileSize, '#505050')
        this.drawService.draw(
            gameState.mouseCursor,
            gameState.entry,
            gameState.exit,
            ...gameState.walls,
            ...gameState.towers,
            ...gameState.enemies
        );
        this.drawService.drawText(`Missed: ${gameState.missed}`, {x: 10, y: 20});
    }

    private nextGameState(gameState: GameState,
                          mouseClickEvent: MouseClickEvent,
                          mouseMove: MouseEvent): GameState {
        const {nextEnemies, missedEnemies} = this.enemyService.getNextEnemies(
            gameState.enemies,
            gameState.exit,
            gameState.towers.flatMap(tower => tower.missiles)
        );
        return {
            missed: gameState.missed + missedEnemies.length,
            entry: new EntryPath(gameState.entry.position, gameState.entry.dimensions),
            exit: new ExitPath(gameState.exit.position, gameState.exit.dimensions),
            towers: this.getNextTowers(gameState, mouseClickEvent),
            enemies: nextEnemies,
            walls: this.getNextWalls(gameState, mouseClickEvent, mouseMove),
            mouseCursor: this.getWallMouseCursor(mouseMove, gameState)
        };
    }

    private getNextWalls(gameState: GameState,
                         mouseClickEvent: MouseClickEvent,
                         mouseMove: MouseEvent) {
        const walls = gameState.walls.map(wall => new Wall(wall.position, wall.dimensions));
        if (!mouseClickEvent.released) {
            // FIXME if mouse if moved "too" fast some blocks are not built

            const position = this.getNormalizedMousePosition(mouseMove);
            const wall = new Wall(position)
            // wall.center = position;

            if (this.isEnemiesPathBroken(gameState, wall)) {
                return walls;
            } else {
                this.pathFinder.setObstacle(wall);
                return [wall, ...walls];
            }
        }
        return walls;
    }


    private isEnemiesPathBroken(gameState: GameState, wall: Wall) {
        return gameState.enemies.some(enemy => this.pathFinder.isObstacleBreakingPath(wall, enemy.center, gameState.exit.center));
    }

    private getNextTowers(gameState: GameState, mouseClickedEvent: MouseEvent | null) {
        const towers = gameState.towers
            .map(tower => {
                const enemyToShoot = tower.findEnemyToShoot(gameState.enemies);
                const lastShootTs = enemyToShoot ? Date.now() : tower.lastShootTimestamp;
                const missiles = enemyToShoot
                    ? [...tower.missiles, new Missile({target: enemyToShoot, startPosition: tower.center})]
                    : tower.missiles;
                const nextMissiles = missiles
                    .filter(missile => !this.isMissileDestroyed(missile, gameState.enemies))
                    .map(missile => this.getNextMissile(missile, gameState.enemies));
                return new Tower(tower.position, lastShootTs, nextMissiles);
            });
        // if (mouseClickedEvent && towers.length < 80) {
        //     const position = this.getMousePos(mouseClickedEvent);
        //     const tower = new Tower(position);
        //     tower.x -= tower.width / 2;
        //     tower.y -= tower.height / 2;
        //     towers.push(tower);
        // }
        return towers;
    }

    private isMissileDestroyed(missile: Missile, enemies: Enemy[]) {
        const b = missile.y > this.height
            || missile.y < 0
            || missile.x > this.width
            || missile.x < 0
            || missile.target.y < 0
            || missile.target.y > this.height
            || CollisionUtils.isCollidingWith(missile, missile.target)
        return b
    }

    // FIXME move to userInputService
    private getMousePosition(evt: MouseEvent | Touch): Position {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    private getNormalizedMousePosition(evt: MouseEvent | Touch): Position {
        const mousePosition = this.getMousePosition(evt);
        return this.pathFinder.normalizePositionToTilePosition({
            x: mousePosition.x - 5 /*FIXME const (grid block size)*/,
            y: mousePosition.y - 5,
        });
    }

    private getWallMouseCursor(mouseMove: MouseEvent, gameState: GameState): Drawable {
        const wall = new Wall(this.getNormalizedMousePosition(mouseMove));
        // wall.center = this.getNormalizedMousePosition(mouseMove);
        wall.color = this.isEnemiesPathBroken(gameState, wall) ? 'red' : 'green';
        wall.filledWithColor = false;
        return wall;
    }

    private getNextMissile(missile: Missile, enemies: Enemy[]): Missile {
        // FIXME speed not constant
        const speedX = ((missile.endPosition.x - missile.startPosition.x) / 100) * missile.speed;
        const speedY = ((missile.endPosition.y - missile.startPosition.y) / 100) * missile.speed;
        const minSpeed = 1;
        // const velocity = {
        //     x: Math.abs(speedX) < minSpeed ? (speedX < 0 ? -minSpeed : minSpeed) : speedX,
        //     y:  Math.abs(speedY) < minSpeed ? (speedY < 0 ? -minSpeed : minSpeed) : speedY,
        // }
        const target = enemies.find(enemy => enemy.id === missile.target.id);
        if (!target) {
            throw new Error('no target')
        }
        return new Missile({
            startPosition: missile.startPosition,
            position: {x: missile.x + speedX, y: missile.y + speedY},
            target: target
        });

    }
}
