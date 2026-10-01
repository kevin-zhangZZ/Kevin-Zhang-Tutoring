// 2022 Methods Exam 2 MCQ 17 — try to break it. The graph of g is a smooth curve (a natural cubic
// spline) through five points the student drags up and down, at x = a, …, b with the middle one at
// x = (a + b)/2. Two checks track the question's conditions: the chord from a to b slopes up
// (average rate of change positive) and the tangent at the midpoint slopes down (instantaneous
// rate negative). Whenever both hold, the widget finds a horizontal line that meets the graph at
// least twice, so g is many-to-one: heading down at the midpoint yet finishing higher forces the
// graph to turn around and come back through heights it has already reached.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, clamp } from './kit'

const XS = [1, 2, 3, 4, 5] // a = 1, b = 5, midpoint 3 (plane units)
const START = [0.5, 2.2, 1.6, 1.0, 3.0]
const LO = -0.5
const HI = 3.5

/** Second derivatives of the natural cubic spline through (XS[i], ys[i]) (spacing 1). */
function secondDerivs(ys: number[]): number[] {
  // M0 = M4 = 0; for i = 1..3: M(i-1) + 4 M(i) + M(i+1) = 6 (y(i-1) - 2 y(i) + y(i+1)).
  const r = [1, 2, 3].map(i => 6 * (ys[i - 1] - 2 * ys[i] + ys[i + 1]))
  // Thomas algorithm on the 3 × 3 system with diagonal 4 and off-diagonals 1.
  const c1 = 1 / 4
  const d1 = r[0] / 4
  const m2 = 4 - c1
  const c2 = 1 / m2
  const d2 = (r[1] - d1) / m2
  const m3 = 4 - c2
  const d3 = (r[2] - d2) / m3
  const M3 = d3
  const M2 = d2 - c2 * M3
  const M1 = d1 - c1 * M2
  return [0, M1, M2, M3, 0]
}

function spline(ys: number[], Ms: number[]) {
  return (x: number) => {
    const i = clamp(Math.floor(x - 1), 0, 3)
    const L = XS[i + 1] - x
    const R = x - XS[i]
    return (Ms[i] * L ** 3) / 6 + (Ms[i + 1] * R ** 3) / 6 + (ys[i] - Ms[i] / 6) * L + (ys[i + 1] - Ms[i + 1] / 6) * R
  }
}

/** The horizontal line y = k meeting the graph the most times, with where it meets it. */
function bestLine(g: (x: number) => number) {
  const N = 1200
  const t = Array.from({ length: N + 1 }, (_, i) => 1 + (4 * i) / N)
  const s = t.map(g)
  const levels = [s[0], s[N]]
  for (let i = 1; i < N; i++) if ((s[i] - s[i - 1]) * (s[i + 1] - s[i]) < 0) levels.push(s[i])
  levels.sort((p, q) => p - q)
  let best = { k: 0, xs: [] as number[], gap: 0 }
  for (let j = 0; j + 1 < levels.length; j++) {
    const gap = levels[j + 1] - levels[j]
    if (gap < 1e-6) continue
    const k = levels[j] + 0.3 * gap // a little above the lower level, clear of the middle point
    const xs: number[] = []
    for (let i = 0; i < N; i++) {
      const p = s[i] - k
      const q = s[i + 1] - k
      if (p * q < 0) xs.push(t[i] + ((t[i + 1] - t[i]) * p) / (p - q))
    }
    if (xs.length > best.xs.length || (xs.length === best.xs.length && gap > best.gap)) best = { k, xs, gap }
  }
  return best
}

const fmt = (v: number) => (Math.round(v * 100) / 100).toFixed(2).replace(/^-(0\.00)$/, '$1')

export default function TryOneToOne() {
  const [ys, setYs] = useState(START)
  const Ms = secondDerivs(ys)
  const g = spline(ys, Ms)
  const avg = (ys[4] - ys[0]) / 4
  const slope = ys[3] - ys[2] - Ms[2] / 3 - Ms[3] / 6 // g'(3), from the spline on [3, 4]
  const rises = avg > 0.005
  const dips = slope < -0.005
  const line = bestLine(g)
  const many = line.xs.length >= 2

  const move = (i: number, y: number) => setYs(prev => prev.map((v, j) => (j === i ? clamp(y, LO, HI) : v)))
  const H = 0.6 // half-width of the drawn tangent

  return (
    <div>
      <Plane
        x={[0, 6]}
        y={[-1, 4]}
        xStep={1}
        yStep={1}
        height={320}
        xLabels={v => (v === 1 ? 'a' : v === 3 ? '(a+b)/2' : v === 5 ? 'b' : '')}
        yLabels={false}
      >
        {many && (
          <>
            <Line.Segment point1={[0.6, line.k]} point2={[5.4, line.k]} color={C.bad} style="dashed" weight={2} />
            {line.xs.map(x => (
              <Point key={x} x={x} y={line.k} color={C.bad} />
            ))}
          </>
        )}
        <Line.Segment point1={[1, ys[0]]} point2={[5, ys[4]]} color={C.violet} style="dashed" weight={2} />
        <Plot.OfX y={g} domain={[1, 5]} color={C.f} weight={3} />
        <Label at={[5, g(5)]} attach="e" gap={14} color={C.f} size={13}>y = g(x)</Label>
        <Line.Segment point1={[3 - H, ys[2] - H * slope]} point2={[3 + H, ys[2] + H * slope]} color={C.g} weight={3} />
        {XS.map((x, i) => (
          <MovablePoint key={x} point={[x, ys[i]]} color={C.f} constrain={p => [x, clamp(p[1], LO, HI)]} onMove={p => move(i, p[1])} />
        ))}
      </Plane>
      <Controls>
        <Buttons>
          <ActionButton label="Reset" onClick={() => setYs(START)} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`\\dfrac{g(b)-g(a)}{b-a}=${fmt(avg)}\\ ${rises ? '\\checkmark' : '\\times'}`} />
          <Readout color={C.g} tex={`g'\\!\\left(\\tfrac{a+b}{2}\\right)=${fmt(slope)}\\ ${dips ? '\\checkmark' : '\\times'}`} />
          <Readout
            color={many ? C.bad : C.good}
            tex={many ? `\\text{a horizontal line meets the graph ${line.xs.length} times}` : '\\text{no horizontal line meets it twice}'}
          />
        </Readouts>
        {rises && dips ? (
          <Notice>
            Both conditions hold: the chord (violet) slopes up, but the tangent at the midpoint (orange) slopes down. To
            head down at the midpoint and still finish higher, the graph has to turn around, so it comes back through
            heights it has already reached: the red line meets it {line.xs.length} times, so <M>g</M> is many-to-one.
            Drag the points to try to make <M>g</M> one-to-one while keeping both ticks. It can&apos;t be done.
          </Notice>
        ) : rises ? (
          <Notice tone="warn">
            The tangent at the midpoint no longer slopes down, so the second condition has gone. Without it,{' '}
            <M>g</M> could simply climb the whole way: strictly increasing, and one-to-one. Drag the points either
            side of the midpoint so the graph heads downhill there again.
          </Notice>
        ) : dips ? (
          <Notice tone="warn">
            Now <M>g(b)</M> is not above <M>g(a)</M>, so the first condition has gone. Without it, <M>g</M> could
            simply fall the whole way: strictly decreasing, and one-to-one. Drag the right-hand point back above the
            left-hand one.
          </Notice>
        ) : (
          <Notice tone="warn">
            Neither condition holds now. Drag the right-hand point above the left-hand one, and make the graph head
            downhill at the midpoint, or press Reset.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
