import {Trophy} from "../score/trophy";

export enum StageDifficulty {
    easy = "easy",
    medium = "medium",
    hard = "hard"
}

export namespace StageDifficulty {
    export function toTrophy(difficulty: StageDifficulty): Trophy {
        switch (difficulty) {
            case StageDifficulty.easy: return Trophy.bronze;
            case StageDifficulty.medium: return Trophy.silver;
            case StageDifficulty.hard: return Trophy.gold;
        };
    }
}
