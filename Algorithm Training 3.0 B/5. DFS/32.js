/**
 * "32. Компоненты связности"
 * https://contest.yandex.ru/contest/45468/problems/32/
 * 
 * Дан неориентированный невзвешенный граф, состоящий из N вершин и M ребер.
 * Необходимо посчитать количество его компонент связности и вывести их.
 * 
 * @param { Number[][] } graph 
 * @param { Number } now 
 * @param { Number[] } visited 
 * @param { Number[] } component 
 * @param { Number[] } stack 
 */

const dfs = (
  graph,
  now,
  visited,
  component,
  stack = [],
) => {
  visited[now] = true;

  component.push(now);
  stack.push(now);

  while (stack.length) {
    const now = stack.pop();

    graph[now].forEach((neig) => {
      if (!visited[neig]) {
        visited[neig] = true;

        component.push(neig);
        stack.push(neig);
      }
    });
  }
};

/**
 * 
 * @param { Number } n (0 < N ≤ 100000)
 * @param { Number } m (0 ≤ M ≤ 100000)
 * @param { [Number, Number][] } edges в следующих M строках записаны по два числа i и j
 * (1 ≤ i, j ≤ N), которые означают, что вершины i и j соединены ребром
 * 
 * @returns { `${ Number }\n${ String }` }
 * В первой строчке выходного файла выведите количество компонент связности. Далее
 * выведите сами компоненты связности в следующем формате: в первой строке количество
 * вершин в компоненте, во второй - сами вершины в произвольном порядке.
 */

const countСonnectedComponents = (n, m, edges) => {
  const graph = Array.from({ length: n + 1 }, () => []);

  for (const [a, b] of edges) {
    if (a !== b) {
      graph[a].push(b);
      graph[b].push(a);
    }
  }

  const visited = [],
    components = [];

  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      const component = [];

      dfs(graph, i, visited, component);

      components.push(component);
    }
  }

  return `${components.length}\n${components
    .map((comp) => `${comp.length}\n${comp.join(' ')}`)
    .join('\n')}`;
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [[n, m], ...edges] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const result = countСonnectedComponents(n, m, edges);

fs.writeFileSync('output.txt', result.toString());
