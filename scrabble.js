const Scrabble = {
  score: function(word) {

    const POINTS = {
      A: 1, B: 3, C: 3, D: 2, E: 1, F: 4,
      G: 2, H: 4, I: 1, J: 8, K: 5, L: 1,
      M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1,
      S: 1, T: 1, U: 1, V: 4, W: 4, X: 8,
      Y: 4, Z: 10
    };

    let letters = word.toUpperCase().split('');
    let wordScore = 0;

    letters.forEach(function(letter) {
      if (!(letter in POINTS)) {
        throw 'Word includes an invalid character.'
      };
      wordScore += POINTS[letter];
    });

    if (word.length > 7) {
      throw 'Word is too long.';
    } else if (word.length === 0) {
      throw 'Word is too short.';
    } else if (word.length === 7) {
      wordScore += 50;
    };

    return wordScore;
  },

  highestScoreFrom: function(arrayOfWords) {
    let firstWord = arrayOfWords[0];
    let secondWord = arrayOfWords[1];

    if (arrayOfWords.length === 0 || !Array.isArray(arrayOfWords)) {
      throw 'No words have been played.';
    } else if (arrayOfWords.length === 1) {
      return firstWord;
    };

    let firstWordScore = this.score(firstWord);
    let secondWordScore = this.score(secondWord);

    if (firstWordScore > secondWordScore) {
      return firstWord;
    } else if (firstWordScore < secondWordScore) {
      return secondWord;
    } else if (firstWordScore === secondWordScore) {
      if (firstWord.length === 7 ) {
        return firstWord;
      } else if (secondWord.length == 7) {
        return secondWord;
      } else if (firstWord.length < secondWord.length) {
        return firstWord;
      } else if (secondWord.length < firstWord.length) {
        return secondWord;
      } else if (firstWord.length === secondWord.length) {
        return firstWord;
      };
    }
  }
};

Scrabble.Player = class {
  constructor(name) {
    this.name = name;
    this.plays = [];

    if (!name) {
      throw 'You must enter a player\'s name'
    };
  }
  play(word) {
    if (!word || typeof word !== 'string'){
      throw 'Please enter a valid word.'
    };

    if (this.hasWon() === true) {
      return false;
    };

    this.plays.push(word);
    return this.plays;
  }

  totalScore() {
    let total = 0;
    if (this.plays.length === 0) {
      return total;
    } else {
      this.plays.forEach(function (word) {
        total += Scrabble.score(word)
      });
      return total;
    };
  }

  hasWon() {
    if (this.totalScore() >= 100) {
      return true;
    } else {
      return false;
    };
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    if (Scrabble.score(this.highestScoringWord()) < 1) {
      throw 'There isn\'t a word to score!'
    }

    return Scrabble.score(this.highestScoringWord());
  }
};

module.exports = Scrabble;
