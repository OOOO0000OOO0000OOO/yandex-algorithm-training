const findCheapestPath = (table, n, m) => {
  const dp = new Array(n + 1)
    .fill(0)
    .map(_ => new Array(m + 1).fill(Infinity));
  [dp[0][0], dp[0][1] = 0, dp[1][0]] = [0, 0, 0];

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j],
        dp[i][j - 1],
      ) + table[i - 1][j - 1];
    }
  }

  return dp[n][m];
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [[n, m], ...table] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const result = findCheapestPath(table, n, m);

fs.writeFileSync('output.txt', result.toString());