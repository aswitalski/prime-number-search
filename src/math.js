'use strict';

const normalize = (number) => {
    if (number instanceof Array) {
        number = number.join('');
    }
    while (number.indexOf('0') === 0) {
        number = number.substring(1);
    }
    return number;
};

const isGreater = (number, secondNumber) => {
    number = normalize(number);
    secondNumber = normalize(secondNumber);
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

const getDigits = (number) => normalize(number).split('').map(Number);

const subtract = (number, subtrahend) => {

    //console.log('subtract', number, subtrahend);

    number = normalize(number);
    subtrahend = normalize(subtrahend);

    if (isGreater(subtrahend, number)) {
        console.log('Number:', number, ', subtrahend:', subtrahend);
        throw 'Negative number calculation not supported!'
    }

    const digits = getDigits(number);
    const subs = getDigits(subtrahend);

    const result = [];

    let carry = 0;
    for (let step = 1; step <= digits.length; step++) {
        const index = digits.length - step;

        const digit = Number(digits[index]);
        const sub = Number(subs[index - digits.length + subs.length] || '0');

        let difference = digit - sub + carry;
        if (difference < 0) {
            difference += 10;
            carry = -1;
        } else {
            carry = 0;
        }

        result.unshift(difference);
    }

    return normalize(result.join(''));
};

const isDivisible = (number, divisor) => modulo(number, divisor) === 0;

const modulo = (number, divisor) => {

    //console.log(`Dividing ${number} by ${divisor}`);

    let remainder = getDigits(number);
    divisor = getDigits(divisor);

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

        const difference = getDigits(subtract(dividend, divisor));
        //console.log('Difference:', difference);

        remainder.splice(0, dividend.length, ...difference);

        //console.log('Remainder:', remainder);
    }

    const result = remainder.join('');
    //console.log('Result:', result);
    return Number(result);
};

module.exports = {
    subtract,
    modulo,
    isGreater,
    isDivisible
};