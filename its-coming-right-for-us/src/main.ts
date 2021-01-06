require("./style.css");

import {Game} from "./game/game";

new Game().start().catch(console.error);
