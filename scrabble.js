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
    console.log(this.plays);
    console.log("constructor");
  } //constructor

  play(word) {
    // let plays = ["fish"];
    // console.log(this.plays);
    // console.log(`the word i'm playing is ${word}`);
    this.plays.push(word);
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
player.play(word);
// expect(player.play(word)).toBeTruthy();

console.log(player.plays.length);
console.log(player.plays[0]);



// //
// const loser = 'zzzzzz';
// const winner = 'iiiiddd';

// console.log("Comparing dog and pig");
// console.log("pig should win ")
// console.log(Scrabble.highestScoreFrom(['dog', 'pig']));
// console.log("*********************\n");
// console.log("starting with pig, pig should win.")
// console.log(Scrabble.highestScoreFrom(['pig', 'dog']));
//
// console.log("Comparing winner and loser");
// console.log("iiiiddd should win -- seven letters ")
// console.log(Scrabble.highestScoreFrom([loser, winner]));
//
// console.log(Scrabble.highestScoreFrom([winner, loser]));

// console.log("***************************************")
// console.log("schekcing i, dog, cat -- cd should win");
// console.log(Scrabble.highestScoreFrom(['i', 'dog', 'cd', 'cat']));
//
// console.log("Comparing dog and cat, dog should win");
// console.log(Scrabble.highestScoreFrom(['dog', 'cat']));
// console.log("***********************");
// console.log("Comparing cat and dog, cat should win");
// console.log(Scrabble.highestScoreFrom(['cat', 'dog']));
// console.log("***********************");
//   // Test the functionality
//   expect(Scrabble.highestScoreFrom(['dog', 'dog'])).toBe('dog');
//   expect(Scrabble.highestScoreFrom(['dog', 'cat'])).toBe('dog');
//   expect(Scrabble.highestScoreFrom(['cat', 'dog'])).toBe('cat');
//   expect(Scrabble.highestScoreFrom(['i', 'dog', 'cat'])).toBe('dog');
// });


///
