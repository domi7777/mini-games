import {Service} from "typedi";
import {StageType} from "../stage/stage-type";
import {Trophy} from "./trophy";
import {Store} from "../store";

@Service()
export class ScoreService {
    constructor(private store: Store) {
    }

    setNewScore(stageType: StageType, trophy: Trophy): void {
        const scores = this.store.scores$.value;
        const trophies = scores[stageType] || [];
        if (!trophies.includes(trophy)) {
            trophies.push(trophy);
        }
        this.store.scores$.next({
            ...scores,
            [stageType]: trophies
        });
    }
}
