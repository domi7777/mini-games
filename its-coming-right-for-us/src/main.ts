import {gameConfig} from "./game/config/game-config";

require("./style.css");

import {Game} from "./game/game";

new Game(gameConfig).start().catch(console.error);
