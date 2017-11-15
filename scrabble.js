/*eslint-disable*/
const Scrabble = {
  //possible refactor: use REGEXP
  validate: function(word) {
    if (typeof word !== 'string' || word.length > 7 || word.length < 1) {
      throw 'Error! You must enter a word that is 1-7 letters long'
    }
  },

  bonus: function(word, score) {
    if (word.length === 7) {
      score += 50;
    }
    return score
  },

  score: function(word) {
    Scrabble.validate(word);
    word = word.toLowerCase().split("")

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

    return Scrabble.bonus(word, score)
  },


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
    if (this.totalScore() >= 100) {
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
}

Scrabble.Tilebag = class {
  constructor() {
    this.bag = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "b", "b", "c", "c", "d", "d", "d", "d", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "f", "f", "g", "g", "g", "h", "h", "i", "i", "i", "i", "i", "i", "i", "i", "i", "j", "k", "l", "l", "l", "l", "m", "m", "n", "n", "n", "n", "n", "n", "o", "o", "o", "o", "o", "o", "o", "o", "p", "p", "q", "r", "r", "r", "r", "r", "r", "s", "s", "s", "s", "t", "t", "t", "t", "t", "t", "u", "u", "u", "u", "v", "v", "w", "w", "x", "y", "y", "z"];
  }

  drawTile() {
    let index = Math.floor(Math.random() * this.bag.length);

    let letter = this.bag[index]
    this.bag.splice(index, 1)
    return letter
  }
}

module.exports = Scrabble;
