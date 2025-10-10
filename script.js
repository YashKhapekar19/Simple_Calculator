const display = document.getElementById('display');

function appendCharacter(char) {
  const lastChar = display.value.slice(-1);
  const operators = ['+', '-', '*', '/'];

  // Prevent multiple operators in a row
  if (operators.includes(lastChar) && operators.includes(char)) {
    return;
  }

  // Prevent starting with an operator (except '-')
  if (display.value === '' && operators.includes(char) && char !== '-') {
    return;
  }

  // Prevent multiple decimals in one number
  const currentNumber = display.value.split(/[\+\-\*\/]/).pop();
  if (char === '.' && currentNumber.includes('.')) {
    return;
  }

  // Append the character
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
    if (display.value.trim() === '') return; // Prevent empty evaluation
    let result = eval(display.value);

    // Handle invalid or infinite results
    if (!isFinite(result)) throw new Error('Invalid');

    // Limit decimal precision to avoid floating-point issues
    result = parseFloat(result.toPrecision(12));

    display.value = result;
  } catch (error) {
    display.value = 'Error';
    setTimeout(() => {
      clearDisplay();
    }, 1500);
  }
}
