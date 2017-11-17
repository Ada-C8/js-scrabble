const letterScores = {
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

const ErrorMsg = function ErrorMsg(value) {
  this.value = value;
  this.message = 'is not valid';
  this.toString = () => `${this.value} ${this.message}`;
};

const Scrabble = {
  score(word) {
    if ((/^[a-zA-Z]+$/.test(word) === false) || (word.length > 7) || (word === '')) {
      throw new ErrorMsg(word);
    }

    let wordScore = 0;
    word.toLowerCase().split('').forEach((letter) => {
      const result = letterScores[letter];
      wordScore += result;
    });

    if (word.length === 7) {
      return (wordScore + 50);
    }
    return wordScore;
  },

  highestScoreFrom(wordsArray) {
    if ((wordsArray.length === 0) || (Array.isArray(wordsArray) === false)) {
      throw new ErrorMsg(wordsArray);
    }

    let highestWord = wordsArray[0];
    let highestScore = this.score(highestWord);
    // for (let i = 0; i < wordsArray.length; i += 1) {
    wordsArray.forEach((word) => {
      const playedWord = word;
      const getScore = this.score(playedWord);
      const wordLength = playedWord.length;

      if ((getScore > highestScore) || (getScore === highestScore && wordLength === 7) || (getScore === highestScore && wordLength < highestWord.length && highestWord.length !== 7)) {
        highestWord = playedWord;
        highestScore = getScore;
      }
    });
    return highestWord;
  },
};

Scrabble.Player = class {
  constructor(name) {
    if (name == null) {
      throw new ErrorMsg(name);
    }
    this.name = name;
    this.plays = [];
  }

  play(word) {
    if (this.hasWon() === true) {
      return false;
    }
    if (word == null || typeof word !== 'string') {
      throw new ErrorMsg(word);
    }
    this.plays.push(word);
    return true;
  }

  totalScore() {
    let totalScore = 0;
    this.plays.forEach((word) => {
      totalScore += Scrabble.score(word);
    });
    return totalScore;
  }

  hasWon() {
    if (this.totalScore() >= 100) {
      return true;
    }
    return false;
  }

  highestScoringWord() {
    if (this.plays === []) {
      throw new ErrorMsg(this.plays);
    }
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    if (this.plays === []) {
      throw new ErrorMsg(this.plays);
    }
    return Scrabble.score(this.highestScoringWord());
  }
};


module.exports = Scrabble;
