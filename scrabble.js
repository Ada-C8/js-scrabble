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

    let sum = 0;
    let wordLetterArray = uppercaseWord.split('');

    // go through each letter in the given word
    wordLetterArray.forEach((letter) => {
      let included = false;
      letterMap.forEach((value, key) => {
        // if the letter is valid, add the corresponding point to the sum
        if (letterMap.get(key).includes(letter)) {
          included = true;
          sum += key;
        }
      });
      // if it isn't a letter, throw an error
      if (!included) {
        throw new Error(`${letter} is not a letter from A-Z`);
      }
    });

  // TODO: add the highestScoreFrom method

};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
