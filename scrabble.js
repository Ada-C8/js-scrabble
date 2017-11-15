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
  z: 10,
};

const ErrorMsg = function ErrorMsg(value) {
  this.value = value;
  this.message = 'is not valid';
  this.toString = () => this.value + this.message;
};

const Scrabble = {
  score(word) {
    if ((/^[a-zA-Z]+$/.test(word) === false) || (word.length > 7) || (word === '')) {
      throw new ErrorMsg(word);
    }

    let wordScore = 0;
    word.toLowerCase().split('').forEach((letter) => {
      const result = letterScores[letter];
      wordScore += result;
    });

    if (word.length === 7) {
      return (wordScore + 50);
    }
    return wordScore;
  },

  highestScoreFrom(wordsArray) {
    if ((wordsArray.length === 0) || (Array.isArray(wordsArray) === false)) {
      throw new ErrorMsg(wordsArray);
    }

    let highestWord = wordsArray[0];
    const highestScore = this.score(highestWord);
    for (let i = 0; i < wordsArray.length; i += 1) {
      const scoredWord = wordsArray[i];
      const getScore = this.score(scoredWord);
      const wordLength = scoredWord.length;

      if ((getScore > highestScore) || (getScore === highestScore && wordLength === 7)) {
        highestWord = scoredWord;
      }
    }
    return highestWord;
  },
}; // end of object Scrabble

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
