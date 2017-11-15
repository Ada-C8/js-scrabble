const Scrabble = {
  score: function(word) {
    let score = 0;
    validateWord(word);
    const wordArray = word.toLowerCase().split('');
    wordArray.forEach((letter) => {
      Object.keys(scoreChart).forEach((key) => {
        if (scoreChart[key].includes(letter)) {score += parseInt(key)}
      });
    });
    if (wordArray.length === 7) {
      score += 50;
    }
    return score;
  },
  highestScoreFrom: function(arrayOfWords) {
    validateArray(arrayOfWords);
    let highestScoringWord = arrayOfWords[0];
    arrayOfWords.forEach((word) => {
      if (Scrabble.score(word) > Scrabble.score(highestScoringWord)) {
        highestScoringWord = word;
      } else if (Scrabble.score(word) === Scrabble.score(highestScoringWord)) {
        if (word.length === 7) {
          highestScoringWord = word
        } else if (highestScoringWord.length === 7) {
        } else if (word.length < highestScoringWord.length) {
          highestScoringWord = word
        };
      };
    });
    return highestScoringWord;
  },
  Player: class Player {
    constructor(name) {
      validateExistence(name);
      this.name = name;
      this.plays = [];
    }
    play(word) {
      validateExistence(word);
      validateWord(word);
      if (this.hasWon()) {
        return false;
      } else {
        this.plays.push(word);
        return this.plays;
      };
    }
    totalScore() {
      let total = 0;
      this.plays.forEach((word) => {
        total += Scrabble.score(word)
      });
      return total;
    }
    hasWon() {
      return (this.totalScore() >= 100);
    }
    highestScoringWord(){
      return Scrabble.highestScoreFrom(this.plays);
    }
    highestWordScore() {
      return Scrabble.score(this.highestScoringWord());
    }
  },
};

//helper methods for validations//
function validateWord(word) {
  if (word.length > 7 || word.length === 0 || /[^a-zA-Z]/.test(word)) {
    throw 'That is an invalid word. Words must be between 1 and 7 letters with only alphabetic characters.';
  };
};

function validateArray(array) {
  if (array.length === 0 || Array.isArray(array) === false) {
    throw 'Um, you have to give words.';
  };
}

function validateExistence(thing) {
  if (null == thing) {
    throw "You must provide input.";
  };
};

//score chart//
const scoreChart = {
  1: ['a', 'e', 'i', 'o', 'u', 'l', 'n', 'r', 's', 't'],
  2: ['d', 'g'],
  3: ['b', 'c', 'm', 'p'],
  4: ['f', 'h', 'v', 'w', 'y'],
  5: ['k'],
  8: ['j', 'x'],
  10: ['q', 'z'],
};

module.exports = Scrabble;
