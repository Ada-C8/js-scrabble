const scores = {
  A:1, B:3, C:3, D:2, E:1, F:4, G:2, H:4, I:1, J:8, K:5, L:1, M:3, N:1, O:1, P:3, Q:10, R:1, S:1, T:1, U:1, V:4, W:4, X:8, Y:4, Z:10
};

const Scrabble = {
  score: function(word){
    let scoreTotal = 0;

    // regex below should return false for white space, non a-zA-Z characters, 1 letter or 7+ letter words
    if (/^[a-zA-Z]{2,7}$/.test(word)){
      for (let letter of word) {
        scoreTotal += scores[letter.toUpperCase()];
      }
      if (word.length === 7){
        scoreTotal += 50;
      }
    } else {
      throw `Users word '${word}' was not playable. Scrabble words must be between 2-7 letters, contain no white space, and may not have non-alphabet characters.`;
    }
    return scoreTotal;
  },

  highestScoreFrom: function(arrayOfWords){
    // this if statement will throw an exception is any of the following are true (1) it is undefined (2) the length = 0 (3) the input is not an array
    if (arrayOfWords === undefined || arrayOfWords.length === 0 || !Array.isArray(arrayOfWords)) {
      throw `Error: Input in ${this.name} must be data type Array and must have at least one element`;
    }
  }
  // TODO: add the highestScoreFrom method

};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;

Scrabble.score('dog')
