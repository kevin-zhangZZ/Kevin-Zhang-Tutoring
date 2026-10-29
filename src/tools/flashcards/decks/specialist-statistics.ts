import type { Card, Deck, Face } from '../data'

// Specialist Units 3 & 4, Data analysis, probability and statistics: linear combinations of
// random variables, the distribution of the sample mean, confidence intervals for μ, and
// hypothesis tests for a population mean.

type F = string | Face
const f = (x: F): Face => (typeof x === 'string' ? { tex: x } : x)
const w = (text: string): Face => ({ text })

/** [id, group, front, back, traps, extra] — a string is TeX, w() is words. */
type Row = [string, string, F, F, F[], Partial<Card>?]

const E = '\\operatorname{E}', VAR = '\\operatorname{Var}', SD = '\\operatorname{sd}', NORM = '\\operatorname{N}'
const XB = '\\bar{X}', xb = '\\bar{x}'
const IID = 'X₁, …, Xₙ independent, each with mean μ and variance σ²'
const ci = (s: string, n: string) => `\\left(${xb} - z\\dfrac{${s}}{${n}},\\ ${xb} + z\\dfrac{${s}}{${n}}\\right)`

const LIN = 'Linear Combinations'
const MEAN = 'Sample Mean'
const CI = 'Confidence Intervals'
const HT = 'Hypothesis Tests'

