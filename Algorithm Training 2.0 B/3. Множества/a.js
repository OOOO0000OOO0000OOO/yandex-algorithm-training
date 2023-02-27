/**
 * "A. Количество совпадающих"
 * https://contest.yandex.ru/contest/28964/problems/A/
 * 
 * Даны два списка чисел, которые могут содержать до 100000 чисел каждый. Посчитайте,
 * сколько чисел содержится одновременно как в первом списке, так и во втором.
 * Примечание. Эту задачу на Питоне можно решить в одну строчку. 
 * 
 * @param { number[] } list1 первый список чисел
 * @param { number[] } list2 второй список чисел
 * 
 * @returns ответ на задачу
 */

const countMatching = (list1, list2) => {
  let dict = {};

  for (let i = 0; i < list1.length; i++) {
    dict[list1[i]] = 1;
  }

  let result = 0;
  for (let i = 0; i < list2.length; i++) {
    if (dict[list2[i]]) result++;
  }

  return result;
};

export default countMatching;
