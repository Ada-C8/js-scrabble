const Scrabble = {

  score: function(word) {
    let scoringHash = { A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1,
      R: 1, S: 1, T: 1, D: 2, G: 2, B: 3, C: 3,
      M: 3, P:3, F: 4, H: 4, V: 4, W: 4, Y: 4, K: 5,
      J: 8, X: 8, Q: 10, Z: 10
    };

    let score = 0;

    if (word.length < 1) {
      throw new Error ('Cannot score - no word entered');
    }

    if (word.length >= 1) {
      if ((/^[a-zA-Z]+$/.test(word)) == false) {
        throw('Word must contain only letters A-Z');
      }
    }

    let letters = word.toUpperCase().split('');

    if (letters.length == 7) {
      score += 50
    } else if (letters.length > 7) {
      throw('Maximum 7 letters are allowed!');
    }

    letters.forEach(function(letter) {
      score += scoringHash[letter];
  })

  return score;
},

  highestScoreFrom: function(arrayOfWords) {
    let highestScoreWord = '';
    if (arrayOfWords.length < 1) {
      throw('No words have been played yet');
    } else {
      arrayOfWords.forEach(function(word) {
        if (highestScoreWord === '' || Scrabble.score(word) > Scrabble.score(highestScoreWord)) {
          highestScoreWord = word;
        }
        else if (Scrabble.score(word) === Scrabble.score(highestScoreWord)) {
          if (word.length === 7 && word.length > highestScoreWord.length) {
            highestScoreWord = word;
          } else if (highestScoreWord.length < 7 && word.length < highestScoreWord.length) {
            highestScoreWord = word;
          }
        }
      }
    )}

    return highestScoreWord;
  }
};

Scrabble.Player = class {
  constructor(name) {
    this.name = name;
    this.plays = [];

    if (name === undefined) {
      throw('Player must have a name');
    }
  }

  play(word) {
    if (this.hasWon() === true) {
      return false;
    } else {
    let wordScore = Scrabble.score(word);
    this.plays.push(word);
    return true;
    }
  };

  highestScoringWord(plays) {
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    return Scrabble.score(this.highestScoringWord(this.plays));
  }

  hasWon() {
    if (this.totalScore() >= 100) {
      return true;
    } else {
      return false;
    }
  }

  totalScore() {
    let total = 0;
    let allPlays = this.plays

    if (allPlays === undefined) {
      return total;
    } else {
    allPlays.forEach(function(word) {
      total += Scrabble.score(word);
    });
    }
    return total
  }

};

module.exports = Scrabble;
