import type { Card, Deck, Face } from '../data'

// Specialist Units 3 & 4, Space and measurement: vector and Cartesian equations. Vector,
// parametric and Cartesian forms of lines and planes, how lines and planes relate, and the
// angle and distance formulas built from the scalar and vector products.

type F = string | Face
const f = (x: F): Face => (typeof x === 'string' ? { tex: x } : x)
const w = (text: string): Face => ({ text })

/** [id, group, front, back, traps, extra] — a string is TeX, w() is words. */
type Row = [string, string, F, F, F[], Partial<Card>?]

const v = (c: string) => `\\underset{\\sim}{${c}}`
const R = v('r'), A = v('a'), B = v('b'), C = v('c'), D = v('d'), N = v('n'), I = v('i'), J = v('j'), K = v('k'), O = v('0')
const D1 = `${v('d')}_1`, D2 = `${v('d')}_2`, N1 = `${v('n')}_1`, N2 = `${v('n')}_2`
const AB = '\\overrightarrow{AB}', AC = '\\overrightarrow{AC}', AP = '\\overrightarrow{AP}'
const LINE_R = `${R} = (x_1${I} + y_1${J} + z_1${K}) + \\lambda(d_1${I} + d_2${J} + d_3${K})`

const LINES = 'Lines'
const PLANES = 'Planes'
const MEASURE = 'Angles & Distances'

