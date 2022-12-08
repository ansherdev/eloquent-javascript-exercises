const rps = {
  rock: {
    name: "rock",
    wins: "scissors",
  },
  paper: {
    name: "paper",
    wins: "rock",
  },
  scissors: {
    name: "scissors",
    wins: "paper",
  },
};

const results = {
  win: "win",
  lose: "lose",
  draw: "draw",
};

class RockPaperScissors {
  start(playerChoiceA, playerChoiceB) {
    if (playerChoiceA.name === playerChoiceB.name) {
      return {
        playerA: results.draw,
        playerB: results.draw,
      };
    }

    return {
      playerA:
        playerChoiceA.wins === playerChoiceB.name ? results.win : results.lose,
      playerB:
        playerChoiceB.wins === playerChoiceA.name ? results.win : results.lose,
    };
  }
}

const rpsGame = new RockPaperScissors();

console.log("rpsGame", rpsGame.start(rps.paper, rps.scissors));
