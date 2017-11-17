const Scrabble = {
  values: {
    A: 1, B: 3, C: 3, D:2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5,
    L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4,
    W: 4, X: 8, Y: 4, Z: 10,
  },
  score: function(word) {
    // TODO: implement score //score(word): returns the total score value for the given word. The word is input as a string (case insensitive). The chart below shows the point value for a given letter

    let totalScore = 0;
    let regex = /^[a-zA-Z]+$/;

    word = word.toUpperCase();

    if (regex.test(word) != true) {
      throw 'Error';
    }
    // score adds 50 points for a 7-letter word
    if (word.length == 7) {
      totalScore += 50;
    } else if (word.length > 7) {
      throw 'Error';
    }
    // calculates score value for the given word
    for (let letter of word) {
      totalScore += this.values[letter];
    }
    return totalScore;
  },

  // TODO: add the highestScoreFrom method //  returns the word in the array with the highest score
  highestScoreFrom: function(arrayOfWords) {
    let scores = [];
    if (arrayOfWords.length == 0) {
      throw 'Error';
    }

    for (let word of arrayOfWords) {
      wordScore = this.score(word);
      // scores.word = wordScore;
      scores.push(wordScore);
    }

    highestScoreIndex = scores.indexOf(Math.max(...scores));

    highestScore = Math.max(...scores);

    let tieIndices = [];
    for (let i = 0; i < scores.length; i++) {
      if (scores[i] == highestScore) {
        tieIndices.push(i);
      }
    }
    let tieBreaker = '';
    for (let i = 0; i < tieIndices.length; i++) {
      if (arrayOfWords[tieIndices[i]].length == 7 ) {
        return arrayOfWords[tieIndices[i]];
      }

    }
    // return shortest string
    // var arr = ['cats', 'giants', 'daughters', 'ice'];
    // var min = Math.min(...arr.map(({ length }) => length));
    // console.log(min);

    // let tieIndices = scores.filter(function(score){
    //   return score == scores[highestScoreIndex];
    // });
    // console.log(`ties:${tieIndices}`);
    if (arrayOfWords.length < 2) {
      return arrayOfWords[0];
    // } else if () {

    } else {
        return arrayOfWords[highestScoreIndex];
    }
  }

};

Scrabble.Player = class {
  // TODO: implement the Player class
  constructor(name) {
    this.name = name;
    this.plays = [];
    if (this.name == null) {
      throw 'Error';
    }
  }

  play(word) {
      if (this.hasWon() === true) {
        return false;
      }
      if (typeof word !== 'string') {
        throw 'Error';
      } else {
          return this.plays.push(word);
      }
  }

  totalScore() {
    let total = 0;
    for (let word of this.plays) {
      total += Scrabble.score(word);
    }
    return total;
  }

  hasWon() {
    // returns `true` if the player has over 100 points, otherwise returns `false`
    if (this.totalScore() >= 100) {
      return true;
    } else {
      return false;
    }
  }

  highestScoringWord() {
    // method which returns the highest scoring word the user has played
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    // returns the `highestScoringWord` score
    return Scrabble.score(Scrabble.highestScoreFrom(this.plays));
  }
};

module.exports = Scrabble;

Scrabble.highestScoreFrom(['dog', 'pig','zzzzzz','iiiiddd']);
