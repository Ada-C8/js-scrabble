const score_chart = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10
};
const Scrabble = {
  score: function(word) {
    format = /^[a-zA-Z]+$/;
    word = word.toUpperCase();
    if (format.test(word) && word.length <= 7 && word != '') {
      let letter, i, sum = 0;
      for (i = 0; i < word.length; i++) {
        letter = word[i];
        sum += score_chart[letter];
      } // for
      if (word.length === 7) {
        return parseInt(sum + 50);
      } else {
        return parseInt(sum);
      }
    } // if
    else {
      throw new Error(`Invalid word to score "${ word }"`);
      // console.log('Please enter valid input');
    } // else
  }, // score

  highestScoreFrom: function(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw new Error('No words to score');
    } else if (arrayOfWords.length === 1){
      return arrayOfWords[0];
    }
    tie = [];
    max_so_far = -1;
    for(let word of arrayOfWords) {
      // console.log(`About to call score on "${ word }"`);
      current_high_score = Scrabble.score(word);
      if (current_high_score > max_so_far) {
        tie = [];
        tie.push(word);
        max_so_far = current_high_score;
      }
      else if (current_high_score === max_so_far) {
        tie.push(word);
      }
    }

    if (tie.length === 1){
      return tie[0];
    }
    else {
      winner = "";
      min_length = 100;
      for (let i of tie) {
        if (i.length === 7){
          return i;
        }
        else {
          if (i.length < min_length){
            winner = i;
            min_length = i.length;
          }
        }
      }
    }
    return winner;
  }
}; // scrabble


// let result = Scrabble.highestScoreFrom(['buBBLES', 'cat', 'wolf']);
// console.log(result);

// let result = Scrabble.score('buBBLES');
// console.log(result);

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
