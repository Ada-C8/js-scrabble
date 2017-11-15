// 'use strict';
// var prompt = require('prompt');
const LETTER_VALUES = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1, m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10
};

const UserException = function UserException(message) {
  this.message = message;
  this.name = 'UserException';
};

const checkValidity = function checkValidity(char) {
  if (!(char in LETTER_VALUES)) {
    throw new UserException(`${char} is an invalid character`);
  }
};

const Scrabble = {
  score: function(word) {
    if (word.length > 7 || word.length < 1) {
      throw new UserException(`Invalid word, must be greater than 1 character and less than 7 characters.`);
    }

    let score = 0;
    let letter = word.toLowerCase().split("");
    letter.forEach(function(char) {
      checkValidity(char);
      score += LETTER_VALUES[char];
    });
    if (word.length == 7) {
      score += 50;
    }
    return score;
  },

  highestScoreFrom: function(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw new UserException(`Uh-oh! No words!`);
    }
    if (arrayOfWords.length === 1) {
      return arrayOfWords.toString();
    }

    let highestWord = arrayOfWords[0];

    for (let word of arrayOfWords) {
      let highScore = Scrabble.score(highestWord);
      let newWord = Scrabble.score(word);

      if (highScore < newWord) {
        highestWord = word;
      } else if (highScore === newWord) {
        if (word.length === 7) {
          highestWord = word;
        } else if (highestWord.length === 7) {
        } else if (word.length < highestWord.length) {
          highestWord = word;
        }
      }
    }
    return highestWord;
  },
};

Scrabble.Player = class {
  constructor(name) {
    if (name.length === 0) {
      throw new UserException(`Please enter a name!`);
    }
    this.name = name;
    this.playingScore = 0;
    this.plays = [];

  }

  hasWon() {
    return this.playingScore >= 100;
  }

  play(word) {
    if (this.hasWon() === true) {
      // wont allow to play a word if already won (higher than 100 points)
      return false;
    }
    let letter = word.toLowerCase().split("");
    letter.forEach(function(char) {
      checkValidity(char);
    });
    this.plays.push(word);
    this.playingScore += Scrabble.score(word);
    return true;
  }

  totalScore() {
    return this.playingScore;
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    return Scrabble.score(this.highestScoringWord());
  }

};

// prompt.start();
// prompt.get(['word'], function(error, result){
//   let score = Scrabble.score(result.word);
//   console.log(score);
// });

module.exports = Scrabble;
// where to store the letter value
