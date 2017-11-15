const values= {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};


const Scrabble = {

  validWord = function(word) {
    if (word.match(/[^a-z]/i)) {
      throw "only letters can be played";
    };

    if (word.length > 7 || word.length < 1 ) {
      throw "Words must be 1 to 7 letters long";
    };
  }

  score: function(word) {
    word = word.toUpperCase();
    this.validWord(word);
    let sum = 0;
    for (let letter of word) {
      sum += values[letter];
    }
    if (word.length === 7) {
      sum += 50
    }
    return sum;
  },

  resolveTie: function(tieArray){
    winner = ""
    for (let word of tieArray) {
      if (word.length === 7){
        winner = word;
        return winner;
      }
      minLength = 7
      winner = []
      for (let word of tieArray){
        if(word.length < minLength){
          minLength = word.length;
          winner = word;
        }
      }
      return winner;
    }
  },


  highestScoreFrom: function(arrayOfWords){
    if (arrayOfWords.length < 1 ) {
      throw "No words were played";
    };

    //find highest scoring word or tie
    let maxScore = 0;
    let maxWord = "";
    let tie = 0;
    let tiedWords = [];
    for (let word of arrayOfWords) {
      if (this.score(word) > maxScore){
        maxScore = this.score(word);
        maxWord = word;
        tie = 0;
        tiedWords=[maxWord];
      }else if (this.score(word) === maxScore ) {
        tie = 1;
        tiedWords.push(word);
      }
    }

    if (tie === 0){
      return maxWord;
    } else {
      let winner = this.resolveTie(tiedWords);
      return winner;
    }
  }
};

// Scrabble.Player = class {
//   // TODO: implement the Player class
// };
//
module.exports = Scrabble;

// console.log(Scrabble.score)
// console.log(Scrabble.score('iiiiddd'))
// console.log(Scrabble.score('zzzzzz'))
console.log(Scrabble.highestScoreFrom(['iiiiddd', 'zzzzzz']))
