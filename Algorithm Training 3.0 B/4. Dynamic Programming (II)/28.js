const countAllKnightsTours = (n, m) => {
  const dp = Array.from({ length: n + 1 }, () =>
    new Array(m + 1).fill(0),
  );

  dp[1][1] = 1;

  for (let i = 2; i < n + 1; i++) {
    for (let j = 2; j < m + 1; j++) {
      dp[i][j] = dp[i - 1][j - 2] + dp[i - 2][j - 1];
    }
  }

  return dp[n][m];
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [n, m] = data.trim().split(' ').map(Number);

const result = countAllKnightsTours(n, m);

fs.writeFileSync('output.txt', result.toString());
