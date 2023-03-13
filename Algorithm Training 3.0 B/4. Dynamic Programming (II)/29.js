const findMinPrice = (prices, n) => {
  if (n < 1) return `0\n0 0`;

  const dp = Array.from({ length: n + 1 }, () =>
    new Array(n + 1).fill(0),
  );

  for (let i = 0; i < n + 1; i++) {
    dp[i][0] = Infinity;
    dp[0][i] = Infinity;
    dp[1][i] = Infinity;
  }

  dp[1][1] = prices[0];
  if (prices[0] > 100) dp[1][2] = prices[0];

  for (let i = 2; i < n + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      const price = prices[i - 1];
      const coupon =
        price > 100 ? dp[i - 1][j - 1] + price : Infinity;
      const discount = j < n ? dp[i - 1][j + 1] : Infinity;

      dp[i][j] = Math.min(
        coupon,
        dp[i - 1][j] + price,
        discount,
      );
    }
  }

  const minPrice = Math.min(...dp[n]);
  const k1 = dp[n].lastIndexOf(minPrice) - 1;

  let k2 = 0,
    i = n,
    j = k1 + 1;

  const answer = [];

  while (i > 1) {
    let coupon = j < n ? dp[i - 1][j + 1] : Infinity;

    if (dp[i][j] === coupon) {
      answer.push(i);

      k2 += 1;
      i -= 1;
      j += 1;
    } else if (prices[i - 1] > 100) {
      i -= 1;
      j -= 1;
    } else {
      i -= 1;
    }
  }

  return `${minPrice}\n${k1} ${k2}\n${answer
    .reverse()
    .join(' ')}`;
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [n, ...prices] = data.trim().split('\n').map(Number);

const result = findMinPrice(prices, n);

fs.writeFileSync('output.txt', result.toString());
