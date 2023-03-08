/**
 * "E. Покрытие K отрезками"
 * https://contest.yandex.ru/contest/29188/problems/E/
 *
 * Даны n точек на прямой, нужно покрыть их k отрезками одинаковой длины ℓ.
 * Найдите минимальное ℓ.
 *
 * @param { bigint[] } points n чисел xᵢ (∣∣xᵢ∣∣ ≤ 10⁹)
 * @param { bigint } k (1 ≤ k ≤ n)
 * @param { bigint } n n (1 ≤ n ≤ 10⁵)
 *
 * @returns { bigint } минимальное такое ℓ, что точки можно покрыть k отрезками длины ℓ.
 */

const findMinSegmentsLength = (points, k, n) => {
  points.sort((a, b) => Number(a - b));

  let [left, right] = [0n, points[n - 1n] - points[0]];

  while (left < right) {
    const length = (right + left) / 2n;

    let count = 0n;
    let maxRight = points[0] - 1n;

    for (const point of points) {
      if (point > maxRight) {
        count += 1n;
        maxRight = point + length;
      }
    }

    if (count <= k) right = length;
    else left = length + 1n;
  }

  return left;
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [[n, k], points] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(BigInt));

const result = findMinSegmentsLength(points, k, n);

fs.writeFileSync('output.txt', result.toString());
