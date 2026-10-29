import type { Card, Deck, Face } from '../data'

// Specialist Units 3 & 4, Calculus and Functions, relations and graphs: inverse circular
// functions and their derivatives, implicit differentiation and related rates, the second
// derivative, rational functions and partial-fraction forms, and the integral formulas for
// volume, arc length and surface area. (Antiderivatives themselves live in the integration deck.)

type F = string | Face
const f = (x: F): Face => (typeof x === 'string' ? { tex: x } : x)
const w = (text: string): Face => ({ text })

/** [id, group, front, back, traps, extra] — a string is TeX, w() is words. */
type Row = [string, string, F, F, F[], Partial<Card>?]

const DX = '\\dfrac{d}{dx}'
const DYDX = '\\dfrac{dy}{dx}'
const INT = (a: string, b: string) => `\\displaystyle\\int_{${a}}^{${b}}`
const SQ = (top: string, bot: string) => `\\left(\\dfrac{d${top}}{d${bot}}\\right)^2`

const INV = 'Inverse Circular'
const IMP = 'Implicit & Related Rates'
const SECOND = 'Second Derivative'
const RAT = 'Rational Functions'
const APP = 'Volume, Arc Length & Surface Area'

const rows: Row[] = [
  // Inverse circular functions
  ['d-asin', INV, `${DX}\\sin^{-1}(x)`, '\\dfrac{1}{\\sqrt{1 - x^2}}', ['-\\dfrac{1}{\\sqrt{1 - x^2}}', '\\dfrac{1}{1 + x^2}', '\\dfrac{1}{\\sqrt{1 + x^2}}'], { family: 'd-inv' }],
  ['d-acos', INV, `${DX}\\cos^{-1}(x)`, '-\\dfrac{1}{\\sqrt{1 - x^2}}', ['\\dfrac{1}{\\sqrt{1 - x^2}}', '-\\dfrac{1}{1 + x^2}', '-\\dfrac{1}{\\sqrt{x^2 - 1}}'], { family: 'd-inv' }],
  ['d-atan', INV, `${DX}\\tan^{-1}(x)`, '\\dfrac{1}{1 + x^2}', ['\\dfrac{1}{1 - x^2}', '\\dfrac{1}{\\sqrt{1 - x^2}}', '-\\dfrac{1}{1 + x^2}'], { family: 'd-inv' }],
  ['d-asin-a', INV, `${DX}\\sin^{-1}\\left(\\dfrac{x}{a}\\right)`, '\\dfrac{1}{\\sqrt{a^2 - x^2}}', ['\\dfrac{a}{\\sqrt{a^2 - x^2}}', '\\dfrac{1}{a\\sqrt{a^2 - x^2}}', '-\\dfrac{1}{\\sqrt{a^2 - x^2}}'], { ask: 'a > 0', family: 'd-inv-a' }],
  ['d-acos-a', INV, `${DX}\\cos^{-1}\\left(\\dfrac{x}{a}\\right)`, '-\\dfrac{1}{\\sqrt{a^2 - x^2}}', ['\\dfrac{1}{\\sqrt{a^2 - x^2}}', '-\\dfrac{a}{\\sqrt{a^2 - x^2}}', '-\\dfrac{1}{a^2 + x^2}'], { ask: 'a > 0', family: 'd-inv-a' }],
  ['d-atan-a', INV, `${DX}\\tan^{-1}\\left(\\dfrac{x}{a}\\right)`, '\\dfrac{a}{a^2 + x^2}', ['\\dfrac{1}{a^2 + x^2}', '\\dfrac{1}{a(a^2 + x^2)}', '\\dfrac{a}{a^2 - x^2}'], {
    ask: 'a > 0', family: 'd-inv-a', tip: 'Unlike sin⁻¹ and cos⁻¹, an a stays on top.',
    gap: { tex: `${DX}\\tan^{-1}\\left(\\dfrac{x}{a}\\right) = \\dfrac{\\gap}{a^2 + x^2}`, answers: ['a'] },
  }],
  ['ran-asin', INV, '\\sin^{-1}(x)', '\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]', ['[0, \\pi]', '\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)', '[-1, 1]'], { ask: 'range', family: 'range' }],
  ['ran-acos', INV, '\\cos^{-1}(x)', '[0, \\pi]', ['\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]', '[0, 2\\pi]', '[-1, 1]'], { ask: 'range', family: 'range' }],
  ['ran-atan', INV, '\\tan^{-1}(x)', '\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)', ['\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]', '(0, \\pi)', 'R'], { ask: 'range', family: 'range', tip: 'The endpoints are horizontal asymptotes, so they are excluded.' }],
  ['dom-asin-acos', INV, '\\sin^{-1}(x)\\ \\text{and}\\ \\cos^{-1}(x)', '[-1, 1]', ['R', '\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]', '(-1, 1)'], { ask: 'maximal domain', oneWay: true }],
  ['dom-atan', INV, '\\tan^{-1}(x)', 'R', ['[-1, 1]', '\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)', 'R\\setminus\\{0\\}'], { ask: 'maximal domain', oneWay: true }],

  // Implicit differentiation and related rates
  ['imp-y2', IMP, `${DX}\\left(y^2\\right)`, `2y${DYDX}`, ['2y', `2${DYDX}`, `y^2${DYDX}`], { family: 'imp', tip: 'Chain rule: differentiate with respect to y, then multiply by dy/dx.' }],
  ['imp-xy', IMP, `${DX}(xy)`, `y + x${DYDX}`, [`x${DYDX}`, DYDX, `x + y${DYDX}`], { family: 'imp', tip: 'Product rule.' }],
  ['imp-sin', IMP, `${DX}\\sin(y)`, `\\cos(y)${DYDX}`, ['\\cos(y)', `-\\cos(y)${DYDX}`, `\\sin(y)${DYDX}`], { family: 'imp' }],
  ['related', IMP, '\\dfrac{dA}{dt}', '\\dfrac{dA}{dr}\\cdot\\dfrac{dr}{dt}', ['\\dfrac{dA}{dt}\\cdot\\dfrac{dt}{dr}', '\\dfrac{dr}{dA}\\cdot\\dfrac{dr}{dt}', '\\dfrac{dA}{dr}\\div\\dfrac{dr}{dt}'], { ask: 'by the chain rule, with A a function of r' }],
  ['param-dydx', IMP, DYDX, '\\dfrac{dy/dt}{dx/dt}', ['\\dfrac{dx/dt}{dy/dt}', '\\dfrac{dy}{dt}\\cdot\\dfrac{dx}{dt}', '\\dfrac{dy}{dt} - \\dfrac{dx}{dt}'], { ask: 'x and y both given in terms of t' }],
  ['tan-horiz', IMP, w('An implicit curve has a horizontal tangent where'), w('The numerator of dy/dx is 0 (denominator non-zero)'), [w('The denominator of dy/dx is 0'), w('d²y/dx² = 0'), w('dy/dx = 1')], { family: 'tangent' }],
  ['tan-vert', IMP, w('An implicit curve has a vertical tangent where'), w('The denominator of dy/dx is 0 (numerator non-zero)'), [w('The numerator of dy/dx is 0'), w('d²y/dx² = 0'), w('dy/dx = 1')], { family: 'tangent' }],

  // Second derivative
  ['concave-up', SECOND, "f''(x) > 0", w('Concave up'), [w('Concave down'), w('Increasing'), w('A point of inflection')], { family: 'concave', back: { text: 'Concave up', plain: 'concave up' } }],
  ['concave-down', SECOND, "f''(x) < 0", w('Concave down'), [w('Concave up'), w('Decreasing'), w('A point of inflection')], { family: 'concave', back: { text: 'Concave down', plain: 'concave down' } }],
  ['poi', SECOND, w('A point of inflection'), w('A point where the concavity changes (f″ changes sign)'), [w('Any point where f″(x) = 0'), w('A point where f′(x) = 0'), w('A point where f′ changes sign')], { tip: "f″(x) = 0 alone isn't enough: y = x⁴ at x = 0." }],
  ['spoi', SECOND, w('A stationary point of inflection'), w('f′(x) = 0 there, and f″ changes sign there'), [w('f′(x) = 0 and f″(x) = 0, nothing more needed'), w('f′ changes sign and f″(x) = 0'), w('f″(x) = 0 and f′(x) ≠ 0')]],
  ['max-test', SECOND, "f'(a) = 0,\\ f''(a) < 0", w('A local maximum at x = a'), [w('A local minimum at x = a'), w('A point of inflection at x = a'), w('A stationary point of inflection at x = a')], { family: 'nature' }],
  ['min-test', SECOND, "f'(a) = 0,\\ f''(a) > 0", w('A local minimum at x = a'), [w('A local maximum at x = a'), w('A point of inflection at x = a'), w('A stationary point of inflection at x = a')], { family: 'nature' }],

  // Rational functions
  ['pf-linear', RAT, '\\dfrac{px + q}{(x - a)(x - b)}', '\\dfrac{A}{x - a} + \\dfrac{B}{x - b}', ['\\dfrac{A}{(x - a)(x - b)}', '\\dfrac{A}{x - a}\\cdot\\dfrac{B}{x - b}', '\\dfrac{A}{x - a} - \\dfrac{A}{x - b}'], { ask: 'partial fraction form, a ≠ b', family: 'pf' }],
  ['pf-repeated', RAT, '\\dfrac{px^2 + qx + r}{(x - a)^2(x - b)}', '\\dfrac{A}{x - a} + \\dfrac{B}{(x - a)^2} + \\dfrac{C}{x - b}', ['\\dfrac{A}{(x - a)^2} + \\dfrac{B}{x - b}', '\\dfrac{A}{x - a} + \\dfrac{B}{x - a} + \\dfrac{C}{x - b}', '\\dfrac{A}{(x - a)^2} + \\dfrac{B}{(x - b)^2}'], { ask: 'partial fraction form, a ≠ b', family: 'pf', tip: 'A repeated factor needs one term for each power.' }],
  ['pf-quad', RAT, '\\dfrac{px^2 + qx + r}{(x - a)(x^2 + b)}', '\\dfrac{A}{x - a} + \\dfrac{Bx + C}{x^2 + b}', ['\\dfrac{A}{x - a} + \\dfrac{B}{x^2 + b}', '\\dfrac{A}{x - a} + \\dfrac{B}{x + \\sqrt{b}} + \\dfrac{C}{x - \\sqrt{b}}', '\\dfrac{Ax + B}{x - a} + \\dfrac{C}{x^2 + b}'], { ask: 'partial fraction form, b > 0', family: 'pf', tip: 'An irreducible quadratic takes a linear numerator.' }],
  ['vert-asym', RAT, w('Vertical asymptotes of a rational function'), w('Where the denominator is 0, after cancelling common factors'), [w('Where the numerator is 0'), w('Where the derivative is 0'), w('Where the denominator is 0, even if the factor cancels')], { tip: 'A factor that cancels leaves a hole, not an asymptote.' }],
  ['asym-equal', RAT, w('Numerator and denominator of equal degree'), w('Horizontal asymptote at y = the ratio of the leading coefficients'), [w('Horizontal asymptote at y = 0'), w('An oblique asymptote'), w('Horizontal asymptote at y = 1')], { family: 'asym' }],
  ['asym-less', RAT, w('Numerator of lower degree than the denominator'), w('Horizontal asymptote at y = 0'), [w('Horizontal asymptote at y = the ratio of the leading coefficients'), w('An oblique asymptote'), w('No horizontal asymptote')], { family: 'asym' }],
  ['asym-more', RAT, w('Numerator one degree higher than the denominator'), w('An oblique asymptote, found by division'), [w('Horizontal asymptote at y = 0'), w('Horizontal asymptote at y = the ratio of the leading coefficients'), w('No non-vertical asymptote')], { family: 'asym' }],
  ['asym-eg', RAT, 'y = x + \\dfrac{1}{x}', 'y = x', ['y = 0', 'y = 1', 'x = 1'], { ask: 'the non-vertical asymptote', back: { tex: 'y = x', plain: 'y=x' } }],
  ['recip-zero', RAT, w('Zeros of f(x), on the graph of y = 1/f(x)'), w('Vertical asymptotes'), [w('Zeros'), w('Turning points'), w('Points of inflection')], { family: 'recip', back: { text: 'Vertical asymptotes', plain: 'vertical asymptotes' } }],
  ['recip-max', RAT, w('A local maximum of f(x) (f ≠ 0 there), on the graph of y = 1/f(x)'), w('A local minimum'), [w('A local maximum'), w('A vertical asymptote'), w('A point of inflection')], { family: 'recip', back: { text: 'A local minimum', plain: 'local minimum' } }],

  // Integral formulas
  ['vol-x', APP, w('Volume of revolution about the x-axis'), `V = \\pi${INT('a', 'b')} y^2\\,dx`, [`V = \\pi${INT('a', 'b')} y\\,dx`, `V = 2\\pi${INT('a', 'b')} y^2\\,dx`, `V = \\pi${INT('a', 'b')} x^2\\,dy`], { family: 'vol' }],
  ['vol-y', APP, w('Volume of revolution about the y-axis'), `V = \\pi${INT('c', 'd')} x^2\\,dy`, [`V = \\pi${INT('c', 'd')} x^2\\,dx`, `V = \\pi${INT('c', 'd')} y^2\\,dx`, `V = 2\\pi${INT('c', 'd')} x^2\\,dy`], { family: 'vol', tip: 'Write x² in terms of y; the terminals are y-values.' }],
  ['vol-washer', APP, w('Volume when the region between y = f(x) (outer) and y = g(x) (inner) turns about the x-axis'), `V = \\pi${INT('a', 'b')} \\left([f(x)]^2 - [g(x)]^2\\right)dx`, [`V = \\pi${INT('a', 'b')} \\left(f(x) - g(x)\\right)^2 dx`, `V = \\pi${INT('a', 'b')} \\left([g(x)]^2 - [f(x)]^2\\right)dx`, `V = 2\\pi${INT('a', 'b')} \\left([f(x)]^2 - [g(x)]^2\\right)dx`], { family: 'vol', tip: 'Outer disc minus inner disc: not (f − g)².' }],
  ['arc-param', APP, w('Arc length of a curve given parametrically, t₁ ≤ t ≤ t₂'), `s = ${INT('t_1', 't_2')} \\sqrt{${SQ('x', 't')} + ${SQ('y', 't')}}\\,dt`, [`s = ${INT('t_1', 't_2')} \\left(${SQ('x', 't')} + ${SQ('y', 't')}\\right)dt`, `s = ${INT('t_1', 't_2')} \\left(\\dfrac{dx}{dt} + \\dfrac{dy}{dt}\\right)dt`, `s = ${INT('t_1', 't_2')} \\sqrt{1 + ${SQ('y', 't')}}\\,dt`], { family: 'arc' }],
  ['arc-cart', APP, w('Arc length of y = f(x), a ≤ x ≤ b'), `s = ${INT('a', 'b')} \\sqrt{1 + ${SQ('y', 'x')}}\\,dx`, [`s = ${INT('a', 'b')} \\left(1 + ${SQ('y', 'x')}\\right)dx`, `s = ${INT('a', 'b')} \\sqrt{1 + \\dfrac{dy}{dx}}\\,dx`, `s = ${INT('a', 'b')} \\sqrt{x^2 + y^2}\\,dx`], { family: 'arc' }],
  ['surf-x', APP, w('Surface area of revolution of y = f(x) about the x-axis'), `S = 2\\pi${INT('a', 'b')} y\\sqrt{1 + ${SQ('y', 'x')}}\\,dx`, [`S = \\pi${INT('a', 'b')} y^2\\sqrt{1 + ${SQ('y', 'x')}}\\,dx`, `S = 2\\pi${INT('a', 'b')} y\\,dx`, `S = 2\\pi${INT('a', 'b')} \\sqrt{1 + ${SQ('y', 'x')}}\\,dx`], { family: 'surf', tip: 'Circumference 2πy times a small arc length.' }],
  ['surf-y', APP, w('Surface area of revolution of x = g(y) about the y-axis'), `S = 2\\pi${INT('c', 'd')} x\\sqrt{1 + ${SQ('x', 'y')}}\\,dy`, [`S = 2\\pi${INT('c', 'd')} y\\sqrt{1 + ${SQ('x', 'y')}}\\,dy`, `S = \\pi${INT('c', 'd')} x^2\\sqrt{1 + ${SQ('x', 'y')}}\\,dy`, `S = 2\\pi${INT('c', 'd')} x\\,dy`], { family: 'surf' }],
]

export const specialistCalculusDeck: Deck = {
  id: 'specialist-calculus',
  title: 'Calculus & Graphs',
  blurb: 'Inverse circular functions and their derivatives, implicit differentiation, concavity, rational functions and partial-fraction forms, and the volume, arc length and surface area formulas.',
  groups: [INV, IMP, SECOND, RAT, APP],
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
  source: 'VCE Specialist Mathematics Study Design 2023–2027, Units 3 & 4: Differential and integral calculus; Functions, relations and graphs',
}
