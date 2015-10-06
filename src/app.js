/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');

var topCounter = 0;
var bottomCounter = 0;

var topGames = 0;
var bottomGames = 0;

var main = new UI.Window();

var topRect = new UI.Rect({
	position: new Vector2(1, 1),
	size: new Vector2(140, 75),
	backgroundColor: 'white'
});

var topScoreText = new UI.Text({
  position: new Vector2(1, 10),
  size: new Vector2(140, 80),
  text: topCounter,
	color: 'black',
	font: 'ROBOTO_BOLD_SUBSET_49',
	textAlign: 'center'
});

var bottomRect = new UI.Rect({
	position: new Vector2(1, 85),
	size: new Vector2(140, 75),
	backgroundColor: 'black'
});	

var bottomScoreText = new UI.Text({
  position: new Vector2(1, 85),
  size: new Vector2(140, 80),
  text: bottomCounter,
	color: 'white',
	font: 'ROBOTO_BOLD_SUBSET_49',
	textAlign: 'center'
});

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

main.add(topRect);
main.add(topScoreText);
main.add(bottomRect);
main.add(bottomScoreText);

main.add(topGameOne);
main.add(topGameTwo);
main.add(bottomGameOne);
main.add(bottomGameTwo);

main.show();

main.on('click', 'up', function (event) {

	update('top');
	draw();
	
});

main.on('click', 'down', function (event) {

	update('bottom');
	draw();

});

var draw = function () {
	
	var topRect = new UI.Rect({
		position: new Vector2(1, 1),
		size: new Vector2(140, 80),
		backgroundColor: 'white'
	});

	var topScoreText = new UI.Text({
 		position: new Vector2(1, 10),
 	 	size: new Vector2(140, 80),
  	text: topCounter,
		color: 'black',
		font: 'ROBOTO_BOLD_SUBSET_49',
		textAlign: 'center'
	});

	var bottomRect = new UI.Rect({
		position: new Vector2(1, 85),
		size: new Vector2(140, 80),
		backgroundColor: 'black'
	});	

	var bottomScoreText = new UI.Text({
  	position: new Vector2(1, 85),
  	size: new Vector2(140, 80),
  	text: bottomCounter,
		color: 'white',
		font: 'ROBOTO_BOLD_SUBSET_49',
		textAlign: 'center'
	});

	main.add(topRect);
	main.add(topScoreText);
	main.add(bottomRect);
	main.add(bottomScoreText);
	
	main.show();
};

var update = function (side) {
	
	if (side === 'top') {
		topCounter = topCounter + 1;
	}
	else {
		bottomCounter = bottomCounter + 1;
	}
	
	if (topCounter > 25) {
		topCounter = 0;
		bottomCounter = 0;
		topGames = topGames + 1;
	}
	else if (bottomCounter > 25) {
		topCounter = 0;
		bottomCounter = 0;
		bottomGames = bottomGames + 1;
	}
};
