import type { Card, Deck, Face } from '../data'

// Mathematical Methods 3–4, Data analysis, probability and statistics: continuous random
// variables (pdfs, mean, variance, median), the normal distribution, and the distribution of
// sample proportions with approximate confidence intervals.

const t = (tex: string): Face => ({ tex })
const w = (text: string): Face => ({ text })
type F = string | Face
const face = (f: F): Face => (typeof f === 'string' ? t(f) : f)

/** [id, group, front, back, traps, extra] — strings are TeX, w('…') is words. */
type Row = [string, string, F, F, F[], Partial<Card>?]

const PDF = 'Probability Density Functions'
const NORM = 'Normal Distribution'
const SAMP = 'Sample Proportions'

const E = (x: string) => `\\operatorname{E}(${x})`
const VAR = (x: string) => `\\operatorname{Var}(${x})`
const SD = (x: string) => `\\operatorname{sd}(${x})`
const ALL = '\\int_{-\\infty}^{\\infty}'
const PH = '\\hat{p}'
const SE = `\\sqrt{\\dfrac{${PH}(1 - ${PH})}{n}}`

const rows: Row[] = [
  ['pdf', PDF, w('Conditions for f to be a probability density function'), `f(x) \\ge 0 \\text{ for all } x \\text{ and } ${ALL} f(x)\\,dx = 1`, [`0 \\le f(x) \\le 1 \\text{ for all } x \\text{ and } ${ALL} f(x)\\,dx = 1`, `f(x) \\ge 0 \\text{ for all } x \\text{ and } ${ALL} f(x)\\,dx = 0`, `f(x) \\ge 0 \\text{ for all } x \\text{ and } ${ALL} x f(x)\\,dx = 1`], { tip: 'A density can be bigger than 1; only the total area must be 1.' }],
  ['interval', PDF, '\\Pr(a < X < b)', '\\int_a^b f(x)\\,dx', ['f(b) - f(a)', '\\int_a^b x f(x)\\,dx', "\\int_a^b f'(x)\\,dx"], { ask: 'X continuous with density f' }],
  ['point', PDF, '\\Pr(X = a)', '0', ['f(a)', '1', '\\int_{-\\infty}^{a} f(x)\\,dx'], { ask: 'X continuous', oneWay: true, tip: 'So Pr(X < a) = Pr(X ≤ a) for a continuous X.' }],
  ['mean', PDF, E('X'), `${ALL} x f(x)\\,dx`, [`${ALL} f(x)\\,dx`, `${ALL} x^2 f(x)\\,dx`, `${ALL} x f'(x)\\,dx`], { ask: 'X continuous with density f', family: 'moment' }],
  ['ex2', PDF, E('X^2'), `${ALL} x^2 f(x)\\,dx`, [`\\Big(${ALL} x f(x)\\,dx\\Big)^2`, `${ALL} x f(x)^2\\,dx`, `${ALL} x^2\\,dx`], { ask: 'X continuous with density f', family: 'moment' }],
  ['var', PDF, VAR('X'), `${ALL} x^2 f(x)\\,dx - \\mu^2`, [`${ALL} x^2 f(x)\\,dx - \\mu`, `\\mu^2 - ${ALL} x^2 f(x)\\,dx`, `${ALL} (x - \\mu) f(x)\\,dx`], { ask: 'X continuous with density f, μ = E(X)', tip: 'Still E(X²) − [E(X)]².' }],
  ['median', PDF, w('The median m of a continuous random variable'), '\\int_{-\\infty}^{m} f(x)\\,dx = 0.5', ['\\int_{-\\infty}^{m} x f(x)\\,dx = 0.5', 'f(m) = 0.5', '\\int_{-\\infty}^{m} f(x)\\,dx = 1'], { tip: 'Half the area lies to the left of m.' }],
  ['cond', PDF, '\\Pr(X < a \\mid X < b),\\; a < b', '\\dfrac{\\Pr(X < a)}{\\Pr(X < b)}', ['\\Pr(X < a)\\Pr(X < b)', '\\dfrac{\\Pr(X < b)}{\\Pr(X < a)}', '\\dfrac{\\Pr(a < X < b)}{\\Pr(X < b)}'], { tip: '(X < a) ∩ (X < b) is just X < a.' }],

  ['z', NORM, w('Standardising X ~ N(μ, σ²)'), 'Z = \\dfrac{X - \\mu}{\\sigma}', ['Z = \\dfrac{X - \\mu}{\\sigma^2}', 'Z = \\dfrac{X - \\sigma}{\\mu}', 'Z = \\dfrac{\\mu - X}{\\sigma}']],
  ['std', NORM, w('Mean and standard deviation of Z ~ N(0, 1)'), '\\mu = 0,\\; \\sigma = 1', ['\\mu = 1,\\; \\sigma = 0', '\\mu = 0,\\; \\sigma = 0.5', '\\mu = 0.5,\\; \\sigma = 1']],
  ['68', NORM, '\\Pr(\\mu - \\sigma < X < \\mu + \\sigma)', '\\approx 0.68', ['\\approx 0.95', '\\approx 0.5', '\\approx 0.997'], { family: 'rule' }],
  ['95', NORM, '\\Pr(\\mu - 2\\sigma < X < \\mu + 2\\sigma)', '\\approx 0.95', ['\\approx 0.68', '\\approx 0.997', '\\approx 0.975'], { family: 'rule' }],
  ['997', NORM, '\\Pr(\\mu - 3\\sigma < X < \\mu + 3\\sigma)', '\\approx 0.997', ['\\approx 0.95', '\\approx 0.99', '\\approx 0.68'], { family: 'rule' }],
  ['half', NORM, '\\Pr(X < \\mu)', '0.5', ['0', '0.68', '\\mu'], { ask: 'X ~ N(μ, σ²)', oneWay: true }],
  ['sym', NORM, '\\Pr(Z > a)', '\\Pr(Z < -a)', ['\\Pr(Z < a)', '-\\Pr(Z < a)', '\\Pr(Z > -a)'], { ask: 'by symmetry' }],
  ['between', NORM, '\\Pr(-a < Z < a)', '1 - 2\\Pr(Z > a)', ['2\\Pr(Z > a)', '1 - \\Pr(Z > a)', '2\\Pr(Z > a) - 1'], { ask: 'for a > 0, using one tail', tip: 'Take both tails off the whole.' }],
  ['centre', NORM, w('Mean, median and mode of N(μ, σ²)'), w('All equal to μ'), [w('Mean μ; median and mode depend on σ'), w('All equal to σ'), w('Mean μ, median 0.5, mode at the peak')]],
  ['sigma-up', NORM, w('Increasing σ in N(μ, σ²)'), w('The curve gets wider and lower; its centre stays at μ'), [w('The curve gets narrower and taller; its centre stays at μ'), w('The curve moves to the right; its shape is unchanged'), w('The curve gets wider and taller; its centre stays at μ')], { family: 'param' }],
  ['mu-up', NORM, w('Increasing μ in N(μ, σ²)'), w('The curve moves to the right; its shape is unchanged'), [w('The curve gets wider and lower; its centre stays at μ'), w('The curve gets narrower and taller; its centre stays at μ'), w('The curve moves to the left; its shape is unchanged')], { family: 'param' }],

  ['phat', SAMP, w('The sample proportion, from X successes in a sample of size n'), '\\hat{P} = \\dfrac{X}{n}', ['\\hat{P} = \\dfrac{n}{X}', '\\hat{P} = nX', '\\hat{P} = \\dfrac{X}{n - 1}']],
  ['param-stat', SAMP, w('p and p̂: which is the population parameter?'), w('p is the population parameter (fixed); p̂ is a sample statistic (varies between samples)'), [w('p̂ is the population parameter (fixed); p is a sample statistic (varies between samples)'), w('Both are population parameters'), w('Both vary from sample to sample')]],
  ['phat-mean', SAMP, E('\\hat{P}'), 'p', [PH, 'np', 'p(1 - p)'], { family: 'phat-stat' }],
  ['phat-sd', SAMP, SD('\\hat{P}'), '\\sqrt{\\dfrac{p(1 - p)}{n}}', ['\\dfrac{p(1 - p)}{n}', '\\sqrt{np(1 - p)}', '\\dfrac{\\sqrt{p(1 - p)}}{n}'], { family: 'phat-stat' }],
  ['phat-var', SAMP, VAR('\\hat{P}'), '\\dfrac{p(1 - p)}{n}', ['\\sqrt{\\dfrac{p(1 - p)}{n}}', 'np(1 - p)', '\\dfrac{p(1 - p)}{n^2}'], { family: 'phat-stat' }],
  ['n-up', SAMP, w('Increasing the sample size n'), w('The distribution of P̂ narrows; its mean stays p'), [w('The distribution of P̂ widens; its mean stays p'), w('The mean of P̂ moves closer to 0.5'), w('The distribution of P̂ narrows and its mean increases')]],
  ['ci', SAMP, w('Approximate confidence interval for p from a large sample'), `\\left(${PH} - z${SE},\\; ${PH} + z${SE}\\right)`, [`\\left(${PH} - ${SE},\\; ${PH} + ${SE}\\right)`, `\\left(${PH} - z\\dfrac{${PH}(1 - ${PH})}{n},\\; ${PH} + z\\dfrac{${PH}(1 - ${PH})}{n}\\right)`, `\\left(${PH} - z\\sqrt{${PH}(1 - ${PH})},\\; ${PH} + z\\sqrt{${PH}(1 - ${PH})}\\right)`], { tip: 'z is 1.96 for 95%.' }],
  ['z95', SAMP, w('z for a 95% confidence interval'), '1.96', ['1.645', '2.576', '0.975'], { family: 'zval', tip: 'Pr(−1.96 < Z < 1.96) ≈ 0.95.' }],
  ['z90', SAMP, w('z for a 90% confidence interval'), '1.645', ['1.96', '1.282', '2.576'], { family: 'zval' }],
  ['z99', SAMP, w('z for a 99% confidence interval'), '2.576', ['2.326', '1.96', '3'], { family: 'zval' }],
  ['moe', SAMP, w('Margin of error of an approximate confidence interval for p'), `z${SE}`, [SE, `2z${SE}`, `z\\dfrac{${PH}(1 - ${PH})}{n}`], { tip: 'Half the width of the interval.' }],
  ['ci-centre', SAMP, w('p̂ from a confidence interval (a, b)'), '\\dfrac{a + b}{2}', ['\\dfrac{b - a}{2}', 'b - a', 'a + b'], { family: 'ci-read' }],
  ['ci-moe', SAMP, w('Margin of error from a confidence interval (a, b)'), '\\dfrac{b - a}{2}', ['\\dfrac{a + b}{2}', 'b - a', '2(b - a)'], { family: 'ci-read' }],
  ['halve', SAMP, w('To halve the width of a confidence interval (same p̂, same level)'), w('Multiply the sample size by 4'), [w('Multiply the sample size by 2'), w('Divide the sample size by 4'), w('Multiply the sample size by √2')], { tip: 'The width is proportional to 1/√n.' }],
  ['level-up', SAMP, w('Raising the confidence level (same sample)'), w('The interval gets wider'), [w('The interval gets narrower'), w('The interval is unchanged'), w('The centre of the interval moves')]],
  ['meaning', SAMP, w('Meaning of a 95% confidence interval for p'), w('About 95% of intervals made this way, from repeated samples, would contain p'), [w('There is a 95% chance that p lies in this particular interval'), w('95% of sample proportions lie in this interval'), w('p̂ lies in about 95% of such intervals')], { tip: 'p is fixed; it is the interval that varies from sample to sample.' }],
]

