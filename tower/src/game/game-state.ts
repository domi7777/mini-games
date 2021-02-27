import {Enemy} from "./enemy/enemy";
import {Tower} from "./tower/tower";
import {Wall} from "./wall/wall";
import {EntryPath} from "./path/entry-path";
import {ExitPath} from "./path/exit-path";
import {Drawable} from "./drawing/drawable";

export interface GameState {
    readonly missed: number;
    readonly enemies: Enemy[];
    readonly towers: Tower[];
    readonly walls: Wall[];
    readonly entry: EntryPath;
    readonly exit: ExitPath;
    readonly mouseCursor: Drawable;
}
