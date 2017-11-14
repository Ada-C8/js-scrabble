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
  score(error, result) {
    // TODO: check length > 0 and < 7
    let score = 0, word = result.word, letter = word.toLowerCase().split("");
    letter.forEach(function(char) {
      if (!(char in LETTER_VALUES)) {
        throw new UserException(`${char} is an invalid character`);
      }
      score += LETTER_VALUES[char];
    }
  );
  if (word.length == 7) {
    score += 50;
  }
  console.log(score);
  return score;
},

// my old ruby way:
// score = 0
// word.chars.each do |char|
//   score += LETTER_VALUES[char.downcase]
// end
// score += 50 if word.length == 7
// return score

// TODO: add the highestScoreFrom method
};

prompt.start();
prompt.get(['word'], Scrabble.score)


// wave 2:
Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
// where to store the letter value
