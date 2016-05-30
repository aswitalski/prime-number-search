'use strict';

const getDigits = (number) => {
    if (number instanceof Array) {
        return number;
    } else if (typeof number === 'number') {
        return String(number).split('').map(Number);
    } else if (typeof number === 'string') {
        return number.match(/(0*)(\d+)/)[2].split('').map(Number);
    } else {
        throw 'Illegal argument: ' + number;
    }
};

const compare = (a, b) => {
    if (a.length === b.length) {
        for (let i = 0; i < a.length; i++) {
            const da = Number(a[i]);
            const db = Number(b[i]);
            if (da !== db) {
                return da > db ? 1 : -1;
            }
        }
        return 0;
    } else {
        return a.length > b.length ? 1 : -1;
    }
};

const isGreaterOrEqual = (a, b) => compare(a, b) >= 0;
const isGreater = (a, b) => compare(a, b) > 0;

const add = (number, summand) => {

    const result = [];

    let carry = 0;
    for (let step = 1; step <= number.length; step++) {
        const index = number.length - step;
        const digit = Number(number[index]);
        const sub = Number(summand[index - number.length + summand.length] || 0);
        let sum = digit + sub + carry;
        if (sum > 9) {
            sum -= 10;
            carry = 1;
        } else {
            carry = 0;
        }
        result.unshift(sum);
    }
    if (carry > 0) {
        result.unshift(carry);
    }

    while (result.length > 1 && result[0] === 0) result.shift();
    return result;
};

const subtract = (number, subtrahend) => {

    let negative = false;

    if (isGreater(subtrahend, number)) {
        negative = true;
        const temp = number;
        number = subtrahend;
        subtrahend = temp;
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

    while (result.length > 1 && result[0] === 0) result.shift();

    if (negative) {
        result.unshift('-');
    }

    return result;
};

const isDivisible = (number, divisor) => {
    const result = modulo(number, divisor);
    return result[0] === 0;
};

const modulo = (number, divisor) => {

    let remainder = (number);
    while (isGreaterOrEqual(remainder, divisor)) {

        let dividend = remainder.slice(0, divisor.length);

        let extra = 0;
        while (!isGreaterOrEqual(dividend, divisor)) {
            dividend = remainder.slice(0, divisor.length + ++extra);
        }

        const difference = subtract(dividend, divisor);

        remainder.splice(0, dividend.length, ...difference);
        while (remainder.length > 1 && remainder[0] === 0) remainder.shift();
    }

    return remainder;
};

module.exports = {
    add: (number, summand) => add(getDigits(number), getDigits(summand)).join(''),
    subtract: (number, subtrahend) => subtract(getDigits(number), getDigits(subtrahend)).join(''),
    modulo: (number, divisor) => modulo(getDigits(number), getDigits(divisor)).join(''),
    compare: (a, b) => compare(getDigits(a), getDigits(b)),
    isDivisible: (number, divisor) => isDivisible(getDigits(number), getDigits(divisor)),
};