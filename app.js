//constantes////
/*primero setiamos lo mas basico para que funcione el juego*/
const gameInfo = document.querySelector(".game-notification"); //
const gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top left to bottom right
  [2, 4, 6], // diagonal top right to bottom left
];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

///variables////////////
let gameActive = true;
let currentPlayer = "X";

//functions////////////
function main() {
  listener();
  handleGameInfo(currentPlayerTurn());
}
main();

function handleGameInfo(message) {
  gameInfo.innerHTML = message;
}

function listener() {
  document
    .querySelector(".game-board")
    .addEventListener("click", handdleCellClick);
  document
    .querySelector(".restart-button")
    .addEventListener("click", handleRestartGame);
}

function handdleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  if (clickedCell.classList.contains("cell") && gameActive) {
    //obtener el index de la celda clickeada despues de convertir el array de los nodos hijos en un array
    const clickedCellIndex = Array.from(
      clickedCell.parentNode.children
    ).indexOf(clickedCell);
    console.log(clickedCellIndex);
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
  }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer; //guarda el signo del jugador en la celda clickeada
  handleResultValidation();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue; //corrobora que no haya celdas vacias
    }
    if (a === b && b === c) {
      roundWon = true; //si hacen tres en fila gana
      break;
    }
  }
  if (roundWon) {
    handleGameEnd(winningMessage());
    return;
  }
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    handleGameEnd(drawMessage());
    return;
  }
  handlePlayerChange();
}

function handleGameEnd(message) {
  gameActive = false;
  handleGameInfo(message);
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  //operador ternario, cambia el jugador
  handleGameInfo(currentPlayerTurn());
}

function handleRestartGame() {//reinicia el juego
  gameActive = true;
  currentPlayer = "X";
  gameState.fill("");//vacia el array gameState
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));//vacia las celdas
  handleGameInfo(currentPlayerTurn());
}
