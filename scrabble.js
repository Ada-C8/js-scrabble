const Scrabble = {
  score: function(word) {

    let regex = /^[a-zA-Z]+$/

    if (!regex.test(word)) {
      throw 'Bad characters';
    }

    if (word.length > 7) {
      throw 'Word has to be between 1 and 7 characters long';
    }

    let lowercaseWord = word.toLowerCase();
    let score = 0

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
      }

      for (let i = 0, len = lowercaseWord.length; i < len; i++) {
        score += scrabbleLetters[lowercaseWord.charAt(i)];
      }

      if (lowercaseWord.length === 7) {
        score += 50;
      }

      return score;
    },

    highestScoreFrom: function(arrayOfWords) {
      let array = arrayOfWords

      if (array.length === 0 || !Array.isArray(array)) {
        throw 'Not valid input';
      }

      if (array.length === 1) {
        return array[0];
      }
    }

  };

  // Scrabble.score('word')
  // console.log(Scrabble.score.toString);
  //
  // Scrabble.Player = class {
  //   // TODO: implement the Player class
  // };

  module.exports = Scrabble;
