const scores = {
  A:1, B:3, C:3, D:2, E:1, F:4, G:2, H:4, I:1, J:8, K:5, L:1, M:3, N:1, O:1, P:3, Q:10, R:1, S:1, T:1, U:1, V:4, W:4, X:8, Y:4, Z:10
};

// TODO: add error handling and raising of exceptions

const Scrabble = {
  score: function(word) {
    // toUpperCase(word);
    let scoreTotal = 0;

    // regex below should return false for white space, non a-zA-Z characters, 1 letter or 7+ letter words
    if (/^[a-zA-Z]{2,7}$/.test(word)){
      for (let letter of word) {
        scoreTotal += scores[letter.toUpperCase()];

        console.log(`Letter: ${letter} Score:${scoreTotal}`);
      }
      if (word.length === 7){
        scoreTotal += 50;
      }
    } else {
      throw `Users word '${word}' was not playable. Scrabble words must be between 2-7 letters, contain no white space, and may not have non-alphabet characters.`;
    }
    // console.log()


    // TODO: score a 7 letter word + 50 points

    return scoreTotal;
  }

  // TODO: add the highestScoreFrom method

};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;

Scrabble.score('dog')
