const ArgumentException = function ArgumentException(message) {
  this.message = message;
  this.name = 'ArgumentException';
}

const SCORES = { 'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1, 'D': 2, 'G': 2, 'B': 3, 'C': 3, 'M': 3, 'P': 3, 'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4, 'K': 5, 'J': 8, 'X': 8, 'Q': 10, 'Z': 10 };

const Scrabble = {
  score: function(word) {
    if (/^[A-Za-z]+$/.test(word) && word.length <= 7) {
      let totalScore = 0;
      for (let i = 0; i < word.length; i++) {
        let letter = word[i].toUpperCase();
        if (Object.keys(SCORES).includes(letter)) {
          totalScore += parseInt(SCORES[letter]);
        } else {
          throw new ArgumentException('Invalid input. Only alphabetical characters allowed');
         }
      }
      if (word.length === 7) {
        totalScore += 50;
      }
      return totalScore;
    }
    throw new ArgumentException('Invalid input. Only alphabetical characters allowed');
  }

  // TODO: add the highestScoreFrom method

}

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
