const Scrabble = {
  score: function(word) {

    let regex = /^[a-zA-Z]+$/;

    if (!regex.test(word)) {
      throw new Error('Bad characters');
    }

    if (word.length > 7) {
      throw new Error('Word has to be between 1 and 7 characters long');
    }

    let lowercaseWord = word.toLowerCase();
    let score = 0;

    const scrabbleLetters = {
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
      z: 10,
    };

    for (let i = 0; i < lowercaseWord.length; i++) {
      score += scrabbleLetters[lowercaseWord[i]];
    }

    if (lowercaseWord.length === 7) {
      score += 50;
    }

    return score;
  },

  highestScoreFrom: function(arrayOfWords) {

    // start with array check to make sure input is an array; then can check for length if it passes the array check
    // works with order of specificity and speed (do the quick check before potentially doing a db query)
    if (!Array.isArray(arrayOfWords) || arrayOfWords.length === 0 ) {
      throw new Error('Not valid input');
    }

    if (arrayOfWords.length === 1) {
      return arrayOfWords[0];
    }

    let max = 0;
    let highestWord = '';

    for (let i = 0; i < arrayOfWords.length; i++) {
      let score = this.score(arrayOfWords[i]);

      if (score > max) {
        max = score;
        highestWord = arrayOfWords[i];
      } //if end
      else if (score === max) {
        //if use all 7 letters, winner || // fewer tiles wins
        if (highestWord.length !== 7 &&
          (arrayOfWords[i].length === 7 || (arrayOfWords[i].length < highestWord.length))) {
            highestWord = arrayOfWords[i];
          }
        }
      }

      return highestWord;
    },


  };//scrabble

  Scrabble.Player = class {
    constructor(name) {
      if (name === undefined) {
        throw new Error('Need to add a name');
      }
      //   name: property which returns the value of the player's name
      this.name = name;
      // instantiate playArray
      this.playArray = [];
      //   plays: property which returns an Array of the words played by the player
      this.plays = this.playArray;
    }

    //   play(word): method which adds the input word to the plays Array
    //   Returns false if player has already won
    play(word) {
      // TODO: turn the regex check into a method or function?
      let regex = /^[a-zA-Z]+$/;

      if (word === undefined || !regex.test(word)) {
        throw new Error('Need to be a valid word entry');
      }

      if (! this.hasWon()) {
        if (this.playArray.push(word)) {
          return true;
        }
      } else {
        return false;
      }
    }

    // totalScore(): method which sums up and returns the score of the players words
    totalScore() {
      let total = 0;

      for (let i = 0; i < this.plays.length; i++) {
        //NOTE  why why why do we need to call it Scrabble.score instead of just this.score?
        total += Scrabble.score(this.plays[i]);
      }

      return total;
    }
    // // method which returns true if the player has over 100 points, otherwise returns false
    hasWon() {

      if (this.totalScore() > 100) {
        return true;
      } else {
        return false;
      }

    }
    // method which returns the highest scoring word the user has played
    highestScoringWord() {
    }
    // method which returns the highestScoringWord score
    highestWordScore() {
    }
  };

  let player = new Scrabble.Player('test player');
  player.play('dog');
  player.play('kid');
  player.play('zzzzz');


  console.log('this.playArray == ' + player.playArray);
  console.log('this.plays' + player.plays);

  console.log('player total score is ' + player.totalScore());
  // console.log('player.plays.length' + player.plays.length);
  // // console.log(player.plays());

  module.exports = Scrabble;
