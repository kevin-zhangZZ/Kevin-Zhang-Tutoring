// 2016 Methods Exam 1 Q5a.ii — the range of h(x) = logₑ(x² + 1), found by following x through
// the chain x → g(x) = x² + 1 → logₑ(g(x)). Slide x: the inside never drops below 1, so the
// output never drops below logₑ 1 = 0, and it is 0 exactly at x = 0. A toggle overlays g itself,
// to show why [1, ∞) (g's range) is not h's range. The green bar on the y-axis is ran(h) = [0, ∞).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Buttons } from './kit'

const g = (x: number) => x * x + 1
const h = (x: number) => Math.log(g(x))

export default function RangeChain() {
  const [x0, setX0] = useState(1.5)
  const [showG, setShowG] = useState(false)
  const atZero = Math.abs(x0) < 0.05

  let notice
  if (atZero) {
    notice = (
      <Notice tone="good">
        <b>The lowest point.</b> At <M>x = 0</M> the inside is <M>0^2 + 1 = 1</M>, its smallest possible value, and{' '}
        <M>{'\\log_e 1 = 0'}</M>. So <M>0</M> is reached, which is why the range starts with a square bracket:{' '}
        <M>{'[0, \\infty)'}</M>, not <M>{'(0, \\infty)'}</M>.
      </Notice>
    )
  } else if (showG) {
    notice = (
      <Notice tone="warn">
        The orange curve <M>{'g(x) = x^2 + 1'}</M> never goes below <M>1</M>, so its range is <M>{'[1, \\infty)'}</M>. That is
        the set of <b>inputs</b> to <M>{'\\log_e'}</M>, not the answer: <M>{'\\log_e'}</M> sends <M>1</M> to <M>0</M>, so{' '}
        <M>h</M>&apos;s outputs fill <M>{'[0, \\infty)'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Here <M>{`x^2 + 1 = ${g(x0).toFixed(2)}`}</M>, which is at least <M>1</M>, so <M>{`h(x) = ${h(x0).toFixed(2)}`}</M> is
        at least <M>0</M>. Move <M>x</M> to <M>0</M> to find the lowest output, then turn on <M>g</M> to compare the two
        ranges. As <M>x</M> grows, <M>h</M> keeps growing (slowly), so there is no upper limit.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-4, 4]} y={[-1, 4.5]} xStep={1} yStep={1} height={320} yLabels={(v) => (v > 4 ? '' : String(v))} label="Graph of y = logₑ(x² + 1), with its range marked on the y-axis">
        <Line.Segment point1={[0, 0]} point2={[0, 4.5]} color={C.good} weight={6} opacity={0.5} />
        {showG && <Plot.OfX y={g} domain={[-1.9, 1.9]} color={C.g} weight={2.5} style="dashed" />}
        <Plot.OfX y={h} domain={[-4, 4]} color={C.f} weight={3} />
        <Line.Segment point1={[x0, 0]} point2={[x0, h(x0)]} color={C.guide} style="dashed" />
        <Line.Segment point1={[0, h(x0)]} point2={[x0, h(x0)]} color={C.guide} style="dashed" />
        <Point x={x0} y={h(x0)} color={C.f} />
        <Point x={0} y={0} color={C.good} />
        <Label at={[3.2, h(3.2)]} color={C.f} attach="nw">h</Label>
        {showG && <Label at={[1.6, g(1.6)]} color={C.g} attach="e">g</Label>}
        <Label at={[0, 3.6]} color={C.good} attach="w">ran h</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={-3.5} max={3.5} step={0.05} />
        <Buttons>
          <Toggle label={<>Show <M>{'g(x) = x^2 + 1'}</M></>} checked={showG} onChange={setShowG} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`g(x) = x^2 + 1 = ${g(x0).toFixed(2)}`} />
          <Readout color={C.f} tex={`h(x) = \\log_e(${g(x0).toFixed(2)}) = ${h(x0).toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
