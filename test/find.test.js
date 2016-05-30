'use strict';

const find = require('../src/find');
const assert = require('assert');

describe('Primary Numbers', () => {

    describe('Search', () => {

        it('returns 2 as the first prime number', () => {

            const primes = find(1);
            assert.deepEqual(primes, ['2']);
        });

        it('returns 2, 3, 5, 7, 11, 13, 17 as first seven prime numbers', () => {
            const primes = find(7);
            assert.deepEqual(primes, ['2', '3', '5', '7', '11', '13', '17']);
        });

        it('The 100th prime number is 541', () => {
            const result = find(100);
            assert.equal(result.pop(), 541);
        });

        it.skip('The 1000th prime number is 7919', () => {
           assert.equal(find(1000).pop(), 7919);
        });

        it.skip('The 5000th prime number is 48611', () => {
           assert.equal(find(5000).pop(), 48611);
        });

        it.skip('The 10000th prime number is 104729', () => {
           assert.equal(find(10000).pop(), 104729);
        });
    });

    describe('Check', () => {

        const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
        const notPrimes = [4, 9, 15, 25, 91, 119, 437, 667];

        primes.map(prime => {
            it(`${prime} is prime`, () => {
                assert.equal(find.isPrime(String(prime)), true);
            });
        });

        notPrimes.map(notPrime => {
            it(`${notPrime} is not prime`, () => {
                assert.equal(find.isPrime(String(notPrime)), false);
            });
        });
    });

});
