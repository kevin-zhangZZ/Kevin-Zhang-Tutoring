// 2019 Specialist Exam 2 Q6f — where the rejection region starts. For a two-tailed test at 5%
// the 5% is split 2.5% into each tail of X̄ ~ N(375, 1.5²), so H₀ is rejected when x̄ < 372.06 or
// x̄ > 377.94 (invNorm(0.025, 375, 1.5) and its mirror). Slide the sample mean x̄ to see which
// region it falls in. The toggle shows the report's most frequent wrong answer: all 5% in the
// lower tail puts the cut-off at invNorm(0.05, 375, 1.5) ≈ 372.53 (372.5), and leaves no room for
// the upper tail. Buttons compare 372.0 (rejected, p ≈ 0.046) with 372.1 (not rejected,
// p ≈ 0.053), which is why the one-decimal answer is 372.1. Values checked in scipy.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle } from './kit'

const MU = 375
const SD = 1.5
// Abramowitz & Stegun 7.1.26, good to about 1e-7.
function erf(z: number) {
  const s = Math.sign(z)
  const a = Math.abs(z)
  const t = 1 / (1 + 0.3275911 * a)
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)
  return s * y
}
const pdf = (x: number) => Math.exp(-0.5 * ((x - MU) / SD) ** 2) / (SD * Math.sqrt(2 * Math.PI))
const cdf = (x: number) => 0.5 * (1 + erf((x - MU) / (SD * Math.SQRT2)))
const X0 = 369
const X1 = 381
const LOW = 372.06005402318993 // invNorm(0.025, 375, 1.5)
const HIGH = 2 * MU - LOW // 377.94
const ONE = 372.5327195595728 // invNorm(0.05, 375, 1.5), the report's wrong 372.5

export default function Cutoff() {
  const [xb, setXb] = useState(372.5)
  const [oneTail, setOneTail] = useState(false)

  const lowCut = oneTail ? ONE : LOW
  const rejected = oneTail ? xb < ONE : xb < LOW || xb > HIGH
  const colour = rejected ? C.bad : C.good
  const p = 2 * cdf(Math.min(xb, 2 * MU - xb)) // the two-tailed p value of this sample mean
  const near = (v: number) => Math.abs(xb - v) < 0.015

  let notice
  if (oneTail) {
    notice = (
      <Notice tone="warn">
        All <M>5\%</M> in the lower tail gives <M>{'\\Pr(\\overline{X} < x_c) = 0.05'}</M>, so <M>{'x_c \\approx 372.5'}</M>:
        the report&apos;s most frequent wrong answer. But the test is two-tailed, so a mean far <b>above</b> <M>375</M>{' '}
        must be rejected too, and that needs its own tail. Used on both sides, <M>372.5</M> and <M>377.5</M> would reject a
        working machine <M>10\%</M> of the time, not <M>5\%</M>.
      </Notice>
    )
  } else if (near(372)) {
    notice = (
      <Notice tone="warn">
        <M>{'\\overline{x} = 372.0'}</M> is just inside the red lower tail (<M>{'p \\approx 0.046 < 0.05'}</M>), so it is
        rejected: this is the actual sample from parts d and e. That&apos;s why the one-decimal answer can&apos;t be{' '}
        <M>372.0</M>. Click 372.1.
      </Notice>
    )
  } else if (near(372.1)) {
    notice = (
      <Notice tone="good">
        <M>{'\\overline{x} = 372.1'}</M> is just past the cut-off <M>372.06</M> (<M>{'p \\approx 0.053 \\ge 0.05'}</M>), so{' '}
        <M>H_0</M> is <b>not</b> rejected. It is the smallest one-decimal value that survives, so the answer is{' '}
        <M>372.1</M>.
      </Notice>
    )
  } else if (rejected) {
    notice = (
      <Notice tone="warn">
        <M>{`\\overline{x} = ${xb.toFixed(2)}`}</M> falls in a red tail, so <M>H_0</M> is rejected. Each red tail holds{' '}
        <M>{'2.5\\%'}</M> of the area: the <M>5\%</M> level is shared between too-light and too-heavy results.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <M>{`\\overline{x} = ${xb.toFixed(2)}`}</M> is in the middle <M>95\%</M>, so <M>H_0</M> is not rejected. Slide
        left to find where rejection starts: the cut-off has <M>{'2.5\\%'}</M> below it, not <M>5\%</M>. Then try the
        toggle.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[0, 0.32]} xStep={1} yStep={1} xLabels={v => ([370, 375, 380].includes(v) ? String(v) : '')} yLabels={false} xLabel="x̄" yLabel="" height={290}>
        <Region top={pdf} bottom={() => 0} from={X0} to={lowCut} color={C.bad} opacity={0.45} />
        {!oneTail && <Region top={pdf} bottom={() => 0} from={HIGH} to={X1} color={C.bad} opacity={0.45} />}
        <Region top={pdf} bottom={() => 0} from={lowCut} to={oneTail ? X1 : HIGH} color={C.good} opacity={0.12} />
        <Plot.OfX y={pdf} domain={[X0, X1]} color={C.f} weight={3} />
        <Line.Segment point1={[lowCut, 0]} point2={[lowCut, 0.2]} color={C.bad} style="dashed" weight={2} />
        <Label at={[lowCut, 0.2]} attach="nw" color={C.bad} size={12} gap={3}>{lowCut.toFixed(2)}</Label>
        <Label at={[lowCut - 0.9, 0.06]} attach="n" color={C.bad} size={12}>{oneTail ? '5%' : '2.5%'}</Label>
        {!oneTail && (
          <>
            <Line.Segment point1={[HIGH, 0]} point2={[HIGH, 0.2]} color={C.bad} style="dashed" weight={2} />
            <Label at={[HIGH, 0.2]} attach="ne" color={C.bad} size={12} gap={3}>{HIGH.toFixed(2)}</Label>
            <Label at={[HIGH + 0.9, 0.06]} attach="n" color={C.bad} size={12}>2.5%</Label>
          </>
        )}
        <Label at={[MU, 0.285]} attach="n" size={12} gap={2}>{oneTail ? 'don’t reject' : 'don’t reject: middle 95%'}</Label>
        <Line.Segment point1={[xb, 0]} point2={[xb, 0.25]} color={colour} weight={2.5} />
        <Point x={xb} y={0} color={colour} />
        <Label at={[xb, 0.25]} attach="n" color={colour} size={12} gap={3}>{`x̄ = ${xb.toFixed(2)}`}</Label>
      </Plane>
      <Controls>
        <Slider label="\overline{x}" value={xb} onChange={setXb} min={369.5} max={380.5} step={0.01} />
        <Buttons>
          <ActionButton label="x̄ = 372.0" onClick={() => setXb(372)} />
          <ActionButton label="x̄ = 372.1" onClick={() => setXb(372.1)} />
          <Toggle label="Put all 5% in the lower tail" checked={oneTail} onChange={setOneTail} />
        </Buttons>
        <Readouts>
          <Readout color={C.bad} tex={oneTail ? '\\Pr\\left(\\overline{X} < x_c\\right) = 0.05 \\Rightarrow x_c \\approx 372.53' : '\\Pr\\left(\\overline{X} < x_c\\right) = 0.025 \\Rightarrow x_c \\approx 372.06'} />
          <Readout color={colour} tex={`\\overline{x} = ${xb.toFixed(2)}:\\ ${rejected ? '\\text{reject } H_0' : '\\text{do not reject } H_0'}${oneTail ? '' : `,\\ p \\approx ${p.toFixed(3)}`}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
