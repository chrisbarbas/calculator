//global variables 
let num1, num2, oper, result;
let tempStr = '';
let dTopStr = '';
let tempNum = '';
let topDec = ''; //decimal in top display
let toggleResult = false; //if selecting bottom display
let minusAsNegative = 0; //if minus sign directly follows an operator
let replaceResult = false; //allows adding decimals to result

const reset = () => {
    num1 = undefined;
    num2 = undefined;
    oper = undefined;
    result = undefined;
    tempStr = '';
    dTopStr = '';
    tempNum = '';
    topDec = '';
    toggleResult = false;
    minusAsNegative = 0;
    replaceResult = false;
    dBottom.textContent = '';
    dTop.textContent = '';
    dBottom.classList.remove('small-b-text')
}

const round3 = (t) => Number(Math.round((t) + 'e3') + 'e-3');
const add = (x, y) => round3(x + y);
const subtract = (x, y) => round3(x - y);
const multiply = (x, y) => round3(x * y);
const divide = (x, y) => round3(x / y);
const infinity = () => { //if divided by zero
    result = 'BOZO'
    setTimeout(() => {
        reset()
    }, 2000);
}
//decBtn eventListener
const addDecimal = () => {
    let str = '';
    replaceResult = false;
    if (num2 === undefined) { //at start
        tempNum = ('.');
        updateTopRow(tempNum);
    }
    if (num2 !== undefined) {
        if (toggleResult === false) {
            if (tempNum !== '') { //most numbers
                tempNum = str.concat(num2, '.');
                updateTopRow(tempNum);
            }
            if (tempNum === '') { //if number begins with a decimal, .8
                tempNum = ('.');
                updateTopRow(tempNum);
            }
        }
        if (toggleResult === true) { //decimal point to result
            replaceResult = true;
            result = str.concat(result, '.');
            dBottom.textContent = result;
        }
    }
}
//signBtn eventListener
const sign = () => {
    if (toggleResult === false) {
        if (tempNum === '') { //before unkown number
            tempNum = `-`;
            updateTopRow(tempNum);
        } else if (tempNum === '-') { //to stop infinite negative signs
            tempNum = '';
            updateTopRow(tempNum);

        } else { //top row if digit already entered
            tempNum *= -1;
            updateTopRow(tempNum);
        }
    }
    if (toggleResult === true) { //bottom row
        result *= -1;
        dBottom.textContent = result;
    }
}
//percBtn eventListener
const percent = () => {
    if (toggleResult === false) {
        if (num1 === undefined && oper === undefined) { //top row at start
            tempNum = round3(tempNum / 100);
            updateTopRow(tempNum);
        }
        if (oper !== undefined && tempNum !== '') { //top row when there's a previous num
            tempNum = round3((num1 / 100) * num2);
            updateTopRow(tempNum);
        }
    }
    if (toggleResult === true) { //bottom row
        result = round3(result / 100);
        dBottom.textContent = result;
    }
}
//digit eventListener sent here to update global variables
const updateNums = (x) => {
    if (toggleResult === false) { //most numbers
        tempNum += x;
        num2 = tempNum;
        updateTopRow(num2);
    }
    if (toggleResult === true) { //result
        if (replaceResult === true) {
            result += x;
            topDec += x;
            dBottom.textContent = result;
            updateTopRow(` ${num2} + .${topDec}`)
            x = '';
        }
    }
    minusAsNegative = 0;
}

function operate() {
    if (!(num1)) {
        num1 = 0;
    }
    let x = Number(num1);
    let y = Number(tempNum);
    switch (oper) {
        case '+':
            result = add(x, y);
            tempNum = '';
            break;
        case '-':
            result = subtract(x, y);
            tempNum = '';
            break;
        case '*':
            result = multiply(x, y);
            tempNum = '';
            break;
        case '/':
            if (y === 0) {
                infinity();
            } else {
                result = divide(x, y);
                tempNum = '';
            }
    }
    toggleResult = false;
    replaceResult === false;
    oper = undefined;
    num1 = result;
    topDec = '';
    dBottom.textContent = result;
}

const digits = document.querySelectorAll('.digits');
for (i of digits) {
    i.addEventListener('click', (e) => {
        checkStrLength();
        updateNums(e.target.id);
    });
}

const operators = document.querySelectorAll('.operators');
for (i of operators) {
    i.addEventListener('click', (e) => {
        checkStrLength();
        if (e.target.id === '=') { // equals sign
            operate();
            toggleResult = true; // toggles false after operate()
        }
        if (e.target.id !== '=') { // other 4 operators 
            minusAsNegative++;
            if (minusAsNegative === 2 && e.target.id === '-') {
                sign();
                --minusAsNegative;
            } else {
                operate();
                oper = e.target.id;
                tempStr = dTopStr.concat(' ', e.target.id);
                dTop.textContent = tempStr;
                if (result === undefined) {
                    num1 = tempNum;
                    tempNum = '';
                }
            }
        }
    });
}

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => reset());

const decBtn = document.querySelector('.decimal');
decBtn.addEventListener('click', () => { //checks for duplicate decimals
    if (num2 === undefined) { // start
        addDecimal();
    }
    if (num2 !== undefined) {
        if (tempNum.includes('.') === false && toggleResult === false) { //top display
            addDecimal();
        }
        if (String(result).includes('.') === false && toggleResult === true) { //bottom
            addDecimal();
        }
    }
});

const signBtn = document.querySelector('.sign');
signBtn.addEventListener('click', () => sign());

const percBtn = document.querySelector('.percent');
percBtn.addEventListener('click', () => percent());

const checkStrLength = () => {
    if (dTopStr.length >= 19) { //slices top display if reaches the edge
        dTopStr = dTopStr.slice(-18);
    }
    if (result !== undefined) {
        if (String(result).length >= 12) { //makes bottom display smaller font
            dBottom.classList.add('small-b-text');
        }
    }
}
//top and bottom displays
const dTop = document.querySelector('#dTop');
const dBottom = document.querySelector('#dBottom');
const updateTopRow = (string) => {
    dTopStr = tempStr.concat(' ', string);
    dTop.textContent = dTopStr;
}