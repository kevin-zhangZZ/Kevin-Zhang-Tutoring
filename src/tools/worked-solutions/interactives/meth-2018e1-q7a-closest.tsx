// 2018 Methods Exam 1 Q7a — why the point of y = 2x − 4 closest to the origin is the foot of the
// perpendicular from O. Drag P along the line (or use the slider): the dashed circle centred at O
// passes through P, so its radius is OP, and the green stretch of the line inside it is every
// point that is closer to O than P is. The circle cuts the line at P and at the mirror point
// x = 16/5 − x_P, so the green stretch only vanishes when those coincide, at x = 8/5: there the
// circle just touches the line, and a radius meets a tangent at 90°. The buttons jump to the
// report's two common wrong answers, the x-intercept (2, 0) and the midpoint (1, −2) of the
// intercepts, and to the true closest point (8/5, −4/5).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Polygon,
  Readout, Readouts, Slider, clamp, num,
} from './kit'

const line = (x: number) => 2 * x - 4
const FOOT = 8 / 5
const LO = 0
const HI = 3
const opLen = (p: number) => Math.hypot(p, line(p))

/** Snap to the three points the buttons name, so a drag can land on them exactly. */
function snap(p: number) {
  for (const t of [FOOT, 2, 1]) if (Math.abs(p - t) < 0.04) return t
  return Math.round(clamp(p, LO, HI) * 100) / 100
}

export default function Closest() {
  const [p, setP] = useState(2)
  const y = line(p)
  const r = opLen(p)
  const other = 16 / 5 - p
  const atFoot = Math.abs(p - FOOT) < 0.005
  const atInt = Math.abs(p - 2) < 0.005
  const atMid = Math.abs(p - 1) < 0.005

  // Acute angle between OP and the line (direction (1, 2)).
  const cos = Math.abs(p + 2 * y) / (r * Math.sqrt(5))
  const angle = (Math.acos(clamp(cos, 0, 1)) * 180) / Math.PI

  // Right-angle marker at the foot: one side along the line, one along PO.
  const s = 0.24
  const uL: [number, number] = [1 / Math.sqrt(5), 2 / Math.sqrt(5)]
  const uO: [number, number] = [-p / r, -y / r]
  const opColor = atFoot ? C.good : C.g

  let notice
  if (atFoot) {
    notice = (
      <Notice tone="good">
        <b>The circle just touches the line</b> at <M>{'P = \\left(\\tfrac85, -\\tfrac45\\right)'}</M>. No point of the
        line is inside it, so nothing on the line is closer to <M>O</M>. A radius meets a tangent at{' '}
        <M>{'90^\\circ'}</M>, so <M>OP</M> is perpendicular to the line: its gradient is{' '}
        <M>{'\\frac{-4/5}{8/5} = -\\tfrac12'}</M>, and <M>{'2 \\times \\left(-\\tfrac12\\right) = -1'}</M>.
      </Notice>
    )
  } else if (atInt) {
    notice = (
      <Notice tone="warn">
        This is <M>(2, 0)</M>, where the line crosses the <M>x</M>-axis, the report&apos;s common wrong answer. It is the
        closest point <em>on the axis</em>, not on the line. The circle through it cuts the line again at{' '}
        <M>{'\\left(\\tfrac65, -\\tfrac85\\right)'}</M>, and every point of the green stretch between is closer to{' '}
        <M>O</M>. <M>OP</M> meets the line at <M>{'63.4^\\circ'}</M>, not <M>{'90^\\circ'}</M>.
      </Notice>
    )
  } else if (atMid) {
    notice = (
      <Notice tone="warn">
        This is <M>(1, -2)</M>, halfway between the intercepts <M>(2, 0)</M> and <M>(0, -4)</M>, the report&apos;s other
        wrong guess. <M>{'OP = \\sqrt5 \\approx 2.24'}</M>, even further than <M>(2, 0)</M>. The midpoint would only
        be closest if both intercepts were the same distance from <M>O</M>. Here <M>(2, 0)</M> is much nearer, so the
        closest point sits nearer that end. Press &ldquo;Closest point&rdquo; to see where.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Every point on the <b>green stretch</b> of the line lies inside the circle of radius <M>OP</M>, so it is closer to{' '}
        <M>O</M> than <M>P</M> is. Right now <M>OP</M> meets the line at <M>{`${angle.toFixed(1)}^\\circ`}</M>. Slide{' '}
        <M>P</M> {p > FOOT ? 'down' : 'up'} the line towards the green stretch and watch the circle shrink. It stops
        shrinking when the green stretch disappears.
      </Notice>
    )
  }

  const lo = Math.min(p, other)
  const hi = Math.max(p, other)

  return (
    <div>
      <Plane x={[-2.4, 3.4]} y={[-4.4, 1.4]} xStep={1} yStep={1} equalScale height={440}>
        <Circle center={[0, 0]} radius={r} color={C.violet} fillOpacity={0.07} strokeStyle="dashed" weight={2} />
        <Plot.OfX y={line} domain={[-1, 3.4]} color={C.f} weight={3} />
        {!atFoot && (
          <>
            <Line.Segment point1={[lo, line(lo)]} point2={[hi, line(hi)]} color={C.good} weight={7} />
            <Point x={other} y={line(other)} color={C.good} />
          </>
        )}
        {atFoot && (
          <Polygon
            points={[
              [p, y],
              [p + s * uL[0], y + s * uL[1]],
              [p + s * uL[0] + s * uO[0], y + s * uL[1] + s * uO[1]],
              [p + s * uO[0], y + s * uO[1]],
            ]}
            color={C.good}
            fillOpacity={0.2}
            weight={2}
          />
        )}
        <Point x={2} y={0} color={C.guide} />
        <Point x={0} y={-4} color={C.guide} />
        {Math.abs(p - 2) > 0.25 && (
          <Label at={[2, 0]} attach="nw" color={C.guide} size={12}>
            (2, 0)
          </Label>
        )}
        <Label at={[0, -4]} attach="e" color={C.guide} size={12}>
          (0, −4)
        </Label>
        <Label at={[2.45, line(2.45)]} attach="e" color={C.f} size={12}>
          y = 2x − 4
        </Label>
        <Line.Segment point1={[0, 0]} point2={[p, y]} color={opColor} weight={3} />
        <Point x={0} y={0} color={C.ink} />
        <Label at={[0, 0]} attach="nw" color={C.ink}>
          O
        </Label>
        <Label at={[p, y]} attach="e" gap={11} color={opColor}>
          P
        </Label>
        <MovablePoint
          point={[p, y]}
          onMove={([mx, my]) => setP(snap((mx + 2 * (my + 4)) / 5))}
          color={opColor}
        />
      </Plane>
      <Controls>
        <Slider label="x_P" value={p} onChange={v => setP(snap(v))} min={LO} max={HI} step={0.01} />
        <Buttons>
          <ActionButton label="(2, 0): x-intercept" onClick={() => setP(2)} />
          <ActionButton label="(1, −2): midpoint" onClick={() => setP(1)} />
          <ActionButton label="Closest point" onClick={() => setP(FOOT)} />
        </Buttons>
        <Readouts>
          <Readout
            color={opColor}
            tex={atFoot ? 'P = \\left(\\tfrac85, -\\tfrac45\\right)' : `P = (${num(p)}, ${num(y)})`}
          />
          <Readout
            color={opColor}
            tex={atFoot ? 'OP = \\tfrac{4\\sqrt5}{5} \\approx 1.789' : `OP \\approx ${r.toFixed(3)}`}
          />
          <Readout tex={`\\text{angle with line} = ${angle.toFixed(1)}^\\circ`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
