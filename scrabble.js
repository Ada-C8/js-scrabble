const requiredParams = function requiredParams(param) {
  throw new Error(`Required param ${param}`)
};

const Scrabble = {
  VALUES: {
    A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5,
    L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4,
    W: 4, X: 8, Y: 4, Z: 10
  },
  wordCheck: /\W|_|\d/,

  score: function score(word) {
    let wordScore = 0;

    if (Scrabble.wordCheck.test(word)) {
      throw new Error('Input contains invalid characters');
    }

    if (!word || word.length === 0) {
      throw new Error('Input cannot be empty');
    } else if (word.length === 7) {
      wordScore += 50;
    } else if (word.length > 7) {
      throw new Error('Input is too long - cannot exceed 7 letters');
    }

    word = word.toUpperCase();
    for (let letter of word) {
      wordScore += Scrabble.VALUES[letter];
    }
    return wordScore;
  },

  highestScoreFrom: function highestScoreFrom(words) {
    if (words.length === 0) {
      throw new Error('Input cannot be empty');
    } else if (words.length === 1) {
      return words[0];
    }

    let highestWord = words[0];
    let bestScore = 0;
    let currentScore = 0;
    for (let word of words) {
      currentScore = Scrabble.score(word);
      if (currentScore > bestScore) {
        highestWord = word;
        bestScore = currentScore;
      } else if (currentScore === bestScore) {
        if (highestWord.length != 7) {
          if (word.length === 7 || word.length < highestWord.length) {
            highestWord = word;
            bestScore = currentScore;
          }
        }
      }
    }
    return highestWord;
  }
};

Scrabble.Player = class {
  constructor(name = requiredParams('name')){
    this.name = name;
    this.plays = [];
    this._totalScore = 0;
  }

  totalScore() {
    return this._totalScore;
  }

  play(word) {
    let score = Scrabble.score(word);
    if (word) {
      this.plays.push(word);
      this._totalScore += score;
      return this.plays;
    }
    return false;
  }
};

module.exports = Scrabble;