const rows: Row[] = [
  // Lines
  ['line-vec', LINES, w('Vector equation of the line through A (position vector a) with direction d'), `${R} = ${A} + \\lambda ${D},\\ \\lambda\\in R`, [`${R} = ${D} + \\lambda ${A},\\ \\lambda\\in R`, `${R}\\cdot ${D} = ${A}\\cdot ${D}`, `${R} = \\lambda(${A} + ${D}),\\ \\lambda\\in R`], { family: 'eqn' }],
  ['line-dir', LINES, w('A direction vector for the line through A and B'), `${AB} = ${B} - ${A}`, [`${A} + ${B}`, `\\tfrac{1}{2}(${A} + ${B})`, `${A}\\times ${B}`]],
  ['line-param', LINES, LINE_R, 'x = x_1 + \\lambda d_1,\\ y = y_1 + \\lambda d_2,\\ z = z_1 + \\lambda d_3', ['x = d_1 + \\lambda x_1,\\ y = d_2 + \\lambda y_1,\\ z = d_3 + \\lambda z_1', 'x = \\lambda(x_1 + d_1),\\ y = \\lambda(y_1 + d_2),\\ z = \\lambda(z_1 + d_3)', 'x = x_1 + d_1,\\ y = y_1 + d_2,\\ z = z_1 + \\lambda d_3'], { ask: 'parametric form', oneWay: true }],
  ['line-cart', LINES, LINE_R, '\\dfrac{x - x_1}{d_1} = \\dfrac{y - y_1}{d_2} = \\dfrac{z - z_1}{d_3}', ['\\dfrac{x - d_1}{x_1} = \\dfrac{y - d_2}{y_1} = \\dfrac{z - d_3}{z_1}', '\\dfrac{x + x_1}{d_1} = \\dfrac{y + y_1}{d_2} = \\dfrac{z + z_1}{d_3}', 'd_1(x - x_1) + d_2(y - y_1) + d_3(z - z_1) = 0'], { ask: 'Cartesian form (d₁, d₂, d₃ all non-zero)', oneWay: true, tip: 'Make λ the subject of each parametric equation. The last option is a plane.' }],
  ['line-cart-zero', LINES, w('Cartesian form of r = (x₁, y₁, z₁) + λ(d₁, 0, d₃)'), '\\dfrac{x - x_1}{d_1} = \\dfrac{z - z_1}{d_3},\\ y = y_1', ['\\dfrac{x - x_1}{d_1} = \\dfrac{y - y_1}{0} = \\dfrac{z - z_1}{d_3}', '\\dfrac{x - x_1}{d_1} = \\dfrac{z - z_1}{d_3},\\ y = 0', '\\dfrac{x - x_1}{d_1} = \\dfrac{z - z_1}{d_3}'], { oneWay: true, tip: 'Never divide by a zero component: state y = y₁ separately.' }],
  ['parallel-lines', LINES, w('Two lines are parallel'), w('Their direction vectors are scalar multiples of each other'), [w('Their direction vectors have a dot product of 0'), w('They share a point'), w('Their position vectors are scalar multiples of each other')], { family: 'rel' }],
  ['perp-lines', LINES, w('Two lines are perpendicular'), `${D1}\\cdot ${D2} = 0`, [`${D1}\\times ${D2} = ${O}`, `${D1} = k${D2}`, `${D1}\\cdot ${D2} = 1`], { family: 'rel' }],
  ['skew', LINES, w('Skew lines'), w('Lines in 3D that are not parallel and do not intersect'), [w('Lines that are perpendicular but do not intersect'), w('Parallel lines that do not intersect'), w('Lines that intersect at an angle other than 90°')], { tip: 'Skew lines are never coplanar.' }],

  // Planes
  ['plane-vec', PLANES, w('Vector equation of the plane through A (position vector a) with normal n'), `${R}\\cdot ${N} = ${A}\\cdot ${N}`, [`${R} = ${A} + \\lambda ${N}`, `${R}\\times ${N} = ${A}\\times ${N}`, `${R}\\cdot ${A} = ${N}\\cdot ${N}`], { family: 'eqn', tip: 'From (r − a) · n = 0: every direction in the plane is perpendicular to n.' }],
  ['plane-cart', PLANES, w('Cartesian equation of a plane with normal ai + bj + ck'), 'ax + by + cz = d', ['\\dfrac{x}{a} = \\dfrac{y}{b} = \\dfrac{z}{c}', '\\dfrac{x}{a} + \\dfrac{y}{b} + \\dfrac{z}{c} = 1', 'x + y + z = a + b + c'], { tip: 'Find d by substituting a point on the plane.' }],
  ['normal-read', PLANES, '2x - y + 3z = 5', `2${I} - ${J} + 3${K}`, [`2${I} + ${J} + 3${K}`, `5${I} + 5${J} + 5${K}`, `\\tfrac{5}{2}${I} - 5${J} + \\tfrac{5}{3}${K}`], { ask: 'a normal vector', oneWay: true, tip: 'Read the coefficients of x, y and z.' }],
  ['plane-param', PLANES, w('Parametric (vector) form of the plane through A containing directions b and c'), `${R} = ${A} + \\lambda ${B} + \\mu ${C},\\ \\lambda, \\mu\\in R`, [`${R} = ${A} + \\lambda(${B}\\times ${C}),\\ \\lambda\\in R`, `${R} = \\lambda ${A} + \\mu ${B} + ${C},\\ \\lambda, \\mu\\in R`, `${R}\\cdot(${B} + ${C}) = ${A}\\cdot(${B} + ${C})`], { family: 'eqn' }],
  ['normal-param', PLANES, w('A normal to the plane r = a + λb + μc'), `${B}\\times ${C}`, [`${B}\\cdot ${C}`, `${A}\\times ${B}`, `${B} + ${C}`], { family: 'normal' }],
  ['normal-3pts', PLANES, w('A normal to the plane through A, B and C'), `${AB}\\times ${AC}`, [`${AB}\\cdot ${AC}`, `${AB} + ${AC}`, '\\overrightarrow{OA}\\times\\overrightarrow{OB}'], { family: 'normal' }],
  ['parallel-planes', PLANES, w('Two planes are parallel'), w('Their normals are scalar multiples of each other'), [w('Their normals are perpendicular'), w('They share a point'), w('Their normals have equal magnitudes')], { family: 'rel' }],
  ['line-par-plane', PLANES, w('A line (direction d) is parallel to a plane (normal n)'), `${D}\\cdot ${N} = 0`, [`${D}\\times ${N} = ${O}`, `${D} = ${N}`, `${D}\\cdot ${N} = 1`], { family: 'ln-pl' }],
  ['line-perp-plane', PLANES, w('A line (direction d) is perpendicular to a plane (normal n)'), `${D} = k${N},\\ k\\in R\\setminus\\{0\\}`, [`${D}\\cdot ${N} = 0`, `${D}\\cdot ${N} = 1`, `|${D}| = |${N}|`], { family: 'ln-pl' }],
  ['plane-plane', PLANES, w('Direction of the line where two planes (normals n₁ and n₂) meet'), `${N1}\\times ${N2}`, [`${N1} + ${N2}`, `${N1}\\cdot ${N2}`, `${N1} - ${N2}`], { family: 'normal', tip: 'The line lies in both planes, so it is perpendicular to both normals.' }],

  // Angles and distances
  ['angle-lines', MEASURE, '\\cos\\theta', `\\dfrac{|${D1}\\cdot ${D2}|}{|${D1}|\\,|${D2}|}`, [`\\dfrac{|${D1}\\times ${D2}|}{|${D1}|\\,|${D2}|}`, `\\dfrac{${D1}\\cdot ${D2}}{|${D1}| + |${D2}|}`, `|${D1}\\cdot ${D2}|`], { ask: 'θ the acute angle between lines with directions d₁ and d₂', oneWay: true, family: 'angle' }],
  ['angle-planes', MEASURE, '\\cos\\theta', `\\dfrac{|${N1}\\cdot ${N2}|}{|${N1}|\\,|${N2}|}`, [`\\dfrac{|${N1}\\times ${N2}|}{|${N1}|\\,|${N2}|}`, `\\dfrac{${N1}\\cdot ${N2}}{|${N1}| + |${N2}|}`, `1 - \\dfrac{|${N1}\\cdot ${N2}|}{|${N1}|\\,|${N2}|}`], { ask: 'θ the acute angle between planes with normals n₁ and n₂', oneWay: true, family: 'angle' }],
  ['angle-line-plane', MEASURE, '\\sin\\theta', `\\dfrac{|${D}\\cdot ${N}|}{|${D}|\\,|${N}|}`, [`\\dfrac{|${D}\\times ${N}|}{|${D}|\\,|${N}|}`, `\\dfrac{|${D}\\cdot ${N}|}{|${N}|}`, `1 - \\dfrac{|${D}\\cdot ${N}|}{|${D}|\\,|${N}|}`], { ask: 'θ the acute angle between a line (direction d) and a plane (normal n)', oneWay: true, family: 'angle', tip: 'The line makes π/2 − θ with the normal, so cos becomes sin.' }],
  ['dist-plane', MEASURE, w('Distance from P to the plane through A with normal n'), `\\dfrac{|${AP}\\cdot ${N}|}{|${N}|}`, [`|${AP}\\cdot ${N}|`, `\\dfrac{|${AP}\\times ${N}|}{|${N}|}`, `\\dfrac{${AP}\\cdot ${N}}{|${N}|^2}`], { family: 'dist', tip: 'The size of the scalar resolute of AP along n.' }],
  ['dist-line', MEASURE, w('Distance from P to the line through A with direction d'), `\\dfrac{|${AP}\\times ${D}|}{|${D}|}`, [`\\dfrac{|${AP}\\cdot ${D}|}{|${D}|}`, `|${AP}\\times ${D}|`, `\\dfrac{|${AP}\\times ${D}|}{|${AP}|}`], { family: 'dist', tip: 'The size of the vector resolute of AP perpendicular to d.' }],
]

export const specialistLinesPlanesDeck: Deck = {
  id: 'specialist-lines-planes',
  title: 'Lines & Planes',
  blurb: 'Vector, parametric and Cartesian equations of lines and planes, how they relate, and the angle and distance formulas.',
  groups: [LINES, PLANES, MEASURE],
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
  source: "VCE Specialist Mathematics Study Design 2023–2027, Units 3 & 4: Vector and Cartesian equations; KZ's Vector Equations and Planes lectures",
}
