// 2015 Specialist Exam 1 Q5 — a volume about the y-axis is a stack of horizontal discs. Slide a
// disc up the region bounded by y = 2x² − 3, y = 5 and the y-axis: its radius is x, so its area is
// πx² = π(y + 3)/2, read straight off the rearranged equation. The stack starts at the vertex
// y = −3, not at y = 0 — the toggle shows the report's "0 to 5" error, which leaves out the bottom
// 9π/4 of the solid (55π/4 instead of 16π). Values checked with sympy.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle, num } from './kit'

const xOf = (y: number) => Math.sqrt(Math.max(0, (y + 3) / 2))
const vol = (a: number) => (Math.PI / 4) * (5 - a) * (a + 11) // π∫_a^5 (y+3)/2 dy

function ellipse(cy: number, r: number, ry = 0.22): [number, number][] {
  const pts: [number, number][] = []
  for (let i = 0; i <= 48; i++) {
    const t = (2 * Math.PI * i) / 48
    pts.push([r * Math.cos(t), cy + ry * Math.sin(t)])
  }
  return pts
}

export default function Discs() {
  const [y0, setY0] = useState(1)
  const [fromZero, setFromZero] = useState(false)
  const a = fromZero ? 0 : -3
  const yd = Math.max(a, y0)
  const r = xOf(yd)
  const bottom = (x: number) => Math.max(a, 2 * x * x - 3)

  let notice
  if (fromZero) {
    notice = (
      <Notice tone="warn">
        Starting at <M>y = 0</M> stacks discs only from <M>0</M> to <M>5</M>, giving <M>{'\\tfrac{55\\pi}{4}'}</M>. The
        part of the region below the <M>x</M>-axis (red) is still bounded by the parabola and the <M>y</M>-axis, so its{' '}
        <M>{'\\tfrac{9\\pi}{4}'}</M> of solid is lost. The bottom terminal is where the region starts, the vertex{' '}
        <M>y = -3</M>.
      </Notice>
    )
  } else if (yd < -2.9) {
    notice = (
      <Notice tone="good">
        At the vertex <M>y = -3</M> the disc has radius <M>0</M>: this is where the solid begins, so <M>-3</M> is the
        lower terminal. Turn on &ldquo;Start at <M>y = 0</M>&rdquo; to see what the common error leaves out.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Each horizontal slice spun about the <M>y</M>-axis is a disc of radius <M>x</M>, so its area is{' '}
        <M>{'\\pi x^2 = \\pi\\cdot\\tfrac{y+3}{2}'}</M> — no square root needed. Slide the disc down to the vertex: the
        region, and the stack of discs, goes all the way to <M>y = -3</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.8, 2.8]} y={[-3.8, 5.8]} xStep={1} yStep={1} height={360} label="Region under y = 5 and beside the parabola y = 2x² − 3, with a horizontal disc slice">
        {/* the solid's mirror image: the region spun to the left-hand side */}
        <Region top={() => 5} bottom={x => Math.max(a, 2 * x * x - 3)} from={-2} to={0} color={C.f} opacity={0.04} />
        <Region top={() => 5} bottom={bottom} from={0} to={2} color={C.f} opacity={0.25} />
        {fromZero && <Region top={() => 0} bottom={x => 2 * x * x - 3} from={0} to={Math.sqrt(1.5)} color={C.bad} opacity={0.3} />}
        <Plot.OfX y={x => 2 * x * x - 3} domain={[-2.6, 2.6]} color={C.f} weight={3} />
        <Line.Segment point1={[-2.8, 5]} point2={[2.8, 5]} color={C.g} weight={2} />
        <Polygon points={ellipse(yd, r)} color={C.violet} fillOpacity={0.35} weight={2} />
        <Line.Segment point1={[0, yd]} point2={[r, yd]} color={C.violet} weight={3} />
        <Label at={[2.25, 5]} color={C.g} attach="n">y = 5</Label>
        <Label at={[1, -1]} color={C.f} attach="e">y = 2x² − 3</Label>
        <Label at={[0, -3]} color={C.ink} attach="w">(0, −3)</Label>
        {r > 0.35 && <Label at={[r, yd]} color={C.violet} attach="e" gap={4}>r = x</Label>}
      </Plane>
      <Controls>
        <Slider label="y" value={yd} onChange={setY0} min={a} max={5} step={0.05} format={v => num(v, 2)} />
        <Toggle label={<>Start at <M>y = 0</M> (common error)</>} checked={fromZero} onChange={setFromZero} />
        <Readouts>
          <Readout color={C.violet} tex={`x^2 = \\tfrac{y+3}{2} = ${num(r * r, 2)}`} />
          <Readout color={C.violet} tex={`\\text{disc area} = \\pi x^2 \\approx ${num(Math.PI * r * r, 2)}`} />
          <Readout
            color={fromZero ? C.bad : C.good}
            tex={fromZero ? `\\pi\\int_0^5 \\tfrac{y+3}{2}\\,dy = \\tfrac{55\\pi}{4} \\approx ${num(vol(0), 2)}` : `\\pi\\int_{-3}^5 \\tfrac{y+3}{2}\\,dy = 16\\pi \\approx ${num(vol(-3), 2)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
