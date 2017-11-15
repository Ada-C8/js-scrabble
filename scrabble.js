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
      console.log("Im in the else if for when there are 2 or more words in array")
      let highScore = Scrabble.score(words[0]);

      let scoreHash = {};

      let highestScoringWord = "";

      console.log(`The high score is ${highScore}`);


      words.forEach(function (word) {
        let wordScore = Scrabble.score(word);

        if (scoreHash[wordScore] === undefined) {
          console.log('word is ' + word + ' score is ' + wordScore);
          console.log('im about to make a hash');
          scoreHash[wordScore] = [word];
          console.log('in the If, scoreHash is ');
          console.log(scoreHash);
        } //if hash undefined
        else {
          scoreHash[wordScore].push(word);
          console.log('in the Else, scorehash is ');
          console.log(scoreHash);
        } //else for hash creation
        if (wordScore > highScore) {
          console.log("word is");
          console.log(word);
          console.log("word score is ");
          console.log(wordScore);
          console.log("high score is ");
          console.log(highScore);
          highScore = wordScore;
        } // if for finding high score
      }); //end of first for.each

      console.log('here is the hash: ')
      console.log(scoreHash);
      let highestScoringWords = scoreHash[highScore];
      let minLength = highestScoringWords[0].length;
      console.log(`and here are the highestscoring words ${highestScoringWords}`);

      if (highestScoringWords.length === 1) {
        highestScoringWord = highestScoringWords[0];
      } //end check for just one winning word
      //this esle will rune if there's more than one word ["dog", "cat"]
      else {
        highestScoringWord = highestScoringWords[0];
        highestScoringWords.forEach(function (word) {

          if (word.length === 7) {
            highestScoringWord = word;
            minLength = 0;
            console.log('im in the if for 7 letter words');
            console.log(`highest scoring word is now: ${highestScoringWord}`);
            console.log('minLength is now ' + minLength);
          } //if word length === 7

          else {
            console.log("im in the else for when there aren't seven letter words")
            console.log(`highest scoring word is ${highestScoringWord}`);
            console.log(`minLength is ${minLength}`);
            if(word.length < minLength) {
              minLength = word.length;
              highestScoringWord = word;
              console.log(`In the else if for non-seven letter words checking word lengths`);
              console.log(`highest scoring word is now: ${highestScoringWord}` );
              console.log(`minimum length is now ${minLength}` );
            } //else if for finding minimum

          }// end else -- words that aren't seven letters
        }); //end highest scoring word function

      } //end else for multiple high scoring words
      console.log("Im about to return " + highestScoringWord);
      return highestScoringWord;

    } //else if array has 2 or more words
    console.log("really:");
    return highestScoringWord;
  } //end highestscorefrom

}; //end const Scrabble

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
// const loser = 'zzzzzz';
// const winner = 'iiiiddd';
//
// // console.log("Comparing dog and pig");
// // console.log(Scrabble.highestScoreFrom(['dog', 'pig']));
// // console.log("*********************");
// // console.log("starting iwth pig")
// // console.log(Scrabble.highestScoreFrom(['pig', 'dog']));
// // console.log(Scrabble.highestScoreFrom([loser, winner]));
// // console.log("Comparing winner and loser");
// // console.log(Scrabble.highestScoreFrom([winner, loser]));
// console.log("schekcing i, dog, cat");
// console.log(Scrabble.highestScoreFrom(['i', 'dog', 'cd', 'cat']));



///
