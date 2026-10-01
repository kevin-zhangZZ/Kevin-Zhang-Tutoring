// 2023 Methods Exam 2 Q2d.ii — the third piece h(2t + n) has to start where the pod stopped,
// at height 135 m, so w(20) = h(40 + n) = 135. Slide n: for most values the graph jumps at
// t = 20 (the pod would teleport). It joins up at n = 5, and again at n = 35 and n = −25, which
// give exactly the same curve because h has period 30. Half-way values such as n = 20 start the
// pod at the bottom instead, which is why p must be an integer in n = 5 + 30p.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const h = (x: number) => -60 * Math.cos((Math.PI * x) / 15) + 75
const K = 135

export default function Join() {
  const [n, setN] = useState(0)

  const start = h(40 + n)
  const joined = Math.abs(start - K) < 1e-6
  const atBottom = Math.abs(start - 15) < 1e-6
  const p = Math.round((n - 5) / 30)
  const third = (t: number) => h(2 * t + n)
  const pieceColor = joined ? C.good : C.g

  let notice
  if (joined && p === 0) {
    notice = (
      <Notice tone="good">
        <b><M>n = 5</M>: the pieces join.</b> <M>{'w(20) = h(45) = 135'}</M>, so the pod restarts from the top and the
        graph is one unbroken curve. But the question asks for <b>all</b> possible values of <M>n</M>: keep sliding to{' '}
        <M>n = 35</M> and to <M>n = -25</M>.
      </Notice>
    )
  } else if (joined) {
    notice = (
      <Notice tone="good">
        <b><M>{`n = ${n} = 5 ${p > 0 ? '+' : '-'} 30${Math.abs(p) === 1 ? '' : `(${Math.abs(p)})`}`}</M> gives exactly
        the same curve as <M>n = 5</M>.</b> Adding <M>30</M> inside <M>h</M> moves it one full period (the wheel turns
        once every 30 minutes), so nothing changes. That is why the answer is <M>{'n = 5 + 30p,\\ p \\in Z'}</M>.
      </Notice>
    )
  } else if (atBottom) {
    notice = (
      <Notice tone="warn">
        <M>{`n = ${n}`}</M> is half-way between two solutions (<M>{`p = ${((n - 5) / 30).toFixed(1)}`}</M>), and{' '}
        <M>{`h(${40 + n}) = 15`}</M>: the pod would restart from the <b>bottom</b>, a 120 m jump. Only whole-number
        values of <M>p</M> put the pod at the top, so <M>{'p \\in Z'}</M>, not <M>{'p \\in R'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At <M>t = 20</M> the third piece starts at <M>{'h(40 + n)'}</M> <M>{`\\approx ${start.toFixed(1)}`}</M> m, but
        the pod stopped at <M>{'k = 135'}</M> m. The graph jumps, so the pod would teleport. The pieces must join, so
        solve <M>{'h(40 + n) = 135'}</M>. Slide <M>n</M> until the red gap closes.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 30]} y={[0, 150]} xStep={5} yStep={30} height={320} xLabel="t" yLabel="w">
        <Plot.OfX y={h} domain={[0, 15]} color={C.f} weight={3} />
        <Line.Segment point1={[15, K]} point2={[20, K]} color={C.f} weight={3} />
        <Plot.OfX y={third} domain={[20, 27.5]} color={pieceColor} weight={3} />
        {!joined && (
          <Line.Segment point1={[20, K]} point2={[20, start]} color={C.bad} style="dashed" weight={2} />
        )}
        <Point x={20} y={K} color={C.f} />
        <Point x={20} y={start} color={pieceColor} />
        <Point x={27.5} y={third(27.5)} color={pieceColor} />
        <Label at={[17.5, K]} attach="n" color={C.f}>k = 135</Label>
        {!joined && (
          <Label at={[20, start]} attach="w" color={C.g}>
            h(40 + n)
          </Label>
        )}
        <Label at={[7.5, h(7.5)]} attach="nw" color={C.f}>h(t)</Label>
        <Label at={[23.75, third(23.75)]} attach="ne" color={pieceColor}>h(2t + n)</Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={setN} min={-30} max={40} step={0.5} format={v => v.toFixed(1)} />
        <Readouts>
          <Readout
            color={joined ? C.good : C.bad}
            tex={`w(20) = h(40 + n) = h(${(40 + n).toFixed(1)}) ${joined || atBottom ? '=' : '\\approx'} ${joined || atBottom ? Math.round(start) : start.toFixed(1)}`}
          />
          {joined && <Readout color={C.good} tex={`n = 5 + 30(${p}) \\checkmark`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
