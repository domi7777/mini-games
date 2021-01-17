import {Enemy} from "../enemy/enemy";
import {DuckAnimationsConfig} from "./duck-animation.config";
import {EnemyConfig} from "../enemy/enemy-config";
import {DuckAnimationType} from "./duck-animation-type.enum";
import {AnimationConfig} from "../animations/animation.config";

export class Duck extends Enemy<DuckAnimationType> {
    animations: DuckAnimationsConfig;

    constructor(public enemyConfig: EnemyConfig<DuckAnimationType>) {
        super(enemyConfig);
        this.animations = Object.seal(enemyConfig.animations);
    }

    getCurrentAnimation(): AnimationConfig {
        return this.animations[this.animationType];
    }

}
