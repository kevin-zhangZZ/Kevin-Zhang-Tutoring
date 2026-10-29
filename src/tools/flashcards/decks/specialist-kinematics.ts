import type { Card, Deck, Face } from '../data'

// Specialist Units 3 & 4: Kinematics (rectilinear motion) and Vector calculus. The forms of
// acceleration, the constant-acceleration formulas, velocity–time graphs, motion described by a
// vector function of time, and parametric paths (circles, ellipses, hyperbolas).

type F = string | Face
const f = (x: F): Face => (typeof x === 'string' ? { tex: x } : x)
const w = (text: string): Face => ({ text })

/** [id, group, front, back, traps, extra] — a string is TeX, w() is words. */
type Row = [string, string, F, F, F[], Partial<Card>?]

const v = (c: string) => `\\underset{\\sim}{${c}}`
const I = v('i'), J = v('j')
const R = v('r'),RD = v('\\dot{r}'), RDD = v('\\ddot{r}')
const R1 = `${R}_1`, R2 = `${R}_2`
const INT = '\\displaystyle\\int_{t_1}^{t_2}'

const ACC = 'Acceleration Forms'
const CONST = 'Constant Acceleration'
const GRAPH = 'Velocity–Time'
const VEC = 'Vector Motion'
const PATH = 'Parametric Paths'

