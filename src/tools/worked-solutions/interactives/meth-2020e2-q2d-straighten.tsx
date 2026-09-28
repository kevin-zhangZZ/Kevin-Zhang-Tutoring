// 2020 Methods Exam 2 Q2d — every vertical slice of the river is exactly f₁(x) − f₂(x) = 10 m tall,
// wherever it is. Slide each slice straight down (by a fraction of f₂(x), so the slice at x keeps its
// height of 10) and the bent river becomes a 200 × 10 rectangle. Sliding slices vertically never
// changes their heights, so the area never changes: ∫₀²⁰⁰(f₁ − f₂)dx = ∫₀²⁰⁰ 10 dx = 2000 m². The
// original banks stay as faint dashed ghosts for comparison.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Readout, Readouts, Region, Slider, tick, usePlayer } from './kit'

const f1 = (x: number) => 20 * Math.cos((Math.PI * x) / 100) + 40
const f2 = (x: number) => f1(x) - 10
const SLICES = Array.from({ length: 16 }, (_, i) => 6.25 + 12.5 * i)

export default function Straighten() {
  const [t, setT] = useState(0)
  const player = usePlayer(setT, { min: 0, max: 1, seconds: 4 })
  const bottom = (x: number) => (1 - t) * f2(x)
  const top = (x: number) => bottom(x) + 10
  const done = t > 0.995

  let notice
  if (t < 0.005) {
    notice = (
      <Notice>
        Every vertical slice of the river, anywhere along it, is exactly <b>10 m tall</b>:{' '}
        <M>{'f_1(x) - f_2(x) = 10'}</M>, because the banks differ only in their constant term (part a). The river
        bends, but its <i>vertical</i> thickness never changes. Press play to slide every slice straight down to the{' '}
        <M>x</M>-axis.
      </Notice>
    )
  } else if (!done) {
    notice = (
      <Notice>
        Each slice is sliding down by a different amount (the ones near the ends start highest), but each one keeps
        its height of 10. Area is made of these slices, so sliding them up or down can&apos;t change it.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>It&apos;s a rectangle: 200 m long, 10 m tall.</b> Its area is <M>10 \times 200 = 2000</M> m², and since no
        slice changed height, that is the river&apos;s area too. This is exactly what{' '}
        <M>{'\\int_0^{200}\\bigl(f_1(x) - f_2(x)\\bigr)dx = \\int_0^{200} 10\\,dx'}</M> says: the integral only ever
        sees the heights of the slices, not where they sit.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, 200]}
        y={[0, 66]}
        xStep={25}
        yStep={10}
        height={270}
        xLabels={v => (Math.abs(v % 50) < 1e-9 ? tick(v) : '')}
        yLabels={v => (Math.abs(v % 20) < 1e-9 && v < 50 ? tick(v) : '')}
      >
        <Plot.OfX y={f1} domain={[0, 200]} color={C.f} weight={1.5} opacity={0.35} style="dashed" />
        <Plot.OfX y={f2} domain={[0, 200]} color={C.g} weight={1.5} opacity={0.35} style="dashed" />
        <Region top={top} bottom={bottom} from={0} to={200} color={C.f} opacity={0.28} />
        {SLICES.map(x => (
          <Line.Segment key={x} point1={[x, bottom(x)]} point2={[x, top(x)]} color={C.f} weight={1.5} opacity={0.6} />
        ))}
        <Line.Segment point1={[100, bottom(100)]} point2={[100, top(100)]} color={C.good} weight={3.5} />
        <Label at={[100, top(100)]} attach="n" color={C.good} gap={5}>10</Label>
        <Plot.OfX y={top} domain={[0, 200]} color={C.f} weight={2.5} />
        <Plot.OfX y={bottom} domain={[0, 200]} color={C.g} weight={2.5} />
      </Plane>
      <Controls>
        <Slider
          label="\text{slide}"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={1}
          step={0.01}
          format={v => `${Math.round(v * 100)}%`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Slide the slices down" />
        </Buttons>
        <Readouts>
          <Readout color={C.good} tex="\text{every slice: } f_1(x) - f_2(x) = 10" />
          <Readout tex="\text{area} = 10 \times 200 = 2000\ \text{m}^2" />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
