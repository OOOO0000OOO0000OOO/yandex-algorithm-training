const findLCS = (n, seq1, m, seq2) => {
  const dp = Array.from({ length: n + 1 }, () =>
    new Array(m + 1).fill(0),
  );

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      const [I, J] = [seq1[i - 1], seq2[j - 1]];
      if (I === J) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const answer = [];
  let i = n,
      j = m;

  while (i > 0 && j > 0) {
    const [I, J] = [seq1[i - 1], seq2[j - 1]];
    if (I === J) {
      answer.push(I);
      i -= 1; j -= 1;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i -= 1;
    } else {
      j -= 1;
    }
  }

  return answer.reverse();
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [[n], seq1, [m], seq2] = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const result = findLCS(n, seq1, m, seq2);

fs.writeFileSync('output.txt', result.join(' '));
