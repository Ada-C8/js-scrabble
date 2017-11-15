const ALPHA = /^[a-z]+$/i;

const Scrabble = {
  score(word) {
    const SCORECHART = {
      a: 1,
      b: 3,
      c: 3,
      d: 2,
      e: 1,
      f: 4,
      g: 2,
      h: 4,
      i: 1,
      j: 8,
      k: 5,
      l: 1,
      m: 3,
      n: 1,
      o: 1,
      p: 3,
      q: 10,
      r: 1,
      s: 1,
      t: 1,
      u: 1,
      v: 4,
      w: 4,
      x: 8,
      y: 4,
      z: 10,
    };
    let score = 0;

    if (typeof word === 'string' && word.length > 0 && word.length < 8) {
      if (word.length === 7) { score += 50; }
      for (let i = 0; i < word.length; i += 1) {
        if (word[i].match(ALPHA)) {
          score += parseInt(SCORECHART[word[i].toLowerCase()], 10);
        } else {
          throw new Error('Characters only');
        }
      }
    } else {
      throw new Error('Not a valid word');
    }
    return score;
  },

  highestScoreFrom(wordArray) {
    if (wordArray.length === 0) {
      throw new Error('There are no words to score');
    } else {
      const highestWords = this.highestScores(wordArray);
      return highestWords.length === 1 ? highestWords[0] : this.tiebreaker(highestWords);
    }
  },

  highestScores(wordArray) {
    const wordScores = wordArray.map(word => this.score(word));
    const highestScore = Math.max(...wordScores);
    const highestWords = [];

    wordArray.forEach((word) => {
      if (this.score(word) === highestScore) { highestWords.push(word); }
    });
    return highestWords;
  },

  tiebreaker(highestWords) {
    let highestWord = '';
    let lengthCompare = 8;

    for (let i = 0; i < highestWords.length; i += 1) {
      if (highestWords[i].length === 7) {
        highestWord = highestWords[i];
        break;
      } else if (highestWords[i].length < lengthCompare) {
        highestWord = highestWords[i];
        lengthCompare = highestWords[i].length;
      }
    }
    return highestWord;
  },

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
    if (!word.match(ALPHA) || word.length > 8) {
      throw new Error('Not a valid play');
    } else if (this.hasWon()) {
      return false;
    } else {
      if (this.plays.includes(word)) {
        throw new Error('You have already played this word');
      } else {
        this.plays.push(word);
        this.score += Scrabble.score(word);
      }
      return true;
    }
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
