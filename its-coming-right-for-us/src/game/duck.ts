import {Enemy} from "./enemy";
import {EnemyConfig} from "../config";
import {AnimationType} from "./animations/animation-type.enum";
import {AnimationConfig, DuckAnimationsConfig} from "../animations-config";

export class Duck extends Enemy {
    animations: DuckAnimationsConfig;

    constructor(public enemyConfig: EnemyConfig, animationType: AnimationType) {
        super(enemyConfig, animationType);
        this.animations = enemyConfig.animations;
    }

    getCurrentAnimation(): AnimationConfig {
        return this.animations[this.animationType];
    }
}
