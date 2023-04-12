const letters = document.querySelectorAll('.letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5;
const ROUNDS = 6;

async function init() {
  let currentGuess = "";
  let currentRow = 0;
  let isLoading = true;

  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  const wordParts = word.split("");
  let done = false;
  setLoading(false);
  isLoading = false;

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

    // Do all the marking as "correct", "close", "wrong"
    const guessParts = currentGuess.split("");
    const map = makeMap(wordParts);

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      // Mark as correct
      if (guessParts[i] === wordParts[i]) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
        map[guessParts[i]]--;
      }
    }

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
        // Do nothing, we already did it
      } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
        // Mark as close
        letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
        map[guessParts[i]]--;
      } else {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
      }
    }

    currentRow++;

    // Did they win or lose?
    if (currentGuess === word) {
      // Win
      alert("You win!");
      done = true;
      return;
    } else if (currentRow === ROUNDS) {
      alert(`You lose. The word was ${word}`);
      done = true;
    }

    currentGuess = "";
  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = '';

  }

  document.addEventListener('keydown', function handleKeyPress(event) {
    if (done || isLoading) {
      // Do nothing
      return;
    }

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

function setLoading(isLoading) {
  // If isLoading is not true, it will add 'hidden' class
  loadingDiv.classList.toggle('hidden', !isLoading);
}

function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    if (obj[letter]) {
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }
  return obj;
}

init();