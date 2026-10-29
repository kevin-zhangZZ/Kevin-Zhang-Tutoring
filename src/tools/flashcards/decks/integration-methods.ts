import type { Card, Deck, Face } from '../data'

// The Methods antiderivatives found by inspection: the standard forms for xⁿ, f(ax + b), eˣ,
// sin and cos (Unit 3 AOS 3), linearity, integration by recognition, and the definite-integral facts.
// Logs follow the Methods formula sheet: log_e(x) for x > 0, log_e(ax + b) for ax + b > 0.

const t = (tex: string): Face => ({ tex })

/** [id, group, front, back, traps, extra] */
type Row = [string, string, string, string, string[], Partial<Card>?]

const POW = 'Powers'
const LIN = 'Linear Inside'
const LOG = 'Logs'
const EXP = 'Exponentials'
const CIRC = 'Sin & Cos'
const RULES = 'Linearity'
const REC = 'Recognition'
const DEF = 'Definite Integrals'

const rows: Row[] = [
  ['pow-n', POW, '\\int x^n\\,dx', '\\dfrac{x^{n+1}}{n+1} + c', ['nx^{n-1} + c', 'x^{n+1} + c', '\\dfrac{x^{n+1}}{n} + c'], { ask: 'n ≠ −1' }],
  ['pow-sqrt', POW, '\\int \\sqrt{x}\\,dx', '\\dfrac{2}{3}x^{\\frac{3}{2}} + c', ['\\dfrac{3}{2}x^{\\frac{3}{2}} + c', '\\dfrac{1}{2\\sqrt{x}} + c', '\\dfrac{2}{3}x^{\\frac{1}{2}} + c']],
  ['pow-inv-sqrt', POW, '\\int \\dfrac{1}{\\sqrt{x}}\\,dx', '2\\sqrt{x} + c', ['\\dfrac{1}{2}\\sqrt{x} + c', '-2\\sqrt{x} + c', '\\dfrac{2}{3}x^{\\frac{3}{2}} + c']],
  ['pow-inv-sq', POW, '\\int \\dfrac{1}{x^2}\\,dx', '-\\dfrac{1}{x} + c', ['\\dfrac{1}{x} + c', '-\\dfrac{2}{x^3} + c', '\\log_e(x^2) + c']],
  ['pow-inv-4', POW, '\\int \\dfrac{3}{x^4}\\,dx', '-\\dfrac{1}{x^3} + c', ['\\dfrac{1}{x^3} + c', '-\\dfrac{3}{x^3} + c', '-\\dfrac{12}{x^5} + c']],

  ['lin-n', LIN, '\\int (ax+b)^n\\,dx', '\\dfrac{(ax+b)^{n+1}}{a(n+1)} + c', ['\\dfrac{a(ax+b)^{n+1}}{n+1} + c', '\\dfrac{(ax+b)^{n+1}}{n+1} + c', 'an(ax+b)^{n-1} + c'], { ask: 'n ≠ −1' }],
  ['lin-3x-2', LIN, '\\int (3x-2)^5\\,dx', '\\dfrac{(3x-2)^6}{18} + c', ['\\dfrac{(3x-2)^6}{6} + c', '\\dfrac{(3x-2)^6}{2} + c', '15(3x-2)^4 + c']],
  ['lin-2x-plus-1', LIN, '\\int (2x+1)^3\\,dx', '\\dfrac{(2x+1)^4}{8} + c', ['\\dfrac{(2x+1)^4}{4} + c', '\\dfrac{(2x+1)^4}{2} + c', '6(2x+1)^2 + c']],
  ['lin-sqrt', LIN, '\\int \\sqrt{4x+1}\\,dx', '\\dfrac{(4x+1)^{\\frac{3}{2}}}{6} + c', ['\\dfrac{2}{3}(4x+1)^{\\frac{3}{2}} + c', '\\dfrac{8}{3}(4x+1)^{\\frac{3}{2}} + c', '\\dfrac{2}{\\sqrt{4x+1}} + c']],
  ['lin-recip-sq', LIN, '\\int \\dfrac{1}{(1-2x)^2}\\,dx', '\\dfrac{1}{2(1-2x)} + c', ['-\\dfrac{1}{2(1-2x)} + c', '-\\dfrac{1}{1-2x} + c', '-\\dfrac{1}{2}\\log_e(1-2x) + c']],
  ['lin-5-x', LIN, '\\int (5-x)^4\\,dx', '-\\dfrac{(5-x)^5}{5} + c', ['\\dfrac{(5-x)^5}{5} + c', '-4(5-x)^3 + c', '-(5-x)^5 + c']],

  ['log-x', LOG, '\\int \\dfrac{1}{x}\\,dx', '\\log_e(x) + c', ['-\\dfrac{1}{x^2} + c', 'x\\log_e(x) + c', 'e^x + c'], { ask: 'x > 0' }],
  ['log-ax-plus-b', LOG, '\\int \\dfrac{1}{ax+b}\\,dx', '\\dfrac{1}{a}\\log_e(ax+b) + c', ['a\\log_e(ax+b) + c', '\\log_e(ax+b) + c', '-\\dfrac{a}{(ax+b)^2} + c'], { ask: 'ax + b > 0' }],
  ['log-6', LOG, '\\int \\dfrac{6}{3x-1}\\,dx', '2\\log_e(3x-1) + c', ['6\\log_e(3x-1) + c', '18\\log_e(3x-1) + c', '\\dfrac{1}{2}\\log_e(3x-1) + c'], { ask: '3x − 1 > 0' }],
  ['log-2-plus-2x', LOG, '\\int \\dfrac{1}{2+2x}\\,dx', '\\dfrac{1}{2}\\log_e(2+2x) + c', ['\\log_e(2+2x) + c', '2\\log_e(2+2x) + c', '\\log_e(1+x) + c'], { ask: '2 + 2x > 0' }],
  ['log-5-x', LOG, '\\int \\dfrac{1}{5-x}\\,dx', '-\\log_e(5-x) + c', ['\\log_e(5-x) + c', '\\dfrac{1}{(5-x)^2} + c', '5\\log_e(5-x) + c'], { ask: 'x < 5' }],

  ['exp-ax-plus-b', EXP, '\\int e^{ax+b}\\,dx', '\\dfrac{1}{a}e^{ax+b} + c', ['ae^{ax+b} + c', 'e^{ax+b} + c', '\\dfrac{e^{ax+b+1}}{ax+b+1} + c']],
  ['exp-3x', EXP, '\\int e^{3x}\\,dx', '\\dfrac{1}{3}e^{3x} + c', ['3e^{3x} + c', 'e^{3x} + c', '\\dfrac{e^{3x+1}}{3x+1} + c']],
  ['exp-neg', EXP, '\\int e^{-x}\\,dx', '-e^{-x} + c', ['e^{-x} + c', '-e^{x} + c', '\\dfrac{e^{-x+1}}{-x+1} + c']],
  ['exp-4', EXP, '\\int 4e^{2x}\\,dx', '2e^{2x} + c', ['8e^{2x} + c', '4e^{2x} + c', '2e^{x^2} + c']],
  ['exp-pair', EXP, '\\int \\left(3e^{x} - 2e^{-x}\\right)dx', '3e^{x} + 2e^{-x} + c', ['3e^{x} - 2e^{-x} + c', '3e^{x} - 2e^{x} + c', '3e^{x} + 2e^{x} + c']],

  ['sin-ax-plus-b', CIRC, '\\int \\sin(ax+b)\\,dx', '-\\dfrac{1}{a}\\cos(ax+b) + c', ['\\dfrac{1}{a}\\cos(ax+b) + c', '-a\\cos(ax+b) + c', '-\\cos(ax+b) + c']],
  ['cos-ax-plus-b', CIRC, '\\int \\cos(ax+b)\\,dx', '\\dfrac{1}{a}\\sin(ax+b) + c', ['-\\dfrac{1}{a}\\sin(ax+b) + c', 'a\\sin(ax+b) + c', '\\sin(ax+b) + c']],
  ['sin-2x', CIRC, '\\int \\sin(2x)\\,dx', '-\\dfrac{1}{2}\\cos(2x) + c', ['\\dfrac{1}{2}\\cos(2x) + c', '-2\\cos(2x) + c', '2\\cos(2x) + c']],
  ['cos-3x', CIRC, '\\int \\cos(3x)\\,dx', '\\dfrac{1}{3}\\sin(3x) + c', ['-\\dfrac{1}{3}\\sin(3x) + c', '3\\sin(3x) + c', '-3\\sin(3x) + c']],
  ['sin-half', CIRC, '\\int \\sin\\left(\\dfrac{x}{2}\\right)dx', '-2\\cos\\left(\\dfrac{x}{2}\\right) + c', ['2\\cos\\left(\\dfrac{x}{2}\\right) + c', '-\\dfrac{1}{2}\\cos\\left(\\dfrac{x}{2}\\right) + c', '\\dfrac{1}{2}\\cos\\left(\\dfrac{x}{2}\\right) + c']],
  ['cos-pi', CIRC, '\\int \\cos(\\pi x)\\,dx', '\\dfrac{1}{\\pi}\\sin(\\pi x) + c', ['\\pi\\sin(\\pi x) + c', '-\\dfrac{1}{\\pi}\\sin(\\pi x) + c', '\\sin(\\pi x) + c']],
  ['cos-shift', CIRC, '\\int \\dfrac{1}{5}\\cos\\left(2x + \\dfrac{\\pi}{3}\\right)dx', '\\dfrac{1}{10}\\sin\\left(2x + \\dfrac{\\pi}{3}\\right) + c', ['\\dfrac{2}{5}\\sin\\left(2x + \\dfrac{\\pi}{3}\\right) + c', '-\\dfrac{1}{10}\\sin\\left(2x + \\dfrac{\\pi}{3}\\right) + c', '\\dfrac{1}{5}\\sin\\left(2x + \\dfrac{\\pi}{3}\\right) + c']],

  ['rule-k', RULES, '\\int k\\,f(x)\\,dx', 'k\\int f(x)\\,dx', ['\\int k\\,dx \\times \\int f(x)\\,dx', 'kx\\int f(x)\\,dx', '\\dfrac{1}{k}\\int f(x)\\,dx'], { ask: 'k a constant' }],
  ['rule-sum', RULES, '\\int \\big(f(x) + g(x)\\big)dx', '\\int f(x)\\,dx + \\int g(x)\\,dx', ['\\int f(x)\\,dx \\times \\int g(x)\\,dx', 'f(x) + g(x) + c', '\\int f(x)\\,dx - \\int g(x)\\,dx']],
  ['rule-split', RULES, '\\int \\dfrac{x^2+1}{x}\\,dx', '\\dfrac{x^2}{2} + \\log_e(x) + c', ['\\dfrac{\\frac{x^3}{3} + x}{\\frac{x^2}{2}} + c', '\\dfrac{x^2}{2} + \\dfrac{1}{x} + c', '\\dfrac{x^2}{2} - \\dfrac{1}{x^2} + c'], { ask: 'x > 0' }],
  ['rule-root', RULES, '\\int \\dfrac{x+1}{\\sqrt{x}}\\,dx', '\\dfrac{2}{3}x^{\\frac{3}{2}} + 2\\sqrt{x} + c', ['\\dfrac{3}{2}x^{\\frac{3}{2}} + 2\\sqrt{x} + c', '\\dfrac{2}{3}x^{\\frac{3}{2}} + \\dfrac{1}{2}\\sqrt{x} + c', '\\dfrac{\\frac{x^2}{2} + x}{\\frac{2}{3}x^{\\frac{3}{2}}} + c']],

  ['rec-log', REC, '\\int \\dfrac{f\'(x)}{f(x)}\\,dx', '\\log_e\\big(f(x)\\big) + c', ['\\dfrac{1}{f(x)} + c', '\\log_e\\big(f\'(x)\\big) + c', 'f\'(x)\\log_e\\big(f(x)\\big) + c'], { ask: 'f(x) > 0' }],
  ['rec-exp', REC, '\\int f\'(x)\\,e^{f(x)}\\,dx', 'e^{f(x)} + c', ['f\'(x)\\,e^{f(x)} + c', 'e^{f\'(x)} + c', '\\dfrac{e^{f(x)}}{f\'(x)} + c']],
  ['rec-2x-exp', REC, '\\int 2x\\,e^{x^2}\\,dx', 'e^{x^2} + c', ['x^2 e^{x^2} + c', '2e^{x^2} + c', '\\dfrac{e^{x^2}}{2x} + c']],
  ['rec-2x-log', REC, '\\int \\dfrac{2x}{x^2+1}\\,dx', '\\log_e(x^2+1) + c', ['2\\log_e(x^2+1) + c', '\\dfrac{1}{2}\\log_e(x^2+1) + c', 'x^2\\log_e(x^2+1) + c']],
  ['rec-xlog', REC, '\\int \\log_e(x)\\,dx', 'x\\log_e(x) - x + c', ['x\\log_e(x) + c', '\\dfrac{1}{x} + c', 'x\\log_e(x) + x + c'], { ask: 'given d/dx(x logₑ(x)) = logₑ(x) + 1' }],
  ['rec-xcos', REC, '\\int x\\cos(x)\\,dx', 'x\\sin(x) + \\cos(x) + c', ['x\\sin(x) - \\cos(x) + c', 'x\\sin(x) + c', '\\dfrac{x^2}{2}\\sin(x) + c'], { ask: 'given d/dx(x sin(x)) = sin(x) + x cos(x)' }],

  ['def-ftc', DEF, '\\int_a^b f(x)\\,dx', 'F(b) - F(a)', ['F(a) - F(b)', 'F(b) + F(a)', 'f(b) - f(a)'], { ask: "where F′(x) = f(x)" }],
  ['def-same', DEF, '\\int_a^a f(x)\\,dx', '0', ['F(a)', 'f(a)', '2F(a)'], { oneWay: true }],
  ['def-reverse', DEF, '\\int_b^a f(x)\\,dx', '-\\int_a^b f(x)\\,dx', ['\\int_a^b f(x)\\,dx', '\\int_a^b -f(-x)\\,dx', '\\dfrac{1}{\\int_a^b f(x)\\,dx}']],
  ['def-join', DEF, '\\int_a^b f(x)\\,dx + \\int_b^c f(x)\\,dx', '\\int_a^c f(x)\\,dx', ['\\int_b^c f(x)\\,dx', '\\int_a^c 2f(x)\\,dx', '\\int_c^a f(x)\\,dx']],
  ['def-const', DEF, '\\int_a^b k\\,dx', 'k(b - a)', ['k(a - b)', 'kb', '0'], { oneWay: true }],
  ['def-eval', DEF, '\\int_{-1}^{2} \\left(x^2 + 1\\right)dx', '6', ['4', '\\dfrac{14}{3}', '\\dfrac{16}{3}'], { oneWay: true }],
  ['def-given-3f', DEF, '\\int_2^6 \\big(3f(x) - 1\\big)dx', '20', ['23', '24', '18'], { oneWay: true, ask: 'given ∫₂⁶ f(x) dx = 8' }],
  ['def-given-rev', DEF, '\\int_6^2 2f(x)\\,dx', '-16', ['16', '-8', '8'], { oneWay: true, ask: 'given ∫₂⁶ f(x) dx = 8' }],
]

