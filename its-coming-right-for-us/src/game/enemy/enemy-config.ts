import {DuckAnimationsConfig} from "../duck/duck-animation.config";
import {AnimatedDrawableConfig} from "../drawing/drawable-config";

export interface EnemyConfig<T> extends AnimatedDrawableConfig<T> {
    speed: number;
    scoreValue: number;
    animations: DuckAnimationsConfig;
    defaultAnimationType: T;
    creationDelay: number;
    relativeToPreviousEnemyY?: number;
    relativeToPreviousEnemyX?: number;
    lives: number;
}
