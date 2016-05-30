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
    add: (number, summand) => add(toDigits(number), toDigits(summand)).join(''),
    subtract: (number, subtrahend) => subtract(toDigits(number), toDigits(subtrahend)).join(''),
    modulo: (number, divisor) => modulo(toDigits(number), toDigits(divisor)).join(''),
    isGreater: (number, secondNumber) => isGreater(toDigits(number), toDigits(secondNumber)),
    isDivisible: (number, divisor) => isDivisible(toDigits(number), toDigits(divisor)),
};