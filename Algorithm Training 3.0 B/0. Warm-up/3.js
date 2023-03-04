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
    if (checkFn(m, checkParams))
      l = m;
    else
      r = m - 1;
  }

  return checkFn(l, checkParams) ? l : -1;
};

/**
 * "3. Коллекционер Диего"
 * https://contest.yandex.ru/contest/45468/problems/3/
 * 
 * Диего увлекается коллекционированием наклеек. На каждой из них написано число, и каждый
 * коллекционер мечтает собрать наклейки со всеми встречающимися числами.
 * Диего собрал N наклеек, некоторые из которых, возможно, совпадают. Как-то раз к нему
 * пришли K коллекционеров. i-й из них собрал все наклейки с номерами не меньшими, чем pi.
 * Напишите программу, которая поможет каждому из коллекционеров определить, сколько
 * недостающих ему наклеек есть у Диего. Разумеется, гостей Диего не интересуют повторные
 * экземпляры наклеек.
 *
 * @param { Number[] } stickers номера наклеек Диего, все номера не превосходят 10^9
 * @param { Numer[] } queries целые числа p_i (0 ≤ p_i ≤ 10^9), где p_i — наименьший номер
 * наклейки, не интересующий i-го коллекционера
 *
 * @returns { Number[] } для каждого коллекционера выведите количество различных чисел на
 * наклейках, которые есть у Диего, но нет у этого коллекционера.
 */

const countNumbersLEThanQuery = (stickers, queries) => {
  const uniques = new Set(stickers);
  const size = uniques.size;
  const sorted = [...uniques].sort((a, b) => a - b);

  const answers = [];

  for (const query of queries) {
    const result = binSearch(
      0,
      size - 1,
      (m, [sorted, query]) => sorted[m] < query,
      [sorted, query],
    );

    answers.push(result + 1);
  }

  return answers;
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [[n], stickers, [k], queries] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const result = countNumbersLEThanQuery(stickers, queries);

fs.writeFileSync('output.txt', result.join('\n'));
