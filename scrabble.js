const LETTERVALUE = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10
};


const Scrabble = {
  score: function(word) {

    let letters = word.toUpperCase().split('');
    let wordScore = 0;

    letters.forEach(function(letter) {
      if (!(letter in LETTERVALUE)) {
        throw 'Letters only!'
      };
      wordScore += LETTERVALUE[letter];
    });

    if (word.length > 7) {
      throw 'Your word is too long, 7 letters or less please.';
    } else if (word.length === 0) {
      throw 'Your word is too short, did you even play any letters?';
    } else if (word.length === 7) {
      wordScore += 50;
    };

    return wordScore;
  },

  highestScoreFrom: function(){
  // TODO: add the highestScoreFrom method

};

// Wave 2
Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
