/**
 * "23. Калькулятор"
 * https://contest.yandex.ru/contest/45468/problems/23/
 *
 * Имеется калькулятор, который выполняет следующие операции:
 *  - умножить число X на 2;
 *  - умножить число X на 3;
 *  - прибавить к числу X единицу
 *
 * Определите, какое наименьшее количество операций требуется, чтобы получить
 * из числа 1 число N.
 *
 * @param { Number } n число N, не превосходящее 10⁶
 * @returns { `${String}\n${String}` }
 *
 * В первой строке выходного файла выведите минимальное количество операций.
 * Во второй строке выведите числа, последовательно получающиеся при выполнении
 * операций. Первое из них должно быть равно 1, а последнее N. Если решений
 * несколько, выведите любое.
 */

const findMinOperationsNumber = (n) => {
  const dp = new Array(n + 1).fill(0);
  const ans = new Array(n).fill(-1);

  [dp[2], dp[3]] = [1, 1];
  [ans[2], ans[3]] = [2, 3];

  for (let i = 4; i <= n; i += 1) {
    let possibles = [
      dp[i - 1] + 1,
      !(i % 2) ? dp[i / 2] + 1 : Infinity,
      !(i % 3) ? dp[i / 3] + 1 : Infinity,
    ];

    let min = Math.min(...possibles);
    let minIdx = possibles.indexOf(min);

    dp[i] = min;
    ans[i] = minIdx + 1;
  }

  let answer = [],
    k = n;

  while (k > 0) {
    answer.push(k);

    let idx = ans[k];

    if (idx === 3) k /= 3;
    else if (idx === 2) k /= 2;
    else k -= 1;
  }

  return (
    answer.length - 1 + '\n' + answer.reverse().join(' ')
  );
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const n = Number(data.trim());
const result = findMinOperationsNumber(n);

fs.writeFileSync('output.txt', result);
