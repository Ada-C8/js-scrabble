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

    if (word.length === 7) {
      sum += 50;
    }

    return sum;
  },

  // TODO: add the highestScoreFrom method
  highestScoreFrom: function highestScoreFrom(wordsArray) {
    if (wordsArray === undefined || wordsArray.length === 0 ||
        wordsArray.constructor.name !== 'Array') {
      throw new Error('Must pass in an array with at least one valid word');
    } else if (wordsArray.length === 1) {
      return wordsArray[0];
    }

    const compareWordScores = (a, b) => {
      return this.score(b) - this.score(a);
    }
    // sort words according to score from largest score to smallest score
    const sortedByScoreWords = wordsArray.sort(compareWordScores);
    // first word in sorted array will always have the highest score
    // set its score as the highest score
    const highestScore = this.score(sortedByScoreWords[0]);
    // limit results to those with equal max score, .filter keeps the original order of wordArray
    let wordsWithHighestScore = wordsArray.filter(word => this.score(word) === highestScore);
    // pick out which words that have 7 letters and have the max score
    const wordsWithSevenLetters = wordsWithHighestScore.filter(word => word.length === 7);
    // if the first word has 7 letters with max score, pick that
    if (wordsWithSevenLetters[0] !== undefined) {
      return wordsWithSevenLetters[0];
    }// none of the words have 7 letters
    // sort maintains the order of the string if the first word was the shortest for example
    wordsWithHighestScore = wordsWithHighestScore.sort(function(a, b) {
      return a.length - b.length;
    });
    return wordsWithHighestScore[0];
  },
};

Scrabble.Player = class {
  // TODO: implement the Player class
  constructor(name){
    if (name === undefined || name.length === 0){
      throw new Error('Must pass in a string with at least one letter as a name for Player');
    }
    this.name = name;
    this.plays = [];
  }

  play(word) {
    if (word === undefined || word.length === 0){
      throw new Error('Must pass in a valid word to play');
    }
    if (this.hasWon() || Scrabble.score(word) === undefined) {
      return false
    }
    this.plays.push(word);
    return true;
  }

  hasWon() {
    if (this.totalScore() >= 100) {
      return true
    }
    return false
  }

  totalScore() {
    let sum = 0;
    this.plays.forEach((word) => {
      sum += Scrabble.score(word);
    });
    return sum;
  }

};

module.exports = Scrabble;
