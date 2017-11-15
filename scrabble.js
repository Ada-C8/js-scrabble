
const UserException = function UserExpection(message) {
  this.message = message;
  this.name = 'UserException';
};


const Scrabble = {
/* score(word): returns the total score value for the given word. The word is input as a string (case insensitive). The chart below shows the point value for a given letter. */
  score: function score(word) {
    const scoreChart = {
      'A': 1, 'E': 1, 'I': 1,
      'O': 1, 'U': 1, 'L': 1,
      'N': 1, 'R': 1, 'S': 1,
      'T': 1, 'D': 2, 'G': 2,
      'B': 3, 'C': 3, 'M': 3,
      'P': 3, 'F': 4, 'H': 4,
      'V': 4, 'W': 4, 'Y': 4,
      'K': 5, 'J': 8, 'X': 8,
      'Q': 10, 'Z': 10
     };

    let totalScore = 0;
    // so that we can look up letter in hash
    word = word.toUpperCase()
    // add 50 to a 7 letter word's score
    if (word.length === 7) {
      totalScore += 50;
    }

    /* throw an error for words greater than 7 letters or words that contain anything but letters */
    if (word.length > 7 || !(word.match(/^[a-zA-Z]+$/))) {
      throw new UserException('Invalid word');
    }

    /* calculate the score of the word */
    for (let i = 0; i < word.length; i += 1) {
      totalScore += scoreChart[word[i]];
    }
    return totalScore;
  },

  /*
  highestScoreFrom(arrayOfWords): returns the word in the array with the highest score.
    Note that it’s better to use fewer tiles, so if the top score is tied between multiple words, pick the one with the fewest letters.
    Note that there is a bonus (50 points) for using all seven letters. If the top score is tied between multiple words and one used all seven letters, choose the one with seven letters over the one with fewer tiles.
    If the there are multiple words that are the same score and same length, pick the first one in supplied list.
  */
  highestScoreFrom: function highestWordFrom(words) {
    // throw an expection if there if passed an empty array
    if (words.length < 1) {
      throw new UserException('You cannot score an empty array');
    }

    // find the highest scoring word
    let maxScore = 0;
    let maxWord;
    words.forEach( function (word) {
      const wordScore = Scrabble.score(word);
      if (wordScore > maxScore) {
        maxScore = wordScore;
        maxWord = word;
      } else if (wordScore === maxScore && word.length === 7) {
        maxScore = wordScore;
        maxWord = word;
      } else if (wordScore === maxScore && maxWord.length !== 7 && word.length < maxWord.length) {
        maxScore = wordScore;
        maxWord = word;
      }// if else if
    }); // forEach
    return maxWord
  }, // highestWordFrom
};

Scrabble.Player = class {
  constructor(name) {
    // throw an error if a name is not provided
    if (name === undefined) {
      throw new UserException('You must provide a name for a player');
    }
    this.name = name;
    this.plays = [];
    // this.totalScore = 0;
  }; // Constructor

  plays() {
    return this.plays;
  }; // plays

  totalScore() {
    let playerScore = this.plays.reduce((sum, value) => sum + Scrabble.score(value), 0);
    return playerScore
  };

  hasWon() {
    if (this.totalScore() >= 100) {
      return true;
    } else {
      return false;
    }
  }; // hasWon

  play(word) {
    if (!(word.match(/^[a-zA-Z]+$/))) {
      throw new UserException('Invalid word');
    }
    if (this.hasWon()) {
      return false
    } else {
      this.plays.push(word);
      return true;
    }
  }; // play(word)




}; // end of Scrabble

module.exports = Scrabble;

// const result = Scrabble.score('hello');
// console.log(result);
