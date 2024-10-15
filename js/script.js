let firstNumber = null;
let secondNumber = null;
let operator = null;
let resultScreen = document.querySelector('.screen');
let operationScreen = document.querySelector('.operation-screen');  // New element to show ongoing operation
let shouldResetScreen = false;  // Flag to reset screen after an operation
let clickedNumber = document.querySelectorAll('.numbers button');

for (let item of clickedNumber) {
    item.addEventListener('click', () => {
        let keyPressed = item.getAttribute("value");
        switch (keyPressed) {
            case "ac":
                clearScreen();
                break;
            case "+-":
                toggleSign();
                break;
            case "%":
                percent();
                break;
            case "/":
            case "x":
            case "-":
            case "+":
                handleOperator(keyPressed);
                break;
            case ",":
                addDecimalPoint();
                break;
            case "=":
                calculate();
                break;
            default:
                appendNumber(keyPressed);
                break;
        }
    });
}

function clearScreen() {
    resultScreen.innerHTML = "0";
    operationScreen.innerHTML = "";  // Clear the operation screen
    firstNumber = null;
    secondNumber = null;
    operator = null;
    shouldResetScreen = false;
}

function toggleSign() {
    let currentDisplay = resultScreen.innerHTML;
    if (currentDisplay !== "0") {
        if (currentDisplay.startsWith("-")) {
            resultScreen.innerHTML = currentDisplay.substring(1);  // Remove '-' if negative
        } else {
            resultScreen.innerHTML = "-" + currentDisplay;  // Add '-' if positive
        }
    }
}

function percent() {
    let currentDisplay = parseFloat(resultScreen.innerHTML.replace(",", "."));
    if (!isNaN(currentDisplay)) {
        resultScreen.innerHTML = (currentDisplay / 100).toString().replace(".", ",");
    }
}

function handleOperator(op) {
    if (operator !== null && !shouldResetScreen) {
        calculate();  // If there's an ongoing operation and a new operator is clicked, calculate first
    }
    firstNumber = parseFloat(resultScreen.innerHTML.replace(",", "."));
    operator = op;
    shouldResetScreen = true;

    // Update the operation screen to reflect the current operation
    operationScreen.innerHTML = `${firstNumber.toString().replace(".", ",")} ${operator}`;
}

function addDecimalPoint() {
    if (!resultScreen.innerHTML.includes(",")) {
        resultScreen.innerHTML += ",";  // Add comma only if it does not already exist
    }
}

function appendNumber(number) {
    if (shouldResetScreen) {
        resultScreen.innerHTML = number;
        shouldResetScreen = false;
    } else {
        if (resultScreen.innerHTML === "0") {
            resultScreen.innerHTML = number;  // Replace "0" with new number
        } else {
            resultScreen.innerHTML += number;
        }
    }
}

function calculate() {
    if (operator === null || firstNumber === null) {
        return;  // No operation to perform
    }
    secondNumber = parseFloat(resultScreen.innerHTML.replace(",", "."));
    let result;
    switch (operator) {
        case "+":
            result = addition(firstNumber, secondNumber);
            break;
        case "-":
            result = subtraction(firstNumber, secondNumber);
            break;
        case "x":
            result = multiplication(firstNumber, secondNumber);
            break;
        case "/":
            result = division(firstNumber, secondNumber);
            break;
        default:
            return;
    }

    // Update the operation screen with the full calculation
    operationScreen.innerHTML = `${firstNumber.toString().replace(".", ",")} ${operator} ${secondNumber.toString().replace(".", ",")} =`;

    // Display the result
    resultScreen.innerHTML = result.toString().replace(".", ",");
    firstNumber = result;  // Set the result as the new first number for further operations
    operator = null;  // Reset operator
    shouldResetScreen = true;  // Prepare for the next operation
}

function addition(number1, number2) {
    return number1 + number2;
}

function subtraction(number1, number2) {
    return number1 - number2;
}

function multiplication(number1, number2) {
    return number1 * number2;
}

function division(number1, number2) {
    if (number2 === 0) {
        return "Error";  // Handle division by zero
    }
    return number1 / number2;
}
