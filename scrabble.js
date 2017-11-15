function InvalidWord(word) {
  if (word.length > 7) {
    this.message = 'Your word can not exceed 7 letters';
    return this.message;
  }
  if (word.length < 1 || word === '') {
    this.message = 'Your word can not be empty';
    return this.message;
  }
}
function InvalidCharacter(char) {
  this.char = char;
  this.message = `invalid character used: ${char}`;
  return this.message;
}

function EmptyArray() {
  this.message = 'This array is empty';
  return this.message;
}

const Scrabble = {
  score: function (word) {
    if (word.length < 1 || word.length > 7 || word === '') {
      throw new InvalidWord(word);
    }
    let Totalscore = 0;
    const OnePoints = ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'];
    const TwoPoints = ['D', 'G'];
    const ThreePoints = ['B', 'C', 'M', 'P'];
    const FourPoints = ['F', 'H', 'V', 'W', 'Y'];
    const FivePoints = ['K'];
    const EightPoints = ['J', 'X'];
    const TenPoints = ['Q', 'Z'];
    for (let i = 0; i < word.length; i++) {
      if (word[i].match(/[A-Za-z]/) === null ) {
        throw new InvalidCharacter(word[i]);
      } else if (OnePoints.includes(word[i].toUpperCase())) {
        Totalscore += 1;
      } else if (TwoPoints.includes(word[i].toUpperCase())) {
        Totalscore += 2;
      } else if (ThreePoints.includes(word[i].toUpperCase())) {
        Totalscore += 3;
      } else if (FourPoints.includes(word[i].toUpperCase())) {
        Totalscore += 4;
      } else if (FivePoints.includes(word[i].toUpperCase())) {
        Totalscore += 5;
      } else if (EightPoints.includes(word[i].toUpperCase())) {
        Totalscore += 8;
      } else if (TenPoints.includes(word[i].toUpperCase())) {
        Totalscore += 10;
      }
    }
    if (word.length === 7) {
      Totalscore += 50;
    }
    return Totalscore;
  },
  highestScoreFrom: function(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw new EmptyArray();
    }
    let max = arrayOfWords[0];
    arrayOfWords.forEach(function (word) {
      if (Scrabble.score(word) > Scrabble.score(max)) {
        max = word;
      } else if (Scrabble.score(word) === Scrabble.score(max)) {
        if (word.length === 7) {
          max = word;
        } else if (word.length < max.length && max.length <7) {
          max = word;
        }
      }
      return max;
    });
    return max;
  }
};

Scrabble.Player = class {
  // TODO: implement the Player class
};



module.exports = Scrabble;

// letters: ['A','E','I','O','U','L','N','R', 'S','T','D','D','G','G','B','B','B','C','C','C','M','M','M','P','P','P','F','F','F','F','H','H','H','H','V','V','V','V','W','W','W','W','Y','Y','Y','Y','K','K','K','K','K','J','J','J','J','J','J','J','J','X','X','X','X','X','X','X','X','Q','Q','Q','Q','Q','Q','Q','Q','Q','Q','Z','Z','Z','Z','Z','Z','Z','Z','Z','Z']