const gaps: Record<string, Card['gap']> = {
  'median': { tex: '\\int_{-\\infty}^{m} f(x)\\,dx = \\gap', answers: ['0.5', '1/2', '½'] },
  'phat-sd': { tex: `${SD('\\hat{P}')} = \\sqrt{\\dfrac{p(1 - p)}{\\gap}}`, answers: ['n'] },
}

// Numbers a student can type.
const typeable: Record<string, string> = { point: '0', half: '0.5', z95: '1.96', z90: '1.645', z99: '2.576', 'phat-mean': 'p' }

export const methodsContinuousInferenceDeck: Deck = {
  id: 'methods-continuous-inference',
  title: 'Continuous & Sampling',
  blurb: 'Probability density functions, the normal distribution and the 68–95–99.7 rule, and sample proportions with approximate confidence intervals.',
  groups: [PDF, NORM, SAMP],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: face(front),
    back: typeable[id] ? { tex: back as string, plain: typeable[id] } : face(back),
    traps: traps.map(face),
    gap: gaps[id],
    ...extra,
  })),
  directionLabel: { fwd: 'Recall', rev: 'Recognise' },
  promptLabel: { fwd: 'Recall', rev: 'What is this?' },
  maxTraps: 3,
  source: 'VCE Mathematical Methods Study Design 2023–2027, Units 3 and 4, Data analysis, probability and statistics',
}
