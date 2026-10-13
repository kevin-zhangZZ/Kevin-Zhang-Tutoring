// 2015 Methods Exam 2 Q4a — the shaded logo is TWO regions, each of area 4, so the total is 8.
// The slider draws a·sin(x) on [0, π] and shades the area under it, 2a, next to the logo's two
// regions. It starts at the report's common wrong answer a = 2: the violet area 4 matches only the
// left region. At a = 4 it matches both. Numbers checked with sympy:
// ∫_0^π (2 sin x − ½ sin 2x) dx = 4, ∫_0^π ½ sin 2x dx = 0, ∫_0^π a sin x dx = 2a.

import { useState } from 'react'
import { C, Controls, Label, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider } from './kit'

const f = (x: number) => 2 * Math.sin(x)
const g = (x: number) => 0.5 * Math.sin(2 * x)
const PI = Math.PI

function piTicks(v: number): string {
  const k = Math.round(v / (PI / 2))
  if (Math.abs(v - (k * PI) / 2) > 1e-6) return ''
  return ['', 'π/2', 'π', '3π/2', '2π'][k] ?? ''
}

export default function TwoRegions() {
  const [a, setA] = useState(2)
  const area = 2 * a
  const ay = (x: number) => a * Math.sin(x)

  let notice
  if (a === 2) {
    notice = (
      <Notice tone="warn">
        <M>a = 2</M> is the report's common wrong answer. The violet area under <M>2\sin x</M> is <M>4</M>, which
        matches only the <b>left</b> red region. The logo also has a second region on <M>(\pi, 2\pi)</M>, the same
        size. Drag <M>a</M> until the violet area covers both.
      </Notice>
    )
  } else if (a === 4) {
    notice = (
      <Notice tone="good">
        <M>a = 4</M>: the area under <M>4\sin x</M> on <M>[0,\pi]</M> is <M>2a = 8</M>, the total of both red
        regions. Note <M>4\sin x = 2\times 2\sin x</M>: twice the area under <M>f</M>, because <M>g</M> adds nothing
        net on <M>(0,\pi)</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>a\int_0^\pi \sin x\,dx = 2a</M>, so the violet area grows by 2 for every 1 you add to <M>a</M>. It has to
        equal the total red area, <M>4+4=8</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, 2 * PI]}
        y={[-2.4, 6.4]}
        xStep={PI / 2}
        yStep={1}
        xLabels={piTicks}
        yLabels={v => (Math.abs(v - Math.round(v)) < 1e-9 && Math.round(v) % 2 === 0 ? String(Math.round(v)) : '')}
        height={300}
        label="Graphs of f and g with both shaded regions, and the area under a sin x on [0, π]"
      >
        <Region top={f} bottom={g} from={0} to={2 * PI} color={C.bad} opacity={0.25} />
        <Plot.OfX y={f} domain={[0, 2 * PI]} color={C.f} weight={2.5} />
        <Plot.OfX y={g} domain={[0, 2 * PI]} color={C.g} weight={2.5} />
        <Region top={ay} bottom={() => 0} from={0} to={PI} color={C.violet} opacity={0.3} />
        <Plot.OfX y={ay} domain={[0, PI]} color={C.violet} weight={3} style="dashed" />
        <Label at={[PI / 2, 0.9]} color={C.bad} attach="c">4</Label>
        <Label at={[(3 * PI) / 2, -0.9]} color={C.bad} attach="c">4</Label>
        <Label at={[PI / 2, a]} color={C.violet} attach="n">{`${a} sin x`}</Label>
        <Label at={[5.2, 2]} color={C.f} attach="c">f = 2 sin x</Label>
        <Label at={[5.2, 1.1]} color={C.g} attach="c">g = ½ sin 2x</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={1} max={6} step={0.5} format={v => v.toFixed(1)} />
        <Readouts>
          <Readout color={C.violet} tex={`a\\int_0^\\pi\\sin x\\,dx = ${area % 1 === 0 ? area.toFixed(0) : area.toFixed(1)}`} />
          <Readout color={C.bad} tex={`\\text{red area} = 4+4 = 8`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
