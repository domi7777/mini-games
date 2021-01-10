import {Enemy} from "./enemy";
import {AnimationType} from "../animations/animation-type.enum";
import {AnimationConfig, DuckAnimationsConfig} from "../animations/animations-config";
import {EnemyConfig} from "./enemy-config";

export class Duck extends Enemy {
    animations: DuckAnimationsConfig;

    constructor(public enemyConfig: EnemyConfig, animationType: AnimationType) {
        super(enemyConfig, animationType);
        this.animations = Object.seal(enemyConfig.animations);
    }

    getCurrentAnimation(): AnimationConfig {
        return this.animations[this.animationType];
    }
}
