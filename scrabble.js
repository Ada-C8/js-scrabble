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

    if (highScore.score < score){
      highScore.word = word.join("");
      highScore.score = score;
    }
    return score
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
      } else if(wordScore = highScorer.score){
        highScoreWords.push(word)
      }
    })

    if 
    return highScorer.word;
  }

};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
