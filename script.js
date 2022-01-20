//global variables 
let num1, num2, oper, result;
let tempStr = '';
let dTopStr = '';
let tempNum = ''; 
let topDec = ''; //decimal in top display
let toggleResult = false; //if selecting bottom display

//AC button calls it to clear the global variables
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
    dBottom.textContent = '';
    dTop.textContent = '';
    dBottom.classList.remove('small-b-text')
}

//functions called in operate()
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
//triggers on decimal button
const addDecimal = () => {
    let str = '';
    if (num1 === undefined && num2 === undefined) { //at start
        console.log('magenta')
        tempNum = str.concat('', '.');
        dTopStr = tempStr.concat(' ', tempNum);
        dTop.textContent = dTopStr;
    }
    if (num2 !== undefined) {
        if (toggleResult === false) {
            if (tempNum !== '') { //most numbers
                console.log('teal3')
                tempNum = str.concat(num2, '.');
                dTopStr = tempStr.concat(' ', tempNum);
                dTop.textContent = dTopStr;
            }
            if (tempNum === '') { //if number begins with a decimal, .8
                console.log('teal')
                tempNum = str.concat('.');
                dTopStr = tempStr.concat(' ', tempNum);
                dTop.textContent = dTopStr;
            }
        }
        if (toggleResult === true) { //result
            result = str.concat(result, '.');
            dBottom.textContent = result;
        }
    }
}
//digit eventListener sent here to update global variables
const updateNums = (x) => {
    if (toggleResult === false) { //most numbers
        tempNum += x;
        num2 = tempNum;
        dTopStr = tempStr.concat(' ', num2);
        dTop.textContent = dTopStr;
        console.log('blue')
    }
    if (toggleResult === true) { //result
        result += x;
        topDec += x;
        dBottom.textContent = result;
        dTopStr = tempStr.concat(` ${num2} + .${topDec}`);
        dTop.textContent = dTopStr;
        x = '';
        console.log('green')
    }
}

function operate() {
    console.log(num1)
    console.log(num2)
    console.log(tempNum)
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
        if (e.target.id === '=') {
            operate();
            toggleResult = true; // toggles false after operate()
        }
        if (e.target.id !== '=') {
            operate();
            // toggleResult = false;
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
    if (num2 === undefined) { //decimal at start
        console.log('dec1')
        addDecimal();
    } //checks for duplicate decimals
    if (num2 !== undefined) {
        if (tempNum.includes('.') === false && toggleResult === false) { //top display
            console.log('dec2')
            addDecimal();
        }
        if (String(result).includes('.') === false && toggleResult === true) { //bottom
            console.log('dec3')
            addDecimal();
        }
    }
});

const checkStrLength = () => {
    if (dTopStr.length >= 19) { //slices top display if reaches the edge
        dTopStr = dTopStr.slice(-18)
    }
    if (result !== undefined) {
        if (String(result).length >= 12) { //makes result smaller font
            dBottom.classList.add('small-b-text')
        }
    }
}

const dTop = document.querySelector('#dTop');
const dBottom = document.querySelector('#dBottom');

// const signBtn = document.querySelector('.sign');
// signBtn.addEventListener('click', () => sign());

// const sign = () => {
//     toggleSignNew = true;
//     let str = '';
//     if (num1 === undefined && num2 === undefined) {
//         tempNum = `-`;
//         dTopStr = tempStr.concat(' ', '-');
//         dTop.textContent = dTopStr;
//         toggleSign = false;
//     }
//     if (num2 !== undefined) {
//         if (toggleResult === false) {
//             if (toggleSign === false) {
//                 tempNum = num2 * -1;
//                 dTopStr = tempStr.concat(' ', tempNum);
//                 dTop.textContent = dTopStr;
//                 console.log('green')
//                 toggleSign = false;
//             }
//             if (toggleSign === true) {
//                 tempNum = `-${num2}`;
//                 dTopStr = tempStr.concat(' ', '-');
//                 dTop.textContent = dTopStr;
//                 console.log('red')
//             }
//         }
//     }
// }