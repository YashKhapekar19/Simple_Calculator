const display = document.getElementById('display');

function appendCharacter(char) {
  const lastChar = display.value.slice(-1);
  const operators = ['+', '-', '*', '/'];

  // Prevent multiple operators
  if (operators.includes(lastChar) && operators.includes(char)) {
    return;
  }

  // Prevent multiple decimals in one number
  if (char === '.' && display.value.split(/[\+\-\*\/]/).pop().includes('.')) {
    return;
  }

  display.value += char;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    let result = eval(display.value);
    result = parseFloat(result.toPrecision(12)); // handle floating errors
    display.value = result;
  } catch (error) {
    display.value = 'Error';
    setTimeout(() => {
      clearDisplay();
    }, 1500);
  }
}