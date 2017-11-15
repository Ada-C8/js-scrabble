const Scrabble = {
  // https://github.com/Ada-Developers-Academy/textbook-curriculum/blob/master/10-JavaScript/fun-with-functions.md
  // in the "attaching functions to objects" what's written is inconsistent
  // with what's here which is inconsistent with what
  // linter underlines in red.

  // Documentation says it should be highestScoreFrom: function(params){} but
  // this makes linter angry
  score(word) {
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
    if (word.length > 7) {
      // need to throw error, disallow words longer than 7 characters
    }
    for (let i = 0; i < word.length; i += 1) {
      if (points.one.includes(word[i])) {
        total += 1;
      } else if (points.two.includes(word[i])) {
        total += 2;
      } else if (points.three.includes(word[i])) {
        total += 3;
      } else if (points.four.includes(word[i])) {
        total += 4;
      } else if (points.five.includes(word[i])) {
        total += 5;
      } else if (points.eight.includes(word[i])) {
        total += 8;
      } else if (points.eight.include(word[i])) {
        total += 10;
      } else {
        // will need to throw error, invalid characters
      }
    }
    if (word.length === 7) {
      total += 50;
    }
    return total;
  },
  // https://github.com/Ada-Developers-Academy/textbook-curriculum/blob/master/10-JavaScript/fun-with-functions.md
  // in the "attaching functions to objects" what's written is inconsistent
  // with what's here which is inconsistent with what
  // linter underlines in red.

  // Documentation says it should be highestScoreFrom: function(params){} but
  // this makes linter angry
  highestScoreFrom(arrayOfWords) {
    let maxScore = 0;
    let bestWord = '';
    for (let i = 0; i < arrayOfWords.length; i += 1) {
      let temp = Scrabble.score(arrayOfWords[i]);

      if (arrayOfWords[i].length === 7) {
        temp += 50;
      }
      if (temp > maxScore) {
        maxScore = temp;
        bestWord = arrayOfWords[i];
      } else if (temp === maxScore) {
        if (temp.length === 7) {
          maxScore = temp;
          bestWord = arrayOfWords[i];
        } else if (temp.length < bestWord.length) {
          maxScore = temp;
          bestWord = arrayOfWords[i];
        }
      }
    }
    return bestWord;
  },
};


Scrabble.Player = class {
  constructor(name) {
    this.name = name;
    this.plays = [];
    this.score = 0;
  }

  get name() {
    return this.name;
  }

  get plays() {
    return this.plays;
  }

  static play(word) {
    if (this.plays.includes(word)) {
      //throw error for already playing this word
    } else {
      this.plays
    }
  }

  get hasWon() {
    return this.score > 100;
  }

  get highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  get highestWordScore() {
    return Scrabble.score(Scrabble.highestScoreFrom(this.plays));
  }
};

module.exports = Scrabble;
