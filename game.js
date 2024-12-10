// the boxes for the game-board
const boxes = [0,0,0,0,0,0,0,0,0,0];

const dice1 = document.querySelector(".diceImg1");
const dice2 = document.querySelector(".diceImg2");
const startBtn = document.querySelector('.startBtn');
const rollBtn = document.querySelector('.rollBtn');
const individualBtn = document.querySelector('.individualBtn');
const endBtn = document.querySelector('.endBtn');
const sumBtn = document.querySelector('.sumBtn');
const playAgainBtn = document.querySelector(".playAgainBtn");

rollBtn.disabled = true;
individualBtn.disabled = true;
endBtn.disabled = true;
sumBtn.disabled = true;

let playerTurn = 1;
let roundNumber = 1;
let dice1Value;
let dice2Value;
let player1TotalPoints = 0;
let player2TotalPoints = 0;
let player1Name = '';
let player2Name = '';


startBtn.addEventListener("click",function(){
    const playerName = playerNameInput.value.trim();
    const opponentName = opponentNameInput.value.trim();
    player1Name = playerName;
    player2Name = opponentName;
    const roundPara = document.querySelector(".currentRound");
    const turnPara = document.querySelector(".currentTurn");
    const board = document.querySelector(".board");
    const players = document.querySelector(".players");
    const dice = document.querySelector(".dice");
    const scorecard = document.querySelector(".scorecard");
    const playerScorecard = document.querySelector("#p1name");
    const opponentScorecard = document.querySelector("#p2name");
    if(playerName != '' && opponentName != ''){
        roundPara.innerHTML = 'Round 1';
        turnPara.innerHTML = `It is ${playerName}'s turn.`;
        startBtn.disabled = true;
        rollBtn.disabled = false;
        board.style.display = 'block';
        players.style.display = "none";
        dice.style.display = 'block';
        scorecard.style.display = 'block';
        playerScorecard.innerHTML = `${playerName}`;
        opponentScorecard.innerHTML = `${opponentName}`;
    }else{
        alert("Names not entered");
    }

});



rollBtn.addEventListener("click",function(){
    const rand1 = Math.floor(Math.random() * 6) + 1;
    const rand2 = Math.floor(Math.random() * 6) + 1;
    rollBtn.disabled = true;
    dice1.innerHTML = `<i class="bi bi-dice-${rand1}"></i>`;
    dice2.innerHTML = `<i class="bi bi-dice-${rand2}"></i>`;
    individualBtn.disabled = false;
    sumBtn.disabled = false;
    dice1Value = rand1;
    dice2Value = rand2;
    document.querySelector(".sumOfDice").textContent = "Sum: " + (rand1 + rand2);
    if(rand1 === rand2 || boxes[rand1] === "X" || boxes[rand2] === "X"){
        individualBtn.disabled = true;
    }
    if(rand1 + rand2 > 9 || boxes[rand1 + rand2] === "X"){
        sumBtn.disabled = true;
    }
    if(individualBtn.disabled === true && sumBtn.disabled === true){
        endBtn.disabled = false;
    }
});

individualBtn.addEventListener("click",function(){
    shut(dice1Value);
    shut(dice2Value);
    boxes[dice1Value] = "X";
    boxes[dice2Value] = "X";
    boxes[0] = boxes[0] + dice1Value + dice2Value;
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
});

sumBtn.addEventListener("click",function(){
    shut(dice1Value + dice2Value);
    boxes[dice1Value + dice2Value] = "X";
    boxes[0] = boxes[0] + dice1Value + dice2Value;
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
});

