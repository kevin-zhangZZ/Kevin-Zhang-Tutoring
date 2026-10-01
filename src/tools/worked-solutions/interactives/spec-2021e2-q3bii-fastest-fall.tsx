// 2021 Specialist Exam 2 Q3b.ii — why the level falls fastest at a depth of 24 cm. The rate of
// decrease −dh/dt = 4√h / (π(h + 8)^{2/3}) is the leak rate 4√h divided by the area of the water
// surface π(h + 8)^{2/3} (a disc of radius x = (h + 8)^{1/3}). Slide h: both grow, the leak wins
// below 24 cm and the widening surface wins above it, so the maximum (0.62 cm/min) is inside the
// range. A toggle graphs dh/dt itself: its largest value is 0 at h = 0, so the fastest decrease is
// the MINIMUM of dh/dt, quoted positive.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle, num, usePlayer } from './kit'

const leak = (h: number) => 4 * Math.sqrt(h)
const area = (h: number) => Math.PI * Math.cbrt(h + 8) ** 2
const rate = (h: number) => leak(h) / area(h) // rate of decrease, −dh/dt
const H_MAX = 24
const R_MAX = rate(H_MAX) // 0.6188…
// The curve is steep at h = 0, so the y numbers go on the LEFT of the axis (manual labels).
const Y_TICKS = [0.2, 0.4, 0.6]
const xFmt = (v: number) => (v < 0 ? '' : String(v))

export default function FastestFall() {
  const [h, setH] = useState(8)
  const [signed, setSigned] = useState(false)
  const player = usePlayer(setH, { min: 0, max: 50, seconds: 7 })

  const r = rate(h)
  const near = Math.abs(h - H_MAX) <= 0.75
  const s = signed ? -1 : 1
  const col = signed ? C.g : near ? C.good : C.f

  let notice
  if (signed) {
    notice = (
      <Notice tone="warn">
        This is <M>{'\\tfrac{dh}{dt}'}</M> itself: negative at every depth, because the vessel is losing water. Its{' '}
        <b>largest</b> value is <M>0</M>, at <M>h = 0</M> — an empty vessel, not the answer. The fastest{' '}
        <b>decrease</b> is where <M>{'\\tfrac{dh}{dt}'}</M> is most negative: its minimum, <M>-0.62</M> at{' '}
        <M>h = 24</M>, quoted as a rate of decrease of 0.62 cm per minute.
      </Notice>
    )
  } else if (near) {
    notice = (
      <Notice tone="good">
        At <M>h = 24</M> the level falls fastest: <M>{'\\tfrac{4\\sqrt{24}}{\\pi(32)^{2/3}} \\approx 0.62'}</M> cm per
        minute. The curve is flat here; setting the derivative of <M>{'\\sqrt h\\,(h+8)^{-2/3}'}</M> to zero reduces to{' '}
        <M>{'3(h+8) = 4h'}</M>, so <M>h = 24</M> exactly. The question asks for both numbers: the rate and the depth.
      </Notice>
    )
  } else if (h < H_MAX) {
    notice = (
      <Notice>
        The level falls at <b>leak rate ÷ surface area</b>: here <M>{`${num(leak(h))} \\div ${num(area(h))} \\approx ${num(r)}`}</M>{' '}
        cm per minute. Deeper water leaks harder, and below 24 cm that effect wins, so the rate of decrease is still
        climbing. Slide <M>h</M> up and watch where it stops climbing.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Above 24 cm the leak still grows, but the surface widens proportionally faster, so each cm³ lost lowers the
        level by less. The rate of decrease drops again (to <M>0.60</M> at <M>h = 50</M>), so the fastest fall is
        inside the range, not at the top. Turn on &ldquo;Graph <M>{'dh/dt'}</M> itself&rdquo; to see why the sign matters.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-4, 50]}
        y={signed ? [-0.7, 0.1] : [0, 0.7]}
        xStep={8}
        yStep={0.1}
        height={300}
        xLabel="h"
        yLabel={signed ? 'dh/dt' : '−dh/dt'}
        xLabels={xFmt}
        yLabels={false}
      >
        {Y_TICKS.map(v => (
          <Label key={v} at={[0, s * v]} attach="w" size={12} bold={false}>
            {(s * v).toFixed(1).replace('-', '−')}
          </Label>
        ))}
        <Line.Segment point1={[H_MAX, 0]} point2={[H_MAX, s * R_MAX]} color={C.good} style="dashed" weight={1.5} />
        <Plot.OfX y={x => s * rate(Math.max(x, 0))} domain={[0, 50]} color={signed ? C.g : C.f} weight={3} />
        <Line.Segment point1={[h, 0]} point2={[h, s * r]} color={col} weight={2} />
        <Point x={h} y={s * r} color={col} />
        {signed ? (
          <>
            <Label at={[0.5, 0]} attach="ne" color={C.bad}>largest dh/dt = 0 (empty)</Label>
            <Label at={[H_MAX, -R_MAX]} attach="s" color={C.good}>most negative</Label>
          </>
        ) : (
          <Label at={[h, r]} attach={h > 40 ? 'sw' : h < 16 ? 'se' : 'n'} color={col}>
            {`${num(r)} cm/min`}
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider
          label="h"
          value={h}
          onChange={v => {
            player.stop()
            setH(v)
          }}
          min={0}
          max={50}
          step={0.25}
          format={v => `${v.toFixed(1)} cm`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(h)} label="Sweep from 0 to 50 cm" />
          <Toggle label={<>Graph <M>{'dh/dt'}</M> itself</>} checked={signed} onChange={setSigned} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\text{leak } 4\\sqrt{h} = ${num(leak(h))}\\ \\text{cm}^3/\\text{min}`} />
          <Readout color={C.violet} tex={`\\text{surface } \\pi(h+8)^{2/3} = ${num(area(h))}\\ \\text{cm}^2`} />
          <Readout
            color={col}
            tex={signed ? `\\frac{dh}{dt} = ${num(-r, 3)}\\ \\text{cm/min}` : `-\\frac{dh}{dt} = ${num(r, 3)}\\ \\text{cm/min}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
