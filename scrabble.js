const UserException = function UserException(message) {
  this.message = message;
  this.name = 'UserException';
};

const Scrabble = {
  invalidWord(word) {
    if (!/^[a-z]{1,7}$/i.test(word)) {
      throw new UserException('invalid word, please try again');
    }
  },

  scores: {
    A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
  },

  score(word) {
    // console.log(this.invalidWord);
    this.invalidWord(word);

    const chars = word.toUpperCase().split('');
    let score = 0;
    if (chars.length === 7) {
      score += 50;
    }

    // .charAt() ??
    chars.forEach((char) => {
      score += this.scores[char];
    });
    return score;
    // console.log(score);
  },

  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw new UserException('no words given');
    }

    let highestScoringWord = arrayOfWords[0];

    arrayOfWords.forEach((word) => {
      // console.log(`${this}`); // returns the .forEach function [object global]
      const highScore = this.score(highestScoringWord);
      const score = this.score(word);

      if (score > highScore) {
        highestScoringWord = word;
      } else if (score === highScore) {
        if (word.length === 7) {
          highestScoringWord = word;
        } else if (highestScoringWord.length === 7) {
          // how do you make this look good?
        } else if (word.length < highestScoringWord.length) {
          highestScoringWord = word;
        }
      }
    });
    return highestScoringWord;
  },
};

Scrabble.Player = class {
  constructor(name) {
    if (!name) {
      throw new UserException('Player must have a name');
    }

    this.name = name;
    this.plays = [];
    this._totalScore = 0;
  }

  totalScore() {
    return this._totalScore;
  }

  play(word) {
    if (this.hasWon()) {
      return false;
    }
    this._totalScore += Scrabble.score(word);
    this.plays.push(word);
    return true;
  }

  hasWon() {
    return (this._totalScore >= 100) ? true : false
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    return Scrabble.score(this.highestScoringWord());
  }
};

Scrabble.Tilebag = class {
  constructor() {
    this.allTiles = {
      A:9, B:2, C:2, D:4, E:12, F:2, G:3, H:2, I:9, J:1, K:1, L:4, M:2, N:6, O:8, P:2, Q:1, R:6, S:4, T:6, U:4, V:2, W:2, X:1, Y:2, Z:1
    };
  }

  tilesRemaining() {
    let sum = Object.values(this.allTiles).reduce((a,b) => a + b, 0);
    return sum
  }

  drawTiles(num) {
    let arr = []

    for (let i = 0; i < num; i ++) {
      let choice = this.randomLetter();
      while (this.allTiles.choice === 0) {
        choice = this.randomLetter();
      }
      arr.push(choice)
      this.allTiles[choice] -= 1;
    }
    return arr
  }

  randomLetter() {
    let keys = Object.keys(this.allTiles);
    return keys[ keys.length * Math.random() << 0];
  }

};

module.exports = Scrabble;

// Scrabble.highestScoreFrom(['cat'])
