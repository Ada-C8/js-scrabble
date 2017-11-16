// /* eslint-disable */

const Scrabble = {
  score(word) {
    const letterValues = {
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
      Z: 10
    };

    const splitChars = function splitChars(str) {
      const chars = [];
      for (let i = 0; i < str.length; i++) {
        chars.push(str.charAt(i))
      }
      return chars;
    };

    const totalScore = function totalScore(array) {
      let total = 0;
      array.forEach((char) => {
        if (!(char in letterValues)) {
          throw new Error('Word must only contain letters from A-Z');
        }
        total += letterValues[char];
      });

      if (array.length === 7) {
        total += 50;
      } else if (array.length > 7 || array.length === 0) {
        throw new Error('Word must have 1-7 letters');
      }

      return total;
    };

    const uppercaseWord = word.toUpperCase();

    const characters = splitChars(uppercaseWord);

    return totalScore(characters);
  },

  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0 || arrayOfWords.constructor !== Array) {
      throw new Error('Array of words must not be empty');
    } else if (arrayOfWords.length === 1) {
      return arrayOfWords[0];
    } else {
      const winningWord = arrayOfWords.reduce((leftWord, rightWord) => {
        const scoreLeft = Scrabble.score(leftWord);
        const scoreRight = Scrabble.score(rightWord);

        if (scoreLeft > scoreRight) {
          return leftWord;
        } else if (scoreRight > scoreLeft) {
          return rightWord;
        }

        if (rightWord.length === 7) {
          return rightWord;
        } else if (leftWord.length === 7) {
          return leftWord;
        }

        if (leftWord.length < rightWord.length || leftWord.length === rightWord.length) {
          return leftWord;
        } else {
          return rightWord;
        }
      });
      return winningWord;
    }
  },
};

Scrabble.Player = class {
  constructor(name) {
    if (typeof name === 'string' && name.length > 0) {
      this.name = name;
    } else {
      throw new Error('Player must have a name');
    }

    this.plays = [];
  }

  play(word) {
    if (typeof word !== 'string' || word.length < 0) {
      throw new Error('Player must play a valid word');
    }
    if (this.hasWon()) {
      return false;
    }
    this.plays.push(word);
    return true;
  }

  totalScore() {
    if (this.plays === []) {
      return 0;
    }

    const wordScores = this.plays.map(play => Scrabble.score(play));

    const total = wordScores.reduce((accumulator, value) => accumulator + value, 0);

    return total;
  }

  hasWon() {
    if (this.totalScore() >= 100) {
      return true;
    }
    return false;
  }
};

module.exports = Scrabble;
