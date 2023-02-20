/**
 * "11. Стек с защитой от ошибок"
 * https://contest.yandex.ru/contest/45468/problems/11/
 * 
 * Научитесь пользоваться стандартной структурой данных stack для целых чисел.
 * Напишите программу, содержащую описание стека и моделирующую работу стека,
 * реализовав все указанные здесь методы. Программа считывает последовательность
 * команд и в зависимости от команды выполняет ту или иную операцию. После
 * выполнения каждой команды программа должна вывести одну строчку.
 * 
 * Возможные команды для программы:
 * - push n
 * Добавить в стек число n (значение n задается после команды). Программа должна
 * вывести ok.
 * 
 * - pop
 * Удалить из стека последний элемент. Программа должна вывести его значение.
 * 
 * - back
 * Программа должна вывести значение последнего элемента, не удаляя его из стека.
 * 
 * - size
 * Программа должна вывести количество элементов в стеке.
 * 
 * - clear
 * Программа должна очистить стек и вывести ok.
 * 
 * - exit
 * Программа должна вывести bye и завершить работу.
 * 
 * Перед исполнением операций back и pop программа должна проверять, содержится ли в
 * стеке хотя бы один элемент. Если во входных данных встречается операция back или pop, и
 * при этом стек пуст, то программа должна вместо числового значения вывести строку error.
 * 
 * Формат ввода
 * Вводятся команды управления стеком, по одной на строке
 * 
 * Формат вывода
 * Программа должна вывести протокол работы стека, по одному сообщению на строке
 */

const fs = require('fs');

const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});

const lines = data
  .trim()
  .split('\n')
  .map((line) => line.trim());

class Stack {
  stack = [];

  get length() {
    return this.stack.length;
  }

  push(n) {
    this.stack.push(n);
    return 'ok';
  }

  pop() {
    if (this.length) return this.stack.pop();
    return this.error();
  }

  back() {
    if (this.length) return this.stack[this.length - 1];
    return this.error();
  }

  size() {
    return this.stack.length;
  }

  clear() {
    this.stack = [];
    return 'ok';
  }

  exit() {
    return 'bye';
  }

  error() {
    return 'error';
  }
}

const stack = new Stack();
const result = [];

for (const line of lines) {
  const [command, n] = line.trim().split(' ');

  result.push(
    stack[command] ? stack[command](n) : stack.error(),
  );

  if (command === 'exit') break;
}

fs.writeFileSync('output.txt', result.join('\n'));