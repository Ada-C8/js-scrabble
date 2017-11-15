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

    if (word === '') {
      throw new Error('Word must have more than 0 letters')
    }

    if (word.length > 7) {
      throw new Error('Word lengths must be either 7 letters or less')
    }

    let splitWord = word.toUpperCase().split('')
    // for provides flexibility
    // forEach takes a function as a parameter. It also provides security for iterating over each element in collection.

    let total = 0
    let localScoring = this.scoring
    splitWord.forEach(function score(letter) {
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
  } // end score fnx

  // TODO: add the highestScoreFrom method

}; // end Scrabble
Scrabble.score('aaa');
Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
