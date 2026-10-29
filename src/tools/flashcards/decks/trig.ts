import type { Card, Deck, Face } from '../data'

// The trig identities a Specialist student should know cold: definitions, Pythagorean,
// compound and double angle, the squares used for integration, and symmetry.

const COSEC = '\\operatorname{cosec}'
const t = (tex: string): Face => ({ tex })

/** [id, group, front, back, traps, extra] */
type Row = [string, string, string, string, string[], Partial<Card>?]

const DEF = 'Definitions'
const PYTH = 'Pythagorean'
const COMP = 'Compound Angle'
const DBL = 'Double Angle'
const SQ = 'Squares & Products'
const SYM = 'Symmetry'

const rows: Row[] = [
  ['tan', DEF, '\\tan x', '\\dfrac{\\sin x}{\\cos x}', ['\\dfrac{\\cos x}{\\sin x}', '\\dfrac{1}{\\cos x}', '\\sin x\\cos x']],
  ['sec', DEF, '\\sec x', '\\dfrac{1}{\\cos x}', ['\\dfrac{1}{\\sin x}', '\\dfrac{1}{\\tan x}', '\\dfrac{\\cos x}{\\sin x}']],
  ['cosec', DEF, `${COSEC} x`, '\\dfrac{1}{\\sin x}', ['\\dfrac{1}{\\cos x}', '\\dfrac{1}{\\tan x}', '\\dfrac{\\sin x}{\\cos x}']],
  ['cot', DEF, '\\cot x', '\\dfrac{\\cos x}{\\sin x}', ['\\dfrac{\\sin x}{\\cos x}', '\\dfrac{1}{\\cos x}', '\\dfrac{1}{\\sin x}']],

  ['pyth-1', PYTH, '\\sin^2 x + \\cos^2 x', '1', ['0', '\\tan^2 x', '\\sec^2 x'], { oneWay: true }],
  ['pyth-tan', PYTH, '1 + \\tan^2 x', '\\sec^2 x', [`${COSEC}^2 x`, '\\cot^2 x', '\\sec^2 x - 1']],
  ['pyth-cot', PYTH, '1 + \\cot^2 x', `${COSEC}^2 x`, ['\\sec^2 x', '\\tan^2 x', `${COSEC}^2 x - 1`]],

  ['sin-sum', COMP, '\\sin(x + y)', '\\sin x\\cos y + \\cos x\\sin y', ['\\sin x\\cos y - \\cos x\\sin y', '\\cos x\\cos y - \\sin x\\sin y', '\\sin x + \\sin y']],
  ['sin-diff', COMP, '\\sin(x - y)', '\\sin x\\cos y - \\cos x\\sin y', ['\\sin x\\cos y + \\cos x\\sin y', '\\cos x\\sin y - \\sin x\\cos y', '\\sin x - \\sin y']],
  ['cos-sum', COMP, '\\cos(x + y)', '\\cos x\\cos y - \\sin x\\sin y', ['\\cos x\\cos y + \\sin x\\sin y', '\\sin x\\cos y + \\cos x\\sin y', '\\cos x + \\cos y']],
  ['cos-diff', COMP, '\\cos(x - y)', '\\cos x\\cos y + \\sin x\\sin y', ['\\cos x\\cos y - \\sin x\\sin y', '\\sin x\\cos y - \\cos x\\sin y', '\\cos x - \\cos y']],
  ['tan-sum', COMP, '\\tan(x + y)', '\\dfrac{\\tan x + \\tan y}{1 - \\tan x\\tan y}', ['\\dfrac{\\tan x + \\tan y}{1 + \\tan x\\tan y}', '\\dfrac{\\tan x - \\tan y}{1 - \\tan x\\tan y}', '\\tan x + \\tan y']],
  ['tan-diff', COMP, '\\tan(x - y)', '\\dfrac{\\tan x - \\tan y}{1 + \\tan x\\tan y}', ['\\dfrac{\\tan x - \\tan y}{1 - \\tan x\\tan y}', '\\dfrac{\\tan x + \\tan y}{1 + \\tan x\\tan y}', '\\tan x - \\tan y']],

  ['sin-2x', DBL, '\\sin 2x', '2\\sin x\\cos x', ['2\\sin x', '\\sin^2 x - \\cos^2 x', '\\sin x\\cos x']],
  ['cos-2x', DBL, '\\cos 2x', '\\cos^2 x - \\sin^2 x', ['\\sin^2 x - \\cos^2 x', '2\\sin x\\cos x', '\\cos^2 x + \\sin^2 x'], { ask: 'in terms of sin x and cos x' }],
  ['cos-2x-cos', DBL, '\\cos 2x', '2\\cos^2 x - 1', ['1 - 2\\cos^2 x', '2\\cos^2 x + 1', '\\cos^2 x - 1'], { ask: 'in terms of cos x only' }],
  ['cos-2x-sin', DBL, '\\cos 2x', '1 - 2\\sin^2 x', ['2\\sin^2 x - 1', '1 + 2\\sin^2 x', '1 - \\sin^2 x'], { ask: 'in terms of sin x only' }],
  ['tan-2x', DBL, '\\tan 2x', '\\dfrac{2\\tan x}{1 - \\tan^2 x}', ['\\dfrac{2\\tan x}{1 + \\tan^2 x}', '2\\tan x', '\\dfrac{\\tan x}{1 - \\tan^2 x}']],

  ['sin-sq', SQ, '\\sin^2 x', '\\tfrac{1}{2}(1 - \\cos 2x)', ['\\tfrac{1}{2}(1 + \\cos 2x)', '1 - \\cos 2x', '\\tfrac{1}{2}(\\cos 2x - 1)'], { ask: 'in terms of cos 2x' }],
  ['cos-sq', SQ, '\\cos^2 x', '\\tfrac{1}{2}(1 + \\cos 2x)', ['\\tfrac{1}{2}(1 - \\cos 2x)', '1 + \\cos 2x', '\\tfrac{1}{2}\\cos 2x + 1'], { ask: 'in terms of cos 2x' }],
  ['sin-cos', SQ, '\\sin x\\cos x', '\\tfrac{1}{2}\\sin 2x', ['2\\sin 2x', '\\sin 2x', '\\tfrac{1}{2}\\cos 2x'], { ask: 'in terms of sin 2x' }],

  ['sin-neg', SYM, '\\sin(-x)', '-\\sin x', ['\\sin x', '-\\cos x', '\\cos x']],
  ['cos-neg', SYM, '\\cos(-x)', '\\cos x', ['-\\cos x', '\\sin x', '-\\sin x']],
  ['tan-neg', SYM, '\\tan(-x)', '-\\tan x', ['\\tan x', '\\cot x', '-\\cot x']],
  ['sin-pi-minus', SYM, '\\sin(\\pi - x)', '\\sin x', ['-\\sin x', '\\cos x', '-\\cos x']],
  ['cos-pi-minus', SYM, '\\cos(\\pi - x)', '-\\cos x', ['\\cos x', '\\sin x', '-\\sin x']],
  ['tan-pi-minus', SYM, '\\tan(\\pi - x)', '-\\tan x', ['\\tan x', '\\cot x', '-\\cot x']],
  ['sin-pi-plus', SYM, '\\sin(\\pi + x)', '-\\sin x', ['\\sin x', '-\\cos x', '\\cos x']],
  ['cos-pi-plus', SYM, '\\cos(\\pi + x)', '-\\cos x', ['\\cos x', '-\\sin x', '\\sin x']],
  ['tan-pi-plus', SYM, '\\tan(\\pi + x)', '\\tan x', ['-\\tan x', '\\cot x', '-\\cot x']],
  ['sin-comp', SYM, '\\sin\\left(\\tfrac{\\pi}{2} - x\\right)', '\\cos x', ['\\sin x', '-\\cos x', '-\\sin x']],
  ['cos-comp', SYM, '\\cos\\left(\\tfrac{\\pi}{2} - x\\right)', '\\sin x', ['\\cos x', '-\\sin x', '-\\cos x']],
  ['tan-comp', SYM, '\\tan\\left(\\tfrac{\\pi}{2} - x\\right)', '\\cot x', ['\\tan x', '-\\tan x', '-\\cot x']],
]

