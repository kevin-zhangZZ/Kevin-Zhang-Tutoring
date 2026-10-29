import type { Card, Deck, Face } from '../data'

// Mathematical Methods 3–4, Calculus and Algebra: what derivatives tell you (tangents, rates,
// stationary points, the graph of f′, continuity and smooth joins) and the numerical methods
// examined in pseudocode (Newton's method, bisection, the trapezium and rectangle rules).

const t = (tex: string): Face => ({ tex })
const w = (text: string): Face => ({ text })
type F = string | Face
const face = (f: F): Face => (typeof f === 'string' ? t(f) : f)

/** [id, group, front, back, traps, extra] — strings are TeX, w('…') is words. */
type Row = [string, string, F, F, F[], Partial<Card>?]

const TAN = 'Tangents & Rates'
const STAT = 'Stationary Points'
const DERIV = 'Graph of f′'
const CONT = 'Continuity'
const NUM = 'Numerical Methods'

const rows: Row[] = [
  ['tangent', TAN, w('Tangent to y = f(x) at x = a'), "y = f'(a)(x - a) + f(a)", ["y = f(a)(x - a) + f'(a)", "y = f'(a)(x + a) + f(a)", "y = f'(x)(x - a) + f(a)"], { family: 'line' }],
  ['normal-grad', TAN, w('Gradient of the normal to y = f(x) at x = a'), "-\\dfrac{1}{f'(a)}", ["\\dfrac{1}{f'(a)}", "-f'(a)", '-\\dfrac{1}{f(a)}'], { tip: 'The normal is perpendicular to the tangent.' }],
  ['normal', TAN, w('Normal to y = f(x) at x = a'), "y = -\\dfrac{1}{f'(a)}(x - a) + f(a)", ["y = \\dfrac{1}{f'(a)}(x - a) + f(a)", "y = -f'(a)(x - a) + f(a)", "y = -\\dfrac{1}{f'(a)}(x + a) + f(a)"], { family: 'line' }],
  ['perp', TAN, w('Perpendicular lines with gradients m₁ and m₂'), 'm_1 m_2 = -1', ['m_1 = m_2', 'm_1 m_2 = 1', 'm_1 + m_2 = 0']],
  ['avg-rate', TAN, w('Average rate of change of f over [a, b]'), '\\dfrac{f(b) - f(a)}{b - a}', ['\\dfrac{b - a}{f(b) - f(a)}', "f'(b) - f'(a)", "\\dfrac{f'(a) + f'(b)}{2}"], { tip: 'The gradient of the chord, not an average of f′ values.' }],
  ['inst-rate', TAN, w('Instantaneous rate of change of f at x = a'), "f'(a)", ['f(a)', '\\dfrac{f(a)}{a}', "f''(a)"]],

  ['stat', STAT, w('Condition for a stationary point at x = a'), "f'(a) = 0", ['f(a) = 0', "f''(a) = 0", "f'(a) \\neq 0"]],
  ['max', STAT, "f'(a) = 0,\\;\\; f''(a) < 0", w('Local maximum at x = a'), [w('Local minimum at x = a'), w('Point of inflection at x = a'), w('Stationary point of inflection at x = a')], { family: 'nature' }],
  ['min', STAT, "f'(a) = 0,\\;\\; f''(a) > 0", w('Local minimum at x = a'), [w('Local maximum at x = a'), w('Point of inflection at x = a'), w('Stationary point of inflection at x = a')], { family: 'nature' }],
  ['inconclusive', STAT, "f'(a) = 0,\\;\\; f''(a) = 0", w('No conclusion yet: check the sign of f′ either side of a'), [w('Stationary point of inflection at x = a'), w('Local maximum at x = a'), w('Local minimum at x = a')], { tip: 'f(x) = x⁴ has f′(0) = f″(0) = 0, and x = 0 is a minimum.', family: 'nature' }],
  ['poi', STAT, w('Condition for a point of inflection at x = a'), "f''(a) = 0 \\text{ and } f'' \\text{ changes sign at } a", ["f'(a) = 0 \\text{ and } f' \\text{ changes sign at } a", "f''(a) = 0 \\text{ only}", "f'(a) = 0 \\text{ and } f''(a) = 0"], { family: 'poi' }],
  ['spoi', STAT, w('Condition for a stationary point of inflection at x = a'), "f'(a) = 0 \\text{ and } f' \\text{ does not change sign at } a", ["f'(a) = 0 \\text{ and } f' \\text{ changes sign at } a", "f''(a) = 0 \\text{ and } f'' \\text{ does not change sign at } a", "f'(a) = 0 \\text{ and } f''(a) < 0"], { family: 'poi' }],
  ['strict-inc', STAT, w('f is strictly increasing on an interval'), 'x_2 > x_1 \\Rightarrow f(x_2) > f(x_1)', ['x_2 > x_1 \\Rightarrow f(x_2) \\ge f(x_1)', 'x_2 > x_1 \\Rightarrow f(x_2) < f(x_1)', "f'(x) \\ge 0 \\text{ on the interval}"], { tip: 'f′(x) > 0 is enough but not needed: x³ is strictly increasing on R although f′(0) = 0.' }],
  ['abs-max', STAT, w('Absolute maximum of f over [a, b]'), w('The largest of the values of f at the stationary points and at the endpoints a and b'), [w('The largest local maximum value, ignoring the endpoints'), w('The value of f at x = b'), w('The value of f where f″(x) = 0')]],

  ['fd-min', DERIV, w('Graph of f′ crosses the x-axis from below to above'), w('Local minimum of f'), [w('Local maximum of f'), w('Stationary point of inflection of f'), w('Point of inflection of f')], { family: 'fprime', tip: 'f′ goes − to +: f falls then rises.' }],
  ['fd-max', DERIV, w('Graph of f′ crosses the x-axis from above to below'), w('Local maximum of f'), [w('Local minimum of f'), w('Stationary point of inflection of f'), w('Point of inflection of f')], { family: 'fprime' }],
  ['fd-touch', DERIV, w('Graph of f′ touches the x-axis without crossing'), w('Stationary point of inflection of f'), [w('Local maximum of f'), w('Local minimum of f'), w('x-intercept of f')], { family: 'fprime' }],
  ['fd-turn', DERIV, w('Turning point of the graph of f′'), w('Point of inflection of f'), [w('Turning point of f'), w('Stationary point of inflection of f'), w('x-intercept of f')], { family: 'fprime' }],
  ['fd-above', DERIV, w('Graph of f′ above the x-axis on an interval'), w('f is strictly increasing there'), [w('f is positive there'), w('f is strictly decreasing there'), w('f is above the x-axis there')], { family: 'fprime' }],
  ['fd-degree', DERIV, w('f is a polynomial of degree n'), w('f′ is a polynomial of degree n − 1'), [w('f′ is a polynomial of degree n + 1'), w('f′ is a polynomial of degree n'), w('f′ is a polynomial of degree n − 2')]],

  ['continuous', CONT, w('f is continuous at x = a'), '\\lim_{x \\to a} f(x) = f(a)', ['f(a) \\text{ is defined}', '\\lim_{x \\to a} f(x) \\text{ exists}', "f'(a) = 0"], { tip: 'The limit must exist, f(a) must be defined, and they must be equal.' }],
  ['differentiable', CONT, w('f is differentiable at x = a'), w('f is continuous at a, and the gradients from the left and right are equal'), [w('f is continuous at a'), w('f(a) is defined and the graph has no gap'), w('The left and right limits of f are equal')], { tip: 'Not differentiable at a sharp corner, a jump, or an endpoint of the domain.' }],
  ['smooth', CONT, w('A hybrid function joins smoothly at x = a'), w('The pieces have equal values and equal gradients at x = a'), [w('The pieces have equal values at x = a'), w('The pieces have equal gradients at x = a'), w('Both pieces have a stationary point at x = a')]],

  ['newton', NUM, w('Newton’s method: the next estimate'), "x_{n+1} = x_n - \\dfrac{f(x_n)}{f'(x_n)}", ["x_{n+1} = x_n + \\dfrac{f(x_n)}{f'(x_n)}", "x_{n+1} = x_n - \\dfrac{f'(x_n)}{f(x_n)}", "x_{n+1} = x_n - f(x_n)\\,f'(x_n)"]],
  ['newton-tangent', NUM, w('Geometrically, each Newton’s method estimate is'), w('The x-intercept of the tangent at the previous estimate'), [w('The x-intercept of the normal at the previous estimate'), w('The midpoint of the current interval'), w('The x-intercept of the chord between the endpoints')]],
  ['newton-fail', NUM, w('Newton’s method fails when'), "f'(x_n) = 0", ['f(x_n) = 0', "f''(x_n) = 0", 'x_n = 0'], { tip: 'A horizontal tangent never meets the x-axis.' }],
  ['bisect-mid', NUM, w('Bisection method on [a, b]: the point tested next'), '\\dfrac{a + b}{2}', ['\\dfrac{b - a}{2}', '\\dfrac{f(a) + f(b)}{2}', 'a + b']],
  ['bisect-side', NUM, w('Bisection method: the root is in [a, m] when'), 'f(a)\\,f(m) < 0', ['f(a)\\,f(m) > 0', 'f(m)\\,f(b) < 0', 'f(a) + f(m) < 0'], { tip: 'A change of sign between a and m.' }],
  ['bisect-width', NUM, w('Bisection method: width of the interval after k steps from [a, b]'), '\\dfrac{b - a}{2^k}', ['\\dfrac{b - a}{2k}', '\\dfrac{b - a}{k}', '\\dfrac{b - a}{2^{k-1}}']],
  ['trap-h', NUM, w('Width of each strip: n strips across [a, b]'), 'h = \\dfrac{b - a}{n}', ['h = \\dfrac{b - a}{n - 1}', 'h = \\dfrac{b - a}{2n}', 'h = \\dfrac{n}{b - a}']],
  ['trap', NUM, w('Trapezium rule with n strips of width h'), '\\dfrac{h}{2}\\big[f(x_0) + 2f(x_1) + \\cdots + 2f(x_{n-1}) + f(x_n)\\big]', ['h\\big[f(x_0) + 2f(x_1) + \\cdots + 2f(x_{n-1}) + f(x_n)\\big]', '\\dfrac{h}{2}\\big[f(x_0) + f(x_1) + \\cdots + f(x_{n-1}) + f(x_n)\\big]', '\\dfrac{h}{2}\\big[2f(x_0) + f(x_1) + \\cdots + f(x_{n-1}) + 2f(x_n)\\big]'], { tip: 'Ends once, middles twice.', family: 'sum' }],
  ['left-rect', NUM, w('Left-endpoint rectangle sum with n strips of width h'), 'h\\big[f(x_0) + f(x_1) + \\cdots + f(x_{n-1})\\big]', ['h\\big[f(x_1) + f(x_2) + \\cdots + f(x_n)\\big]', '\\dfrac{h}{2}\\big[f(x_0) + f(x_1) + \\cdots + f(x_{n-1})\\big]', 'h\\big[f(x_0) + f(x_1) + \\cdots + f(x_n)\\big]'], { family: 'sum' }],
  ['right-rect', NUM, w('Right-endpoint rectangle sum with n strips of width h'), 'h\\big[f(x_1) + f(x_2) + \\cdots + f(x_n)\\big]', ['h\\big[f(x_0) + f(x_1) + \\cdots + f(x_{n-1})\\big]', '\\dfrac{h}{2}\\big[f(x_1) + f(x_2) + \\cdots + f(x_n)\\big]', 'h\\big[f(x_0) + f(x_1) + \\cdots + f(x_n)\\big]'], { family: 'sum' }],
]

