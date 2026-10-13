// 2014 Methods Exam 2 Q4d — the smallest 15% of a sine-arch density sit below the height a
// where the shaded area from 0 to a is 0.15: ½(1 − cos(πa/50)) = 0.15 gives a ≈ 12.66 cm. Slide
// a until the area reads 0.15. A toggle overlays a normal curve with the same mean (25) and
// standard deviation (√(625 − 5000/π²) ≈ 10.88) to show why the normal distribution — the
// report's common error — gives a different answer (≈ 13.72 cm, i.e. 137 mm): the shapes differ.

import { useState } from 'react'
import { C, Controls, Buttons, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle } from './kit'

const h = (x: number) => (x > 0 && x < 50 ? (Math.PI / 100) * Math.sin((Math.PI * x) / 50) : 0)
const area = (a: number) => 0.5 * (1 - Math.cos((Math.PI * a) / 50))
const A_EXACT = (50 / Math.PI) * Math.acos(0.7) // 12.659...
const SD = Math.sqrt(625 - 5000 / (Math.PI * Math.PI)) // 10.8809...
const nrm = (x: number) => Math.exp(-((x - 25) ** 2) / (2 * SD * SD)) / (SD * Math.sqrt(2 * Math.PI))
const N15 = 13.7227 // invNorm(0.15, 25, 10.8809...)

export default function SineQuantile() {
  const [a, setA] = useState(20)
  const [normal, setNormal] = useState(false)
  const p = area(a)
  const hit = Math.abs(p - 0.15) < 0.004

  let notice
  if (normal) {
    notice = (
      <Notice tone="warn">
        The dashed curve is a <b>normal</b> curve with the same mean (25) and standard deviation (about 10.88). Its
        bottom 15% ends at about <M>13.72</M> cm (137 mm), not <M>12.66</M> cm: the sine arch has no tails and is
        flatter near 0, so the areas build up differently. Only <M>h(x)</M> itself can be used.
      </Notice>
    )
  } else if (hit) {
    notice = (
      <Notice tone="good">
        <b>The shaded area is 0.15</b>, so 15% of the plants are shorter than <M>a \approx 12.66</M> cm. That is the
        tallest a plant can be and still get the plant food: <M>127</M> mm. Now turn on the normal-curve comparison.
      </Notice>
    )
  } else if (p > 0.15) {
    notice = (
      <Notice>
        The shaded area is the proportion of plants shorter than <M>a</M>. It is more than <M>0.15</M> here, so move{' '}
        <M>a</M> <b>left</b> until the area reads 0.15.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The shaded area is less than <M>0.15</M>, so move <M>a</M> <b>right</b> until it reads 0.15.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 52]} y={[0, 0.042]} xStep={10} yStep={0.01} height={300} yLabel="" yLabels={false}>
        <Region top={h} bottom={() => 0} from={0} to={a} color={hit ? C.good : C.f} opacity={0.3} />
        <Plot.OfX y={h} domain={[0, 50]} color={C.f} weight={3} />
        {normal && <Plot.OfX y={nrm} domain={[0, 52]} color={C.g} weight={2.5} style="dashed" />}
        {normal && <Line.Segment point1={[N15, 0]} point2={[N15, nrm(N15)]} color={C.g} weight={2} />}
        {normal && <Label at={[N15, 0.004]} color={C.g} attach="e">13.72</Label>}
        <Line.Segment point1={[a, 0]} point2={[a, h(a)]} color={hit ? C.good : C.ink} weight={2} />
        <Label at={[a, h(a)]} color={hit ? C.good : C.ink} attach="nw">a</Label>
        <Label at={[37, h(37)]} color={C.f} attach="ne">h(x)</Label>
        {normal && <Label at={[8, nrm(8)]} color={C.g} attach="nw">normal</Label>}
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={0} max={50} step={0.02} />
        <Buttons>
          <Toggle label="Compare with a normal curve" checked={normal} onChange={setNormal} />
        </Buttons>
        <Readouts>
          <Readout color={hit ? C.good : C.f} tex={`\\int_0^{${a.toFixed(2)}} h(x)\\,dx = ${p.toFixed(3)}`} />
          {hit && <Readout color={C.good} tex={`a = ${A_EXACT.toFixed(2)}\\text{ cm} \\approx 127\\text{ mm}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
