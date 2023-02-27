/**
 * "B. Встречалось ли число раньше"
 * https://contest.yandex.ru/contest/28964/problems/B/
 * 
 * Во входной строке записана последовательность чисел через пробел. Для каждого числа
 * выведите слово YES (в отдельной строке), если это число ранее встречалось в
 * последовательности или NO, если не встречалось.
 * 
 * @param { Number[] } list список чисел
 * @returns { Array<'YES' | 'NO'> } ответ на задачу
 */

const checkForPreviousOccurrences = (list) => {
  const dict = {}, answer = [];

  for (let i = 0; i < list.length; i++) {
    answer.push(dict[list[i]] ? 'YES' : 'NO');
    dict[list[i]] = 1;
  }

  return answer;
};

export default checkForPreviousOccurrences;
