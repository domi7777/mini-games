import {Service} from "typedi";
import {BehaviorSubject, Subject} from "rxjs";
import {GameState} from "./game-state";
import {Scores} from "./score/scores";

@Service()
export class Store {
    readonly gameState$ = new Subject<GameState>();
    readonly scores$ = new BehaviorSubject<Scores>(this.getStoredScores())

    constructor() {
        this.scores$
            .subscribe(scores => localStorage.setItem('scores', JSON.stringify(scores)))
    }

    private getStoredScores(): Scores {
        const storedScoresString = localStorage.getItem('scores');
        return storedScoresString ? JSON.parse(storedScoresString) : {};
    }
}
