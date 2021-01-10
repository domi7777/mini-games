import {DuckAnimationsConfig} from "../animations/animations-config";
import {AnimatedDrawableConfig} from "../drawing/drawable-config";

export interface EnemyConfig extends AnimatedDrawableConfig {
    speed: number;
    animations: DuckAnimationsConfig;
}
