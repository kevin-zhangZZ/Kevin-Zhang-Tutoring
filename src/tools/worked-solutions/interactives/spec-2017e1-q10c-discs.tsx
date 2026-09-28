// 2017 Specialist Exam 1 Q10c — the solid is a stack of discs. Slide x (or play) from −2 to 2:
// the top plane shows the solid built so far and the disc at x, radius r = f(x) = √(arccos(x/2));
// the bottom plane graphs that disc's area A(x) = πr² = π·arccos(x/2) (the square root is gone),
// and the shaded area under A(x) is the volume so far. Stopping at x = 0 (a common error in the
// report) gives 2π² − 2π; the discs only shrink to nothing at x = 2, where the total is 2π².

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region,
  Slider, tick, usePlayer,
} from './kit'

// tick numbers only inside the view (±3 would be clipped at the edges)
const xTicks = (v: number) => (Math.abs(v) > 2.5 ? '' : tick(v))

const g = (x: number) => Math.acos(Math.max(-1, Math.min(1, x / 2)))
const f = (x: number) => Math.sqrt(g(x))
const A = (x: number) => Math.PI * g(x)
// antiderivative of arccos(x/2) from part (a): x·arccos(x/2) − √(4 − x²)
const F = (x: number) => x * g(x) - Math.sqrt(Math.max(0, 4 - x * x))
const volumeTo = (x: number) => Math.PI * (F(x) - F(-2))
const TOTAL = 2 * Math.PI * Math.PI
const HALF = 2 * Math.PI * Math.PI - 2 * Math.PI

/** A disc seen slightly side-on: an ellipse centred on the x-axis. */
function disc(xc: number, r: number, squash = 0.18): [number, number][] {
  const pts: [number, number][] = []
  for (let i = 0; i < 48; i++) {
    const t = (2 * Math.PI * i) / 48
    pts.push([xc + squash * r * Math.cos(t), r * Math.sin(t)])
  }
  return pts
}

export default function Discs() {
  const [x0, setX0] = useState(-1)
  const player = usePlayer(setX0, { min: -2, max: 2, seconds: 7 })

  const r = f(x0)
  const vol = volumeTo(x0)
  const nearLeft = x0 < -1.95
  const nearZero = Math.abs(x0) < 0.06
  const nearRight = x0 > 1.97

  let notice
  if (nearLeft) {
    notice = (
      <Notice>
        At <M>x = -2</M> the disc is at its biggest: <M>{'r = \\sqrt{\\pi}'}</M>, so its area is{' '}
        <M>{'\\pi r^2 = \\pi \\times \\pi = \\pi^2 \\approx 9.87'}</M>. The line <M>x = -2</M> is where the region
        starts. Press play to stack discs to the right and watch the volume build.
      </Notice>
    )
  } else if (nearZero) {
    notice = (
      <Notice tone="warn">
        Stopping here, <M>{'\\pi\\int_{-2}^{0}'}</M>, was a common error in the report. It gives{' '}
        <M>{'2\\pi^2 - 2\\pi \\approx 13.46'}</M>, but look at the top picture: the curve has not reached{' '}
        <M>y = 0</M> yet, so the solid is not finished. The <M>y</M>-axis is not one of the region&apos;s boundaries.
      </Notice>
    )
  } else if (nearRight) {
    notice = (
      <Notice tone="good">
        At <M>x = 2</M> the radius is <M>{'\\sqrt{\\arccos 1} = 0'}</M>: the curve meets <M>y = 0</M> and the solid
        closes to a point. That is the other end of the region, so the volume is the whole shaded area:{' '}
        <M>{'\\pi\\int_{-2}^{2}\\arccos\\left(\\tfrac{x}{2}\\right)dx = 2\\pi^2 \\approx 19.74'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Each slice of the solid is a disc of radius <M>{'r = f(x)'}</M>. Its area is{' '}
        <M>{'\\pi r^2 = \\pi\\left(\\sqrt{\\arccos\\tfrac{x}{2}}\\right)^2 = \\pi\\arccos\\tfrac{x}{2}'}</M>: squaring
        removes the root. Adding up the disc areas across <M>x</M> is the shaded area under the bottom graph. Stop at{' '}
        <M>x = 0</M>, then go on to <M>x = 2</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.6, 2.6]} y={[-2, 2]} xStep={1} yStep={1} height={240} xLabels={xTicks}>
        {/* the finished solid, faint, and the part built so far */}
        <Plot.OfX y={f} domain={[-2, 2]} color={C.f} weight={1} style="dashed" />
        <Plot.OfX y={x => -f(x)} domain={[-2, 2]} color={C.f} weight={1} style="dashed" />
        <Region top={f} bottom={x => -f(x)} from={-2} to={x0} color={C.f} opacity={0.2} />
        <Plot.OfX y={f} domain={[-2, x0]} color={C.f} weight={3} />
        <Plot.OfX y={x => -f(x)} domain={[-2, x0]} color={C.f} weight={2} />
        <Polygon points={disc(-2, Math.sqrt(Math.PI))} color={C.f} fillOpacity={0.12} weight={1} />
        <Line.Segment point1={[-2, -2]} point2={[-2, 2]} color={C.bad} style="dashed" weight={1} />
        <Label at={[-2, -1.95]} attach="w" color={C.bad} size={12}>x = −2</Label>
        <Label at={[0.9, f(0.9)]} attach="ne" color={C.f}>y = f(x)</Label>

        {r > 0.02 && <Polygon points={disc(x0, r)} color={C.g} fillOpacity={0.45} weight={2} />}
        <Line.Segment point1={[x0, 0]} point2={[x0, r]} color={C.violet} weight={3} />
        {r > 0.2 && <Label at={[x0, r / 2]} attach="e" color={C.violet} gap={Math.max(10, 60 * r * 0.18)}>r</Label>}
        <Point x={x0} y={r} color={C.violet} />
      </Plane>
      <div className="mt-3" />
      <Plane
        x={[-2.6, 2.6]}
        y={[-1.2, 10.5]}
        xStep={1}
        yStep={2}
        height={190}
        xLabels={xTicks}
        yLabels={v => (v < 0 ? '' : tick(v))}
      >
        <Region top={A} bottom={() => 0} from={-2} to={x0} color={C.g} opacity={0.3} />
        <Plot.OfX y={A} domain={[-2, 2]} color={C.g} weight={3} />
        <Line.Segment point1={[x0, 0]} point2={[x0, A(x0)]} color={C.g} weight={3} />
        <Point x={x0} y={A(x0)} color={C.g} />
        <Label at={[0.55, A(0.55)]} attach="ne" color={C.g}>A(x) = π arccos(x/2)</Label>
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={-2}
          max={2}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0 > 1.99 ? 2 : x0)} label="Stack the discs" />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`r = f(x) = ${r.toFixed(3)}`} />
          <Readout color={C.g} tex={`\\pi r^2 = \\pi\\arccos\\left(\\tfrac{x}{2}\\right) = ${A(x0).toFixed(3)}`} />
          <Readout color={C.f} tex={`V_{\\text{so far}} = \\pi\\int_{-2}^{${x0.toFixed(2)}}\\arccos\\left(\\tfrac{t}{2}\\right)dt \\approx ${vol.toFixed(2)}`} />
          {nearZero && <Readout color={C.bad} tex={`2\\pi^2 - 2\\pi \\approx ${HALF.toFixed(2)}`} />}
          {nearRight && <Readout color={C.good} tex={`2\\pi^2 \\approx ${TOTAL.toFixed(2)}\\ \\checkmark`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
