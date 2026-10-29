import type { Card, Deck, Face } from '../data'

// Mathematical Methods 3–4, Calculus: the derivatives of the study design's functions
// (xⁿ, eˣ, logₑ x, sin, cos, tan), with a linear inside, and the product, quotient and chain rules.
// Function cards are asked one way only: going backwards would be antidifferentiation.

const t = (tex: string): Face => ({ tex })

/** [id, group, front, back, traps, extra] */
type Row = [string, string, string, string, string[], Partial<Card>?]

const BASIC = 'Basic Functions'
const LINEAR = 'Linear Inside'
const COMPOSITE = 'Function Inside'
const RULES = 'Rules'

const rows: Row[] = [
  ['xn', BASIC, 'x^n', 'nx^{n-1}', ['nx^{n+1}', 'x^{n-1}', '(n-1)x^n'], { tip: 'Bring the power down, then take one off it.' }],
  ['sqrt', BASIC, '\\sqrt{x}', '\\dfrac{1}{2\\sqrt{x}}', ['\\dfrac{1}{\\sqrt{x}}', '\\dfrac{\\sqrt{x}}{2}', '\\dfrac{2}{\\sqrt{x}}'], { tip: 'Write √x as x^(1/2) first.' }],
  ['recip', BASIC, '\\dfrac{1}{x}', '-\\dfrac{1}{x^2}', ['\\dfrac{1}{x^2}', '\\log_e x', '-\\dfrac{1}{x}'], { tip: 'Write 1/x as x^(−1) first.' }],
  ['exp', BASIC, 'e^x', 'e^x', ['xe^{x-1}', 'e^{x-1}', '\\log_e x'], { family: 'exp' }],
  ['log', BASIC, '\\log_e x', '\\dfrac{1}{x}', ['-\\dfrac{1}{x^2}', '\\dfrac{\\log_e x}{x}', '-\\dfrac{1}{x}'], { ask: 'for x > 0', family: 'log' }],
  ['sin', BASIC, '\\sin(x)', '\\cos(x)', ['-\\cos(x)', '-\\sin(x)', '\\sec(x)'], { family: 'sin' }],
  ['cos', BASIC, '\\cos(x)', '-\\sin(x)', ['\\sin(x)', '-\\cos(x)', '\\cos(x)'], { family: 'cos' }],
  ['tan', BASIC, '\\tan(x)', '\\dfrac{1}{\\cos^2(x)}', ['-\\dfrac{1}{\\cos^2(x)}', '\\dfrac{1}{\\sin^2(x)}', '\\dfrac{1}{\\cos(x)}'], { tip: 'Also written sec²(x).', family: 'tan' }],

  ['lin-power', LINEAR, '(ax + b)^n', 'an(ax + b)^{n-1}', ['n(ax + b)^{n-1}', 'an(ax + b)^{n+1}', '\\dfrac{n}{a}(ax + b)^{n-1}'], { tip: 'Chain rule: the derivative of the inside, a, comes out the front.' }],
  ['lin-exp', LINEAR, 'e^{ax}', 'ae^{ax}', ['\\dfrac{1}{a}e^{ax}', 'axe^{ax-1}', 'e^{ax}'], { family: 'exp' }],
  ['lin-exp-b', LINEAR, 'e^{ax + b}', 'ae^{ax + b}', ['e^{ax + b}', '\\dfrac{1}{a}e^{ax + b}', '(ax + b)e^{ax + b - 1}'], { family: 'exp' }],
  ['lin-log', LINEAR, '\\log_e(ax + b)', '\\dfrac{a}{ax + b}', ['\\dfrac{1}{ax + b}', '\\dfrac{1}{a(ax + b)}', '\\dfrac{a}{x}'], { family: 'log' }],
  ['lin-log-ax', LINEAR, '\\log_e(ax)', '\\dfrac{1}{x}', ['\\dfrac{a}{x}', '\\dfrac{1}{ax}', '\\dfrac{1}{a}'], { ask: 'for a > 0, x > 0', tip: 'logₑ(ax) = logₑ a + logₑ x, and logₑ a is a constant.', family: 'log' }],
  ['lin-sin', LINEAR, '\\sin(ax + b)', 'a\\cos(ax + b)', ['-a\\cos(ax + b)', '\\cos(ax + b)', '\\dfrac{1}{a}\\cos(ax + b)'], { family: 'sin' }],
  ['lin-cos', LINEAR, '\\cos(ax + b)', '-a\\sin(ax + b)', ['a\\sin(ax + b)', '-\\sin(ax + b)', '-\\dfrac{1}{a}\\sin(ax + b)'], { family: 'cos' }],
  ['lin-tan', LINEAR, '\\tan(ax + b)', '\\dfrac{a}{\\cos^2(ax + b)}', ['\\dfrac{1}{\\cos^2(ax + b)}', '-\\dfrac{a}{\\cos^2(ax + b)}', '\\dfrac{1}{a\\cos^2(ax + b)}'], { family: 'tan' }],

  ['f-exp', COMPOSITE, 'e^{f(x)}', "f'(x)\\,e^{f(x)}", ["e^{f'(x)}", 'f(x)\\,e^{f(x) - 1}', 'e^{f(x)}'], { family: 'exp' }],
  ['f-log', COMPOSITE, '\\log_e\\big(f(x)\\big)', "\\dfrac{f'(x)}{f(x)}", ['\\dfrac{1}{f(x)}', "\\dfrac{f(x)}{f'(x)}", "\\dfrac{1}{f'(x)}"], { ask: 'where f(x) > 0', family: 'log' }],
  ['f-power', COMPOSITE, '\\big[f(x)\\big]^n', "n\\big[f(x)\\big]^{n-1} f'(x)", ['n\\big[f(x)\\big]^{n-1}', "n\\big[f'(x)\\big]^{n-1}", "n\\big[f(x)\\big]^{n+1} f'(x)"] ],
  ['f-sin', COMPOSITE, '\\sin\\big(f(x)\\big)', "f'(x)\\cos\\big(f(x)\\big)", ["\\cos\\big(f'(x)\\big)", "-f'(x)\\cos\\big(f(x)\\big)", "f'(x)\\sin\\big(f(x)\\big)"], { family: 'sin' }],
  ['f-cos', COMPOSITE, '\\cos\\big(f(x)\\big)', "-f'(x)\\sin\\big(f(x)\\big)", ["f'(x)\\sin\\big(f(x)\\big)", "-\\sin\\big(f'(x)\\big)", '-\\sin\\big(f(x)\\big)'], { family: 'cos' }],

  ['product', RULES, 'y = uv', '\\dfrac{dy}{dx} = u\\dfrac{dv}{dx} + v\\dfrac{du}{dx}', ['\\dfrac{dy}{dx} = \\dfrac{du}{dx}\\cdot\\dfrac{dv}{dx}', '\\dfrac{dy}{dx} = u\\dfrac{dv}{dx} - v\\dfrac{du}{dx}', '\\dfrac{dy}{dx} = \\dfrac{du}{dx} + \\dfrac{dv}{dx}'], { ask: 'product rule; u and v are functions of x', oneWay: false }],
  ['quotient', RULES, 'y = \\dfrac{u}{v}', '\\dfrac{dy}{dx} = \\dfrac{v\\frac{du}{dx} - u\\frac{dv}{dx}}{v^2}', ['\\dfrac{dy}{dx} = \\dfrac{u\\frac{dv}{dx} - v\\frac{du}{dx}}{v^2}', '\\dfrac{dy}{dx} = \\dfrac{v\\frac{du}{dx} + u\\frac{dv}{dx}}{v^2}', '\\dfrac{dy}{dx} = \\dfrac{\\frac{du}{dx}}{\\frac{dv}{dx}}'], { ask: 'quotient rule; u and v are functions of x', tip: 'The numerator starts with v (the bottom), and the minus sign follows.', oneWay: false }],
  ['chain', RULES, 'y = f(u), \\; u = g(x)', '\\dfrac{dy}{dx} = \\dfrac{dy}{du}\\times\\dfrac{du}{dx}', ['\\dfrac{dy}{dx} = \\dfrac{dy}{du}\\div\\dfrac{du}{dx}', '\\dfrac{dy}{dx} = \\dfrac{du}{dy}\\times\\dfrac{du}{dx}', '\\dfrac{dy}{dx} = \\dfrac{dy}{du} + \\dfrac{du}{dx}'], { ask: 'chain rule', oneWay: false }],
  ['chain-f', RULES, 'y = f\\big(g(x)\\big)', "\\dfrac{dy}{dx} = f'\\big(g(x)\\big)\\,g'(x)", ["\\dfrac{dy}{dx} = f'(x)\\,g'(x)", "\\dfrac{dy}{dx} = f'\\big(g'(x)\\big)", "\\dfrac{dy}{dx} = f\\big(g'(x)\\big)\\,g'(x)"], { ask: 'chain rule', tip: 'Derivative of the outside (inside left alone), times the derivative of the inside.', oneWay: false }],
  ['product-f', RULES, 'y = f(x)\\,g(x)', "\\dfrac{dy}{dx} = f'(x)\\,g(x) + f(x)\\,g'(x)", ["\\dfrac{dy}{dx} = f'(x)\\,g'(x)", "\\dfrac{dy}{dx} = f'(x)\\,g(x) - f(x)\\,g'(x)", "\\dfrac{dy}{dx} = f'\\big(g(x)\\big)\\,g'(x)"], { ask: 'product rule', oneWay: false }],
]

