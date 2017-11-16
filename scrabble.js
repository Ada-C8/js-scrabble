const scoreChart = {
  "A": 1,
  "E": 1,
  "I": 1,
  "O": 1,
  "U": 1,
  "L": 1,
  "N": 1,
  "R": 1,
  "S": 1,
  "T": 1,
  "D": 2,
  "G": 2,
  "B": 3,
  "C": 3,
  "M": 3,
  "P": 3,
  "F": 4,
  "H": 4,
  "V": 4,
  "W": 4,
  "Y": 4,
  "K": 5,
  "J": 8,
  "X": 8,
  "Q": 10,
  "Z": 10
};


const Scrabble = {
  score(word) {

    // Check the input of the word first exception is thrown here
    let checkedWord = checkInput(word);
    let checkedLength = checkLength(checkedWord);

    // Score the word iterating over each letter
    score = 0;
    for (let letter of checkedWord) {
      score += scoreChart[letter];
    }

    // Add 50 points if the word is 7 letters long
    if (word.length === 7) {
      score += 50;
    }
    return score;
  },

  // Takes the highest scored word from all the words played by a single player
  highestScoreFrom(arrayOfWords) {
    if (!(Array.isArray(arrayOfWords)) || arrayOfWords.length === 0) {
      throw new UserException('You have not played any words yet!');
    } else if (arrayOfWords.length === 1) {
      return arrayOfWords[0];
    } else {
      highestScore = 0;
      highestScoredWord = null;

      // Iterate over each word to get the highest scoring word
      for (let word of arrayOfWords) {
        let wordScore = this.score(word);
        if (wordScore > highestScore) {
          highestScore = wordScore;
          highestScoredWord = word;
        } else if (wordScore === highestScore && word.length === 7) {
          highestScoredWord = word;
        } else if (word.length && highestScoredWord.length < 7 && word.length < highestScoredWord.length) {
          highestScoredWord = word;
        }
      }
      return highestScoredWord;
    }
  }
};


// Creates a class within the scrabble object!!! (Even tho it's not actually inside of the object)

Scrabble.Player = class {
  constructor(name) {
    if (name === undefined) {
      throw new UserException('Name cannot be empty!');
    }
    this.name = name;
    this.plays = [];
  }

  play(word) {
    if (this.hasWon()) {
      return false;
    } else {
      let checkedWord = checkInput(word);
      this.plays.push(checkedWord);
      return true;
    }
  }

  // Totalscore for the player is updated with each play
  totalScore() {
    if (this.plays.length === 0) {
      return 0;
    } else {
      let totalScore = 0;
      for (let play of this.plays) {
        totalScore += Scrabble.score(play);
      }
      return totalScore;
    }
  }

  // Determines if the player has already won
  hasWon() {
    let playerScore = this.totalScore();
    if (playerScore >= 100) {
      return true;
    } else {
      return false;
    }
  }

  // Scores the highest word of all words played for the player
  highestScoringWord() {
    let highestWordForPlayer = Scrabble.highestScoreFrom(this.plays);
    return highestWordForPlayer;
  }

  highestWordScore() {
    let highestWordForPlayer = this.highestScoringWord();
    let score = Scrabble.score(highestWordForPlayer);
    return score;
  }
};


// Generate exceptions objects
const UserException = (message) => {
  this.message = message;
  this.name = 'UserException';
};

// Check the input of the word that is played
const checkInput = (word) => {
  let letterCheck = /^[A-Z]+$/;
  let capitalWord = word.toUpperCase();
  if (capitalWord.match(letterCheck)) {
    return capitalWord;
  } else {
    throw new UserException('Please enter a valid letter');
  }
};

// Check the length of the word that is played
const checkLength = (checkedWord) => {
  if (checkedWord.length > 7) {
    throw new UserException('Word cannot be more than 7 letters');
  }
};

module.exports = Scrabble;
