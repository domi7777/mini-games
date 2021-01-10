import {EnemyConfig} from "../config";
import {AnimatedDrawable} from "./animations/animated-drawable";
import {AnimationType} from "./animations/animation-type.enum";

export abstract class Enemy extends AnimatedDrawable {
    speed: number;
    death = false;
    falling = false;

    protected constructor(public enemyConfig: EnemyConfig, animationType: AnimationType) {
        super(enemyConfig, animationType);
        this.speed = enemyConfig.speed;
    }
}
