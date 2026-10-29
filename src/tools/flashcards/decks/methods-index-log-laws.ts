import type { Card, Deck, Face } from '../data'

// Mathematical Methods 3–4 key knowledge: "exponent laws and logarithm laws", with the
// definition of a logarithm and the inverse identities used to solve exponential equations.

const t = (tex: string): Face => ({ tex })

/** [id, group, front, back, traps, extra] */
type Row = [string, string, string, string, string[], Partial<Card>?]

const INDEX = 'Index Laws'
const LOG = 'Log Laws'
const INV = 'Definition & Inverses'

const rows: Row[] = [
  ['mult', INDEX, 'a^m \\times a^n', 'a^{m+n}', ['a^{mn}', 'a^{m-n}', '(2a)^{m+n}']],
  ['div', INDEX, 'a^m \\div a^n', 'a^{m-n}', ['a^{m/n}', 'a^{m+n}', 'a^{n-m}']],
  ['power', INDEX, '(a^m)^n', 'a^{mn}', ['a^{m+n}', 'a^{m^n}', 'na^m']],
  ['prod-power', INDEX, '(ab)^n', 'a^n b^n', ['ab^n', 'a^n + b^n', '(ab)^{n-1}']],
  ['quot-power', INDEX, '\\left(\\dfrac{a}{b}\\right)^n', '\\dfrac{a^n}{b^n}', ['\\dfrac{a^n}{b}', '\\dfrac{a}{b^n}', 'a^n - b^n']],
  ['zero', INDEX, 'a^0', '1', ['0', 'a', '\\text{undefined}'], { ask: 'for a ≠ 0', oneWay: true }],
  ['neg', INDEX, 'a^{-n}', '\\dfrac{1}{a^n}', ['-a^n', 'a^{1/n}', '-\\dfrac{1}{a^n}']],
  ['root', INDEX, 'a^{\\frac{1}{n}}', '\\sqrt[n]{a}', ['\\dfrac{1}{a^n}', '\\dfrac{a}{n}', '\\sqrt{a^n}']],
  ['frac-power', INDEX, 'a^{\\frac{m}{n}}', '\\sqrt[n]{a^m}', ['\\sqrt[m]{a^n}', '\\dfrac{a^m}{a^n}', '\\dfrac{a^m}{n}'], { tip: 'The bottom of the power is the root; also (ⁿ√a)ᵐ.' }],

  ['log-1', LOG, '\\log_a(1)', '0', ['1', 'a', '\\text{undefined}'], { oneWay: true, tip: 'a⁰ = 1.' }],
  ['log-e', LOG, '\\log_e(e)', '1', ['0', 'e', '\\text{undefined}'], { oneWay: true, tip: 'e¹ = e. Likewise logₐ(a) = 1.' }],
  ['log-prod', LOG, '\\log_a(mn)', '\\log_a(m) + \\log_a(n)', ['\\log_a(m) \\times \\log_a(n)', '\\log_a(m) - \\log_a(n)', 'n\\log_a(m)']],
  ['log-quot', LOG, '\\log_a\\left(\\dfrac{m}{n}\\right)', '\\log_a(m) - \\log_a(n)', ['\\dfrac{\\log_a(m)}{\\log_a(n)}', '\\log_a(n) - \\log_a(m)', '\\log_a(m) + \\log_a(n)'], { tip: 'logₐ(m) ÷ logₐ(n) is not a log law: it is a change of base.' }],
  ['log-power', LOG, '\\log_a(m^p)', 'p\\log_a(m)', ['\\big(\\log_a(m)\\big)^p', '\\log_a(pm)', 'm\\log_a(p)']],
  ['log-recip', LOG, '\\log_a\\left(\\dfrac{1}{m}\\right)', '-\\log_a(m)', ['\\dfrac{1}{\\log_a(m)}', '\\log_a(-m)', '1 - \\log_a(m)']],
  ['change-base', LOG, '\\log_b(x)', '\\dfrac{\\log_a(x)}{\\log_a(b)}', ['\\dfrac{\\log_a(b)}{\\log_a(x)}', '\\log_a(x) - \\log_a(b)', '\\log_a(x)\\,\\log_a(b)'], { ask: 'change of base to base a' }],
  ['log-square', LOG, '\\log_e(x^2)', '2\\log_e|x|', ['2\\log_e(x)', '\\big(\\log_e(x)\\big)^2', '\\log_e(2x)'], { ask: 'for all x ≠ 0', tip: 'x² is defined for negative x, logₑ(x) is not.' }],

  ['def', INV, 'a^y = x', 'y = \\log_a(x)', ['x = \\log_a(y)', 'y = \\log_x(a)', 'a = \\log_y(x)'], { ask: 'as a logarithm (a > 0, a ≠ 1, x > 0)', tip: 'logₐ(x) is the power of a that gives x.' }],
  ['a-log', INV, 'a^{\\log_a(x)}', 'x', ['\\log_a(x)', 'a', 'x^a'], { ask: 'for x > 0', oneWay: true }],
  ['log-a', INV, '\\log_a(a^x)', 'x', ['a^x', '\\log_a(x)', '1'], { oneWay: true }],
  ['e-klog', INV, 'e^{k\\log_e(x)}', 'x^k', ['kx', 'e^{kx}', 'k\\log_e(x)'], { ask: 'for x > 0', tip: 'Move k inside first: e^(logₑ xᵏ) = xᵏ.', oneWay: true }],
  ['e-2log3', INV, 'e^{2\\log_e(3)}', '9', ['6', '3', 'e^6'], { oneWay: true, tip: 'e^(logₑ 9) = 9.' }],
  ['exp-inverse', INV, 'f(x) = e^x', 'f^{-1}(x) = \\log_e(x)', ['f^{-1}(x) = e^{-x}', 'f^{-1}(x) = \\dfrac{1}{e^x}', 'f^{-1}(x) = -\\log_e(x)'], { ask: 'state the inverse function', tip: 'So the graphs are reflections of each other in y = x.' }],
]

const gaps: Record<string, Card['gap']> = {
  'log-quot': { tex: '\\log_a\\left(\\dfrac{m}{n}\\right) = \\log_a(m) \\gap \\log_a(n)', answers: ['-'] },
  'log-prod': { tex: '\\log_a(mn) = \\log_a(m) \\gap \\log_a(n)', answers: ['+'] },
  'log-recip': { tex: '\\log_a\\left(\\dfrac{1}{m}\\right) = \\gap\\log_a(m)', answers: ['-'] },
  'neg': { tex: 'a^{-n} = \\dfrac{\\gap}{a^n}', answers: ['1'] },
}

// Short numeric answers can be typed.
const typeable: Record<string, string> = { zero: '1', 'log-1': '0', 'log-e': '1', 'e-2log3': '9' }

export const methodsIndexLogDeck: Deck = {
  id: 'methods-index-log-laws',
  title: 'Index & Log Laws',
  blurb: 'The exponent and logarithm laws, the definition of a logarithm and the inverse identities between eˣ and logₑ x.',
  groups: [INDEX, LOG, INV],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: t(front),
    back: typeable[id] ? { tex: back, plain: typeable[id] } : t(back),
    traps: traps.map(t),
    gap: gaps[id],
    ...extra,
  })),
  directionLabel: { fwd: 'Recall', rev: 'Recognise' },
  promptLabel: { fwd: 'Simplify', rev: 'Which expression is this?' },
  maxTraps: 3,
  source: 'VCE Mathematical Methods Study Design 2023–2027, Units 3 and 4, key knowledge: exponent and logarithm laws',
}
