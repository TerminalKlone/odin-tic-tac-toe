function Gameboard() {
  let gameboard = ["","","","","","","","",""];
  
  const getGameboard = () => { return gameboard }
  const printGameboard = () => { console.log(gameboard) }
  const setGameboard = (index, val) => { gameboard[index] = val; }
  const resetGameboard = () => { gameboard = ["","","","","","","","",""]; }

  return {getGameboard, setGameboard, resetGameboard, printGameboard}
}

function player(players, name, player, symbol, turn) {
  const newPlayer = {name, player, symbol, turn};
  players.push(newPlayer)

  return newPlayer;
}

function createGameBoard(players, gameboard) {
  gameboard.resetGameboard();
  const board = document.createElement('div');
  const gameContainer = document.getElementById('container');
  gameContainer.className = "gameContainer";
  
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
    cell.className = "cell";
    cell.id = i;
    cell.style.borderBottom = "3px solid black";
    cell.style.borderRight = "3px solid black";
    // cell.innerText = i;
 
    cell.style.gridArea = gridAreas[Math.floor((i - 1) / 3)];

    board.appendChild(cell);

    // Add event listener to each cell
    cell.addEventListener('mousedown', () => { handleCellClick(cell, players, gameboard); });
  }

  container.appendChild(board);
};

function startGame(){
  const playerOneName = document.getElementById('playerOneName');
  const playerTwoName = document.getElementById('playerTwoName');

  // check for null
  if ( playerOneName.value === "" || playerTwoName.value === "" ) {
    alert("Player names are empty")
  } else {
    const players = [];
    const playerOne = player(players, playerOneName.value, "playerOne", "O", true);
    const playerTwo = player(players, playerTwoName.value, "playerTwo", "X", false);
    const gameboard = Gameboard();

    removePlayerInput();
    createGameBoard(players, gameboard);
    displayInfo(players);
  }
};

function handleCellClick(cell, players, gameboard) {
  const currentPlayer = players.find(player => player.turn);
  const index = cell.id-1;
  const currentCells = gameboard.getGameboard();
  if(currentCells[index] === "" ) {
    cell.innerText = currentPlayer.symbol;

    gameboard.setGameboard(index, currentPlayer.symbol);
    gameLogic(players, gameboard, cell);
    swapPlayer(players);
    changeDisplayInfo(players);
    
  } else {
    console.log("You can't place a symbol there!")
  }
}

function gameLogic(players, gameboard) {
  const currentPlayer = players.find(player => player.turn);
  const currentSymbol = currentPlayer.symbol;
  const currentCells = gameboard.getGameboard();

  const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8],  // Rows
    [0,3,6],[1,4,7],[2,5,8],    // Columns
    [0,4,8], [2,4,6]            // Diagonals
  ]

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (currentCells[a] === currentSymbol && currentCells[b] === currentSymbol && currentCells[c] === currentSymbol) {
      console.log(currentPlayer.name + " wins!");
      showWinner(currentPlayer.name, players, gameboard);
    }
  }
}

function showWinner(winner, players, gameboard) {
  const dialog = document.getElementById('dialog');
  const winnerText = document.getElementById('winner')
  dialog.showModal();
  winnerText.innerText = winner + " is the winner"

  const newGameButton = document.getElementById('new-game-button');
  newGameButton.addEventListener("mousedown", () => { newGame(players, gameboard) });
}

function swapPlayer(players) {
  const playerOne = players[0];
  const playerTwo = players[1];
  if( playerOne.turn === true ) {
    playerOne.turn = false;
    playerTwo.turn = true;
    // changeDisplayInfo(players) 
  } else {
    playerTwo.turn = false;
    playerOne.turn = true;
    // changeDisplayInfo(players) 
  }
}

function newGame(players, gameboard) {
  const dialog = document.getElementById('dialog');
  dialog.close();
  document.querySelectorAll('.cell').forEach(e => e.innerText = "");
  gameboard.resetGameboard();

}

function displayInfo(players) {
  const textOutput = document.getElementById('text-output');
  let playerNameOutput = document.createElement('h2');
  playerNameOutput.id = 'playerNameOutput';
  const currentPlayer = players.find(player => player.turn);
  playerNameOutput.innerText = currentPlayer.name + "'s Turn (" + currentPlayer.symbol + ")";
  textOutput.appendChild(playerNameOutput);
}

function changeDisplayInfo(players) {
  const playerNameOutput = document.getElementById('playerNameOutput');
  const currentPlayer = players.find(player => player.turn);
  playerNameOutput.innerText = currentPlayer.name + "'s Turn (" + currentPlayer.symbol + ")";
}

function removePlayerInput() {
  document.querySelectorAll('.player-div').forEach(e => e.remove());
  document.querySelectorAll('.start-div').forEach(e => e.remove());
};