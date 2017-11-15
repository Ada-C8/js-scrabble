const Scrabble = {
  score: function() {
    console.log('hi');
  },
};



Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;

const animal = {
  species: 'dog',
  sound: 'woof',
  describe: function() {
    console.log(`A ${this.species} goes ${this.sound}`);
  },
};

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
  } else {
    total += 10;
  }
}
return total;

highestScoreFrom: function highestScoreFrom(arrayOfWords) {
  let maxScore = 0;
  let bestWord = '';
  for (let i = 0; i < arrayOfWords.length; i += 1) {
    let temp = score(arrayOfWords[i]);

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
