/**
 * "B. Максимальная сумма"
 * https://contest.yandex.ru/contest/29075/problems/B/
 * 
 * В этой задаче вам требуется найти непустой отрезок массива с максимальной суммой. 
 * 
 * @param { Number[] } sequence массив n целых чисел a_i (−10^9≤ a_i ≤ 10^9)
 * @param { Number } n размер массива  (1 ≤ n ≤ 3⋅10^5)
 * 
 * @returns { Number }  максимальная сумму на отрезке в данном массиве
 */

const findMaxSumInSequence = (sequence, n) => {
  let answer = sequence[0],
    prefixSum = 0,
    minSum = 0;

  for (let i = 0; i < n; i++) {
    prefixSum += sequence[i];

    if (prefixSum - minSum > answer) {
      answer = prefixSum - minSum;
    }

    if (prefixSum < minSum) {
      minSum = prefixSum;
    }
  }

  return answer;
};

export default findMaxSumInSequence;
