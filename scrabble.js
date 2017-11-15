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
    let maxWord = ["",0];
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
    } else {
      this.name = name;
    }
    this.plays = [];
  }
  play(word) {
    if (word === undefined || (typeof word !== 'string')) {
      throw new Error('No word');
    } else if (this.hasWon()) {
      return false;
    } else {
      this.plays.push(word);
      return true;
    }
  }
  plays() {
    return this.plays;
  }
  hasWon() {
    if (this.totalScore() >= 100) {
      return true;
    } else {
      return false;
    }
  }
  totalScore() {
    let points = 0;
    this.plays.forEach((word) => {
      points += Scrabble.score(word);
    });
    return points;
  }
  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }
  highestWordScore() {
    return Scrabble.score(this.highestScoringWord());
  }
};

module.exports = Scrabble;
