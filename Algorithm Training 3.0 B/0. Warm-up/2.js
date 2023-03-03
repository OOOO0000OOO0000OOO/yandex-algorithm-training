/**
 * "2. Красивая строка"
 *
 * Красотой строки назовем максимальное число идущих подряд одинаковых букв. (красота
 * строки abcaabdddettq равна 3)
 * Сделайте данную вам строку как можно более красивой, если вы можете сделать не более k
 * операций замены символа.
 *
 * @param { Number } k целое число k (0 ≤ k ≤ 10^9)
 * @param { String } string непустая строчка (|S| ≤ 2 ⋅ 10^5), состоящая только из маленьких
 * латинских букв
 *
 * @returns { Number } максимально возможная красота строчки, которую можно получить
 */

const findMaxBeauty = (k, string) => {
  let alphabet = new Set(string);
  let maxBeauty = 0;

  for (const char of alphabet) {
    let replaceCount = k;

    for (let left = 0, right = 0; left < string.length; left++) {
      while (right < string.length) {
        if (string[right] !== char) {
          if (!replaceCount) break;
          replaceCount -= 1;
        }
        right += 1;
      }

      if (string[left] !== char) replaceCount += 1;

      maxBeauty = Math.max(maxBeauty, right - left);
      if (right === string.length) break;
    }
  }
  return maxBeauty;
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [k, string] = data.trim().split('\n');

const result = findMaxBeauty(+k, string).toString();

fs.writeFileSync('output.txt', result);
