// 2021 Methods Exam 1 Q8b — a sign test is only convincing when the substituted gradient is
// written down, and on a technology-free paper that is easy only when √(x + 6) comes out exact.
// Two test points ride on the part a. curve y = 2(x + 6)^{3/2}/3 − x²/4 − 3x/2 − 4, one either side
// of the stationary point (3, 29/4), snapping to whole numbers. Each shows its tangent (green
// uphill, red downhill) and the exact substitution into dy/dx = √(x + 6) − x/2 − 3/2. At x = −6, −5,
// −2 and 10 (x + 6 a perfect square) the value is a plain fraction; elsewhere it is a surd whose
// sign needs one more written comparison (e.g. x = 4: √10 < 7/2 because 10 < 49/4). Either way the
// gradient goes + then −, so the point is a local maximum.

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider, clamp } from './kit'

const f = (x: number) => (2 / 3) * Math.pow(x + 6, 1.5) - (x * x) / 4 - (3 * x) / 2 - 4
const g = (x: number) => Math.sqrt(x + 6) - x / 2 - 1.5
const L_MIN = -6
const L_MAX = 2
const R_MIN = 4
const R_MAX = 12
const HALF = 0.9

const minus = (n: number) => String(n).replace('-', '−')

/** n/2 in lowest terms as TeX (n an integer), with its sign in front. */
function halfTex(n: number): string {
  const sign = n < 0 ? '-' : ''
  const a = Math.abs(n)
  return a % 2 === 0 ? `${sign}${a / 2}` : `${sign}\\tfrac{${a}}{2}`
}

type Test = {
  x: number
  s: number
  root: number | null
  /** k = (x + 3)/2, so dy/dx = √(x + 6) − k. */
  k2: number
  value: number
  sub: string
  result: string
  /** A surd whose sign needs a comparison √s vs k (only when k > 0). */
  hard: boolean
  compare: string
  because: string
}

function test(x: number): Test {
  const s = x + 6
  const r = Math.round(Math.sqrt(s))
  const root = r * r === s ? r : null
  const k2 = x + 3
  const value = g(x)
  const sign = value > 0 ? '> 0' : '< 0'
  const sub = `\\sqrt{${s}}-\\tfrac{${x < 0 ? `(${x})` : x}}{2}-\\tfrac32`
  let result: string
  if (root !== null) {
    result = `${halfTex(2 * root - k2)} ${sign}`
  } else if (k2 === 0) {
    result = `\\sqrt{${s}} ${sign}`
  } else {
    result = `\\sqrt{${s}} ${k2 > 0 ? '-' : '+'} ${halfTex(Math.abs(k2))} ${sign}`
  }
  const hard = root === null && k2 > 0
  const kTex = halfTex(k2)
  const kSqTex = k2 % 2 === 0 ? String((k2 / 2) ** 2) : `\\tfrac{${k2 * k2}}{4}`
  const gt = value > 0
  return {
    x,
    s,
    root,
    k2,
    value,
    sub,
    result,
    hard,
    compare: `\\sqrt{${s}} ${gt ? '>' : '<'} ${kTex}`,
    because: `${s} ${gt ? '>' : '<'} ${kSqTex}`,
  }
}

function TestPoint({ t, lo, hi, onMove }: { t: Test; lo: number; hi: number; onMove: (x: number) => void }) {
  const y = f(t.x)
  const color = t.value > 0 ? C.good : C.bad
  const snap = (x: number) => Math.round(clamp(x, lo, hi))
  return (
    <>
      <Line.Segment point1={[t.x - HALF, y - HALF * t.value]} point2={[t.x + HALF, y + HALF * t.value]} color={color} weight={3} />
      <MovablePoint
        point={[t.x, y]}
        onMove={([x]) => onMove(snap(x))}
        constrain={([x]) => [snap(x), f(snap(x))]}
        color={color}
      />
    </>
  )
}

export default function TestPoints() {
  const [xL, setXL] = useState(-2)
  const [xR, setXR] = useState(10)
  const L = test(xL)
  const R = test(xR)

  const hard = L.hard ? L : R.hard ? R : null
  const surdEasy = !hard && (L.root === null ? L : R.root === null ? R : null)

  let notice
  if (hard) {
    notice = (
      <Notice tone="warn">
        At <M>{`x = ${hard.x}`}</M> the gradient is <M>{hard.result.replace(/ [<>] 0$/, '')}</M>, and on a
        calculator-free paper its sign isn&apos;t obvious at a glance. So that the marker can see the sign, add one more written line:{' '}
        <M>{hard.compare}</M> because <M>{hard.because}</M> (square both sides; both are positive). Easier: drag to
        an <M>x</M> that makes <M>x + 6</M> a perfect square: <M>x = -6</M>, <M>-5</M> or <M>-2</M> on the left
        and <M>x = 10</M> on the right.
      </Notice>
    )
  } else if (surdEasy) {
    notice = (
      <Notice>
        At <M>{`x = ${surdEasy.x}`}</M> the gradient is <M>{surdEasy.result.replace(/ [<>] 0$/, '')}</M>: a surd, but
        plainly positive, since nothing is being subtracted from it. Still write the substitution out in full. Now drag
        the right-hand point to <M>x = 4</M>, a value many students chose, and see what changes.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Both substitutions come out exact: <M>{`x = ${xL}`}</M> gives <M>{L.result}</M> (uphill) and{' '}
        <M>{`x = ${xR}`}</M> gives <M>{R.result}</M> (downhill). Positive then negative, so{' '}
        <M>{'\\left(3, \\tfrac{29}{4}\\right)'}</M> is a local maximum, and those two written-out lines are the whole
        argument. Now drag the right-hand point to <M>x = 4</M>, a value many students chose.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-6, 12]} y={[-8, 9]} xStep={2} yStep={2} height={320}>
        <Plot.OfX y={f} domain={[-6, 12]} color={C.f} weight={3} />
        <Point x={-6} y={-4} color={C.f} />
        <Line.Segment point1={[3 - HALF, 7.25]} point2={[3 + HALF, 7.25]} color={C.guide} style="dashed" weight={2} />
        <Point x={3} y={7.25} color={C.ink} />
        <Label at={[3, 7.25]} attach="n" size={12} gap={14}>(3, 29/4)</Label>
        <TestPoint t={L} lo={L_MIN} hi={L_MAX} onMove={setXL} />
        <TestPoint t={R} lo={R_MIN} hi={R_MAX} onMove={setXR} />
      </Plane>
      <Controls>
        <Slider label="\text{left}" value={xL} onChange={v => setXL(Math.round(v))} min={L_MIN} max={L_MAX} step={1} format={minus} />
        <Slider label="\text{right}" value={xR} onChange={v => setXR(Math.round(v))} min={R_MIN} max={R_MAX} step={1} format={minus} />
        <Readouts>
          <Readout color={L.value > 0 ? C.good : C.bad} tex={`\\tfrac{dy}{dx}\\Big|_{x=${xL}} = ${L.sub} = ${L.result}`} />
          <Readout color={R.value > 0 ? C.good : C.bad} tex={`\\tfrac{dy}{dx}\\Big|_{x=${xR}} = ${R.sub} = ${R.result}`} />
          <Readout tex="+ \;\to\; 0 \;\to\; - \;\Rightarrow\; \text{local maximum}" />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
