const scoreChart = {
    1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
    2: ['D','G'],
    3: ['B', 'C', 'M', 'P'],
    4: ['F', 'H', 'V', 'W', 'Y'],
    5: ['K'],
    8: ['J', 'X'],
    10: ['Q','Z'],
  };

const letterValue = function letterValue(letter) {
  let value = 0;
  const points = Object.keys(scoreChart);
  points.forEach(function(point) {
    if (scoreChart[point].includes(letter)) {
      value = point;
    };
  });
  //console.log(letter);
  return Number(value);
};

//TESTING letterValue
let a = letterValue('I');
console.log(a);


const Scrabble = {

  score: function(word) {
    let total = 0;
    for (let i = 0, len = word.length; i < len; i++) {
      value = letterValue(word[i].toUpperCase());
      total += value;
    }
    return total;
  },

  highestScoreFrom: function(words) {
    let values = words.map(function(word) {
      console.log(Scrabble.score(word));
      return Scrabble.score(word);
    });
  
    let i = values.indexOf(Math.max(...values));
    console.log(`index of highest scoring word: ${i}`);
    console.log(words[i]);
    return words[i];
  }

};

//TESTING score
let answer = Scrabble.score('Hello');
console.log(answer);

//TESTING highestScoreFrom
words = ['hi', 'hello', 'howdy'];
winning_word = Scrabble.highestScoreFrom(words);
console.log(winning_word);

  // TODO: add the highestScoreFrom method



// Scrabble.Player = class {
  // TODO: implement the Player class
// };

// module.exports = Scrabble;
