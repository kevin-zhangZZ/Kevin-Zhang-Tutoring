// 2023 Specialist Exam 2 Q4e.i — why d²Q/dt² needs the chain rule. The growth rate dQ/dt is drawn
// against t for the pond-2 model Q = 1000/(1 + 9e^(−1.1t)). Drag t: the green tangent's slope is
// d²Q/dt², and it always equals d/dQ(dQ/dt) × dQ/dt = 1.1(1 − Q/500) × 1.1Q(1 − Q/1000), checked
// against the slope measured from the curve. A toggle draws the no-chain-rule answer d/dQ(dQ/dt)
// alone (a slope "per fish", not per year), which is nowhere near the tangent. At t = ln(9)/1.1 ≈ 2
// (Q = 500) both are 0: the growth rate peaks, which is part e.ii.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Buttons, num, tick } from './kit'

const Qof = (t: number) => 1000 / (1 + 9 * Math.exp(-1.1 * t))
const rateOfQ = (q: number) => 1.1 * q * (1 - q / 1000)
const dRate_dQ = (q: number) => 1.1 * (1 - q / 500)
const rate = (t: number) => rateOfQ(Qof(t))
const T_PEAK = Math.log(9) / 1.1
const HALF = 0.55

export default function Chain() {
  const [t0, setT0] = useState(1)
  const [noChain, setNoChain] = useState(false)

  const q = Qof(t0)
  const r = rateOfQ(q)
  const fp = dRate_dQ(q)
  const d2 = fp * r
  const h = 1e-4
  const measured = (rate(t0 + h) - rate(t0 - h)) / (2 * h)
  const nearPeak = Math.abs(t0 - T_PEAK) < 0.06
  const afterPeak = t0 > T_PEAK

  // Short segments through the point, kept inside 0 ≤ t ≤ 6.
  const a = Math.max(0, t0 - HALF)
  const b = Math.min(6, t0 + HALF)
  const tangent = (t: number) => r + d2 * (t - t0)
  const wrong = (t: number) => r + fp * (t - t0)

  let notice
  if (nearPeak) {
    notice = (
      <Notice tone="good">
        <b>At <M>t \approx 2</M>, <M>Q = 500</M>.</b> Here <M>{'\\tfrac{d}{dQ}\\big(\\tfrac{dQ}{dt}\\big) = 1.1\\big(1 - \\tfrac{500}{500}\\big) = 0'}</M>,
        so <M>{'\\tfrac{d^2Q}{dt^2} = 0'}</M> and the tangent is flat. The growth rate is at its maximum, 275 fish per
        year. That is part e.ii.
      </Notice>
    )
  } else if (noChain) {
    notice = (
      <Notice tone="warn">
        The red dashed line has slope <M>{num(fp, 3)}</M>, the answer you get by differentiating with respect to{' '}
        <M>Q</M> and stopping. It is nowhere near the curve&apos;s slope of <M>{num(measured, 1)}</M>, because{' '}
        <M>{num(fp, 3)}</M> is the change in growth rate <b>per extra fish</b>, not per year. Right now the population is growing by about{' '}
        <M>{num(r, 0)}</M> fish per year (that is <M>{'\\tfrac{dQ}{dt}'}</M>), so multiply by it. That
        multiplication is the chain rule.
      </Notice>
    )
  } else if (!afterPeak) {
    notice = (
      <Notice>
        The green tangent&apos;s slope is <M>{'\\tfrac{d^2Q}{dt^2}'}</M>: how fast the growth rate is changing{' '}
        <b>per year</b>. The chain rule <M>{'\\tfrac{d}{dQ}\\big(\\tfrac{dQ}{dt}\\big)\\times\\tfrac{dQ}{dt}'}</M> gives{' '}
        <M>{num(d2, 1)}</M>, matching the slope measured from the curve. Turn on &ldquo;No chain rule&rdquo; to see what
        you get by stopping at <M>{'\\tfrac{d}{dQ}'}</M>, the common error the report describes, then drag <M>t</M> to about 2.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Past <M>Q = 500</M>, the factor <M>{'1.1\\big(1 - \\tfrac{Q}{500}\\big)'}</M> is negative, so{' '}
        <M>{'\\tfrac{d^2Q}{dt^2}'}</M> is negative: the growth rate is <b>falling</b> even though <M>Q</M> is still
        rising. The product still matches the slope of the curve, <M>{num(measured, 1)}</M>. Turn on &ldquo;No chain
        rule&rdquo; to compare.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 6]} y={[0, 315]} xStep={1} yStep={50} height={320} xLabel="t" yLabel="dQ/dt"
        // Tick numbers sit just right of the axis; 100 and 150 would lie under the curve and the early tangents.
        yLabels={v => (v === 100 || v === 150 ? '' : tick(v))}>
        <Plot.OfX y={rate} domain={[0, 6]} color={C.f} weight={3} />
        <Label at={[4.3, rate(4.3)]} color={C.f} attach="ne">dQ/dt</Label>
        <Line.Segment point1={[a, tangent(a)]} point2={[b, tangent(b)]} color={C.good} weight={3} />
        {noChain && (
          <>
            <Line.Segment point1={[a, wrong(a)]} point2={[b, wrong(b)]} color={C.bad} style="dashed" weight={2.5} />
            {/* Kept in the empty top-right corner: next to the line it would cross the hump. */}
            <Label at={[6, 300]} color={C.bad} attach="w">{`no chain rule: slope ${num(fp, 2)}`}</Label>
          </>
        )}
        <Point x={t0} y={r} color={C.ink} />
      </Plane>
      <Controls>
        <Slider label="t" value={t0} onChange={setT0} min={0} max={6} step={0.01} />
        <Buttons>
          <Toggle label="No chain rule: stop at d/dQ" checked={noChain} onChange={setNoChain} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`Q = ${num(q, 1)},\\ \\ \\tfrac{dQ}{dt} = ${num(r, 1)}`} />
          <Readout
            color={noChain ? C.bad : undefined}
            tex={`\\tfrac{d}{dQ}\\big(\\tfrac{dQ}{dt}\\big) = 1.1\\big(1-\\tfrac{Q}{500}\\big) = ${num(fp, 3)}`}
          />
          <Readout color={C.good} tex={`\\tfrac{d^2Q}{dt^2} = ${num(fp, 3)} \\times ${num(r, 1)} \\approx ${num(d2, 1)}`} />
          <Readout
            color={C.good}
            tex={`\\text{slope of curve} \\approx ${num(measured, 1)}${noChain && !nearPeak ? `\\ne ${num(fp, 3)}` : '\\ \\checkmark'}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
