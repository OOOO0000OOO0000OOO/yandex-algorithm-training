/**
 * "12. Правильная скобочная последовательность"
 * https://contest.yandex.ru/contest/45468/problems/12/
 * 
 * Рассмотрим последовательность, состоящую из круглых, квадратных и фигурных скобок.
 * Программа дожна определить, является ли данная скобочная последовательность
 * правильной. Пустая последовательность явлется правильной. Если A – правильная, то
 * последовательности (A), [A], {A} – правильные. Если A и B – правильные
 * последовательности, то последовательность AB – правильная.
 * 
 * Формат ввода
 * В единственной строке записана скобочная последовательность, содержащая не более
 * 100000 скобок.
 * 
 * Формат вывода
 * Если данная последовательность правильная, то программа должна вывести строку yes,
 * иначе строку no.
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function isCorrectBracketSequence(
  sequence,
  closing = { ')': '(', '}': '{', ']': '[' },
) {
  const stack = [];

  for (let i = 0; i < sequence.length; i++) {
    let token = sequence[i];

    token in closing && stack[stack.length - 1] === closing[token]
      ? stack.pop()
      : stack.push(token);
  }

  return stack.length ? 'no' : 'yes';
}

rl.once('line', (line) => {
  const brackets = line.trim();
  const result = isCorrectBracketSequence(brackets);

  rl.write(result.toString());
  rl.close();
});
