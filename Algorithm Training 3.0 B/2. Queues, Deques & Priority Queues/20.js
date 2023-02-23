/**
 * "20. Пирамидальная сортировка"
 * https://contest.yandex.ru/contest/45468/problems/20/
 *
 * Отсортируйте данный массив. Используйте пирамидальную сортировку.
 *
 * Формат ввода
 * Первая строка входных данных содержит количество элементов в массиве N, N ≤ 10^5. Далее
 * задаются N целых чисел, не превосходящих по абсолютной величине 10^9.
 *
 * Формат вывода
 * Выведите эти числа в порядке неубывания.
 */

function siftDown(i, array) {
  let position = i;
  while (position * 2 + 1 < array.length) {
    let maxChild = position * 2 + 1;

    if (array[maxChild + 1] < array[maxChild])
      maxChild += 1;

    if (array[position] > array[maxChild]) {
      [array[position], array[maxChild]] = [
        array[maxChild],
        array[position],
      ];

      position = maxChild;
    } else break;
  }
}

function buildHeap(array) {
  let lastParent = (array.length - 2) >> 1;

  for (i = lastParent; i > -1; i--) {
    siftDown(i, array);
  }

  return array;
}

function extractMin(heap) {
  const result = heap[0];

  heap[0] = heap[heap.length - 1];

  siftDown(0, heap);

  heap.pop();

  return result;
}

function heapSort(array, n) {
  const heap = buildHeap(array);
  const sorted = [];

  for (let i = 0; i < n; i++) {
    sorted[i] = extractMin(heap);
  }

  return sorted;
}

const fs = require('fs');

const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});

const [[n], array] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const result = heapSort(array, n);

fs.writeFileSync('output.txt', result.join(' '));
