const LETTER_VALUES = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10,
};

const UserException = function userException(message) {
  this.message = message;
  this.name = 'UserException';
};

const Scrabble = {

  score: function score(word) {
    if (word.length > 7) {
      throw new UserException('Words longer than 7 letters are not allowed.');
    } else if (!(/^[a-zA-Z]+$/.test(word))) {
      throw new UserException('You must provide a valid word.');
    } else {
      let points = 0;
      word.split('').forEach((char) => {
        points += LETTER_VALUES[`${char.toLowerCase()}`];
      });
      if (word.length === 7) {
        points += 50;
      }
      return points;
    }
  },

  tie: function tie(word, maxWord) {
    if (((word.length === 7) && (maxWord.length !== 7)) || ((word.length < maxWord.length) && (maxWord.length !== 7))) {
      maxWord = word;
    }
    return maxWord;
  },

  highestScoreFrom: function highestScoreFrom(words) {
    let maxScore = 0;
    let maxWord = '';
    if (words.length === 0) {
      throw new UserException('You must provide words to score.');
    } else {
      words.forEach((word) => {
        if (this.score(word) === maxScore) {
          maxWord = this.tie(word, maxWord);
          maxScore = this.score(maxWord);
        } else if (this.score(word) > maxScore) {
          maxScore = this.score(word);
          maxWord = word;
        }
      });
      return maxWord;
    }
  },
};

Scrabble.Player = class {
  constructor(name) {
    if (name === undefined) {
      throw new UserException('You must provide a name');
    }
    this.name = name;
    this.plays = [];
  }

  play(word) {
    if (word === undefined || !(/^[a-zA-Z]+$/.test(word))) {
      throw new UserException('You must provide a word');
    } else if (this.hasWon()) {
      return false;
    } else {
      this.plays.push(word);
      return true;
    }
  }

  hasWon() {
    if (this.totalScore() >= 100) {
      return true;
    } else {
      return false;
    }
  }

  totalScore() {
    let result = 0;
    this.plays.forEach((word) => {
      result += Scrabble.score(word);
    });
    return result;
  }

  highestScoringWord() {
    let highestWord = Scrabble.highestScoreFrom(this.plays);
    return highestWord;
  }

  highestWordScore() {
    let highestWordScore = Scrabble.score(this.highestScoringWord());
    return highestWordScore;
  }
};

module.exports = Scrabble;
