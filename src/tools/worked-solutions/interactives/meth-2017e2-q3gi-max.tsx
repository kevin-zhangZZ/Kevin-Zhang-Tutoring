// 2017 Methods Exam 2 Q3g.i — the maximum of q(p) = 21p²(1 − p)⁵ + 35p³(1 − p)⁴ is where its
// tangent is flat. Slide p along [0, 1]: the tangent slopes up while q′(p) > 0 and down once
// q′(p) < 0, and it is horizontal at p = (√30 − 3)/7 ≈ 0.3539, where q ≈ 0.5665. The curve starts
// and ends at q = 0 (p = 0: never more than d minutes; p = 1: every day), so that flat point in
// between must be the maximum. The question wants both numbers, p and q.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Text, num } from './kit'

const q = (p: number) => 21 * p ** 2 * (1 - p) ** 5 + 35 * p ** 3 * (1 - p) ** 4
/** q′(p) = −14p(1 − p)³(7p² + 6p − 3), from the factorised q = 7p²(1 − p)⁴(2p + 3). */
const dq = (p: number) => -14 * p * (1 - p) ** 3 * (7 * p * p + 6 * p - 3)
const P_STAR = (Math.sqrt(30) - 3) / 7
const Q_STAR = q(P_STAR)

// Plot units: 100p across and 100q up (mafs pads the view in plot units, so a 0–1 range would be
// squashed). Scaling both axes by 100 leaves the tangent's gradient unchanged. Tick numbers are
// drawn by hand; in mafs, attach "n" hangs the text below the anchor.

export default function MaxQ() {
  const [p, setP] = useState(0.15)
  const qp = q(p)
  const m = dq(p)
  const flat = Math.abs(p - P_STAR) < 0.006
  const X = 100 * p
  const Yv = 100 * qp
  const half = 13 // half-length of the tangent segment, in plot units across
  const tangentColor = flat ? C.good : C.violet

  let notice
  if (flat) {
    notice = (
      <Notice tone="good">
        <b>The tangent is flat: <M>{"q'(p) = 0"}</M>.</b> This is <M>{'p = \\tfrac{\\sqrt{30}-3}{7} \\approx 0.3539'}</M>, and
        substituting back gives <M>q \approx 0.5665</M>. Both ends of the curve are at <M>q = 0</M>, so this one flat point in
        between is the maximum. The question asks for <b>both</b> numbers, correct to four decimal places: the report notes some
        students found only <M>p</M>, and some gave exact values.
      </Notice>
    )
  } else if (p < 0.02 || p > 0.98) {
    notice = (
      <Notice>
        At the ends <M>q</M> is (almost) <M>0</M>. With <M>p = 0</M> she never works more than <M>d</M> minutes, and with{' '}
        <M>p = 1</M> she does every day; either way she can&apos;t do it on exactly 2 or 3 days. So <M>q</M> rises from 0 and
        comes back down to 0, and its maximum is at a stationary point inside <M>(0, 1)</M>.
      </Notice>
    )
  } else if (m > 0) {
    notice = (
      <Notice>
        The tangent slopes <b>up</b>: <M>{"q'(p)"}</M> ≈ {num(m, 2)} &gt; 0, so a slightly bigger <M>p</M> still makes{' '}
        <M>q</M> bigger. We haven&apos;t reached the top yet. Slide <M>p</M> to the right until the tangent is flat.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The tangent slopes <b>down</b>: <M>{"q'(p)"}</M> ≈ {num(m, 2)} &lt; 0, so we are past the top and a bigger <M>p</M>{' '}
        makes <M>q</M> smaller. The maximum is where the gradient changes from positive to negative, where{' '}
        <M>{"q'(p) = 0"}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-16, 108]} y={[-10, 68]} xStep={10} yStep={10} labels={false} xLabel="" yLabel="" height={300}>
        <Text x={0} y={63} attach="e" attachDistance={6} size={14} color={C.ink} svgTextProps={{ fontStyle: 'italic' }}>q</Text>
        <Text x={108} y={0} attach="w" attachDistance={2} size={14} color={C.ink} svgTextProps={{ fontStyle: 'italic', dy: '-0.9em' }}>p</Text>
        {[20, 40, 60, 80, 100].map(v => (
          <Text key={v} x={v} y={0} attach="n" attachDistance={17} size={12} color={C.ink}>{v === 100 ? '1' : (v / 100).toFixed(1)}</Text>
        ))}
        {[20, 40, 60].map(v => (
          <Text key={v} x={0} y={v} attach="w" attachDistance={7} size={12} color={C.ink}>{(v / 100).toFixed(1)}</Text>
        ))}
        <Plot.OfX y={x => 100 * q(x / 100)} domain={[0, 100]} color={C.f} weight={3} />
        {flat && (
          <>
            <Line.Segment point1={[100 * P_STAR, 0]} point2={[100 * P_STAR, 100 * Q_STAR]} color={C.good} style="dashed" weight={1.5} />
            <Line.Segment point1={[0, 100 * Q_STAR]} point2={[100 * P_STAR, 100 * Q_STAR]} color={C.good} style="dashed" weight={1.5} />
          </>
        )}
        <Line.Segment point1={[X - half, Yv - half * m]} point2={[X + half, Yv + half * m]} color={tangentColor} weight={2.5} />
        <Point x={X} y={Yv} color={flat ? C.good : C.g} />
        {flat && <Label at={[X, Yv + 3]} color={C.good} attach="n">maximum</Label>}
      </Plane>
      <Controls>
        <Slider label="p" value={p} onChange={setP} min={0} max={1} step={0.001} format={v => v.toFixed(3)} />
        <Readouts>
          <Readout color={C.g} tex={`q(${num(p, 3)}) \\approx ${num(qp, 4)}`} />
          <Readout color={tangentColor} tex={`q'(${num(p, 3)}) \\approx ${num(m, 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
