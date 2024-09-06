const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

function* add() {
  const x = yield '첫번째 수? ';
  const y = yield '두번째 수?';
  return x + y;
}

const itAdd = add();
console.log(itAdd.next().value);

const rl = readline.createInterface({ input, output });

rl.on('line', (answer) => {
  const { value, done } = itAdd.next(+answer);
  if (done) {
    console.log('Total: ', value);
    rl.close();
  } else {
    console.log(value);
  }
}).on('close', () => {
  process.exit();
});

// console.log(itAdd.next(1).value);
// console.log(itAdd.next(2).value);
