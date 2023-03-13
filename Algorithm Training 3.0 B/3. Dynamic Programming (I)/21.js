/**
 * "21. Три единицы подряд"
 * https://contest.yandex.ru/contest/45468/problems/21/
 * 
 * По данному числу N определите количество последовательностей из нулей и единиц длины
 * N, в которых никакие три единицы не стоят рядом.
 * 
 * @param { Number } length число N, не превосходящее 35
 * @returns { Number } количество искомых последовательностей.
 * 
 * Гарантируется, что ответ не превосходит 2³¹-1.
 */

const countSequences = (length) => {
  let dp = [1, 2, 4];

  for (let i = 3; i <= length; i++) {
    dp[i] = dp[i - 3] + dp[i - 2] + dp[i - 1];
  }

  return dp[length];
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});

const result = countSequences(Number(data.trim()));

fs.writeFileSync('output.txt', result.toString());
