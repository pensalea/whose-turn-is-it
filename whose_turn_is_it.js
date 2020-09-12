// pre-defined list of players
var players = [
  "connell",
  "marianne"
];

// for determining next player
var currentPlayer = -1;
var numberOfPlayers = players.length;
var randomPlayerOrder = [];

// classes
var nextPlayerClass = "next-player";
var notPlayingClass = "not-playing";

/*
Using a pre-defined random order, choose and visibly mark the next player.
Skip any players who are no longer playing.
*/
function getNextPlayer() {
  $(".player").removeClass(nextPlayerClass);

  currentPlayer += 1;
  var index = randomPlayerOrder[currentPlayer % numberOfPlayers];

  while ($("#player" + index).hasClass(notPlayingClass)) {
    currentPlayer += 1;
    index = randomPlayerOrder[currentPlayer % numberOfPlayers];
  }

  $("#player" + index).addClass(nextPlayerClass);
}

function populatePlayersDiv() {
  for (var index in players) {
    $(".players").append("<p class='player' id='player" + index + "'>" + players[index] + '</p>');
  }
}

/*
Return an array of randomly ordered integers from 0 to numberOfPlayers-1.
Credit: http://stackoverflow.com/questions/962802#962890
*/
function shuffle(arrLength) {
  // create array 
  for (var array = [], i=0; i < arrLength; ++i) array[i] = i;

  // shuffle items
  var tmp, current, top = arrLength;
  if (top) while (--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }

  return array;
}

/* 
All jQuery methods should go inside here, 
as they must run after the document is finished loading.
*/
$(document).ready(function() {
  // inject player names into the document
  populatePlayersDiv();

  // get random order of players for use in choosing the next player
  randomPlayerOrder = shuffle(numberOfPlayers);

  // if a player is clicked, toggle the appearance of a strikethrough to indicate the player's status
  $(".player").click(function() {
    $(this).toggleClass(notPlayingClass);
  });
});