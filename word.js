// Constructor that randomly generates a word from an array

function Word() {
	this.words = ["wookie", "Han Solo", "Luke Skywalker", "Darth Vader", "Princess Leia", "Greedo", "Jabba the Hutt", "light saber", "ewok", "land speeder", "blaster", "jawa", "Lando Calrissian"];
	this.currentWord = this.words[Math.floor(Math.random() * this.words.length)]
}

module.exports = Word;