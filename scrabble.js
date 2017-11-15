
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

  // TODO: add the highestScoreFrom method

};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;

// const result = Scrabble.score('hello');
// console.log(result);
