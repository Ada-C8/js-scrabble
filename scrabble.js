const scrabbleLetters = {
     a: 1, b: 3, c: 3, d: 2, e: 1, f: 4,
     g: 2, h: 4, i: 1, j: 8, k: 5, l: 1,
     m: 3, n: 1, o: 1, p: 3, q: 10, r: 1,
     s: 1, t: 1, u: 1, v: 4, w: 4, x: 8,
     y: 4, z: 10,
   };

const Scrabble = {
 score: function(word) {

   let regex = /^[a-zA-Z]+$/;

   if (!regex.test(word)) {
     throw new Error('Invalid characters');
   }

   if (word.length > 7) {
     throw new Error('Word must be 1 - 7 characters long');
   }

   let lowercaseWord = word.toLowerCase();
   let score = 0;


   for (let i = 0; i < lowercaseWord.length; i++) {
     score += scrabbleLetters[lowercaseWord[i]];
   }

   if (lowercaseWord.length === 7) {
     score += 50;
   }

   return score;
 },

 highestScoreFrom: function(wordsArray) {

   if (!Array.isArray(wordsArray) || wordsArray.length === 0 ) {
     throw new Error('Invalid');
   }

   if (wordsArray.length === 1) {
     return wordsArray[0];
   }

   let max = 0;
   let highestWord = '';

   for (let i = 0; i < wordsArray.length; i++) {
     let score = this.score(wordsArray[i]);

     if (score > max) {
       max = score;
       highestWord = wordsArray[i];
     }
     else if (score === max) {
       if (highestWord.length !== 7 &&
         (wordsArray[i].length === 7 || (wordsArray[i].length < highestWord.length))) {
           highestWord = wordsArray[i];
         }
       }
     }

     return highestWord;
   },


 };

 Scrabble.Player = class {
   constructor(name) {
     if (name === undefined) {
       throw new Error('Invalid - must be a name');
     }
     this.name = name;
     this.playArray = [];
     this.plays = this.playArray;
   }

   play(word) {
     let regex = /^[a-zA-Z]+$/;

     if (word === undefined || !regex.test(word)) {
       throw new Error('Invalid word');
     }

     if (! this.winning()) {
       if (this.playArray.push(word)) {
         return true;
       }
     } else {
       return false;
     }
   }

   totalScore() {
     let total = 0;

     for (let i = 0; i < this.plays.length; i++) {
       total += Scrabble.score(this.plays[i]);
     }

     return total;
   }

   winning() {

     if (this.totalScore() >= 100) {
       return true;
     } else {
       return false;
     }
   }

   highestScoringWord() {
     let example = Scrabble.highestScoreFrom(this.plays);
     return example;
   }

   highestWordScore() {
     let highestWord = this.highestScoringWord();
     return Scrabble.score(highestWord);
   }
 };



 module.exports = Scrabble;
