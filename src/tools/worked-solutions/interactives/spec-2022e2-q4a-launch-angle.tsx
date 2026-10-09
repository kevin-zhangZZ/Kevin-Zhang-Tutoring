// 2022 Specialist Exam 2 Q4a — the direction of the ball's path at any moment is its velocity
// ṙ(t) = (π/8)cos(πt/4) i + 2 j, drawn to scale (equal axes) as a right-angled triangle: 2 forward,
// (π/8)cos(πt/4) sideways. θ is the angle from the FORWARD direction j, so tan θ = sideways/forward;
// at t = 0 that is π/16, θ ≈ 11.1°. Slide t to see the arrow stay along the curve. A toggle shows the
// report's most frequent incorrect response: the angle from the x-axis, 78.9°, the complement.
// The view follows the ball (y-range moves with it) so the triangle stays large. θ is only the
// angle at O, so for t > 0 the green angle is read out as "angle to forward", unlabelled on the plane.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polyline, Readout, Readouts, Slider, Toggle, Vector } from './kit'

const PI = Math.PI
const pos = (t: number): [number, number] => [0.5 * Math.sin((PI * t) / 4), 2 * t]
const vx = (t: number) => (PI / 8) * Math.cos((PI * t) / 4)
const DEG = 180 / PI

/** Points on an arc of radius r about c, from angle a0 to a1 (radians, measured from +x). */
function arc(c: [number, number], r: number, a0: number, a1: number): [number, number][] {
  const n = 24
  return Array.from({ length: n + 1 }, (_, k) => {
    const a = a0 + ((a1 - a0) * k) / n
    return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)] as [number, number]
  })
}

export default function LaunchAngle() {
  const [t, setT] = useState(0)
  const [wrong, setWrong] = useState(false)

  const P = pos(t)
  const s = vx(t)
  const tip: [number, number] = [P[0] + s, P[1] + 2]
  const phi = Math.atan2(2, s) // direction of the velocity, from +x
  const theta = Math.atan(s / 2) * DEG // from forward
  const comp = 90 - theta
  const atStart = t < 0.03
  const atTwo = t > 1.97

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        The red angle is measured from the <b><M>x</M>-axis</b> (<M>{'\\underset{\\sim}{i}'}</M>), so the 2 is now the
        opposite side: <M>{`\\tan^{-1}\\!\\left(\\tfrac{2}{\\pi/8}\\right) \\approx 78.9^\\circ`}</M> at <M>t = 0</M>. That is the
        complementary angle, the report&apos;s most frequent incorrect response. The question measures <M>\theta</M> from
        the <b>forward</b> direction, and its diagram draws <M>\theta</M> against the <M>y</M>-axis, so <M>\theta</M> must
        be small.
      </Notice>
    )
  } else if (atStart) {
    notice = (
      <Notice tone="good">
        The orange arrow is the velocity at <M>O</M>, drawn to scale: it lies exactly along the blue path as the ball
        leaves <M>O</M>. The green angle <M>\theta</M> opens from the dashed forward line, the side of length 2, so{' '}
        <M>\theta</M> comes out small: <M>{'\\theta \\approx 11.1^\\circ'}</M>. Turn on the toggle to see where the common
        wrong answer <M>{'78.9^\\circ'}</M> comes from, or slide <M>t</M> to watch the arrow follow the path.
      </Notice>
    )
  } else if (atTwo) {
    notice = (
      <Notice>
        At <M>t = 2</M> the sideways velocity <M>{'\\tfrac{\\pi}{8}\\cos\\!\\left(\\tfrac{\\pi t}{4}\\right)'}</M> is zero, so
        the ball is travelling straight forward and the angle is <M>{'0^\\circ'}</M>. This is also its slowest moment
        (part b.ii.). Turn on the toggle to see the angle students most often gave instead.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Whatever <M>t</M> is, the velocity arrow lies along the curve: velocity always points the way the ball is
        moving. That is why the direction of the path at <M>O</M> comes from{' '}
        <M>{'\\underset{\\sim}{\\dot r}(0)'}</M>, not from <M>{'\\underset{\\sim}{r}(0)'}</M>, which is just the zero
        vector. The forward part stays 2 while the sideways part shrinks, so the angle shrinks towards{' '}
        <M>t = 2</M>. (The view follows the ball.)
      </Notice>
    )
  }

  const R = 1.5
  const showTheta = theta > 3.5

  return (
    <div>
      <Plane x={[-0.6, 1.2]} y={[P[1] - 0.5, P[1] + 2.9]} xStep={0.5} yStep={1} height={440} equalScale yLabels={false}>
        <Plot.Parametric xy={pos} domain={[Math.max(0, t - 0.4), t + 1.6]} color={C.f} weight={3} />
        <Line.Segment point1={P} point2={[P[0], P[1] + 2.6]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[P[0], P[1] + 2.6]} attach="n" color={C.guide} size={11}>forward</Label>
        {Math.abs(s) > 0.01 && (
          <Line.Segment point1={[P[0], P[1] + 2]} point2={tip} color={C.guide} style="dashed" weight={1.5} />
        )}
        <Label at={[P[0], P[1] + 1]} attach="w" color={C.ink} size={12}>2</Label>
        {Math.abs(s) > 0.01 && (
          <Label at={[P[0] + s / 2, P[1] + 2]} attach="n" color={C.ink} size={12}>
            {s.toFixed(2)}
          </Label>
        )}
        {showTheta && <Polyline points={arc(P, R, PI / 2, phi)} color={C.good} weight={2.5} />}
        {showTheta && atStart && (
          <Label at={[P[0] + 1.22 * Math.cos((PI / 2 + phi) / 2), P[1] + 1.22 * Math.sin((PI / 2 + phi) / 2)]} attach="c" color={C.good} size={13} gap={0}>
            θ
          </Label>
        )}
        {wrong && (
          <>
            <Line.Segment point1={P} point2={[P[0] + 1.3, P[1]]} color={C.bad} style="dashed" weight={1.5} />
            <Polyline points={arc(P, 0.6, 0, phi)} color={C.bad} weight={2.5} />
            <Label at={[P[0] + 0.62 * Math.cos(phi / 2), P[1] + 0.62 * Math.sin(phi / 2)]} attach="ne" color={C.bad} size={12}>
              {`${comp.toFixed(1)}°`}
            </Label>
          </>
        )}
        <Vector tail={P} tip={tip} color={C.g} weight={3} />
        <Label at={tip} attach="e" color={C.g} size={12}>velocity</Label>
        <Point x={P[0]} y={P[1]} color={C.f} />
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={2} step={0.01} />
        <Buttons>
          <Toggle label="Measure from the x-axis instead?" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\underset{\\sim}{\\dot r}(t) \\approx ${s.toFixed(2)}\\,\\underset{\\sim}{i} + 2\\,\\underset{\\sim}{j}`} />
          <Readout color={C.good} tex={`${atStart ? '\\theta' : '\\text{angle to forward}'} = \\tan^{-1}\\!\\left(\\tfrac{${s.toFixed(2)}}{2}\\right) \\approx ${theta.toFixed(1)}^\\circ`} />
          {wrong && (
            <Readout
              color={C.bad}
              tex={s > 0.005 ? `\\tan^{-1}\\!\\left(\\tfrac{2}{${s.toFixed(2)}}\\right) \\approx ${comp.toFixed(1)}^\\circ` : `\\text{from the } x\\text{-axis: } 90^\\circ`}
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
