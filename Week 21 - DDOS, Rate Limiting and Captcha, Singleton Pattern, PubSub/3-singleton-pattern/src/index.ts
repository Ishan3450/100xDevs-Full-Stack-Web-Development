import { GameManager } from "./GameManager";
import { startLogger } from "./logger";

startLogger();

setInterval(() => {
  GameManager.getInstance().addGame({
    id: Math.random().toString(),
    whitePlayer: "ishan",
    blackPlayer: "kishan",
    moves: [],
  });
}, 5000);
