function UserException(message) {
   this.message = message;
   this.name = 'UserException';
}

const LetterValues = {
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
  score(word) {
    if (word.length > 7) {
      throw new UserException('Cannot play words longer than 7 letters.');
    } else if (word.length === 0) {
      throw new UserException('Please play a word.');
    } else if ((/[^a-zA-Z]+/).test(word)) {
      throw new UserException('Cannot play non-alphabetical characters.');
    }

    let total = 0;
    for (let i = 0; i < word.length; i += 1) {
      total += LetterValues[`${word[i].toUpperCase()}`];
    }
    if (word.length === 7) {
      total += 50;
    }
    return total;
  },

  // TODO: add the highestScoreFrom method

};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
