/**
 * "19. Хипуй"
 * https://contest.yandex.ru/contest/45468/problems/19/
 *
 * В этой задаче вам необходимо самостоятельно (не используя соответствующие классы и
 * функции стандартной библиотеки) организовать структуру данных Heap для хранения целых
 * чисел, над которой определены следующие операции: a) Insert(k) – добавить в Heap число k;
 * b) Extract достать из Heap наибольшее число (удалив его при этом).
 *
 * Формат ввода
 * В первой строке содержится количество команд N (1 ≤ N ≤ 100000), далее следуют N команд,
 * каждая в своей строке. Команда может иметь формат: “0 <число>” или “1”, обозначающий,
 * соответственно, операции Insert(<число>) и Extract. Гарантируется, что при выполенении
 * команды Extract в структуре находится по крайней мере один элемент.
 *
 * Формат вывода
 * Для каждой команды извлечения необходимо отдельной строкой вывести число, полученное
 * при выполнении команды Extract.
 */

class Heap {
  heap = [];

  insert(k) {
    this.heap.push(k);

    let i = this.heap.length - 1;
    while (i && this.heap[(i - 1) >> 1] < this.heap[i]) {
      [this.heap[i], this.heap[(i - 1) >> 1]] = [
        this.heap[(i - 1) >> 1],
        this.heap[i],
      ];
      i = (i - 1) >> 1;
    }
  }

  extract() {
    const result = this.heap[0];

    this.heap[0] = this.heap[this.heap.length - 1];

    let position = 0;
    let maxChild = 0;

    while (position * 2 + 2 < this.heap.length) {
      maxChild = position * 2 + 1;
      if (this.heap[maxChild + 1] > this.heap[maxChild])
        maxChild += 1;

      if (this.heap[position] < this.heap[maxChild]) {
        [this.heap[position], this.heap[maxChild]] = [
          this.heap[maxChild],
          this.heap[position],
        ];
        position = maxChild;
      } else break;
    }

    this.heap.pop();

    return result;
  }
}

const fs = require('fs');

const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});

const [n, ...commands] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const result = [],
  heap = new Heap();

for (const [command, k] of commands) {
  if (command === 0) {
    heap.insert(k);
  } else if (command === 1) {
    result.push(heap.extract());
  }
}

fs.writeFileSync('output.txt', result.join('\n'));
