/**
 * "34. Топологическая сортировка"
 * https://contest.yandex.ru/contest/45468/problems/34/
 * 
 * Дан ориентированный граф. Необходимо построить топологическую сортировку.
 * 
 * @param { Number[][] } graph 
 * @param { Number[] } visited 
 * @param { Number[] } sorted 
 * @param { Number } init 
 * 
 * @returns { Boolean }
 */

const dfs = (graph, visited, sorted, init) => {
  const stack = [init];

  while (stack.length) {
    const now = stack.at(-1);

    if (!visited[now]) {
      visited[now] = 'gray';

      graph[now].forEach((neig) => {
        if (!visited[neig]) stack.push(neig);
      });

      continue;
    }

    if (visited[now] === 'gray') {
      if (graph[now].some((neig) => visited[neig] === 'gray'))
        return false;

      visited[now] = 'black';
      sorted.push(now);
    }

    stack.pop();
  }

  return true;
};

/**
 * 
 * @param { Number } n количество вершин в графе (1 < N ≤ 100000)
 * @param { Number } m количество рёбер в графе (1 ≤ M ≤ 100000)
 * @param { [Number, Number][] } edges в M строках перечислены рёбра графа. Каждое
 * ребро задаётся парой чисел — номерами начальной и конечной вершин соответственно
 * 
 * @returns { String | -1 }
 * Выведите любую топологическую сортировку графа в виде последовательности номеров
 * вершин (перестановка чисел от 1 до N). Если топологическую сортировку графа построить
 * невозможно, выведите -1.
 */

const topologicalSort = (n, m, edges) => {
  const directedGraph = Array.from({ length: n + 1 }, () => []);

  for (const [a, b] of edges) {
    directedGraph[a].push(b);
  }

  const visited = [];
  const sorted = [];

  for (let i = 1; i < n + 1; i++) {
    if (
      visited[i] === 'gray' ||
      (!visited[i] && !dfs(directedGraph, visited, sorted, i))
    )
      return -1;
  }

  return sorted.reverse().join(' ');
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [[n, m], ...edges] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const result = topologicalSort(n, m, edges);

fs.writeFileSync('output.txt', result.toString());
