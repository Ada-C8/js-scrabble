
const Scrabble = {

  score: function (word) {
    let score = word.length === 7 ? 50 : 0;
    const LETTER_TO_VALUE = {
      A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1,
      R: 1, S: 1, T: 1, D: 2, G: 2, B: 3, C: 3,
      M: 3, P: 3, F: 4, H: 4, V: 4, W: 4, Y: 4,
      K: 5, J: 8, X: 8, Q: 10, Z: 10,
    };
    const ALPHA = /[a-zA-Z]/;
    function ArgumentError(message) {
      this.message = message;
      this.name = 'ArgumentError';
    }
    if (word.length > 7 || word.length < 1) {
      throw new ArgumentError('Invalid word length detected');
    }
    word.split('').forEach((letter) => {
      if (letter.match(ALPHA)) {
        score += parseInt(LETTER_TO_VALUE[letter.toUpperCase()], 10);
      } else {
        throw new ArgumentError('Invalid characters detected');
      }
    });
    return score;
  },
  highestScoreFrom: function (array) {
    if (Array.isArray(array) !== true || array.length === 0) {
      throw new Error('Requires at least one word');
    }
    if (array.length === 1) {
      return array[0];
    }
    if (Scrabble.score(array[0]) > Scrabble.score(array[1])) {
      return array[0];
    } else if (Scrabble.score(array[0]) < Scrabble.score(array[1])) {
      return array[1];
    } else if (Scrabble.score(array[0]) === Scrabble.score(array[1])) {
      if (array[0].length === 7) {
        return array[0];
      } else if (array[1].length === 7) {
        return array[1];
      } else {
        if (array[0].length < array[1].length) {
          return array[0];
        } else if (array[0].length > array[1].length) {
          return array[1];
        }
        return array[0];
      }
    }
  },
};

Scrabble.Player = class {
  constructor(name) {
    if (typeof name !== 'string') {
      throw new Error('Must provide player name as a string');
    }
    this.name = name;
    this.plays = [];
  }
  play(word) {
    if (this.hasWon()) {
      return false;
    }
    Scrabble.score(word);
    this.plays.push(word);
    return true;
  }
  totalScore() {
    const total =
    this.plays.reduce(function(total, word) {
      return total + Scrabble.score(word);
    }, 0);
    return total;
  }
  hasWon() {
    if (this.totalScore() < 100) {
      return false;
    }
    return true;
  }
  highestWordScore() {
    if (this.plays.length === 0) {
      throw new Error('Requires at least one played word');
    }
    const scores =
    this.plays.map(word => Scrabble.score(word));
    return Math.max(...scores);
  }
  highestScoringWord() {
    const highest = this.highestWordScore();
    let returningWord = null;
    this.plays.forEach((word) => {
      if (Scrabble.score(word) === highest) {
        returningWord = word;
      }
    });
    return returningWord;
  }
};

module.exports = Scrabble;
