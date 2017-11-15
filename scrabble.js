const Scrabble = {
  score(word) {
    const scoreShart = {
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
    let score = 0;
    word = word.toUpperCase();
    for (let letter of word) {
      score += scoreShart[letter];
    }
    if (word.length ===7){
      score+= 50;
    }
    return score;
  }, //close the score function


  highestScoreFrom(arrayOfWords) {
    let all_scores = [];
    for(let word of arrayOfWords) {
      all_scores.push(Scrabble.score(word));
    };
    let maximo = Math.max.apply(null, all_scores);
    let i = 0;
    let maximosWords = [];
    while (i < all_scores.length) {
      if (all_scores[i] === maximo) {
        maximosWords.push(arrayOfWords[i]); //return the array with maximo values.
      };
    i++;
  };

  if (maximosWords.length === 1){
    return maximosWords[[0]];
  } else {
    let minlength = maximosWords[0].length;
    let minword = maximosWords[0];
    for(let word of maximosWords) {
      if (word.length === 7 ) {
        return word
      }
      if(word.length < minlength){
          minlength = word.length;
          minword = word;
        }
    }
    return minword;
  }

  } //highestScoreFrom close
};

// Scrabble.payer is
Scrabble.Player = class {
  // TODO: implement the Player class
  constructor(name){
    this.name = name;
    this.plays = ['aa', 'e'];
  }

  totalScore(){
    let total = 0;
    for (let word of this.plays) {
      total += Scrabble.score(word);
    };
    return total;
  }

  hasWon(){
    if(this.totalScore() > 100){
      return true;
    }else{
      return false;
    }
  }

  play(word){
    if(this.hasWon()) {
      return false;
    } else {
      this.plays.push(word)
      // return this.plays;
    }
  }

  highestScoringWord(){
    let maxWordPlayer = Scrabble.highestScoreFrom(this.plays);
    return maxWordPlayer;
  }

  highestWordScore(){
    let maxScorePlayer = Scrabble.score(this.highestScoringWord());
    return maxScorePlayer;
  }

}; //close player class

module.exports = Scrabble;

// console.log(Scrabble.highestScoreFrom([ 'aaaaaaa', 'qqqq' ]));
const laura = new Scrabble.Player('laura')

laura.play('camino');
laura.play('zzzzz');
laura.play('hola');

console.log(laura.highestWordScore());
