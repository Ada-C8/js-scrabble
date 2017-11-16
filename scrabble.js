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
    let playerScore = 0;
    this.plays.forEach(function (word) {
      playerScore += Scrabble.score(word);
    }); //for each
    return playerScore;
  } //ts method

  hasWon() {
    let score = player.totalScore(); //error line
    if(score > 100) {
      return true;
    } else {
      return false;
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


    if( (this.plays.length > 0) && (player.hasWon() === true)) {
      return false;
    } else {
      this.plays.push(word);
      return true;
    }

  }; //play function

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {

    return Scrabble.score(Scrabble.highestScoreFrom(this.plays));
  }



}; //player class

module.exports = Scrabble;





let player = new Scrabble.Player("Dave");
console.log("Player begins game");
console.log(player.totalScore());
player.play('dog');
console.log(player.totalScore());
player.play('cat');
console.log(player.totalScore());
player.play('goat');
console.log(player.totalScore());
console.log("has player won? ");
console.log(player.hasWon());
console.log("Plays zzzzzzz");
player.play('zzzzzzz');
console.log(player.totalScore());
console.log("has player won? ");
console.log(player.hasWon());
console.log(player.highestScoringWord());
console.log(player.highestWordScore());












// console.log(player.plays.length);
// player.play("zzzzzzz");
// console.log(player.totalScore());
// player.play("qqqqqqq");
// console.log(player.totalScore());
// player.play("shoes");
// // expect(player.play(word)).toBeTruthy();
// console.log("AFTER PLAYS");
// console.log(player.plays.length);
// console.log(player.plays);
// console.log("THis is showing if the player won");
// console.log(player.hasWon());
// console.log(player.totalScore());
