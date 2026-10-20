// 2022 Specialist NHT Exam 2 MCQ 6 — why the equation 2z³ − 3z² − 12z + b = 0 has exactly one
// real solution only when b < −7 or b > 20. The real solutions are where the blue cubic
// y = 2x³ − 3x² − 12x meets the orange line y = −b. The cubic's turning points are (−1, 7) and
// (2, −20) (sympy agrees), so the line meets it once when it sits above 7 or below −20, i.e.
// b < −7 or b > 20 (option E). At b = −7 and b = 20 the line touches a turning point: a repeated
// real root, (z + 1)²(2z − 7) and (z − 2)²(2z + 5), so all three solutions are real and the
// endpoints are excluded (option D's ≤ and ≥ fail). Intersections are found by bisection on sign
// changes; the two tangent cases are handled exactly.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num } from './kit'

const p = (x: number) => 2 * x ** 3 - 3 * x ** 2 - 12 * x

/** Real solutions of p(x) = level on [-4, 5] (the cubic's real roots all lie there for |level| ≤ 40). */
function crossings(level: number): number[] {
  const f = (x: number) => p(x) - level
  const out: number[] = []
  const N = 900
  let x0 = -4
  let f0 = f(x0)
  for (let i = 1; i <= N; i++) {
    const x1 = -4 + (9 * i) / N
    const f1 = f(x1)
    if (f0 === 0) out.push(x0)
    else if (f0 * f1 < 0) {
      let lo = x0
      let hi = x1
      for (let k = 0; k < 50; k++) {
        const mid = (lo + hi) / 2
        if (f(lo) * f(mid) <= 0) hi = mid
        else lo = mid
      }
      out.push((lo + hi) / 2)
    }
    x0 = x1
    f0 = f1
  }
  return out
}

export default function LevelWidget() {
  const [b, setB] = useState(-12)
  const level = -b
  const touchMax = b === -7
  const touchMin = b === 20
  const pts = touchMax ? [-1, 3.5] : touchMin ? [2, -2.5] : crossings(level)
  const one = !touchMax && !touchMin && pts.length === 1

  let notice
  let tone: 'neutral' | 'good' | 'warn' = 'neutral'
  if (touchMax || touchMin) {
    tone = 'warn'
    notice = (
      <>
        <b>The line just touches a turning point.</b> That touch is a <i>repeated</i> real root:{' '}
        {touchMax ? <M>{'2z^3-3z^2-12z-7=(z+1)^2(2z-7)'}</M> : <M>{'2z^3-3z^2-12z+20=(z-2)^2(2z+5)'}</M>}. All three
        solutions are real, so there are no complex ones. That is why the endpoints <M>-7</M> and <M>20</M> are left out (option
        D includes them).
      </>
    )
  } else if (one) {
    tone = 'good'
    notice = (
      <>
        The line <M>{`y=-b=${num(level, 1)}`}</M> is {level > 7 ? <>above the local maximum <M>7</M></> : <>below the local minimum <M>-20</M></>}, so
        it meets the cubic <b>once</b>: one real solution. The cubic has real coefficients, so the other two solutions are a
        non-real conjugate pair. This happens for every <M>{'b<-7'}</M> and every <M>{'b>20'}</M>.
      </>
    )
  } else {
    notice = (
      <>
        The line <M>{`y=-b=${num(level, 1)}`}</M> lies between the turning values <M>-20</M> and <M>7</M>, so it crosses the cubic{' '}
        <b>three times</b>: three real solutions and no complex ones. Slide <M>b</M> until the line clears a turning point.
      </>
    )
  }

  return (
    <div>
      <Plane x={[-3.5, 4.5]} y={[-32, 32]} xStep={1} yStep={8} height={330} label="The cubic y = 2x³ − 3x² − 12x and the horizontal line y = −b">
        <Plot.OfX y={p} domain={[-3.5, 4.5]} color={C.f} weight={3} />
        <Line.Segment point1={[-3.5, level]} point2={[4.5, level]} color={C.g} weight={2.5} />
        <Point x={-1} y={7} color={C.ink} />
        <Label at={[-1, 7]} attach="n" gap={9}>(−1, 7)</Label>
        <Point x={2} y={-20} color={C.ink} />
        <Label at={[2, -20]} attach="s" gap={9}>(2, −20)</Label>
        {pts.length > 0 &&
          pts.map(x => <Point key={x} x={x} y={level} color={one ? C.good : C.g} />)}
      </Plane>
      <Controls>
        <Slider label="b" value={b} onChange={setB} min={-30} max={30} step={0.5} format={v => num(v, 1)} />
        <Readouts>
          <Readout color={C.f} tex="y = 2x^3-3x^2-12x" />
          <Readout color={C.g} tex={`y = -b = ${num(level, 1)}`} />
        </Readouts>
        <Notice tone={tone}>{notice}</Notice>
      </Controls>
    </div>
  )
}
