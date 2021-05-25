// every time I click on the button
// the div below displays or hides

// 1. select the button
const btn = document.getElementById('show-hint');
// add Event Listener (click)
// btn.addEventListener('event', () => {})

// in the callback
const toggleHint = (event) => {
  // console.log(event);
  // console.log(event.currentTarget === btn);
  // select the hint
  const hint = document.querySelector('div.hint');
  // class of the hint becomes active

  hint.classList.toggle('active');
};

btn.addEventListener('click', toggleHint);

/// ///////////
// THE GAME //
/// ///////////

// FUNCTIONS //
const cellsAreAdjacent = (whiteCell, blackCell) => {
  // find the column of the white cell
  const whiteCellCol = whiteCell.cellIndex;
  // find the row of the white cell
  const whiteCellRow = whiteCell.parentElement.rowIndex;

  // find the column of the black cell
  const blackCellCol = blackCell.cellIndex;
  // find the row of the black cell
  const blackCellRow = blackCell.parentElement.rowIndex;

  const colsAreEqual = whiteCellCol === blackCellCol;
  const rowsAreEqual = whiteCellRow === blackCellRow;

  const rowDifference = Math.abs(whiteCellRow - blackCellRow);
  const colDifference = Math.abs(whiteCellCol - blackCellCol);

  // HOMEWORK: refactor this
  // if the columns are the same, the row diff must be 1
  if (colsAreEqual && rowDifference === 1) {
    return true;
  // if the rows are the same, the col diff must be 1
  } if (rowsAreEqual && colDifference === 1) {
    return true;
  // else, return false
  }
  return false;
};

const moveCell = (whiteCell, blackCell) => {
  blackCell.classList.remove('empty');
  whiteCell.classList.add('empty');
  blackCell.innerText = whiteCell.innerText;
  whiteCell.innerText = '';
};

const numbersAreAligned = () => {
  // start with empty result variable
  let result = '';
  // find all tds
  const tds = document.querySelectorAll('td');
  // for each td, extract the inner text and add it to result
  tds.forEach((td) => {
    result += td.innerText;
  });
  // compare the result with the endGame combination
  const endGameCombination = '123456789101112131415';
  return result === endGameCombination;
};

const endTheGame = () => {
  document.body.innerHTML = '<h1>YOU WIN! CONGRATS! 🚀</h1>';
  // reset the game after 2 seconds
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

const runGame = (event) => {
  // console.log(event);
  // console.log(event.currentTarget);
  const whiteCell = event.currentTarget;
  const blackCell = document.querySelector('td.empty');
  if (cellsAreAdjacent(whiteCell, blackCell)) {
    console.log('they are adjacent');
    // we move the cell to the empty space
    moveCell(whiteCell, blackCell);
    // // if the numbers are aligned, end game
    if (numbersAreAligned()) {
      endTheGame();
    }
  } else {
    console.log('they are not adjacent');
  }
};

// select all tds
const tds = document.querySelectorAll('td');
tds.forEach((td) => {
  // add an event listener (click) to all tds
  td.addEventListener('click', runGame);
});
























































































// The code below shuffles the game.

// ///////////////////
// FORBIDDEN FOREST //
// ///////////////////

// It's not safe to go outside! Take this sword:
//               O
//               {____________________________________
// @XXXXXXXXXXXXXX___________________________________.>
//               {
//               O

// Ok. now you're ready to check the functions below:

const shuffleArray = (array) => {
  const resultArray = [...array];
  for (let i = resultArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
  }
  return resultArray;
}

const shuffleGame = (tiles) => {
  document.querySelector('td.empty').classList.remove('empty');
  const numbersArray = [...tiles].map(tile => tile.innerText);
  const shuffledNumbers = shuffleArray(numbersArray);
  tiles.forEach((tile, index) => {
    tile.innerText = shuffledNumbers[index];
    if (!tile.innerText) tile.classList.add('empty');
  });
}

shuffleGame(tds);