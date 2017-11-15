/* eslint-disable */
const Scrabble = {
  score: function score(word) {
    // TODO: implement score
    if (word.length > 7 || word.length < 1){
      throw new Error(`${word} has to have 1 to 7 letters`);
    }

    const uppercaseWord = word.toUpperCase();
    const letterMap = new Map([
      [1, ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T']],
      [2, ['D', 'G']],
      [3, ['B', 'C', 'M', 'P']],
      [4, ['F', 'H', 'V', 'W', 'Y']],
      [5, ['K']],
      [8, ['J', 'X']],
      [10, ['Q', 'Z']],
    ]);

  // TODO: add the highestScoreFrom method

};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
