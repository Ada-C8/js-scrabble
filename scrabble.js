const Scrabble = {
  const POINTS = {
    A: 1, B: 3, C: 3, D: 2, E: 1, F: 4,
    G: 2, H: 4, I: 1, J: 8, K: 5, L: 1,
    M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1,
    S: 1, T: 1, U: 1, V: 4, W: 4, X: 8,
    Y: 4, Z: 10
  }
  
  score: function(word) {
    this.word = word;

    let letters = word.upcase.split('');
    let totalScore = 0;

    letters.forEach(function(letter) {
      totalScore += POINTS[letter];
    });
  }

  highestScoreFrom: function(arrayOfWords) {
    let (word in arrayOfWords) {
      if (word.length === 7) {
        totalScore += 50;
      };
    }
  }
  // TODO: add the highestScoreFrom method

};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
