import type { Card, Deck, Face } from '../data'

// Mathematical Methods 3–4, Data analysis, probability and statistics: the probability rules
// (including conditional probability), discrete random variables, and the binomial distribution.

const t = (tex: string): Face => ({ tex })
const w = (text: string): Face => ({ text })
type F = string | Face
const face = (f: F): Face => (typeof f === 'string' ? t(f) : f)

/** [id, group, front, back, traps, extra] — strings are TeX, w('…') is words. */
type Row = [string, string, F, F, F[], Partial<Card>?]

const RULES = 'Probability Rules'
const DRV = 'Discrete Random Variables'
const BIN = 'Binomial Distribution'

const E = (x: string) => `\\operatorname{E}(${x})`
const VAR = (x: string) => `\\operatorname{Var}(${x})`
const SD = (x: string) => `\\operatorname{sd}(${x})`
const SUM = '\\sum'

const rows: Row[] = [
  ['union', RULES, '\\Pr(A \\cup B)', '\\Pr(A) + \\Pr(B) - \\Pr(A \\cap B)', ['\\Pr(A) + \\Pr(B)', '\\Pr(A)\\Pr(B)', '\\Pr(A) + \\Pr(B) + \\Pr(A \\cap B)'], { tip: 'Take off the overlap, counted twice.' }],
  ['cond', RULES, '\\Pr(A \\mid B)', '\\dfrac{\\Pr(A \\cap B)}{\\Pr(B)}', ['\\dfrac{\\Pr(A \\cap B)}{\\Pr(A)}', '\\dfrac{\\Pr(A)}{\\Pr(B)}', '\\Pr(A \\cap B)\\Pr(B)'], { tip: 'Divide by the probability of what is given.' }],
  ['mult', RULES, '\\Pr(A \\cap B)', '\\Pr(A \\mid B)\\Pr(B)', ['\\Pr(A \\mid B)\\Pr(A)', '\\dfrac{\\Pr(A \\mid B)}{\\Pr(B)}', '\\Pr(A) + \\Pr(B)'], { ask: 'in terms of a conditional probability' }],
  ['complement', RULES, "\\Pr(A')", '1 - \\Pr(A)', ['\\Pr(A) - 1', '\\dfrac{1}{\\Pr(A)}', '-\\Pr(A)']],
  ['total', RULES, '\\Pr(A)', "\\Pr(A \\cap B) + \\Pr(A \\cap B')", ["\\Pr(A \\cap B)\\Pr(A \\cap B')", "\\Pr(A \\mid B) + \\Pr(A \\mid B')", "\\Pr(B) + \\Pr(B')"], { ask: 'split by whether B happens' }],
  ['neither', RULES, "\\Pr(A' \\cap B')", '1 - \\Pr(A \\cup B)', ['1 - \\Pr(A \\cap B)', "\\Pr(A') + \\Pr(B')", "\\Pr(A')\\Pr(B')"], { tip: 'Neither = not (either).  Pr(A′)Pr(B′) works only if A and B are independent.' }],
  ['indep', RULES, w('A and B are independent'), '\\Pr(A \\cap B) = \\Pr(A)\\Pr(B)', ['\\Pr(A \\cap B) = 0', '\\Pr(A \\cup B) = \\Pr(A) + \\Pr(B)', '\\Pr(A \\mid B) = \\Pr(B)'], { family: 'event' }],
  ['indep-cond', RULES, w('A and B are independent (conditional form)'), '\\Pr(A \\mid B) = \\Pr(A)', ['\\Pr(A \\mid B) = \\Pr(B)', '\\Pr(A \\mid B) = 0', '\\Pr(A \\mid B) = \\Pr(B \\mid A)'], { family: 'event', tip: 'Knowing B happened does not change the chance of A.' }],
  ['mutex', RULES, w('A and B are mutually exclusive'), '\\Pr(A \\cap B) = 0', ['\\Pr(A \\cap B) = \\Pr(A)\\Pr(B)', '\\Pr(A \\cup B) = 1', '\\Pr(A \\mid B) = \\Pr(A)'], { family: 'event', tip: 'They cannot both happen. Then Pr(A ∪ B) = Pr(A) + Pr(B).' }],

  ['pmf', DRV, w('Conditions for a discrete probability distribution'), `0 \\le \\Pr(X = x) \\le 1 \\text{ and } ${SUM} \\Pr(X = x) = 1`, [`0 \\le \\Pr(X = x) \\le 1 \\text{ and } ${SUM} \\Pr(X = x) = 0`, `0 \\le \\Pr(X = x) \\le 1 \\text{ and } ${SUM} x\\Pr(X = x) = 1`, `\\Pr(X = x) \\ge 1 \\text{ and } ${SUM} \\Pr(X = x) = 1`]],
  ['mean', DRV, E('X'), `${SUM} x\\Pr(X = x)`, [`${SUM} \\Pr(X = x)`, `${SUM} x^2\\Pr(X = x)`, `\\dfrac{1}{n}${SUM} \\Pr(X = x)`], { ask: 'X discrete', family: 'moment' }],
  ['ex2', DRV, E('X^2'), `${SUM} x^2\\Pr(X = x)`, [`\\Big(${SUM} x\\Pr(X = x)\\Big)^2`, `${SUM} x\\Pr(X = x)^2`, `${SUM} x^2`], { ask: 'X discrete', family: 'moment' }],
  ['var-def', DRV, VAR('X'), `${E('(X - \\mu)^2')}`, [`${E('X - \\mu')}`, `\\big(${E('X')} - \\mu\\big)^2`, `${E('(X - \\mu)')}^2`], { ask: 'definition, where μ = E(X)', family: 'var' }],
  ['var', DRV, VAR('X'), `${E('X^2')} - \\big[${E('X')}\\big]^2`, [`\\big[${E('X')}\\big]^2 - ${E('X^2')}`, `${E('X^2')} - ${E('X')}`, `${E('X^2')} + \\big[${E('X')}\\big]^2`], { ask: 'the form used to calculate it', family: 'var', tip: 'The mean of the square minus the square of the mean.' }],
  ['sd', DRV, SD('X'), `\\sqrt{${VAR('X')}}`, [`\\big(${VAR('X')}\\big)^2`, `\\dfrac{${VAR('X')}}{2}`, `\\sqrt{${E('X')}}`]],
  ['lin-mean', DRV, E('aX + b'), `a${E('X')} + b`, [`a${E('X')}`, `a^2${E('X')} + b`, `${E('X')} + b`], { family: 'lin' }],
  ['lin-var', DRV, VAR('aX + b'), `a^2${VAR('X')}`, [`a${VAR('X')}`, `a^2${VAR('X')} + b`, `a${VAR('X')} + b`], { family: 'lin', tip: 'Adding b shifts the distribution without spreading it.' }],
  ['lin-sd', DRV, SD('aX + b'), `|a|\\,${SD('X')}`, [`a^2\\,${SD('X')}`, `|a|\\,${SD('X')} + b`, `\\sqrt{a}\\,${SD('X')}`], { family: 'lin' }],

  ['bin-cond', BIN, w('Conditions for X ~ Bi(n, p)'), w('A fixed number n of independent trials, each a success or failure with the same probability p of success'), [w('A fixed number n of trials, each a success or failure, where the probability of success may change between trials'), w('Independent trials repeated until the first success, each with probability p of success'), w('A fixed number n of trials drawn without replacement from a small population')]],
  ['bin-pmf', BIN, '\\Pr(X = x),\\; X \\sim \\operatorname{Bi}(n, p)', '\\dbinom{n}{x}p^x(1 - p)^{n - x}', ['\\dbinom{n}{x}p^{n - x}(1 - p)^x', 'p^x(1 - p)^{n - x}', '\\dbinom{n}{x}p^x(1 - p)^n']],
  ['ncr', BIN, '\\dbinom{n}{r}', '\\dfrac{n!}{r!\\,(n - r)!}', ['\\dfrac{n!}{(n - r)!}', '\\dfrac{n!}{r!}', '\\dfrac{r!\\,(n - r)!}{n!}']],
  ['bin-mean', BIN, `${E('X')},\\; X \\sim \\operatorname{Bi}(n, p)`, 'np', ['n(1 - p)', 'np(1 - p)', '\\dfrac{p}{n}'], { family: 'bin-stat' }],
  ['bin-var', BIN, `${VAR('X')},\\; X \\sim \\operatorname{Bi}(n, p)`, 'np(1 - p)', ['np', '\\sqrt{np(1 - p)}', 'np^2'], { family: 'bin-stat' }],
  ['bin-sd', BIN, `${SD('X')},\\; X \\sim \\operatorname{Bi}(n, p)`, '\\sqrt{np(1 - p)}', ['np(1 - p)', '\\sqrt{np}', 'n\\sqrt{p(1 - p)}'], { family: 'bin-stat' }],
  ['bern-mean', BIN, w('Mean of a Bernoulli random variable with Pr(success) = p'), 'p', ['1 - p', 'p(1 - p)', '\\dfrac{1}{2}'], { family: 'bern' }],
  ['bern-var', BIN, w('Variance of a Bernoulli random variable with Pr(success) = p'), 'p(1 - p)', ['p', 'p^2', '\\sqrt{p(1 - p)}'], { family: 'bern' }],
  ['at-least-one', BIN, '\\Pr(X \\ge 1),\\; X \\sim \\operatorname{Bi}(n, p)', '1 - (1 - p)^n', ['1 - p^n', '(1 - p)^n', '1 - np(1 - p)^{n - 1}'], { tip: 'One minus the chance of no successes.' }],
  ['shape-low', BIN, w('Shape of the graph of Bi(n, p) when p < 0.5'), w('Positively skewed (tail to the right)'), [w('Negatively skewed (tail to the left)'), w('Symmetric'), w('Bimodal')], { family: 'shape' }],
  ['shape-mid', BIN, w('Shape of the graph of Bi(n, p) when p = 0.5'), w('Symmetric'), [w('Positively skewed (tail to the right)'), w('Negatively skewed (tail to the left)'), w('Bimodal')], { family: 'shape' }],
  ['shape-high', BIN, w('Shape of the graph of Bi(n, p) when p > 0.5'), w('Negatively skewed (tail to the left)'), [w('Positively skewed (tail to the right)'), w('Symmetric'), w('Bimodal')], { family: 'shape' }],
]

const gaps: Record<string, Card['gap']> = {
  'union': { tex: '\\Pr(A \\cup B) = \\Pr(A) + \\Pr(B) \\gap \\Pr(A \\cap B)', answers: ['-'] },
  'lin-var': { tex: `${VAR('aX + b')} = a^{\\gap}\\,${VAR('X')}`, answers: ['2'] },
  'bin-pmf': { tex: '\\Pr(X = x) = \\dbinom{n}{x}p^x(1 - p)^{\\gap}', answers: ['n-x', 'n - x'] },
}

const typeable: Record<string, string> = { 'bin-mean': 'np', 'bern-mean': 'p' }

export const methodsDiscreteProbabilityDeck: Deck = {
  id: 'methods-discrete-probability',
  title: 'Probability & Binomial',
  blurb: 'The addition, conditional and independence rules, the mean and variance of a discrete random variable, and the binomial distribution.',
  groups: [RULES, DRV, BIN],
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
