/**
 * "35. Поиск цикла"
 * https://contest.yandex.ru/contest/45468/problems/35/
 * 
 * Дан неориентированный граф. Требуется определить, есть ли в нем цикл, и, если
 * есть, вывести его.
 * 
 * @param { Number[][] } graph 
 * @param { Number[] } visited 
 * @param { Number } init 
 * 
 * @returns { Number[] | undefined }
 */

const dfs = (graph, visited, init) => {
  const loop = [];
  const stack = [{ now: init }];

  while (stack.length) {
    const { now, prev } = stack.at(-1);

    if (!visited[now]) {
      visited[now] = 'gray';
    }

    if (now === loop[0]) return loop;

    const cycle = graph[now].find(
      (neig) => neig !== prev && visited[neig] === 'gray',
    );

    if (visited[now] === 'gray' && cycle) {
      if (!loop.length) loop.push(cycle);

      loop.push(now);
      stack.pop();

      continue;
    }

    const neig = graph[now].find(
      (neig) => !visited[neig] && neig !== prev,
    );

    if (neig) {
      stack.push({ now: neig, prev: now });

      continue;
    }

    visited[now] = 'black';

    stack.pop();
  }
};

/**
 * 
 * @param { Number } n количество вершин в графе ( 1 ≤ n ≤ 500 )
 * @param { Number[][] } adjMatrix в n строках задан сам граф матрицей смежности
 * @returns 
 */

const graphHasCycles = (n, adjMatrix) => {
  const graph = Array.from({ length: n + 1 }, () => []);

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      if (adjMatrix[i][j] === 1) {
        graph[i + 1].push(j + 1);
        graph[j + 1].push(i + 1);
      }
    }
  }

  const visited = [];

  for (let i = 1; i < n + 1; i++) {
    if (!visited[i]) {
      const loop = dfs(graph, visited, i);

      if (loop)
        return `YES\n${loop.length}\n${loop.join(' ')}`;
    }
  }

  return 'NO';
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [[n], ...adjMatrix] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const result = graphHasCycles(n, adjMatrix);

fs.writeFileSync('output.txt', result.toString());
