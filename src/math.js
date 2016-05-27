'use strict';

const normalize = (number) => {
    while (number.indexOf('0') === 0) {
        number = number.substring(1);
    }
    return number;
};

const isGreater = (number, secondNumber) => {

    //console.log('isGreater', number, secondNumber);

    if (number.length === secondNumber.length) {
        for (let i = 0; i < number.length; i++) {
            const digit = parseInt(number[i]);
            const secondDigit = parseInt(secondNumber[i]);
            if (digit > secondDigit) {
                return true;
            } else if (digit < secondDigit) {
                return false;
            }
        }
        return false;
    } else {
        return number.length > secondNumber.length;
    }
};

const getDigits = (number) => number.split('');

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

        const digit = parseInt(digits[index]);
        const sub = parseInt(subs[index - digits.length + subs.length] || '0');

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

const isDivisible = (number, divisor) => {

    //console.log('isDivisible', number, divisor);
    let remainder = number;

    while (isGreater(remainder, divisor)) {
        // TODO: subtract decimal multiplication
        remainder = subtract(remainder, divisor);
        //console.log('Remainder:', remainder);
    }

    const result = remainder === 0 || remainder === divisor;
    //console.log('=>', result);
    return result;
};

module.exports = {
    subtract,
    isGreater,
    isDivisible
};