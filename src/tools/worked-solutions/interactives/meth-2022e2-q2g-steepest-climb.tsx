// 2022 Methods Exam 2 Q2g — the greatest positive rate of change of s is the highest point of
// the s′ graph, where s″(t) = 0, not where s′(t) = 0. Slide t (t > 40) to move the tangent along
// s(t) = 1700e^(−0.003t) sin(πt/80) + 2500 and the matching point along s′(t) underneath. The
// report's wrong answers both show up: s′ = 0 at the population's turning points (≈ 118, 198,
// 278) and the steepest fall at t ≈ 76. The steepest climb for t > 40 is t ≈ 156.1, where
// s′ ≈ 41.8; the next climb (t ≈ 316) is smaller because the damping shrinks every swing.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const xl = (v: number) => (v < 0 ? '' : String(v)) // no tick numbers in the left margin

const K = Math.PI / 80
const s = (t: number) => 1700 * Math.exp(-0.003 * t) * Math.sin(K * t) + 2500
const ds = (t: number) => 1700 * Math.exp(-0.003 * t) * (K * Math.cos(K * t) - 0.003 * Math.sin(K * t))
// s″(t) = 0 at t ≈ 76.117 + 80n; s′(t) = 0 at t ≈ 38.058 + 80n
const CLIMB = 156.1168
const FALL = 76.1168
const near = (t: number, a: number) => Math.abs(t - a) < 1.5

export default function SteepestClimb() {
  const [t, setT] = useState(130)

  const slope = ds(t)
  const turning = [118.0584, 198.0584, 278.0584].find(a => near(t, a))
  const atClimb = near(t, CLIMB)
  const atFall = near(t, FALL)
  const atFall2 = near(t, FALL + 160)
  const atClimb2 = near(t, CLIMB + 160)
  const colour = atClimb ? C.good : turning !== undefined || atFall || atFall2 ? C.bad : C.f
  const w = 28

  let notice
  if (atClimb) {
    notice = (
      <Notice tone="good">
        <b>Steepest climb.</b> Here <M>{"s''(t) = 0"}</M> and the lower graph is at its highest point for{' '}
        <M>{'t > 40'}</M>: <M>{"s'(156.1\\ldots) \\approx 41.8"}</M> rabbits per week. The answer is the time,{' '}
        <M>t = 156</M> weeks; 41.8 is the rate, not the time.
      </Notice>
    )
  } else if (turning !== undefined) {
    notice = (
      <Notice tone="warn">
        Here <M>{"s'(t) = 0"}</M>: the tangent is flat because the population is at a turning point. This is what
        solving <M>{'\\tfrac{ds}{dt} = 0'}</M> finds, a time when the rate is <b>zero</b>, not greatest. Slide on to
        where the tangent is steepest uphill.
      </Notice>
    )
  } else if (atFall) {
    notice = (
      <Notice tone="warn">
        <b>Steepest fall</b>, with <M>{"s'(76.1\\ldots) \\approx -53.1"}</M>. This is also a solution of{' '}
        <M>{"s''(t) = 0"}</M>, but it is the lowest point of the <M>{"s'"}</M> graph: the greatest <em>negative</em>{' '}
        rate. That is why 76 is wrong. Keep sliding to the next <M>{"s''(t) = 0"}</M>.
      </Notice>
    )
  } else if (atFall2) {
    notice = (
      <Notice>
        Another steepest fall (<M>{"s' \\approx -32.9"}</M>), so it can&apos;t be the answer. Notice the dips in the
        lower graph get shallower: the factor <M>{'e^{-0.003t}'}</M> shrinks every swing.
      </Notice>
    )
  } else if (atClimb2) {
    notice = (
      <Notice>
        The next steepest climb, but <M>{"s' \\approx 25.9"}</M>, smaller than 41.8. Each climb is{' '}
        <M>{'e^{-0.48} \\approx 0.62'}</M> times the one 160 weeks before, so no later time beats{' '}
        <M>t \approx 156.1</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The tangent&apos;s gradient is <M>{"s'(t)"}</M>, plotted as the dot on the lower graph. Slide <M>t</M> to make
        the tangent as steep <b>uphill</b> as you can: that is the highest point of the lower graph, where its own
        gradient <M>{"s''(t)"}</M> is zero.
      </Notice>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {/* y numbers sit left of the axis (custom Labels) so the steep start of each curve doesn't run through them */}
      <Plane x={[-48, 320]} y={[0, 4500]} xStep={40} yStep={1000} height={260} xLabel="t" yLabel="s" yLabels={false} xLabels={xl}>
        {[1000, 2000, 3000, 4000].map(v => (
          <Label key={v} at={[-2, v]} attach="w" size={12}>{String(v)}</Label>
        ))}
        <Line.Segment point1={[40, 0]} point2={[40, 4500]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={s} domain={[0, 320]} color={C.f} weight={3} />
        <Line.Segment
          point1={[t - w, s(t) - slope * w]}
          point2={[t + w, s(t) + slope * w]}
          color={colour}
          weight={2.5}
        />
        <Point x={t} y={s(t)} color={colour} />
        <Label at={[40, 4500]} color={C.guide} attach="e" size={12}>t = 40</Label>
      </Plane>
      <Plane x={[-48, 320]} y={[-60, 70]} xStep={40} yStep={20} height={220} xLabel="t" yLabel="s′" yLabels={false} xLabels={v => (v > 0 && v % 80 === 0 ? String(v) : '')}>
        {/* s′ crosses the axis near 40, 120, 200, 280, so only every second time is numbered here */}
        {[-60, -40, -20, 20, 40, 60].map(v => (
          <Label key={v} at={[-2, v]} attach="w" size={12}>{String(v)}</Label>
        ))}
        <Line.Segment point1={[40, -60]} point2={[40, 70]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={ds} domain={[0, 320]} color={C.violet} weight={3} />
        <Line.Segment point1={[t, 0]} point2={[t, slope]} color={colour} style="dashed" weight={1.5} />
        <Point x={t} y={slope} color={colour} />
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={40} max={320} step={0.2} format={v => v.toFixed(1)} />
        <Readouts>
          <Readout color={C.f} tex={`s(t) \\approx ${s(t).toFixed(0)}`} />
          <Readout color={colour} tex={`s'(t) \\approx ${slope.toFixed(1)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
