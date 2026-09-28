// 2020 Specialist Exam 2 MCQ 9 — what "the x-intercept of the tangent at P equals the y-value at
// P" says, as a picture: the tangent at P(x, y) must pass through Q(y, 0), the point on the x-axis
// as far from O as P is above (or below) the axis (the two violet lengths). Two points fix the
// line, so its gradient is rise over run, (y − 0)/(x − y): the differential equation
// dy/dx = y/(x − y) the question never writes down. Drag P anywhere; the buttons put it on the
// three easy lines: the y-axis (O, P, Q make an isosceles right triangle, so gradient −1), just
// off the x-axis (Q slides to O and the line flattens to gradient 0) and y = x (Q directly below
// P, a vertical tangent). The blue curve through P is x = y(c − log_e|y|), which has the property at
// every point (sympy: its dy/dx is y/(x − y)); it only illustrates, and solving for it is beyond
// the course. Nothing here redraws VCAA's option figures.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, clamp, num,
} from './kit'

const R = 2.3
const SNAP = 0.07

type P = [number, number]

// Keep P on screen and off O (where the condition says nothing), and snap it onto the y-axis and
// the line y = x when it passes close, so those cases can be reached with a finger.
function place([mx, my]: P): P {
  let x = clamp(mx, -R, R)
  let y = clamp(my, -R, R)
  if (Math.abs(x) < SNAP) x = 0
  else if (Math.abs(x - y) < SNAP) x = y = (x + y) / 2
  if (Math.hypot(x, y) < 0.25) {
    const len = Math.hypot(x, y) || 1
    x = x === 0 ? 0 : (0.25 * x) / len
    y = y === 0 && x === 0 ? 0.25 : (0.25 * y) / len
  }
  return [x, y]
}

