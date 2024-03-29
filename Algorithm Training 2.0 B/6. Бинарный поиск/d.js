/**
 * "D. Вырубка леса"
 * https://contest.yandex.ru/contest/29188/problems/D/
 * 
 * Фермер Николай нанял двух лесорубов: Дмитрия и Федора, чтобы вырубить лес, на месте
 * которого должно быть кукурузное поле. В лесу растут X деревьев.
 * Дмитрий срубает по A деревьев в день, но каждый K-й день он отдыхает и не срубает ни
 * одного дерева. Таким образом, Дмитрий отдыхает в K-й, 2K-й, 3K-й день, и т.д.
 * Федор срубает по B деревьев в день, но каждый M-й день он отдыхает и не срубает ни
 * одного дерева. Таким образом, Федор отдыхает в M-й, 2M-й, 3M-й день, и т.д.
 * Лесорубы работают параллельно и, таким образом, в дни, когда никто из них не отдыхает,
 * они срубают A + B деревьев, в дни, когда отдыхает только Федор — A деревьев, а в дни,
 * когда отдыхает только Дмитрий — B деревьев. В дни, когда оба лесоруба отдыхают, ни одно
 * дерево не срубается.
 * Фермер Николай хочет понять, за сколько дней лесорубы срубят все деревья, и он сможет
 * засеять кукурузное поле.
 * Требуется написать программу, которая по заданным целым числам A, K, B, M и X
 * определяет, за сколько дней все деревья в лесу будут вырублены.
 * 
 * @param { bigint } a Дмитрий срубает по A деревьев в день (1 ≤ A ≤ 10⁹)
 * @param { bigint } k Дмитрий отдыхает ∀ K-й день (2 ≤ K ≤ 10¹⁸)
 * 
 * @param { bigint } b Федор срубает по B деревьев в день (1 ≤ B ≤ 10⁹)
 * @param { bigint } m Федор отдыхает ∀ M-й день (2 ≤ M ≤ 10¹⁸)
 * 
 * @param { bigint } x в лесу растут X деревьев (2 ≤ X ≤ 10¹⁸)
 * 
 * @returns { bigint } искомое количество дней
 */

const countFellingDays = (a, k, b, m, x) => {
  let [l, r] = [0n, 2n * x / a + 1n];

  while (l < r) {
    const days = (l + r) / 2n;

    const hd = days / k;
    const hf = days / m;

    const trees = (days - hd) * a + (days - hf) * b;

    if (trees >= x) r = days;
    else l = days + 1n;
  }

  return l;
};

const fs = require('fs');
const data = fs.readFileSync('input.txt', {
  encoding: 'utf-8',
});
const [a, k, b, m, x] = data.trim().split(' ').map(BigInt);

const result = countFellingDays(a, k, b, m, x);

fs.writeFileSync('output.txt', result.toString());
