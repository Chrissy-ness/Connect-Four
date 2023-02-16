//basic variables
const width = 7;
const height = 6;
let currPlayer = 1;  
const board = [];
const htmlBoard = document.getElementById("board");

//The array constant board and the constant htmlBoard are different values.
//The htmlBoard will be responsible for the overall look of the game, and basic click input. 
//The 'board' array will act as a duplicate of the board and function as storage for values. 

//Functions will then LISTEN FOR CLICKS on the htmlBoard ---> 
//Grab the matching column/vertical/height --->
//Return the last cell of the column and read the values --->
//Check whether the cell value is either null/player1/player2 -->
//Place a div of player1/player2 if null --->
//If !null, move up the cell once, and check the value --->
//If cells are full, ignore click event ---> 

//Functions will then check for win condition --->
//Check if column/row/diagonal has 4 identical values --->
//if yes, print 'player1/player2 wins' --->
//if all cells are full AND no 4 identical divs align, print 'tie' --->

//Make the javaScript board array to hold the values, and set their initial value to null.
function makeBoard() {
    for(let h = 0; h < height; h++) {
        let tempArr = [];

        for(let w = 0; w < width; w++) {
            tempArr[w] = null;
        }
        board[h] = tempArr; 
    }

}

//Build the htmlBoard with a 'top' row responsive to clicks, and the additional 6x7 cells. 
function makeHtmlBoard() {
    const top = document.createElement('tr');
    top.addEventListener('click', handleClick);
    top.setAttribute('id', 'column-top');

    for(let w = 0; w < width; w++) {
        const headCell = document.createElement('td');
        headCell.setAttribute('id', w);
        top.append(headCell);
    }
    htmlBoard.append(top);

    
    for(let h = 0; h < height; h++) { 
        const row = document.createElement('tr');

        for(let w = 0; w < width; w++) {
            const cell = document.createElement('td');
            cell.setAttribute('id', `${h}-${w}`); 
            row.append(cell); 
        }
        htmlBoard.append(row);
    }
    
} 

//This function needs to return all column related cells from highest to lowers, vertical wise. 
//It will check the index of board[h][w] to see if the item is null. 
function findSpotForCol(w) {
    for (let h = height - 1; h >= 0; h--) {
      if (!board[h][w]) {
        return h;
      }
    }
    return null;
  }

//This function will place a div on the chosen cell based on the index inputs.
//Use a constant to accurately target the cell of choice, given the w(width), and h(height) inputs are present. 
function placeInTable(h, w) {
    let colorDiv = document.createElement('div');
    colorDiv.classList.add('piece');
    colorDiv.classList.add(`player${currPlayer}`);
    let targetCell = document.getElementById(`${h}-${w}`);
    targetCell.append(colorDiv);
}

//Print out end game results
function endGame() {
    alert(`Player${currPlayer} Wins!`);
}
function itsATie() {
    alert('It\'s a tie!');
}




//This function needs to do these things:
//Grab the id of the clicked headCell, which will serve as a position indicator for which column number is read.
//This indicator will from left to right, whose numbers will range from 0-6/7items.
function handleClick(e) {
    const targetId = e.target.id;

    const h = findSpotForCol(targetId);
    if(h == null) {
        return;
    }
    placeInTable(h, targetId);
    board[h][targetId] = currPlayer;
    
    if(checkForWin()) {
        return endGame();
    }

    if(board.every(row => row.every(cell => cell))) {
        return itsATie();
    }

    if(currPlayer === 1) {
        currPlayer = 2;
    }
    else if(currPlayer ===2) {
        currPlayer = 1
    }
}

function checkForWin() {
    function win(cells) {
        return cells.every(
            ([h, w]) => 
            h >= 0 &&
            h < height &&
            w >= 0 &&
            w < width &&
            board[h][w] === currPlayer
        );
    }

    for(let h = 0; h < height; h++) {
        for(let w = 0; w < width; w++) {
            const horiz = [[h, w],[h, w+1],[h, w+2],[h, w+3]];
            const vert = [[h, w],[h+1, w],[h+2, w],[h+3, w]];
            const diagDR = [[h, w],[h+1, w+1],[h+2, w+2],[h+3, w+3]];
            const diagDL = [[h, w],[h+1, w-1],[h+2, w-2],[h+3, w-3]];

            if(win(horiz) || win(vert) || win(diagDR) || win(diagDL)) {
                return true;
            }
        }
    }
}


makeBoard();
makeHtmlBoard();
