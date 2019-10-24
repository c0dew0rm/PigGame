/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activcePlayer;
init();

document.querySelector('.btn-roll').addEventListener('click', function(){

    // we need a random number.
    var dice = Math.floor(Math.random()*6)+1;
    // now we need to display the dice again, undo line 24
    document.querySelector('.dice').style.display = 'block';

    // we display the dice result.
    diceImgSrc = document.querySelector("img.dice");
    diceImgSrc.src = "images/dice-" +dice+ '.png';

    // update the round score if rolled number was not 1.
    if (dice !== 1){
        roundScore += dice;
        document.getElementById('current-'+activePlayer).textContent = roundScore;
    }
    else{
        // toggel the player and set roundScore value of current player to 0
        roundScore = 0;
        document.getElementById('current-'+activePlayer).textContent = roundScore;
        nextPlayer();
    }
});


document.querySelector('.btn-hold').addEventListener('click', function(){
    // update the global score on button hold
    scores[activePlayer] += roundScore;
    roundScore = 0;
    document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
    document.getElementById('current-'+activePlayer).textContent = roundScore;

    if (scores[activePlayer] < 20){
        // toggle after hold
        nextPlayer();
    }
    else{
        // active player wins
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.btn-hold').disabled = true;
        document.querySelector('.btn-roll').disabled = true;
    }
});


document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.btn-hold').disabled = false;
    document.querySelector('.btn-roll').disabled = false;
    document.querySelector(".dice").style.display = "none";
    document.getElementById('score-0').textContent = "0";
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
}