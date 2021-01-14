import {Enemy} from "./enemy";
import {AnimationConfig, DuckAnimationsConfig} from "../animations/animations-config";
import {EnemyConfig} from "./enemy-config";

export class Duck extends Enemy {
    animations: DuckAnimationsConfig;

    constructor(public enemyConfig: EnemyConfig) {
        super(enemyConfig, enemyConfig.defaultAnimationType);
        this.animations = Object.seal(enemyConfig.animations);
    }

    getCurrentAnimation(): AnimationConfig {
        return this.animations[this.animationType];
    }

}
