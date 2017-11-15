const score_chart = {
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
  Z: 10
};
const Scrabble = {
  score: function(word) {
    format = /^[a-zA-Z]+$/;
    word = word.toUpperCase();
    if (format.test(word) && word.length <= 7 && word != '') {
      let letter, i, sum = 0;
      for (i = 0; i < word.length; i++) {
        letter = word[i];
        sum += score_chart[letter];
      } // for
      if (word.length === 7) {
        return parseInt(sum + 50);
      } else {
        return parseInt(sum);
      }
    } // if
    else {
      throw new Error('Please enter valid input');
      // console.log('Please enter valid input');
    } // else
  } // score
}; // scrabble

let result = Scrabble.score('buBBLES');
console.log(result);

// TODO: add the highestScoreFrom method

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
