/* my solution + book solution */
const createChessboard = (size) => {
  let board = "";

  for (let line = 0; line < size; line++) {
    for (let cell = 0; cell < size; cell++) {
      (line + cell) % 2 === 0 ? (board += " ") : (board += "#");
    }

    board += "\n";
  }

  return board;
};

const board = createChessboard(8);

console.log(board);