export default function Tangent() {
  const [p, setP] = useState<P>([2, 0.8])
  const [x, y] = p
  const q: P = [y, 0]
  const onYAxis = x === 0
  const onDiag = !onYAxis && Math.abs(x - y) < 1e-9
  const nearXAxis = !onYAxis && !onDiag && Math.abs(y) < 0.3
  const slope = onDiag ? Infinity : y / (x - y)

  // The curve through P with this property everywhere: x = y(c − log_e|y|).
  const hasCurve = Math.abs(y) > 0.03
  const c = hasCurve ? x / y + Math.log(Math.abs(y)) : 0
  const sgn = y > 0 ? 1 : -1

  let notice
  if (onYAxis) {
    notice = (
      <Notice tone="good">
        <b>P is on the <M>y</M>-axis</b>, so <M>P = (0, y)</M> and <M>Q = (y, 0)</M>. <M>OP</M> and <M>OQ</M> are both{' '}
        <M>|y|</M> long, so <M>OPQ</M> is an isosceles right-angled triangle and <M>PQ</M> slopes at gradient{' '}
        <M>-1</M>, whatever <M>y</M> is, above <M>O</M> or below it. The formula agrees:{' '}
        <M>{'\\tfrac{y}{0 - y} = -1'}</M>. So all along the <M>y</M>-axis, the right slope field has marks of gradient{' '}
        <M>-1</M>.
      </Notice>
    )
  } else if (onDiag) {
    notice = (
      <Notice>
        <b>P is on the line <M>y = x</M></b>, so <M>Q = (y, 0) = (x, 0)</M> is straight below (or above) P. The tangent is
        vertical, and the formula <M>{'\\tfrac{y}{x - y}'}</M> has <M>x - y = 0</M> on the bottom: undefined. So the right
        field has vertical marks along <M>y = x</M>, in the first and third quadrants.
      </Notice>
    )
  } else if (nearXAxis) {
    notice = (
      <Notice>
        <b>P is close to the <M>x</M>-axis</b>, so its height <M>y</M> is small and <M>Q = (y, 0)</M> is close to{' '}
        <M>O</M>. The line from P to Q is nearly flat: <M>{'\\tfrac{y}{x - y}'}</M> is small. Drag P closer still: as P
        reaches the axis the gradient goes to <M>0</M>. So along the <M>x</M>-axis every mark of the right field is flat.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <b>Read the condition as a point.</b> The tangent at P meets the <M>x</M>-axis at <M>Q = (y, 0)</M>: the distance{' '}
        <M>OQ</M> equals P&apos;s height <M>y</M> (the two violet lengths). A line through <M>P(x, y)</M> and{' '}
        <M>Q(y, 0)</M> has gradient rise ÷ run <M>{'= \\tfrac{y - 0}{x - y}'}</M>, so{' '}
        <M>{'\\tfrac{dy}{dx} = \\tfrac{y}{x - y}'}</M>. The blue curve through P obeys this at every point: drag P along it
        and Q keeps pace. Now try the three buttons.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.5, 2.5]} y={[-2.5, 2.5]} xStep={1} yStep={1} equalScale height={340}>
        {hasCurve && (
          <Plot.Parametric
            xy={s => [s * (c - Math.log(Math.abs(s))), s]}
            domain={sgn > 0 ? [0.002, 2.8] : [-2.8, -0.002]}
            color={C.f}
            weight={2.5}
          />
        )}
        <Line.ThroughPoints point1={p} point2={q} color={C.g} weight={2.5} />
        {/* P's height y, and the same length y laid along the x-axis from O to Q. */}
        {y !== 0 && <Line.Segment point1={[x, 0]} point2={p} color={C.violet} weight={4} opacity={0.8} />}
        {y !== 0 && <Line.Segment point1={[0, 0]} point2={q} color={C.violet} weight={4} opacity={0.8} />}
        {Math.abs(y) > 0.3 && !onYAxis && (
          <Label at={[x, y / 2]} color={C.violet} attach={x > 0 ? 'e' : 'w'} size={13} italic>
            y
          </Label>
        )}
        {Math.abs(y) > 0.3 && (
          <Label at={[y / 2, 0]} color={C.violet} attach={y > 0 ? 'n' : 's'} gap={6} size={13} italic>
            y
          </Label>
        )}
        <Point x={q[0]} y={q[1]} color={C.g} />
        <Label at={q} color={C.g} attach={y > 0 ? 'se' : 'ne'} gap={9}>
          Q(y, 0)
        </Label>
        <Label at={p} color={C.ink} attach={x >= 0 ? (y >= 0 ? 'nw' : 'sw') : y >= 0 ? 'ne' : 'se'} gap={12}>
          P
        </Label>
        <MovablePoint point={p} onMove={m => setP(place(m as P))} color={C.ink} />
      </Plane>
      <Controls>
        <Buttons>
          <ActionButton label="P on the y-axis" onClick={() => setP([0, 1.5])} />
          <ActionButton label="P near the x-axis" onClick={() => setP([1.6, 0.12])} />
          <ActionButton label="P on y = x" onClick={() => setP([1.3, 1.3])} />
          <span className="text-[12px] text-gray-500 dark:text-gray-400">or drag P.</span>
        </Buttons>
        <Readouts>
          <Readout tex={`P = (${num(x)},\\ ${num(y)})`} />
          <Readout color={C.g} tex={`Q = (${num(y)},\\ 0)`} />
          <Readout
            color={C.g}
            tex={
              onDiag
                ? '\\tfrac{dy}{dx} = \\tfrac{y}{x - y}: \\text{ undefined (vertical)}'
                : `\\tfrac{dy}{dx} = \\tfrac{y - 0}{x - y} = \\tfrac{${num(y)}}{${num(x - y)}} ${onYAxis ? '=' : '\\approx'} ${num(slope)}`
            }
          />
        </Readouts>
        {notice}
        <p className="text-[11.5px] text-gray-500 dark:text-gray-400">
          The blue curve is <M>{'x = y\\,(c - \\log_e|y|)'}</M> with <M>c</M> chosen so that it passes through P. You
          don&apos;t need its equation (solving this differential equation is beyond the course); it is here to show a curve
          whose tangent obeys the rule at every point, which is what a slope field&apos;s marks follow.
        </p>
      </Controls>
    </div>
  )
}
