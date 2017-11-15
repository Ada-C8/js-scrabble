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
  z: 10,
};

const UserException = function userException(message) {
  this.message = message;
  this.name = 'UserException';
};

const Scrabble = {

  score: function score(word) {
    if (word.length > 7) {
      throw new UserException('Words longer than 7 letters are not allowed.');
    } else if (!(/^[a-zA-Z]+$/.test(word))) {
      throw new UserException('You must provide a valid word.');
    } else {
      let points = 0;
      word.split('').forEach(function wordScore(char) {
        points += LETTER_VALUES[`${char.toLowerCase()}`];
      });
      if (word.length === 7) {
        points += 50;
      }
      return points;
    }
  },

  tie: function tie(word, maxWord) {
    if (((word.length === 7) && (maxWord.length !== 7)) || ((word.length < maxWord.length) && (maxWord.length !== 7))) {
      maxWord = word;
    }
    return maxWord;
  },

  highestScoreFrom: function highestScoreFrom(words) {
    let maxScore = 0;
    let maxWord = '';
    words.forEach(function findMax(word) {
      if (Scrabble.score(word) === maxScore) {
        maxWord = Scrabble.tie(word, maxWord);
        maxScore = Scrabble.score(maxWord);
      } else if (Scrabble.score(word) > maxScore) {
        maxScore = Scrabble.score(word);
        maxWord = word;
      }
    });
    return maxWord;
  },
};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;

// console.log(Scrabble.highestScoreFrom(['dog']))

// console.log(Scrabble.score('caasdfast'));
