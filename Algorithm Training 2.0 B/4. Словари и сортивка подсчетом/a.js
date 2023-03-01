/**
 * "A. Толя-Карп и новый набор структур, часть 2"
 * https://contest.yandex.ru/contest/28970/problems/A/
 * 
 * Толя-Карп запросил для себя n посылок с «Аллигатор-экспресс».
 * Посылка представляет из себя ящик. Внутри ящика лежит целое число a_i. Номер на ящике d_i
 * указывает на цвет числа, лежащего внутри.
 * Толю-Карпа интересует, чему будут равны значения чисел, если сложить между собой все
 * те, что имеют одинаковый цвет. Напишите, пожалуйста, программу, которая выводит
 * результат.
 * 
 * @param { Number } n количество строк (0 ≤ n ≤ 2*10^5)
 * @param { Array<`${bigint} ${bigint}`> } lines n строк, в которых заданы по два числа:
 * цвет числа в ящике d_i и значение числа a_i (-10^18 ≤ d_i, a_i ≤ 10^18)
 * 
 * @returns { Array<`${bigint} ${bigint}`> }
 * Выведите в порядке возрастания номера цвета пары чисел, каждая в новой строке: номер
 * цвета и сумму всех чисел данного цвета.
 */

const countNumbersSumsByColors = (n, lines) => {
  const colorDict = new Map();

  for (let i = 0; i < n; i++) {
    const [color, number] = lines[i].split(' ').map(BigInt);
    colorDict.set(color, (colorDict.get(color) ?? BigInt(0)) + number);
  }

  const sortedKeys = [...colorDict.keys()].sort((a, b) => Number(a - b));
  const result = [];

  for (let k = 0; k < sortedKeys.length; k++) {
    const key = sortedKeys[k];
    result.push(`${key} ${colorDict.get(key)}`);
  }

  return result;
}

export default countNumbersSumsByColors;

