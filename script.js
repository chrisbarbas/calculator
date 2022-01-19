// let num1 = undefined;
// let num2 = undefined;
// let oper = undefined;
// let result = undefined;
let num1, num2, oper, result;
let multi = false;
const dTop = document.querySelector('#dTop');
const dBottom = document.querySelector('#dBottom');
let tempStr = '';
let dTopStr = '';
let tempNum = '';

const updateNums = (x) => {
    tempNum += x;
    console.log(tempNum)
    dTopStr = tempStr.concat(' ', tempNum);
    dTop.textContent = dTopStr;
    if (multi = true) {
        num2 = tempNum;
        console.log(num2)
        dTopStr = tempStr.concat(' ', num2);
        dTop.textContent = dTopStr;

    }
}

const updateOper = (str) => {
    if (oper === undefined) {
        oper = str;
    }
    console.log(oper)
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

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

function operate() {
    console.log(num1)
    console.log(num2)
    if (!(num1)) {
        num1 = 0;
    }
    let x = parseInt(num1);
    let y = parseInt(num2);
    console.log(x)
    switch (oper) {
        case '+':
            result = add(x, y);
            tempNum = '';
            break;
        case '-':
            result = subtract(x, y);
            console.log(result)
            tempNum = '';
            break;
        case '*':
            result = multiply(x, y);
            tempNum = '';
            break;
        case '/':
            if (y === 0) {
                result = 'BOZO'
                setTimeout(() => {
                    reset()
                }, 2000);
            } else {
                result = divide(x, y);
                tempNum = '';
                // break;
            }
    }
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
        if (e.target.id === '=') {
            operate();
        }
        if (e.target.id !== '=') {
            if (num2 !== undefined) {
                operate();
            }
            updateOper(e.target.id);
            tempStr = dTopStr.concat(' ', e.target.id);
            dTop.textContent = tempStr;
            multi = true;
            if (result === undefined) {
                num1 = tempNum;
                tempNum = '';
            }
        }
    });
}

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => reset());