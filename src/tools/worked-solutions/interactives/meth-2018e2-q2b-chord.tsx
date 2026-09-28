// 2018 Methods Exam 2 Q2b — the average rate of change over [2, 6] is the one steady rate that takes
// the amount from b(2) to b(6) in 4 hours, i.e. the gradient of the chord. Drag a steady rate m and
// see where a line of that gradient from (2, b(2)) ends at t = 6; only m ≈ −33.5 lands on b(6).
// A toggle shows the report's wrong idea — averaging the tangent gradients at t = 2 and t = 6
// (−13.33) — overshooting the target by about 80 mg.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const A = 4500 / 7
const b = (t: number) => A * (Math.exp(-t / 5) - Math.exp(-0.9 * t))
const db = (t: number) => A * (-0.2 * Math.exp(-t / 5) + 0.9 * Math.exp(-0.9 * t))
const B2 = b(2)
const B6 = b(6)
const CHORD = (B6 - B2) / 4
const AVG_GRAD = (db(2) + db(6)) / 2
const H = 0.7 // half-width, in hours, of the tangent segments

export default function Chord() {
  const [m, setM] = useState(-10)
  const [wrong, setWrong] = useState(false)

  const end = B2 + 4 * m
  const onTarget = Math.abs(m - CHORD) < 0.25
  const flipped = Math.abs(m + CHORD) < 1
  const lineColor = onTarget ? C.good : C.g
  const wrongEnd = B2 + 4 * AVG_GRAD
  const tan = (t0: number) => (
    <Line.Segment
      point1={[t0 - H, b(t0) - H * db(t0)]}
      point2={[t0 + H, b(t0) + H * db(t0)]}
      color={C.bad}
      weight={2.5}
      style="dashed"
    />
  )

  let notice
  if (onTarget) {
    notice = (
      <Notice tone="good">
        <b>This line lands exactly on <M>b(6)</M>.</b> A steady rate of <M>{`${num(CHORD, 1)}`}</M> mg/h takes the
        amount from <M>{`${num(B2, 2)}`}</M> to <M>{`${num(B6, 2)}`}</M> in 4 hours, so this line <em>is</em> the chord,
        and its gradient <M>{'\\frac{b(6)-b(2)}{6-2}'}</M> is the average rate of change. The minus sign says the drug is
        leaving.
      </Notice>
    )
  } else if (wrong) {
    notice = (
      <Notice tone="warn">
        The red tangents at <M>t=2</M> and <M>t=6</M> have gradients <M>{`${num(db(2), 2)}`}</M> and{' '}
        <M>{`${num(db(6), 2)}`}</M>. Their average, <M>{`${num(AVG_GRAD, 2)}`}</M>, run for 4 hours from <M>b(2)</M>{' '}
        would leave <M>{`${num(wrongEnd, 1)}`}</M> mg, not <M>{`${num(B6, 1)}`}</M>. Two instants can&apos;t tell you
        what the curve does in between. Now drag <M>m</M> until the orange line hits the target.
      </Notice>
    )
  } else if (flipped) {
    notice = (
      <Notice tone="warn">
        <M>+33.5</M> is the report&apos;s common wrong answer. A <b>positive</b> rate means the amount rises, but the
        curve falls from <M>{`${num(B2, 1)}`}</M> to <M>{`${num(B6, 1)}`}</M> mg. Always subtract in the order{' '}
        <M>{'b(\\text{later})-b(\\text{earlier})'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Drag <M>m</M> to find the one <b>steady</b> rate that starts at <M>b(2)</M> and lands exactly on{' '}
        <M>b(6)</M>. {end > B6 ? 'Right now the line ends above the target: too gentle.' : 'Right now the line ends below the target: too steep.'}{' '}
        Then switch on the toggle to test the &ldquo;average of the two gradients&rdquo; idea.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 6.6]} y={[0, 480]} xStep={1} yStep={100} height={320} xLabel="t" yLabel="y">
        <Plot.OfX y={b} domain={[0, 6]} color={C.f} weight={3} />
        {wrong && (
          <>
            {tan(2)}
            {tan(6)}
            <Line.Segment point1={[2, B2]} point2={[6, wrongEnd]} color={C.bad} weight={2.5} />
            <Point x={6} y={wrongEnd} color={C.bad} />
            <Label at={[6, wrongEnd]} color={C.bad} attach="se">{num(wrongEnd, 1)}</Label>
          </>
        )}
        <Line.Segment point1={[2, B2]} point2={[6, end]} color={lineColor} weight={3} />
        <Point x={6} y={end} color={lineColor} />
        <Point x={2} y={B2} color={C.f} />
        <Point x={6} y={B6} color={C.f} />
        <Label at={[2, B2]} color={C.f} attach="n">b(2)</Label>
        <Label at={[6, B6]} color={C.f} attach="se">b(6)</Label>
      </Plane>
      <Controls>
        <Slider label="m" value={m} onChange={setM} min={-60} max={40} step={0.1} format={v => v.toFixed(1)} />
        <Buttons>
          <Toggle label="Average the gradients at t = 2 and t = 6" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={lineColor} tex={`b(2) + 4m = ${num(end, 2)}`} />
          <Readout color={C.f} tex={`\\text{target } b(6) = ${num(B6, 2)}`} />
          {wrong && <Readout color={C.bad} tex={`\\tfrac{b'(2)+b'(6)}{2} = ${num(AVG_GRAD, 2)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
