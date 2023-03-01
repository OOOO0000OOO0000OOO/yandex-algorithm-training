/**
 * Пронумеровать и отсортировать.
 * @param { Number[] } array 
 * @returns { Number[] }
 */

const sortAndEnum = (array) =>
  array
    .map((value, index) => [value, index])
    .sort(([a, i], [b, j]) => a - b || j - i);

/**
 * Сравнить два массива целых чисел лексикографически.
 * @param { Number[] } a 
 * @param { Number[] } b 
 * @returns { Boolean }
 */

const isLexicoGreater = (a, b) => {
  for (let i = 0; i < a.length; i++)
    if (a[i] !== b[i]) return (a[i] ?? 0) > (b[i] ?? 0);
  return false;
};

/**
 * "E. Сумма трёх"
 * https://contest.yandex.ru/contest/29075/problems/E/
 * 
 * Даны три массива целых чисел A,B,C и целое число S.
 * Найдите такие i, j, k, что Ai + Bj + Ck = S.
 *
 * @param { Number[] } a массив целых чисел от 1 до 10^9
 * @param { Number[] } b массив целых чисел от 1 до 10^9
 * @param { Number[] } c массив целых чисел от 1 до 10^9
 * @param { Number } s число S (1 ≤ S ≤ 10^9)
 *
 * @returns { `${Number} ${Number} ${Number}` | '-1' }
 * Если таких i, j, k не существует, выведите единственное число −1. Иначе выведите на одной
 * строке три числа — i,j,k. Элементы массивов нумеруются с нуля. Если ответов несколько,
 * выведите лексикографически минимальный.
 */

const selectNumbers = (a, b, c, s) => {
  const aSorted = sortAndEnum(a);
  const bSorted = sortAndEnum(b);
  const cSorted = sortAndEnum(c);

  let answer = [];

  for (const [aVal, aPos] of aSorted) {
    let cPos = c.length - 1;

    for (const [bVal, bPos] of bSorted) {
      while (cPos > 0 && aVal + bVal + cSorted[cPos][0] > s)
        cPos -= 1;
      if (
        aVal + bVal + cSorted[cPos][0] === s &&
        (!answer.length ||
          isLexicoGreater(answer, [aPos, bPos, cSorted[cPos][1]]))
      ) answer = [aPos, bPos, cSorted[cPos][1]];
    }
  }

  return answer.join(' ') || '-1';
};

export default selectNumbers;
