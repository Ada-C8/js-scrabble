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

      let max = words[0];

      words.forEach(function (word) {
        if (word.length === 7){
          max = word;
        } //if
        return max
      }); //forEach
      //find score of each word, use as key with array of all words with that score;

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
        let highestScoringWords = [];

        words.forEach(function (word) {
          if (Scrabble.score(word) > Scrabble.score(max)) {
            max = word;
          }

        }); //forEach
          return max
        // words.forEach(function (word) {
        //   if (Scrabble.score(word) === max) {
        //     highestScoringWords.push(word);
        //   } //if
        //   return highestScoringWords;
        // }); //forEach

        // if(highestScoringWords.length === 1) {
        //   return highestScoringWords[0];
        // }
    } //else if
    // return highestScoringWords[0];
  }
}; //end const Scrabble

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
