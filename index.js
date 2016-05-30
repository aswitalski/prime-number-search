const find = require('./src/find');

const args = process.argv.slice(2);
const count = parseInt(args[0]);

if (count > 0) {
    console.time('Prime Number Search');
    const primes = find(count);
    console.log('--------------------------------')
    console.timeEnd('Prime Number Search');
    console.log(` ==> ${count}: ${primes.pop()}`);
    console.log('--------------------------------')
} else {
    console.warn('Please specify a parameter indicating how many prime numbers should be found...');
}