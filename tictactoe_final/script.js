// 9 cells for the tic tac toe board
const board = ["", "", "", "", "", "", "", "", ""];

//Assign variables
let currentPlayer = "X";
let gameActive = true;
let player1Score = 0;
let player2Score = 0;
let tieScore = 0;

// Dom elements for the game board and status
const gameBoard = document.getElementById("game-board");
const statusText = document.getElementById("status");

// Score display
const player1ScoreEl = document.getElementById("player1-score");
const player2ScoreEl = document.getElementById("player2-score");
const tieScoreEl = document.getElementById("tie-score");

// Player Name input fields
const player1NameInput = document.getElementById("player1-name");
const player2NameInput = document.getElementById("player2-name");

// Player name labels are displayed
const player1Label = document.getElementById("player1-label");
const player2Label = document.getElementById("player2-label");

// Control buttons and winning line display
const restartButton = document.getElementById("restart");

// All of the winning combinations for tic tac toe
const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

// Loop through the board and create a clickable cell
board.forEach((_,index)=> {
    const cell=document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index=index;
    cell.addEventListener("click",handleCellClick);
    gameBoard.appendChild(cell);
});

 
player1NameInput.addEventListener("input",()=>{
  player1Label.textContent = player1NameInput.value || "Player 1";
});

player2NameInput.addEventListener("input", ()=> {
    player2Label.textContent = player2NameInput.value || "Player 2";
});

function handleCellClick(e){
    const index=e.target.dataset.index;
    
    if(board[index]!==""||!gameActive) return;

    board[index]=currentPlayer;
    e.target.textContent=currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());

    if(checkWinner(currentPlayer)){

        gameActive=false;

        let winnerName=currentPlayer==="X"
        ? player1Label.textContent : player2Label.textContent;

        statusText.textContent= `${winnerName} wins!`;

        if(currentPlayer==="X"){
            player1Score++;
            player1ScoreEl.textContent=player1Score;
            }
            else{
                player2Score++;
                player2ScoreEl.textContent=player2Score;
            }
    }

    else if(!board.includes("")){
        statusText.textContent="It's a tie!";
        gameActive=false;

        tieScore++;
        tieScoreEl.textContent=tieScore;
    }

    else{
        currentPlayer=currentPlayer==="X"?"O":"X";
        statusText.textContent=`${currentPlayer==="X"?player1Label.textContent:player2Label.textContent}'s turn`;

    }
}
// Checks winner
function checkWinner(player){

    for(let i=0;i<wins.length;i++){
        const[a,b,c]=wins[i];

        if(board[a]===player && board[b]===player && board[c]===player){
            return true;
        }
    }

    return false;
}

// Restarts game, keeps track of score
function restartGame(){

    for(let i=0;i<board.length;i++){
        board[i]="";
    }

    document.querySelectorAll(".cell").forEach(cell=> {
        cell.textContent="";
        cell.classList.remove("x","o");
    });

    currentPlayer="X";
    gameActive=true;

    statusText.textContent=`${player1Label.textContent}'s turn`;

}

restartButton.addEventListener("click", restartGame);
