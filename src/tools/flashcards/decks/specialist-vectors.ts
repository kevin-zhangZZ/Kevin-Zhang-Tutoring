import type { Card, Deck, Face } from '../data'

// Specialist Units 3 & 4, Space and measurement: vectors. Magnitude and unit vectors, the
// scalar product and resolutes, the vector product, and parallel / linearly dependent vectors.

type F = string | Face
const f = (x: F): Face => (typeof x === 'string' ? { tex: x } : x)
const w = (text: string): Face => ({ text })

/** [id, group, front, back, traps, extra] — a string is TeX, w() is words. */
type Row = [string, string, F, F, F[], Partial<Card>?]

// Vectors as VCAA writes them: a tilde underneath.
const v = (c: string) => `\\underset{\\sim}{${c}}`
const A = v('a'), B = v('b'), C = v('c'), I = v('i'), J = v('j'), K = v('k'), O = v('0')
const AH = v('\\hat{a}'), BH = v('\\hat{b}')
const OA = '\\overrightarrow{OA}', OB = '\\overrightarrow{OB}', AB = '\\overrightarrow{AB}', AC = '\\overrightarrow{AC}'
const COMP = 'a = a₁i + a₂j + a₃k, b = b₁i + b₂j + b₃k'

const BASIC = 'Magnitude & Position'
const DOT = 'Scalar Product'
const RES = 'Resolutes'
const CROSS = 'Vector Product'
const DEP = 'Parallel & Dependence'

