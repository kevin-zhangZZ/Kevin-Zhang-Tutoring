// 2018 Methods Exam 2 Q1d — why the tangent's contact point is a repeated root. Rotate a line
// through P(−1/3, −13/9) on f(x) = 3x⁴ + 4x³ − 12x²: a general line through P crosses the curve
// at P and at another point close by; as the gradient reaches 80/9 that neighbouring intersection
// slides into P, so x = −1/3 becomes a double root of f(x) − l(x) = (3x + 1)²(9x² + 6x − 41)/27,
// leaving x = (−1 ± √42)/3. The lower graph is f(x) − (line), zoomed in near P because the gap
// between P and its neighbour is only about 0.15 high at full scale. A toggle shows the report's slip of
// solving f'(x) = 80/9 instead: x = (−1 ± √21)/3 are points with a parallel tangent, not on l.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const f = (x: number) => 3 * x ** 4 + 4 * x ** 3 - 12 * x ** 2
const X0 = -1 / 3
const Y0 = f(X0)
const MT = 80 / 9
const PAR = [(-1 - Math.sqrt(21)) / 3, (-1 + Math.sqrt(21)) / 3]

/** All x where f meets the line of gradient m through P: x = −1/3 always, plus sign changes of
 *  f − line away from P (the neighbour of P merges into it when m = 80/9). */
function meets(m: number): number[] {
  const g = (x: number) => f(x) - (m * (x - X0) + Y0)
  const out: number[] = []
  const N = 1400
  const lo = -4
  const hi = 3
  for (let i = 0; i < N; i++) {
    const x1 = lo + ((hi - lo) * i) / N
    const x2 = lo + ((hi - lo) * (i + 1)) / N
    if (g(x1) * g(x2) < 0) {
      let s = x1
      let t = x2
      for (let k = 0; k < 50; k++) {
        const mid = (s + t) / 2
        if (g(s) * g(mid) <= 0) t = mid
        else s = mid
      }
      out.push((s + t) / 2)
    }
  }
  return [...out.filter(r => Math.abs(r - X0) > 0.004), X0].sort((u, v) => u - v)
}

export default function Double() {
  const [mRaw, setM] = useState(6)
  const [grad, setGrad] = useState(false)
  const tangent = Math.abs(mRaw - MT) < 0.06
  const m = tangent ? MT : mRaw
  const L = (x: number) => m * (x - X0) + Y0
  const pts = meets(m)
  const others = pts.filter(r => Math.abs(r - X0) > 0.004)
  const near = others.filter(r => Math.abs(r - X0) < 1.2)

  let notice
  if (grad) {
    notice = (
      <Notice tone="warn">
        Solving <M>{"f'(x) = \\tfrac{80}{9}"}</M> finds where the <b>curve&apos;s gradient</b> matches the line&apos;s:{' '}
        <M>{'x = -\\tfrac13'}</M> and <M>{'x = \\tfrac{-1 \\pm \\sqrt{21}}{3}'}</M>. The red dashes are tangents{' '}
        <em>parallel</em> to <M>l</M>, and their points are nowhere near it. The question asks where the curve and
        the line <b>meet</b>, which means solving <M>{'f(x) = l(x)'}</M>.
      </Notice>
    )
  } else if (tangent) {
    notice = (
      <Notice tone="good">
        <b>At <M>{'m = \\tfrac{80}{9}'}</M> the line is the tangent</b>: the neighbouring intersection has slid into{' '}
        <M>P</M>, so the lower graph now <em>touches</em> the axis at <M>{'x = -\\tfrac13'}</M>. That is a double
        root: <M>{'(3x+1)^2'}</M> divides <M>{'f(x) - l(x)'}</M>, leaving <M>{'9x^2 + 6x - 41 = 0'}</M>, so{' '}
        <M>{'x = \\tfrac{-1 \\pm \\sqrt{42}}{3}'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        A line through <M>P</M> with gradient <M>{`m = ${m.toFixed(1)}`}</M> <b>crosses</b> the curve at <M>P</M>, and
        there is another crossing nearby (see the zoom){near.length ? <> at <M>{`x \\approx ${near.map(r => r.toFixed(2)).join(',\\ ')}`}</M></> : null}.
        Turn the line towards <M>{'m = \\tfrac{80}{9} \\approx 8.89'}</M> and watch that neighbour close in on{' '}
        <M>P</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 2.4]} y={[-34, 24]} xStep={1} yStep={10} height={280}>
        <Plot.OfX y={f} domain={[-3.2, 2.3]} color={C.f} weight={3} />
        <Plot.OfX y={L} domain={[-3.4, 2.8]} color={tangent ? C.g : C.guide} weight={2.5} />
        {grad &&
          PAR.map(x => (
            <Line.Segment
              key={x.toFixed(4)}
              point1={[x - 0.45, f(x) - 0.45 * MT]}
              point2={[x + 0.45, f(x) + 0.45 * MT]}
              color={C.bad}
              style="dashed"
              weight={2.5}
            />
          ))}
        {grad && PAR.map(x => <Point key={`p${x.toFixed(4)}`} x={x} y={f(x)} color={C.bad} />)}
        {others.map(r => (
          <Point key={r.toFixed(4)} x={r} y={f(r)} color={C.ink} />
        ))}
        <Point x={X0} y={Y0} color={tangent ? C.good : C.g} />
        <Label at={[X0, Y0]} attach="se" color={tangent ? C.good : C.g} size={12}>P</Label>
        <Label at={[0.6, L(0.6)]} attach="nw" color={tangent ? C.g : C.guide}>{tangent ? 'l' : 'line'}</Label>
        <Label at={[-2.2, -28]} attach="w" color={C.f}>f</Label>
      </Plane>
      <div className="mt-2 mb-1 text-xs font-semibold" style={{ color: C.violet }}>
        Zoom near P: y = f(x) − line, which is zero wherever the line meets the curve
      </div>
      <Plane x={[-1, 1 / 3]} y={[-0.5, 0.3]} xStep={1 / 3} yStep={0.1} height={170} yLabels={false} yLabel="">
        <Plot.OfX y={x => f(x) - L(x)} domain={[-1.2, 0.6]} color={C.violet} weight={2.5} />
        {pts.map(r => (
          <Point key={`z${r.toFixed(4)}`} x={r} y={0} color={Math.abs(r - X0) < 0.004 ? (tangent ? C.good : C.g) : C.ink} />
        ))}
      </Plane>
      <Controls>
        <Slider label="m" value={mRaw} onChange={setM} min={4} max={14} step={0.1} format={v => (Math.abs(v - MT) < 0.06 ? '80/9' : v.toFixed(1))} />
        <Buttons>
          <ActionButton label="m = 80/9" onClick={() => setM(MT)} />
          <Toggle label="Solve f′(x) = 80/9 instead" checked={grad} onChange={setGrad} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\text{intersection points: } ${pts.length}`} />
          {tangent && <Readout color={C.good} tex={'x = -\\tfrac13 \\text{ counts twice}'} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
