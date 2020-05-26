/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  addPhraseToDisplay() {
    let html = "";

    for (let i = 0; i < this.phrase.length; i++) {
      if (this.phrase[i].match(/[a-z]/)) {
        html += `<li class="hide letter ${this.phrase[i]}">${this.phrase[i]}</li>`;
      } else if (this.phrase[i].match(/\s/)) {
        html += `<li class="space"> </li>`;
      }
    }
    phrase.firstElementChild.innerHTML = html;
  }

  checkLetter(keyPressed) {
    let letterExist = [];
    for (let i = 0; i < this.phrase.length; i++) {
      this.phrase[i] === keyPressed ? letterExist.push(this.phrase[i]) : false;
    }
    return letterExist.length > 0 ? true : false;
  }

  showMatchedLetter(displayLetter) {
    const letter = document.querySelectorAll(".letter");
    letter.forEach((item) => {
      if (item.classList.contains(displayLetter)) {
        item.classList.remove("hide");
        item.classList.add("show");
      }
    });
  }
}
