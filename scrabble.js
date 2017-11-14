const TILES = {
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

const add = function add(num1, num2) {
  return num1 + num2;
};

const err = function err() {
  throw new Error();
};

const Scrabble = {
  score(word) {
    if (word === '') {
      err();
    }
    const scores = word.split('').map(letter => TILES[letter.toUpperCase()]);
    if (scores.some(score => score === undefined)) {
      err();
    }
    let total;
    if (scores.length > 7) {
      err();
    } else if (scores.length === 7) {
      total = 50;
    } else {
      total = 0;
    }
    total = scores.reduce(add, total);
    return total;
  },

  highestScoreFrom(array) {
    if (!Array.isArray(array) || array.length < 1) {
      err();
    }
    if (array.length === 1) {
      return array[0];
    }
    let highestWord = array[0];
    let highestScore = Scrabble.score(highestWord);
    for (let i = 1; i < array.length; i += 1) {
      const word = array[i];
      const score = Scrabble.score(word);
      if (score > highestScore) {
        highestWord = word;
        highestScore = score;
      }
      if (score === highestScore) {
        if (word.length < highestWord.length && highestWord.length !== 7) {
          highestWord = word;
          highestScore = score;
        } else if (word.length === 7 && highestWord.length !== 7) {
          highestWord = word;
          highestScore = score;
        }
      }
    }
    return highestWord;
  },

};

Scrabble.Player = class {
  constructor(name = err()) {
    this.name = name;
    this.plays = [];
  }
  play(word) {
    const lettersOnly = /^[a-zA-Z]+$/;
    if (word.length < 1 || !lettersOnly.test(word)) {
      err();
    }
    if (this.hasWon()) {
      return false;
    }
    this.plays.push(word);
    return true;
  }
  totalScore() {
    let playerScore = 0;
    for (let i = 0; i < this.plays.length; i += 1) {
      playerScore += Scrabble.score(this.plays[i]);
    }
    return playerScore;
  }
  hasWon() {
    const playerScore = this.totalScore();
    let result;
    if (playerScore >= 100) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }
  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }
  highestWordScore() {
    return Scrabble.score(this.highestScoringWord());
  }
};

module.exports = Scrabble;
