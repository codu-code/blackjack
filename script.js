// script.js

import { startNewGame, hit, stand } from "./game.js";

document
  .getElementById("new-game-button")
  .addEventListener("click", startNewGame);
document.getElementById("hit-button").addEventListener("click", hit);
document.getElementById("stand-button").addEventListener("click", stand);

startNewGame();
