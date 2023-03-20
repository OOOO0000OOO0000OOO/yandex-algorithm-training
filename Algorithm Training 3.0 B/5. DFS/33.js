/**
 * "33. Списывание"
 * https://contest.yandex.ru/contest/45468/problems/33/
 * 
 * Во время контрольной работы профессор Флойд заметил, что некоторые студенты
 * обмениваются записками. Сначала он хотел поставить им всем двойки, но в тот день
 * профессор был добрым, а потому решил разделить студентов на две группы: списывающих
 * и дающих списывать, и поставить двойки только первым.
 * У профессора записаны все пары студентов, обменявшихся записками. Требуется
 * определить, сможет ли он разделить студентов на две группы так, чтобы любой обмен
 * записками осуществлялся от студента одной группы студенту другой группы.
 * 
 * @param { Number[][] } graph 
 * @param { Number[] } visited 
 * @param { Number } now 
 * @param { 1 | 2 } color 
 * 
 * @returns { Boolean }
 */

const dfs = (graph, visited, now, color) => {
  visited[now] = color;

  const neigColor = 3 - color;

  for (const neig of graph[now]) {
    if (
      visited[neig] === color ||
      (!visited[neig] &&
        !dfs(graph, visited, neig, neigColor))
    )
      return false;
  }

  return true;
};

/**
 * 
 * @param { Number } n количество студентов (1 ≤ N ≤ 10²)
 * @param { Number } m количество пар студентов, обменивающихся записками
 * (0 ≤ M ≤ N(N−1)/2)
 * @param { [Number, Number][] } edges далее в M строках расположены описания пар
 * студентов: два числа, соответствующие номерам студентов, обменивающихся записками
 * (нумерация студентов идёт с 1). Каждая пара студентов перечислена не более одного
 * раза.
 * 
 * @returns { 'YES' | 'NO' }
 * Необходимо вывести ответ на задачу профессора Флойда. Если возможно разделить
 * студентов на две группы - выведите YES; иначе выведите NO.
 */

const isGraphBipartite = (n, m, edges) => {
  const graph = Array.from({ length: n + 1 }, () => []);

  for (const [a, b] of edges) {
    if (a !== b) {
      graph[a].push(b);
      graph[b].push(a);
    }
  }

  const visited = [];

  for (let i = 1; i < n + 1; i++) {
    if (!visited[i] && !dfs(graph, visited, i, 1))
      return 'NO';
  }

  return 'YES';
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [[n, m], ...edges] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const result = isGraphBipartite(n, m, edges);

fs.writeFileSync('output.txt', result.toString());
