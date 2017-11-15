/* eslint-disable */

const Scrabble = {
  score: function(word) {
    const letterValues = {
      A: 1,
      B: 3,
      C: 3,
      D: 2,
      E: 1,
      F: 4,
      G: 2,
      H: 4,
      I: 1,
      J: 8,
      K: 5,
      L: 1,
      M: 3,
      N: 1,
      O: 1,
      P: 3,
      Q: 10,
      R: 1,
      S: 1,
      T: 1,
      U: 1,
      V: 4,
      W: 4,
      X: 8,
      Y: 4,
      Z: 10
    }

    const splitChars = function splitChars(str) {
      const chars = [];
      for (let i = 0; i < str.length; i++) {
        chars.push(str.charAt(i))
      };
      return chars;
    };

    const totalScore = function totalScore(array) {

      let total = 0;
      array.forEach((char) => {
        total += letterValues[char];
      });

      if (array.length == 7) {
        total += 50;
      }

      return total;
    }
    
    const uppercaseWord = word.toUpperCase();

    const characters = splitChars(uppercaseWord);

    return totalScore(characters);
  }
};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
