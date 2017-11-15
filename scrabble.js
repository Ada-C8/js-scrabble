/* eslint-disable */

const Scrabble = {
  score: function(word) {
    const SCORECHART = {
      a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8,
      k: 5, l: 1, m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1,
      u: 1, v: 4, w: 4, x: 8, y: 4, z: 10,
    };

    let scoreWord = word;
    const ALPHA = /^[a-z0-9]+$/i;

    if (typeof word === 'string' && word.length > 0 && word.length < 8) {
      scoreWord = word.toLowerCase();
    } else {
      throw new Error('Not a valid word');
    }

    let score = 0;
    if (scoreWord.length === 7) {
      score = 50;
    }

    for (i = 0; i < scoreWord.length; i++) {
      let letter = scoreWord[i]
      if (letter.match(ALPHA)) {
        score += parseInt(SCORECHART[letter]);
      } else {
        throw new Error('Characters only');
      }
    }
    return score;
  },

  highestScoreFrom: function(wordArray) {
    if (wordArray.length === 0) {
      throw new Error('There are no words given');
    }
    else if (wordArray.length === 1) {
      return wordArray[0];
    }
    else {
      wordArray.forEach((word) => {
      });
    }
  }

};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;

console.log(Scrabble.score('WORD'));
console.log(Scrabble.highestScoreFrom(['WORD', 'Banana', 'Elf']));
