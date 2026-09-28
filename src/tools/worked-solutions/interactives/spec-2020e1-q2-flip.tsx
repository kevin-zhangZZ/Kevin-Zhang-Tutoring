// 2020 Specialist Exam 1 Q2 — what the substitution u = 1 − x does to the picture. The region under
// y = (1 + x)/√(1 − x) on [−1, 0] (blue) and the region under y = (2 − u)/√u on [1, 2] (orange) are
// mirror images in the line at ½: u = 1 − x sends each number x to its reflection 1 − x, and the
// heights match because (2 − u)/√u is the same expression with u written in. Sweeping x from −1 to 0
// sends u from 2 down to 1, which is why the terminals come out reversed (∫₂¹), and the two swept
// areas stay equal all the way, ending at 8√2/3 − 10/3 ≈ 0.438. A toggle drops the minus sign in
// du = −dx: ∫₂¹ then sweeps the orange region right to left, counts every strip as negative and
// ends at ≈ −0.438.
//
// Both regions share one horizontal axis: read it as x for the blue curve and as u for the orange
// one. The arrows under the axis say which is which.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region, Slider,
  Toggle, Vector, integrate, tick, usePlayer,
} from './kit'

const f = (x: number) => (1 + x) / Math.sqrt(1 - x)
const g = (u: number) => (2 - u) / Math.sqrt(u)
const zero = () => 0
const EXACT = (8 * Math.SQRT2 - 10) / 3 // ≈ 0.4379
const W = 0.05 // strip width
const ARROW_Y = -0.2
// Tick numbers only from −1 to 2: the half-ticks just outside get cut off at the plane's edges.
const xTicks = (v: number) => (v < -1.01 || v > 2.01 ? '' : tick(v))
// Only ½ on the y-axis: at the end of the sweep the blue point sits on (0, 1), where the "1" would be.
const yTicks = (v: number) => (Math.abs(v - 0.5) < 1e-9 ? tick(v) : '')

