function GameException(message) {
  this.message = message;
  this.name = 'GameException';
}

const Scrabble = {
  LetterValues: {
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
  },
  letterFrequency: {
    A: 9,
    B: 2,
    C: 2,
    D: 4,
    E: 12,
    F: 2,
    G: 3,
    H: 2,
    I: 9,
    J: 1,
    K: 1,
    L: 4,
    M: 2,
    N: 6,
    O: 8,
    P: 2,
    Q: 1,
    R: 6,
    S: 4,
    T: 6,
    U: 4,
    V: 2,
    W: 2,
    X: 1,
    Y: 2,
    Z: 1,
  },
  score(word) {
    if (word.length > 7) {
      throw new GameException('Cannot play words longer than 7 letters.');
    } else if (word.length === 0) {
      throw new GameException('Please play a word.');
    } else if ((/[^a-zA-Z]+/).test(word)) {
      throw new GameException('Cannot play non-alphabetical characters.');
    }

    let total = 0;
    for (let i = 0; i < word.length; i += 1) {
      total += this.LetterValues[`${word[i].toUpperCase()}`];
    }
    if (word.length === 7) {
      total += 50;
    }
    return total;
  },
  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw new GameException('There are no words to compare.');
    }
    let highest = arrayOfWords[0];
    for (let i = 1; i < arrayOfWords.length; i += 1) {
      if (this.score(highest) < this.score(arrayOfWords[i])) {
        highest = arrayOfWords[i];
      } else if (this.score(highest) === this.score(arrayOfWords[i]) && highest.length !== 7) {
        if (arrayOfWords[i].length < highest.length || (arrayOfWords[i].length === 7)) {
          highest = arrayOfWords[i];
        }
      }
    }
    return highest;
  },

};

Scrabble.Player = class {
  constructor(name) {
    if (name === undefined) {
      throw new GameException('A name is required.');
    }
    this.name = name;
    this.plays = [];
  }
  play(word) {
    if (this.hasWon()) {
      return false;
    } else if (/[^a-zA-Z]+/.test(word) || word === undefined) {
      throw new GameException('Letters must be played.');
    } else {
      this.plays.push(word);
    }
    return true;
  }
  hasWon() {
    return (this.totalScore() >= 100);
  }
  totalScore() {
    const total = this.plays.reduce((acc, curr) => acc + Scrabble.score(curr), 0);
    return total;
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
    this.tiles = [];
    Object.entries(Scrabble.letterFrequency).forEach(([key, value]) => {
      for (let i = 0; i < value; i += 1) {
        this.tiles.push(key);
      }
    });
  }
  draw(num) {
    let n = num;
    if (num > this.tiles.length) {
      n = this.tiles.length;
    }
    const hand = [];
    for (let i = 0; i < n; i += 1) {
      const index = Math.floor(Math.random() * this.tiles.length);
      hand.push(this.tiles.splice(index, 1)[0]);
    }
    return hand;
  }
};

module.exports = Scrabble;
