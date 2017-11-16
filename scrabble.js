const Scrabble = {
  isValidWord: function isValidWord(word) {
    if ((typeof word === 'string') && (/^[a-zA-Z]+$/.test(word)) && (word.length < 8) && (word.length > 0)) {
      return true;
    } throw new Error('Invalid Word');
  },
  score: function score(word) {
    const letters = {
      1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
      2: ['D', 'G'],
      3: ['B', 'C', 'M', 'P'],
      4: ['F', 'H', 'V', 'W', 'Y'],
      5: ['K'],
      8: ['J', 'X'],
      10: ['Q', 'Z'],
    };
    const keys = Object.keys(letters);
    let totalScore = 0;
    if (this.isValidWord(word)) {
      const chars = word.toUpperCase().match(/\S/g);
      chars.forEach((element) => {
        keys.forEach((num) => {
          const numLetters = letters[num];
          if (numLetters.includes(element)) { totalScore += parseFloat(num); }
        });
      });
      if (word.length === 7) { totalScore += 50; }
    }
    return totalScore;
  },

  highestScoreFrom: function highestScoreFrom(array) {
    if ((!Array.isArray(array)) || (array.length === 0)) { throw new Error('Invalid Array'); }
    const results = array.map(word => this.score(word));
    const maxResult = { highScore: results[0], index: 0 };
    results.forEach((num, i) => {
      if (num > maxResult.highScore) {
        maxResult.highestScore = num;
        maxResult.index = i;
      }
    });
    return array[maxResult.index];
  },
}; // end of class!

Scrabble.Player = class {
  // TODO: implement the Player class
};

Scrabble.Word = class {
  constructor(word) {
  if (Scrabble.isValidWord(word)) {
    this.word = word;
    this.score = Scrabble.score(word);
  }
};


module.exports = Scrabble;
