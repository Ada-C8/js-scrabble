const tiles = {
  'A': 1, 'E': 1, 'I': 1, 'O': 1, 'L': 1, 'N': 1, 'R': 1,
  'U': 1, 'S': 1, 'T': 1, 'D': 2, 'G': 2, 'B': 3, 'C': 3,
  'M': 3, 'P': 3, 'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
  'K': 5, 'J': 8, 'X': 8, 'Q': 10, 'Z': 10
};


const Scrabble = {
  score: function(word) {

    let regex = /^[a-zA-Z]+$/;
    let total = 0;
    let playedWord = word.toUpperCase();

    if (playedWord.length > 7) {
      throw new UserException(`Illegal play, ${playedWord.length} exceeds allowed tile count`);
    }

    if (playedWord === '') {
      throw new UserException(`Illegal play ${playedWord}
        contains bad characters`);
      }

      if (!playedWord.match(regex) ) {
        throw new UserException('Illegal play, sorry only words allowed');
      }

      word.toUpperCase().split('').forEach(function(letter) {
        total = tiles[letter] + total;
      });
      if (word.length == 7 && total > 0) {
        total += 50;
      }
      return total;
    },

    highestScoreFrom: function(arrayOfWords) {
      let max = 0;
      let highestScoreWord = '';

      if (arrayOfWords.length === 0) {
        throw new Error('No words to score');
      } else if (arrayOfWords.length === 1){
        return arrayOfWords[0];
      }

      arrayOfWords.forEach(function(word) {
        let wordScore  = Scrabble.score(word)
        let wordLength = word.length

        if ( wordScore > max ) {
          max = wordScore;
          highestScoreWord = word;
        } else if ( wordScore === max ) {
          if ( wordLength === 7 ) {
            // console.log('HIGHEST ' + highestScoreWord + ' VALUE OF CURRENT WORD ' + word);
            return highestScoreWord = word;
          } else if (highestScoreWord.length === 7 ) {
            // console.log('work ' + highestScoreWord);
            return highestScoreWord;
          } else if (wordLength === highestScoreWord.length ) {
            // console.log('work ' + highestScoreWord);
            return highestScoreWord;
          } else if (( wordLength < highestScoreWord.length) && ( wordLength !== 7)) {
            return highestScoreWord = word;
          }
        }
      });
      return highestScoreWord;
    }
  }; // end of Scrabble function


  Scrabble.Player = class {
    constructor(name) {
      if (name === undefined) {
        throw new Error('No argument passed');
      }
      this.name = name; // return player's name
      this.plays = []; // store words played
    }

    play(word) {
      let regex = /^[a-zA-Z]+$/;

      if (this.hasWon()) {
        return false;
      }

      if ((word === undefined) || (!word.match(regex))) {
        throw new Error('Invalid word');
      }

      this.plays.push(word)
      return this.plays;
    }

    totalScore() {
      let total = 0;
      this.plays.forEach(function(playedWord) {
        total += Scrabble.score(playedWord)
      });
      return total;
    }

    hasWon() {
      if (this.totalScore() < 100) {
        return false;
      } else {
        return true;
      }
    }

    highestScoringWord() {
      return Scrabble.highestScoreFrom(this.plays);
    }

    highestWordScore() {
      return Scrabble.score(this.highestScoringWord());
    }
  }; // Scrabble.Player object



  module.exports = Scrabble;

  //tests
  // let name = 'Bob';
  // let player = new Scrabble.Player(name);
  // console.log(player.name)
