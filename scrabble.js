const Scrabble = {
  // the belwo is an object's property. look up property syntax.
  scoring: {
    A: 1,
    E: 1,
    I: 1,
    O: 1,
    U: 1,
    L: 1,
    N: 1,
    R: 1,
    S: 1,
    T: 1,
    D: 2,
    G: 2,
    B: 3,
    C: 3,
    M: 3,
    P: 3,
    F: 4,
    H: 4,
    V: 4,
    W: 4,
    Y: 4,
    K: 5,
    J: 8,
    X: 8,
    Q: 10,
    Z: 10
  },

  score: function(word) {
    // TODO: implement score

    if (word === '' || word.length > 7) {
      throw new Error('Word must have more than 0 letters and less than or equal to 7 letters')
    }

    // if (word.length > 7) {
    //   throw new Error('Word lengths must be either 7 letters or less')
    // }

    let splitWord = word.toUpperCase().split('')
    // for provides flexibility
    // forEach takes a function as a parameter. It also provides security for iterating over each element in collection.

    let total = 0
    let localScoring = this.scoring
    splitWord.forEach(function localScore(letter) {

      // before localScoring we had the parameter set as this.scoring. When in repl the 'this' referenced the node object.
      let keysArray = Object.keys(localScoring) // returns an array with the keys
      // console.log(keysArray);
      if (!keysArray.includes(letter)) {
        throw new Error('Sorry we need words with only letters to calculate your score')
      }


      // console.log(`this is the word = ${word}`);

      // console.log(`this is the keys ${keysArray.includes(letter)}`);
      if (keysArray.includes(letter)) {
        // console.log(localScoring[letter]);
        total += localScoring[letter];
      }
    }) // end forEach

    if (splitWord.length > 6) {
      return total + 50
    }

    return total
  }, // end score fnx

  // TODO: add the highestScoreFrom method

  highestScoreFrom: function(wordArray) {
    if (wordArray.length === 0 || Array.isArray(wordArray) === false) {
      throw new Error('no words to score')
    } //end error

    let winner = wordArray[0]
    // ['dog', 'pig'] is passed in and we want to return 'pig' because it has the highest score.

    if (wordArray.length > 1) {
      // iterate over the array and score each word.
      for (word of wordArray) {
        let wordScore = this.score(word)
        let winnerScore = this.score(winner)
        // highest word if there are two words
        if (wordScore > winnerScore) {
          winner = word;

        // if, tie take the word with 7 letters.
        // if the words in the array have the same score, compare the lengths. the one with 7 letters wins.
        } else if (wordScore === winnerScore && winner.length < 7 && word.length === 7) {
          // winner.lenth is the first word in the array so
          winner = word;

        } else if (wordScore === winnerScore && winner.length < 7 && word.length < winner.length) {
          winner = word;
        }
      }
    } // end (wordArray.length > 1
    return winner
  } // end highestScoreFrom

}; // end Scrabble

Scrabble.Player = class {
  // TODO: implement the Player class

  constructor(name) {
    if (typeof name !== 'string' && !name.length > 0 ) {
      throw new Error('Player must have name')
    };

    this.name = name
    // this._totalScore = 0
    this._plays = []
  };



  // plays() property which returns an Array of the words played by the player

  // play(word): method which adds the input word to the plays Array
    // Returns false if player has already won
  play(word) {
    if (typeof word !== 'string' && !word.length > 0 || word.length > 7) {
      throw new Error('You must play a real word')
    }

    if (!this.hasWon()) {
      this._plays.push(word);
      return true;
    } else {
      return false;


    }
  };

  // totalScore(): method which sums up and returns the score of the players words

  totalScore() {
    // takes array of words and scores each word. then adds all scores together
    let totalScore = 0
    console.log(` before this._totalScore = ${totalScore}`);
    for (let word of this._plays) {
      console.log(`word = ${word}`);
      console.log(`Scrabble.score(word) = ${Scrabble.score(word)}`);
      totalScore += Scrabble.score(word);
    }
    console.log(`after totalScore = ${totalScore}\n`);

    return totalScore;
  }

  // hasWon(): method which returns true if the player has over 100 points, otherwise returns false
  hasWon() {
    // if player won (over 100) then return true. Otherwise, return false
    if (this.totalScore() >= 100) {
      return true;
    } else {
      return false;
    }
  }


};
console.log('test');
let angela = new Scrabble.Player('angela')
console.log(angela.hasWon());
console.log('test');
console.log(angela.totalScore());
module.exports = Scrabble;
