const rootBinSearch = (l, r, checkFn, checkParams, eps) => {
  while (r - l > eps) {
    const m = (l + r) / 2;
    if (checkFn(m, checkParams)) r = m;
    else l = m;
  }
  return (l + r) / 2;
};

const cubicFn = (a, b, c, d, x) =>
  a * x ** 3 + b * x ** 2 + c * x + d;

/**
 * "C. Корень кубического уравнения"
 * https://contest.yandex.ru/contest/29188/problems/C/
 *
 * Дано кубическое уравнение ax³ + bx² + cx + d = 0 (a ≠ 0). Известно, что у этого
 * уравнения есть ровно один корень. Требуется его найти.
 *
 * @param { Number } a -1000 ≤ a ≤ 1000
 * @param { Number } b -1000 ≤ b ≤ 1000
 * @param { Number } c -1000 ≤ c ≤ 1000
 * @param { Number } d -1000 ≤ d ≤ 1000
 * @param { Number } [eps = 0.0000001]
 *
 * @returns { Number } выведите единственный корень уравнения с точностью не менее 5 знаков
 * после десятичной точки
 *
 */

const getCubicRoot = (a, b, c, d, eps = 0.0000001) => {
  return rootBinSearch(
    -2000,
    2000,
    (m, [a, b, c, d]) => cubicFn(a, b, c, d, m) > 0,
    [a, b, c, d],
    eps,
  );
};

const fs = require('fs');
const data = fs.readFileSync('cubroot.in', {
  encoding: 'utf-8',
});
const [a, b, c, d] = data.trim().split(' ').map(Number);

const result =
  a > 0
    ? getCubicRoot(a, b, c, d)
    : getCubicRoot(-a, -b, -c, -d);

fs.writeFileSync('cubroot.out', result.toString());
