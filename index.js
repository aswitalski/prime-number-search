const find = require('./src/find');

const args = process.argv.slice(2);
const count = parseInt(args[0]);

if (count > 0) {
    const primes = find(count);
    primes.map((prime, index) => console.log(`${index + 1}) ${prime}`));
} else {
    console.warn('Please specify a parameter indicating how many prime numbers should be found...');
}