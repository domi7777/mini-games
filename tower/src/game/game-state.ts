import {Enemy} from "./enemy/enemy";
import {Tower} from "./tower/tower";
import {Wall} from "./wall/wall";
import {EntryPath} from "./path/entry-path";
import {ExitPath} from "./path/exit-path";
import {Drawable} from "./drawing/drawable";

export enum MapObjectType {
    Wall = "Wall",
    Tower = "Tower",
}

export interface GameState {
    readonly missed: number;
    readonly killed: number;
    readonly enemies: Enemy[];
    readonly towers: Tower[];
    readonly walls: Wall[];
    readonly startPoint: EntryPath;
    readonly exitPoint: ExitPath;
    readonly mouseCursor: Drawable;
    readonly cursorMode: MapObjectType;
}
