'use strict';

const math = require('./math');

const primes = ['2', '3'];

const isPrime = (number) => {
    let divisor = 2;
    while (math.isGreater(number, String(divisor))) {
        if (math.isDivisible(number, String(divisor))) {
            return false;
        } else {
            divisor = divisor === 2 ? 3 : divisor + 2;
        }
    }
    return true;
};

const canBeDivisor = (number, divisor) => {
    const maxLength = parseInt((number.length + 1) / 2);
    if (divisor.length > maxLength) {
        return false;
    } else if (divisor.length < maxLength) {
        return true;
    } else {
        const maxFirstDigit = [
            [0, 4, 5, 6, 7, 7, 8, 8, 9, 9],
            [0, 1, 1, 1, 2, 2, 2, 2, 2, 3]
        ];
        return divisor[0] <= maxFirstDigit[number.length % 2][number[0]];
    }
};

const isPrimeWithCache = (number) => {
    return primes.every(prime =>
    !canBeDivisor(number, prime) || math.modulo(number, prime) !== '0');
};

const find = (count) => {

    let result;

    if (primes.length >= count) {
        result = primes.slice(0, count);
    } else {

        let current = Array.from(primes).pop() || 2;
        while (primes.length < count) {
            current = math.add(current, '2');
            if (isPrimeWithCache(current)) {
                primes.push(current);
            }
        }
        result = Array.from(primes);
    }

    return result;
};

find.isPrime = isPrime;

module.exports = find;
