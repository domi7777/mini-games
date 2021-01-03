import {Drawable} from "./drawable";
import {EnemyConfig} from "../config";

export class Enemy extends Drawable { // todo extends Sprite?

    constructor(public enemyConfig: EnemyConfig) {
        super(enemyConfig);

    }
}
