/**
 * Check if set is subset of another set.
 * @param { Set<Number> } outer 
 * @param { Set<Number> } inner 
 * @returns { Boolean } true if all the elements of inner are present in outer, otherwise false
 */

const includes = (outer, inner) => {
  for (x of inner) {
    if (!outer.has(x)) return false;
  }

  return true;
}

/**
 * "E. Автомобильные номера"
 * https://contest.yandex.ru/contest/28964/problems/E/
 * 
 * Неизвестный водитель совершил ДТП и скрылся с места происшествия. Полиция
 * опрашивает свидетелей. Каждый из них говорит, что запомнил какие-то буквы и цифры
 * номера. Но при этом свидетели не помнят порядок этих цифр и букв. Полиция хочет
 * проверить несколько подозреваемых автомобилей. Будем говорить, что номер согласуется с
 * показанием свидетеля, если все символы, которые назвал свидетель, присутствуют в этом
 * номере (не важно, сколько раз).
 * 
 * @param { String[] } lines 
 * Сначала задано число M ≤ 100 - количество свидетелей. Далее идет M строк, каждая из
 * которых описывает показания очередного свидетеля. Эти строки непустые и состоят из не
 * более чем 20 символов. Каждый символ в строке - либо цифра, либо заглавная латинская
 * буква, причём символы могут повторяться.
 * Затем идёт число N ≤ 100 - количество номеров. Следующие строки представляют из
 * себя номера подозреваемых машин и имеют такой же формат, как и показания свидетелей.
 * 
 * @returns номера автомобилей, согласующиеся с максимальным количеством свидетелей
 * Если таких номеров несколько, то выведите их в том же порядке, в котором они были заданы
 * на входе.
 */

const findMostSuspiciousCarNumbers = (lines) => {
  const m = Number(lines[0]), n = Number(lines[m + 1]);

  const [witnesses, numbers] = [
    lines.slice(1, m + 1).map(s => new Set(s)),
    lines.slice(-n).map(number => ({ number, count: 0 })),
  ];

  let maxWitCount = 0;

  for (let i = 0; i < n; i++) {
    const number = numbers[i];
    const numset = new Set(number.number);

    for (let wit of witnesses) {
      if (includes(numset, wit)) number.count += 1;
    }

    maxWitCount = Math.max(maxWitCount, number.count);
  }

  const answer = [];

  for (let i = 0; i < n; i++) {
    const number = numbers[i];
    if (number.count === maxWitCount) answer.push(number.number);
  }

  return answer;
};