// Create Game class
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [];
    this.activePhrase = null;
  }

  /**
   * Begins game by creating and selecting a random phrase and displaying it to user
   */
  startGame() {
    overlay.style.display = "none";
    overlay.className = "start";
    this.createPhrases();
    this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  /**
   * Creates phrases for use in game
   * @return {array} An array of phrases that could be used in the game
   */
  createPhrases() {
    phraseArray.forEach((phrase) => {
      const newArray = new Phrase(phrase);
      this.phrases.push(newArray);
    });
  }

  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    const randPhrase = Math.floor(
      Math.random(this.phrases) * this.phrases.length
    );
    this.activePhrase = this.phrases[randPhrase];
  }

  /**
   * Handles onscreen keyboard button clicks
   * @param (HTMLButtonElement) button - The clicked button element
   */
  handleInteraction(clicked) {
    clicked.setAttribute("disabled", "");
    const checkIfExist = this.activePhrase.checkLetter(clicked.textContent);

    if (checkIfExist) {
      clicked.className += " chosen";
      this.activePhrase.showMatchedLetter(clicked.textContent);
      const winLose = this.checkForWin();
      if (winLose) {
        this.gameOver();
      }
    } else {
      clicked.className += " wrong";
      this.removeLife();
    }
  }

  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
  removeLife() {
    hearts[this.missed].setAttribute("src", "images/lostHeart.png");
    this.missed += 1;
    if (this.missed === 5) {
      this.gameOver();
    }
  }

  /**
   * Checks for winning move
   * @return {boolean} True if game has been won, false if game wasn't won
   */
  checkForWin() {
    let wonOrLose = true;
    const letter = document.querySelectorAll(".letter");
    letter.forEach((item) => {
      const exist = item.classList.contains("hide");
      if (exist) {
        wonOrLose = false;
      }
    });
    return wonOrLose;
  }

  /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
  gameOver() {
    overlay.style.display = "inherit";
    gameOver.innerHTML = this.checkForWin() ? "You Won!" : "You Lose!";
    overlay.classList = this.checkForWin() ? "win" : "lose";
    this.resetGame();
  }

  /**
   * After a game is completed, the gameBoard is reset so that clicking the
   * "Start Game" button or pressed the keyboard key enter loads a new game
   */
  resetGame() {
    phrase.firstElementChild.innerHTML = "";
    hearts.forEach(
      (heart) => (heart.attributes.src.value = "images/liveHeart.png")
    );
    for (const key of btnKey) {
      key.className = "key";
      key.removeAttribute("disabled");
    }
    this.missed = 0;
  }
}
