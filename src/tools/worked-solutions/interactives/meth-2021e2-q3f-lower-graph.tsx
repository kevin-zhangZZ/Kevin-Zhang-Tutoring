// 2021 Methods Exam 2 Q3f — why the area needs two integrals. The region bounded by y = x + 2,
// p(x) = e^(−2x) − 2e^(−x) + 1 and the x-axis runs from x = −2 (where the line meets the axis) to
// x = 0 (where p touches it). Sweep a strip across it: each strip goes from the x-axis up to
// whichever graph is LOWER — the line left of the crossing x ≈ −0.7504, the curve p right of it —
// so the area is ∫_{−2}^{−0.7504} (x + 2) dx + ∫_{−0.7504}^{0} p(x) dx ≈ 0.78075 + 0.25735 = 1.038.
// Areas from the exact antiderivatives; the crossing from scipy (brentq).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region, Slider, num, tick,
  usePlayer,
} from './kit'

const p = (x: number) => Math.exp(-2 * x) - 2 * Math.exp(-x) + 1
const line = (x: number) => x + 2
const P_ANTI = (x: number) => x + 2 * Math.exp(-x) - Math.exp(-2 * x) / 2
const L_ANTI = (x: number) => (x + 2) ** 2 / 2
const XI = -0.7504031588958083 // p(x) = x + 2
const lower = (x: number) => Math.min(line(x), p(x))
const zero = () => 0
const W = 0.045

/** Area of the region from x = −2 up to x. */
function sweptArea(x: number) {
  if (x <= XI) return L_ANTI(x) - L_ANTI(-2)
  return L_ANTI(XI) - L_ANTI(-2) + P_ANTI(x) - P_ANTI(XI)
}
const A1 = sweptArea(XI)
const TOTAL = sweptArea(0)

export default function LowerGraph() {
  const [x0, setX0] = useState(-1.3)
  const player = usePlayer(setX0, { min: -2, max: 0, seconds: 7 })

  const near = Math.abs(x0 - XI) < 0.03
  const done = x0 > -0.01
  const left = x0 < XI
  const h = lower(x0)
  const stripColor = near ? C.good : left ? C.g : C.f
  const s0 = Math.max(-2, x0 - W / 2)
  const s1 = Math.min(0, x0 + W / 2)

  let notice
  if (done) {
    notice = (
      <Notice tone="good">
        <b>The region ends at the origin</b>, where <M>p</M> touches the <M>x</M>-axis. Total:{' '}
        <M>{`${num(A1, 5)} + ${num(TOTAL - A1, 5)} \\approx ${num(TOTAL, 3)}`}</M>. Two integrals, because the top of the strip
        was a different graph on each side of <M>x = -0.750</M>.
      </Notice>
    )
  } else if (near) {
    notice = (
      <Notice tone="good">
        <b>At <M>x \approx -0.750</M> the line meets <M>p</M></b>, so the top of the strip switches from the line to the curve.
        This is exactly where the area splits into two integrals. Use the stored root <M>-0.7504\ldots</M> as the
        limit, not the rounded <M>-0.75</M>.
      </Notice>
    )
  } else if (left) {
    notice = (
      <Notice>
        Left of the crossing, <M>p</M> is above the line, so the strip stops at the <b>line</b>: height{' '}
        <M>x + 2</M>. This piece is <M>{'\\int_{-2}^{-0.7504}(x+2)\\,dx'}</M>, a triangle. Press play, or drag the slider,
        and watch what happens to the top of the strip at the crossing.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Right of the crossing the line is now above <M>p</M>, so the strip stops at the <b>curve</b>: height <M>p(x)</M>. This
        piece is <M>{'\\int_{-0.7504}^{0}p(x)\\,dx'}</M>. The unshaded gap between <M>p</M> and the line is not part of the
        region: it never reaches the <M>x</M>-axis.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.2, 0.55]} y={[-0.2, 2.1]} xStep={0.5} yStep={0.5} height={320}
        xLabels={v => (v < -2 ? "" : tick(v))}>
        <Region top={lower} bottom={zero} from={-2} to={Math.min(x0, XI)} color={C.g} opacity={0.25} />
        <Region top={lower} bottom={zero} from={XI} to={Math.max(XI, x0)} color={C.f} opacity={0.25} />
        <Plot.OfX y={line} domain={[-2.2, 0]} color={C.g} weight={2.5} />
        <Plot.OfX y={p} domain={[-0.91, 0.55]} color={C.f} weight={3} />
        <Line.Segment point1={[XI, 0]} point2={[XI, line(XI)]} color={C.good} style="dashed" weight={1.5} />
        <Label at={[XI, 1.15]} color={C.good} attach="e" gap={14} size={12}>x = −0.750</Label>
        <Polygon points={[[s0, 0], [s1, 0], [s1, h], [s0, h]]} color={stripColor} fillOpacity={0.85} weight={1} />
        <Point x={XI} y={line(XI)} color={C.good} />
        <Label at={[-1.55, line(-1.55)]} color={C.g} attach="nw">y = x + 2</Label>
        <Label at={[-0.85, p(-0.85)]} color={C.f} attach="e">p</Label>
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
          max={0}
          step={0.005}
          format={v => num(v, 3)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep from −2 to 0" />
        </Buttons>
        <Readouts>
          <Readout color={stripColor} tex={left ? `\\text{height} = x + 2 \\approx ${num(h, 3)}` : `\\text{height} = p(x) \\approx ${num(h, 3)}`} />
          <Readout tex={`\\text{area so far} \\approx ${num(sweptArea(x0), 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
