function UserException(message) {
  this.message = message;
  this.name = 'UserException'
};

const letterPoints = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
};

const Scrabble = {
  score: function(word) {

    if(word.length > 7) {
      throw new UserException("Word is Too Long");
    } else if (word.length === 0) {
      throw new UserException("You must enter a word to be scored");
    } else if (word.match(/[^a-z]+/i)) {
      throw new UserException("Word can only contain letters");
    } //exception tests

    let total = 0; //set initial total

    word = word.toUpperCase(); //set word to uppercase

    for(let i = 0; i < word.length; i++){
      total += letterPoints[word[i]];
    } // end for loop

    if(word.length === 7){
      total += 50;
    } //if length

    return total;

  }, //end function word

  tieBreak: function(a, b) {
    if(a.length === 7){
      let winner = a;
      return winner;
    } else if(b.length === 7){
      let winner = b;
      return winner;
    } else if(a.length > b.length) {
      let winner = b;
      return winner;
    } else {
      let winner = a;
      return winner;
    }
  }, //end tiebreak function

  highestScoreFrom: function(words) {

    if(words.length === 0) {
      throw new UserException("Array is Empty");
    } else if (typeof words != 'object') {
      throw new UserException("You must enter an array");
    } //exceptions

    if(words.length === 1) {
      return words[0];
    } else if(words.length >= 2) {

      let highestScoringWord = "";
      let highestScore = 0;

      words.forEach(function (word) {

        if(Scrabble.score(word) > highestScore){
          highestScoringWord = word;
          highestScore = Scrabble.score(word);
        }//if
        else if (Scrabble.score(word) === highestScore) {
          highestScoringWord = Scrabble.tieBreak(highestScoringWord, word);
        } //else if
      });//end foreach function
      return highestScoringWord;
    } //else if array has 2 or more words
  } //end highestscorefrom
}; //end const Scrabble

Scrabble.Player = class {
  constructor(name) {
    if(name === undefined){
      throw new UserException("Must Include a Name");
    } //exception
    this.name = name;
    this.plays = [];
    // this.totalScore = 0;
  } //constructor

  totalScore() {
    console.log("Im in total score");
    let totalScore = 0;
    this.plays.forEach(function (word) {
      totalScore += Scrabble.score(word);
    }); //for each
    return totalScore;
  } //ts method

  hasWon() {
    console.log("I'm in has Won.");
    if(player.totalScore >= 100) {
      console.log("total score is more than 100")
      let hasWon = true;
      return hasWon;
    }
  }

  play(word) {
    if(word.length > 7) {
      throw new UserException("Word is Too Long");
    } else if (word.length === 0) {
      throw new UserException("You must enter a word to be scored");
    } else if (word.match(/[^a-z]+/i)) {
      throw new UserException("Word can only contain letters");
    } //exception tests

    if((this.plays.length > 0) && (player.hasWon() === false)) {
      return false
    } else {
      this.plays.push(word);
      return true;
    }

  }; //play function



}; //player class

module.exports = Scrabble;

// speak() {
//   console.log(this.sound);
// }
//
// static createAnimals(sounds) {
//   let animals = [];
//   for (let sound of sounds) {
//     let animal = new this(sound);
//     animals.push(animal);
//   }
//   return animals;
// }
// }

// - `name`: property which returns the value of the player's name
// - `plays`: property which returns an Array of the words played by the player
// - `play(word)`: method which adds the input word to the `plays` Array
//     - Returns false if player has already won
// - `totalScore()`: method which sums up and returns the score of the players words


let word = 'dog';
let player = new Scrabble.Player("Dave");
console.log(player.plays.length);
player.play("zzzzzz");
console.log(player.totalScore());
player.play("zzzzzz");
console.log(player.totalScore());
player.play("shoes");
// expect(player.play(word)).toBeTruthy();
console.log("AFTER PLAYS");
console.log(player.plays.length);
console.log(player.plays);
player.hasWon();
console.log(player.totalScore());
