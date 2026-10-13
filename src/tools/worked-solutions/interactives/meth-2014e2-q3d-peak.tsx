// 2014 Methods Exam 2 Q3d — n(t) = A·t·e^(−kt) peaks at t = 1/k with height A/(ke). k alone sets
// WHEN the peak happens; A only stretches the curve vertically. So "maximum at t = 0.5" is an
// equation in k only (n'(0.5) = 0 ⇒ k = 2), and the height 0.74 then fixes A = 1.48e ≈ 4.02.
// Starts at Juan's curve (A = 2.5, k = 1.5). Readout n'(0.5) shows it is 0 at the target, never 0.74.
// Numbers checked with sympy.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const TARGET: [number, number] = [0.5, 0.74]
const A_EXACT = 1.48 * Math.E // 4.0230…

export default function Peak() {
  const [A, setA] = useState(2.5)
  const [k, setK] = useState(1.5)

  const n = (t: number) => A * t * Math.exp(-k * t)
  const tp = 1 / k
  const hp = A / (k * Math.E)
  const dn05 = A * Math.exp(-k / 2) * (1 - k / 2)
  const timeOk = Math.abs(tp - 0.5) < 0.006
  const heightOk = Math.abs(hp - 0.74) < 0.012

  let notice
  if (timeOk && heightOk) {
    notice = (
      <Notice tone="good">
        <b>The peak sits on the target.</b> That needs <M>k = 2</M> and <M>{`A = 1.48e \\approx ${A_EXACT.toFixed(2)}`}</M>, so{' '}
        <M>A = 4</M> to the nearest integer. Check the readout: <M>n'(0.5)</M> is <M>0</M> here, not <M>0.74</M>.
      </Notice>
    )
  } else if (timeOk) {
    notice = (
      <Notice tone="good">
        <b>The peak is now at <M>t = 0.5</M>, because <M>k = 2</M>.</b> Changing <M>A</M> won&apos;t move it sideways
        — it only raises or lowers the peak. Now slide <M>A</M> until the height is <M>0.74</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Move <M>A</M> first: the peak goes up and down but <b>stays at <M>{`t = \\tfrac1k = ${tp.toFixed(2)}`}</M></b>.
        Only <M>k</M> moves it sideways, so the condition &ldquo;maximum at <M>t = 0.5</M>&rdquo; pins down{' '}
        <M>k</M> on its own. Slide <M>k</M> to put the peak above <M>t = 0.5</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 2.5]} y={[0, 1.4]} xStep={0.5} yStep={0.2} height={300} xLabel="t" yLabel="n" yLabels={v => v.toFixed(1)}>
        <Line.Segment point1={[0.5, 0]} point2={[0.5, 1.4]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[0, 0.74]} point2={[2.5, 0.74]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={TARGET[0]} y={TARGET[1]} color={C.g} />
        <Label at={[2.45, 0.74]} color={C.g} attach="nw">target (0.5, 0.74)</Label>
        <Plot.OfX y={n} domain={[0, 2.5]} color={C.f} weight={3} />
        <Point x={tp} y={hp} color={timeOk && heightOk ? C.good : C.f} />
        <Label at={[tp, hp]} color={timeOk && heightOk ? C.good : C.f} attach="ne">peak</Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={0.8} max={4} step={0.05} />
        <Slider label="A" value={A} onChange={setA} min={0.5} max={6} step={0.01} />
        <Readouts>
          <Readout tex={`\\text{peak at } t = \\tfrac1k = ${tp.toFixed(3)}`} />
          <Readout tex={`\\text{peak height } \\tfrac{A}{ke} = ${hp.toFixed(3)}`} />
          <Readout color={timeOk ? C.good : undefined} tex={`n'(0.5) = ${dn05.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
