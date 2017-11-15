const Scrabble = {
  scoring: { A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1,
      R: 1, S: 1, T: 1, D: 2, G: 2, B: 3, C: 3,
      M: 3, P:3, F: 4, H: 4, V: 4, W: 4, Y: 4, K: 5,
      J: 8, X: 8, Q: 10, Z: 10
    },
  score: function(word) {
    if(!/^[a-zA-Z]+$/.test(word) || word.length > 7) {
      throw 'invalid input, must be 7 or fewer letter characters';
    }

    word = word.toUpperCase()
    let total = 0

    for(let letter of word) {
      total += this.scoring[letter]
    }

    if(word.length == 7) {
      total += 50
    }

    return total
  },

  tie: function(word1, word2) {
    if(word2.length == 7) {
      return word2
    }
    else if(word1.length == 7) {
      return word1
    }
    else if(word1.length < word2.length) {
      return word1
    }
    else if(word2.length < word1.length) {
      return word2
    }
    else {
      return word2
    }

  },

  highestScoreFrom: function(arrayofwords) {
    if(arrayofwords.length == 0) {
      throw 'must pass at least one word';
    }

    let highest = 'A'
    arrayofwords.forEach((word) => {
      if(Scrabble.score(word) > Scrabble.score(highest)) {
        highest = word
      }
      else if(Scrabble.score(word) == Scrabble.score(highest)) {
        //call tie method
        highest = this.tie(word, highest)
      }
    })
    return highest
  }
};

Scrabble.Player = class {

  // TODO: implement the Player class
};

module.exports = Scrabble;

console.log(Scrabble.score('academy'))
console.log(Scrabble.highestScoreFrom(['word','zzqqpio', 'another', 'zzqqhi', 'zzqqho']))
// Scrabble.scoring.A
