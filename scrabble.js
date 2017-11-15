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
  //console.log(points);
  points.forEach(function(point) {
    //console.log(scoreChart.point);
    if (scoreChart[point].includes(letter)) {
      //console.log(point);
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
  //receive word
  //interate through letters
  //create another method that you can send letters to and it returns the value of that letter
  //add letters together
  score: function(word) {
    let total = 0;
    for (let i = 0, len = word.length; i < len; i++) {
      value = letterValue(word[i].toUpperCase());
      total += value;
    };
    return total;
  }



};

//TESTING score
let answer = Scrabble.score('Hello');
console.log(answer);

  // TODO: add the highestScoreFrom method



// Scrabble.Player = class {
  // TODO: implement the Player class
// };

// module.exports = Scrabble;
