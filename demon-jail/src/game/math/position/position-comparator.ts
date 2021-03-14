import {Position} from "./position";

type Comparator = (a: any, b: any) => number;

export enum AscOrDesc {
    asc = "asc",
    desc = "desc"
}

export abstract class PositionComparator {
    static compareByYPosition(ascOrDesc = AscOrDesc.asc): Comparator {
        return function (position1: Position, position2: Position): number {
            const returnValue = ascOrDesc === AscOrDesc.asc ? 1 : -1;
            return position1.y < position2.y ? -returnValue : position1.y > position2.y ? returnValue : 0
        }
    }
}
