// 2022 Methods Exam 1 Q3 — "infinitely many solutions" needs the two equations to be the SAME
// line, not just parallel ones. Slide k and watch kx − 5y = 4 + k and 3x + (k + 8)y = −1:
// the gradients agree at k = −5 and k = −3, the y-intercepts agree at k = −9 and k = −3. At
// k = −5 the lines are parallel but separate (no solutions), the value
// determinant-method students had to reject; only k = −3 makes the lines coincide.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Point, Readout, Readouts, Slider } from './kit'

const EPS = 1e-9

// Each equation written as a·x + b·y = c.
type Eq = { a: number; b: number; c: number }
const eq1 = (k: number): Eq => ({ a: k, b: -5, c: 4 + k })
const eq2 = (k: number): Eq => ({ a: 3, b: k + 8, c: -1 })

/** Two points on a·x + b·y = c, to draw the whole line. */
function through(l: Eq): [[number, number], [number, number]] {
  if (Math.abs(l.b) < EPS) return [[l.c / l.a, 0], [l.c / l.a, 1]]
  return [[0, l.c / l.b], [1, (l.c - l.a) / l.b]]
}

/** A point on the line that is inside the view, found by scanning in from one side (for its label). */
function labelAt(l: Eq, fromRight: boolean): [number, number] {
  if (Math.abs(l.b) < EPS) return [l.c / l.a, 1.6]
  for (let i = 0; i <= 100; i++) {
    const x = fromRight ? 2.5 - 0.05 * i : -2.5 + 0.05 * i
    const y = (l.c - l.a * x) / l.b
    if (Math.abs(y) < 2) return [x, y]
  }
  return [0, l.c / l.b]
}

/** 2 dp for TeX (ASCII minus, no trailing zeros). */
const d = (v: number) => {
  const r = Math.round(v * 100) / 100
  return (Math.abs(r) < EPS ? 0 : r).toString()
}

/** True when v is already exact to 2 dp. */
const exact2 = (v: number) => Math.abs(v * 100 - Math.round(v * 100)) < 1e-6

/** y = mx + c in TeX. */
function slopeForm(m: number, c: number): string {
  const eq = exact2(m) && exact2(c) ? '=' : '\\approx'
  const mx = Math.abs(m) < EPS ? '' : m === 1 ? 'x' : m === -1 ? '-x' : `${d(m)}x`
  if (!mx) return `y ${eq} ${d(c)}`
  if (Math.abs(c) < EPS) return `y ${eq} ${mx}`
  return `y ${eq} ${mx} ${c < 0 ? '-' : '+'} ${d(Math.abs(c))}`
}

const CANDIDATES = [-9, -5, -3]

