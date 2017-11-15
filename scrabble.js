/*eslint-disable*/
const Scrabble = {
  // validate: function(word) {
  //   if (typeof word !== 'string' || word.length > 7 || world.length <) {
  //     throw 'Error! You must enter a word that is 1-7 letters long'
  //   }
  // },

  score: function(word) {
    word = word.toLowerCase().split("")
    if (word.length > 7 || word.length < 1){
      throw 'Invalid word! Word must be 1-7 letters long'
    }

    let highScore = {
      word: "",
      score: ""
    }

    const POINTS = {
      a: 1,
      b: 3,
      c: 3,
      d: 2,
      e: 1,
      f: 4,
      g: 2,
      h: 4,
      i: 1,
      j: 8,
      k: 5,
      l: 1,
      m: 3,
      n: 1,
      o: 1,
      p: 3,
      q: 10,
      r: 1,
      s: 1,
      t: 1,
      u: 1,
      v: 4,
      w: 4,
      x: 8,
      y: 4,
      z: 10
    }

    let score = 0;
    for (let i = 0; i < word.length; i++) {
      if (POINTS[word[i]]){
        score += POINTS[word[i]];
      } else {
        throw 'Invalid word!';
      }
    }

    if (word.length === 7){
      score += 50;
    }
    return score;
  },

  // TODO: add the highestScoreFrom method
  highestScoreFrom: function(words){
    if (words.length === 0) {
      throw 'There are no words to score.';
    }

    highScorer = {
      word: [],
      score: 0,
    }

    words.forEach(function(word){
      wordScore = Scrabble.score(word)
      if (wordScore > highScorer.score){
        highScorer.word = [word]
        highScorer.score = wordScore
      } else if(wordScore === highScorer.score){
        highScorer.word.push(word)
      }
    })

    if (highScorer.word.length === 1){
      return highScorer.word[0];
    }

    let shortestLengthWord = "1234567";
    for (let i = 0; i < highScorer.word.length; i++){
      if (highScorer.word[i].length === 7){
        return highScorer.word[i]
      } else if (highScorer.word[i].length < shortestLengthWord.length) {
          shortestLengthWord = highScorer.word[i];
        }
      }
      return shortestLengthWord;
    }
  }

Scrabble.Player = class {
  constructor(name){
    if (name.length < 1){
      throw 'Must have a name';
    }
    this.name = name;
    this.plays = [];
  }

  play(word){
    if (this.hasWon()){
      return false;
    }

    if (typeof word !== 'string' || word === ''){
      throw 'You must play a word'
    }

    this.plays.push(word)
    return this.plays;
  }

  totalScore() {
    let score = 0;
    for (let i = 0; i < this.plays.length; i++){
      score += Scrabble.score(this.plays[i]);
    }
    return score
  }

  hasWon() {
    if (this.totalScore() > 100) {
      return true;
    } else {
      return false;
    }
  }
  //method which returns true if the player has over 100 points, otherwise returns false

  highestScoringWord(){
    return Scrabble.highestScoreFrom(this.plays)
  }

  highestWordScore(){
    return Scrabble.score(this.highestScoringWord())
  }
};

module.exports = Scrabble;
