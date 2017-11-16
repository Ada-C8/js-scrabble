function InputError(message) {
  this.message = message;
  this.name = 'Input Error';
}

const Scrabble = {

  // score: function(word) {
  score(word) {
    const lowerWord = word.toLowerCase();

    if (typeof word.length === 0 || word.length > 7 || /^[a-zA-Z]+$/.test(word) === false ) {
      throw new InputError('word must include only letters');
    }

    const letterScores = {
      a: 1,
      b: 3,
      c: 3,
      d: 2,
      e: 1,
      f: 4,
      g: 2,
      h: 4,
      i: 1,
      j: 8,
      k: 5,
      l: 1,
      m: 3,
      n: 1,
      o: 1,
      p: 3,
      q: 10,
      r: 1,
      s: 1,
      t: 1,
      u: 1,
      v: 4,
      w: 4,
      x: 8,
      y: 4,
      z: 10
    };

    let totalScore = 0;

    for (let i = 0; i < lowerWord.length; i++) {
      totalScore += letterScores[lowerWord[i]];
    }

    if (lowerWord.length === 7) {
      totalScore += 50;
    }
    return totalScore;
  },

  highestScoreFrom(words) {
    if (Array.isArray(words) === false || words.length === 0) {
      throw new InputError('must input array of words to determine highest scoring word');
    }

    let winner = words[0];
    for (let word of words) {
      if (this.score(word) > this.score(winner)) {
        winner = word;
      } else if (this.score(word) === this.score(winner) && winner.length < 7 && word.length === 7) {
        winner = word;
      } else if (this.score(word) === this.score(winner) && winner.length < 7 && word.length < winner.length) {
        winner = word;
      }
    }
    return winner;
  },

};

Scrabble.Player = class {
  constructor(name) {
    if (typeof name === 'string' && name.length > 0) {
      this.name = name;
      this.plays = [];
    } else {
      throw new InputError('must enter a name');
    }
  }

  totalScore() {
    let totalScore = 0;
    for (let word of this.plays) {
      totalScore += Scrabble.score(word);
    }
    return totalScore;
  }

  hasWon() {
    if (this.totalScore() < 100) {
      return false;
    } else {
      return true;
    }
  }

  play(word) {
    if (this.hasWon() === true) {
      return false;
    }
    if (typeof word === 'string' && word.length > 0) {
      return this.plays.push(word);
    } else {
      throw new InputError('must enter a word');
    }
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    const winningWord = this.highestScoringWord();
    return Scrabble.score(winningWord);
  }
};

Scrabble.TileBag = class {
  constructor() {
    this.tilebag = [];

    this.letterFrequency = {
      a: 9,
      b: 2,
      c: 2,
      d: 4,
      e: 12,
      f: 2,
      g: 3,
      h: 2,
      i: 9,
      j: 1,
      k: 1,
      l: 4,
      m: 2,
      n: 6,
      o: 8,
      p: 2,
      q: 1,
      r: 6,
      s: 4,
      t: 6,
      u: 4,
      v: 2,
      w: 2,
      x: 1,
      y: 2,
      z: 1,
    };

    for (let letter in this.letterFrequency) {
      for (let i = 0; i < this.letterFrequency[letter]; i++) {
        this.tilebag.push(letter);
      }
    }
  }

  drawTiles(number) {
    if (isNaN(number)) {
      throw new InputError('must enter a number');
    }
    this.drawnTiles = [];
    for (let i = 0; i < number; i++) {
      let index = Math.floor(Math.random() * this.tilebag.length);
      this.drawnTiles.push(this.tilebag.splice(index, 1));
    }
    return this.drawnTiles;
  }

  remainingTiles() {
    return this.tilebag;
  }
};

module.exports = Scrabble;

// let newTileBag = new Scrabble.TileBag();
// myTiles = newTileBag.drawTiles(10);
// console.log(myTiles);
// myRemaining = newTileBag.remainingTiles();
// console.log(myRemaining);

// let sally = new Scrabble.Player('Sally');
// console.log(sally.name);
// console.log(sally.plays);
//
// sally.play('dog');
// console.log(sally.plays);
// console.log(sally.plays[0]);
// console.log(sally.plays.length);
// sally.play('zzzz');
// console.log(sally.highestScoringWord());
// console.log(sally.highestWordScore());
