/**
 * "C. Уникальные элементы"
 * https://contest.yandex.ru/contest/28964/problems/C/
 * 
 * Дан список. Выведите те его элементы, которые встречаются в списке только один раз.
 * Элементы нужно выводить в том порядке, в котором они встречаются в списке. 
 * 
 * @param { Number[] } list список чисел
 * @returns { Number[] } ответ на задачу
 */

const filterOutNonUniques = (list) => {
  const dict = {}, uniques = new Set();

  for (let i = 0; i < list.length; i++) {
    if (!dict[list[i]]) {
      dict[list[i]] = 0;
      uniques.add(list[i]);
    }

    dict[list[i]] += 1;

    if (dict[list[i]] > 1) {
      uniques.delete(list[i]);
    }
  }

  return [...uniques];
};

export default filterOutNonUniques;
