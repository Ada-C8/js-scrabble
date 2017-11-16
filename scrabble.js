// const values = {
//   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
//   2: ['D', 'G'],
//   3: ['B', 'C', 'M', 'P'],
//   4: ['F', 'H', 'V', 'W', 'Y'],
//   5: ['K'],
//   8: ['J', 'X'],
//   10: ['Q', 'Z']
// };

// =======================================================

const Scrabble = {

  score(word) {
    let score = 0;

    if (!word.match(/^[a-zA-Z]+$/)) {
      throw new Error('invalid word');
    }

    if (word.length > 7 || word.length === 0) {
      throw new Error('invalid word');
    }

    if (word.length === 7) {
      score += 50;
    } else {
      score = 0;
    }

    const upperCase = word.toUpperCase();
    const letterArray = upperCase.split('');

    letterArray.forEach((letter) => {
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

        case 'K':
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
          throw new Error('invalid letter');
      }
    });
    return score;
  },


  highestScoreFrom(wordsArray) {
    if (wordsArray.length === 0 || wordsArray.constructor !== Array) {
      throw new Error('ERROR');
    }

    let currentHighestWord = wordsArray[0];
    let highestScore = this.score(currentHighestWord);

    wordsArray.forEach((word) => {
      const playedWord = word;
      const playedScore = this.score(playedWord);

      if (playedScore > highestScore ||
          (playedScore === highestScore && playedWord.length === 7) ||
          (playedScore === highestScore && playedWord.length < currentHighestWord.length && currentHighestWord.length !== 7)) {
        currentHighestWord = playedWord;
        highestScore = this.score(playedWord);
      }
    });
    return currentHighestWord;
  },
};


Scrabble.Player = class {
  constructor(name) {
    if (typeof name !== 'string') {
      throw new Error('no name');
    }
    this.name = name;
    this.plays = [];
    // this.total = 0;
  }

  play(word) {
    if (this.hasWon() === true) {
      return false;
    }

    if (typeof word !== 'string' || typeof word === 'number') {
      throw new Error('invalid');
    }


    this.plays.push(word);
    return true;
  }

  totalScore() {
    let sum = 0;
    this.plays.forEach((word) => {
      const score = Scrabble.score(word);
      sum += score;
      // this.total += score;
    });
    return sum;
    // return this.total;
  }

  hasWon() {
    if (this.totalScore() >= 100) {
      return true;
    }
    return false;
  }

  highestScoringWord() {
    if (this.plays.length === 0) {
      throw new Error('no word has been played.')
    }

    let winningWord = this.plays[0];

    this.plays.forEach((word) => {
      if (Scrabble.score(word) > Scrabble.score(winningWord)) {
        winningWord = word;
      }
    });
    return winningWord;
  }

  highestWordScore() {
    if (this.plays.length === 0) {
      throw new Error('no word has been played.')
    }

    let winningScore = Scrabble.score(this.plays[0]);

    this.plays.forEach((word) => {
      if (Scrabble.score(word) > winningScore) {
        winningScore = Scrabble.score(word);
      }
    });
    return winningScore;
  }
};

module.exports = Scrabble;
