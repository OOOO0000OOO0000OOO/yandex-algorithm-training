/**
 * "6. Операционные системы lite"
 * https://contest.yandex.ru/contest/45468/problems/6/
 * 
 * Васин жесткий диск состоит из M секторов. Вася последовательно устанавливал на него
 * различные операционные системы следующим методом: он создавал новый раздел диска из
 * последовательных секторов, начиная с сектора номер ai и до сектора bi включительно, и
 * устанавливал на него очередную систему. При этом, если очередной раздел хотя бы по
 * одному сектору пересекается с каким-то ранее созданным разделом, то ранее созданный
 * раздел «затирается», и операционная система, которая на него была установлена, больше
 * не может быть загружена.
 * Напишите программу, которая по информации о том, какие разделы на диске создавал Вася,
 * определит, сколько в итоге работоспособных операционных систем установлено и работает
 * в настоящий момент на Васином компьютере.
 * 
 * @param { [Number, Number][] } systems N пар чисел a_i и b_i, задающих номера начального
 * и конечного секторов раздела (1 ≤ a_i ≤ b_i ≤ M)
 * @param { Number= } m количество секторов на жестком диске (1 ≤ M ≤ 10^9)
 * @param { Number= } n количество разделов, которое создавал Вася (0 ≤ N ≤ 1000)
 * 
 * @returns { Number } количество работающих операционных систем на Васином компьютере
 */

const countWorkingOSs = (systems, m, n) => {
  // решение за O(N^2)
  let result = [];

  for (const [a, b] of systems) {
    result = result.filter(([c, d]) => !(a <= d && c <= b));
    result.push([a, b]);
  }

  return result.length;
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [[m], [n], ...systems] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const result = countWorkingOSs(systems);

fs.writeFileSync('output.txt', result.toString());