const game = document.getElementById('game');
const btnReset = document.getElementById('btnReset');

let gamer = "X", moves = 0;
let table = [[null, null, null],
             [null, null, null], 
             [null, null, null]];

generateTheTable();

btnReset.addEventListener('click', resetGame);

game.addEventListener('click', (e) => {
    if (moves <= 9) {
      const tg = e.target;
      let line = parseInt(tg.getAttribute('line'));
      let column = parseInt(tg.getAttribute('column'));
      if (table[line][column]) {
        return;
      }
      table[line][column] = gamer;
      tg.innerHTML = gamer;
      moves++;
      if (gameOver(line, column, gamer)) {
          document.getElementById("theWinner").innerHTML = ("Player: " + gamer + " has won!");
          btnReset.disabled = false;
          moves = 10;
      } else if (moves === 9) {
          document.getElementById("theWinner").innerHTML = "Draw!";
          btnReset.disabled = false;
      } else {
          changeThePlayer();
      }
    }
});


function changeThePlayer() {
    if (gamer === "X") 
      gamer = "0";
    else
      gamer = "X";
    document.getElementById('gamer').textContent = gamer;
}

function resetGame() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            table[i][j] = null;
        }
    }
    Array.from(document.querySelectorAll('div[line]')).forEach(e => {
        e.textContent = null;
    });
    document.getElementById('gamer').textContent = gamer;
    document.getElementById('theWinner').innerHTML = "Let's see who win this game";
    btnReset.disabled = true;
    moves = 0;
}

function gameOver(line, column, gamer) {
    let counter = 0;
    for (let i = 0; i < 3; i++) {
        if (table[line][i] === gamer) { 
          counter++;
        }
    }
    if (counter === 3) { 
      return true;
    }
    counter = 0;
    for (let i = 0; i < 3; i++) { 
    if (table[i][column] === gamer) {
        counter++;
       }
    }
    if (counter === 3) {
        return true;
    }
    counter = 0;
    if (line === column) {
        for (let i = 0; i < 3; i++) {
            if (table[i][i] === gamer) {
                counter++;
            }
        }
    } else if (line + column === 2) {
        for (let i = 0; i < 3; i++) {
            if (table[i][3-i-1] === gamer) {
                counter++;
            }
        }
    }
    if (counter === 3) {
        return true;
    }
    return false;
}

function generateTheTable () {
    let line, column;
    for (let i = 0; i < 9; i++) {
        let e = document.createElement('div');
        line = Math.round((i + 2) / 3) - 1;
        column = Math.round (i % 3);
        e.setAttribute('line', line);
        e.setAttribute('column', column);
        game.appendChild(e);
    }
}
