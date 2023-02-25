/**
 * B. Кольцевая линия метро
 * https://contest.yandex.ru/contest/28730/problems/B/
 * 
 * Витя работает недалеко от одной из станций кольцевой линии Московского метро, а живет
 * рядом с другой станцией той же линии. Требуется выяснить, мимо какого наименьшего
 * количества промежуточных станций необходимо проехать Вите по кольцу, чтобы добраться
 * с работы домой. 
 * 
 * @param { Number } n общее количество станций кольцевой линии
 * @param { Number } i номер станции, на которой Витя садится
 * @param { Number } j номер станции, на которой Витя выходит
 * 
 * @returns { Number }
 */

const findMinDistBetweenStations = (n, i, j) => {
  const dist1 = (Math.abs(j - i) || 1) - 1;
  const dist2 = n - dist1 - 2;

  return Math.min(dist1, dist2);
};

export default findMinDistBetweenStations;
