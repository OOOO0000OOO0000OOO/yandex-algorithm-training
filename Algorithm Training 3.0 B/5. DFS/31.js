/**
 * "31. Поиск в глубину"
 * https://contest.yandex.ru/contest/45468/problems/31/
 * 
 * Дан неориентированный граф, возможно, с петлями и кратными ребрами.
 * Необходимо построить компоненту связности, содержащую первую вершину.
 * 
 * @param { Number[][] } graph 
 * @param { Number } now 
 * @param { Set<Number> } visited 
 * 
 * @returns { Set<Number> } 
 */

const dfs = (graph, now, visited = new Set()) => {
  visited.add(now);

  graph[now].forEach((neig) => {
    if (!visited.has(neig)) dfs(graph, neig, visited);
  });

  return visited;
};

/**
 * 
 * @param { Number } n количество вершин N (1 ≤ N ≤ 10³)
 * @param { Number } m количество ребер M (0 ≤ M ≤ 5 * 10⁵)
 * @param { [Number, Number][] } edges пары чисел, определяющие номера вершин,
 * которые соединяют ребра
 * 
 * @returns { `${ Number }\n${ String }` } 
 * 
 * В первую строку выходного файла выведите число K — количество вершин в компоненте
 * связности. Во вторую строку выведите K целых чисел — вершины компоненты связности,
 * перечисленные в порядке возрастания номеров.
 */

const buildСonnectedComponent = (n, m, edges) => {
  const graph = Array.from({ length: n + 1 }, () => []);

  for (const [a, b] of edges) {
    if (a !== b) {
      graph[a].push(b);
      graph[b].push(a);
    }
  }

  const component = dfs(graph, 1);
  const vertices = [...component].sort((a, b) => a - b);

  return `${component.size}\n${vertices.join(' ')}`;
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [[n, m], ...edges] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const result = buildСonnectedComponent(n, m, edges);

fs.writeFileSync('output.txt', result.toString());
