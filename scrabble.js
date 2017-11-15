const letterScores = {
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

const ErrorMsg = function ErrorMsg(value) {
  this.value = value;
  this.message = 'is not valid';
  this.toString = function () {
    return this.value + this.message;
  };
};

const Scrabble = {
  score(word) {
    if ((/^[a-zA-Z]+$/.test(word) === false) || (word.length > 7) || (word === '')) {
      throw new ErrorMsg(word);
    }

    let wordScore = 0;
    word.toLowerCase().split('').forEach(function(letter) {
      let result = letterScores[letter];
      wordScore += result;
    });

    if (word.length === 7) {
      return (wordScore + 50);
    }
    return wordScore;
  },

  highestScoreFrom(wordArray) {
    if ((wordArray.length === 0) || (wordArray.isArray() === false)) {
      throw new ErrorMsg(wordArray);
    }
  },
}; // end of object Scrabble

// TODO: add the highestScoreFrom method


Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
