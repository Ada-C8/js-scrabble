const SCORES = {
  1: ['a', 'e', 'i', 'o', 'u', 'l', 'n', 'r', 's', 't'],
  2: ['d', 'g'],
  3: ['b', 'c', 'm', 'p'],
  4: ['f', 'h', 'v', 'w', 'y'],
  5: ['k'],
  8: ['j', 'k'],
  10: ['q', 'z'],
};

const WordFormatException = function WordFormatException(message) {
  this.message = message;
  this.name = 'WordFormatException';
};

const maximumValue = function maximumValue(array) {

};

const Scrabble = {
  score: function score(word) {
    if (word.length > 7 || word.length < 1) {
      throw new WordFormatException('A word must have at least 1 and not more than 7 characters');
    } else if (!typeof word === 'string' || /[^a-z]/i.test(word)) {
      throw new WordFormatException('A word should only contain letters and no spaces.');
    } else {
      let sum = 0;
      for (let i = 0; i < word.length; i += 1) {
        for (const key in SCORES) {
          if (SCORES[key].includes(word[i].toLowerCase())) {
            sum += Number(key);
          }
        }
      }
      if (word.length === 7) {
        sum += 50;
      }
      return sum;
    }
  },
  highestScoreFrom: function highestScoreFrom(wordArray) {
    const wordScores = {};
    wordArray.map(function(word) {
      wordScores[word] = Scrabble.score(word);
    });
    const highScore = Math.max(...Object.values(wordScores));
    const winningWords = [];
    for (const [word, score] of Object.entries(wordScores)) {
      if (score === highScore) {
        winningWords.push(word);
      }
    }
    if (winningWords.length > 1) {
      for (let word of winningWords) {
        if (word.length === 7) {
          return word;
        }
      }
      let minLength = 7;
      let shortestWord = '';
      for (let word of winningWords) {
        if (word.length < minLength) {
          minLength = word.length;
          shortestWord = word;
        }
      }
      return shortestWord;
    } else {
      return winningWords[0];
    }
  },
  // TODO: add the highestScoreFrom method
};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
