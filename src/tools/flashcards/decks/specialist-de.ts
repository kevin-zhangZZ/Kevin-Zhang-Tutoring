import type { Card, Deck, Face } from '../data'

// Specialist Units 3 & 4, Calculus: differential equations. The standard models (growth and
// decay, Newton's law of cooling, mixing), the logistic equation, Euler's method, and the forms
// of DE and what their slope fields look like.

type F = string | Face
const f = (x: F): Face => (typeof x === 'string' ? { tex: x } : x)
const w = (text: string): Face => ({ text })

/** [id, group, front, back, traps, extra] — a string is TeX, w() is words. */
type Row = [string, string, F, F, F[], Partial<Card>?]

const INT = '\\displaystyle\\int'
const LOGISTIC = '\\dfrac{dP}{dt} = rP\\left(1 - \\dfrac{P}{K}\\right)'

const MODELS = 'Models'
const LOG = 'Logistic'
const EULER = "Euler's Method"
const FORMS = 'Forms & Slope Fields'

const rows: Row[] = [
  // Models
  ['growth', MODELS, w('Rate of change proportional to the current amount N'), '\\dfrac{dN}{dt} = kN', ['\\dfrac{dN}{dt} = kt', '\\dfrac{dN}{dt} = k', 'N = kt'], { family: 'model', tip: 'k > 0 for growth, k < 0 for decay.' }],
  ['growth-sol', MODELS, '\\dfrac{dN}{dt} = kN,\\ N(0) = N_0', 'N = N_0e^{kt}', ['N = e^{kt} + N_0', 'N = N_0e^{t/k}', 'N = kN_0e^{t}'], { ask: 'the solution' }],
  ['newton', MODELS, w("Newton's law of cooling, surroundings at temperature Tₛ (k > 0)"), '\\dfrac{dT}{dt} = -k(T - T_s)', ['\\dfrac{dT}{dt} = -kT', '\\dfrac{dT}{dt} = k(T + T_s)', '\\dfrac{dT}{dt} = -k(T_s - T)'], { family: 'model', tip: 'The rate is proportional to the difference from the surroundings.' }],
  ['newton-sol', MODELS, '\\dfrac{dT}{dt} = -k(T - T_s),\\ T(0) = T_0', 'T = T_s + (T_0 - T_s)e^{-kt}', ['T = T_0 + (T_s - T_0)e^{-kt}', 'T = T_se^{-kt}', 'T = T_s - (T_0 - T_s)e^{-kt}'], { ask: 'the solution', tip: 'As t → ∞, T → Tₛ.' }],
  ['mixing', MODELS, w('Mixing problem: the rate of change of the amount of solute x'), '\\dfrac{dx}{dt} = \\text{rate in} - \\text{rate out}', ['\\dfrac{dx}{dt} = \\text{rate out} - \\text{rate in}', '\\dfrac{dx}{dt} = \\text{rate in} + \\text{rate out}', '\\dfrac{dx}{dt} = \\text{rate in} \\times \\text{rate out}'], { family: 'mix' }],
  ['mixing-out', MODELS, w('Mixing: rate of solute out, when outflow is b L/min, the volume is V(t) and the amount is x'), '\\dfrac{x}{V(t)}\\times b', ['x \\times b', '\\dfrac{V(t)}{x}\\times b', '\\dfrac{x}{V(0)}\\times b'], { family: 'mix', tip: 'Concentration × flow rate. Use V(t), not the starting volume, if the volume changes.' }],
  ['mixing-vol', MODELS, 'V(t)', 'V_0 + (a - b)t', ['V_0 + (b - a)t', 'V_0', '(a - b)t'], { ask: 'starting volume V₀, inflow a L/min, outflow b L/min', family: 'mix' }],

  // Logistic
  ['logistic', LOG, w('The logistic differential equation (growth parameter r, carrying capacity K)'), LOGISTIC, ['\\dfrac{dP}{dt} = rP\\left(1 - \\dfrac{K}{P}\\right)', '\\dfrac{dP}{dt} = r\\left(1 - \\dfrac{P}{K}\\right)', '\\dfrac{dP}{dt} = rP\\left(1 + \\dfrac{P}{K}\\right)']],
  ['log-fastest', LOG, LOGISTIC, '\\dfrac{K}{2}', ['K', '\\dfrac{K}{4}', '\\dfrac{rK}{4}'], { ask: 'the population when it grows fastest', oneWay: true, back: { tex: '\\dfrac{K}{2}', plain: 'K/2' }, tip: 'Also where the logistic curve has its point of inflection.' }],
  ['log-max-rate', LOG, LOGISTIC, '\\dfrac{rK}{4}', ['\\dfrac{rK}{2}', '\\dfrac{K}{2}', 'rK'], { ask: 'the maximum rate of growth', oneWay: true, tip: 'Substitute P = K/2: r(K/2)(1/2).' }],
  ['log-limit', LOG, LOGISTIC, 'K', ['\\dfrac{K}{2}', 'rK', '\\infty'], { ask: 'the long-term population, P₀ > 0', oneWay: true, back: { tex: 'K', plain: 'K' } }],
  ['log-sol', LOG, LOGISTIC, '\\dfrac{KP_0}{P_0 + (K - P_0)e^{-rt}}', ['\\dfrac{KP_0}{P_0 + (K - P_0)e^{rt}}', '\\dfrac{KP_0}{K + (P_0 - K)e^{-rt}}', '\\dfrac{K}{P_0 + (K - P_0)e^{-rt}}'], { ask: 'the solution with P(0) = P₀', oneWay: true, tip: 'Check t = 0 gives P₀ and t → ∞ gives K.' }],

  // Euler's method
  ['euler-y', EULER, 'y_{n+1}', 'y_n + h\\,f(x_n, y_n)', ['y_n + f(x_n, y_n)', 'y_n + h\\,f(x_{n+1}, y_{n+1})', 'h\\,y_n + f(x_n, y_n)'], {
    ask: "Euler's method for dy/dx = f(x, y), step size h",
    gap: { tex: 'y_{n+1} = y_n + \\gap\\,f(x_n, y_n)', answers: ['h'] },
  }],
  ['euler-x', EULER, 'x_{n+1}', 'x_n + h', ['x_n + h\\,f(x_n, y_n)', 'h\\,x_n', 'x_n + 1'], { ask: "Euler's method, step size h" }],
  ['euler-up', EULER, w("Euler's method (h > 0) on a solution curve that is concave up"), w('Underestimates: the tangent lies below the curve'), [w('Overestimates: the tangent lies above the curve'), w('Gives the exact value'), w('Underestimates only if the curve is increasing')], { family: 'euler-c' }],
  ['euler-down', EULER, w("Euler's method (h > 0) on a solution curve that is concave down"), w('Overestimates: the tangent lies above the curve'), [w('Underestimates: the tangent lies below the curve'), w('Gives the exact value'), w('Overestimates only if the curve is decreasing')], { family: 'euler-c' }],
  ['euler-h', EULER, w("Effect of a smaller step size in Euler's method"), w('More steps, and usually a more accurate approximation'), [w('Fewer steps, and a more accurate approximation'), w('No change in accuracy'), w('A less accurate approximation')]],

  // Forms and slope fields
  ['form-fx', FORMS, '\\dfrac{dy}{dx} = f(x)', `y = ${INT} f(x)\\,dx`, [`y = ${INT} \\dfrac{1}{f(x)}\\,dx`, "y = f'(x)", `x = ${INT} f(x)\\,dy`], { ask: 'how to solve it', family: 'form' }],
  ['form-gy', FORMS, '\\dfrac{dy}{dx} = g(y)', `x = ${INT} \\dfrac{1}{g(y)}\\,dy`, [`y = ${INT} g(y)\\,dx`, `x = ${INT} g(y)\\,dy`, `y = ${INT} \\dfrac{1}{g(y)}\\,dy`], { ask: 'how to solve it', family: 'form', tip: 'Flip it: dx/dy = 1/g(y).' }],
  ['form-sep', FORMS, '\\dfrac{dy}{dx} = f(x)\\,g(y)', `${INT} \\dfrac{1}{g(y)}\\,dy = ${INT} f(x)\\,dx`, [`${INT} g(y)\\,dy = ${INT} f(x)\\,dx`, `${INT} \\dfrac{1}{f(x)}\\,dx = ${INT} g(y)\\,dy`, `y = ${INT} f(x)\\,g(y)\\,dx`], { ask: 'how to solve it (separation of variables)', family: 'form' }],
  ['form-second', FORMS, '\\dfrac{d^2y}{dx^2} = f(x)', w('Antidifferentiate twice, giving two arbitrary constants'), [w('Antidifferentiate once, giving one constant'), w('Separate the variables'), w('Flip to dx/dy, then antidifferentiate')], { ask: 'how to solve it', family: 'form' }],
  ['slope-fx', FORMS, w('Slope field of dy/dx = f(x)'), w('Slopes are the same all along each vertical line'), [w('Slopes are the same all along each horizontal line'), w('Every slope is the same'), w('Slopes are zero along the line y = x')], { family: 'slope' }],
  ['slope-gy', FORMS, w('Slope field of dy/dx = g(y)'), w('Slopes are the same all along each horizontal line'), [w('Slopes are the same all along each vertical line'), w('Every slope is the same'), w('Slopes are zero along the line y = x')], { family: 'slope' }],
  ['equilibrium', FORMS, '\\dfrac{dy}{dx} = g(y),\\ g(a) = 0', w('y = a is a constant solution: the slopes along y = a are horizontal'), [w('x = a is a solution: the slopes along x = a are vertical'), w('The slopes along y = a are vertical'), w('No solution passes through y = a')], { oneWay: true }],
  ['verify', FORMS, w('Verifying that a given function is a solution of a DE'), w('Substitute it and its derivatives into the DE and show both sides are equal'), [w('Solve the DE and compare the answers'), w('Check that it satisfies the initial condition only'), w('Differentiate both sides of the DE')]],
]

export const specialistDeDeck: Deck = {
  id: 'specialist-de',
  title: 'Differential Equations',
  blurb: "The standard models, the logistic equation, Euler's method, and the forms of DE and their slope fields.",
  groups: [MODELS, LOG, EULER, FORMS],
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
  source: "VCE Specialist Mathematics Study Design 2023–2027, Units 3 & 4: Differential equations; KZ's Differential Equations Summary lecture",
}
