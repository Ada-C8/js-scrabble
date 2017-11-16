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
    } // else
  }, // score

  highestScoreFrom: function(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw new Error('No words to score');
    } else if (arrayOfWords.length === 1){
      return arrayOfWords[0];
    }
    let tie = [];
    let max_so_far = -1;
    for(let word of arrayOfWords) {
      let current_high_score = Scrabble.score(word);
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
}; // const scrabble

Scrabble.Player = class {

  constructor(name){
    if (name.length === 0){
      throw new Error('It requires name');
    }
    this.name = name;
    this.plays = [];
  }

  play(word) {
    if (this.hasWon()){
      return false;
    }
    format = /^[a-zA-Z]+$/;
    if (format.test(word) && word.length <= 7 && word != ''){
      this.plays.push(word);
      return Scrabble.score(word);
    }
    else {
      throw new Error(' You must enter a word');
    }
  }

  totalScore() {
    let total = 0;
    for(let i of this.plays){
      total += Scrabble.score(i);
    }
    return total;
  }

  hasWon() {
    return this.totalScore() >= 100 ?  true :  false
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    return Scrabble.score(this.highestScoringWord());
  }

};

module.exports = Scrabble;
