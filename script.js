const maze = [
  [1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1],
];

// // Si inicias en [0, 0], el camino más largo es 11
// console.log(findLongestPath(maze, 0, 0)); // Salida: 11
// Hacer la función findLongestPath

function findLongestPath(maze, a, b) {
  let actualPosition = maze[a][b];
  let actualRow = a;
  let actualColumn = b;

  let positionAlreadyTaken = [];

  function validatePosition(posRow, posCol) {
    if (posRow < 0 || posCol < 0) {
      return false;
    }

    if (
      maze[posRow][posCol] === 1 &&
      !positionAlreadyTaken.some(
        (pos) => pos[0] === posRow && pos[1] === posCol,
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  function lookForPosibleNextPositions(posRow, posCol) {
    let posibleNextPositions = [];

    if (validatePosition(posRow - 1, posCol)) {
      posibleNextPositions.push([posRow - 1, posCol]);
    }
    if (validatePosition(posRow, posCol + 1)) {
      posibleNextPositions.push([posRow, posCol + 1]);
    }
    if (validatePosition(posRow + 1, posCol + 1)) {
      posibleNextPositions.push([posRow + 1, posCol + 1]);
    }
    if (validatePosition(posRow, posCol - 1)) {
      posibleNextPositions.push([posRow, posCol - 1]);
    }

    return posibleNextPositions;
  }

  if (!validatePosition(actualRow, actualColumn)) {
    return 0;
  }

  positionAlreadyTaken.push([actualRow, actualColumn]);

  let nextPositions = lookForPosibleNextPositions(actualRow, actualColumn);

  let safety = 0;

  while (nextPositions.length !== 0) {
    positionAlreadyTaken.push([actualRow, actualColumn]);

    [actualRow, actualColumn] = nextPositions[0];

    nextPositions = lookForPosibleNextPositions(actualRow, actualColumn);

    safety++;

    if (safety > 20) {
      break;
    }
  }

  return positionAlreadyTaken.length;
}

console.log(`Camino más largo: ${findLongestPath(maze, 0, 0)}`);
