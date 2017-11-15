const Scrabble = {
  score: function (word) {
    // Throw error if word > 7 letters
    // Throw error if word is empty
    // Throw error if a character is not recognized
    let Totalscore = 0;
    const OnePoints = ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'];
    const TwoPoints = ['D', 'G'];
    const ThreePoints = ['B', 'C', 'M', 'P'];
    const FourPoints = ['F', 'H', 'V', 'W', 'Y'];
    const FivePoints = ['K'];
    const EightPoints = ['J', 'X'];
    const TenPoints = ['Q', 'Z'];
    for (let i = 0; i < word.length; i++) {
      if (OnePoints.includes(word[i].toUpperCase())) {
        Totalscore += 1;
      }
      if (TwoPoints.includes(word[i].toUpperCase())) {
        Totalscore += 2;
      }
      if (ThreePoints.includes(word[i].toUpperCase())) {
        Totalscore += 3;
      }
      if (FourPoints.includes(word[i].toUpperCase())) {
        Totalscore += 4;
      }
      if (FivePoints.includes(word[i].toUpperCase())) {
        Totalscore += 5;
      }
      if (EightPoints.includes(word[i].toUpperCase())) {
        Totalscore += 8;
      }
      if (TenPoints.includes(word[i].toUpperCase())) {
        Totalscore += 10;
      }
    }
    //   switch (word[i]) {
    //     case (OnePoints.includes(word[i].toUpperCase()) === true):
    //       Totalscore += 1;
    //       break;
    //     case (TwoPoints.includes(word[i].toUpperCase()) === true):
    //       console.log('inside second case!');
    //       Totalscore += 2;
    //       break;
    //       console.log('yeaaaah');
    //     case (ThreePoints.includes(word[i].toUpperCase())):
    //       Totalscore += 3;
    //       break;
    //     case (FourPoints.includes(word[i].toUpperCase())):
    //       Totalscore += 4;
    //       break;
    //     case (FivePoints.includes(word[i].toUpperCase())):
    //       Totalscore += 5;
    //       break;
    //     case (EightPoints.includes(word[i].toUpperCase())):
    //       Totalscore += 8;
    //       break;
    //     case (TenPoints.includes(word[i].toUpperCase())):
    //       Totalscore += 10;
    //       break;
    //     default:
    //       console.log('uhoh');
    //       // TO DO: Throw error
    //   }
    // }
    if (word.length === 7) {
      Totalscore += 50;
    }
    return Totalscore;
  },
  highestScoreFrom: function(arrayOfWords) {
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

console.log(Scrabble.score('dogg'));
console.log(Scrabble.score('pigg'));
console.log(Scrabble.highestScoreFrom(['pig', 'dog']));

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;

// letters: ['A','E','I','O','U','L','N','R', 'S','T','D','D','G','G','B','B','B','C','C','C','M','M','M','P','P','P','F','F','F','F','H','H','H','H','V','V','V','V','W','W','W','W','Y','Y','Y','Y','K','K','K','K','K','J','J','J','J','J','J','J','J','X','X','X','X','X','X','X','X','Q','Q','Q','Q','Q','Q','Q','Q','Q','Q','Z','Z','Z','Z','Z','Z','Z','Z','Z','Z']