// Fill-the-gap versions: the piece most often got wrong (usually a sign) is the gap.
const SIGN = ['+', '-']
const gaps: Record<string, [string, string]> = {
  'sin-sum': ['\\sin(x + y) = \\sin x\\cos y \\gap \\cos x\\sin y', '+'],
  'sin-diff': ['\\sin(x - y) = \\sin x\\cos y \\gap \\cos x\\sin y', '-'],
  'cos-sum': ['\\cos(x + y) = \\cos x\\cos y \\gap \\sin x\\sin y', '-'],
  'cos-diff': ['\\cos(x - y) = \\cos x\\cos y \\gap \\sin x\\sin y', '+'],
  'tan-sum': ['\\tan(x + y) = \\dfrac{\\tan x + \\tan y}{1 \\gap \\tan x\\tan y}', '-'],
  'tan-diff': ['\\tan(x - y) = \\dfrac{\\tan x - \\tan y}{1 \\gap \\tan x\\tan y}', '+'],
  'sin-2x': ['\\sin 2x = \\gap\\,\\sin x\\cos x', '2'],
  'cos-2x-cos': ['\\cos 2x = \\gap\\,\\cos^2 x - 1', '2'],
  'cos-2x-sin': ['\\cos 2x = 1 - \\gap\\,\\sin^2 x', '2'],
  'tan-2x': ['\\tan 2x = \\dfrac{2\\tan x}{1 \\gap \\tan^2 x}', '-'],
  'sin-sq': ['\\sin^2 x = \\tfrac{1}{2}(1 \\gap \\cos 2x)', '-'],
  'cos-sq': ['\\cos^2 x = \\tfrac{1}{2}(1 \\gap \\cos 2x)', '+'],
  'sin-cos': ['\\sin x\\cos x = \\gap\\,\\sin 2x', '1/2'],
  'cos-pi-minus': ['\\cos(\\pi - x) = \\gap\\cos x', '-'],
  'sin-pi-plus': ['\\sin(\\pi + x) = \\gap\\sin x', '-'],
  'tan-pi-minus': ['\\tan(\\pi - x) = \\gap\\tan x', '-'],
}

