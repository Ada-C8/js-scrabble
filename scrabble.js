function UserException(message) {
  this.message = message;
  this.name = 'UserException'
};

const letterPoints = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
};

const Scrabble = {
  score: function(word) {

    if(word.length > 7) {
      throw new UserException("Word is Too Long");
    } else if (word.length === 0) {
      throw new UserException("You must enter a word to be scored");
    } else if (word.match(/[^a-z]+/i)) {
      throw new UserException("Word can only contain letters");
    } //exception tests

    let total = 0; //set initial total

    word = word.toUpperCase(); //set word to uppercase

    for(let i = 0; i < word.length; i++){
      total += letterPoints[word[i]];
    } // end for loop

    if(word.length === 7){
      total += 50;
    } //if length

    return total;

  }, //end function word

  highestScoreFrom: function(words) {

    if(words.length === 0) {
      throw new UserException("Array is Empty");
    } else if (typeof words != 'object') {
      throw new UserException("You must enter an array");
    } //exceptions

    if(words.length === 1) {
      return words[0];
    } else if(words.length >= 2) {

      let highScore = Scrabble.score(words[0]);
      let scoreHash = {};
      let highestScoringWord = "";

      words.forEach(function (word) {
        let wordScore = Scrabble.score(word);
        if (scoreHash[wordScore] === undefined) {
          scoreHash[wordScore] = [word];
        } else {
          scoreHash[wordScore].push(word);
        }
        if (wordScore > highScore) {
          highScore = wordScore;
        }
      });

      let highestScoringWords = scoreHash[highScore];
      console.log("highest array: " + highestScoringWords);

      if (highestScoringWords.length === 1) {
        highestScoringWord = highestScoringWords[0];
        // return highestScoringWords[0];
      } else {
        highestScoringWords.forEach(function (word) {
          if (word.length === 7) {
            console.log("seven lettesr? " + word + word.length);
            highestScoringWord = word;
          } //if word length
        }); //array iteration 
      } //else for array length

      return highestScoringWord;
    } //else if


  } //end highestscorefrom
}; //end const Scrabble

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;

// highestScoreFrom: function(words) {
//
//   if(words.length === 0) {
//     throw new UserException("Array is Empty");
//   } else if (typeof words != 'object') {
//     throw new UserException("You must enter an array");
//   } //exceptions
//
//   if(words.length === 1) {
//     return words[0];
//   } else if(words.length >= 2) {
//
//     let max = words[0];
//
//     words.forEach(function (word) {
//       if (word.length === 7){
//         max = word;
//       } //if
//       return max
//     }); //forEach
//
//     words.forEach(function (word) {
//       if (Scrabble.score(word) > Scrabble.score(max)) {
//         max = word;
//       } //if
//
//     }); //forEach
//     return max



// let score_hash = {};

// words.forEach(function (word) {
//   score_hash[Scrabble.score(word)] = [].push(word);
//   if (Scrabble.score(word) > Scrabble.score(max) {
//     max = word;
//   });
//   return max
// });
// words.forEach(function (word) {
//   score_hash[word] = Scrabble.score(word);
// })
