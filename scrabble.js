const Scrabble = {
  scoring: { A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1,
      R: 1, S: 1, T: 1, D: 2, G: 2, B: 3, C: 3,
      M: 3, P:3, F: 4, H: 4, V: 4, W: 4, Y: 4, K: 5,
      J: 8, X: 8, Q: 10, Z: 10
    },
  score: function(word) {
    word = word.toUpperCase()
    let total = 0
    for(let letter of word) {
      total += this.scoring[letter]
    }
    return total
  },

  highestScore: function(arrayofwords) {
    let highest = 'A'
    arrayofwords.forEach(function(word) {
      if(Scrabble.score(word) > Scrabble.score(highest)) {
        highest = word
      }
      else if(Scrabble.score(word) == Scrabble.score(highest)) {
        //call tie method
      }
    })
    return highest
  }
  // TODO: add the highestScoreFrom method
};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;

console.log(Scrabble.score('Consequential'))
console.log(Scrabble.highestScore(['word', 'another', 'zzqqhi']))
// Scrabble.scoring.A