const tips: Record<string, string> = {
  'pyth-tan': 'Divide sin²x + cos²x = 1 by cos²x.',
  'pyth-cot': 'Divide sin²x + cos²x = 1 by sin²x.',
  'cos-sum': 'cos keeps the pair together (cos cos, sin sin) and flips the sign.',
  'cos-diff': 'cos keeps the pair together (cos cos, sin sin) and flips the sign.',
  'tan-sum': 'The top keeps the sign; the bottom flips it.',
  'tan-diff': 'The top keeps the sign; the bottom flips it.',
  'cos-2x-cos': 'Pick the form that leaves one trig function.',
  'cos-2x-sin': 'Pick the form that leaves one trig function.',
  'sin-sq': 'Rearranged from cos 2x = 1 − 2sin²x. Used to integrate sin²x.',
  'cos-sq': 'Rearranged from cos 2x = 2cos²x − 1. Used to integrate cos²x.',
  'sin-cos': 'Half of sin 2x = 2 sin x cos x.',
}

export const trigDeck: Deck = {
  id: 'trig-identities',
  title: 'Trig Identities',
  blurb: 'The circular-function identities to know by heart: definitions, Pythagorean, compound and double angle, squares for integration, and symmetry.',
  groups: [DEF, PYTH, COMP, DBL, SQ, SYM],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: t(front),
    back: t(back),
    traps: traps.map(t),
    // Symmetry results can't be asked backwards: −sin x is both sin(−x) and sin(π + x).
    oneWay: group === SYM || undefined,
    tip: tips[id],
    gap: gaps[id] && {
      tex: gaps[id][0],
      // A sign gap takes + or −; a number takes its usual forms too.
      answers: SIGN.includes(gaps[id][1]) ? [gaps[id][1]] : gaps[id][1] === '1/2' ? ['1/2', '0.5', '½'] : [gaps[id][1]],
    },
    ...extra,
  })),
  directionLabel: { fwd: 'Recall', rev: 'Recognise' },
  promptLabel: { fwd: 'Complete the identity', rev: 'Which expression is this?' },
  maxTraps: 3,
}
