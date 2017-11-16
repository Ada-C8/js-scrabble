const LETTERVALUE = {}
A: 1,
B: 3,
C: 3,
D: 2,
E: 1,
F: 4,
G: 2,
H: 4,
I: 1,
J: 8,
K: 5,
L: 1,
M: 3,
N: 1,
O: 1,
P: 3,
Q: 10,
R: 1,
S: 1,
T: 1,
U: 1,
V: 4,
W: 4,
X: 8,
Y: 4,
Z: 10,
};

const Scrabble = {
  score: function(word) {
    // TODO: implement score
  }
  highestScoreFrom: function(){
  // TODO: add the highestScoreFrom method

};

// Wave 2
Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;


// Create the following methods within the Scrabble object.
//
// score(word): returns the total score value for the given word. The word is input as a string (case insensitive). The chart below shows the point value for a given letter.
//
// highestScoreFrom(arrayOfWords): returns the word in the array with the highest score.
// Note that it’s better to use fewer tiles, so if the top score is tied between multiple words, pick the one with the fewest letters.
//
// Note that there is a bonus (50 points) for using all seven letters. If the top score is tied between multiple words and one used all seven letters, choose the one with seven letters over the one with fewer tiles.
// If the there are multiple words that are the same score and same length, pick the first one in supplied list.
// You should write your code in the Scrabble object. In addition to the provided tests, you should test the methods manually to ensure they work properly