endBtn.addEventListener("click",function(){
    const roundPara = document.querySelector(".currentRound");
    const turnPara = document.querySelector(".currentTurn");
    if(playerTurn === 1){
        const turnPoints1 = 45 - boxes[0];
        player1TotalPoints = turnPoints1 + player1TotalPoints;
        const tBody = document.querySelector("#tbody");
        const newRow = buildRow(roundNumber, turnPoints1);
        tBody.insertAdjacentElement('beforeend', newRow);
        playerTurn = 2;
        turnPara.innerHTML = "It is " + player2Name + "'s turn.";
    } else if(playerTurn === 2){
        const turnPoints2 = 45 - boxes[0];
        player2TotalPoints = turnPoints2 + player2TotalPoints;
        const p2Scorecard = document.querySelector("#round" + roundNumber + " .p2Pts");
        p2Scorecard.textContent = turnPoints2;
        playerTurn = 1;
        roundNumber = roundNumber + 1;
        turnPara.textContent = "It is " + player1Name + "'s turn.";
        roundPara.textContent = 'Round ' + roundNumber;
    }
    resetBoard();
    endBtn.disabled = true;
    rollBtn.disabled = false;
    if(roundNumber > 5){
        gameOver();
    }
});

playAgainBtn.addEventListener("click", function(){
    const players = document.querySelector(".players");
    const winner = document.querySelector(".winner");
    const scorecard = document.querySelector(".scorecard");
    const table = document.querySelector(".table");
    boxes.fill(0);
    player1TotalPoints = 0;
    player2TotalPoints = 0;
    player1Name = '';
    player2Name = '';
    playerTurn = 1;
    roundNumber = 1;
    rollBtn.disabled = true;
    individualBtn.disabled = true;
    endBtn.disabled = true;
    sumBtn.disabled = true;
    players.style.display = "block";
    winner.style.display = "none";
    scorecard.style.display = "none";
    table.innerHTML = "<thead> <tr> <th></th> <th id = 'p1name'>Player1</th> <th id = 'p2name'>Player2</th>      </tr>  </thead> <tbody id = 'tbody'>     <!-- This will be our scorecard --> </tbody>"
    const roundPara = document.querySelector(".currentRound");
    roundPara.innerHTML = 'Round 1';
    startBtn.disabled = false;
    document.querySelector("#playerNameInput").value = '';
    document.querySelector("#opponentNameInput").value = '';
});


function shut(boxNumber){
    const specialBox = document.querySelector(`#box${boxNumber}`);
    const specialBoxPara = document.querySelector(`#box${boxNumber} p`);
    specialBox.classList.add('shut');
    specialBoxPara.textContent = "X";
}

function buildRow(X, points){
    const tr = document.createElement('tr');
    tr.id = 'round' + X;
    const th = document.createElement('th');
    th.textContent = 'Round ' + X;
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    td1.classList.add('p1Pts');
    td1.textContent = points;
    td2.classList.add('p2Pts');
    tr.insertAdjacentElement("beforeend", th);
    tr.insertAdjacentElement("beforeend", td1);
    tr.insertAdjacentElement("beforeend", td2);
    return tr;
}

function resetBoard(){
    boxes.fill(0);
    const cards = document.querySelectorAll(".box");
    for(let i=0; i < cards.length; i++){
        cards[i].classList.remove('shut');
        const pElement = cards[i].querySelector('p');
        pElement.textContent = i + 1;
    }
}

function gameOver(){
    const board = document.querySelector(".board");
    const dice = document.querySelector(".dice");
    const winner = document.querySelector('.winner');
    board.style.display = 'none';
    dice.style.display = 'none';
    winner.style.display = 'block';
    const winnerText = document.querySelector(".winnerText");
    if(player1TotalPoints > player2TotalPoints){
        winnerText.textContent = player2Name + " has won the game with the score of " + player2TotalPoints + ", besting " + player1Name + " with a score of " + player1TotalPoints;
    } else if(player2TotalPoints > player1TotalPoints){
        winnerText.textContent = player1Name + " has won the game with the score of " + player1TotalPoints + ", besting " + player2Name + " with a score of " + player2TotalPoints;
    } else if(player1TotalPoints === player2TotalPoints){
        winnerText.textContent = "The game has ended in a tie!";
    }
}
