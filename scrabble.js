let tiles = {
  'A': 1, 'E': 1, 'I': 1, 'O': 1, 'L': 1, 'N': 1, 'R': 1,
  'U': 1, 'S': 1, 'T': 1, 'D': 2, 'G': 2, 'B': 3, 'C': 3,
  'M': 3, 'P': 3, 'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
  'K': 5, 'J': 8, 'X': 8, 'Q': 10, 'Z': 10
};


const Scrabble = {
  score: function(word) {
    // TODO: implement score
    // word.toUpperCase().split(' ').forEach(function(letter) {
    // console.log('this is the ' + word);

    let total = 0;
    let playedWord = word.toUpperCase();

    for (i=0; i < playedWord.length; i++) {
      letter = playedWord[i];

      if (letter === null) {
        total = 0;
      }

      total += tiles[letter];

    }
    if (word.length === 7 && total > 0) {
      total += 50;
    }
    return total;
  },

  //  Question:  Is forEach less efficient that forloop word.toUpperCase().split('').forEach(function(letter) {
  //     total = tiles[letter] + total;
  //   });
  //   if (word.length == 7 && total > 0) {
  //     total += 50;
  //   }
  //   return total;
  // },

  // TODO: add the highestScoreFrom method
  highestScoreFrom: function(arrayOfWords) {
    let max = 0;
    let highestScoreWord = '';

    arrayOfWords.forEach(function(wrd) {
      if ( Scrabble.score(wrd) > max ) {
        max = Scrabble.score(wrd);
        highestScoreWord = wrd;
      } else if (( Scrabble.score(wrd) === max ) && (wrd.length < highestScoreWord.length)) {
        highestScoreWord = wrd;
      }
    });
    return highestScoreWord;
  }

}; // end of Scrabble function


Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
