// Define game variable
let game;

// Variable phraseArray with 5 word guessing strings
const phraseArray = [
  "Strive for greatness",
  "There is no substitute for hard work",
  "Whatever you do do it well",
  "Love For All Hatred For None",
  "What we think we become",
];

// Selecting required elements to manipulate the DOM
const startBtn = document.getElementById("btn__reset");
const keyboard = document.querySelectorAll(".key");
const phrase = document.getElementById("phrase");
const btnKey = document.getElementsByClassName("key");
const hearts = document.querySelectorAll("img");
const overlay = document.getElementById("overlay");
const gameOver = document.getElementById("game-over-message");

/**
 * Added EventListener with the event click on the button 'Start Game',
 * Created a new instance of the Game class
 * Starting the game and control the keyboard inputs with physical keyboard
 */

startBtn.addEventListener("click", () => {
  game = new Game();
  game.startGame();
  physicalKeyboard();
});

/**
 * Added EventListener with the event click on all onscreen keyboard buttons
 * Calling the method handleInteraction on the game object, to control yhe game logic
 */
keyboard.forEach((key) => {
  key.addEventListener("click", (e) => {
    game.handleInteraction(e.target);
  });
});

/**
 * Added EventListener on the document object with the event keyup
 * When the keyboard key Enter is pressed a new instance of the game is created
 * Starting the game and control the keyboard inputs with physical keyboard
 */
document.addEventListener("keyup", (e) => {
  if (overlay.style.display !== "none") {
    if (e.keyCode === 13) {
      game = new Game();
      game.startGame();
      physicalKeyboard();
    }
  }
});

/**
 * The physicalKeyboard function controls the inputs keys on the page
 */
const physicalKeyboard = () => {
  document.addEventListener("keyup", (e) => {
    if (overlay.className === "win" || overlay.className === "lose") {
      e.preventDefault();
    } else {
      for (const btn of btnKey) {
        if (
          btn.textContent.includes(e.key.toLowerCase()) &&
          btn.className === "key"
        ) {
          game.handleInteraction(btn);
        }
      }
    }
  });
};
