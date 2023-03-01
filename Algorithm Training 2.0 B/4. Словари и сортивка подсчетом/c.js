/**
 * "C. Частотный анализ"
 * https://contest.yandex.ru/contest/28970/problems/C/
 * 
 * Дан текст. Выведите все слова, встречающиеся в тексте, по одному на каждую строку. Слова
 * должны быть отсортированы по убыванию их количества появления в тексте, а при
 * одинаковой частоте появления — в лексикографическом порядке. Указание. После того, как
 * вы создадите словарь всех слов, вам захочется отсортировать его по частоте встречаемости
 * слова. Желаемого можно добиться, если создать список, элементами которого будут
 * кортежи из двух элементов: частота встречаемости слова и само слово. Например, [(2, 'hi'),
 * (1, 'what'), (3, 'is')]. Тогда стандартная сортировка будет сортировать список кортежей,
 * при этом кортежи сравниваются по первому элементу, а если они равны — то по второму. Это
 * почти то, что требуется в задаче.
 * 
 * @param { String } data текст
 * @returns { Sting[] } ответ на задачу
 */

const countWordsFrequency = (data) => {
  const words = data.trim().split(/\n|\s/g);
  const dict = {};

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    dict[word] = (dict[word] ?? 0) + 1;
  }

  const sortedKeys = Object.entries(dict)
    .sort(([word1, freq1], [word2, freq2]) => freq2 - freq1 || word1.localeCompare(word2))
    .map(([word]) => word);

  return sortedKeys;
}

export default countWordsFrequency;

