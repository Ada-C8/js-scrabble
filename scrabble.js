function Exception(message) {
  this.message = message;
  this.name = 'Exception';
}

const Scrabble = {
  scoreShart:  {
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
  },
  validWord(word) {
    word = word.toUpperCase();
    for (let letter of word) {
      if (!Scrabble.scoreShart.hasOwnProperty(letter)) {
        throw new Exception('InvalidInput');
      }
    }
    return true;
  },

  score(word) {
    let score = 0;
    if (Scrabble.validWord(word)){
      word = word.toUpperCase();
      for (let letter of word) {
        score += Scrabble.scoreShart[letter];
      }
    }

    if (word.length ===7){
      score+= 50;
    } else if (word.length > 7) {
      throw new Exception('The size of the word should be at most 7');
    } else if (word.length === 0 ){
      throw new Exception('The word should have length bigger than 0');
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
  constructor(name){
    if (!name ) {
      throw new Exception('Player should have a name');
    }
    this.name = name;
    this.plays = [];
  }

  totalScore(){
    let total = 0;
    for (let word of this.plays) {
      total += Scrabble.score(word);
    };
    return total;
  }

  hasWon(){
    if(this.totalScore() >= 100){
      return true;
    }else{
      return false;
    }
  }

  play(word){
    if(Scrabble.validWord(word)){
      if(this.hasWon()) {
        return false;
      } else {
        this.plays.push(word)
        return this.plays;
      }
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
