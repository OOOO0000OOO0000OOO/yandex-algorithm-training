/**
 * "18. Дек с защитой от ошибок"
 * https://contest.yandex.ru/contest/45468/problems/18/
 * 
 * Научитесь пользоваться стандартной структурой данных deque для целых чисел. Напишите
 * программу, содержащую описание дека и моделирующую работу дека, реализовав все
 * указанные здесь методы. Программа считывает последовательность команд и в
 * зависимости от команды выполняет ту или иную операцию. После выполнения каждой
 * команды программа должна вывести одну строчку.
 * 
 * Возможные команды для программы:
 * - push_front n
 * Добавить (положить) в начало дека новый элемент. Программа должна вывести ok.
 * 
 * - push_back n
 * Добавить (положить) в конец дека новый элемент. Программа должна вывести ok.
 * 
 * - pop_front
 * Извлечь из дека первый элемент. Программа должна вывести его значение.
 * 
 * - pop_back
 * Извлечь из дека последний элемент. Программа должна вывести его значение.
 * 
 * - front
 * Узнать значение первого элемента (не удаляя его). Программа должна вывести его
 * значение.
 * 
 * - back
 * Узнать значение последнего элемента (не удаляя его). Программа должна вывести его
 * значение.
 * 
 * - size
 * Вывести количество элементов в деке.
 * 
 * - clear
 * Очистить дек (удалить из него все элементы) и вывести ok.
 * 
 * - exit
 * Программа должна вывести bye и завершить работу.
 * 
 * Гарантируется, что количество элементов в деке в любой момент не превосходит 100. Перед
 * исполнением операций pop_front, pop_back, front, back программа должна проверять,
 * содержится ли в деке хотя бы один элемент. Если во входных данных встречается операция
 * pop_front, pop_back, front, back, и при этом дек пуст, то программа должна вместо числового
 * значения вывести строку error.
 * 
 * Формат ввода
 * Вводятся команды управления деком, по одной на строке.
 * 
 * Формат вывода
 * Требуется вывести протокол работы дека, по одному сообщению на строке.
 */

const fs = require('fs');

const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});

const lines = data
  .trim()
  .split('\n')
  .map((line) => line.trim());

class Deque {
  _deque = new Array(200);
  _back = 99;
  _front = 100;

  get _size() {
    return this._front - this._back - 1;
  }

  push_back(n) {
    this._deque[this._back] = n;
    this._back--;
    return 'ok';
  }

  push_front(n) {
    this._deque[this._front] = n;
    this._front++;
    return 'ok';
  }

  pop_back() {
    if (this._size) {
      this._back++;
      const value = this._deque[this._back];
      return value;
    }
    return this.error();
  }

  pop_front() {
    if (this._size) {
      this._front--;
      const value = this._deque[this._front];
      return value;
    }
    return this.error();
  }

  back() {
    if (this._size) return this._deque[this._back + 1];
    return this.error();
  }

  front() {
    if (this._size) return this._deque[this._front - 1];
    return this.error();
  }

  size() {
    return this._size;
  }

  clear() {
    this._deque = new Array(200);
    this._back = 99;
    this._front = 100;
    return 'ok';
  }

  exit() {
    return 'bye';
  }

  error() {
    return 'error';
  }
}

const deque = new Deque();
const result = [];

for (const line of lines) {
  const [command, n] = line.trim().split(' ');

  result.push(
    deque[command] ? deque[command](n) : deque.error(),
  );

  if (command === 'exit') break;
}

fs.writeFileSync('output.txt', result.join('\n'));