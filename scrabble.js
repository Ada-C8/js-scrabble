let tiles = {
    'A': 1, 'E': 1, 'I': 1, 'O': 1, 'L': 1, 'N': 1, 'R': 1,
    'U': 1, 'S': 1, 'T': 1, 'D': 2, 'G': 2, 'B': 3, 'C': 3,
    'M': 3, 'P': 3, 'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
    'K': 5, 'J': 8, 'X': 8, 'Q': 10, 'Z': 10
};

// def self.score(word)
// -      @score = 0
// +      value = 0
//     word.upcase.each_char do |letter|
// -        @score = TILES[letter] + @score
// +        value += TILES[letter]
//     end
//     if word.length == 7
// -        bonus = @score + 50
// -        return bonus
// -      end
// -      return @score
// -    end
// +       value += 50
// +     end
// +     return value
// +   end




const Scrabble = {
  score: function(word) {
    // TODO: implement score
    // word.toUpperCase().split(' ').forEach(function(letter) {
    // console.log('this is the ' + word);
    let total = 0;
    // let word;

    word.toUpperCase().split('').forEach(function(letter) {
      // console.log(letter);
      total = tiles[letter] + total;
      // console.log(tiles[letter]);
      // console.log(total);

    });
    return total;
  }



  // var letter, i, sum = 0;
  // for (i = 0; i < word.length; i++) {
  //     letter = word[i];
  //     sum += alphabet[letter];
  // }
  // TODO: add the highestScoreFrom method

};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;
