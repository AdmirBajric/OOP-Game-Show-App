// Create Phrase class
class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Display phrase on game board
   */
  addPhraseToDisplay() {
    for (let i = 0; i < this.phrase.length; i++) {
      if (this.phrase[i].match(/[A-Za-z]/)) {
        phrase.firstElementChild.innerHTML += `<li class="hide letter ${this.phrase[i]}">${this.phrase[i]}</li>`;
      } else if (this.phrase[i].match(/\s/)) {
        phrase.firstElementChild.innerHTML += `<li class="space"> </li>`;
      }
    }
  }

  /**
   * Checks if passed letter is in phrase
   * @param (string) letter - Letter to check
   */
  checkLetter(letter) {
    let letterExist = [];
    for (let i = 0; i < this.phrase.length; i++) {
      this.phrase[i] === letter ? letterExist.push(this.phrase[i]) : null;
    }
    return letterExist.length > 0 ? true : false;
  }

  /**
   * Displays passed letter on screen after a match is found
   * @param (string) letter - Letter to display
   */
  showMatchedLetter(letter) {
    const letterElement = document.querySelectorAll(".letter");
    letterElement.forEach((item) => {
      if (item.classList.contains(letter)) {
        item.classList.remove("hide");
        item.classList.add("show");
      }
    });
  }
}
