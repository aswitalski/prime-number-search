'use strict';

const find = require('../src/find');
const assert = require('assert');

describe('Primary Numbers', function() {

    this.timeout(3.5 * 60000);

    describe('Search', () => {

        it('returns 2 as the first prime number', () => {

            const primes = find(1);
            assert.deepEqual(primes, [2]);
        });

        it('returns 2, 3, 5, 7, 11, 13, 17 as the first seven prime numbers', () => {

            const primes = find(7);
            assert.deepEqual(primes, [2, 3, 5, 7, 11, 13, 17]);
        });

        it.only('Searches for 1000 prime numbers', () => {
           assert.equal(find(1000).length, 1000);
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
