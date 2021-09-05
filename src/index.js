module.exports = function solveSudoku(matrix) {
  
if (solved(matrix)) {  // if matrix does't have zero
  return matrix; 
} else {
  const possibilities = nextBoards (matrix);
  const validBoards = keepOnlyValid(possibilities);
  return searchForSolution (validBoards);
  } 



function searchForSolution (boards) {

if(boards.length < 1) {
  return false;
} else {
  var first = boards.shift();
  const tryPath = solveSudoku (first);
  if (tryPath != false) {
    return tryPath
  } else {
    return searchForSolution (boards)
    }
  }
}

function solved (matrix) { 
for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    if (matrix[i][j] == 0) {
      return false;
    }
  }
}
  return true;  // matrix does't have zero
}

function nextBoards(matrix) {
  var res = [];
  const firstEmpty = findEmptySquare(matrix); //<-- (y,x) in matrix equal zero
  if (firstEmpty != undefined) {
    const y = firstEmpty[0];
    const x = firstEmpty[1];
      for (var i = 1; i <=9; i++) {
        var newBoard = [...matrix]; // create matrix equal first matrix
        var row = [...newBoard[y]]; // create row equal row with empty square in first matrix
        row[x] = i; // empty square equal i
        newBoard[y] = row; // matrix row with various values of empty square
        res.push(newBoard) // 9 rows with all possible values of empty square
      }
  }
  return res; // 9 rows with all possible values of empty square
}


function findEmptySquare(matrix) {
  //matrix -> [Int, Int]
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (matrix[i][j] == 0) {
        return [i,j]
      }
    }
  }
}

function keepOnlyValid (boards) {

  return boards.filter (b => validBoard(b))
}

function validBoard (matrix) {
  return rowGood (matrix) && columnGood(matrix) && boxesGood(matrix);
}

function rowGood (matrix) {
  for (var i = 0; i < 9; i++) {
    var cur = [];
    for (var j = 0; j < 9; j++) {
      if (cur.includes (matrix[i][j])) {
        return false;
      } else if (matrix[i][j] != 0) {
        cur.push(matrix[i][j])
      }
    }
  }
  return true;
}


function columnGood (matrix) {
  for (var i = 0; i < 9; i++) {
    var cur = [];
    for (var j = 0; j < 9; j++) {
      if (cur.includes (matrix[j][i])) {
        return false;
      } else if (matrix[j][i] != 0) {
        cur.push(matrix[j][i])
      }
    }
  }
  return true;
}

function boxesGood (matrix) {

const boxCoordinates = [
  [0,0], [0,1], [0,2],
  [1,0], [1,1], [1,2],
  [2,0], [2,1], [2,2]
]

for (var y = 0; y < 9; y +=3) {
  for(var x = 0; x < 9; x+=3) {
    var cur = [];
    for (var i = 0; i < 9; i++) {
      var coordinates = [...boxCoordinates[i]];
      coordinates[0] += y;
      coordinates[1] += x;
      if (cur.includes(matrix[coordinates[0]][coordinates[1]])) {
        return false;
      } else if (matrix[coordinates[0]][coordinates[1]] != 0) {
        cur.push(matrix[coordinates[0]][coordinates[1]])
      }
    }
  }
}
return true;
}

}

