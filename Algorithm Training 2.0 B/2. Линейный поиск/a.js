/**
 * "A. Количество равных максимальному"
 * https://contest.yandex.ru/contest/28738/problems/
 * 
 * Последовательность состоит из натуральных чисел и завершается числом 0. Всего
 * вводится не более 10000 чисел (не считая завершающего числа 0). Определите, сколько
 * элементов этой последовательности равны ее наибольшему элементу.
 * 
 * @param { Number[] } numbers последовательность целых чисел, оканчивающаяся числом 0
 * @returns { Number } ответ на задачу
 */

const countMaximums = (numbers) => {
  let max = numbers[0], counter = 1;

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
      counter = 1;
    } else if (numbers[i] === max) {
      counter++;
    }
  }

  return counter;
};

export default countMaximums;
