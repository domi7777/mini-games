import {AnimatedDrawable} from "../animations/animated-drawable";
import {AnimationType} from "../animations/animation-type.enum";
import {EnemyConfig} from "./enemy-config";

export abstract class Enemy extends AnimatedDrawable {
    speed: number;
    death = false;
    falling = false;

    protected constructor(public enemyConfig: EnemyConfig, animationType: AnimationType) {
        super(enemyConfig, animationType);
        this.speed = enemyConfig.speed;
        this.direction = enemyConfig.defaultDirection;
    }
}