const gaps: Record<string, [string, string[]]> = {
  'pow-sqrt': ['\\int \\sqrt{x}\\,dx = \\gap\\,x^{\\frac{3}{2}} + c', ['2/3']],
  'pow-inv-sq': ['\\int \\dfrac{1}{x^2}\\,dx = \\gap\\dfrac{1}{x} + c', ['-']],
  'lin-n': ['\\int (ax+b)^n\\,dx = \\dfrac{(ax+b)^{n+1}}{\\gap\\,(n+1)} + c', ['a']],
  'lin-3x-2': ['\\int (3x-2)^5\\,dx = \\dfrac{(3x-2)^6}{\\gap} + c', ['18']],
  'lin-2x-plus-1': ['\\int (2x+1)^3\\,dx = \\dfrac{(2x+1)^4}{\\gap} + c', ['8']],
  'lin-5-x': ['\\int (5-x)^4\\,dx = \\gap\\dfrac{(5-x)^5}{5} + c', ['-']],
  'log-ax-plus-b': ['\\int \\dfrac{1}{ax+b}\\,dx = \\gap\\,\\log_e(ax+b) + c', ['1/a']],
  'log-6': ['\\int \\dfrac{6}{3x-1}\\,dx = \\gap\\,\\log_e(3x-1) + c', ['2']],
  'log-5-x': ['\\int \\dfrac{1}{5-x}\\,dx = \\gap\\log_e(5-x) + c', ['-']],
  'exp-ax-plus-b': ['\\int e^{ax+b}\\,dx = \\gap\\,e^{ax+b} + c', ['1/a']],
  'exp-3x': ['\\int e^{3x}\\,dx = \\gap\\,e^{3x} + c', ['1/3']],
  'exp-neg': ['\\int e^{-x}\\,dx = \\gap\\,e^{-x} + c', ['-', '-1']],
  'sin-ax-plus-b': ['\\int \\sin(ax+b)\\,dx = \\gap\\,\\cos(ax+b) + c', ['-1/a']],
  'cos-ax-plus-b': ['\\int \\cos(ax+b)\\,dx = \\gap\\,\\sin(ax+b) + c', ['1/a']],
  'sin-2x': ['\\int \\sin(2x)\\,dx = \\gap\\,\\cos(2x) + c', ['-1/2', '-0.5']],
  'cos-3x': ['\\int \\cos(3x)\\,dx = \\gap\\,\\sin(3x) + c', ['1/3']],
  'sin-half': ['\\int \\sin\\left(\\dfrac{x}{2}\\right)dx = \\gap\\,\\cos\\left(\\dfrac{x}{2}\\right) + c', ['-2']],
  'cos-shift': ['\\int \\dfrac{1}{5}\\cos\\left(2x + \\dfrac{\\pi}{3}\\right)dx = \\gap\\,\\sin\\left(2x + \\dfrac{\\pi}{3}\\right) + c', ['1/10', '0.1']],
  'def-ftc': ['\\int_a^b f(x)\\,dx = F(b) \\gap F(a)', ['-']],
  'def-reverse': ['\\int_b^a f(x)\\,dx = \\gap\\int_a^b f(x)\\,dx', ['-']],
}

