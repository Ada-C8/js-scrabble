const Scrabble = {
  score: function(word) {

    const letterScores = {

      A: 1, E: 1, I: 1, O: 1, U: 1,
      L: 1, N: 1, R: 1, S: 1, T: 1,
      D: 2, G: 2, B: 3, C: 3, M: 3,
      P: 3, F: 4, H: 4, V: 4, W: 4,
      Y: 4, K: 5, J: 8, X: 8, Q: 10,
      Z: 10
    };

    if (word.length > 7 || word.length === 0 || (/^[a-zA-Z]+$/.test(word) === false) ) {
      throw(`Error`);
    }

    let wordScore = 0;
    word.split("").forEach(function(letter){
      wordScore +=
      letterScores[letter.toUpperCase()]
    });
    if (word.length == 7){
      wordScore += 50;
    }
    return wordScore
  },

  highestScoreFrom: function(arrayOfWords) {

    if (arrayOfWords.length === 0){
      throw(`Error`);
    }

    let highestScore = 0;
    let highestWord = "";
    let that = this;

    arrayOfWords.forEach(function(word) {
      if (that.score(word) > highestScore){
        highestScore = that.score(word);
        highestWord = word;
      }

      if (that.score(word) == highestScore){
        if (highestWord.length != 7 && word.length == 7){
          highestWord = word;
          highestScore = that.score(word);
        }

        if (highestWord.length != 7 && word.length != 7 && highestWord.length != word.length){
          if (word.length < highestWord.length) {
            highestWord = word;
            highestScore = that.score(word);
          }
        }
      }
    });
    return highestWord;
  },
};

Scrabble.Player = class {
  constructor(name) {
    if (!name) {
      throw('Player must have a name!');
    }
    this.name = name;
    this.plays = [];
    this._totalScore = 0;
  }
  play(word) {
    if (this.hasWon()) {
      return false;
    }
    this._totalScore += Scrabble.score(word);
    this.plays.push(word);
    return true;
  }

  totalScore() {
    return this._totalScore;
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
