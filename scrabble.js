'use strict';
var prompt = require('prompt');
const LETTER_VALUES = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10
};
function UserException(message) {
  this.message = message;
  this.name = 'UserException';
}
const Scrabble = {
  score: function(word) {
    if (word.length > 7 || word.length < 1) {
      throw new UserException(`Invalid word, must be at least 1 character and less than 7 characters.`);
    }

    let score = 0;
    let letter = word.toLowerCase().split("");
    letter.forEach(function(char) {
      if (!(char in LETTER_VALUES)) {
        throw new UserException(`${char} is an invalid character`);
      }
      score += LETTER_VALUES[char];
    });
    if (word.length == 7) {
      score += 50;
    }
    return score;
  },

  highestScoreFrom: function(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw new UserException(`Uh-oh! No words!`);
    }
    if (arrayOfWords.length === 1) {
      return arrayOfWords.toString();
    }

    for (let word of arrayOfWords) {
      let scores = this.score(word);
      console.log(scores);
      // scores.max();
    }
  },
};


Scrabble.Player = class {
  // TODO: implement the Player class
};

prompt.start();
prompt.get(['word'], function(error, result){
  let score = Scrabble.score(result.word);
  console.log(score);
})

module.exports = Scrabble;
// where to store the letter value
