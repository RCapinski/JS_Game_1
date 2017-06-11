var newGameBtn = document.getElementById('js-newGameBtn'),
	 newGameElem = document.getElementById('js-newGameElem'),
	 pickElem = document.getElementById('js-playerPickElement'),
	 resultsElem = document.getElementById('js-resultsTableElement');
	 
var pickRock = document.getElementById('js-playerPick_rock'),
	 pickPaper = document.getElementById('js-playerPick_paper'),
	 pickScissors = document.getElementById('js-playerPick_scissors'),
	 pickLizard = document.getElementById('js-playerPick_lizard'),
	 pickSpock = document.getElementById('js-playerPick_spock'),
	 gameState = 'notStarted';  //started */ 'ended';
var player = {
        name: '',
        score: 0
    };
var computer = {
        score: 0
    };

var playerPointsElem = document.getElementById('js-playerPoints'),
     playerNameElem = document.getElementById('js-playerName'),
     computerPointsElem = document.getElementById('js-computerPoints');	

var playerPickElem = document.getElementById('js-playerPick'),
     computerPickElem = document.getElementById('js-computerPick'),
     playerResultElem = document.getElementById('js-playerResult'),
     computerResultElem = document.getElementById('js-computerResult');

setGameElements();
	 
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });
pickLizard.addEventListener('click', function() { playerPick('lizard') });
pickSpock.addEventListener('click', function() { playerPick('Spock') });

newGameBtn.addEventListener('click', newGame);

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}

function newGame() {
  player.name = prompt('Please enter your name', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
	playerNameElem.innerText = player.name;
	setGameElements();
	setGamePoints(); 
  }

}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors', 'lizard', 'Spock'];
    return possiblePicks[Math.floor(Math.random()*5)];
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick === computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick === 'rock' &&  playerPick === 'scissors') ||
        (computerPick === 'scissors' &&  playerPick === 'paper') ||
        (computerPick === 'paper' &&  playerPick === 'rock') ||
		(computerPick === 'rock' &&  playerPick === 'lizard') ||
		(computerPick === 'lizard' &&  playerPick === 'Spock') ||
		(computerPick === 'Spock' &&  playerPick === 'scissors') ||
		(computerPick === 'scissors' &&  playerPick === 'lizard') ||
		(computerPick === 'lizard' &&  playerPick === 'paper') ||
		(computerPick === 'paper' &&  playerPick === 'Spock') ||
		(computerPick === 'Spock' &&  playerPick === 'rock'))
		{        
        winnerIs = 'computer';
    }

    if (winnerIs === 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
		if (player.score === 10) {
			alert( player.name + ' wins!');
			gameState = 'ended';
			setGameElements();
		}
    } else if (winnerIs === 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
		if (computer.score === 10) {
			alert('Computer wins!');
			gameState = 'ended';
			setGameElements();
	}
    }

}


function playerPick(playerPick) {
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
	checkRoundWinner(playerPick, computerPick);
	setGamePoints();
}
