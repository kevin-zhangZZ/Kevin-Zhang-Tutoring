// 2014 Specialist Exam 2 Q4c — the time to fill is the area under dt/dh. Slide the depth H: the
// shaded area under dt/dh = h²/(4(0.02 − 0.01√h)) from 0 to H is the time taken to reach depth H.
// Half depth comes after only 0.75 min; most of the 7.37 min is spent on the top part. A toggle
// draws dh/dt instead (a report trap): its area is not a time, and it blows up near h = 0.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle, integrate } from './kit'

const dtdh = (h: number) => (h * h) / (4 * (0.02 - 0.01 * Math.sqrt(h)))
const dhdt = (h: number) => (4 * (0.02 - 0.01 * Math.sqrt(h))) / (h * h)
const FULL = integrate(dtdh, 0, 1, 400)

export default function TimeArea() {
  const [H, setH] = useState(0.5)
  const [wrong, setWrong] = useState(false)
  const t = integrate(dtdh, 0, H, 400)
  const atFull = H > 0.995

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        The orange curve is <M>{'\\tfrac{dh}{dt}'}</M>. Its area against <M>h</M> has units (m/min)·m = m²/min, so it is not a
        time, and it shoots up as <M>{'h \\to 0'}</M>, so <M>{'\\int_0^1 \\tfrac{dh}{dt}\\,dh'}</M> does not even exist. Only the
        reciprocal, <M>{'\\tfrac{dt}{dh}'}</M> (minutes per metre), adds up to minutes.
      </Notice>
    )
  } else if (atFull) {
    notice = (
      <Notice tone="good">
        <b>The whole area from 0 to 1 is the time to fill:</b> <M>{`\\int_0^1 \\tfrac{dt}{dh}\\,dh \\approx ${FULL.toFixed(4)}`}</M>, so
        about <M>7.4</M> minutes. Now turn on the toggle to see what integrating <M>{'\\tfrac{dh}{dt}'}</M> would do.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Think of the shaded area as thin strips: each has height <M>{'\\tfrac{dt}{dh}'}</M> (minutes per metre) and width <M>{'\\Delta h'}</M> (metres), so its area is
        the minutes spent gaining that bit of depth. The shaded area is the time to reach depth <M>H</M>. Half depth takes
        only <M>0.75</M> min: the top half holds <M>{'\\tfrac78'}</M> of the volume, and the outflow grows as it fills. Drag <M>H</M> to 1.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.1, 1.08]} y={[0, 27]} xStep={0.25} yStep={5} height={320} xLabel="h" yLabel="dt/dh">
        {!wrong && <Region top={dtdh} bottom={() => 0} from={0} to={H} color={C.f} opacity={0.25} />}
        <Plot.OfX y={dtdh} domain={[0, 1]} color={C.f} weight={3} />
        {wrong && <Plot.OfX y={dhdt} domain={[0.035, 1]} color={C.g} weight={3} />}
        <Line.Segment point1={[H, 0]} point2={[H, dtdh(H)]} color={C.f} style="dashed" weight={2} />
        <Label at={[0.9, dtdh(0.9) + 1]} color={C.f} attach="w">dt/dh</Label>
        {wrong && <Label at={[0.12, dhdt(0.12)]} color={C.g} attach="e">dh/dt</Label>}
      </Plane>
      <Controls>
        <Slider label="H" value={H} onChange={setH} min={0} max={1} step={0.01} />
        <Buttons>
          <Toggle label="Integrate dh/dt instead?" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\tfrac{dt}{dh}\\Big|_{h=${H.toFixed(2)}} \\approx ${dtdh(H).toFixed(2)}\\ \\text{min/m}`} />
          <Readout tex={`\\text{time} = \\int_0^{${H.toFixed(2)}} \\tfrac{dt}{dh}\\,dh \\approx ${t.toFixed(3)}\\ \\text{min}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
