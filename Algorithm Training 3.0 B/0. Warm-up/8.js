/**
 * "8. Минимальный прямоугольник"
 * https://contest.yandex.ru/contest/45468/problems/8/
 * 
 * На клетчатой плоскости закрашено K клеток. Требуется найти минимальный по площади
 * прямоугольник, со сторонами, параллельными линиям сетки, покрывающий все
 * закрашенные клетки. 
 * 
 * @param { [Number, Number][] } points  пары чисел Xi и Yi – координаты закрашенных
 * клеток (|Xi|, |Yi| ≤ 10^9)
 * 
 * @returns { `${Number} ${Number} ${Number} ${Number}` } координаты левого нижнего и
 * правого верхнего углов прямоугольника
 */

const findMinRectangle = (points) => {
  let [[minX, minY], [maxX, maxY]] = [points[0], points[0]];

  for (const [x, y] of points) {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  return `${minX} ${minY} ${maxX} ${maxY}`;
}

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [[k], ...points] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const result = findMinRectangle(points);

fs.writeFileSync('output.txt', result);