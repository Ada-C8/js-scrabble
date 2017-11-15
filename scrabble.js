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
    console.log(`I'm in teh function and a is ${a} and b is ${b}`);
    console.log(a.length);
    if(a.length === 7){
      console.log(`${a} is seven letters`);
      let winner = a;
      return winner;
    } else if(b.length === 7){
      console.log(`${b} is seven letters`)
      let winner = b;
      return winner;
    } else if(a.length > b.length) {
      console.log(`${b} is shorter than ${a}`);
      let winner = b;
      return winner;
    } else {
      let winner = a;
      return winner;
    }
    // else {
    //   console.log(`b is ${b}`);
    //   let winner = b;
    //   return winner;
    // }
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
          console.log("in the else if, sending words to tie break");
          console.log(`highestScoring is ${highestScoringWord} and it is being compared to ${word}`);
          highestScoringWord = Scrabble.tieBreak(highestScoringWord, word);
          console.log(`hsw is now ${highestScoringWord}`);
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
    }
  this.name = name;
} //constructor

// if(name.length === 0) {
//   throw new UserException("Must Include Name");
// } else if (typeof words!= 'string') {
//   throw new UserException("Name must be a string");
// }
//exception tests

  // TODO: implement the Player class
};

module.exports = Scrabble;



// it('Creates a new player', function() {
//   let name = 'test name';
  // let player = new Scrabble.Player();
  // console.log(player);
// });

// it('Requires a name', function() {
//   expect(function() { new Scrabble.Player(); }).toThrow();
// });






//
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

console.log("Comparing dog and cat, dog should win");
console.log(Scrabble.highestScoreFrom(['dog', 'cat']));
console.log("***********************");
console.log("Comparing cat and dog, cat should win");
console.log(Scrabble.highestScoreFrom(['cat', 'dog']));
console.log("***********************");
  // Test the functionality
//   expect(Scrabble.highestScoreFrom(['dog', 'dog'])).toBe('dog');
//   expect(Scrabble.highestScoreFrom(['dog', 'cat'])).toBe('dog');
//   expect(Scrabble.highestScoreFrom(['cat', 'dog'])).toBe('cat');
//   expect(Scrabble.highestScoreFrom(['i', 'dog', 'cat'])).toBe('dog');
// });


///
