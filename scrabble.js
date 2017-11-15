const TILES = {
  A: { value: 1, quantity: 9 },
  B: { value: 3, quantity: 2 },
  C: { value: 3, quantity: 2 },
  D: { value: 2, quantity: 4 },
  E: { value: 1, quantity: 12 },
  F: { value: 4, quantity: 2 },
  G: { value: 2, quantity: 3 },
  H: { value: 4, quantity: 2 },
  I: { value: 1, quantity: 9 },
  J: { value: 8, quantity: 1 },
  K: { value: 5, quantity: 1 },
  L: { value: 1, quantity: 4 },
  M: { value: 3, quantity: 2 },
  N: { value: 1, quantity: 6 },
  O: { value: 1, quantity: 8 },
  P: { value: 3, quantity: 2 },
  Q: { value: 10, quantity: 2 },
  R: { value: 1, quantity: 6 },
  S: { value: 1, quantity: 4 },
  T: { value: 1, quantity: 6 },
  U: { value: 1, quantity: 4 },
  V: { value: 4, quantity: 2 },
  W: { value: 4, quantity: 2 },
  X: { value: 8, quantity: 1 },
  Y: { value: 4, quantity: 2 },
  Z: { value: 10, quantity: 1 },
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
    const scores = word.split('').map(letter => TILES[letter.toUpperCase()].value);
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
  Tilebag: {
    tiles: [],
    resetTiles() {
      Object.keys(TILES).forEach((letter) => {
        for (let i = 0; i < TILES[letter].quantity; i += 1) {
          Scrabble.Tilebag.tiles.push(letter);
        }
      });
    },
    drawTiles(numTiles) {
      const self = Scrabble.Tilebag;
      const drawnTiles = [];
      for (let i = 0; i < numTiles; i += 1) {
        const randomIndex = Math.floor(Math.random() * self.tiles.length);
        drawnTiles.push(Scrabble.Tilebag.tiles[randomIndex]);
        Scrabble.Tilebag.tiles.splice(randomIndex, 1);
      }
      return drawnTiles;
    },
    remainingTiles() {
      const self = Scrabble.Tilebag;
      const remainingTiles = {};
      Object.keys(TILES).forEach((letter) => {
        const letterCount = self.tiles.filter(tile => tile === letter).length;
        remainingTiles[letter] = letterCount;
      });
      return remainingTiles;
    },
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
