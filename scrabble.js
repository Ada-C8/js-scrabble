const Scrabble = {
  score: function(word) {
    // TODO: implement score
    const scores = {
      A:1, B:3, C:3, D:2, E:1, F:4, G:2, H:4, I:1, J:8, K:5, L:1, M:3, N:1, O:1, P:3, Q:10, R:1, S:1, T:1, U:1, V:4, W:4, X:8, Y:4, Z:10
    };
    const format = /^[a-zA-Z]{1,7}$/;

    if (format.test(word)) {
      let score = 0;
      let letters = word.toUpperCase().split('');

      for(let letter of letters) {
        if (scores[letter] > 0) {
          score += scores[letter];
        }
      }

      if (word.length == 7) {
        score += 50;
      }

      return score;

    } else {
      throw 'Cannot play that word!';
    }
  },

  // TODO: add the highestScoreFrom method
  highestScoreFrom: function(words) {
    if (words.constructor === Array && words.length > 0) {
      let highest_score = 0;
      let highest_words = [];

      for (let word of words) {
        let score = Scrabble.score(word);
        if (score > highest_score) {
          highest_score = score;
          highest_words = [];
          highest_words.push(word);
        } else if (score === highest_score) {
          highest_words.push(word);
        }
      }

      if (highest_words.length === 1) {
        return highest_words[0];
      }

      for (let word of highest_words) {
        if (word.length === 7) {
          return word;
        }
      }

      return highest_words.reduce((a, v) => a && a.length <= v.length ? a : v, '');

    } else {
      throw 'No words have been played!';
    }
  }
};

Scrabble.Player = class {
  // TODO: implement the Player class
  constructor(name) {
    this.name = name;
    const plays = [];
  }
};

module.exports = Scrabble;
