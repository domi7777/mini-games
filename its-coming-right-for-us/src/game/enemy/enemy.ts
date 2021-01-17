import {AnimatedDrawable} from "../animations/animated-drawable";
import {EnemyConfig} from "./enemy-config";

export abstract class Enemy<T> extends AnimatedDrawable<T> {
    speed: number;
    death = false;
    falling = false;
    lives: number;
    scoreValue: number;

    protected constructor(public enemyConfig: EnemyConfig<T>) {
        super(enemyConfig);
        this.speed = enemyConfig.speed;
        this.direction = enemyConfig.defaultDirection;
        this.lives = enemyConfig.lives;
        this.scoreValue = enemyConfig.scoreValue;
    }
}
