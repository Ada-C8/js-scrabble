const Scrabble = {
  score: function(word) {

    const POINTS = {
      A: 1, B: 3, C: 3, D: 2, E: 1, F: 4,
      G: 2, H: 4, I: 1, J: 8, K: 5, L: 1,
      M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1,
      S: 1, T: 1, U: 1, V: 4, W: 4, X: 8,
      Y: 4, Z: 10
    };

    let letters = word.toUpperCase().split('');
    let totalScore = 0;

    letters.forEach(function(letter) {
      if (!(letter in POINTS)) {
        throw 'is not a valid char'
      };
      totalScore += POINTS[letter];
    });
    if (word.length === 7) {
      totalScore += 50;
    };
    return totalScore;
  },

  highestScoreFrom: function(arrayOfWords) {
    for (word in arrayOfWords) {
    }
  }
  // TODO: add the highestScoreFrom method

};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
