'use strict';

const toDigits = (number) => {
    if (number instanceof Array) {
        return number;
    } else if (number instanceof Number) {
        return String(number).split('').map(Number);
    } else {
        return number.match(/(0*)(\d+)/)[2].split('').map(Number);
    }
};

const isGreater = (number, secondNumber) => {
    if (number.length === secondNumber.length) {
        for (let i = 0; i < number.length; i++) {
            const digit = Number(number[i]);
            const secondDigit = Number(secondNumber[i]);
            if (digit > secondDigit) {
                return true;
            } else if (digit < secondDigit) {
                return false;
            }
        }
        return null;
    } else {
        return number.length > secondNumber.length;
    }
};

const isGreaterOrEqual = (number, secondNumber) => isGreater(number, secondNumber) !== false;

const subtract = (number, subtrahend) => {

    //console.log('subtract', number, subtrahend);

    if (isGreater(subtrahend, number)) {
        //console.log('Number:', number, ', subtrahend:', subtrahend);
        throw 'Negative number calculation not supported!'
    }

    const result = [];

    let carry = 0;
    for (let step = 1; step <= number.length; step++) {
        const index = number.length - step;

        const digit = Number(number[index]);
        const sub = Number(subtrahend[index - number.length + subtrahend.length] || 0);

        let difference = digit - sub + carry;
        if (difference < 0) {
            difference += 10;
            carry = -1;
        } else {
            carry = 0;
        }

        result.unshift(difference);
    }

    while (result[0] === 0) result.shift();
    return result;
};

const isDivisible = (number, divisor) => modulo(number, divisor) === 0;

const modulo = (number, divisor) => {

    //console.log(`Dividing ${number} by ${divisor}`);

    let remainder = (number);

    //console.log('Remainder:', remainder);

    while (isGreaterOrEqual(remainder, divisor)) {

        let dividend = remainder.slice(0, divisor.length);
        //console.log('Dividend:', dividend);

        let extra = 0;
        while (!isGreaterOrEqual(dividend, divisor)) {
            //console.log('Dividend smaller than divisor, adding one more digit');
            dividend = remainder.slice(0, divisor.length + ++extra);
            //console.log('Dividend:', dividend);
        }

        const difference = subtract(dividend, divisor);
        //console.log('Difference:', difference);

        remainder.splice(0, dividend.length, ...difference);
        while (remainder[0] === 0) remainder.shift();

        //console.log('Remainder:', remainder);
        //console.log(remainder.join('') + ' % ' + divisor);
    }

    const result = remainder.join('');
    //console.log('Result:', result);
    return Number(result);
};

module.exports = {
    subtract: (number, subtrahend) => subtract(toDigits(number), toDigits(subtrahend)).join(''),
    modulo: (number, divisor) => modulo(toDigits(number), toDigits(divisor)),
    isGreater: (number, secondNumber) => isGreater(toDigits(number), toDigits(secondNumber)),
    isDivisible: (number, divisor) => isDivisible(toDigits(number), toDigits(divisor)),
};