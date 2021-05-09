import { gameConfig } from './game/game-config';

require('./style.css');

import { Game } from './game/game';


const titleScreen = document.getElementById('title-screen') as HTMLElement;
titleScreen.addEventListener('click', startGame);

function startGame() {
    titleScreen.removeEventListener('click', startGame);
    titleScreen.style.display = 'none';
    new Game(gameConfig).start().catch(console.error);
}