/* eslint-disable */

const Scrabble = {
  score: function score(word) {
    const letters = {
      1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
      2: ['D', 'G'],
      3: ['B', 'C', 'M', 'P'],
      4: ['F', 'H', 'V', 'W', 'Y'],
      5: ['K'],
      8: ['J', 'X'],
      10: ['Q', 'Z']
    };
    const keys = Object.keys(letters);
    console.log(keys);
    let totalScore = 0;
    console.log('score starting');
    if (/^[a-zA-Z]+$/.test(word)) {

    }
    if (((typeof word === 'string')) && (/^[a-zA-Z]+$/.test(word)) && (word.length < 8)) {
      console.log('im a string');
      const chars = word.toUpperCase().match(/\S/g);
      console.log(chars);
      chars.forEach(function(element) {
        keys.forEach(function(num) {
          let numLetters = letters[num];
          console.log(numLetters);
          if (numLetters.includes(element)) {
            console.log(`${num}`);
            totalScore += parseFloat(num);
          }})
      }
    )
    if (word.length === 7) {
      totalScore += 50;
    }
  } else {
    throw 'Invalid input';
  }
    return totalScore;

  },

  highestScoreFrom: function highestScoreFrom(array) {

  }

};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
