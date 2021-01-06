import {EnemyConfig} from "../config";
import {AnimatedDrawable} from "./drawing/animated-drawable";

export class Enemy extends AnimatedDrawable {
    speed: number;
    death = false;

    constructor(public enemyConfig: EnemyConfig) {
        super(enemyConfig);
        this.speed = enemyConfig.speed;
    }
}
