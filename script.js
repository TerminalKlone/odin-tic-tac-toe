let gameBoard = [0,0,0,0,0,0,0,0,0] // 3 x 3

// Create players

// GameLogic

function createGameBoard() {
  const board = document.createElement('div');
  const container = document.getElementById('container');
  board.style.width = "20em";
  board.style.height = "20em";
  board.className = "board"

  const gridAreas = [
    '1 2 3',
    '4 5 6',
    '7 8 9'
  ];
  
  for( let i = 1; i <= 9; i++ ) {
    let cell = document.createElement('div');
    cell.className = "cell-" + i;
    cell.id = "cell"
    cell.style.borderBottom = "1px solid black";
    cell.style.borderRight = "1px solid black";
    cell.innerText = i;
 
    cell.style.gridArea = gridAreas[Math.floor((i - 1) / 3)];

    board.appendChild(cell);

    cell.addEventListener('mousedown', () => {console.log(cell.className)})
  }

  container.appendChild(board);
}

createGameBoard();