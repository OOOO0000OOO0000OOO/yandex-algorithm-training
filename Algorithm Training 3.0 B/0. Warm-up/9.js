const buildPrefixSum = (sequence, n) => {
  const prefixSum = new Array(n + 1).fill(0);

  for (let i = 1; i < n + 1; i++) {
    prefixSum[i] = prefixSum[i - 1] + sequence[i - 1];
  }

  return prefixSum;
};

const build2DPrefixSum = (sequence, n, m) => {
  const prefixSum1D = new Array(n);
  const prefixSum2D = new Array(n + 1);

  for (let i = 0; i < n; i++) {
    prefixSum1D[i] = buildPrefixSum(sequence[i], m);
  }

  for (let i = 0; i < n + 1; i++) {
    prefixSum2D[i] = new Array(m + 1).fill(0);
  }

  for (let j = 1; j <= m; j++) {
    for (let i = 0; i < n; i++) {
      prefixSum2D[i + 1][j] = prefixSum2D[i][j] + prefixSum1D[i][j];
    }
  }

  return prefixSum2D;
};

/**
 * "9. Сумма в прямоугольнике"
 * https://contest.yandex.ru/contest/45468/problems/9/
 *
 * Вам необходимо ответить на запросы узнать сумму всех элементов числовой матрицы N×M
 * в прямоугольнике с левым верхним углом (x1, y1) и правым нижним (x2, y2)
 *
 * @param { Number[][] } matrix матрица N строк по M чисел
 * @param { Number[][]} queries Q строк по 4 целых числа x1, y1, x2, y2, — запрос на
 * сумму элементов матрицы в прямоугольнике (1 ≤ x1 ≤ x2 ≤ N, 1 ≤ y1 ≤ y2 ≤ M)
 * @param { Number } n (1 ≤ N ≤ 1000)
 * @param { Number } m (1 ≤ M ≤ 1000)
 * @param { Number } q (1 ≤ Q ≤ 100000)
 *
 * @returns { Number[] } результат для каждого запроса
 */

const findRectangleSum = (matrix, queries, n, m, q) => {
  const prefixSum = build2DPrefixSum(matrix, n, m);

  const answers = [];

  for (const [x1, y1, x2, y2] of queries) {
    const sum =
      prefixSum[x2][y2] -
      prefixSum[x1 - 1][y2] -
      prefixSum[x2][y1 - 1] +
      prefixSum[x1 - 1][y1 - 1];
    answers.push(sum);
  }

  return answers;
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [[n, m, q], ...matrix] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));
const queries = matrix.splice(-q);
const result = findRectangleSum(matrix, queries, n, m, q).join('\n');
fs.writeFileSync('output.txt', result);
