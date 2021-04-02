import {StageConfig} from "./stages/stage-config";
import {StageDifficulty} from "./stage-difficulty";
import {Position} from "../math/position/position";
import {Constants} from "../constants";
import {StageType} from "./stage-type";
import {Enemy} from "../enemy/enemy";
import {enemiesConfig, increaseStatsForDifficulty} from "../enemy/enemies-config";

export class Stage {

    readonly type: StageType;
    readonly title: string;
    readonly subtitle: string;
    readonly startMoney: number;
    readonly startLives: number;

    readonly map: HTMLImageElement;
    readonly entryPosition: Position = Object.seal({x: Constants.tileSize, y: 0}); // TODO config

    private static readonly livesPerDifficulty = {
        [StageDifficulty.easy]: 10,
        [StageDifficulty.medium]: 5,
        [StageDifficulty.hard]: 1,
    }

    constructor(
        public readonly difficulty: StageDifficulty,
        private readonly config: StageConfig
    ) {
        this.type = config.type;
        this.title = StageType.format(this.type);
        this.subtitle = config.subtitle;
        this.startMoney = this.config.configPerDifficulty[difficulty].startMoney
        this.startLives = Stage.livesPerDifficulty[difficulty];

        this.map = new Image();
        this.map.src = config.asset.default;
    }

    getEnemies(): Enemy[] { // TODO instance property? TODO should return waves?
        const enemies: Enemy[] = [];
        const waves = this.config.configPerDifficulty[this.difficulty].waves;

        let delay = 0;
        waves.forEach((wave, index) => {
            delay += 3000; // TODO next wave in 5...4...

            wave.enemies.forEach(stageEnemyConfig => {
                const enemyType = stageEnemyConfig.type;
                const baseEnemyConfig = {...enemiesConfig[enemyType], ...stageEnemyConfig};
                const enemyConfig = increaseStatsForDifficulty(baseEnemyConfig, this.difficulty);
                delay += (stageEnemyConfig.delay === undefined ? 1000 : stageEnemyConfig.delay);
                enemies.push(new Enemy({
                    enemyType: enemyType,
                    position: this.entryPosition,
                    spawnDelay: delay,
                    maxLives: enemyConfig.lives,
                    speed: enemyConfig.speed,
                    scale: stageEnemyConfig.scale
                }));
            })
        })

        return enemies;
    }

}
