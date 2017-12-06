// Constructor that takes the word and splits it
function Letter(newWord) {
	this.word = newWord.currentWord;
	this.splitWord = this.word.split("");
}

// Prototype the adds underscores to Letter constructor
Letter.prototype.underscores = function() {
	var underScores = [];
	for (var i = 0; i < this.splitWord.length; i++) {
		if(this.splitWord[i] === " "){
			underScores.push(" ");
		}
		else{
			underScores.push("_");
		}
	}
	return underScores;
};

// Prototype that adds a lowercase version to Letter contructor
Letter.prototype.splitLower = function() {
	var wordLower = this.splitWord.map(v => v.toLowerCase());
	return wordLower;
};


module.exports = Letter;