const rows: Row[] = [
  // Magnitude and position vectors
  ['mag', BASIC, `|${A}|`, '\\sqrt{a_1^2 + a_2^2 + a_3^2}', ['a_1^2 + a_2^2 + a_3^2', 'a_1 + a_2 + a_3', '\\sqrt{a_1 + a_2 + a_3}'], { ask: 'a = a₁i + a₂j + a₃k' }],
  ['unit', BASIC, AH, `\\dfrac{${A}}{|${A}|}`, [`|${A}|\\,${A}`, `\\dfrac{${A}}{|${A}|^2}`, `\\dfrac{1}{|${A}|}`], { tip: 'A unit vector has magnitude 1 and the same direction as a.' }],
  ['dir-cos', BASIC, '\\cos\\alpha', `\\dfrac{a_1}{|${A}|}`, [`\\dfrac{a_1}{a_2}`, `\\dfrac{|${A}|}{a_1}`, `a_1|${A}|`], { ask: 'α is the angle between a = a₁i + a₂j + a₃k and the x-axis' }],
  ['AB', BASIC, AB, `${OB} - ${OA}`, [`${OA} - ${OB}`, `${OA} + ${OB}`, `\\tfrac{1}{2}(${OA} + ${OB})`], { ask: 'in terms of position vectors', tip: 'Head minus tail.' }],
  ['midpoint', BASIC, '\\overrightarrow{OM}', `\\tfrac{1}{2}(${OA} + ${OB})`, [`\\tfrac{1}{2}(${OB} - ${OA})`, `${OA} + ${OB}`, `${OA} + \\tfrac{1}{2}${OB}`], { ask: 'M is the midpoint of AB' }],
  ['ratio', BASIC, '\\overrightarrow{OC}', `\\dfrac{n}{m + n}${OA} + \\dfrac{m}{m + n}${OB}`, [`\\dfrac{m}{m + n}${OA} + \\dfrac{n}{m + n}${OB}`, `\\dfrac{n}{m}${OA} + \\dfrac{m}{n}${OB}`, `${OA} + \\dfrac{m}{n}${AB}`], { ask: 'C lies on AB with AC : CB = m : n', tip: 'From OA + (m/(m + n))AB. Check with m = n: the midpoint.' }],

  // Scalar product
  ['dot-comp', DOT, `${A}\\cdot ${B}`, 'a_1b_1 + a_2b_2 + a_3b_3', ['a_1b_1 - a_2b_2 + a_3b_3', '(a_1 + a_2 + a_3)(b_1 + b_2 + b_3)', `a_1b_1${I} + a_2b_2${J} + a_3b_3${K}`], { ask: COMP }],
  ['dot-angle', DOT, `${A}\\cdot ${B}`, `|${A}|\\,|${B}|\\cos\\theta`, [`|${A}|\\,|${B}|\\sin\\theta`, '\\cos\\theta', `|${A}| + |${B}|\\cos\\theta`], { ask: 'θ is the angle between a and b' }],
  ['cos-angle', DOT, '\\cos\\theta', `\\dfrac{${A}\\cdot ${B}}{|${A}|\\,|${B}|}`, [`\\dfrac{|${A}\\times ${B}|}{|${A}|\\,|${B}|}`, `\\dfrac{|${A}|\\,|${B}|}{${A}\\cdot ${B}}`, `\\dfrac{${A}\\cdot ${B}}{|${A}|^2}`], { ask: 'θ is the angle between a and b' }],
  ['angle-range', DOT, w('The angle θ between two vectors'), '0 \\le \\theta \\le \\pi', ['0 \\le \\theta \\le \\tfrac{\\pi}{2}', '-\\pi < \\theta \\le \\pi', '0 \\le \\theta < 2\\pi'], { oneWay: true, tip: 'Placed tail to tail; obtuse angles are allowed.' }],
  ['a-dot-a', DOT, `${A}\\cdot ${A}`, `|${A}|^2`, [`|${A}|`, '1', '0']],
  ['i-dot-j', DOT, `${I}\\cdot ${J}`, '0', ['1', K, `-${K}`], { back: { tex: '0', plain: '0' } }],
  ['perp', DOT, `${A}\\cdot ${B} = 0`, w('a and b are perpendicular'), [w('a and b are parallel'), w('a = b'), w('a and b point in opposite directions')], { ask: 'a and b non-zero', family: 'relation' }],
  ['obtuse', DOT, `${A}\\cdot ${B} < 0`, w('The angle between a and b is obtuse'), [w('The angle between a and b is acute'), w('a and b are perpendicular'), w('a and b are parallel')], { ask: 'a and b non-zero', family: 'relation' }],

  // Resolutes
  ['scalar-res', RES, w('The scalar resolute of a in the direction of b'), `${A}\\cdot ${BH}`, [`${B}\\cdot ${AH}`, `(${A}\\cdot ${BH})\\,${BH}`, `${A}\\cdot ${B}`], { family: 'res', tip: 'Also written (a · b)/|b|. It is a number, negative if the angle is obtuse.' }],
  ['vector-res', RES, w('The vector resolute of a in the direction of b'), `(${A}\\cdot ${BH})\\,${BH}`, [`(${B}\\cdot ${AH})\\,${AH}`, `${A}\\cdot ${BH}`, `(${A}\\cdot ${B})\\,${B}`], { family: 'res', tip: 'Also written ((a · b)/(b · b)) b.' }],
  ['perp-res', RES, w('The vector resolute of a perpendicular to b'), `${A} - (${A}\\cdot ${BH})\\,${BH}`, [`(${A}\\cdot ${BH})\\,${BH} - ${A}`, `${B} - (${B}\\cdot ${AH})\\,${AH}`, `${A}\\times ${BH}`], { family: 'res', tip: 'a minus its part along b.' }],
  ['vector-res-alt', RES, `(${A}\\cdot ${BH})\\,${BH}`, `\\dfrac{${A}\\cdot ${B}}{${B}\\cdot ${B}}\\,${B}`, [`\\dfrac{${A}\\cdot ${B}}{|${B}|}\\,${B}`, `\\dfrac{${A}\\cdot ${B}}{${A}\\cdot ${A}}\\,${B}`, `\\dfrac{${A}\\cdot ${B}}{${B}\\cdot ${B}}\\,${A}`], { ask: 'without unit vectors' }],

  // Vector product
  ['cross-det', CROSS, `${A}\\times ${B}`, `\\begin{vmatrix} ${I} & ${J} & ${K} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}`, [
    `\\begin{vmatrix} a_1 & a_2 & a_3 \\\\ ${I} & ${J} & ${K} \\\\ b_1 & b_2 & b_3 \\end{vmatrix}`,
    `\\begin{vmatrix} ${I} & ${J} & ${K} \\\\ b_1 & b_2 & b_3 \\\\ a_1 & a_2 & a_3 \\end{vmatrix}`,
    `\\begin{vmatrix} a_1 & a_2 \\\\ b_1 & b_2 \\end{vmatrix}${K}`,
  ], { ask: `as a determinant, ${COMP}` }],
  ['cross-comp', CROSS, `${A}\\times ${B}`, `(a_2b_3 - a_3b_2)${I} - (a_1b_3 - a_3b_1)${J} + (a_1b_2 - a_2b_1)${K}`, [
    `(a_2b_3 - a_3b_2)${I} + (a_1b_3 - a_3b_1)${J} + (a_1b_2 - a_2b_1)${K}`,
    `(a_3b_2 - a_2b_3)${I} - (a_1b_3 - a_3b_1)${J} + (a_1b_2 - a_2b_1)${K}`,
    `a_1b_1${I} + a_2b_2${J} + a_3b_3${K}`,
  ], {
    ask: `in components, ${COMP}`, tip: 'Expand the determinant along the top row: the j term takes a minus.',
    gap: { tex: `${A}\\times ${B} = (a_2b_3 - a_3b_2)${I} \\gap (a_1b_3 - a_3b_1)${J} + (a_1b_2 - a_2b_1)${K}`, answers: ['-'] },
  }],
  ['cross-mag', CROSS, `|${A}\\times ${B}|`, `|${A}|\\,|${B}|\\sin\\theta`, [`|${A}|\\,|${B}|\\cos\\theta`, `(${A}\\cdot ${B})\\sin\\theta`, `|${A}|\\,|${B}|\\tan\\theta`], { ask: 'θ is the angle between a and b' }],
  ['cross-anti', CROSS, `${B}\\times ${A}`, `-(${A}\\times ${B})`, [`${A}\\times ${B}`, `${A}\\cdot ${B}`, O], { tip: 'The vector product is not commutative.' }],
  ['cross-self', CROSS, `${A}\\times ${A}`, O, [`|${A}|^2`, '0', '1'], { tip: 'The zero vector, not the number 0.' }],
  ['cross-dir', CROSS, w('The direction of a × b'), w('Perpendicular to both a and b, by the right-hand rule'), [w('In the plane of a and b, between them'), w('Parallel to a + b'), w('Perpendicular to a only')]],
  ['area-para', CROSS, w('Area of the parallelogram with sides a and b'), `|${A}\\times ${B}|`, [`\\tfrac{1}{2}|${A}\\times ${B}|`, `${A}\\cdot ${B}`, `|${A}|\\,|${B}|`], { family: 'area' }],
  ['area-tri', CROSS, w('Area of triangle ABC'), `\\tfrac{1}{2}\\left|${AB}\\times ${AC}\\right|`, [`\\left|${AB}\\times ${AC}\\right|`, `\\tfrac{1}{2}\\,${AB}\\cdot ${AC}`, `\\tfrac{1}{2}\\left|${AB}\\right|\\left|${AC}\\right|`], { family: 'area' }],
  ['ixj', CROSS, `${I}\\times ${J}`, K, [`-${K}`, O, '1'], { family: 'ijk' }],
  ['jxk', CROSS, `${J}\\times ${K}`, I, [`-${I}`, O, '1'], { family: 'ijk' }],
  ['kxi', CROSS, `${K}\\times ${I}`, J, [`-${J}`, O, '1'], { family: 'ijk' }],
  ['jxi', CROSS, `${J}\\times ${I}`, `-${K}`, [K, O, '-1'], { family: 'ijk', tip: 'Against the cycle i → j → k, so negative.' }],
  ['cross-zero', CROSS, `${A}\\times ${B} = ${O}`, w('a and b are parallel'), [w('a and b are perpendicular'), w('a = b'), w('a and b are unit vectors')], { ask: 'a and b non-zero', family: 'relation' }],

  // Parallel and linear dependence
  ['parallel', DEP, w('Non-zero vectors a and b are parallel'), `${A} = k${B},\\ k\\in R\\setminus\\{0\\}`, [`${A}\\cdot ${B} = 0`, `|${A}| = |${B}|`, `${A} = ${B} + k${I}`], { oneWay: true }],
  ['dep-two', DEP, w('Two non-zero vectors are linearly dependent'), w('if and only if they are parallel'), [w('if and only if they are perpendicular'), w('if and only if they have equal magnitudes'), w('if and only if they are unit vectors')], { oneWay: true }],
  ['dep-three', DEP, w('a, b, c are linearly dependent (a and b not parallel)'), `${C} = m${A} + n${B},\\ m, n\\in R`, [`${C} = m(${A}\\times ${B}),\\ m\\in R`, `${C}\\cdot ${A} = ${C}\\cdot ${B} = 0`, `|${C}| = |${A}| + |${B}|`], { oneWay: true }],
  ['dep-geom', DEP, w('Three linearly dependent vectors, geometrically'), w('They are coplanar'), [w('They are mutually perpendicular'), w('They are all parallel to one another'), w('They have equal magnitudes')]],
  ['indep-def', DEP, w('a, b, c are linearly independent'), `m${A} + n${B} + p${C} = ${O} \\implies m = n = p = 0`, [`m${A} + n${B} + p${C} = ${O}\\ \\text{for some } m, n, p`, `${A}\\cdot ${B} = ${B}\\cdot ${C} = ${C}\\cdot ${A} = 0`, `${A} + ${B} + ${C} \\ne ${O}`], { oneWay: true }],
  ['equate', DEP, `m${A} + n${B} = p${A} + q${B}`, 'm = p,\\ n = q', ['m + n = p + q', 'm = q,\\ n = p', 'mn = pq'], { ask: 'a and b non-zero and not parallel', tip: 'Equating coefficients: the key step in vector proofs.' }],
]

export const specialistVectorsDeck: Deck = {
  id: 'specialist-vectors',
  title: 'Vectors',
  blurb: 'Magnitude, unit and position vectors, the scalar product and resolutes, the vector product, and parallel and linearly dependent vectors.',
  groups: [BASIC, DOT, RES, CROSS, DEP],
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
  source: 'VCE Specialist Mathematics Study Design 2023–2027, Units 3 & 4: Vectors',
}
