/**
 * Binary search returns the rightmost matching element or -1 if none are found.
 *
 * @param { Number } l  left boundary
 * @param { Number } r right boundary
 * @param { (...any) => Boolean } checkFn match function
 * @param { any[] } checkParams match function params
 *
 * @returns { Number | -1 } index of last matching element or -1
 */

const binSearch = (l, r, checkFn, checkParams) => {
  let m = 0;

  while (l < r) {
    m = (l + r + 1) >> 1;
    if (checkFn(m, checkParams)) l = m;
    else r = m - 1;
  }

  return checkFn(l, checkParams) ? l : -1;
};

/**
 * "A. Быстрый поиск в массиве"
 * https://contest.yandex.ru/contest/29188/problems/A/
 * 
 * Дан массив из N целых чисел. Все числа от −10⁹ до 10⁹.
 * Нужно уметь отвечать на запросы вида “Cколько чисел имеют значения от L до R?”.
 *
 * @param { Number[] } sequence  N целых чисел, все числа от −10⁹ до 10⁹
 * @param { Number } n N (1 ≤ N ≤ 10⁵)
 * @param { [Number, Number][] } queries запросы — K пар чисел L, R (−10⁹ ≤ L ≤ R ≤ 10⁹)
 * @param { Number } k число запросов K (1 ≤ K ≤ 10⁵)
 * 
 * @returns { Number[] } K чисел — ответы на запросы
 */

const findNumberInRange = (sequence, n, queries, k) => {
  const sorted = sequence.sort((a, b) => a - b);
  const answers = [];

  for (const [l, r] of queries) {
    const lIndex = binSearch(
      0,
      n - 1,
      (m, [sorted, l]) => sorted[m] < l,
      [sorted, l],
    );
    const rIndex = binSearch(
      lIndex,
      n - 1,
      (m, [sorted, r]) => sorted[m] <= r,
      [sorted, r],
    );
    answers.push(rIndex - lIndex);
  }

  return answers;
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});

const [[n], sequence, [k], ...queries] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const result = findNumberInRange(sequence, n, queries, k);

fs.writeFileSync('output.txt', result.join(' '));
