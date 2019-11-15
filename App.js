import React, { Component } from 'react';
import './App.css';
import Menu from './menu';
import Game from './gameDisp';

var patternjs = require('./pattern');
var gm = require('./gamemodes');


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      correctDots: 0,
      semiCorrectDots: 0,
      screenshots: [],
      size: 3,
      length: 4,
      currScreen: "menu",
      gamemode: "",
      instructions: "Select a gamemode"
    }
  }


  /**
   * Updates the number of correct and semi-correct dots for each attempt
   * @param pattern - User Inputted Pattern
   * @param pass - The pregenerated password
   */

  //put inside a something componentwillrender
  check = (pattern, pass) => {
    let feedback = patternjs.feedback(pattern, pass);
    this.setState({
      correctDots: feedback[0],
      semiCorrectDots: feedback[1],
      screenshots: patternjs.screenshots(feedback, this.state.screenshots, pattern, this.state.length, this.state.size)
    });
  }


  goToMenu = () => {
    this.setState({
      currScreen: "menu"
    })
  }

  goToGame = () => {
    this.setState({
      currScreen: "game",
      screenshots: []
    })
  }

  addOne = () => {
    this.setState({
      size: (this.state.size) + 1
    })
  }

  subOne = () => {
    if (this.state.size > 3) {
      this.setState({
        size: (this.state.size) - 1
      })
    }
  }

  addLength = () => {
    this.setState({
      length: (this.state.length) + 1,
    })
  }

  subLength = () => {
    if (this.state.length > 2) {
      this.setState({
        length: (this.state.length) - 1,
      })
    }
  }

  resetScreenshots = () => {
    this.setState({ screenshots: [] })
  }

  nextGamemode = () => {
    this.setState({
      gamemode: gm.setGamemode(this.state.gamemode)
    })
    this.setState({
      instructions: gm.setInstructions(this.state.gamemode)
    })
  }


  /**
   * Displays the gameboard and the screenshots of each attempt
   */
  render() {

    if (this.state.gamemode === "Normal" && this.state.screenshots.length > this.state.size * this.state.size) {
      this.resetScreenshots()
      let numAttempts = this.state.screenshots.length;
      let outMsg = "You did not guess the correct passcode in the attempts alotted. Try again!"
      var that = this;
      setTimeout(function () {
        window.alert(outMsg);
        that.goToMenu()
      }, 500)
    }

    if (this.state.correctDots === this.state.length) {
      this.setState({ correctDots: 0 })
      let numAttempts = this.state.screenshots.length;
      let outMsg = 'You guessed the correct passcode in ' + numAttempts + ' attempts!'
      var that = this;
      setTimeout(function () {
        window.alert(outMsg);
        that.goToMenu()
      }, 500)
    }

    if (this.state.currScreen === "game") {
      //let size = this.state.size;
      /*let s = {
        width: (50 * (size - 1) + 30 * size),
        height: (50 * (size - 1) + 30 * size),
      }*/

      return (
        <Game
          size={this.state.size}
          length={this.state.length}
          attemptNum={this.state.screenshots.length}
          screenshots={this.state.screenshots}
          goToMenu={this.goToMenu.bind(this)}
          check={(pattern, pass) => { this.check(pattern, pass) }}
          resetScreenshots={this.resetScreenshots.bind(this)}
        ></Game>

      );
    }
    else if (this.state.currScreen === "menu") {
      return (
        <Menu
          size={this.state.size}
          length={this.state.length}
          gamemode={this.state.gamemode}
          instructions={this.state.instructions}
          addSize={this.addOne.bind(this)}
          subSize={this.subOne.bind(this)}
          addLength={this.addLength.bind(this)}
          subLength={this.subLength.bind(this)}
          nextGamemode={this.nextGamemode.bind(this)}
          goToGame={this.goToGame.bind(this)}
        ></Menu>

      );
    }
  }
}
