'use strict';

const math = require('./math');
const cache = require('./cache');

const isPrime = (number) => {
    let divisor = 2;
    while (math.compare(number, String(divisor)) === 1) {
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
            [0, 44, 54, 63, 70, 77, 83, 89, 94, 99],
            [0, 14, 17, 19, 22, 24, 26, 28, 29, 31]
        ];
        const max = maxFirstDigit[number.length % 2][number[0]];
        if (number.length === 1) {
            return Number(divisor[0]) <= parseInt(max / 10);
        } else {
            return divisor.substring(0, 2) <= max;
        }
    }
};

const isPrimeWithCache = (number, primes) => {
    return primes
        .every(prime => !canBeDivisor(number, prime) || math.modulo(number, prime) !== '0');
};

const find = (count) => {

    let result;

    let primes = cache.getAll();

    if (primes.length >= count) {
        result = primes.slice(0, count);
    } else {
        let current = primes[primes.length - 1] || '2';
        while (primes.length < count) {
            current = math.add(current, '2');
            if (isPrimeWithCache(current, primes)) {
                cache.push(current);
                if (primes.length % 1000 === 0 && count > primes.length) {
                    console.log(` => ${primes.length}th: ${current}`);
                }
            }
        }
        result = Array.from(primes);
    }

    return result;
};

find.isPrime = isPrime;

module.exports = find;
