// 2021 Specialist Exam 2 Q3c — the refill time is the area under dt/dh from h = 25 to h = 50.
// Each centimetre of depth costs dt/dh = π(h + 8)^{2/3} / (40√2 − 4√h) minutes: the surface area
// to fill divided by the NET inflow (the crack keeps leaking while the tap runs). Slide or sweep h
// and the shaded area accumulates the time, reaching 31.4 min at the brim (scipy: 31.423). A
// toggle drops the leak (dV/dt = 40√2 alone): the red curve sits under the true one and its area
// is only 17.6 min — a tempting set-up that misreads the physical situation (the report notes this
// part needed "an appreciation of the physical situation"; it does not name this specific slip).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Region, Slider, Toggle,
  integrate, num, usePlayer,
} from './kit'

const IN = 40 * Math.SQRT2 // 56.57 cm³/min poured in
const area = (h: number) => Math.PI * Math.cbrt(h + 8) ** 2
const net = (h: number) => IN - 4 * Math.sqrt(h)
const dtdh = (h: number) => area(h) / net(h)
const dtdhNoLeak = (h: number) => area(h) / IN
const H0 = 25
const H1 = 50
const zero = () => 0
const tickFmt = (v: number) => v.toFixed(1)

export default function RefillTime() {
  const [h, setH] = useState(40)
  const [noLeak, setNoLeak] = useState(false)
  const player = usePlayer(setH, { min: H0, max: H1, seconds: 6 })

  const t = integrate(dtdh, H0, h)
  const tWrong = integrate(dtdhNoLeak, H0, h)
  const atBrim = h >= H1 - 0.05

  let notice
  if (noLeak) {
    notice = (
      <Notice tone="warn">
        Leaving out the leak (<M>{'\\tfrac{dV}{dt} = 40\\sqrt2'}</M> alone) gives the red curve. It sits under the true
        one at every depth, and its area to the brim is only <M>{'17.6'}</M> minutes — almost 14 minutes short. The
        crack doesn&apos;t stop when the tap is turned on, so the rate in must be the net rate{' '}
        <M>{'40\\sqrt2 - 4\\sqrt h'}</M>.
      </Notice>
    )
  } else if (atBrim) {
    notice = (
      <Notice tone="good">
        At the brim the shaded area is <M>{'t \\approx 31.4'}</M> minutes. The curve rises the whole way: each
        centimetre near the top takes about <M>1.66</M> min against <M>0.88</M> min at 25 cm, because the surface is
        wider and the stronger leak leaves less net inflow (<M>28.3</M> instead of <M>36.6</M> cm³/min). Turn on
        &ldquo;Ignore the leak&rdquo; to see a tempting wrong set-up.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Each centimetre of depth costs <M>{'\\tfrac{dt}{dh}'}</M> minutes: the surface area to fill,{' '}
        <M>{'\\pi(h+8)^{2/3}'}</M>, divided by the <b>net</b> inflow <M>{'40\\sqrt2 - 4\\sqrt h'}</M>. So climbing from
        25 cm to <M>{num(h, 1)}</M> cm takes the shaded area, about <M>{num(t, 1)}</M> minutes. Sweep on to the brim at
        50 cm.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 50]} y={[0, 1.8]} xStep={5} yStep={0.4} height={300} xLabel="h" yLabel="dt/dh" yLabels={tickFmt}>
        <Region top={dtdh} bottom={zero} from={H0} to={h} color={C.f} opacity={0.25} />
        {noLeak && <Region top={dtdhNoLeak} bottom={zero} from={H0} to={h} color={C.bad} opacity={0.3} />}
        <Line.Segment point1={[H0, 0]} point2={[H0, 1.8]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[H1, 0]} point2={[H1, 1.8]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[H0, 1.8]} attach="nw" color={C.guide}>refill starts</Label>
        <Label at={[H1, 1.8]} attach="nw" color={C.guide}>brim</Label>
        <Plot.OfX y={dtdh} domain={[H0, H1]} color={C.f} weight={3} />
        {noLeak && <Plot.OfX y={dtdhNoLeak} domain={[H0, H1]} color={C.bad} weight={3} />}
        <Line.Segment point1={[h, 0]} point2={[h, dtdh(h)]} color={C.f} weight={2} />
        <Point x={h} y={dtdh(h)} color={C.f} />
        {/* With the leak ignored the red area sits inside the blue one, so only the red total is
            written on the plane; the true total stays in the readouts. */}
        <Label at={[(H0 + h) / 2, 0.3]} attach="c" color={noLeak ? C.bad : C.ink}>
          {`${num(noLeak ? tWrong : t, 1)} min`}
        </Label>
      </Plane>
      <Controls>
        <Slider
          label="h"
          value={h}
          onChange={v => {
            player.stop()
            setH(v)
          }}
          min={H0}
          max={H1}
          step={0.25}
          format={v => `${v.toFixed(1)} cm`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(h)} label="Refill from 25 to 50 cm" />
          <Toggle label="Ignore the leak" checked={noLeak} onChange={setNoLeak} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\text{net inflow } 40\\sqrt2 - 4\\sqrt{h} = ${num(net(h))}\\ \\text{cm}^3/\\text{min}`} />
          <Readout color={C.f} tex={`\\frac{dt}{dh} = ${num(dtdh(h), 3)}\\ \\text{min per cm}`} />
          <Readout color={atBrim ? C.good : C.f} tex={`t = \\int_{25}^{${num(h, 1)}}\\frac{dt}{dh}\\,dh \\approx ${num(t, 1)}\\ \\text{min}`} />
          {noLeak && <Readout color={C.bad} tex={`\\text{leak ignored: } t \\approx ${num(tWrong, 1)}\\ \\text{min}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