const rows: Row[] = [
  // Forms of acceleration
  ['a-d2x', ACC, 'a', '\\dfrac{d^2x}{dt^2}', ['\\left(\\dfrac{dx}{dt}\\right)^2', '\\dfrac{d^2t}{dx^2}', '\\dfrac{d^2v}{dt^2}'], { ask: 'with x a function of t', oneWay: true, family: 'a' }],
  ['a-dvdt', ACC, 'a', '\\dfrac{dv}{dt}', ['\\dfrac{dx}{dt}', '\\dfrac{dv}{dx}', 'v\\dfrac{dv}{dt}'], { ask: 'with v a function of t', oneWay: true, family: 'a' }],
  ['a-vdvdx', ACC, 'a', 'v\\dfrac{dv}{dx}', ['\\dfrac{dv}{dx}', 'x\\dfrac{dv}{dx}', '\\dfrac{1}{v}\\dfrac{dv}{dx}'], {
    ask: 'with v a function of x', oneWay: true, family: 'a',
    tip: 'Chain rule: dv/dt = (dv/dx)(dx/dt) = v dv/dx.',
  }],
  ['a-half-v2', ACC, 'a', '\\dfrac{d}{dx}\\left(\\tfrac{1}{2}v^2\\right)', ['\\dfrac{d}{dx}\\left(v^2\\right)', '\\dfrac{d}{dt}\\left(\\tfrac{1}{2}v^2\\right)', '\\tfrac{1}{2}\\dfrac{dv}{dx}'], {
    ask: 'as a derivative with respect to x', oneWay: true, family: 'a',
    gap: { tex: 'a = \\dfrac{d}{dx}\\left(\\gap\\,v^2\\right)', answers: ['1/2', '0.5', '½'] },
  }],
  ['v-dxdt', ACC, 'v', '\\dfrac{dx}{dt}', ['\\dfrac{dv}{dt}', '\\dfrac{dt}{dx}', '\\dfrac{d^2x}{dt^2}']],
  ['dtdx', ACC, '\\dfrac{dt}{dx}', '\\dfrac{1}{v}', ['v', '-\\dfrac{1}{v}', '\\dfrac{1}{a}'], { tip: 'Used to find t in terms of x when v is a function of x.' }],
  ['use-fv-t', ACC, w('a = f(v), and you want v in terms of t'), '\\dfrac{dv}{dt} = f(v)', ['v\\dfrac{dv}{dx} = f(v)', '\\dfrac{d^2x}{dt^2} = f(t)', '\\dfrac{dv}{dx} = f(v)'], { oneWay: true, family: 'use', tip: 'Then dt/dv = 1/f(v): antidifferentiate with respect to v.' }],
  ['use-fv-x', ACC, w('a = f(v), and you want v in terms of x'), 'v\\dfrac{dv}{dx} = f(v)', ['\\dfrac{dv}{dt} = f(v)', '\\dfrac{d}{dx}\\left(\\tfrac{1}{2}v^2\\right) = f(x)', '\\dfrac{dv}{dx} = f(v)'], { oneWay: true, family: 'use', tip: 'Then dx/dv = v/f(v).' }],
  ['use-fx', ACC, w('a = f(x), and you want v in terms of x'), '\\dfrac{d}{dx}\\left(\\tfrac{1}{2}v^2\\right) = f(x)', ['\\dfrac{dv}{dt} = f(x)', 'v\\dfrac{dv}{dx} = f(v)', '\\dfrac{d^2x}{dt^2} = f(t)'], { oneWay: true, family: 'use', tip: 'Then ½v² = ∫f(x) dx.' }],

  // Constant acceleration
  ['suvat-no-s', CONST, w('Constant acceleration: the formula without s'), 'v = u + at', ['v = u + \\tfrac{1}{2}at', 'v^2 = u + at', 'v = u + at^2'], { family: 'suvat' }],
  ['suvat-no-v', CONST, w('Constant acceleration: the formula without v'), 's = ut + \\tfrac{1}{2}at^2', ['s = ut + at^2', 's = vt + \\tfrac{1}{2}at^2', 's = \\tfrac{1}{2}ut + at^2'], {
    family: 'suvat', gap: { tex: 's = ut + \\gap\\,at^2', answers: ['1/2', '0.5', '½'] },
  }],
  ['suvat-no-t', CONST, w('Constant acceleration: the formula without t'), 'v^2 = u^2 + 2as', ['v^2 = u^2 + as', 'v = u^2 + 2as', 'v^2 = 2u + 2as'], {
    family: 'suvat', gap: { tex: 'v^2 = u^2 + \\gap\\,as', answers: ['2'] },
  }],
  ['suvat-no-a', CONST, w('Constant acceleration: the formula without a'), 's = \\tfrac{1}{2}(u + v)t', ['s = (u + v)t', 's = \\tfrac{1}{2}(v - u)t', 's = \\tfrac{1}{2}uvt'], { family: 'suvat' }],
  ['suvat-no-u', CONST, w('Constant acceleration: the formula without u'), 's = vt - \\tfrac{1}{2}at^2', ['s = vt + \\tfrac{1}{2}at^2', 's = ut - \\tfrac{1}{2}at^2', 's = vt - at^2'], {
    family: 'suvat', gap: { tex: 's = vt \\gap \\tfrac{1}{2}at^2', answers: ['-'] },
  }],

  // Velocity–time graphs
  ['vt-grad', GRAPH, w('The gradient of a velocity–time graph'), w('Acceleration'), [w('Displacement'), w('Speed'), w('Distance travelled')], { family: 'vt', back: { text: 'Acceleration', plain: 'acceleration' } }],
  ['vt-signed', GRAPH, w('The signed area under a velocity–time graph'), w('Displacement'), [w('Distance travelled'), w('Acceleration'), w('Average velocity')], { family: 'vt', back: { text: 'Displacement', plain: 'displacement' } }],
  ['vt-total', GRAPH, w('The total area between a velocity–time graph and the t-axis'), w('Distance travelled'), [w('Displacement'), w('Acceleration'), w('Average speed')], { family: 'vt', back: { text: 'Distance travelled', plain: 'distance travelled' } }],
  ['disp-int', GRAPH, 'x(t_2) - x(t_1)', `${INT} v\\,dt`, [`${INT} |v|\\,dt`, `${INT} a\\,dt`, 'v(t_2) - v(t_1)'], { family: 'int' }],
  ['dist-int', GRAPH, w('Distance travelled from t₁ to t₂'), `${INT} |v|\\,dt`, [`\\left|${INT} v\\,dt\\right|`, `${INT} v\\,dt`, '|x(t_2)| - |x(t_1)|'], { family: 'int', tip: 'Same as the displacement only if the particle never changes direction.' }],
  ['avg-vel', GRAPH, w('Average velocity from t₁ to t₂'), '\\dfrac{x(t_2) - x(t_1)}{t_2 - t_1}', ['\\dfrac{v(t_1) + v(t_2)}{2}', '\\dfrac{\\text{distance travelled}}{t_2 - t_1}', '\\dfrac{v(t_2) - v(t_1)}{t_2 - t_1}'], { family: 'avg' }],
  ['avg-speed', GRAPH, w('Average speed'), '\\dfrac{\\text{distance travelled}}{\\text{time taken}}', ['\\dfrac{\\text{displacement}}{\\text{time taken}}', '\\dfrac{\\text{initial speed} + \\text{final speed}}{2}', '\\dfrac{\\text{change in velocity}}{\\text{time taken}}'], { family: 'avg' }],
  ['at-rest', GRAPH, w('The particle is (instantaneously) at rest'), 'v = 0', ['a = 0', 'x = 0', 'v = 0\\ \\text{and}\\ a = 0'], { back: { tex: 'v = 0', plain: 'v=0' } }],
  ['change-dir', GRAPH, w('The particle changes direction'), w('v changes sign'), [w('a = 0'), w('v = 0, whether or not v changes sign'), w('x changes sign')]],

  // Vector motion
  ['vel-vec', VEC, w('Velocity, for position vector r(t)'), `${RD}(t) = \\dfrac{d${R}}{dt}`, [`${INT} ${R}(t)\\,dt`, `\\dfrac{d^2${R}}{dt^2}`, `\\left|\\dfrac{d${R}}{dt}\\right|`], { family: 'vec' }],
  ['acc-vec', VEC, w('Acceleration, for position vector r(t)'), `${RDD}(t) = \\dfrac{d^2${R}}{dt^2}`, [`\\dfrac{d${R}}{dt}`, `\\left|\\dfrac{d^2${R}}{dt^2}\\right|`, `\\left(\\dfrac{d${R}}{dt}\\right)^2`], { family: 'vec' }],
  ['speed-vec', VEC, w('Speed, for position vector r(t)'), `\\left|${RD}(t)\\right|`, [`\\left|${R}(t)\\right|`, `\\dfrac{d}{dt}\\left|${R}(t)\\right|`, `${RD}(t)`], { family: 'vec', tip: 'Speed is a number: the magnitude of the velocity.' }],
  ['speed-comp', VEC, `\\left|${RD}(t)\\right|`, '\\sqrt{\\dot{x}^2 + \\dot{y}^2}', ['\\dot{x} + \\dot{y}', '\\dot{x}^2 + \\dot{y}^2', '\\sqrt{x^2 + y^2}'], { ask: 'r(t) = x(t)i + y(t)j' }],
  ['dist-path', VEC, w('Distance travelled along the path from t₁ to t₂'), `${INT} \\left|${RD}(t)\\right|dt`, [`\\left|${R}(t_2) - ${R}(t_1)\\right|`, `${INT} \\left|${R}(t)\\right|dt`, `\\left|${INT} ${RD}(t)\\,dt\\right|`], { tip: 'The arc length of the path. |r(t₂) − r(t₁)| is only the straight-line distance.' }],
  ['meet', VEC, w('Two particles meet (collide)'), `${R1}(t) = ${R2}(t)\\ \\text{for the same } t`, [`${R1}(t_1) = ${R2}(t_2)\\ \\text{for some } t_1, t_2`, `${RD}_1(t) = ${RD}_2(t)\\ \\text{for some } t`, `\\left|${R1}(t)\\right| = \\left|${R2}(t)\\right|\\ \\text{for some } t`], { family: 'meet', oneWay: true }],
  ['cross', VEC, w('The paths of two particles cross'), `${R1}(t_1) = ${R2}(t_2)\\ \\text{for some } t_1, t_2`, [`${R1}(t) = ${R2}(t)\\ \\text{for the same } t \\text{ only}`, `${RD}_1(t)\\cdot ${RD}_2(t) = 0`, `\\left|${RD}_1(t)\\right| = \\left|${RD}_2(t)\\right|`], { family: 'meet', oneWay: true, tip: 'The times can differ: crossing paths need not mean a collision.' }],

  // Parametric paths
  ['circle', PATH, 'x = a\\cos t,\\ y = a\\sin t', 'x^2 + y^2 = a^2', ['x^2 + y^2 = a', 'x^2 - y^2 = a^2', 'x + y = a'], { ask: 'Cartesian equation', family: 'conic' }],
  ['ellipse', PATH, 'x = a\\cos t,\\ y = b\\sin t', '\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1', ['\\dfrac{x^2}{b^2} + \\dfrac{y^2}{a^2} = 1', '\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1', '\\dfrac{x}{a} + \\dfrac{y}{b} = 1'], { ask: 'Cartesian equation', family: 'conic', tip: 'From cos²t + sin²t = 1.' }],
  ['ellipse-shift', PATH, 'x = h + a\\cos t,\\ y = k + b\\sin t', '\\dfrac{(x - h)^2}{a^2} + \\dfrac{(y - k)^2}{b^2} = 1', ['\\dfrac{(x + h)^2}{a^2} + \\dfrac{(y + k)^2}{b^2} = 1', '\\dfrac{(x - h)^2}{b^2} + \\dfrac{(y - k)^2}{a^2} = 1', '\\dfrac{(x - h)^2}{a^2} - \\dfrac{(y - k)^2}{b^2} = 1'], { ask: 'Cartesian equation', family: 'conic' }],
  ['hyperbola-sec', PATH, 'x = a\\sec t,\\ y = b\\tan t', '\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1', ['\\dfrac{y^2}{b^2} - \\dfrac{x^2}{a^2} = 1', '\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1', '\\dfrac{x^2}{b^2} - \\dfrac{y^2}{a^2} = 1'], { ask: 'Cartesian equation', family: 'conic', tip: 'From sec²t − tan²t = 1.' }],
  ['hyperbola-tan', PATH, 'x = a\\tan t,\\ y = b\\sec t', '\\dfrac{y^2}{b^2} - \\dfrac{x^2}{a^2} = 1', ['\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1', '\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1', '\\dfrac{y^2}{a^2} - \\dfrac{x^2}{b^2} = 1'], { ask: 'Cartesian equation', family: 'conic' }],
  ['hyp-asym', PATH, '\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1', 'y = \\pm\\dfrac{b}{a}x', ['y = \\pm\\dfrac{a}{b}x', 'y = \\pm\\dfrac{b^2}{a^2}x', 'x = \\pm a'], { ask: 'the asymptotes', oneWay: true }],
  ['dir-cos-sin', PATH, `${R}(t) = \\cos(t)\\,${I} + \\sin(t)\\,${J},\\ t \\ge 0`, w('Anticlockwise, starting at (1, 0)'), [w('Clockwise, starting at (1, 0)'), w('Anticlockwise, starting at (0, 1)'), w('Clockwise, starting at (0, 1)')], { ask: 'direction of motion', family: 'dir' }],
  ['dir-sin-cos', PATH, `${R}(t) = \\sin(t)\\,${I} + \\cos(t)\\,${J},\\ t \\ge 0`, w('Clockwise, starting at (0, 1)'), [w('Anticlockwise, starting at (0, 1)'), w('Clockwise, starting at (1, 0)'), w('Anticlockwise, starting at (1, 0)')], { ask: 'direction of motion', family: 'dir', tip: 'Check t = 0 and a small t > 0.' }],
]

export const specialistKinematicsDeck: Deck = {
  id: 'specialist-kinematics',
  title: 'Kinematics & Vector Calculus',
  blurb: 'The forms of acceleration, constant-acceleration formulas, velocity–time graphs, vector motion and parametric paths.',
  groups: [ACC, CONST, GRAPH, VEC, PATH],
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
  source: 'VCE Specialist Mathematics Study Design 2023–2027, Units 3 & 4: Kinematics; Vector calculus',
}
