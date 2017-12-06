//  Global variables
var guessesRemaining = 8;
var rightLetters = [];
var wrongLetters = [];
var wordDisplay = [];
var numWins = 0;

// Required files
var inquirer = require("inquirer");
var chalk = require('chalk');
var word = require("./word.js");
var letter = require("./letter.js");

// Create new instance of a hangman word and letters
var currentWord = new word; 
var currentLetters = new letter(currentWord);


// Initial welcome message
console.log(chalk.bgBlueBright.black.bold("\n\n  WELCOME TO STAR WARS HANGMAN!  \n"));
console.log(chalk.yellow("  Each word or phrase will be from one of the Star Wars movies.\n"));
console.log(chalk.yellow("  If you make 8 wrong guesses that game is over.\n"))
console.log(chalk.yellow("  Good Luck! And remember, do or do not, there is no try.\n"));

// Function that plays game
function playGame() {
	inquirer.prompt([
		{
	        name: "guess",
	        message: "Please enter a letter guess to play: ",
	        validate: function(value) {
	          if (value.length === 1 && value.match(/[a-z]/i)) {
	            return true;
	          }
	          return false;
	        }
	    }
	        ]).then(answers => {
	    checkAnswer(answers.guess);
	});
}

// Initial call of the function to start the game
playGame();

// Check answer to see if it is a repeat and if it's correct
function checkAnswer(answer) {

	var rightLettersLower = rightLetters.map(v => v.toLowerCase());
	var wrongLettersLower = wrongLetters.map(v => v.toLowerCase());

	if(rightLettersLower.indexOf(answer.toLowerCase()) > -1 || wrongLettersLower.indexOf(answer.toLowerCase()) > -1){

		console.log(chalk.red("\nSorry, you already picked that letter, please choose another...\n"));
		playGame();
	}

	if(rightLettersLower.indexOf(answer.toLowerCase()) === -1 && wrongLettersLower.indexOf(answer.toLowerCase()) === -1){


		if(currentLetters.splitLower().indexOf(answer.toLowerCase()) > -1) {

		  	rightLetters.push(answer);

		  	letterSwap();

			var wordDisplayLower = wordDisplay.map(v => v.toLowerCase());

		  	if (wordDisplayLower.join("") == currentLetters.splitLower().join("")) {
				numWins ++;
				onWin();
			}
			else {
				gameDisplay();
				playGame();
			}
		}
		else {
			wrongLetters.push(answer);
			guessesRemaining --
			if (guessesRemaining === 0){
				onLose();
			}
			else {
				gameDisplay();
				console.log(chalk.red("\n  Sorry, that letter is not a correct guess, please choose another letter.\n"));
				playGame();
			}
		}
	}
}

// Function to display current game information
function gameDisplay() {
	letterSwap();
	console.log(chalk.yellow("\n\n  Number of Wins: " + numWins));
	console.log(chalk.yellow("  Guesses Remaining: " + guessesRemaining));
	console.log(chalk.yellow("\n  Wrong choices so far: " + wrongLetters + "\n"));
	console.log("\n  " + wordDisplay.join(" ") + "\n");
}

// Function to handle winning state
function onWin() {
	gameDisplay();
	console.log(chalk.green("\n  ***************************************"));
	console.log(chalk.green("\n  You Win! The galaxy is safe once again!\n"));
	console.log(chalk.green("  ***************************************\n"));
	playAgain();
}

// Function to handle losing state
function onLose() {
	gameDisplay();
	console.log(chalk.red("\n  ******************************************************************"));
	console.log(chalk.red("\n  I have a bad feeling about this...  it appears that you have lost!\n"));
	console.log(chalk.red("  ******************************************************************"));
	playAgain();
}

// Function to update hangman word display as guesses are made
function letterSwap() {
	wordDisplay = currentLetters.underscores();
	for (var i = 0; i < currentLetters.word.length; i++) {
		if (rightLetters.indexOf(currentLetters.splitLower()[i]) > -1){
			wordDisplay[i] = currentLetters.word[i];
		}
	}
	return wordDisplay;
}

// Function to ask if you want to play again
function playAgain() {
	inquirer.prompt([
		{
	        name: "again",
	        message: "Would you like to play again? (y or n) ",
	        validate: function(value) {
	          if (value.length === 1 && value.match(/[ny]/i)) {
	            return true;
	          }
	          return false;
	        }
	    }
	        ]).then(answers => {
	    if (answers.again.toLowerCase() === "y"){
	    	console.log(chalk.yellow("\n  OK, get ready to play another round!\n"));

	    	guessesRemaining = 8;
			rightLetters = [];
			wrongLetters = [];

			currentWord = new word; 
			currentLetters = new letter(currentWord);

	    	playGame();
	    }
	    else{
	    	console.log(chalk.yellow("\n  OK, Thanks for playing.\n"));
	    }
	});
}