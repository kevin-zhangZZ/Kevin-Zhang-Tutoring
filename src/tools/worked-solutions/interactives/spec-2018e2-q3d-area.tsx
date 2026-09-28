// 2018 Specialist Exam 2 Q3d — the time is the area under dt/dh. Flipping dh/dt gives
// dt/dh = 25π(4h² + 1)/(4 − 5√h), the number of seconds each metre of depth "costs" at depth h.
// Shading under it from 0 to a chosen depth gives the time taken: 9.8 s to reach 0.25 m (part d)
// and 25.0 s to reach 0.4 m (the "after 25 seconds" given in part e). The curve blows up at
// h = 0.64, where the level stops rising (part f).

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, integrate } from './kit'

const g = (h: number) => (25 * Math.PI * (4 * h * h + 1)) / (4 - 5 * Math.sqrt(Math.max(h, 0)))
const Y_MAX = 240

export default function TimeArea() {
  const [H, setH] = useState(0.25)
  const t = integrate(g, 0, H, 400)
  const at25 = Math.abs(H - 0.25) < 0.003
  const at40 = Math.abs(H - 0.4) < 0.003

  let notice
  if (at25) {
    notice = (
      <Notice tone="good">
        <b>The shaded area is the time: about 9.8 seconds.</b> Each thin strip is{' '}
        <M>{'\\tfrac{dt}{dh}\\times\\delta h'}</M>, the seconds spent rising through that <M>{'\\delta h'}</M> of depth, and the
        integral adds them up from <M>h = 0</M> (empty) to <M>h = 0.25</M>. Try the <M>h = 0.4</M> button next.
      </Notice>
    )
  } else if (at40) {
    notice = (
      <Notice>
        To reach <M>0.4</M> m the area is about <M>25.0</M> seconds, which is where part e&apos;s &ldquo;after 25 seconds the
        depth has risen to 0.4 m&rdquo; comes from. Notice the strips are getting taller: each centimetre takes longer as the
        surface widens and the outflow grows.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{'\\tfrac{dt}{dh}'}</M> is <b>seconds per metre of depth</b>. It rises steeply and has an asymptote at{' '}
        <M>h = 0.64</M>, where <M>{'4 - 5\\sqrt h = 0'}</M>: there the level stops rising, so the area (the time) to reach{' '}
        <M>0.64</M> is infinite. That is part f seen from the other side.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 0.7]} y={[0, Y_MAX]} xStep={0.1} yStep={40} height={300} xLabel="h" yLabel="dt/dh" xLabels={v => v.toFixed(1)}>
        <Region top={g} bottom={() => 0} from={0} to={H} color={C.f} opacity={0.3} />
        <Plot.OfX y={g} domain={[0, 0.462]} color={C.f} weight={3} />
        <Line.Segment point1={[0.64, 0]} point2={[0.64, Y_MAX]} color={C.good} style="dashed" weight={2} />
        <Label at={[0.64, 200]} attach="w" color={C.good} size={12}>h = 0.64</Label>
        <Point x={H} y={g(H)} color={C.f} />
        <Label at={[0.35, g(0.35)]} attach="nw" color={C.f}>dt/dh</Label>
      </Plane>
      <Controls>
        <Slider label="h" value={H} onChange={setH} min={0.02} max={0.45} step={0.005} format={v => `${v.toFixed(3)} m`} />
        <Buttons>
          <ActionButton label="h = 0.25 (part d)" onClick={() => setH(0.25)} />
          <ActionButton label="h = 0.4 (part e)" onClick={() => setH(0.4)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`t = \\int_0^{${H.toFixed(3)}} \\frac{25\\pi(4h^2+1)}{4-5\\sqrt h}\\,dh \\approx ${t.toFixed(1)}\\text{ s}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
