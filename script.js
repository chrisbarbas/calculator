let num1, num2, oper, result;
// let multi = false;
const dTop = document.querySelector('#dTop');
const dBottom = document.querySelector('#dBottom');
let tempStr = '';
let dTopStr = '';
let tempNum = '';
let resultDec = false;
let toggleResDec = false;
let topDec = '';

const updateNums = (x) => {
    if (resultDec === true) {
        topDec += x;
        result += x;
        dBottom.textContent = result;
        dTopStr = tempStr.concat(` ${num2}.${topDec}`);
        dTop.textContent = dTopStr;
        x = '';
    }
    if (resultDec === false) {
        tempNum += x;
        num2 = tempNum;
        dTopStr = tempStr.concat(' ', num2);
        dTop.textContent = dTopStr;
    }
}


const reset = () => {
    num1 = undefined;
    num2 = undefined;
    oper = undefined;
    result = undefined;
    tempStr = '';
    dTopStr = '';
    tempNum = '';
    dBottom.textContent = '';
    dTop.textContent = '';
}

const addDecimal = () => {
    let str = '';
    if (num1 === undefined && num2 === undefined) {
        tempNum = str.concat('', '.');
        dTopStr = tempStr.concat(' ', tempNum);
        dTop.textContent = dTopStr;
    }
    if (num2 !== undefined) {
        if (toggleResDec === false) {
            tempNum = str.concat(num2, '.');
            dTopStr = tempStr.concat(' ', tempNum);
            dTop.textContent = dTopStr;
        }
        if (toggleResDec === true) {
            result = str.concat(result, '.');
            dBottom.textContent = result;
            resultDec = true;
        }
    }
}

const round3 = (t) => Number(Math.round((t) + 'e3') + 'e-3');
const add = (x, y) => round3(x + y);
const subtract = (x, y) => round3(x - y);
const multiply = (x, y) => round3(x * y);
const divide = (x, y) => round3(x / y);
const infinity = () => {
    result = 'BOZO'
    setTimeout(() => {
        reset()
    }, 2000);
}

function operate() {
    if (!(num1)) {
        num1 = 0;
    }
    let x = Number(num1);
    let y = Number(num2);
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
    toggleResDec = false;
    oper = undefined;
    num1 = result;
    dBottom.textContent = result;
}


const digits = document.querySelectorAll('.digits');
for (i of digits) {
    i.addEventListener('click', (e) => {
        updateNums(e.target.id);
    });
}

const operators = document.querySelectorAll('.operators');
for (i of operators) {
    i.addEventListener('click', (e) => {
        resultDec = false;
        if (e.target.id === '=') {
            operate();
            toggleResDec = true;
        }
        if (e.target.id !== '=') {
            operate();
            // }
            oper = e.target.id
            tempStr = dTopStr.concat(' ', e.target.id);
            dTop.textContent = tempStr;
            if (result === undefined) {
                num1 = tempNum;
                tempNum = '';
            }
        }
    });
}

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => reset());

const decBtn = document.querySelector('.decimal');
decBtn.addEventListener('click', () => {
    if (num2 === undefined) {
        addDecimal();
    }
    if (num2 !== undefined) {
        if (num2.includes('.') === false && toggleResDec === false) {
            addDecimal();
        }
        if (String(result).includes('.') === false && toggleResDec === true) {
            addDecimal();
        }
    }
});