/**
 * "25. Гвоздики"
 * https://contest.yandex.ru/contest/45468/problems/25/
 *
 * В дощечке в один ряд вбиты гвоздики. Любые два гвоздика можно соединить
 * ниточкой. Требуется соединить некоторые пары гвоздиков ниточками так, чтобы
 * к каждому гвоздику была привязана хотя бы одна ниточка, а суммарная длина
 * всех ниточек была минимальна.
 *
 * В первой строке входных данных записано число N — количество гвоздиков
 * (2 ≤ N ≤ 100). В следующей строке заданы N чисел — координаты всех гвоздиков
 * (неотрицательные целые числа, не превосходящие 10000).
 *
 * @param { Number[] } studs координаты всех гвоздиков
 * @param { Number } n количество гвоздиков
 * 
 * @returns { Number } минимальная суммарная длина всех ниточек
 */

const findMinStringsLength = (studs, n) => {
  studs.sort((a, b) => a - b);
  const dp = [studs[1] - studs[0], studs[1] - studs[0]];

  for (let i = 2; i < n; i += 1) {
    dp[i] = Math.min(dp[i - 2], dp[i - 1]) + studs[i] - studs[i - 1];
  }

  return dp[n - 1];
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [[n], studs] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const result = findMinStringsLength(studs, n);

fs.writeFileSync('output.txt', result.toString());