export default function Flip() {
  const [x0, setX0] = useState(-0.6)
  const [dropMinus, setDropMinus] = useState(false)
  const player = usePlayer(setX0, { min: -1, max: 0, seconds: 6 })

  const u0 = 1 - x0
  const h = f(x0)
  const swept = integrate(f, -1, x0)
  const atStart = x0 < -0.985
  const atEnd = x0 > -0.005
  const uColor = dropMinus ? C.bad : C.g

  // The two strips, clipped to their regions.
  const bx0 = Math.max(-1, x0 - W / 2)
  const bx1 = Math.min(0, x0 + W / 2)
  const ou0 = Math.max(1, u0 - W / 2)
  const ou1 = Math.min(2, u0 + W / 2)

  let notice
  if (dropMinus) {
    notice = (
      <Notice tone="warn">
        Dropping the minus sign leaves <M>{'\\int_2^1 \\frac{2-u}{\\sqrt u}\\,du'}</M>. That integral runs from{' '}
        <M>u = 2</M> down to <M>u = 1</M>, right to left, so every strip width <M>du</M> is negative and the orange region
        is counted as <b>negative</b> (red). Sweep to <M>x = 0</M>: it ends near <M>-0.438</M>, a negative answer for a
        region that sits entirely above the axis. Keep the minus sign and it turns the terminals back round:{' '}
        <M>{'-\\int_2^1 = \\int_1^2'}</M>.
      </Notice>
    )
  } else if (atEnd) {
    notice = (
      <Notice tone="good">
        <b>Sweep complete.</b> <M>x</M> went from <M>-1</M> up to <M>0</M> while <M>u</M> went from <M>2</M> down to{' '}
        <M>1</M>. The two regions are mirror images, so their areas are equal: both are about <M>0.438</M>, which is{' '}
        <M>{'\\tfrac{8\\sqrt2}{3} - \\tfrac{10}{3}'}</M>. The orange region is the one we actually integrate, left to right
        as usual: <M>{'\\int_1^2 \\frac{2-u}{\\sqrt u}\\,du'}</M>. Now try &ldquo;What if I drop the minus sign?&rdquo;
      </Notice>
    )
  } else if (atStart) {
    notice = (
      <Notice>
        At the left end, <M>x = -1</M>, the partner is <M>u = 1 - (-1) = 2</M>: the <b>right</b> end of the orange
        region. The lower <M>x</M>-terminal turns into the upper <M>u</M>-value, which is why the new terminals come out
        as <M>{'\\int_2^1'}</M>. Press play and watch the two strips move in opposite directions.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The blue strip at <M>x</M> and the orange strip at <M>u = 1 - x</M> have <b>the same height</b>, because{' '}
        <M>{'\\frac{2-u}{\\sqrt u}'}</M> is just <M>{'\\frac{1+x}{\\sqrt{1-x}}'}</M> with <M>u</M> written in. It is the same
        region, flipped in the dashed line at <M>\tfrac12</M>. As <M>x</M> moves right, <M>u</M> moves left by the same
        amount: that is <M>du = -dx</M>. Drag the slider to <M>x = -1</M>, or press play.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.25, 2.25]} y={[-0.35, 1.2]} xStep={0.5} yStep={0.5} height={300} xLabel="" xLabels={xTicks} yLabels={yTicks}>
        {/* The two whole regions, faint, then the parts swept so far. */}
        <Region top={f} bottom={zero} from={-1} to={0} color={C.f} opacity={0.08} />
        <Region top={g} bottom={zero} from={1} to={2} color={C.g} opacity={0.08} />
        <Region top={f} bottom={zero} from={-1} to={x0} color={C.f} opacity={0.3} />
        <Region top={g} bottom={zero} from={u0} to={2} color={uColor} opacity={0.3} />
        <Plot.OfX y={f} domain={[-1, 0]} color={C.f} weight={3} />
        <Plot.OfX y={g} domain={[1, 2]} color={C.g} weight={3} />

        {/* The mirror line: u = 1 − x fixes ½ and swaps everything else end to end. */}
        <Line.Segment point1={[0.5, 0]} point2={[0.5, 1.12]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[0.5, 1.12]} color={C.guide} attach="n" size={12}>mirror</Label>

        {/* Partner strips, joined at the same height. */}
        <Polygon points={[[bx0, 0], [bx1, 0], [bx1, h], [bx0, h]]} color={C.f} fillOpacity={0.85} weight={1} />
        <Polygon points={[[ou0, 0], [ou1, 0], [ou1, h], [ou0, h]]} color={uColor} fillOpacity={0.85} weight={1} />
        <Line.Segment point1={[x0, h]} point2={[u0, h]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={x0} y={h} color={C.f} />
        <Point x={u0} y={h} color={uColor} />

        {/* Which way each variable runs during the sweep. */}
        <Vector tail={[-1, ARROW_Y]} tip={[0, ARROW_Y]} color={C.f} weight={2} />
        <Label at={[-0.5, ARROW_Y]} color={C.f} attach="s" size={12}>x: −1 → 0</Label>
        <Vector tail={[2, ARROW_Y]} tip={[1, ARROW_Y]} color={uColor} weight={2} />
        <Label at={[1.5, ARROW_Y]} color={uColor} attach="s" size={12}>u: 2 → 1</Label>
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={-1}
          max={0}
          step={0.005}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep x to 0" />
          <Toggle label="What if I drop the minus sign?" checked={dropMinus} onChange={setDropMinus} />
        </Buttons>
        <Readouts>
          <Readout tex={`x = ${x0.toFixed(2)} \\;\\Rightarrow\\; u = 1 - x = ${u0.toFixed(2)}`} />
          <Readout tex={`\\text{heights: } \\tfrac{1+x}{\\sqrt{1-x}} = \\tfrac{2-u}{\\sqrt u} \\approx ${h.toFixed(3)}`} />
        </Readouts>
        <Readouts>
          <Readout color={C.f} tex={`\\int_{-1}^{${x0.toFixed(2)}} \\tfrac{1+x}{\\sqrt{1-x}}\\,dx \\approx ${swept.toFixed(3)}`} />
          {dropMinus ? (
            <Readout color={C.bad} tex={`\\int_{2}^{${u0.toFixed(2)}} \\tfrac{2-u}{\\sqrt u}\\,du \\approx ${(-swept).toFixed(3)}`} />
          ) : (
            <Readout color={C.g} tex={`\\int_{${u0.toFixed(2)}}^{2} \\tfrac{2-u}{\\sqrt u}\\,du \\approx ${swept.toFixed(3)}`} />
          )}
          {atEnd && !dropMinus && (
            <Readout color={C.good} tex={`\\tfrac{8\\sqrt2}{3} - \\tfrac{10}{3} \\approx ${EXACT.toFixed(3)}\\ \\checkmark`} />
          )}
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          One horizontal axis: read it as <M>x</M> for the blue region and as <M>u</M> for the orange one.
        </p>
        {notice}
      </Controls>
    </div>
  )
}
