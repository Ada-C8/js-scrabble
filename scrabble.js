const Scrabble = {
  score(word) {
    const CHART = {
      A: 1,
      E: 1,
      I: 1,
      O: 1,
      U: 1,
      L: 1,
      N: 1,
      R: 1,
      S: 1,
      T: 1,
      D: 2,
      G: 2,
      B: 3,
      C: 3,
      M: 3,
      P: 3,
      F: 4,
      H: 4,
      V: 4,
      W: 4,
      Y: 4,
      K: 5,
      J: 8,
      X: 8,
      Q: 10,
      Z: 10,
    };
    let score = 0;
    if (word.length > 7) {
      throw new Error('Too long!');
    } else if (word.length === 7) {
      score = 50;
    } else if (word.length === 0) {
      throw new Error('Too short!');
    } else if (!word.match(/^[a-zA-Z]+$/)) {
      throw new Error('Bad character');
    }

    for (let letter = 0; letter < word.length; letter += 1) {
      const checkLetter = word.charAt(letter).toUpperCase();
      score += CHART[checkLetter];
    }
    return score;
  },
  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw new Error('no words');
    }
    const maxWord = ['', 0];
    arrayOfWords.forEach((word) => {
      const wordScore = Scrabble.score(word);

      if (wordScore > maxWord[1]) {
        maxWord[0] = word;
        maxWord[1] = wordScore;
      } else if (wordScore === maxWord[1]) {
        if (word.length === 7 || (word.length < maxWord[0].length && maxWord[0].length !== 7)) {
          maxWord[0] = word;
          maxWord[1] = wordScore;
        }
      }
    });
    return maxWord[0];
  },
};

Scrabble.Player = class {
  constructor(name) {
    if (name === undefined) {
      throw new Error('No name');
    }
    this.name = name;
    this.plays = [];
  }
  play(word) {
    if (word === undefined || (typeof word !== 'string')) {
      throw new Error('No word');
    } else if (this.hasWon()) {
      return false;
    }
    this.plays.push(word);
    return true;
  }
  plays() {
    return this.plays;
  }
  hasWon() {
    return (this.totalScore() >= 100);
  }
  totalScore() {
    const points = this.plays.reduce((total, word) => total + Scrabble.score(word), 0);
    return points;
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
    const tilesToFill = {
      J: 1,
      K: 1,
      Q: 1,
      X: 1,
      Z: 1,
      B: 2,
      F: 2,
      H: 2,
      M: 2,
      P: 2,
      V: 2,
      W: 2,
      Y: 2,
      G: 3,
      D: 4,
      L: 4,
      S: 4,
      U: 4,
      N: 6,
      R: 6,
      T: 6,
      O: 8,
      A: 9,
      I: 9,
      E: 12,
    };
    this.TILES = [];
    tilesToFill.forEach((letter) => {
      for (let i = 0; i < tilesToFill[letter]; i += 1) {
        this.TILES.push(letter);
      }
    });
  }
  drawTiles(num) {
    const tiles = [];
    let toFill = num;
    if (this.TILES.length < num) {
      toFill = this.TILES.length;
    }
    for (let i = 0; i < toFill; i += 1) {
      tiles.push(this.TILES[Math.floor(Math.random() * this.TILES.length)]);
    }
    return tiles;
  }
};

module.exports = Scrabble;
