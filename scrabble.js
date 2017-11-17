

function InputException(message) {
  this.message = message;
  this.name = 'inputException';
}

const Scrabble = {

  letterValues: {
    a: 1,
    e: 1,
    i: 1,
    o: 1,
    u: 1,
    l: 1,
    n: 1,
    r: 1,
    s: 1,
    t: 1,
    d: 2,
    g: 2,
    b: 3,
    c: 3,
    m: 3,
    p: 3,
    f: 4,
    h: 4,
    v: 4,
    y: 4,
    k: 5,
    j: 8,
    x: 8,
    q: 10,
    z: 10,
  },
  score(word) {
    // TODO: implement score
    let totalValue = 0;
    const downcase = word.toLowerCase();
    // (/^[a-z]+$/.test(downcase) returns true if all characters in the downcase string are letters
    if ((/^[a-z]+$/.test(downcase)) && typeof downcase === 'string' && downcase.length < 8) {
      let ch = downcase[0];
      for (let i = 0; i < word.length; i += 1) {
        ch = downcase[i];
        totalValue += this.letterValues[ch];
      }
    } else {
      throw new InputException('InvalidInput');
    }

    if (downcase.length === 7) {
      totalValue += 50;
    }
    return totalValue;
  },
  highestScoreFrom(arrayofWords) {
    if (!(typeof arrayofWords === 'object' && arrayofWords.length > 0)) {
      throw new InputException('InvalidInput: must provide a valid array of words');
    }

    let highestScore = 0;
    let topWord = arrayofWords[0];

    for (let word of arrayofWords) {
      if (this.score(word) === highestScore) {
        if (topWord.length === 7) {
          break;
        } else if (word.length === 7 || (word.length < topWord.length)) {
          topWord = word;
        }
      } else if (this.score(word) > highestScore) {
        highestScore = this.score(word);
        topWord = word;
      }
    }
    return topWord;
  },

};

Scrabble.Player = class {
  constructor(name) {
    if (!name) {
      throw new InputException('Error:name required for new player');
    }
    this.name = name;
    this.plays = [];
  }
  play(word) {
    if (this.hasWon()) {
      return false;
    }
    const downcase = word.toLowerCase();
    if ((/^[a-z]+$/.test(downcase)) && typeof downcase === 'string' && downcase.length < 8) {
      (this.plays).push(word);
      return true;
    }
    return false;
  }
  totalScore() {
    let totalScore = 0;
    this.plays.forEach((word) => {
      totalScore += Scrabble.score(word);
    });
    return totalScore;
  }
  hasWon() {
    return (this.totalScore() >= 100);
  }
  highestScoringWord() {
    if (this.plays.length < 1) {
      throw new InputException('Error: No words have been played');
    }
    // what happens with two + words that share the same high score
    // sorted is the player's plays array sorted in descending order
    // const sorted = this.plays.sort((a, b) => Scrabble.score(b) - Scrabble.score(a));
    //
    // return sorted[0];
    return Scrabble.highestScoreFrom(this.plays);
  }
  highestWordScore() {
    if (this.plays.length < 1) {
      throw new InputException('Error: No words have been played');
    }
    return Scrabble.score(this.highestScoringWord());
  }
};

// Scrabble.Tilebag = {
//   tileQuantity: {
//     j: 1,
//     k: 1,
//     q: 1,
//     x: 1,
//     z: 1,
//     b: 2,
//     c: 2,
//     f: 2,
//     h: 2,
//     m: 2,
//     p: 2,
//     v: 2,
//     w: 2,
//     y: 2,
//     g: 3,
//     d: 4,
//     l: 4,
//     s: 4,
//     u: 4,
//     n: 6,
//     r: 6,
//     t: 6,
//     o: 8,
//     a: 9,
//     i: 9,
//     e: 12,
//   },
//   // remainingTiles: Object.assign({}, this.startingTileQuantity),
//   availableTiles: [],
//   constructor() {
//     this.availableTiles = [];
//     Scrabble.Tilebag.tileQuantity.keys.forEach((ch) => {
//       let numTiles = Scrabble.Tilebag.tileQuantity[ch];
//       for (let i = 0; i < numTiles; i += 1) {
//         this.availableTiles.push(ch);
//       }
//     });
//   },
//   drawTiles(num) {
//     let tilesDrawn = [];
//     for (let i = 0; i < num; i += 1) {
//       let numRemainingTiles = this.availableTiles.length;
//       let random = Math.floor(Math.random() * numRemainingTiles);
//       let drawn = (availbleTiles.splice(random, 1)).toString();
//       tilesDrawn.push(drawn);
//     }
//     return tilesDrawn;
//   },
// };


module.exports = Scrabble;
