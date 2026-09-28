// 2018 Methods Exam 2 Q4f — a probability is an area under the density M itself. Slide the cut-off
// time t₀: the shaded area under M from 0 to t₀ is Pr(T < t₀) = 1 − e^{−(t₀/50)³}, a thin 0.0266
// sliver at t₀ = 15 ("elite") that grows to 1. A toggle keeps part e.'s extra factor t, as in the
// report's common wrong answer ∫₀¹⁵ t M(t) dt = 0.2991: the curve changes shape, and its area keeps
// growing past 1 towards 44.6 (the mean), so it cannot be a probability.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle, integrate } from './kit'

const Mf = (t: number) => (t <= 0 ? 0 : (3 / 50) * (t / 50) ** 2 * Math.exp(-((t / 50) ** 3)))
const tM = (t: number) => t * Mf(t)
const cdf = (t: number) => 1 - Math.exp(-((t / 50) ** 3))

export default function EliteArea() {
  const [t0, setT0] = useState(15)
  const [withT, setWithT] = useState(false)

  const f = withT ? tM : Mf
  const area = withT ? integrate(tM, 0, t0, 400) : cdf(t0)
  const at15 = Math.abs(t0 - 15) < 0.26

  let notice
  if (withT) {
    notice = (
      <Notice tone="warn">
        With the extra <M>t</M> you are integrating <M>{'t\\,M(t)'}</M>, a different curve. From <M>0</M> to{' '}
        <M>15</M> its area is <M>0.2991</M> (the report&apos;s common wrong answer), and slide right: it passes{' '}
        <M>1</M> and heads for <M>44.6</M>, the mean from part e. A probability can never exceed <M>1</M>, so this
        is not one.
      </Notice>
    )
  } else if (at15) {
    notice = (
      <Notice tone="good">
        <b>Elite = the sliver left of <M>15</M>.</b> Its area is <M>{'\\int_0^{15}M(t)\\,dt = 1-e^{-0.027} \\approx 0.0266'}</M>.
        Fifteen minutes is far out in the left tail, where the curve has barely lifted off the axis, so only about{' '}
        <M>2.7\%</M> of students are elite. Turn on the toggle to see what part e.&apos;s integrand does here.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The shaded area is <M>{`\\Pr(T<${t0.toFixed(1)}) = ${area.toFixed(4)}`}</M>. Slide all the way right and it
        approaches <M>1</M>: the whole area under a density is <M>1</M>. Put <M>t_0</M> back on <M>15</M> for the
        question.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, 120]}
        y={withT ? [0, 1.2] : [0, 0.028]}
        xStep={15}
        yStep={withT ? 0.2 : 0.01}
        height={280}
        xLabel="t"
        yLabel=""
        xLabels={v => (v < 0 || v > 110 || (Math.round(v) !== 15 && Math.round(v) % 30) ? '' : String(Math.round(v)))}
        yLabels={v => (withT ? (v > 1.15 ? '' : v.toFixed(1)) : v > 0.027 ? '' : v.toFixed(2))}
      >
        <Region top={f} bottom={() => 0} from={0} to={t0} color={withT ? C.bad : C.good} opacity={0.35} />
        <Plot.OfX y={f} domain={[0, 120]} color={withT ? C.bad : C.f} weight={3} />
        <Line.Segment point1={[t0, 0]} point2={[t0, withT ? 1.1 : 0.026]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[t0, withT ? 1.1 : 0.026]} attach="e" size={12} color={C.ink}>{`t₀ = ${t0.toFixed(1)}`}</Label>
        <Label at={[62, f(62)]} attach="ne" size={12} color={withT ? C.bad : C.f}>
          {withT ? 'y = t M(t)' : 'y = M(t)'}
        </Label>
      </Plane>
      <Controls>
        <Slider label="t_0" value={t0} onChange={setT0} min={0} max={120} step={0.5} format={v => v.toFixed(1)} />
        <Buttons>
          <Toggle label="Keep part e.'s extra t" checked={withT} onChange={setWithT} />
        </Buttons>
        <Readouts>
          <Readout
            color={withT ? C.bad : C.good}
            tex={withT ? `\\int_0^{${t0.toFixed(1)}} t\\,M(t)\\,dt \\approx ${area.toFixed(4)}` : `\\int_0^{${t0.toFixed(1)}} M(t)\\,dt = ${area.toFixed(4)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
