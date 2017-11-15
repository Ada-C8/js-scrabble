const Scrabble = {

  score: function(word) {
    let scoringHash = { A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1,
      R: 1, S: 1, T: 1, D: 2, G: 2, B: 3, C: 3,
      M: 3, P:3, F: 4, H: 4, V: 4, W: 4, Y: 4, K: 5,
      J: 8, X: 8, Q: 10, Z: 10
    };

    let score = 0;

    if (word.length >= 1) {
      if ((/^[a-zA-Z]/.test(word)) == false) {
        throw('Word must contain only letters A-Z');
      }
    }

    let letters = word.toUpperCase().split('');

    if (letters.length == 7) {
      score += 50
    } else if (letters.length > 7) {
      throw('Maximum 7 letters are allowed!');
    // } else if (letters.length < 1) {
    //   throw('No word entered');
    }

    letters.forEach(function(letter) {
      if (/^[a-zA-Z]/.test) {
      score += scoringHash[letter];
    } else {
      throw('Word must contain only letters A-Z')
    }
  })


  return score;
},

  highestScoreFrom: function(arrayOfWords) {
    let highestScoreWord = '';
    if (arrayOfWords.length < 1) {
      throw('No words have been played yet');
    } else {
    arrayOfWords.forEach(function(word) {
      if (Scrabble.score(highestScoreWord) === 0 || Scrabble.score(word) > Scrabble.score(highestScoreWord)) {
        highestScoreWord = word;
      }
    });
    }
    return highestScoreWord;
  }
};

Scrabble.Player = class {
  constructor(name) {
    this.name = name;
    this.plays = [];
    // this.totalScore = 0;

    if (name === undefined) {
      throw('Player must have a name');
    }
  }

  play(word) {
    if (this.hasWon()) {
      return false
    } else {
    let wordScore = Scrabble.score(word);
    // this.totalScore += wordScore;
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
    if (this.totalScore >= 100) {
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


console.log(Scrabble.score('cat'));

newPlayer = new Scrabble.Player('Jeff')

newPlayer.play('apple')

console.log(newPlayer.plays)
