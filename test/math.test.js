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

        it('14 is not greater than 23', () => {
            assert.equal(math.isGreater('14', '23'), false);
        });

        it('666 is not greater than 666', () => {
            assert.equal(math.isGreater('666', '666'), null);
        });

        it('15 is equal 15', () => {
            assert.equal(math.isGreater('15', '15'), null);
        });
    });

    describe('Addition', () => {

        it('99 + 1 = 100', () => {
            assert.equal(math.add('99', '1'), '100');
        });

        it('999 + 888 = 1887', () => {
            assert.equal(math.add('999', '888'), '1887');
        });

        it('451 + 548 = 999', () => {
            assert.equal(math.add('451', '548'), '999');
        });

        describe('Beyond JS max safe integer', () => {

            it('9007199254740991 + 59008 = 9007199254799999', () => {
                assert.equal(math.add('9007199254740991', '59008'), '9007199254799999');
            });

            it('20000000000000000 + 20000000000000000 = 40000000000000000', () => {
                assert.equal(math.add('20000000000000000', '20000000000000000'), '40000000000000000');
            });
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

        it('5 - 5 = 0', () => {
            assert.equal(math.subtract('5', '5'), '0');
        });

        it('99 - 99 = 0', () => {
            assert.equal(math.subtract('99', '099'), '0');
        });

        it('1 - 2 = -1', () => {
            assert.equal(math.subtract('1', '2'), '-1');
        });

        it('12345678 - 23456789 = -11111111', () => {
            assert.equal(math.subtract('12345678', '23456789'), '-11111111');
        });

        describe('Beyond JS max safe integer', () => {

            it('9007199254740991 - 9007199254740992 = -1', () => {
                assert.equal(math.subtract('9007199254740991', '9007199254740992'), '-1');
            });

            it('100000000000000000 - 98765432109876543 = 1234567890123457', () => {
                assert.equal(math.subtract('100000000000000000', '98765432109876543'), '1234567890123457');
            });
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

    describe('Modulo', () => {

        const divisible = [
            [10000, 99, 1], [1257, 2, 1], [487799, 653, 8], ['123456789012345678901234', 3, 1]
        ];

        divisible.map(([number, divisor, result]) => {
            it(`${number} modulo ${divisor}`, () => {
                assert.equal(math.modulo(String(number), String(divisor)), result);
            });
        });

    });
});
