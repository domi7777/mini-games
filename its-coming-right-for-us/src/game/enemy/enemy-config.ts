import {DuckAnimationsConfig} from "../animations/animations-config";
import {AnimatedDrawableConfig} from "../drawing/drawable-config";
import {AnimationType} from "../animations/animation-type.enum";

export interface EnemyConfig extends AnimatedDrawableConfig {
    speed: number;
    scoreValue: number;
    animations: DuckAnimationsConfig;
    defaultAnimationType: AnimationType;
    creationDelay: number;
    relativeToPreviousEnemyY?: number;
    relativeToPreviousEnemyX?: number;
    lives: number;
}
