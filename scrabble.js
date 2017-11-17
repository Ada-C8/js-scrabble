const values = {
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
  validWord(word) {
    if (word.match(/[^a-z]/i)) {
      throw new Error('only letters can be played');
    }

    if (word.length > 7 || word.length < 1) {
      throw new Error('Words must be 1 to 7 letters long');
    }
  },

  score(word) {
    word = word.toUpperCase();
    this.validWord(word);
    let sum = 0;
    for (let letter of word) {
      sum += values[letter];
    }
    if (word.length === 7) {
      sum += 50;
    }
    return sum;
  },

  resolveTie(tieArray) {
    for (let word of tieArray) {
      if (word.length === 7) {
        return word;
      }
    }
    let minLength = 7;
    let winner = [];
    for (let word of tieArray) {
      if(word.length < minLength) {
        minLength = word.length;
        winner = word;
      }
    }
    return winner;
  },

  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length < 1) {
      throw new Error('No words were played');
    }
    // find highest scoring word or tie
    let maxScore = 0;
    let maxWord = '';
    let tie = 0;
    let tiedWords = [];
    for (let word of arrayOfWords) {
      if (this.score(word) > maxScore) {
        maxScore = this.score(word);
        maxWord = word;
        tie = 0;
        tiedWords = [maxWord];
      } else if (this.score(word) === maxScore) {
        tie = 1;
        tiedWords.push(word);
      }
    }
    // determine winner
    if (tie === 0) {
      return maxWord;
    }
    return this.resolveTie(tiedWords);
  },
};

Scrabble.Player = class {
  constructor(name) {
    if (name.length === 0) {
      throw new Error('Players must have names.');
    }
    this.name = name;
    this.plays = [];
  }

  play(word) {
    Scrabble.validWord(word);
    if (this.hasWon()) {
      return false;
    }
    this.plays.push(word);
    return this.plays;
  }

  totalScore() {
    let sum = 0;
    this.plays.forEach((word) => {
      sum += Scrabble.score(word);
    });
    return sum;
  }

  hasWon() {
    if (this.totalScore() >= 100) {
      return true;
    }
    return false;
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    return Scrabble.score(this.highestScoringWord());
  }
};

module.exports = Scrabble;