const gaps: Record<string, Card['gap']> = {
  'lin-power': { tex: '\\dfrac{d}{dx}(ax + b)^n = an(ax + b)^{n \\gap 1}', answers: ['-'] },
  'lin-cos': { tex: '\\dfrac{d}{dx}\\cos(ax + b) = \\gap a\\sin(ax + b)', answers: ['-'] },
  'cos': { tex: '\\dfrac{d}{dx}\\cos(x) = \\gap\\sin(x)', answers: ['-'] },
  'product': { tex: '\\dfrac{d}{dx}(uv) = u\\dfrac{dv}{dx} \\gap v\\dfrac{du}{dx}', answers: ['+'] },
  'quotient': { tex: '\\dfrac{d}{dx}\\left(\\dfrac{u}{v}\\right) = \\dfrac{v\\frac{du}{dx} \\gap u\\frac{dv}{dx}}{v^2}', answers: ['-'] },
  'recip': { tex: '\\dfrac{d}{dx}\\left(\\dfrac{1}{x}\\right) = \\gap\\dfrac{1}{x^2}', answers: ['-'] },
}

export const methodsDerivativesDeck: Deck = {
  id: 'methods-derivatives',
  title: 'Derivatives',
  blurb: 'The standard derivatives in the Methods study design, with a linear or function inside, and the product, quotient and chain rules.',
  groups: [BASIC, LINEAR, COMPOSITE, RULES],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: t(front),
    back: t(back),
    traps: traps.map(t),
    // A derivative read backwards is an antiderivative (and loses the + c): ask functions one way.
    oneWay: true,
    gap: gaps[id],
    ...extra,
  })),
  directionLabel: { fwd: 'Differentiate', rev: 'Recognise the rule' },
  promptLabel: { fwd: 'Differentiate with respect to x', rev: 'Which rule is this?' },
  maxTraps: 3,
  source: 'VCE Mathematical Methods Study Design 2023–2027, Units 3 and 4, Calculus',
}
