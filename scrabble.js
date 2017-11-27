

const Scrabble = {
  score: function(word) {
    let validatedWord = validated(word);
    let value = 0;
    if (validatedWord.length === 7) {
      value = 50;
    }
    const letterArray = validatedWord.split('');
      for (letter of letterArray){
        switch (letter) {
          case 'a':
          case 'e':
          case 'i':
          case 'o':
          case 'u':
          case 'l':
          case 'n':
          case 'r':
          case 's':
          case 't':
            value += 1;
            break;
          case 'd':
          case 'g':
            value += 2;
            break;
          case 'b':
           case 'c':
           case 'm':
           case 'p':
            value += 3;
            break;
          case 'f':
          case 'h':
          case 'v':
          case 'w':
          case 'y':
            value += 4;
            break;
          case 'k':
            value += 5;
            break;
          case 'j':
          case 'x':
            value += 8;
            break;
          case 'q':
          case 'z':
            value += 10;
            break;
          default:
            throw 'invalid characters in word string';
        } //end switch statement
      }; //end loop over letter array
    return value;
  }, // ends score function


  highestScoreFrom: function(arrayOfWords) {
    if (Array.isArray(arrayOfWords) === false || arrayOfWords.length === 0) {
      throw new Error("problem with array");
    }
    if (arrayOfWords.length === 1){
      return arrayOfWords[0];
    }
    const pairs = [];
    arrayOfWords.forEach(word => {
      pairs[word] = this.score(word);
    });
    maxVal = Math.max(...(Object.values(pairs)))
    let maxKeys = [];
    Object.keys(pairs).find(key => {
      if(pairs[key] === maxVal){
        maxKeys.push(key);
      }
    });
    for (let key of maxKeys) {
      if (maxKeys.length == 1) {
        return maxKeys[0];
      } else if (key.length == 7) {
        return key;
      }
    }
    return maxKeys.reduce((a, b) => a.length <= b.length ? a : b);
  }
}

Scrabble.Player = class {
  constructor(name) {
    if (name === undefined) {
      throw new Error('no name');
    }
    this.name = name;
    this.plays = [];
  }

  play(word) {
    if (this.hasWon()) {
      return false;
    } else {
      if (validated(word)) {
        this.plays.push(word);
        return true;
      }
    }
  }

  totalScore() {
    if (this.plays.length === 0){
      return 0;
    } else {
      let totalScore = 0;
      for (let playedWord of this.plays) {
        totalScore += Scrabble.score(playedWord);
      }
      return totalScore;
    }
  }

  hasWon() {
    if (this.totalScore() > 99) {
      return true;
    } else {
      return false
    }
  }

  highestWordScore() {
    if (this.plays.length == 0) {
      throw new Error("no played words");
    } else {
      let numHash = {};
      this.plays.forEach(function(word){
        numHash[word] = Scrabble.score(word)
      });
      return Math.max(...(Object.values(numHash)));
    }
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }
};

const validated = function validated(word){
  const check = word.toLowerCase();
  if (check.match(/^[a-zA-Z]+$/) === null) {
    throw new Error("invalid word");
  }
  if (check.length > 7) {
    throw new Error("more than 7 letters");
  }
  return check;
}

module.exports = Scrabble;
