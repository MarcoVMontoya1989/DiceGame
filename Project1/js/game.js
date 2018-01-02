/*
*
* game rules
*
* - The game has 2 players, playing in rounds
* - in each turn, a player rolls a dice as many times as he wishes, each result get added to his round score
* - BUT, if the player rolls a 1, all his round score get lost, After that, it's the next player's turn
* - The player can choose to 'Hold', which means that his Round score gets added to his global score. After that, it's the next player's turn.
* - The first player to reach 100 points on Global score wins the game
* */


var scores, roundScore, activePlayer, dice;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    // Random Number
    dice = Math.floor(Math.random() * 6) + 1;

    // display the result on the screen
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'img/dice-' + dice + '.png';

    // update the round score IF the rolled number wasn't a 1
    if (dice !== 1) {
        // add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else {
        nextPlayer(); //change the player turn.
    }

});


// hold the count in the specfic player
document.querySelector('.btn-hold').addEventListener('click', function () {
    // add the current score to GLOBAL score
    scores[activePlayer] += roundScore;

    // update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // check if the player won the game if one of the players reached 100 points.
    // nextPlayer(); // change the player turn
    if (scores[activePlayer] >= 20 ) {
        // window.alert( activePlayer + ' You won the game !');
        document.querySelector('#name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
    }
    else {
        nextPlayer();
    }
});


// new game
document.querySelector('.btn-new').addEventListener('click', init);


// -------------------------------------- FUNCTIONS ----------------------------------


// Change the player turn.
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

// new game

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    // es para solo mostrar en texto raw
    document.querySelector('#current-' + activePlayer).textContent = dice;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.dice').style.display = 'none';

    // eso sirve para modificar en formato html para poner en modo italic
    // document.querySelector('#score-' + activePlayer).innerHTML = '<em>'+ dice +'</em>';

    // var x = document.querySelector('#score-' + activePlayer).textContent = dice;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}