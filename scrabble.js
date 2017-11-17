/* eslint-disable */
const Scrabble = {
  score: function(word) {
    if (!word.match(/^([a-zA-Z]){1,7}$/)) {
      throw new Error("Not a valid word!");
    } else {word = word.toUpperCase();
    }

    let score = 0;

    if (word.length === 7) {
      score += 50;
    } else {
      score = 0;
    }

    let wordArr = word.split("");


    wordArr.forEach((letter) => {
      switch (letter) {
        case 'A':
        case 'E':
        case 'I':
        case 'O':
        case 'U':
        case 'L':
        case 'N':
        case 'R':
        case 'S':
        case 'T':
         score += 1;
         break;

        case 'D':
        case 'G':
         score += 2;
         break;

        case 'B':
        case 'C':
        case 'M':
        case 'P':
         score += 3;
         break;

        case 'F':
        case 'H':
        case 'V':
        case 'W':
        case 'Y':
         score += 4;
         break;

        case 'k':
         score += 5;
         break;

        case 'J':
        case 'X':
         score += 8;
         break;

         case 'Q':
         case 'Z':
          score += 10;
          break;

        default:
          throw new Error("Not a valid letter!");

      }
    });
    return score;
  },

 highestScoreFrom: function(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw new Error ("No words...")
    }

    let currentWinningWord = arrayOfWords[0];
    let currentWinningScore = this.score(currentWinningWord);

    arrayOfWords.forEach((word) => {
      let wordScore = this.score(word);
      if (currentWinningScore < wordScore) {
        currentWinningWord = word;
        currentWinningScore = wordScore;
      } else if (currentWinningScore === wordScore) {
          if (currentWinningWord.length > word.length) {
            if (currentWinningWord.length != 7)
              currentWinningWord = word;
          }else if (word.length === 7){
             currentWinningWord = word;
          }
      }
    });
    return currentWinningWord
  },

};

Scrabble.Player = class {
  constructor(name) {
    if (typeof name != 'string') {
      throw new Error ("Name can't be blank");
    }
    this.name = name;
    this.plays = [];
  }

  play(word) {
    if (!hasWon()){
    this.plays.push(word);
    } else {
    return false
    }
   }



};

module.exports = Scrabble;
