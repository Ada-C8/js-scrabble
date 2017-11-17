function UserException(message) {
  this.message = message;
  this.name = 'UserException'
};

const letterPoints = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
};

const Scrabble = {
  score: function(word) {

    if(word.length > 7) {
      throw new UserException("Word is Too Long");
    } else if (word.length === 0) {
      throw new UserException("You must enter a word to be scored");
    } else if (word.match(/[^a-z]+/i)) {
      throw new UserException("Word can only contain letters");
    }

    let total = 0;

    word = word.toUpperCase();

    for(let i = 0; i < word.length; i++){
      total += letterPoints[word[i]];
    }

    if(word.length === 7){
      total += 50;
    }

    return total;

  },

  tieBreak: function(a, b) {
    if(a.length === 7){
      return a;
    } else if(b.length === 7){
      return b;
    } else if(a.length > b.length) {
      return b;
    } else {
      return a;
    }
  },

  highestScoreFrom: function(words) {

    if(words.length === 0) {
      throw new UserException("Array is Empty");
    } else if (typeof words != 'object') {
      throw new UserException("You must enter an array");
    }

    if(words.length === 1) {
      return words[0];
    } else if(words.length >= 2) {

      let highestScoringWord = "";
      let highestScore = 0;

      words.forEach(function (word) {

        if(Scrabble.score(word) > highestScore){
          highestScoringWord = word;
          highestScore = Scrabble.score(word);
        }
        else if (Scrabble.score(word) === highestScore) {
          highestScoringWord = Scrabble.tieBreak(highestScoringWord, word);
        }
      });
      return highestScoringWord;
    }
  }
};


Scrabble.Player = class  {
  constructor(name) {
    if(name === undefined){
      throw new UserException("Must Include a Name");
    }
    this.name = name;
    this.plays = [];
  }

  totalScore() {
    let playerScore = 0;
    this.plays.forEach(function (word) {
      playerScore += Scrabble.score(word);
    });
    return playerScore;
  }

  hasWon() {
    let score = this.totalScore();
    if(score >= 100) {
      return true;
    } else {
      return false;
    }
  }

  play(word) {
    if(word.length > 7) {
      throw new UserException("Word is Too Long");
    } else if (word.length === 0) {
      throw new UserException("You must enter a word");
    } else if (word.match(/[^a-z]+/i)) {
      throw new UserException("Word can only contain letters");
    }

    if( (this.plays.length > 0) && (this.hasWon() === true)) {
      return false;
    } else {
      this.plays.push(word);
      return true;
    }
  };

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    return Scrabble.score(Scrabble.highestScoreFrom(this.plays));
  }

};

module.exports = Scrabble;
