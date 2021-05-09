import { Drawable } from './drawing/drawable';
import { Point } from './drawing/point';
import { DrawableConfig } from './drawing/drawable-config';
import { AudioConfig } from './assets/audio-config';
import { Audible } from './assets/audible';

export class ShootingCrosshair extends Drawable implements Audible {
    score = 0;

    constructor(config: DrawableConfig & AudioConfig,
                public sounds = config.sounds.audio) {
        super(config);
    }

    setPosition(point: Point) {
        this.position = {
            x: point.x - this.width / 2,
            y: point.y - this.height / 2
        };
    }

}
