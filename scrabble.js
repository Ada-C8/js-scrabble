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

  highestScoreFrom: function(words) {

    if(words.length === 0) {
      throw new UserException("Array is Empty");
    } else if (typeof words != 'object') {
      throw new UserException("You must enter an array");
    } //exceptions

    if(words.length === 1) {
      return words[0];
    } else if(words.length >= 2) {
      let highScore = Scrabble.score(words[0]);
      let scoreHash = {};
      let highestScoringWord = "";

      words.forEach(function (word) {
        let wordScore = Scrabble.score(word);
        if (scoreHash[wordScore] === undefined) {
          scoreHash[wordScore] = [word];
        } else {
          scoreHash[wordScore].push(word);
        } //else for hash creation
        if (wordScore > highScore) {
          highScore = wordScore;
        } // if for finding high score
      }); //end of first for.each


      let highestScoringWords = scoreHash[highScore];
      let minLength = highestScoringWords[0].length;


      if (highestScoringWords.length === 1) {
        highestScoringWord = highestScoringWords[0];
      } else {
        highestScoringWord = highestScoringWords[0];
        highestScoringWords.forEach(function (word) {

          if (word.length === 7) {
            highestScoringWord = word;
            minLength = 0;
          } else {
            if(word.length < minLength) {
              minLength = word.length;
              highestScoringWord = word;
            } //else if for finding minimum
          }// end else -- words that aren't seven letters
        }); //end highest scoring word function
      } //end else for multiple high scoring words
      return highestScoringWord;
    } //else if array has 2 or more words
    // return highestScoringWord;
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








// const loser = 'zzzzzz';
// const winner = 'iiiiddd';
//
// // console.log("Comparing dog and pig");
// // console.log(Scrabble.highestScoreFrom(['dog', 'pig']));
// // console.log("*********************");
// // console.log("starting iwth pig")
// // console.log(Scrabble.highestScoreFrom(['pig', 'dog']));
// // console.log(Scrabble.highestScoreFrom([loser, winner]));
// // console.log("Comparing winner and loser");
// // console.log(Scrabble.highestScoreFrom([winner, loser]));
// console.log("schekcing i, dog, cat");
// console.log(Scrabble.highestScoreFrom(['i', 'dog', 'cd', 'cat']));



///
