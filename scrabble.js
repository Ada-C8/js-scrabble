const TILES = {
  A: { val: 1, qty: 9 },
  B: { val: 3, qty: 2 },
  C: { val: 3, qty: 2 },
  D: { val: 2, qty: 4 },
  E: { val: 1, qty: 12 },
  F: { val: 4, qty: 2 },
  G: { val: 2, qty: 3 },
  H: { val: 4, qty: 2 },
  I: { val: 1, qty: 9 },
  J: { val: 8, qty: 1 },
  K: { val: 5, qty: 1 },
  L: { val: 1, qty: 4 },
  M: { val: 3, qty: 2 },
  N: { val: 1, qty: 6 },
  O: { val: 1, qty: 8 },
  P: { val: 3, qty: 2 },
  Q: { val: 10, qty: 1 },
  R: { val: 1, qty: 6 },
  S: { val: 1, qty: 4 },
  T: { val: 1, qty: 6 },
  U: { val: 1, qty: 4 },
  V: { val: 4, qty: 2 },
  W: { val: 4, qty: 2 },
  X: { val: 8, qty: 1 },
  Y: { val: 4, qty: 2 },
  Z: { val: 10, qty: 1 },
};

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

    const vals = word.toUpperCase().split('').map(char => TILES[char].val);
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
    Object.keys(TILES).forEach((letter) => {
      const [qty] = TILES[letter].qty;
      this.tiles = this.tiles.concat(Array(Number(qty)).fill(letter));
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

module.exports = Scrabble;
