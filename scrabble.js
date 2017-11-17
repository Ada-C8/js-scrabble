const LETTERVALUE = {
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


const Scrabble = {
  score: function(word) {

    let letters = word.toUpperCase().split('');
    let wordScore = 0;

    letters.forEach(function(letter) {
      if (!(letter in LETTERVALUE)) {
        throw 'Letters only!'
      };
      wordScore += LETTERVALUE[letter];
    });

    if (word.length > 7) {
      throw 'Your word is too long, 7 letters or less please.';
    } else if (word.length === 0) {
      throw 'Your word is too short, did you even play any letters?';
    } else if (word.length === 7) {
      wordScore += 50;
    };

    return wordScore;
  },

  highestScoreFrom: function(arrayOfWords) {
    let wordOne = arrayOfWords[0];
    let wordTwo = arrayOfWords[1];

    if (arrayOfWords.length === 0 || !Array.isArray(arrayOfWords)) {
      throw 'No words have been played. Absolutely none.';
    } else if (arrayOfWords.length === 1) {
      return wordOne;
    };

    let wordOneScore = this.score(wordOne);
    let wordTwoScore = this.score(wordTwo);

    if (wordOneScore > wordTwoScore) {
      return wordOne;
    } else if (wordOneScore < wordTwoScore) {
      return wordTwo;
    } else if (wordOneScore === wordTwoScore) {
      if (wordOne.length === 7 ) {
        return wordOne;
      } else if (wordTwo.length === 7) {
        return wordTwo;
      } else if (wordOne.length < wordTwo.length) {
        return wordOne;
      } else if (wordTwo.length < wordOne.length) {
        return wordTwo;
      } else if (wordOne.length === wordTwo.length) {
        return wordOne;
      };
    }
  }
};

Scrabble.Player = class {
  constructor(name) {
    if (!name) {
      throw 'A name please!'
    };

    this.name = name;
    this.plays = [];
  }

  play(word) {
    if (this.hasWon() === true) {
      return false;
    };

    if (!word || typeof word !== 'string') {
      throw 'That is not a valid word, please try again.'
    };

    this.plays.push(word);
    return true;
  }

  totalScore() {
    let total = 0;
    for (let word of this.plays) {
      total += Scrabble.score(word);
    };
    return total;
  }

  hasWon() {
    if(this.totalScore() >= 100) {
      return true;
    } else {
      return false;
    };
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore(){
    return Scrabble.score(this.highestScoringWord());
  }

};

module.exports = Scrabble;
