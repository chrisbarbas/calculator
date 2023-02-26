const add = ((x, y) => x + y);
const subtract = ((x, y) => x - y);
const multiply = ((x, y) => x * y);
const divide = ((x, y) => x / y);

const operate = ((oper, x, y) => {
    if (oper == 'add') return add(x, y);
    else if (oper == 'subtract') return subtract(x, y);
    else if (oper == 'multiply') return multiply(x, y);
    else if (oper == 'divide') return divide(x, y);

})

console.log(operate('divide', 4, 3));