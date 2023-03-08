/**
 * Binary search returns the leftmost matching element or right boundary if none are found.
 *
 * @param { Number } l left boundary
 * @param { Number } r right boundary
 * @param { (...any) => Boolean } checkFn match function
 * @param { any[] } checkParams match function params
 *
 * @returns { Number } index of first matching element
 */

const lBinSearch = (l, r, checkFn, checkParams) => {
  while (l < r) {
    const m = (l + r) >> 1;
    if (checkFn(m, checkParams)) r = m;
    else l = m + 1;
  }

  return l;
};

/**
 * "B. Номер левого и правого вхождения"
 * https://contest.yandex.ru/contest/29188/problems/B/
 * 
 * Требуется определить в заданном массиве номер самого левого и самого правого элемента,
 * равного искомому числу.
 *
 * @param { Number[] } sorted  N нат. чисел ≤ 10⁹, каждое следующее не меньше предыдущего
 * @param { Number[] } queries M нат. чисел не превосходящих 10⁹
 * @param { Number } n количество чисел в массиве (1 ≤ N ≤ 10⁵)
 * @param { Number } m количество искомых чисел (1 ≤ M ≤ 10⁶)
 *
 * @returns { `${Number} ${Number}`[] }
 */

const findfirstAndLastOccurences = (sorted, queries, n, m) => {
  const answers = [];

  for (const query of queries) {
    const lIndex = lBinSearch(
      0,
      n,
      (m, [sorted, query]) => sorted[m] >= query,
      [sorted, query],
    );
    const rIndex = lBinSearch(
      0,
      n,
      (m, [sorted, query]) => sorted[m] > query,
      [sorted, query],
    );

    if (lIndex === rIndex) answers.push(`0 0`);
    else answers.push(`${lIndex + 1} ${rIndex}`);
  }

  return answers;
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [[n], sequence, [m], queries] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const result = findfirstAndLastOccurences(sequence, queries, n, m);

fs.writeFileSync('output.txt', result.join('\n'));