export default function SameLine() {
  const [k, setK] = useState(-5)

  const l1 = eq1(k)
  const l2 = eq2(k)
  const vertical = Math.abs(k + 8) < EPS
  const m1 = k / 5
  const c1 = -(4 + k) / 5
  const m2 = vertical ? NaN : -3 / (k + 8)
  const c2 = vertical ? NaN : -1 / (k + 8)
  const sameM = !vertical && Math.abs(m1 - m2) < EPS
  const sameC = !vertical && Math.abs(c1 - c2) < EPS
  const identical = sameM && sameC
  const parallel = sameM && !sameC

  // The single solution, when there is one (Cramer's rule; det = k(k + 8) + 15).
  const det = l1.a * l2.b - l1.b * l2.a
  const px = (l1.c * l2.b - l1.b * l2.c) / det
  const py = (l1.a * l2.c - l1.c * l2.a) / det
  const inView = Math.abs(px) <= 3 && Math.abs(py) <= 2.5

  const [p1, q1] = through(l1)
  const [p2, q2] = through(l2)

  let notice
  if (identical) {
    notice = (
      <Notice tone="good">
        At <M>k = -3</M> the gradients agree (both <M>-0.6</M>) <b>and</b> the <M>y</M>-intercepts agree (both <M>-0.2</M>).
        The equations are <M>-3x - 5y = 1</M> and <M>3x + 5y = -1</M>, one is <M>-1</M> times the other, so they
        are the same line. Every point on it solves both: <b>infinitely many solutions</b>. It is the only value
        in both lists.
      </Notice>
    )
  } else if (parallel) {
    notice = (
      <Notice tone="warn">
        At <M>k = -5</M> the gradients agree (both <M>-1</M>), so the lines are parallel. But the <M>y</M>-intercepts
        are <M>0.2</M> and <M>{'-\\tfrac{1}{3}'}</M>, so the lines never meet: <b>no solutions</b>. Equal
        gradients alone (the only condition the report&apos;s &ldquo;determinant method&rdquo; checks) gives this value as well as{' '}
        <M>k = -3</M>, so it has to be checked and rejected. Now try <M>k = -3</M>.
      </Notice>
    )
  } else if (sameC) {
    notice = (
      <Notice>
        At <M>k = -9</M> the <M>y</M>-intercepts agree (both <M>1</M>) but the gradients don&apos;t, so the lines just
        cross once, on the <M>y</M>-axis at <M>(0, 1)</M>: <b>one solution</b>. Equal intercepts alone is not enough
        either. Try <M>k = -5</M> and <M>k = -3</M>.
      </Notice>
    )
  } else if (vertical) {
    notice = (
      <Notice>
        At <M>k = -8</M> the second equation is <M>3x = -1</M>, a vertical line. The first line is never
        vertical (its <M>y</M> coefficient is always <M>-5</M>), so they cross once: <b>one solution</b>. That is
        why <M>{'k \\ne -8'}</M> loses nothing when we divide by <M>k + 8</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The gradients are different, so the lines cross at exactly one point: <b>one solution</b>
        {inView ? '' : ' (off-screen here)'}. Drag <M>k</M> to look for where the lines stop crossing, or jump to
        the values that come out of the working.
      </Notice>
    )
  }

  const solutions = identical
    ? '\\text{infinitely many solutions}'
    : parallel
      ? '\\text{no solutions}'
      : `\\text{one solution: } (x, y) ${exact2(px) && exact2(py) ? '=' : '\\approx'} (${d(px)}, ${d(py)})`

  return (
    <div>
      <Plane x={[-3, 3]} y={[-2.5, 2.5]} xStep={1} yStep={1} height={320}>
        {identical ? (
          <>
            <Line.ThroughPoints point1={p1} point2={q1} color={C.good} weight={6} opacity={0.6} />
            <Line.ThroughPoints point1={p2} point2={q2} color={C.g} weight={2.5} style="dashed" />
          </>
        ) : (
          <>
            <Line.ThroughPoints point1={p1} point2={q1} color={C.f} weight={3} />
            <Line.ThroughPoints point1={p2} point2={q2} color={C.g} weight={3} />
          </>
        )}
        {parallel && (
          <>
            <Line.Segment point1={[1, m1 + c1]} point2={[1, m2 + c2]} color={C.bad} weight={2.5} style="dashed" />
            <Label at={[1, (m1 + c1 + m2 + c2) / 2]} color={C.bad} attach="e">
              never meet
            </Label>
          </>
        )}
        {!identical && !parallel && inView && <Point x={px} y={py} color={C.good} />}
        <Label at={labelAt(l1, true)} color={identical ? C.good : C.f} attach="ne">
          (1)
        </Label>
        <Label at={labelAt(l2, false)} color={C.g} attach="ne">
          (2)
        </Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={-10} max={0} step={0.5} format={v => v.toFixed(1)} />
        <Buttons>
          {CANDIDATES.map(v => (
            <ActionButton key={v} label={<M>{`k = ${v}`}</M>} onClick={() => setK(v)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`(1)\\;\\; ${slopeForm(m1, c1)}`} />
          <Readout color={C.g} tex={vertical ? `(2)\\;\\; x = -\\tfrac{1}{3}` : `(2)\\;\\; ${slopeForm(m2, c2)}`} />
          <Readout
            color={sameM ? C.good : undefined}
            tex={vertical ? '\\text{gradients: (2) is vertical}' : `\\text{gradients: } {${d(m1)}},\\ {${d(m2)}}${sameM ? '\\ \\checkmark' : ''}`}
          />
          <Readout
            color={sameC ? C.good : undefined}
            tex={vertical ? 'y\\text{-intercepts: (2) has none}' : `y\\text{-intercepts: } {${d(c1)}},\\ {${d(c2)}}${sameC ? '\\ \\checkmark' : ''}`}
          />
          <Readout color={identical ? C.good : parallel ? C.bad : undefined} tex={solutions} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
