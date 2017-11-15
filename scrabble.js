
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
  // TODO: implement the Player class
};

module.exports = Scrabble;

console.log(`pig score is ${Scrabble.score('pig')}`);
console.log(`dog score is ${Scrabble.score('dog')}`);
