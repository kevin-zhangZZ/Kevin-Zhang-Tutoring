import type { Card, Deck, Face } from '../data'

// Specialist Units 3 & 4, Algebra, number and structure: complex numbers. Cartesian and polar
// form, De Moivre's theorem and roots, polynomials over C, and regions of the complex plane.

type F = string | Face
const f = (x: F): Face => (typeof x === 'string' ? { tex: x } : x)
const w = (text: string): Face => ({ text })

/** [id, group, front, back, traps, extra] — a string is TeX, w() is words. */
type Row = [string, string, F, F, F[], Partial<Card>?]

const CIS = '\\operatorname{cis}'
const ARG = '\\operatorname{Arg}'
const RE = '\\operatorname{Re}'
const IM = '\\operatorname{Im}'
const Z = 'z = x + yi'

const CART = 'Cartesian Form'
const POLAR = 'Polar Form'
const DM = 'De Moivre & Roots'
const POLY = 'Polynomials'
const REG = 'Regions'

const rows: Row[] = [
  // Cartesian form
  ['mod', CART, '|z|', '\\sqrt{x^2 + y^2}', ['x^2 + y^2', '\\sqrt{x^2 - y^2}', 'x + y'], { ask: Z }],
  ['conj', CART, '\\overline{z}', 'x - yi', ['-x + yi', '-x - yi', 'y + xi'], { ask: Z }],
  ['z-zbar', CART, 'z\\overline{z}', '|z|^2', ['|z|', `2${RE}(z)`, 'z^2'], { tip: '(x + yi)(x − yi) = x² + y²: always real.' }],
  ['z-plus-zbar', CART, 'z + \\overline{z}', `2${RE}(z)`, [`2${IM}(z)`, `2i${IM}(z)`, '0'], { family: 'z-zbar' }],
  ['z-minus-zbar', CART, 'z - \\overline{z}', `2i${IM}(z)`, [`2${IM}(z)`, `2${RE}(z)`, '0'], { family: 'z-zbar' }],
  ['recip', CART, '\\dfrac{1}{z}', '\\dfrac{\\overline{z}}{|z|^2}', ['\\dfrac{\\overline{z}}{|z|}', '\\dfrac{z}{|z|^2}', '\\overline{z}'], { ask: 'in terms of z̄ and |z|', tip: 'Multiply top and bottom by z̄.' }],
  ['conj-prod', CART, '\\overline{z_1 z_2}', '\\overline{z_1}\\,\\overline{z_2}', ['z_1\\overline{z_2}', '\\overline{z_1} + \\overline{z_2}', '-z_1 z_2']],

  // Polar form
  ['polar', POLAR, `r${CIS}(\\theta)`, 'r(\\cos(\\theta) + i\\sin(\\theta))', ['r(\\sin(\\theta) + i\\cos(\\theta))', 'r(\\cos(\\theta) - i\\sin(\\theta))', '\\cos(r\\theta) + i\\sin(r\\theta)']],
  ['x-polar', POLAR, 'x', 'r\\cos(\\theta)', ['r\\sin(\\theta)', '\\dfrac{\\cos(\\theta)}{r}', 'r\\tan(\\theta)'], { ask: `for ${Z} = r cis(θ)`, family: 'xy' }],
  ['y-polar', POLAR, 'y', 'r\\sin(\\theta)', ['r\\cos(\\theta)', '\\dfrac{\\sin(\\theta)}{r}', 'r\\tan(\\theta)'], { ask: `for ${Z} = r cis(θ)`, family: 'xy' }],
  ['tan-arg', POLAR, '\\tan(\\theta)', '\\dfrac{y}{x}', ['\\dfrac{x}{y}', '\\dfrac{y}{r}', '\\dfrac{x}{r}'], { ask: `for ${Z} = r cis(θ)`, family: 'xy', tip: 'Check the quadrant: tan⁻¹(y/x) alone is only right in quadrants 1 and 4.' }],
  ['arg-range', POLAR, w('The principal argument Arg(z) lies in'), '(-\\pi, \\pi]', ['[-\\pi, \\pi)', '[0, 2\\pi)', '[-\\pi, \\pi]'], { oneWay: true, tip: '−π is left out, so Arg(−1) = π.' }],
  ['mod-prod', POLAR, '|z_1 z_2|', '|z_1|\\,|z_2|', ['|z_1| + |z_2|', '|z_1|^2|z_2|^2', '\\sqrt{|z_1|\\,|z_2|}']],
  ['mult-polar', POLAR, `r_1${CIS}(\\theta_1) \\times r_2${CIS}(\\theta_2)`, `r_1 r_2${CIS}(\\theta_1 + \\theta_2)`, [`r_1 r_2${CIS}(\\theta_1\\theta_2)`, `(r_1 + r_2)${CIS}(\\theta_1 + \\theta_2)`, `r_1 r_2${CIS}(\\theta_1 - \\theta_2)`], {
    family: 'muldiv', tip: 'Multiply the moduli, add the arguments.',
    gap: { tex: `r_1${CIS}(\\theta_1) \\times r_2${CIS}(\\theta_2) = r_1 r_2${CIS}(\\theta_1 \\gap \\theta_2)`, answers: ['+'] },
  }],
  ['div-polar', POLAR, `\\dfrac{r_1${CIS}(\\theta_1}){r_2${CIS}(\\theta_2})`, `\\dfrac{r_1}{r_2}${CIS}(\\theta_1 - \\theta_2)`, [`\\dfrac{r_1}{r_2}${CIS}\\left(\\dfrac{\\theta_1}{\\theta_2}\\right)`, `\\dfrac{r_1}{r_2}${CIS}(\\theta_2 - \\theta_1)`, `(r_1 - r_2)${CIS}(\\theta_1 - \\theta_2)`], {
    family: 'muldiv', tip: 'Divide the moduli, subtract the arguments.',
    gap: { tex: `\\dfrac{r_1${CIS}(\\theta_1}){r_2${CIS}(\\theta_2}) = \\dfrac{r_1}{r_2}${CIS}(\\theta_1 \\gap \\theta_2)`, answers: ['-'] },
  }],
  ['conj-polar', POLAR, `\\overline{r${CIS}(\\theta)}`, `r${CIS}(-\\theta)`, [`-r${CIS}(\\theta)`, `r${CIS}(\\pi - \\theta)`, `\\dfrac{1}{r}${CIS}(-\\theta)`], { family: 'neg-theta' }],
  ['recip-polar', POLAR, `\\dfrac{1}{r${CIS}(\\theta)}`, `\\dfrac{1}{r}${CIS}(-\\theta)`, [`\\dfrac{1}{r}${CIS}(\\theta)`, `r${CIS}(-\\theta)`, `-r${CIS}(\\theta)`], { family: 'neg-theta' }],
  ['cis-pi', POLAR, `${CIS}(\\pi)`, '-1', ['1', 'i', '-i'], { family: 'cis-val', back: { tex: '-1', plain: '-1' } }],
  ['cis-half-pi', POLAR, `${CIS}\\,\\tfrac{\\pi}{2}`, 'i', ['-i', '1', '-1'], { family: 'cis-val', back: { tex: 'i', plain: 'i' } }],
  ['geo-i', POLAR, w('Multiplying z by i'), w('Rotates z anticlockwise by π/2 about the origin'), [w('Rotates z clockwise by π/2 about the origin'), w('Reflects z in the real axis'), w('Rotates z by π about the origin')], { family: 'geom' }],
  ['geo-cis', POLAR, w('Multiplying z by cis(α)'), w('Rotates z anticlockwise by α about the origin'), [w('Rotates z clockwise by α about the origin'), w('Moves z a distance α to the right'), w('Rotates z anticlockwise by α and scales it by α')], { family: 'geom' }],
  ['geo-conj', POLAR, w('Taking the conjugate of z'), w('Reflects z in the real axis'), [w('Reflects z in the imaginary axis'), w('Rotates z by π about the origin'), w('Rotates z anticlockwise by π/2 about the origin')], { family: 'geom' }],

  // De Moivre and roots
  ['demoivre', DM, `(r${CIS}(\\theta))^n`, `r^n${CIS}(n\\theta)`, [`r^n${CIS}(\\theta^n)`, `nr${CIS}(n\\theta)`, `r${CIS}(n\\theta)`], {
    tip: "De Moivre's theorem, proved by induction for integer n.",
    gap: { tex: `(r${CIS}(\\theta))^n = r^n${CIS}(\\gap\\,\\theta)`, answers: ['n'] },
  }],
  ['roots-count', DM, `z^n = r${CIS}(\\theta)`, 'n', ['n - 1', '2n', 'n + 1'], { ask: 'how many distinct roots (r > 0)', oneWay: true, back: { tex: 'n', plain: 'n' } }],
  ['roots-modulus', DM, `z^n = r${CIS}(\\theta)`, 'r^{\\frac{1}{n}}', ['r', '\\dfrac{r}{n}', 'r^n'], { ask: 'the modulus of every root', oneWay: true }],
  ['roots-spacing', DM, `z^n = r${CIS}(\\theta)`, '\\dfrac{2\\pi}{n}', ['\\dfrac{\\pi}{n}', '\\dfrac{\\theta}{n}', '\\dfrac{2\\pi}{n} + \\theta'], { ask: 'the angle between neighbouring roots', oneWay: true, tip: 'The roots are evenly spaced on a circle centred at the origin.' }],
  ['roots-all', DM, `z^n = r${CIS}(\\theta)`, `r^{\\frac{1}{n}}${CIS}\\left(\\dfrac{\\theta + 2k\\pi}{n}\\right),\\ k = 0, 1, \\ldots, n - 1`, [
    `r^{\\frac{1}{n}}${CIS}\\left(\\dfrac{\\theta}{n} + 2k\\pi\\right),\\ k = 0, 1, \\ldots, n - 1`,
    `r^{\\frac{1}{n}}${CIS}\\left(\\dfrac{\\theta + k\\pi}{n}\\right),\\ k = 0, 1, \\ldots, n - 1`,
    `r^n${CIS}\\left(\\dfrac{\\theta + 2k\\pi}{n}\\right),\\ k = 0, 1, \\ldots, n - 1`,
  ], { ask: 'all n roots', oneWay: true }],
  ['unity', DM, 'z^n = 1', `${CIS}\\left(\\dfrac{2k\\pi}{n}\\right),\\ k = 0, 1, \\ldots, n - 1`, [
    `${CIS}\\left(\\dfrac{k\\pi}{n}\\right),\\ k = 0, 1, \\ldots, n - 1`,
    `${CIS}(2k\\pi n),\\ k = 0, 1, \\ldots, n - 1`,
    `${CIS}\\left(\\dfrac{k\\pi}{2n}\\right),\\ k = 0, 1, \\ldots, n - 1`,
  ], { ask: 'the nth roots of unity', oneWay: true, tip: 'z = 1 is always one of them.' }],
  ['unity-sum', DM, w('The sum of the nth roots of unity (n ≥ 2)'), '0', ['1', 'n', '-1'], { oneWay: true, back: { tex: '0', plain: '0' } }],

  // Polynomials
  ['fta', POLY, w('The fundamental theorem of algebra'), w('A polynomial of degree n ≥ 1 has exactly n roots over C, counted with multiplicity'), [w('A polynomial of degree n has exactly n distinct roots over C'), w('Every polynomial of degree n has at least one real root'), w('A polynomial of degree n has exactly n real roots, counted with multiplicity')]],
  ['crt', POLY, w('The conjugate root theorem'), w('If a polynomial with real coefficients has a root a + bi, then a − bi is also a root'), [w('If any polynomial has a root a + bi, then a − bi is also a root'), w('If a polynomial with real coefficients has a root a + bi, then −a + bi is also a root'), w('If a polynomial with real coefficients has a root a + bi, then −a − bi is also a root')], { tip: 'Real coefficients are essential: z − i has only the root i.' }],
  ['odd-degree', POLY, w('A polynomial with real coefficients and odd degree has'), w('At least one real root'), [w('No real roots'), w('Exactly one real root'), w('Only real roots')], { oneWay: true, tip: 'Non-real roots come in conjugate pairs, so one root is left over.' }],
  ['factor-thm', POLY, w('z − α is a factor of P(z)'), w('if and only if P(α) = 0'), [w('if and only if P(−α) = 0'), w('if and only if P(0) = α'), w('if and only if P′(α) = 0')]],
  ['quad-factor', POLY, '(z - \\alpha)(z - \\overline{\\alpha})', `z^2 - 2${RE}(\\alpha)\\,z + |\\alpha|^2`, [`z^2 + 2${RE}(\\alpha)\\,z + |\\alpha|^2`, `z^2 - 2${IM}(\\alpha)\\,z + |\\alpha|^2`, `z^2 - 2${RE}(\\alpha)\\,z - |\\alpha|^2`], {
    tip: 'The real quadratic factor from a pair of conjugate roots.',
    gap: { tex: `(z - \\alpha)(z - \\overline{\\alpha}) = z^2 \\gap 2${RE}(\\alpha)\\,z + |\\alpha|^2`, answers: ['-'] },
  }],
  ['disc-neg', POLY, '\\Delta = b^2 - 4ac < 0', w('Two non-real roots that are complex conjugates'), [w('No solutions'), w('One repeated real root'), w('Two non-real roots that are not conjugates')], { ask: 'roots of az² + bz + c = 0, with a, b, c real', oneWay: true }],

  // Regions of the complex plane
  ['circle', REG, '|z - z_1| = r', w('Circle with centre z₁ and radius r'), [w('Circle with centre −z₁ and radius r'), w('Circle with centre z₁ and radius r²'), w('Disc with centre z₁ and radius r, boundary included')], { family: 'circle' }],
  ['disc', REG, '|z - z_1| \\le r', w('Disc with centre z₁ and radius r, boundary included'), [w('Region outside the circle with centre z₁ and radius r'), w('Circle with centre z₁ and radius r'), w('Disc with centre z₁ and radius r, boundary excluded')], { family: 'circle' }],
  ['circle-cart', REG, '|z - (a + bi)| = r', '(x - a)^2 + (y - b)^2 = r^2', ['(x + a)^2 + (y + b)^2 = r^2', '(x - a)^2 + (y - b)^2 = r', '(x - a)^2 - (y - b)^2 = r^2'], { ask: `Cartesian equation, ${Z}` }],
  ['bisector', REG, '|z - z_1| = |z - z_2|', w('The perpendicular bisector of the segment joining z₁ and z₂'), [w('The line through z₁ and z₂'), w('The circle with diameter from z₁ to z₂'), w('The midpoint of z₁ and z₂')]],
  ['ray', REG, `${ARG}(z - z_1) = \\theta`, w('A ray from z₁ (z₁ not included) at angle θ to the positive real direction'), [w('A ray from the origin at angle θ, origin not included'), w('The whole line through z₁ at angle θ'), w('A ray from −z₁ at angle θ, −z₁ not included')]],
  ['re-line', REG, `${RE}(z) = a`, w('The vertical line x = a'), [w('The horizontal line y = a'), w('The circle with centre 0 and radius a'), w('The line y = x + a')], { family: 'reim' }],
  ['im-line', REG, `${IM}(z) = b`, w('The horizontal line y = b'), [w('The vertical line x = b'), w('The circle with centre 0 and radius b'), w('The line y = bx')], { family: 'reim' }],
]

export const specialistComplexDeck: Deck = {
  id: 'specialist-complex',
  title: 'Complex Numbers',
  blurb: "Conjugate, modulus and argument rules, polar form, De Moivre's theorem, roots, polynomials over C and regions of the complex plane.",
  groups: [CART, POLAR, DM, POLY, REG],
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
  source: 'VCE Specialist Mathematics Study Design 2023–2027, Units 3 & 4: Complex numbers',
}
