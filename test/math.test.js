'use strict';

const math = require('../src/math');
const assert = require('assert');

describe('Basic string mathematics', () => {

    describe('Number comparison', () => {

        it('100 is greater than 99', () => {
            assert.equal(math.isGreater('100', '99'), true);
        });

        it('1234 is greater than 1233', () => {
            assert.equal(math.isGreater('1234', '1233'), true);
        });

        it('99 is not greater than 100', () => {
            assert.equal(math.isGreater('99', '100'), false);
        });

        it('666 is not greater than 666', () => {
            assert.equal(math.isGreater('666', '666'), false);
        });

        it('14 is not greater than 23', () => {
            assert.equal(math.isGreater('14', '23'), false);
        });
    });

    describe('Subtraction', () => {

        it('100 - 99 = 1', () => {
            assert.equal(math.subtract('100', '99'), '1');
        });

        it('666 - 333 = 333', () => {
            assert.equal(math.subtract('666', '333'), '333');
        });

        it('12345678 - 2345679 = 9999999', () => {
            assert.equal(math.subtract('12345678', '2345679'), '9999999');
        });

        it('1 - 2 = ERROR', () => {
            assert.throws(math.subtract.bind('1', '2'));
        });
    });

    describe('Divisibility', () => {

        const divisible = [
            [3, 3], [99, 33], [49, 7], [63, 9], [63, 7]
        ];

        const notDivisible = [
            [3, 2], [12353, 2], [12367, 3], [77, 9], [997, 3]
        ];

        divisible.map(([number, divisor]) => {
            it(`${number} divisible by ${divisor}`, () => {
                assert.equal(math.isDivisible(String(number), String(divisor)), true);
            });
        });

        notDivisible.map(([number, divisor]) => {
            it(`${number} not divisible by ${divisor}`, () => {
                assert.equal(math.isDivisible(String(number), String(divisor)), false);
            });
        });
    });
});
