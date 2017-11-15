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
  },

  highestScoreFrom: function(array) {
    if (array.length === 0) {
      throw new ArgumentException('List of words can\'t be blank');
    }

    let highestWords = [];
    let highestScore = 0;
    for (let word of array) {
      let score = this.score(word);
      if (score === highestScore) {
        highestWords.push(word);
      } else if (score > highestScore) {
        highestScore = score;
        highestWords = [];
        highestWords.push(word);
      }
    }
    if (highestWords.length === 1) {
      return highestWords[0];
    }

    // longWords = highestWords.filter(function(word) {
    //   return word.length === 7;
    // })

    longWords = highestWords.filter(word => word.length === 7);

    if (longWords.length > 0) {
      return longWords[0];
    }

    // shortWords = highestWords.sort(function(a, b) {
    //   return a.length - b.length;
    // })

    shortWords = highestWords.sort((a, b) => a.length - b.length);

    if (shortWords.length > 0) {
      return shortWords[0];
    }
  }
}

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
