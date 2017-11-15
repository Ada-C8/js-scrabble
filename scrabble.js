/* eslint-disable */

const Scrabble = {
  score: function(word) {
    let score = 0;
    const ALPHA = /^[a-z]+$/i;
    const SCORECHART = {
      a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8,
      k: 5, l: 1, m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1,
      u: 1, v: 4, w: 4, x: 8, y: 4, z: 10,
    };

    if (typeof word === 'string' && word.length > 0 && word.length < 8) {
      if (word.length === 7) {
        score += 50;
      }

      for (i = 0; i < word.length; i++) {
        let letter = word[i]
        if (letter.match(ALPHA)) {
          score += parseInt(SCORECHART[letter.toLowerCase()]);
        }
        else {
          throw new Error('Characters only');
        }
      }
      return score;
    } else {
      throw new Error('Not a valid word');
    }
  },

  highestScoreFrom: function(wordArray) {
    if (wordArray.length === 0) {
      throw new Error('There are no words to score');
    }
    else if (wordArray.length === 1) {
      return wordArray[0];
    }
    else {
      let highestWords = this.highestScores(wordArray);

      return highestWords.length === 1 ? highestWords[0] : this.tiebreaker(highestWords);
    }
  },

  highestScores: function(wordArray) {
    let wordScores = wordArray.map((word) => {
      return this.score(word);
    });

    const highestScore = Math.max(...wordScores);
    let highestWords = [];

    wordArray.forEach((word) => {
      if (this.score(word) == highestScore) {
        highestWords.push(word);
      }
    });
    return highestWords;
  },

  tiebreaker: function(highestWords) {
    let highestWord = '';
    let lengthCompare = 8;

    for (i = 0; i < highestWords.length; i++) {
      if (highestWords[i].length === 7) {
        highestWord = highestWords[i];
        break;
      }
      else if (highestWords[i].length < lengthCompare) {
        highestWord = highestWords[i];
        lengthCompare = highestWords[i].length;
      }
    }
    return highestWord;
  }

};

Scrabble.Player = class {
  constructor(name = null) {
    if (name === null) {
      throw new Error('Please enter a name');
    }
    this.name = name;
    this.plays = [];
    this.score = 0;
  }

  play(word) {
    if (this.hasWon()) {
      return false;
    }

    word.toLowerCase();
    if (word.length > 8) {
      throw new Error('You cannot play a word longer than 7 letters');
    }
    else if (this.plays.includes(word)) {
      throw new Error('You have alreayd played this word');
    }
    else {
      this.plays.push(word);
      this.score += Scrabble.score(word);
    }
    return true;
  }

  hasWon() {
    return this.score >= 100;
  }

  totalScore() {
    return this.score;
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    return Scrabble.score(Scrabble.highestScoreFrom(this.plays));
  }

};

module.exports = Scrabble;
