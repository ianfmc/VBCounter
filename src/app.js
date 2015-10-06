/********************************
 * Pebble Volleyball Counter app
 * (c) 2015, Rewind Sports
 ********************************/

/**
 * Add required libraries
 */

var UI = require('ui');
var Vector2 = require('vector2');

/**
 * Constants
 */

var singleGameScore = 10;
var winsForMatch = 2;

var offsetTextY = 10;
var midlineY = 80;
var width = 140;

/**
 * State 
 */

var topCounter = 0;
var bottomCounter = 0;
var topGames = 0;
var bottomGames = 0;

var duringGame = true;

/**
 * UI Elements
 */

var topRect;
var topScoreText;
var bottomRect;
var bottomScoreText;

var main = new UI.Window();

/**
 * Layout UI elements
 */

var layoutElements = function () {
	topRect = new UI.Rect({
		position: new Vector2(1, 1),
		size: new Vector2(width, midlineY - 1),
		backgroundColor: 'white'
	});
	topScoreText = new UI.Text({
		position: new Vector2(1, offsetTextY),
		size: new Vector2(width, midlineY - 1),
		text: topCounter,
		color: 'black',
		font: 'ROBOTO_BOLD_SUBSET_49',
		textAlign: 'center'
	});
	bottomRect = new UI.Rect({
		position: new Vector2(1, midlineY),
		size: new Vector2(width, midlineY - 1),
		backgroundColor: 'black'
	});	
	bottomScoreText = new UI.Text({
		position: new Vector2(1, midlineY+offsetTextY),
		size: new Vector2(width, midlineY - 1),
		text: bottomCounter,
		color: 'white',
		font: 'ROBOTO_BOLD_SUBSET_49',
		textAlign: 'center'
	});
	main.add(topRect);
	main.add(topScoreText);
	main.add(bottomRect);
	main.add(bottomScoreText);
};

layoutElements();
main.show();

/**
 * Draw the Main Window
 */ 

var drawUI = function () {
	layoutElements();
	var topGameOne = new UI.Circle({
		position: new Vector2(120, 20),
		radius: 10,
		backgroundColor: 'black'
	});
	var topGameTwo = new UI.Circle({
		position: new Vector2(120, 50),
		radius: 10,
		backgroundColor: 'black'
	});
	var bottomGameOne = new UI.Circle({
		position: new Vector2(120, 105),
		radius: 10,
		backgroundColor: 'white'
	});
	var bottomGameTwo = new UI.Circle({
		position: new Vector2(120, 135),
		radius: 10,
		backgroundColor: 'white'
	});
	
	if (topGames === 1) {
		main.add(topGameOne);
	}	
	else if (topGames === 2) {
		main.add(topGameOne);
		main.add(topGameTwo);
	}	
	if (bottomGames === 1) {
		main.add(bottomGameOne);
	}
	else if (bottomGames === 2) {
		main.add(bottomGameOne);
		main.add(bottomGameTwo);
	}
	main.show();
};

/**
 * Update UI elements after UI action
 */

var update = function (side) {
	if (side === 'top') {
		topCounter = topCounter + 1;
	}
	else {
		bottomCounter = bottomCounter + 1;
	}
	
	if (topCounter > singleGameScore) {
		topCounter = 0;
		bottomCounter = 0;
		topGames = topGames + 1;
	}
	else if (bottomCounter > singleGameScore) {
		topCounter = 0;
		bottomCounter = 0;
		bottomGames = bottomGames + 1;
	}
	
	if ((topGames === winsForMatch) || (bottomGames === winsForMatch)) {
		duringGame = false;
		
		topCounter = topGames;
		bottomCounter = bottomGames;
	}
};

/**
 * End-of-game: set all scores to 0
 */

var reset = function () {
	topCounter = 0;
	bottomCounter = 0;
	topGames = 0;
	bottomGames = 0;
	
	duringGame = true;
};

/**
 * Set up UI actions
 */

main.on('click', 'up', function (event) {
	if (duringGame === true) {
		update('top');
		drawUI();			
	}
	else {
		return;
	}
});
main.on('click', 'down', function (event) {
	if (duringGame === true) {
		update('bottom');
		drawUI();			
	}
	else {
		return;
	}
});
main.on('click', 'select', function (event) {
	console.log('during game? ' + duringGame);
	if (duringGame === true) {
		return;
	}
	else {
		console.log('about to reset');
		reset();
		drawUI();
	}
});