// try {
//     if(x == "") throw "empty";
//     if(isNaN(x)) throw "not a number";
//     x = Number(x);
//     if(x < 5) throw "too low";
//     if(x > 10) throw "too high";
// }
// catch(err) {
//     message.innerHTML = "Input is " + err;
// }
//  do this inside of your stuff
//
// const UserException = function UserException(message) {
//   this.message = message;
//   this.name = 'UserException';
// }
//  throw new ScrabbleException('InvalidMonthNo');

const Scrabble = {

  score: function(word) {
    let wordArray = word.split('');
    let letter_points = { 'A': 1,'B': 3,'C':3,'D':2,'E':1,'F':4,'G':2,'H':4,'I':1,'J':8, 'K':5, 'L':1, 'M':3, 'N':1, 'O':1, 'P':3,'Q':10,'R':1,'S':1,'T':1,'U':1,'V':4,'W':4,'X':8, 'Y':4, 'Z':10 };
    let score = 0;
    if (wordArray.length === 7){
      score += 50;
    } else if (wordArray.length > 7){
      throw `This word is too long. Are you sure you aren't cheating?`;
    } else if (wordArray.length === 0){
      throw 'You have to choose a word.';
    } else{}



    for (let letter of wordArray){
      let point = letter_points[letter.toUpperCase()];
      // try {
      if(point === undefined) {
        throw 'not found';
      }

      score += point;
    }

    return score;
  },
  highestScoreFrom: function(arrayOfWords) {
    if (arrayOfWords.length === 0 || arrayOfWords === "") {
      throw 'The input is not what I expected.';
    } else if (arrayOfWords.length === 1){
      return arrayOfWords[0];
    }
    let highestScore = 0;
    let highestScoringWord = '';
    for (let word of arrayOfWords){
      let wordScore = this.score(word);


      if (wordScore > highestScore || (highestScore === wordScore && word.length < highestScoringWord.length && highestScoringWord.length != 7) || (highestScore === wordScore && word.length === 7)){
        highestScore = wordScore;
        highestScoringWord = word;
      }
    }
    return highestScoringWord;
  }

};

Scrabble.Player = class {
  constructor(name) {
    this.name = name;
    this.plays = [];
    if (this.name === null || this.name === '' || this.name === undefined){
      throw 'A Scrabble player needs a name';
    }
  }

  totalScore() {
    let score = 0;

    if (this.plays.length === 0) {
      return score;
    }
    for(let word of this.plays){
      score += Scrabble.score(word);
    }
    return score;
  }

  hasWon(){
    let winningPoints = 100;
    let currentScore = this.totalScore();
    if(currentScore >= winningPoints){
      return true;
    }
    return false;
  }

  play(word){
    let matcher = /[A-Za-z]+/;
    let matches = word.match(matcher);
    if (word === undefined || matches[0].length != word.length){
      throw 'You have to give a REAL word.';
    }
    let won = this.hasWon();
    if( won === true){
      return false;
    }
    this.plays.push(word);
    return word;
  }


  highestScoringWord(){
    let playArray = this.plays;
    let highestWord = Scrabble.highestScoreFrom(playArray);
    return highestWord;
  }

  highestWordScore(){
    let highestWord = this.highestScoringWord();
    let highestScore = Scrabble.score(highestWord);
    return highestScore;
  }
};

  module.exports = Scrabble;
