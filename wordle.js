const letters = document.querySelectorAll('.letter');
const loadingDiv = document.querySelector('.info-bar');

async function init() {


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

init();