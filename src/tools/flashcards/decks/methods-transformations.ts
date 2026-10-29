import type { Card, Deck, Face } from '../data'

// Mathematical Methods 3–4, Functions, relations and graphs: transformations of the plane —
// where a point goes, what each transformation does to y = f(x), reading a transformed rule
// back as words, and what happens to key features.

const t = (tex: string): Face => ({ tex })
const w = (text: string): Face => ({ text })
type F = string | Face
const face = (f: F): Face => (typeof f === 'string' ? t(f) : f)

/** [id, group, front, back, traps, extra] — strings are TeX, w('…') is words. */
type Row = [string, string, F, F, F[], Partial<Card>?]

const POINT = 'Images of a Point'
const RULE = 'Images of a Graph'
const READ = 'Reading a Rule'
const FEAT = 'Key Features'

const DIL_X = (k: string) => `Dilation by a factor of ${k} from the x-axis`
const DIL_Y = (k: string) => `Dilation by a factor of ${k} from the y-axis`
const TR = (k: string, dir: 'positive' | 'negative', axis: 'x' | 'y') => `Translation of ${k} in the ${dir} direction of the ${axis}-axis`

const POINT_ASK = 'image of the point (x, y)'
const RULE_ASK = 'image of the graph of y = f(x)'

const rows: Row[] = [
  ['p-dil-x', POINT, w(DIL_X('a')), '(x, y) \\to (x, ay)', ['(x, y) \\to (ax, y)', '(x, y) \\to \\left(x, \\dfrac{y}{a}\\right)', '(x, y) \\to (ax, ay)'], { ask: POINT_ASK, family: 'p-dil' }],
  ['p-dil-y', POINT, w(DIL_Y('b')), '(x, y) \\to (bx, y)', ['(x, y) \\to (x, by)', '(x, y) \\to \\left(\\dfrac{x}{b}, y\\right)', '(x, y) \\to (bx, by)'], { ask: POINT_ASK, family: 'p-dil' }],
  ['p-ref-x', POINT, w('Reflection in the x-axis'), '(x, y) \\to (x, -y)', ['(x, y) \\to (-x, y)', '(x, y) \\to (-x, -y)', '(x, y) \\to (y, x)'], { ask: POINT_ASK, family: 'p-ref' }],
  ['p-ref-y', POINT, w('Reflection in the y-axis'), '(x, y) \\to (-x, y)', ['(x, y) \\to (x, -y)', '(x, y) \\to (-x, -y)', '(x, y) \\to (y, x)'], { ask: POINT_ASK, family: 'p-ref' }],
  ['p-ref-yx', POINT, w('Reflection in the line y = x'), '(x, y) \\to (y, x)', ['(x, y) \\to (-y, -x)', '(x, y) \\to (-x, -y)', '(x, y) \\to (x, -y)'], { ask: POINT_ASK, family: 'p-ref', tip: 'This is how an inverse function is formed.' }],
  ['p-tr-x', POINT, w(TR('c units', 'positive', 'x')), '(x, y) \\to (x + c, y)', ['(x, y) \\to (x - c, y)', '(x, y) \\to (x, y + c)', '(x, y) \\to (cx, y)'], { ask: POINT_ASK, family: 'p-tr' }],
  ['p-tr-y', POINT, w(TR('d units', 'positive', 'y')), '(x, y) \\to (x, y + d)', ['(x, y) \\to (x + d, y)', '(x, y) \\to (x, y - d)', '(x, y) \\to (x, dy)'], { ask: POINT_ASK, family: 'p-tr' }],

  ['r-dil-x', RULE, w(DIL_X('a')), 'y = af(x)', ['y = f(ax)', 'y = f\\left(\\dfrac{x}{a}\\right)', 'y = \\dfrac{1}{a}f(x)'], { ask: RULE_ASK, family: 'r-dil' }],
  ['r-dil-y', RULE, w(DIL_Y('b')), 'y = f\\left(\\dfrac{x}{b}\\right)', ['y = f(bx)', 'y = bf(x)', 'y = \\dfrac{1}{b}f(x)'], { ask: RULE_ASK, family: 'r-dil', tip: 'Changes to x look backwards in the rule: x is replaced by x/b.' }],
  ['r-ref-x', RULE, w('Reflection in the x-axis'), 'y = -f(x)', ['y = f(-x)', 'y = -f(-x)', 'x = f(y)'], { ask: RULE_ASK, family: 'r-ref' }],
  ['r-ref-y', RULE, w('Reflection in the y-axis'), 'y = f(-x)', ['y = -f(x)', 'y = -f(-x)', 'x = f(y)'], { ask: RULE_ASK, family: 'r-ref' }],
  ['r-ref-yx', RULE, w('Reflection in the line y = x'), 'x = f(y)', ['y = -f(x)', 'y = f(-x)', 'y = \\dfrac{1}{f(x)}'], { ask: RULE_ASK, family: 'r-ref' }],
  ['r-tr-x', RULE, w(TR('c units', 'positive', 'x')), 'y = f(x - c)', ['y = f(x + c)', 'y = f(x) + c', 'y = f(x) - c'], { ask: RULE_ASK, family: 'r-tr', tip: 'Changes to x look backwards in the rule: x is replaced by x − c.' }],
  ['r-tr-y', RULE, w(TR('d units', 'positive', 'y')), 'y = f(x) + d', ['y = f(x) - d', 'y = f(x + d)', 'y = f(x - d)'], { ask: RULE_ASK, family: 'r-tr' }],

  ['read-3f', READ, 'y = 3f(x)', w(DIL_X('3')), [w(DIL_Y('3')), w(DIL_X('⅓')), w(DIL_Y('⅓'))], { family: 'read-dil' }],
  ['read-f2x', READ, 'y = f(2x)', w(DIL_Y('½')), [w(DIL_Y('2')), w(DIL_X('2')), w(DIL_X('½'))], { family: 'read-dil' }],
  ['read-fx3', READ, 'y = f\\left(\\dfrac{x}{3}\\right)', w(DIL_Y('3')), [w(DIL_Y('⅓')), w(DIL_X('3')), w(DIL_X('⅓'))], { family: 'read-dil' }],
  ['read-half-f', READ, 'y = \\tfrac{1}{2}f(x)', w(DIL_X('½')), [w(DIL_X('2')), w(DIL_Y('½')), w(DIL_Y('2'))], { family: 'read-dil' }],
  ['read-fx+2', READ, 'y = f(x + 2)', w(TR('2 units', 'negative', 'x')), [w(TR('2 units', 'positive', 'x')), w(TR('2 units', 'positive', 'y')), w(TR('2 units', 'negative', 'y'))], { family: 'read-tr' }],
  ['read-fx-4', READ, 'y = f(x) - 4', w(TR('4 units', 'negative', 'y')), [w(TR('4 units', 'positive', 'y')), w(TR('4 units', 'positive', 'x')), w(TR('4 units', 'negative', 'x'))], { family: 'read-tr' }],
  ['read-f-x', READ, 'y = f(-x)', w('Reflection in the y-axis'), [w('Reflection in the x-axis'), w('Reflection in the line y = x'), w('Reflection in both axes')], { family: 'read-ref' }],
  ['read--f', READ, 'y = -f(x)', w('Reflection in the x-axis'), [w('Reflection in the y-axis'), w('Reflection in the line y = x'), w('Reflection in both axes')], { family: 'read-ref' }],
  ['read-dil-first', READ, 'y = f\\big(2(x - 1)\\big)', w(`${DIL_Y('½')}, then a translation of 1 unit in the positive direction of the x-axis`), [w(`${DIL_Y('2')}, then a translation of 1 unit in the positive direction of the x-axis`), w(`${DIL_Y('½')}, then a translation of 2 units in the positive direction of the x-axis`), w(`${DIL_Y('½')}, then a translation of 1 unit in the negative direction of the x-axis`)], { ask: 'the dilation first', family: 'read-order', oneWay: true, tip: 'Factor the inside first: the number inside the brackets is the translation.' }],
  ['read-tr-first', READ, 'y = f(2x - 2)', w(`Translation of 2 units in the positive direction of the x-axis, then a ${DIL_Y('½').toLowerCase()}`), [w(`Translation of 1 unit in the positive direction of the x-axis, then a ${DIL_Y('½').toLowerCase()}`), w(`Translation of 2 units in the negative direction of the x-axis, then a ${DIL_Y('½').toLowerCase()}`), w(`Translation of 2 units in the positive direction of the x-axis, then a ${DIL_Y('2').toLowerCase()}`)], { ask: 'the translation first', family: 'read-order', oneWay: true, tip: 'Translate first: f(x − 2); then dilate: x becomes 2x, giving f(2x − 2).' }],

  ['f-vasym-dil', FEAT, w(`Vertical asymptote x = h, after a ${DIL_Y('b').toLowerCase()}`), 'x = bh', ['x = \\dfrac{h}{b}', 'x = h', 'x = h + b'], { family: 'feat' }],
  ['f-hasym-tr', FEAT, w(`Horizontal asymptote y = k, after a ${TR('d units', 'positive', 'y').toLowerCase()}`), 'y = k + d', ['y = k', 'y = k - d', 'y = dk'], { family: 'feat' }],
  ['f-hasym-dil-y', FEAT, w(`Horizontal asymptote y = k, after a ${DIL_Y('b').toLowerCase()}`), 'y = k', ['y = bk', 'y = \\dfrac{k}{b}', 'y = k + b'], { family: 'feat', tip: 'A dilation from the y-axis moves points sideways only.' }],
  ['f-xint-dil-x', FEAT, w(`x-intercept (p, 0), after a ${DIL_X('a').toLowerCase()}`), '(p, 0)', ['(ap, 0)', '(p, a)', '\\left(\\dfrac{p}{a}, 0\\right)'], { family: 'feat', tip: 'y = 0 stays 0 when multiplied by a.' }],
  ['f-tp-ref-x', FEAT, w('Local maximum at (p, q), after a reflection in the x-axis'), w('Local minimum at (p, −q)'), [w('Local maximum at (p, −q)'), w('Local minimum at (−p, q)'), w('Local maximum at (−p, q)')], { family: 'feat-tp' }],
  ['f-tp-ref-y', FEAT, w('Local maximum at (p, q), after a reflection in the y-axis'), w('Local maximum at (−p, q)'), [w('Local minimum at (−p, q)'), w('Local maximum at (p, −q)'), w('Local minimum at (p, −q)')], { family: 'feat-tp' }],
]

const gaps: Record<string, Card['gap']> = {
  'r-tr-x': { tex: '\\text{right } c: \\quad y = f(x \\gap c)', answers: ['-'] },
  'p-ref-x': { tex: '\\text{reflect in the x-axis:}\\quad (x, y) \\to (x, \\gap y)', answers: ['-'] },
}

export const methodsTransformationsDeck: Deck = {
  id: 'methods-transformations',
  title: 'Transformations',
  blurb: 'Dilations, reflections and translations: where a point goes, what happens to y = f(x), how to read a transformed rule, and what happens to key features.',
  groups: [POINT, RULE, READ, FEAT],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: face(front),
    back: face(back),
    traps: traps.map(face),
    // A feature's new position (y = k, (p, 0)) can come from more than one transformation.
    oneWay: group === FEAT || undefined,
    gap: gaps[id],
    ...extra,
  })),
  directionLabel: { fwd: 'Recall', rev: 'Name it' },
  promptLabel: { fwd: 'Recall', rev: 'Which one matches this?' },
  maxTraps: 3,
  source: 'VCE Mathematical Methods Study Design 2023–2027, Units 3 and 4, Functions, relations and graphs (transformations)',
}
