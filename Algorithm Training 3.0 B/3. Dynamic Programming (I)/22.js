/**
 * "22. Кузнечик"
 * https://contest.yandex.ru/contest/45468/problems/22/
 * 
 * У одного из студентов в комнате живёт кузнечик, который очень любит прыгать
 * по клетчатой одномерной доске. Длина доски — N клеток. К его сожалению, он
 * умеет прыгать только на 1, 2, …, k клеток вперёд.
 * Однажды студентам стало интересно, сколькими способами кузнечик может
 * допрыгать из первой клетки до последней. Помогите им ответить на этот
 * вопрос.
 *
 * @param { Number } N (1 ≤ N ≤ 30)
 * @param { Number } k (1 ≤ k ≤ 10)
 * 
 * @returns { Number } количество способов
 */

const countWaysToJump = (N, k) => {
  let dp = [1, 1, ...new Array(N).fill(0)];

  for (let i = 2; i < N; i++) {
    let j = i - 1;

    while (j >= 0 && i - j <= k) {
      dp[i] += dp[j];
      j -= 1;
    }
  }

  return dp[N - 1];
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [N, k] = data.trim().split(' ').map(Number);

const result = countWaysToJump(N, k);

fs.writeFileSync('output.txt', result.toString());