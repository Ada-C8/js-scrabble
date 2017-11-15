const SCORES = {
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

const NUMTILES = {
  1: ['J', 'K', 'Q', 'X', 'Z'],
  2: ['B', 'C', 'F', 'H', 'M', 'P', 'V', 'W', 'Y'],
  3: ['G'],
  4: ['D', 'L', 'S', 'U'],
  6: ['N', 'R', 'T'],
  8: ['O'],
  9: ['A', 'I'],
  12: ['E'],
};

const parse = require('csv-parse');
// require('should');
const fs = require('fs');
// const rr = fs.createReadStream('./dictionary.csv');

// rr.on('readable', () => {
//   console.log('readable:', rr.read());
// });
// rr.on('end', () => {
//   console.log('end');
// });

const parser = parse({ delimiter: ',' });
fs.createReadStream('./dictionary.csv').pipe(parser);
console.log(parser);

function WordLengthException() {
  this.message = 'must contain between 1 and 7 letters';
}

function InvalidCharsException() {
  this.message = 'can only contain the letters A to Z';
}

function NoWordsException() {
  this.message = 'must score at least one word';
}

function InvalidNameException() {
  this.message = 'name is required';
}

function InvalidNumToDrawException() {
  this.message = 'must draw at least 1 and no more than 7 tiles';
}

const checkWord = function checkWord(word) {
  if (word.length < 1 || word.length > 7) {
    throw new WordLengthException();
  } else if (/[^a-zA-Z]/.exec(word) !== null) {
    throw new InvalidCharsException();
  }
};

const Scrabble = {
  score(word) {
    checkWord(word);

    // add 50 pt bonus if use all 7 letters
    const startVal = word.length === 7 ? 50 : 0;

    const vals = word.toUpperCase().split('').map(char => SCORES[char]);
    return vals.reduce((sum, val) => sum + val, startVal);
  },

  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw new NoWordsException();
    }
    let bestWord = arrayOfWords[0];
    let bestScore = this.score(bestWord);
    arrayOfWords.forEach((word) => {
      const wordScore = this.score(word);
      if (wordScore > bestScore) {
        bestWord = word;
        bestScore = wordScore;
      } else if (wordScore === bestScore) { // check ties
        // if use all letters
        if (word.length === 7 && bestWord.length !== 7) {
          bestWord = word;
          bestScore = wordScore;
          // if use fewer letters
        } else if (word.length < bestWord.length && bestWord.length !== 7) {
          bestWord = word;
          bestScore = wordScore;
        }
      }
    });
    return bestWord;
  },

};

Scrabble.Player = class {
  constructor(name) {
    if (typeof name === 'string' && name.length > 0) {
      this.name = name;
      this.plays = [];
    } else {
      throw new InvalidNameException();
    }
  }

  play(word) {
    if (this.hasWon()) {
      return false;
    }
    // check word is valid
    checkWord(word);
    this.plays.push(word);
    return true;
  }

  totalScore() {
    const allScores = this.plays.map(play => Scrabble.score(play));
    return allScores.reduce((sum, val) => sum + val, 0);
  }

  hasWon() {
    return this.totalScore() >= 100;
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    return Scrabble.score(this.highestScoringWord());
  }
};

Scrabble.TileBag = class {
  constructor() {
    this.tiles = this.generateTiles();
  }

  generateTiles() {
    this.tiles = [];
    Object.entries(NUMTILES).forEach((entry) => {
      const [freq, letters] = entry;
      letters.forEach((letter) => {
        this.tiles = this.tiles.concat(Array(Number(freq)).fill(letter));
      });
    });
    return this.tiles.sort();
  }

  drawTiles(numTiles) {
    if (Number.isNaN(Number(numTiles)) || numTiles < 1 || numTiles > 7) {
      throw new InvalidNumToDrawException();
    }
    const drawn = [];

    // check how many tiles remaining
    const numToDraw = (numTiles <= this.tilesRemaining() ? numTiles : this.tilesRemaining());
    // draw tiles
    for (let i = 0; i < numToDraw; i += 1) {
      const tile = this.tiles[Math.floor(Math.random() * this.tiles.length)];
      drawn.push(tile);
      this.tiles.splice(this.tiles.indexOf(tile), 1);
    }
    return drawn;
  }

  tilesRemaining() {
    return this.tiles.length;
  }
};

// Scrabble.Dictionary = class {
//   constructor() {
//     const input =
//   }
// }

module.exports = Scrabble;

// console.log(Scrabble.score('dog'));
// let tilebag = new Scrabble.TileBag();
// console.log(tilebag.generateTiles());
