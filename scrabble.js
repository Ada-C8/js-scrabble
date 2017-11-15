
const Scrabble = {

  // score: function(word) {
    score(word) {
      const lowerWord = word.toLowerCase();

      if (typeof word.length === 0 || word.length > 7 || /^[a-zA-Z]+$/.test(word) === false ) {
      throw { name: 'NotWordError', message: 'word must include only letters' };
    }

    const letterScores = {
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
      z: 10
    };

    let totalScore = 0;

    for (let i = 0; i < lowerWord.length; i++) {
      totalScore += letterScores[lowerWord[i]];
    }

    if (lowerWord.length === 7) {
      totalScore += 50;
    }
    return totalScore;
  },

  highestScoreFrom(words) {
    if (Array.isArray(words) === false || words.length === 0) {
    throw { name: 'NoWordsError', message: 'must input array of words to determine highest scoring word' };
  }

    let winner = words[0];
    for (let word of words) {
      if (this.score(word) > this.score(winner)) {
        winner = word;
      } else if (this.score(word) === this.score(winner) && winner.length < 7 && word.length === 7) {
        winner = word;
      } else if (this.score(word) === this.score(winner) && winner.length < 7 && word.length < winner.length) {
        winner = word;
      }
    }
    return winner;
  },

};

Scrabble.Player = class {
  constructor(name) {
    if (typeof name === 'string' && name.length > 0) {
      this.name = name;
      this.plays = [];
    } else {
      throw { name: 'InvalidInputError', message: 'must enter a name' };
    }
  }

  totalScore() {
    let totalScore = 0;
      for (let word of this.plays) {
      totalScore += Scrabble.score(word);
      }
    return totalScore;
  }

  hasWon() {
    if (this.totalScore() < 100) {
      return false;
    } else {
      return true;
    }
  }

  play(word) {
    if (this.hasWon() === true) {
      return false;
    }
    if (typeof word === 'string' && word.length > 0) {
      return this.plays.push(word);
    } else {
      throw { name: 'InvalidInputError', message: 'must enter a word' };
    }
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    const winningWord = this.highestScoringWord();
    return Scrabble.score(winningWord);
  }
};

module.exports = Scrabble;

let sally = new Scrabble.Player('Sally');
console.log(sally.name);
console.log(sally.plays);

sally.play('dog');
console.log(sally.plays);
console.log(sally.plays[0]);
console.log(sally.plays.length);
sally.play('zzzz');
console.log(sally.highestScoringWord());
console.log(sally.highestWordScore());
