const squares = document.querySelectorAll('.square');
const statuse = document.querySelector('#statustext');
const refreshbutton = document.querySelector('#refresh');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", "" ];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    squares.forEach((square) => square.addEventListener("click", clickedonsquare));
    refreshbutton.addEventListener("click", refreshgame);
    statuse.textContent = `it is ${currentPlayer}'s turn`
    running = true;
}

function clickedonsquare(){
    const squareindex = this.getAttribute("squareindex");

    if (options[squareindex] != "" || !running) {
        return;
    }
    updatesquare(this, squareindex);
    checkwinner();
}

function updatesquare(square, index){
    options[index] = currentPlayer;
    square.textContent = currentPlayer;
}
function changeplayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statuse.textContent = `${currentPlayer}'s turn`
}

function checkwinner(){
    let roundwon = false;

    for( let i=0; i < winningCombinations.length; i++) {
        const condition = winningCombinations[i];
        const squareA = options[condition[0]];
        const squareB = options[condition[1]];
        const squareC = options[condition[2]];


        if (squareA == "" || squareB == "" || squareC == "") {
            continue;
        }
        if (squareA == squareB && squareB == squareC) {
            roundwon = true;
            break;
        }
    }

    if (roundwon) {
        statuse.textContent = `${currentPlayer} won the round `;
        running = false;
    }
    else if (!options.includes("")) {
        statuse.textContent = `The round ends in a Draw`;
        running = false;
    }
    else{
        changeplayer();
    }
}

function refreshgame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statuse.textContent = `${currentPlayer}'s turn`;
    squares.forEach(square => square.textContent = "");
    running = true;
}