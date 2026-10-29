import type { Card, Deck, Face } from '../data'

// Mathematical Methods 3–4, Algebra, number and structure: inverse functions (and when they
// exist), composite and combined functions, symmetry and functional equations, and when a
// pair of simultaneous linear equations has one, none or infinitely many solutions.

const t = (tex: string): Face => ({ tex })
const w = (text: string): Face => ({ text })
type F = string | Face
const face = (f: F): Face => (typeof f === 'string' ? t(f) : f)

/** [id, group, front, back, traps, extra] — strings are TeX, w('…') is words. */
type Row = [string, string, F, F, F[], Partial<Card>?]

const INV = 'Inverse Functions'
const COMP = 'Composite Functions'
const PROP = 'Properties of Functions'
const SIM = 'Simultaneous Equations'

const DOM = (f: string) => `\\operatorname{dom} ${f}`
const RAN = (f: string) => `\\operatorname{ran} ${f}`

const rows: Row[] = [
  ['inv-exists', INV, w('An inverse function f⁻¹ exists when'), w('f is one-to-one'), [w('f is many-to-one'), w('f is continuous'), w('f has a maximal domain of R')], { tip: 'Restrict the domain to make f one-to-one.' }],
  ['hline', INV, w('Graph test for a one-to-one function'), w('Every horizontal line meets the graph at most once'), [w('Every vertical line meets the graph at most once'), w('Every horizontal line meets the graph exactly once'), w('The graph passes through the origin')], { family: 'line-test' }],
  ['vline', INV, w('Graph test for a relation to be a function'), w('Every vertical line meets the graph at most once'), [w('Every horizontal line meets the graph at most once'), w('Every vertical line meets the graph exactly once'), w('The graph never turns back on itself')], { family: 'line-test' }],
  ['inv-dom', INV, DOM('f^{-1}'), RAN('f'), [DOM('f'), RAN('f^{-1}'), 'R'], { family: 'domran' }],
  ['inv-ran', INV, RAN('f^{-1}'), DOM('f'), [RAN('f'), DOM('f^{-1}'), 'R'], { family: 'domran' }],
  ['inv-graph', INV, w('The graph of y = f⁻¹(x) is the graph of y = f(x)'), w('Reflected in the line y = x'), [w('Reflected in the x-axis'), w('Reflected in the y-axis'), w('Reflected in the line y = −x')]],
  ['inv-point', INV, w('If (a, b) is on the graph of f, the point on the graph of f⁻¹'), '(b, a)', ['(-a, -b)', '(a, -b)', '\\left(\\dfrac{1}{a}, \\dfrac{1}{b}\\right)']],
  ['inv-cancel', INV, 'f\\big(f^{-1}(x)\\big)', 'x', ['1', '\\dfrac{1}{x}', 'f(x)'], { ask: `for x in the domain of f⁻¹`, oneWay: true }],
  ['inv-intersect', INV, w('Intersections of y = f(x) and y = f⁻¹(x), f strictly increasing'), w('Solve f(x) = x: they meet on the line y = x'), [w('Solve f(x) = 0'), w('Solve f(x) = −x'), w('Solve f⁻¹(x) = 0')], { tip: 'Only safe for increasing f; a decreasing f can meet its inverse off y = x.' }],
  ['inv-method', INV, w('Finding the rule of f⁻¹'), w('Swap x and y, then make y the subject'), [w('Replace f(x) with 1/f(x)'), w('Make x the subject, keeping x and y in place'), w('Reflect the rule in the x-axis')]],

  ['comp-def', COMP, '(f \\circ g)(x)', 'f\\big(g(x)\\big)', ['g\\big(f(x)\\big)', 'f(x)\\,g(x)', 'f(x) + g(x)']],
  ['comp-exists', COMP, w('f ∘ g is defined when'), `${RAN('g')} \\subseteq ${DOM('f')}`, [`${RAN('f')} \\subseteq ${DOM('g')}`, `${DOM('g')} \\subseteq ${DOM('f')}`, `${DOM('f')} \\subseteq ${RAN('g')}`], { tip: 'What comes out of g must be allowed into f.' }],
  ['comp-dom', COMP, DOM('(f \\circ g)'), DOM('g'), [DOM('f'), RAN('g'), `${DOM('f')} \\cap ${DOM('g')}`], { ask: 'when f ∘ g is defined', tip: 'x goes into g first.' }],
  ['comp-ran', COMP, w('Finding the range of f ∘ g'), w('The range of f with its domain restricted to the range of g'), [w('The range of f'), w('The range of g'), w('The range of g with its domain restricted to the range of f')]],
  ['sum-dom', COMP, `${DOM('(f + g)')} \\text{ and } ${DOM('(fg)')}`, `${DOM('f')} \\cap ${DOM('g')}`, [`${DOM('f')} \\cup ${DOM('g')}`, DOM('f'), `${RAN('f')} \\cap ${RAN('g')}`], { tip: 'Both rules have to make sense.' }],

  ['even', PROP, w('f is an even function'), 'f(-x) = f(x)', ['f(-x) = -f(x)', 'f(x) = -f(x)', 'f(-x) = \\dfrac{1}{f(x)}'], { family: 'parity' }],
  ['odd', PROP, w('f is an odd function'), 'f(-x) = -f(x)', ['f(-x) = f(x)', 'f(x) = -f(x)', '-f(-x) = -f(x)'], { family: 'parity' }],
  ['even-graph', PROP, w('Symmetry of the graph of an even function'), w('Symmetric about the y-axis'), [w('Symmetric about the x-axis'), w('Rotational symmetry about the origin'), w('Symmetric about the line y = x')], { family: 'sym' }],
  ['odd-graph', PROP, w('Symmetry of the graph of an odd function'), w('Rotational symmetry (half-turn) about the origin'), [w('Symmetric about the y-axis'), w('Symmetric about the x-axis'), w('Symmetric about the line y = x')], { family: 'sym' }],
  ['fe-log', PROP, 'f(xy) = f(x) + f(y)', w('A logarithmic function, such as f(x) = logₐ(x)'), [w('An exponential function, such as f(x) = aˣ'), w('A linear function, such as f(x) = ax'), w('A power function, such as f(x) = xⁿ')], { ask: 'which type of function satisfies this?', family: 'fe', tip: 'A product becomes a sum.' }],
  ['fe-exp', PROP, 'f(x + y) = f(x)\\,f(y)', w('An exponential function, such as f(x) = aˣ'), [w('A logarithmic function, such as f(x) = logₐ(x)'), w('A linear function, such as f(x) = ax'), w('A power function, such as f(x) = xⁿ')], { ask: 'which type of function satisfies this?', family: 'fe', tip: 'A sum becomes a product.' }],
  ['fe-lin', PROP, 'f(x + y) = f(x) + f(y)', w('A linear function through the origin, f(x) = ax'), [w('An exponential function, such as f(x) = aˣ'), w('A logarithmic function, such as f(x) = logₐ(x)'), w('A power function, such as f(x) = xⁿ')], { ask: 'which type of function satisfies this?', family: 'fe' }],

  ['sim-unique', SIM, w('a₁x + b₁y = c₁ and a₂x + b₂y = c₂ have a unique solution'), '\\dfrac{a_1}{a_2} \\neq \\dfrac{b_1}{b_2}', ['\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} \\neq \\dfrac{c_1}{c_2}', '\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} = \\dfrac{c_1}{c_2}', '\\dfrac{a_1}{a_2} \\neq \\dfrac{c_1}{c_2}'], { family: 'sim', tip: 'Different gradients: the lines cross once.' }],
  ['sim-none', SIM, w('a₁x + b₁y = c₁ and a₂x + b₂y = c₂ have no solution'), '\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} \\neq \\dfrac{c_1}{c_2}', ['\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} = \\dfrac{c_1}{c_2}', '\\dfrac{a_1}{a_2} \\neq \\dfrac{b_1}{b_2}', '\\dfrac{a_1}{a_2} = \\dfrac{c_1}{c_2} \\neq \\dfrac{b_1}{b_2}'], { family: 'sim', tip: 'Parallel lines: same gradient, different intercepts.' }],
  ['sim-inf', SIM, w('a₁x + b₁y = c₁ and a₂x + b₂y = c₂ have infinitely many solutions'), '\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} = \\dfrac{c_1}{c_2}', ['\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} \\neq \\dfrac{c_1}{c_2}', '\\dfrac{a_1}{a_2} \\neq \\dfrac{b_1}{b_2}', '\\dfrac{a_1}{a_2} = \\dfrac{c_1}{c_2}'], { family: 'sim', tip: 'The same line written twice.' }],
  ['sim-none-geo', SIM, w('Two linear equations with no solution: the graphs'), w('Parallel lines (same gradient, different y-intercepts)'), [w('The same line'), w('Lines that cross at one point'), w('Perpendicular lines')], { family: 'sim-geo' }],
  ['sim-inf-geo', SIM, w('Two linear equations with infinitely many solutions: the graphs'), w('The same line'), [w('Parallel lines (same gradient, different y-intercepts)'), w('Lines that cross at one point'), w('Perpendicular lines')], { family: 'sim-geo' }],
]

export const methodsFunctionsAlgebraDeck: Deck = {
  id: 'methods-functions-algebra',
  title: 'Inverses & Composites',
  blurb: 'When an inverse function exists and how its domain and range swap, composite and combined function domains, symmetry, functional equations and simultaneous linear equations.',
  groups: [INV, COMP, PROP, SIM],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: face(front),
    back: face(back),
    traps: traps.map(face),
    ...extra,
  })),
  directionLabel: { fwd: 'Recall', rev: 'Recognise' },
  promptLabel: { fwd: 'Recall', rev: 'What does this describe?' },
  maxTraps: 3,
  source: 'VCE Mathematical Methods Study Design 2023–2027, Units 3 and 4, Algebra, number and structure',
}