const rows: Row[] = [
  // Linear combinations
  ['e-ax-b', LIN, `${E}(aX + b)`, `a${E}(X) + b`, [`a${E}(X)`, `a^2${E}(X) + b`, `${E}(X) + b`], { family: 'lin' }],
  ['var-ax-b', LIN, `${VAR}(aX + b)`, `a^2${VAR}(X)`, [`a${VAR}(X) + b`, `a^2${VAR}(X) + b`, `a${VAR}(X)`], {
    family: 'lin', tip: 'Adding b shifts the distribution but does not spread it.',
    gap: { tex: `${VAR}(aX + b) = a^{\\gap}\\,${VAR}(X)`, answers: ['2'] },
  }],
  ['sd-ax-b', LIN, `${SD}(aX + b)`, `|a|\\,${SD}(X)`, [`a^2\\,${SD}(X)`, `a\\,${SD}(X) + b`, `\\sqrt{a}\\,${SD}(X)`], { family: 'lin' }],
  ['e-ax-by', LIN, `${E}(aX + bY)`, `a${E}(X) + b${E}(Y)`, [`a^2${E}(X) + b^2${E}(Y)`, `${E}(X) + ${E}(Y)`, `ab\\,${E}(X)${E}(Y)`], { family: 'lin2' }],
  ['var-ax-by', LIN, `${VAR}(aX + bY)`, `a^2${VAR}(X) + b^2${VAR}(Y)`, [`a${VAR}(X) + b${VAR}(Y)`, `a^2${VAR}(X) - b^2${VAR}(Y)`, `(a + b)^2\\left(${VAR}(X) + ${VAR}(Y)\\right)`], { ask: 'X and Y independent', family: 'lin2' }],
  ['var-x-minus-y', LIN, `${VAR}(X - Y)`, `${VAR}(X) + ${VAR}(Y)`, [`${VAR}(X) - ${VAR}(Y)`, `\\left|${VAR}(X) - ${VAR}(Y)\\right|`, `${VAR}(X) + ${VAR}(Y) - 2`], {
    ask: 'X and Y independent', family: 'lin2', tip: 'Variances always add: the −1 is squared.',
    gap: { tex: `${VAR}(X - Y) = ${VAR}(X) \\gap ${VAR}(Y)`, answers: ['+'] },
  }],
  ['e-sum', LIN, `${E}(X_1 + X_2 + \\cdots + X_n)`, 'n\\mu', ['\\mu', 'n^2\\mu', '\\dfrac{\\mu}{n}'], { ask: IID, family: 'sum' }],
  ['var-sum', LIN, `${VAR}(X_1 + X_2 + \\cdots + X_n)`, 'n\\sigma^2', ['n^2\\sigma^2', '\\sigma^2', '\\dfrac{\\sigma^2}{n}'], { ask: IID, family: 'sum' }],
  ['var-nx', LIN, `${VAR}(nX)`, 'n^2\\sigma^2', ['n\\sigma^2', '\\sigma^2', '\\dfrac{\\sigma^2}{n}'], { ask: 'Var(X) = σ²', family: 'sum', tip: 'One value scaled by n, unlike the sum of n independent values (nσ²).' }],
  ['normal-comb', LIN, w('aX + bY, where X and Y are independent and normally distributed'), w('Normally distributed'), [w('Binomially distributed'), w('Normal only if a = b'), w('Normal only if the sample is large')], { oneWay: true }],

  // Distribution of the sample mean
  ['e-xbar', MEAN, `${E}(${XB})`, '\\mu', ['n\\mu', '\\dfrac{\\mu}{n}', xb], { family: 'xbar' }],
  ['sd-xbar', MEAN, `${SD}(${XB})`, '\\dfrac{\\sigma}{\\sqrt{n}}', ['\\dfrac{\\sigma}{n}', '\\dfrac{\\sigma^2}{n}', '\\sigma\\sqrt{n}'], { family: 'xbar' }],
  ['var-xbar', MEAN, `${VAR}(${XB})`, '\\dfrac{\\sigma^2}{n}', ['\\dfrac{\\sigma}{\\sqrt{n}}', '\\dfrac{\\sigma^2}{\\sqrt{n}}', 'n\\sigma^2'], { family: 'xbar' }],
  ['xbar-dist', MEAN, XB, `${XB}\\sim ${NORM}\\left(\\mu, \\dfrac{\\sigma^2}{n}\\right)`, [`${XB}\\sim ${NORM}\\left(n\\mu, \\dfrac{\\sigma^2}{n}\\right)`, `${XB}\\sim ${NORM}\\left(\\dfrac{\\mu}{n}, \\dfrac{\\sigma^2}{n}\\right)`, `${XB}\\sim ${NORM}(\\mu, \\sigma^2)`], { ask: 'X ~ N(μ, σ²), samples of size n', oneWay: true }],
  ['xbar-exact', MEAN, w('X̄ is exactly normal, for any sample size, when'), w('X itself is normally distributed'), [w('n ≥ 30'), w('σ is known'), w('X is binomial')], { family: 'normal', oneWay: true }],
  ['xbar-approx', MEAN, w('X̄ is approximately normal, whatever the distribution of X, when'), w('n is large (n ≥ 30 in practice)'), [w('n is small'), w('X is skewed'), w('σ is unknown')], { family: 'normal', oneWay: true }],
  ['quadruple', MEAN, w('To halve sd(X̄), multiply the sample size by'), '4', ['2', '\\sqrt{2}', '8'], { oneWay: true, back: { tex: '4', plain: '4' }, tip: 'sd(X̄) = σ/√n, so n must grow by 2².' }],

  // Confidence intervals
  ['ci-sigma', CI, w('Approximate confidence interval for μ, σ known'), ci('\\sigma', '\\sqrt{n}'), [ci('\\sigma', 'n'), `\\left(\\mu - z\\dfrac{\\sigma}{\\sqrt{n}},\\ \\mu + z\\dfrac{\\sigma}{\\sqrt{n}}\\right)`, `\\left(${xb} - z\\sigma,\\ ${xb} + z\\sigma\\right)`], { family: 'ci' }],
  ['ci-s', CI, w('Approximate confidence interval for μ, σ unknown and n large'), ci('s', '\\sqrt{n}'), [ci('s', 'n'), `\\left(${xb} - zs,\\ ${xb} + zs\\right)`, `\\left(${xb} - \\dfrac{s}{\\sqrt{n}},\\ ${xb} + \\dfrac{s}{\\sqrt{n}}\\right)`], { family: 'ci', tip: 's is the sample standard deviation.' }],
  ['z90', CI, w('z for a 90% confidence interval'), '1.645', ['1.96', '1.282', '0.95'], { family: 'z', back: { tex: '1.645', plain: '1.645' } }],
  ['z95', CI, w('z for a 95% confidence interval'), '1.96', ['1.645', '2.576', '0.975'], { family: 'z', back: { tex: '1.96', plain: '1.96' }, tip: 'Pr(−1.96 < Z < 1.96) ≈ 0.95.' }],
  ['z99', CI, w('z for a 99% confidence interval'), '2.576', ['2.326', '1.96', '0.995'], { family: 'z', back: { tex: '2.576', plain: '2.576' } }],
  ['margin', CI, w('Margin of error of a confidence interval, σ known'), 'z\\dfrac{\\sigma}{\\sqrt{n}}', ['2z\\dfrac{\\sigma}{\\sqrt{n}}', 'z\\dfrac{\\sigma}{n}', '\\dfrac{\\sigma}{\\sqrt{n}}'], { family: 'width' }],
  ['width', CI, w('Width of a confidence interval, σ known'), '2z\\dfrac{\\sigma}{\\sqrt{n}}', ['z\\dfrac{\\sigma}{\\sqrt{n}}', '2z\\dfrac{\\sigma}{n}', '\\dfrac{z\\sigma}{2\\sqrt{n}}'], { family: 'width' }],
  ['ci-meaning', CI, w('What "95% confidence interval" means'), w('About 95% of intervals made this way from repeated samples would contain μ'), [w('There is a 95% chance that μ lies in this particular interval'), w('95% of sample means lie in this interval'), w('95% of the population lies in this interval')], { oneWay: true, tip: 'μ is fixed; it is the interval that varies from sample to sample.' }],
  ['ci-level', CI, w('Effect of a higher confidence level on the interval'), w('Wider'), [w('Narrower'), w('No change in width'), w('Moves to the right')], { family: 'effect', back: { text: 'Wider', plain: 'wider' } }],
  ['ci-n', CI, w('Effect of a larger sample size on the interval'), w('Narrower'), [w('Wider'), w('No change in width'), w('Moves to the right')], { family: 'effect', back: { text: 'Narrower', plain: 'narrower' } }],

  // Hypothesis tests
  ['h0', HT, w('The null hypothesis for a test of a mean'), 'H_0: \\mu = \\mu_0', [`H_0: ${xb} = \\mu_0`, 'H_0: \\mu \\ne \\mu_0', 'H_0: \\mu > \\mu_0'], { tip: 'Hypotheses are about the population mean μ, never x̄.' }],
  ['h1-up', HT, w('H₁ for a claim that the mean has increased from μ₀'), 'H_1: \\mu > \\mu_0', [`H_1: ${xb} > \\mu_0`, 'H_1: \\mu \\ne \\mu_0', 'H_1: \\mu \\ge \\mu_0'], { family: 'h1' }],
  ['two-tail', HT, w('A test is two-tailed when H₁ is'), '\\mu \\ne \\mu_0', ['\\mu > \\mu_0', '\\mu < \\mu_0', '\\mu = \\mu_0'], { family: 'h1', oneWay: true }],
  ['test-stat', HT, 'z', `\\dfrac{${xb} - \\mu_0}{\\sigma/\\sqrt{n}}`, [`\\dfrac{${xb} - \\mu_0}{\\sigma}`, `\\dfrac{${xb} - \\mu_0}{\\sigma/n}`, `\\dfrac{\\mu_0 - ${xb}}{\\sqrt{n}}`], { ask: 'the test statistic for H₀: μ = μ₀' }],
  ['p-def', HT, w('The p-value'), w('The probability of a result at least as extreme as the one observed, assuming H₀ is true'), [w('The probability that H₀ is true'), w('The probability that H₁ is true'), w('The probability of a result at least as extreme as the one observed, assuming H₁ is true')]],
  ['p-two', HT, 'p', `2\\Pr(${XB} \\ge ${xb} \\mid \\mu = \\mu_0)`, [`\\Pr(${XB} \\ge ${xb} \\mid \\mu = \\mu_0)`, `2\\Pr(${XB} \\le ${xb} \\mid \\mu = \\mu_0)`, `\\tfrac{1}{2}\\Pr(${XB} \\ge ${xb} \\mid \\mu = \\mu_0)`], { ask: 'two-tailed test, with x̄ > μ₀', oneWay: true, tip: 'Double the one-tail probability.' }],
  ['reject', HT, w('The decision when p < α'), w('Reject H₀ in favour of H₁'), [w('Accept H₀'), w('Do not reject H₀'), w('H₁ has been proved true')], { family: 'decide' }],
  ['not-reject', HT, w('The decision when p > α'), w('Do not reject H₀: there is insufficient evidence against it'), [w('Accept H₁'), w('Reject H₀'), w('H₀ has been proved true')], { family: 'decide' }],
  ['type1', HT, w('A type I error'), w('Rejecting H₀ when H₀ is true'), [w('Not rejecting H₀ when H₀ is false'), w('Rejecting H₀ when H₀ is false'), w('Not rejecting H₀ when H₀ is true')], { family: 'err' }],
  ['type2', HT, w('A type II error'), w('Not rejecting H₀ when H₀ is false'), [w('Rejecting H₀ when H₀ is true'), w('Rejecting H₀ when H₀ is false'), w('Not rejecting H₀ when H₀ is true')], { family: 'err' }],
  ['p-type1', HT, '\\Pr(\\text{type I error})', '\\Pr(\\text{reject } H_0 \\mid H_0 \\text{ true})', ['\\Pr(H_0 \\text{ true} \\mid \\text{reject } H_0)', '\\Pr(\\text{reject } H_0 \\mid H_0 \\text{ false})', '\\Pr(\\text{do not reject } H_0 \\mid H_0 \\text{ false})'], { family: 'errp', tip: 'For these z-tests it equals the significance level α.' }],
  ['p-type2', HT, '\\Pr(\\text{type II error})', '\\Pr(\\text{do not reject } H_0 \\mid H_0 \\text{ false})', ['\\Pr(H_0 \\text{ false} \\mid \\text{do not reject } H_0)', '\\Pr(\\text{reject } H_0 \\mid H_0 \\text{ true})', '\\Pr(\\text{do not reject } H_0 \\mid H_0 \\text{ true})'], { family: 'errp' }],
]

export const specialistStatisticsDeck: Deck = {
  id: 'specialist-statistics',
  title: 'Statistical Inference',
  blurb: 'Linear combinations of random variables, the distribution of the sample mean, confidence intervals and hypothesis tests for μ.',
  groups: [LIN, MEAN, CI, HT],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: f(front),
    back: f(back),
    traps: traps.map(f),
    ...extra,
  })),
  directionLabel: { fwd: 'Recall', rev: 'Recognise' },
  promptLabel: { fwd: 'What is this?', rev: 'Which gives this?' },
  maxTraps: 3,
  source: 'VCE Specialist Mathematics Study Design 2023–2027, Units 3 & 4: Data analysis, probability and statistics',
}
