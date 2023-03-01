/**
 * Построение массива префиксных сумм.
 * @param { Number[] } sequence последовательность
 * @param { Number } n размер последовательности
 * @returns { Number[] } массив префикс-сумм
 */

const buildPrefixSum = (sequence, n) => {
  const prefixSum = new Array(n + 1).fill(0);

  for (let i = 1; i < n + 1; i++) {
    prefixSum[i] = prefixSum[i - 1] + sequence[i - 1];
  }

  return prefixSum;
};

/**
 * "A. Префиксные суммы"
 * https://contest.yandex.ru/contest/29075/problems/A/
 * 
 * В этой задаче вам нужно будет много раз отвечать на запрос «Найдите сумму чисел на
 * отрезке в массиве».
 * Каждый запрос описывается двумя числами l, r (1 ≤ l ≤ r ≤ n) - левой и правой границей
 * отрезка, на котором нужно найти сумму.
 * 
 * @param { Number[] } sequence исходный массив
 * @param { Number } n размер массива (1 ≤ n ≤ 3⋅10^5)
 * @param { [Number, Number][] } queries запросы к массиву
 * @param { Number } q количество запросов (1 ≤ q ≤ 3⋅10^5)
 * 
 * @returns { Number[] } массив сумм на соответствующем отрезке
 */

const rangeSumQueries = (sequence, n, queries, q) => {
  const prefixSum = buildPrefixSum(sequence, n);
  const sums = new Array(q);

  for (let i = 0; i < q; i++) {
    const [left, right] = queries[i];
    sums[i] = prefixSum[right] - prefixSum[left - 1];
  }

  return sums;
};

export default rangeSumQueries;
