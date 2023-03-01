/**
 * "D. Правильная, круглая, скобочная"
 * https://contest.yandex.ru/contest/29075/problems/D/
 * 
 * Если из правильного арифметического выражения вычеркнуть всё, кроме круглых скобок, то
 * получится правильная скобочная последовательность. Проверьте, является ли введённая
 * строка правильной скобочной последовательностью.
 * 
 * @param { String } sequence строка, состоящая из "(" и ")", длина не превосходит 10^5
 * @returns { 'YES' | 'NO' } YES если введённая строка является ПСП и NO иначе
 */

const isBracketSequenceBalanced = (sequence) => {
  let prefix = 0;

  for (const bracket of sequence) {
    prefix += bracket === '(' ? 1 : -1;
    if (prefix < 0) return 'NO';
  }

  if (prefix) return 'NO';

  return 'YES';
}

export default isBracketSequenceBalanced;
