// const values = {
//   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
//   2: ['D', 'G'],
//   3: ['B', 'C', 'M', 'P'],
//   4: ['F', 'H', 'V', 'W', 'Y'],
//   5: ['K'],
//   8: ['J', 'X'],
//   10: ['Q', 'Z']
// };

// const values = {
// A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1, D: 2, G: 2, B: 3, C: 3, M: 3, P: 3, F: 4, H: 4, V: 4, W: 4, Y: 4, K: 5, J: 8, X: 8, Q: 10, Z: 10
// };

// =======================================================

const Scrabble = {

  score(word) {
    let score = 0;

    if (/^[a-zA-Z]+$/.test(word)) {
    } else {
      throw new Error ('invalid word');
    }

    if (word.length > 7 || word.length === 0) {
      throw new Error ('invalid word');
    }

    if (word.length === 7) {
      score += 50;
    } else {
      score = 0;
    }

    const upperCase = word.toUpperCase();
    const letterArray = upperCase.split('');

    letterArray.forEach((letter) => {

      switch (letter) {
        case 'A':
        case 'E':
        case 'I':
        case 'O':
        case 'U':
        case 'L':
        case 'N':
        case 'R':
        case 'S':
        case 'T':
          score += 1;
          break;

        case 'D':
        case 'G':
          score += 2;
          break;

        case 'B':
        case 'C':
        case 'M':
        case 'P':
          score += 3;
          break;

        case 'F':
        case 'H':
        case 'V':
        case 'W':
        case 'Y':
          score += 4;
          break;

        case 'K':
          score += 5;
          break;

        case 'J':
        case 'X':
          score += 8;
          break;

        case 'Q':
        case 'Z':
          score += 10;
          break;

        default:
          throw new Error ('invalid letter');
      }
    });
    return score;
  },


  highestScoreFrom(wordsArray) {
  }


};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;

// console.log(Scrabble.score('apple'));
