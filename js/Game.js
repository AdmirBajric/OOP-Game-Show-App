/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [];
    this.activePhrase = null;
  }

  startGame() {
    overlay.style.display = "none";
    this.createPhrases();
    this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  createPhrases() {
    phraseArray.forEach((phrase) => {
      const newArray = new Phrase(phrase);
      this.phrases.push(newArray);
    });
  }

  getRandomPhrase() {
    const randPhrase = Math.floor(
      Math.random(this.phrases) * this.phrases.length
    );
    this.activePhrase = this.phrases[randPhrase];
    return this.activePhrase;
  }

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

  removeLife() {
    hearts[this.missed].setAttribute("src", "images/lostHeart.png");
    this.missed += 1;
    if (this.missed === 5) {
      this.gameOver();
    }
  }

  checkForWin() {
    let wonOrLose = true;
    const letter = document.querySelectorAll(".letter");
    letter.forEach((item) => {
      const win = item.classList.contains("hide");
      if (win) {
        wonOrLose = false;
      }
    });
    return wonOrLose;
  }

  gameOver() {
    overlay.style.display = "";
    gameOver.innerHTML = this.checkForWin() ? "You Won!" : "You Lose!";
    overlay.classList = this.checkForWin() ? "win" : "lose";
    this.resetGame();
  }

  resetGame() {
    phrase.firstElementChild.innerHTML = "";
    hearts.forEach(
      (heart) => (heart.attributes.src.value = "images/liveHeart.png")
    );
    for (const key of btnKey) {
      key.className = "key";
      key.removeAttribute("disabled");
    }
  }
}
