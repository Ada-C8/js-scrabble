class Scrabble {
  static score(word) {
    const wordArray = word.toLowerCase().split('');
    let score = 0;
    if (wordArray.length > 7 || wordArray.length === 0) {
      throw 'Words may not exceed 7 letters';
    };

    if (/[^a-zA-Z]/.test(word)) {
      throw 'That word includes an invalid character.';
    };

    wordArray.forEach(function (letter) {
      Object.keys(scoreChart).map(function(key) {
        if (scoreChart[key].includes(letter)) {score += parseInt(key)}
      });
    });
    if (wordArray.length === 7) {
      score += 50;
    }
    return score;
  }
  static highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0 || Array.isArray(arrayOfWords) === false) {
      throw 'Um, you have to give words.';
    };
    let highestScoringWord = arrayOfWords[0];
    arrayOfWords.forEach(function (word) {
      if (Scrabble.score(word) > Scrabble.score(highestScoringWord)) {
        highestScoringWord = word;
      } else if (Scrabble.score(word) === Scrabble.score(highestScoringWord)) {
        if (word.length === 7) {
          highestScoringWord = word
        } else if (highestScoringWord.length === 7) {
        } else if (word.length < highestScoringWord.length) {
          highestScoringWord = word
        };
      };
    });
    return highestScoringWord;
  }
}

const scoreChart = {
  1: ['a', 'e', 'i', 'o', 'u', 'l', 'n', 'r', 's', 't'],
  2: ['d', 'g'],
  3: ['b', 'c', 'm', 'p'],
  4: ['f', 'h', 'v', 'w', 'y'],
  5: ['k'],
  8: ['j', 'x'],
  10: ['q', 'z'],
};


// Scrabble.Player = class {
//   // TODO: implement the Player class
// };
//
module.exports = Scrabble;
