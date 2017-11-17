const Scrabble = {
  _isValidWord: function _isValidWord(word) {
    if ((typeof word === 'string') && (/^[a-zA-Z]+$/.test(word)) && (word.length < 8) && (word.length > 0)) {
      return true;
    } throw new Error('Invalid Word');
  },
  score: function score(word) {
    const letters = {
      1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
      2: ['D', 'G'],
      3: ['B', 'C', 'M', 'P'],
      4: ['F', 'H', 'V', 'W', 'Y'],
      5: ['K'],
      8: ['J', 'X'],
      10: ['Q', 'Z'],
    };
    const keys = Object.keys(letters);
    let totalScore = 0;
    if (this._isValidWord(word)) {
      const chars = word.toUpperCase().match(/\S/g);
      chars.forEach((element) => {
        keys.forEach((num) => {
          const numLetters = letters[num];
          if (numLetters.includes(element)) { totalScore += parseFloat(num); }
        });
      });
      if (word.length === 7) { totalScore += 50; }
    }
    return totalScore;
  },

  highestScoreFrom: function highestScoreFrom(array) {
    if ((!Array.isArray(array)) || (array.length === 0)) { throw new Error('Invalid Array'); }
    const words = array.map(word => new Scrabble.Word(word));
    words.sort(Scrabble._compareWordScores);
    const highestScore = words.pop();
    return highestScore.word;
  },
  _compareWordScores: function _compareWordScores(a, b) {
    const scoreA = a.score;
    const scoreB = b.score;
    const lengthA = a.word.length;
    const lengthB = b.word.length;

    let comparison = 0;
    if (scoreA > scoreB) { // greater score wins
      comparison = 1;
    } else if (scoreA < scoreB) { // lower score loses
      comparison = -1;
    } else if (lengthA === 7) { // tied score, 7 letter word wins
      comparison = 1;
    } else if (lengthB === 7) { // tied lose if other word is 7 letters
      comparison = -1;
    } else if (lengthA < lengthB) { // tied shorter word wins,
      comparison = 1;
    } else if (lengthA > lengthB) { // tied longer word loses
      comparison = -1;
    } else if (lengthA === lengthB) { // return first word
      comparison = 1;
    }
    return comparison;
  },
}; // end of class!

Scrabble.Player = class {
  constructor(name) {
    if (Scrabble.Player._isValidName(name)) {
      this.name = name;
      this.plays = [];
      this.words = [];
    }
  }

  static _isValidName(name) {
    if (name.length > 0) {
      return true;
    } throw new Error('Invalid Name');
  }
  play(word) {
    if (!this.hasWon()) {
      const playedWord = new Scrabble.Word(word);
      this.plays.push(playedWord.word);
      this.words.push(playedWord);
      this.totalScore();
      return playedWord.word;
    } return false;
  }
  hasWon() {
    const currentScore = this.totalScore();
    if (currentScore >= 100) {
      return true;
    } return false;
  }
  totalScore() {
    const wordScores = this.words.map(word => word.score);
    const score = wordScores.reduce((a, b) => a + b, 0);
    return score;
  }
  highestScoringWord() {
    const playerWords = this.words;
    playerWords.sort(Scrabble._compareWordScores);
    const highestScore = playerWords.pop().word;
    return highestScore;
  }

  highestWordScore() {
    const playerWords = this.words;
    playerWords.sort(Scrabble._compareWordScores);
    const highestScore = playerWords.pop().score;
    return highestScore;
  }
};


Scrabble.Word = class {
  constructor(word) {
    if (Scrabble._isValidWord(word)) {
      this.word = word;
      this.score = Scrabble.score(word);
    }
  }
};


module.exports = Scrabble;
