// 'use strict';
//
// const prompt = require('prompt');

const scores = {
  A:1, B:3, C:3, D:2, E:1, F:4, G:2, H:4, I:1, J:8, K:5, L:1, M:3, N:1, O:1, P:3, Q:10, R:1, S:1, T:1, U:1, V:4, W:4, X:8, Y:4, Z:10
};

const UserException = function UserException(message) {
  this.message = message
  this.name = 'UserException'
}

const Scrabble = {
  // scores: {
  //   A:1, B:3, C:3, D:2, E:1, F:4, G:2, H:4, I:1, J:8, K:5, L:1, M:3, N:1, O:1, P:3, Q:10, R:1, S:1, T:1, U:1, V:4, W:4, X:8, Y:4, Z:10
  // },

  score(word) {
    if (word.length > 7) {
      throw new UserException('too many letters')
    }

    let chars = word.toUpperCase().split('');
    let score = 0;
    if (chars.length === 7) {
      score += 50;
    }

    // .charAt() ??
    chars.forEach( function(char) {
      score += scores[char];
    });
    return score;
    // console.log(score);
  },

  highestScoreFrom(arrayOfWords) {
    let highestScoringWord = arrayOfWords[0]
    arrayOfWords.forEach( function(word) {
      let highScore = Scrabble.score(highestScoringWord);
      let score = Scrabble.score(word);

      if ( score > highScore ) {
        highestScoringWord = word
      } else if (score === highScore) {
        if (word.length === 7){
          highestScoringWord = word
        } else if (highestScoringWord.length === 7) {

        } else if (word.length < highestScoringWord.length) {
          highestScoringWord = word
        }
      }
    });
    return highestScoringWord;
  }
};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
