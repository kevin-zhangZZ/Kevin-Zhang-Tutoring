// 2022 Methods Exam 1 Q8c — the average value of f over [0, k] is the height of the rectangle on
// [0, k] with the same area as A(k), so it is A(k)/k = sin(k), and it changes as k moves. Drag k:
// the rectangle's top-right corner rides along y = sin(k), rising while the curve at x = k is above
// the average and falling once it drops below. At k = π/2 the curve passes through the corner
// (f(π/2) = 1 = sin(π/2)) and the average peaks at 1 — not at k = 1, and not where f peaks.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region, Slider,
  usePlayer,
} from './kit'

const f = (x: number) => Math.sin(x) + x * Math.cos(x)
const zero = () => 0
const HALF_PI = Math.PI / 2

export default function Average() {
  const [k, setK] = useState(1)
  const player = usePlayer(setK, { min: 0.05, max: 2, seconds: 7 })

  const area = k * Math.sin(k)
  const avg = area / k
  const fk = f(k)
  const atMax = Math.abs(k - HALF_PI) < 0.03
  const nearOne = Math.abs(k - 1) < 0.03

  let notice
  if (atMax) {
    notice = (
      <Notice tone="good">
        <b>The maximum: <M>{'k = \\tfrac{\\pi}{2}'}</M>.</b> Here <M>{'f\\left(\\tfrac{\\pi}{2}\\right) = 1 = \\sin\\left(\\tfrac{\\pi}{2}\\right)'}</M>,
        so the curve passes exactly through the rectangle&apos;s corner. Stretch the interval any further and the new
        slices are shorter than the average, so it can only fall. The greatest average value is 1.
      </Notice>
    )
  } else if (k < HALF_PI) {
    notice = (
      <Notice>
        The curve at <M>x = k</M> has height <M>{`f(k) \\approx ${fk.toFixed(2)}`}</M>, above the average{' '}
        <M>{`\\sin(k) \\approx ${avg.toFixed(2)}`}</M>. Stretching the interval adds slices taller than the average, so
        the average rises, like adding a test score above your current average.{' '}
        {nearOne ? (
          <>
            So <M>k = 1</M> is not the answer (and <M>{'\\cos(1) \\approx 0.54'}</M>, not 0).{' '}
          </>
        ) : null}
        Drag <M>k</M> further right.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now <M>{`f(k) \\approx ${fk.toFixed(2)}`}</M> is below the average <M>{`\\sin(k) \\approx ${avg.toFixed(2)}`}</M>,
        so each extra slice drags the average down: the corner slides down the dashed curve. Notice the peak of{' '}
        <M>f</M> itself (near <M>x \approx 1.08</M>) was not the answer either. Drag back to find where the corner
        is highest.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 2.2]} y={[0, 1.6]} xStep={0.5} yStep={0.5} height={300}>
        <Region top={f} bottom={zero} from={0} to={k} color={C.f} opacity={0.2} />
        <Polygon
          points={[[0, 0], [k, 0], [k, avg], [0, avg]]}
          color={C.violet}
          fillOpacity={0.12}
          weight={2}
        />
        <Plot.OfX y={Math.sin} domain={[0, 2]} color={C.g} weight={2} style="dashed" />
        <Plot.OfX y={f} domain={[0, 2]} color={C.f} weight={3} />
        <Point x={k} y={fk} color={C.f} />
        <Point x={k} y={avg} color={atMax ? C.good : C.violet} />
        <Label at={[1.3, f(1.3)]} color={C.f} attach="ne">f</Label>
        <Label at={[1.95, Math.sin(1.95)]} color={C.g} attach="n" gap={10}>sin k</Label>
      </Plane>
      <Controls>
        <Slider
          label="k"
          value={k}
          onChange={v => {
            player.stop()
            setK(v)
          }}
          min={0.05}
          max={2}
          step={0.005}
        />
        <Buttons>
          <PlayButton
            playing={player.playing}
            onClick={() => {
              if (!player.playing) setK(0.05)
              player.toggle(0.05)
            }}
            label="Sweep k from 0 to 2"
          />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`A(k) = k\\sin k \\approx ${area.toFixed(3)}`} />
          <Readout color={atMax ? C.good : C.violet} tex={`\\text{average} = \\tfrac{A(k)}{k} = \\sin k \\approx ${avg.toFixed(3)}`} />
          <Readout color={C.f} tex={`f(k) \\approx ${fk.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
