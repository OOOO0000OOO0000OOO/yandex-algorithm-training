/**
 * "16. Очередь с защитой от ошибок"
 * https://contest.yandex.ru/contest/45468/problems/16/
 * 
 * Научитесь пользоваться стандартной структурой данных queue для целых чисел. Напишите
 * программу, содержащую описание очереди и моделирующую работу очереди, реализовав все
 * указанные здесь методы.
 * Программа считывает последовательность команд и в зависимости от команды выполняет
 * ту или иную операцию. После выполнения каждой команды программа должна вывести одну
 * строчку.
 * 
 * Возможные команды для программы:
 * - push n
 * Добавить в очередь число n (значение n задается после команды). Программа должна 
 * вывести ok.
 * 
 * - pop
 * Удалить из очереди первый элемент. Программа должна вывести его значение.
 * 
 * - front
 * Программа должна вывести значение первого элемента, не удаляя его из очереди.
 * 
 * - size
 * Программа должна вывести количество элементов в очереди.
 * 
 * - clear
 * Программа должна очистить очередь и вывести ok.
 * 
 * - exit
 * Программа должна вывести bye и завершить работу.
 * 
 * Перед исполнением операций front и pop программа должна проверять, содержится ли в
 * очереди хотя бы один элемент. Если во входных данных встречается операция front или pop,
 * и при этом очередь пуста, то программа должна вместо числового значения вывести строку
 * error.
 * 
 * Формат ввода
 * Вводятся команды управления очередью, по одной на строке.
 * 
 * Формат вывода
 * Требуется вывести протокол работы очереди, по одному сообщению на строке.
 */

const fs = require('fs');

const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});

const lines = data
  .trim()
  .split('\n')
  .map((line) => line.trim());

class Queue {
  queue = [];

  get length() {
    return this.queue.length;
  }

  push(n) {
    this.queue.push(n);
    return 'ok';
  }

  pop() {
    if (this.length) return this.queue.shift();
    return this.error();
  }

  front() {
    if (this.length) return this.queue[0];
    return this.error();
  }

  size() {
    return this.queue.length;
  }

  clear() {
    this.queue = [];
    return 'ok';
  }

  exit() {
    return 'bye';
  }

  error() {
    return 'error';
  }
}

const queue = new Queue();
const result = [];

for (const line of lines) {
  const [command, n] = line.trim().split(' ');

  result.push(
    queue[command] ? queue[command](n) : queue.error(),
  );

  if (command === 'exit') break;
}

fs.writeFileSync('output.txt', result.join('\n'));