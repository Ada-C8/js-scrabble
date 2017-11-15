const Scrabble = {
  // https://github.com/Ada-Developers-Academy/textbook-curriculum/blob/master/10-JavaScript/fun-with-functions.md
  // in the "attaching functions to objects" what's written is inconsistent
  // with what's here which is inconsistent with what
  // linter underlines in red.

  // Documentation says it should be highestScoreFrom: function(params){} but
  // this makes linter angry
  score(word) {
    const lowerCaseWord = word.toLowerCase();
    const points = {
      one: ['a', 'e', 'i', 'o', 'u', 'l', 'n', 'r', 's', 't'],
      two: ['d', 'g'],
      three: ['b', 'c', 'm', 'p'],
      four: ['f', 'h', 'v', 'w', 'y'],
      five: ['k'],
      eight: ['j', 'k'],
      ten: ['q', 'z'],
    };
    let total = 0;
    if (lowerCaseWord.length > 7) {
      throw new Error('You must play a word that has 7 characters or fewer');
    } else if (lowerCaseWord.length === 0) {
      throw new Error('The word can not be blank');
    } else {
      for (let i = 0; i < lowerCaseWord.length; i += 1) {
        if (points.one.includes(lowerCaseWord[i])) {
          total += 1;
        } else if (points.two.includes(lowerCaseWord[i])) {
          total += 2;
        } else if (points.three.includes(lowerCaseWord[i])) {
          total += 3;
        } else if (points.four.includes(lowerCaseWord[i])) {
          total += 4;
        } else if (points.five.includes(lowerCaseWord[i])) {
          total += 5;
        } else if (points.eight.includes(lowerCaseWord[i])) {
          total += 8;
        } else if (points.ten.includes(lowerCaseWord[i])) {
          total += 10;
        } else {
          throw new Error('You must use valid characters');
        }
      }
      if (lowerCaseWord.length === 7) {
        total += 50;
      }
      return total;
    }
  },
  // https://github.com/Ada-Developers-Academy/textbook-curriculum/blob/master/10-JavaScript/fun-with-functions.md
  // in the "attaching functions to objects" what's written is inconsistent
  // with what's here which is inconsistent with what
  // linter underlines in red.

  // Documentation says it should be highestScoreFrom: function(params){} but
  // this makes linter angry
  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw new Error('You need to make a guess first');
    }
    let maxScore = 0;
    let bestWord = '';
    for (let i = 0; i < arrayOfWords.length; i += 1) {
      let temp = Scrabble.score(arrayOfWords[i].toLowerCase());

      if (arrayOfWords[i].length === 7) {
        temp += 50;
      }
      if (temp > maxScore) {
        maxScore = temp;
        bestWord = arrayOfWords[i];
      } else if (temp === maxScore) {
        if (temp.length === 7 && bestWord.length !== 7) {
          maxScore = temp;
          bestWord = arrayOfWords[i];
        } else if (arrayOfWords[i].length < bestWord.length) {
          maxScore = temp;
          bestWord = arrayOfWords[i];
        }
      }
    }
    return bestWord;
  },
};


Scrabble.Player = class {
  constructor(name = null) {
    if (name === null) {
      throw new Error('Enter a name');
    }
    this.name = name;
    this.plays = [];
    this.score = 0;
  }

  name() {
    return this.name;
  }

  plays() {
    return this.plays;
  }

  play(word) {
    if (this.hasWon()) {
      return false;
    }

    word.toLowerCase();
    if (word.length > 7) {
      throw new Error('The word is longer than 7 characters');
    } else if (this.plays.includes(word)) {
      throw new Error(`You have already played ${word}`);
    } else {
      this.plays.push(word);
      this.score = this.score + Scrabble.score(word);
    }
    return true;
  }

  totalScore() {
    return this.score;
  }

  hasWon() {
    return this.score >= 100;
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    return Scrabble.score(Scrabble.highestScoreFrom(this.plays));
  }
};

module.exports = Scrabble;
