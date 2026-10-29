import type { Card, Deck, Face } from '../data'

// Mathematical Methods 3–4, Functions, relations and graphs: the key features of the study
// design's function families (exponential, logarithmic, power, circular, polynomial) and the
// general solutions of the circular equations.

const t = (tex: string): Face => ({ tex })
const w = (text: string): Face => ({ text })
type F = string | Face
const face = (f: F): Face => (typeof f === 'string' ? t(f) : f)

/** [id, group, front, back, traps, extra] — strings are TeX, w('…') is words. */
type Row = [string, string, F, F, F[], Partial<Card>?]

const EXP = 'Exponential & Log'
const POW = 'Power Functions'
const CIRC = 'Circular Functions'
const GEN = 'General Solutions'
const POLY = 'Polynomials'

const R = 'R'
const RNZ = 'R \\setminus \\{0\\}'
const POS = '(0, \\infty)'
const NONNEG = '[0, \\infty)'

const rows: Row[] = [
  ['exp-range', EXP, '\\text{Range of } y = e^x', POS, [R, NONNEG, '(1, \\infty)'], { family: 'range' }],
  ['exp-asym', EXP, '\\text{Asymptote of } y = e^x', 'y = 0', ['x = 0', 'y = 1', '\\text{none}'], { family: 'asym' }],
  ['exp-yint', EXP, '\\text{y-intercept of } y = e^x', '(0, 1)', ['(1, 0)', '(0, e)', '(0, 0)']],
  ['exp-trans-asym', EXP, '\\text{Asymptote of } y = Ae^{nx} + c', 'y = c', ['y = A', 'y = 0', 'x = c'], { family: 'asym' }],
  ['log-domain', EXP, '\\text{Maximal domain of } y = \\log_e(x)', POS, [R, NONNEG, '(1, \\infty)'], { family: 'domain' }],
  ['log-range', EXP, '\\text{Range of } y = \\log_e(x)', R, [POS, NONNEG, RNZ], { family: 'range' }],
  ['log-asym', EXP, '\\text{Asymptote of } y = \\log_e(x)', 'x = 0', ['y = 0', 'x = 1', 'y = 1'], { family: 'asym' }],
  ['log-xint', EXP, '\\text{x-intercept of } y = \\log_e(x)', '(1, 0)', ['(0, 1)', '(e, 0)', '(0, 0)']],
  ['log-shift-domain', EXP, '\\text{Maximal domain of } y = \\log_e(x - h)', '(h, \\infty)', ['(-h, \\infty)', '[h, \\infty)', 'R \\setminus \\{h\\}'], { family: 'domain', tip: 'Solve x − h > 0.' }],
  ['log-shift-asym', EXP, '\\text{Asymptote of } y = A\\log_e(x - h) + k', 'x = h', ['x = -h', 'y = k', 'x = k'], { family: 'asym' }],

  ['recip-asym', POW, '\\text{Asymptotes of } y = \\dfrac{1}{x}', 'x = 0 \\text{ and } y = 0', ['x = 0 \\text{ only}', 'x = 1 \\text{ and } y = 1', 'y = x \\text{ and } y = -x'], { family: 'asym' }],
  ['recip-range', POW, '\\text{Range of } y = \\dfrac{1}{x}', RNZ, [R, POS, NONNEG], { family: 'range' }],
  ['trunc-range', POW, '\\text{Range of } y = \\dfrac{1}{x^2}', POS, [RNZ, R, NONNEG], { family: 'range' }],
  ['hyp-asym', POW, '\\text{Asymptotes of } y = \\dfrac{a}{x - h} + k', 'x = h \\text{ and } y = k', ['x = -h \\text{ and } y = k', 'x = k \\text{ and } y = h', 'x = h \\text{ and } y = a'], { family: 'asym' }],
  ['trunc-shift-range', POW, '\\text{Range of } y = \\dfrac{a}{(x - h)^2} + k,\\; a > 0', '(k, \\infty)', ['[k, \\infty)', '(h, \\infty)', 'R \\setminus \\{k\\}'], { family: 'range' }],
  ['sqrt-domain', POW, '\\text{Maximal domain of } y = \\sqrt{x}', NONNEG, [POS, R, RNZ], { family: 'domain' }],
  ['cbrt-domain', POW, '\\text{Maximal domain of } y = x^{\\frac{1}{3}}', R, [NONNEG, POS, RNZ], { family: 'domain', tip: 'Odd roots of negative numbers are fine: ∛(−8) = −2.' }],
  ['two-thirds-range', POW, '\\text{Range of } y = x^{\\frac{2}{3}}', NONNEG, [R, POS, RNZ], { family: 'range', tip: 'x^(2/3) = (∛x)², never negative.' }],
  ['neg-half-domain', POW, '\\text{Maximal domain of } y = x^{-\\frac{1}{2}}', POS, [NONNEG, RNZ, R], { family: 'domain', tip: '1/√x needs x > 0.' }],

  ['sin-period', CIRC, '\\text{Period of } y = \\sin(nx)', '\\dfrac{2\\pi}{n}', ['\\dfrac{\\pi}{n}', '2\\pi n', '\\dfrac{n}{2\\pi}'], { ask: 'n > 0; the same for cos(nx)', family: 'period' }],
  ['tan-period', CIRC, '\\text{Period of } y = \\tan(nx)', '\\dfrac{\\pi}{n}', ['\\dfrac{2\\pi}{n}', '\\pi n', '\\dfrac{\\pi}{2n}'], { ask: 'n > 0', family: 'period' }],
  ['amp', CIRC, '\\text{Amplitude of } y = A\\sin(nx) + c', '|A|', ['A + c', '2A', 'n']],
  ['cos-range', CIRC, '\\text{Range of } y = A\\cos(nx) + c,\\; A > 0', '[c - A,\\; c + A]', ['[-A,\\; A]', '(c - A,\\; c + A)', '[A - c,\\; A + c]'], { family: 'range' }],
  ['tan-range', CIRC, '\\text{Range of } y = \\tan(x)', R, ['[-1, 1]', POS, '(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2})'], { family: 'range' }],
  ['tan-asym', CIRC, '\\text{Asymptotes of } y = \\tan(x)', 'x = \\dfrac{(2k + 1)\\pi}{2},\\; k \\in Z', ['x = k\\pi,\\; k \\in Z', 'x = 2k\\pi,\\; k \\in Z', 'x = \\dfrac{k\\pi}{2},\\; k \\in Z'], { family: 'tan-asym', tip: 'Where cos(x) = 0.' }],
  ['tan-n-asym', CIRC, '\\text{Asymptotes of } y = \\tan(nx)', 'x = \\dfrac{(2k + 1)\\pi}{2n},\\; k \\in Z', ['x = \\dfrac{(2k + 1)n\\pi}{2},\\; k \\in Z', 'x = \\dfrac{k\\pi}{n},\\; k \\in Z', 'x = \\dfrac{(2k + 1)\\pi}{n},\\; k \\in Z'], { family: 'tan-asym' }],
  ['sin-zeros', CIRC, '\\text{x-intercepts of } y = \\sin(x)', 'x = k\\pi,\\; k \\in Z', ['x = \\dfrac{(2k + 1)\\pi}{2},\\; k \\in Z', 'x = 2k\\pi,\\; k \\in Z', 'x = \\dfrac{k\\pi}{2},\\; k \\in Z'], { family: 'zeros' }],
  ['cos-zeros', CIRC, '\\text{x-intercepts of } y = \\cos(x)', 'x = \\dfrac{(2k + 1)\\pi}{2},\\; k \\in Z', ['x = k\\pi,\\; k \\in Z', 'x = 2k\\pi,\\; k \\in Z', 'x = (2k + 1)\\pi,\\; k \\in Z'], { family: 'zeros' }],

  ['gen-sin', GEN, '\\sin(x) = a', 'x = \\sin^{-1}(a) + 2k\\pi \\;\\text{ or }\\; x = \\pi - \\sin^{-1}(a) + 2k\\pi', ['x = \\pm\\sin^{-1}(a) + 2k\\pi', 'x = \\sin^{-1}(a) + k\\pi', 'x = \\sin^{-1}(a) + 2k\\pi \\;\\text{ or }\\; x = \\pi + \\sin^{-1}(a) + 2k\\pi'], { ask: 'general solution, k ∈ Z', family: 'gen' }],
  ['gen-cos', GEN, '\\cos(x) = a', 'x = \\pm\\cos^{-1}(a) + 2k\\pi', ['x = \\cos^{-1}(a) + k\\pi', 'x = \\cos^{-1}(a) + 2k\\pi \\;\\text{ or }\\; x = \\pi - \\cos^{-1}(a) + 2k\\pi', 'x = \\pm\\cos^{-1}(a) + k\\pi'], { ask: 'general solution, k ∈ Z', family: 'gen' }],
  ['gen-tan', GEN, '\\tan(x) = a', 'x = \\tan^{-1}(a) + k\\pi', ['x = \\tan^{-1}(a) + 2k\\pi', 'x = \\pm\\tan^{-1}(a) + k\\pi', 'x = \\pm\\tan^{-1}(a) + 2k\\pi'], { ask: 'general solution, k ∈ Z', family: 'gen', tip: 'tan repeats every π, not 2π.' }],

  ['factor', POLY, w('(x − a) is a factor of P(x)'), 'P(a) = 0', ['P(-a) = 0', 'P(0) = a', 'P(a) = a'], { family: 'factor' }],
  ['factor-linear', POLY, w('(ax + b) is a factor of P(x)'), 'P\\left(-\\dfrac{b}{a}\\right) = 0', ['P\\left(\\dfrac{b}{a}\\right) = 0', 'P\\left(-\\dfrac{a}{b}\\right) = 0', 'P(-b) = 0'], { family: 'factor', tip: 'Use the value of x that makes ax + b zero.' }],
  ['remainder', POLY, w('Remainder when P(x) is divided by (x − a)'), 'P(a)', ['P(-a)', '0', 'P(0)'], { family: 'factor' }],
  ['roots', POLY, w('Most real solutions of a polynomial equation of degree n'), w('n'), [w('n − 1'), w('n + 1'), w('2n')]],
  ['single', POLY, w('A factor (x − a) appearing once'), w('The graph crosses the x-axis at x = a'), [w('The graph touches the x-axis at x = a (turning point)'), w('Stationary point of inflection on the x-axis at x = a'), w('Vertical asymptote at x = a')], { family: 'mult' }],
  ['double', POLY, w('A repeated factor (x − a)²'), w('The graph touches the x-axis at x = a (turning point)'), [w('The graph crosses the x-axis at x = a'), w('Stationary point of inflection on the x-axis at x = a'), w('Vertical asymptote at x = a')], { family: 'mult' }],
  ['triple', POLY, w('A repeated factor (x − a)³'), w('Stationary point of inflection on the x-axis at x = a'), [w('The graph touches the x-axis at x = a (turning point)'), w('The graph crosses the x-axis at x = a without flattening'), w('Local maximum at x = a')], { family: 'mult' }],
]

export const methodsFunctionFeaturesDeck: Deck = {
  id: 'methods-function-features',
  title: 'Function Features',
  blurb: 'Domains, ranges, asymptotes, periods and intercepts of the exponential, log, power, circular and polynomial families, and the general solutions of circular equations.',
  groups: [EXP, POW, CIRC, GEN, POLY],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: face(front),
    back: id === 'roots' ? { text: 'n', plain: 'n' } : face(back),
    traps: traps.map(face),
    // Many fronts share a back (several ranges are (0, ∞)): ask these one way.
    oneWay: true,
    ...extra,
  })),
  directionLabel: { fwd: 'Recall', rev: 'Recognise' },
  promptLabel: { fwd: 'State', rev: 'What is this?' },
  maxTraps: 3,
  source: 'VCE Mathematical Methods Study Design 2023–2027, Units 3 and 4, Functions, relations and graphs; Algebra, number and structure',
}
