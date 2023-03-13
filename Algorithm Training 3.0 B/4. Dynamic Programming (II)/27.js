const findMaxCostPath = (table, n, m) => {
  const dp = new Array(n + 1)
    .fill(0)
    .map((_) => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] =
      Math.max(
        dp[i - 1][j],
        dp[i][j - 1],
      ) + table[i - 1][j - 1];
    }
  }

  const result = dp[n][m];
  const path = [];

  let diff = result,
    i = n,
    j = m;

  while (i - 1 || j - 1) {
    diff -= table[i - 1][j - 1];

    if (dp[i - 1][j] === diff) {
      i -= 1;
      path.push('D');
    } else if (dp[i][j - 1] === diff) {
      j -= 1;
      path.push('R');
    }
  }

  return result + '\n' + path.reverse().join(' ');
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [[n, m], ...table] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const result = findMaxCostPath(table, n, m);

fs.writeFileSync('output.txt', result.toString());