const gaps: Record<string, Card['gap']> = {
  'tangent': { tex: "y = f'(a)(x \\gap a) + f(a)", answers: ['-'] },
  'perp': { tex: 'm_1 m_2 = \\gap', answers: ['-1'] },
  'newton': { tex: "x_{n+1} = x_n \\gap \\dfrac{f(x_n)}{f'(x_n)}", answers: ['-'] },
  'trap': { tex: '\\dfrac{h}{\\gap}\\big[f(x_0) + 2f(x_1) + \\cdots + 2f(x_{n-1}) + f(x_n)\\big]', answers: ['2'] },
  'bisect-width': { tex: '\\text{width} = \\dfrac{b - a}{\\gap^k}', answers: ['2'] },
}

export const methodsCalculusFactsDeck: Deck = {
  id: 'methods-calculus-facts',
  title: 'Applying Derivatives',
  blurb: 'Tangents and normals, rates of change, stationary points and inflection, reading the graph of f′, smooth joins, and the numerical methods from Exam 2 pseudocode.',
  groups: [TAN, STAT, DERIV, CONT, NUM],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: face(front),
    back: face(back),
    traps: traps.map(face),
    gap: gaps[id],
    ...extra,
  })),
  directionLabel: { fwd: 'Recall', rev: 'Recognise' },
  promptLabel: { fwd: 'Recall', rev: 'What does this describe?' },
  maxTraps: 3,
  source: 'VCE Mathematical Methods Study Design 2023–2027, Units 3 and 4, Calculus and Algebra, number and structure',
}
