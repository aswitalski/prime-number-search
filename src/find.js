'use strict';

const math = require('./math');

const primes = ['2', '3'];

const isPrime = (number) => {
    let divisor = 2;
    while (math.isGreater(number, String(divisor))) {
        if (math.isDivisible(number, String(divisor))) {
            //console.log(`Number ${number} is not prime, it's divisable by ${divisor}`);
            return false;
        } else {
            divisor++;
        }
    }
    //console.log(`Number ${number} is prime`);
    return true;
    //}
};

const isPrimeWithCache = (number) => {
    return primes.every(prime =>
    math.isGreater(prime, number) || math.isDivisible(number, prime) === false);
};

const find = (count) => {

    let result;

    if (primes.length >= count) {
        result = primes.slice(0, count);
    } else {

        let current = Array.from(primes).pop() || 2;
        //console.log('Last known prime number:', current);

        while (primes.length < count) {
            current = String(parseInt(current) + 2);
            //console.log('Checking:', current);
            if (isPrimeWithCache(current)) {
                //console.log('Found new prime number:', current);
                primes.push(current);
            }
            //console.log('Current:', current);
        }
        result = Array.from(primes);
    }

    //console.log('  => Found primes:', primes);
    return result;
};

find.isPrime = isPrime;

// noinspection JSUnresolvedVariable
module.exports = find;