const tips: Record<string, string> = {
  'pow-n': 'Add one to the power, then divide by the new power.',
  'pow-sqrt': 'Write √x as x^½ first.',
  'pow-inv-sq': 'Write 1/x² as x⁻²: the new power is −1.',
  'lin-n': 'As for xⁿ, then divide by a, the derivative of the inside.',
  'lin-3x-2': 'Divide by the new power (6) and by the derivative of the inside (3).',
  'lin-recip-sq': 'Two negatives: the new power −1 and the inside’s derivative −2.',
  'lin-5-x': 'The inside 5 − x has derivative −1.',
  'log-x': 'The one power xⁿ can’t handle: n = −1 gives a log.',
  'log-ax-plus-b': 'Divide by a, the derivative of the inside.',
  'log-2-plus-2x': '½logₑ(1 + x) + c is also right: it differs from this by a constant.',
  'log-5-x': 'The inside 5 − x has derivative −1.',
  'exp-ax-plus-b': 'e stays e; divide by the derivative of the power.',
  'exp-neg': 'Divide by −1, the derivative of −x.',
  'sin-ax-plus-b': 'sin integrates to −cos: the reverse of d/dx cos = −sin.',
  'cos-ax-plus-b': 'cos integrates to +sin.',
  'sin-half': 'Dividing by ½ is multiplying by 2.',
  'rule-split': 'Split the fraction first: x + 1/x.',
  'rule-root': 'Split into x^½ + x^−½ first.',
  'rec-log': 'Top is the derivative of the bottom.',
  'rec-xlog': 'Integrate both sides: x logₑ(x) = ∫logₑ(x) dx + x.',
  'rec-xcos': 'Integrate both sides, then move ∫sin(x) dx = −cos(x) across.',
  'def-ftc': 'A definite integral is a number: no + c.',
  'def-reverse': 'Swapping the terminals changes the sign.',
  'def-eval': '[x³/3 + x] from −1 to 2: (8/3 + 2) − (−1/3 − 1).',
  'def-given-3f': '3 × 8 − ∫₂⁶ 1 dx = 24 − 4. The −1 is integrated over a width of 4.',
  'def-given-rev': 'Reversed terminals: −2 × 8.',
}

export const integrationMethodsDeck: Deck = {
  id: 'integration-methods',
  title: 'Integration',
  blurb: 'The Methods antiderivatives to write down by inspection: powers, f(ax + b), logs, exponentials, sin and cos, recognition and the definite-integral rules.',
  groups: [POW, LIN, LOG, EXP, CIRC, RULES, REC, DEF],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: t(front),
    back: t(back),
    traps: traps.map(t),
    tip: tips[id],
    gap: gaps[id] && { tex: gaps[id][0], answers: gaps[id][1] },
    ...extra,
  })),
  directionLabel: { fwd: 'Integrate', rev: 'Differentiate' },
  promptLabel: { fwd: 'Find', rev: 'Which integral gives this?' },
  maxTraps: 3,
  source: 'Kevin’s 2026 Methods integration lectures and the VCE Mathematics Study Design',
}
