const letters = document.querySelectorAll('.letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5;

async function init() {
  let currentGuess = "";
  let currentRow = 0;

  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      // Add letter to the end of guess
      currentGuess += letter;
    } else {
      // Replace the last letter if guess is >= 5 letters
      currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    // Display letter
    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
  }

  async function enter() {
    if (currentGuess.length !== ANSWER_LENGTH) {
      // Do nothing
      return;
    }

    // TODO Validate the word

    // TODO Do all the marking as "correct", "close", "wrong"

    // TODO Did they win or lose?

    currentRow++;
    currentGuess = "";
  }

  document.addEventListener('keydown', function handleKeyPress(event) {
    const action = event.key;

    if (action === 'Enter') {
      enter();
    } else if (action === 'Backspace') {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // Do nothing
    }
  });
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}


init();