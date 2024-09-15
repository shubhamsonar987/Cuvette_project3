// Get elements from the DOM
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const operators = document.querySelectorAll('.operator');
const equalButton = document.getElementById('equal');
const resetButton = document.getElementById('reset');
const deleteButton = document.getElementById('del');

// Variables to hold calculation data
let currentOperand = '';
let previousOperand = '';
let currentOperator = null;

// Update display
function updateDisplay(value) {
    display.textContent = value;
}

// Handle number and dot button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (value === '.' && currentOperand.includes('.')) return; // Avoid multiple dots
        currentOperand += value;
        updateDisplay(currentOperand);
    });
});

// Handle operator button clicks
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (currentOperand === '') return; // No operator if nothing entered
        if (previousOperand !== '') {
            calculate(); // Calculate before applying new operator
        }
        currentOperator = operator.getAttribute('data-operator');
        previousOperand = currentOperand;
        currentOperand = '';
    });
});

// Calculate the result
function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(curr)) return; // Check for valid numbers

    switch (currentOperator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                alert("Cannot divide by zero!");
                return;
            }
            result = prev / curr;
            break;
        default:
            return;
    }

    currentOperand = result.toString();
    currentOperator = null;
    previousOperand = '';
    updateDisplay(currentOperand);
}

// Handle equal button click
equalButton.addEventListener('click', calculate);

// Handle reset button click
resetButton.addEventListener('click', () => {
    currentOperand = '';
    previousOperand = '';
    currentOperator = null;
    updateDisplay('');
});

// Handle delete button click
deleteButton.addEventListener('click', () => {
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay(currentOperand);
});
