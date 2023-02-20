/**
 * "13. Постфиксная запись"
 * https://contest.yandex.ru/contest/45468/problems/13/
 * 
 * В постфиксной записи (или обратной польской записи) операция записывается после двух
 * операндов. Например, сумма двух чисел A и B записывается как A B +. Запись B C + D *
 * обозначает привычное нам (B + C) * D, а запись A B C + D * + означает A + (B + C) * D.
 * Достоинство постфиксной записи в том, что она не требует скобок и дополнительных
 * соглашений о приоритете операторов для своего чтения.
 * 
 * Формат ввода
 * В единственной строке записано выражение в постфиксной записи, содержащее цифры и
 * операции +, -, *. Цифры и операции разделяются пробелами. В конце строки может быть
 * произвольное количество пробелов.
 * 
 * Формат вывода
 * Необходимо вывести значение записанного выражения.
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
};

const evaluatePostfix = (postfix) => {
  const stack = [];

  for (let i = 0; i < postfix.length; i++) {
    const token = postfix[i];

    if (token in operations) {
      const [b, a] = [stack.pop(), stack.pop()];
      const result = operations[token](a, b);

      stack.push(result);
    } else {
      stack.push(Number(token));
    }
  }

  return stack[0];
};

rl.once('line', (line) => {
  const postfix = line.trim().split(' ');
  const result = evaluatePostfix(postfix);

  rl.write(result.toString());
  rl.close();
});
