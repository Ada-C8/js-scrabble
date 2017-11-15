//Julia Meier - JS Scrabble

//EXCEPTIONS:
function UserException(message) {
   this.message = message;
   this.name = 'UserException';
}
//throw new UserException('InvalidMonthNo');

const Scrabble = {
  scoreChart: {
      1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
      2: ['D','G'],
      3: ['B', 'C', 'M', 'P'],
      4: ['F', 'H', 'V', 'W', 'Y'],
      5: ['K'],
      8: ['J', 'X'],
      10: ['Q','Z'],
    },

  letterValue: function(letter) {
    let value = 0;
    const points = Object.keys(Scrabble.scoreChart);
    points.forEach(function(point) {
      if (Scrabble.scoreChart[point].includes(letter)) {
        value = point;
      }
    });
    //console.log(letter);
    return Number(value);
  },

  score: function(word) {
    let total = 0;
    if (null == word || word === "" || /[^a-zA-Z]/.test(word) || word.length > 7) {
      throw 'You did not enter a valid word (empty string or non alphabetic characters)';
    }
    for (let i = 0, len = word.length; i < len; i++) {
      let value = Scrabble.letterValue(word[i].toUpperCase());
      total += value
    }
    if (word.length === 7) {
      total += 50;
    }
    return total;
  },

  highestScoreFrom: function(words) {
    if (words.length == 0) {
      throw 'Empty array.';
    }
    let values = words.map(function(word) {
      //console.log(Scrabble.score(word));
      return Scrabble.score(word);
    });
    let maxValue = Math.max.apply(null, values);
    let numberOfHighestScore = values.filter(item => item == maxValue).length;
    console.log(`number of high score: ${numberOfHighestScore}`);
    let winningWord = null;
    if (numberOfHighestScore === 1) {
      let i = values.indexOf(maxValue);
      // let i = values.indexOf(Math.max(...values));
      console.log(`index of highest scoring word: ${i}`);
      console.log(words[i]);
      winningWord = words[i];
    } else {
        let bestWords = [];
        let bestWordsLengths = [];
        for (let i = 0; i < values.length; i+=1) {
          if (values[i] === maxValue) {
            bestWords.push(words[i]);
            bestWordsLengths.push(words[i].length);
          }
        }
        if (bestWordsLengths.includes(7)) {
          let i = bestWordsLengths.indexOf(7);
          winningWord = bestWords[i];
        } else {
          const minLength = Math.min.apply(null,bestWordsLengths);
          let numberOfWordsAtMinLength = bestWordsLengths.filter(item => item == minLength).length;
          let i = bestWordsLengths.indexOf(minLength);
          winningWord = bestWords[i];
        }
    }
    return winningWord;
  },

  Player: class Player {
    constructor(name) {
      this.name = name;
      this.plays = [];
      if (!(/^[a-zA-Z\s]*$/.test(name)) || name === "" || name === undefined) {
        throw 'No player name was provided';
      }
    }

    play(word) {
      if (null == word || word === "" || /[^a-zA-Z]/.test(word) || word.length > 7) {
        throw 'not a valid word';
      }
      // if (hasWon()) {
      //   return false
      // } else {
        this.plays.push(word);
        return true
      // }
    }

  }
};

// plays: property which returns an Array of the words played by the player
// play(word): method which adds the input word to the plays Array
// Returns false if player has already won
// totalScore(): method which sums up and returns the score of the players words
// hasWon(): method which returns true if the player has over 100 points, otherwise returns false
// highestScoringWord(): method which returns the highest scoring word the user has played
// highestWordScore(): method which returns the highestScoringWord score

//TESTING letterValue
//let a = Scrabble.letterValue('I');
//console.log(a);

//TESTING score
//let answer = Scrabble.score('Hello');
//console.log(answer);

//TESTING highestScoreFrom
//words = ['hi', 'hello', 'howdy', 'howddd', 'abcdefg', 'gfedcba'];
//winning_word = Scrabble.highestScoreFrom(words);
//console.log(`Winning word: ${winning_word}`);


// Scrabble.Player = class {
  // TODO: implement the Player class
// };

module.exports = Scrabble;
