const UserException = function UserException(message) {
  this.message = message;
  this.name = 'UserException';
};

const Scrabble = {
  invalidWord(word) {
    if (!/^[a-z]{1,7}$/i.test(word)) {
      throw new UserException('invalid word, please try again');
    }
  },

  scores: {
    A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
  },

  score(word) {
    // console.log(this.invalidWord);
    this.invalidWord(word);

    const chars = word.toUpperCase().split('');
    let score = 0;
    if (chars.length === 7) {
      score += 50;
    }

    // .charAt() ??
    chars.forEach(function(char) {
      score += Scrabble.scores[char];
    });
    return score;
    // console.log(score);
  },

  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw new UserException('no words given');
    }

    let highestScoringWord = arrayOfWords[0];

    arrayOfWords.forEach(function (word) {
      // console.log(`${this}`); // returns the .forEach function [object global]
      const highScore = Scrabble.score(highestScoringWord);
      const score = Scrabble.score(word);

      if (score > highScore) {
        highestScoringWord = word;
      } else if (score === highScore) {
        if (word.length === 7) {
          highestScoringWord = word;
        } else if (highestScoringWord.length === 7) {
          // how do you make this look good?
        } else if (word.length < highestScoringWord.length) {
          highestScoringWord = word;
        }
      }
    });
    return highestScoringWord;
  },
};

Scrabble.Player = class {
  constructor(name) {
    if (!name) {
      throw new UserException('Player must have a name');
    }

    this.name = name;
    this.plays = [];
    this._totalScore = 0;
  }

  totalScore() {
    return this._totalScore;
  }

  play(word) {
    if (this.hasWon()) {
      return false;
    }
    this._totalScore += Scrabble.score(word);
    this.plays.push(word);
    return true;
  }

  hasWon() {
    if (this._totalScore < 100) {
      return false;
    }
    return true;
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    return Scrabble.score(this.highestScoringWord());
  }
};

module.exports = Scrabble;

// Scrabble.highestScoreFrom(['cat'])
