/**
 * @file Pattern
 * @author Group 10
 * @brief the implementation of the pattern for the game BreakLock
 */

 /**
  * @exports Pattern
  * @author Group 10
  */
module.exports = class Pattern {

  /**
  * @brief Constructor for Pattern
  * @details Constructor accepts two parameters for the dimensions of the grid and the size of the pattern.
  * @param patternLength length of the solution.
  * @param gridSize the size of the grid represented by n*n.
  */
  constructor(patternLength, gridSize) {
    this.patternLength = patternLength;
    this.gridSize = gridSize;
    this.passcode = [];

    console.log('the pattern length is: ' + this.patternLength);
    console.log('the grid size is: ' + this.gridSize);
  }

  /**
  * @brief Function to generate a pattern
  * @details Generates a pattern
  */
  //randomly pics one of the possiblePasscodes and assigns it to this.passcode
  generatePattern() {
    let out = [];

    if (this.patternLength === 4 && this.gridSize === 9) {
      this.possiblePasscodes = [
        [0, 1, 3, 7],
        [1, 2, 4, 5],
        [6, 3, 4, 5],
        [4, 5, 1, 0]
      ];
    }

    out = this.possiblePasscodes[
      Math.floor(Math.random() * this.possiblePasscodes.length)
    ];

    this.passcode = out;
    //console.log(this.passcode);
  }

  /**
  * @brief Function to compare user inputted pattern to answer
  * @details Compares the guess to the the passcode, returns array of feedback which
  * gives the user details about how close their solution is
  * @param guess the user input
  */

  //checks an array argument against the calling passcode, returns an array of feedback
  comparePattern(guess) {
    let feedback = [0, 0]; //feedback[0] is the number of dots that are correct and are in the right order
    //feedback[1] is the number of dots that are correct but are in the wrong order
    if (guess.length === this.patternLength) {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === this.passcode[i]) {
          feedback[0]++;
        } else if (this.passcode.includes(guess[i])) {
          feedback[1]++;
        }
      }
    }
    return feedback;
  }
};

//usage example
// let testPattern = new Pattern(4, 9);
// testPattern.generatePattern();
//
// let output = testPattern.comparePattern([6, 2, 7, 4]);
// console.log(output);
