// 2015 Methods Exam 2 Q3d(ii) — the smallest sample size n with Pr(at least one underweight) > 0.5.
// The dots are Pr(at least 1 of n underweight) = 1 − 0.97ⁿ for whole numbers n; the faint curve
// joins them (zoomed to n = 16 … 30 so neighbouring dots are distinguishable). The curve crosses 0.5 at n ≈ 22.76, but n must be a whole number: n = 22 sits just
// below the line (0.488) and n = 23 is the first dot above it (0.504). That is why 22.76 rounds UP
// to 23, not to the nearest integer 22 — the report's common error — and why the answer must be a
// single value, not the inequality n > 22.7566.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const P = (n: number) => 1 - 0.97 ** n
const CROSS = Math.log(0.5) / Math.log(0.97) // 22.7566...
const NS = Array.from({ length: 15 }, (_, i) => i + 16) // n = 16 … 30
const TICKS = [16, 18, 20, 22, 24, 26, 28, 30]

export default function SampleSize() {
  const [n, setN] = useState(20)
  const p = P(n)
  const above = p > 0.5
  const colour = n === 23 ? C.good : above ? C.f : C.bad

  let notice
  if (n < 22) {
    notice = (
      <Notice>
        With <M>{`n = ${n}`}</M> the chance of catching at least one underweight lemon is only{' '}
        <M>{p.toFixed(3)}</M>, below the dashed line at 0.5 (each dot is one whole-number sample size). Increase <M>n</M> until a dot first rises above the line.
      </Notice>
    )
  } else if (n === 22) {
    notice = (
      <Notice tone="warn">
        <b>The trap:</b> <M>22.7566\ldots</M> rounds to 22 to the nearest integer, but <M>{'1 - 0.97^{22} \\approx 0.488'}</M>{' '}
        is still <b>below</b> 0.5. A sample of 22 lemons does not do the job. Try <M>n = 23</M>.
      </Notice>
    )
  } else if (n === 23) {
    notice = (
      <Notice tone="good">
        <b><M>n = 23</M> is the first dot above the line:</b> <M>{'1 - 0.97^{23} \\approx 0.504 > 0.5'}</M>. The curve crosses
        0.5 between 22 and 23 (at <M>n \approx 22.76</M>), so the smallest whole number that works is the one just after the
        crossing: round <b>up</b>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{`n = ${n}`}</M> also gives a probability above 0.5, and so does every larger <M>n</M>. That is why the
        inequality <M>n &gt; 22.7566\ldots</M> isn&apos;t an answer: the question asks for the <b>smallest</b> one. Slide back
        to 23.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[16, 30]} y={[0.37, 0.62]} xStep={1} yStep={0.05} height={300} labels={false} xLabel="" yLabel="">
        <Plot.OfX y={P} domain={[15, 31]} color={C.guide} weight={1.5} opacity={0.6} />
        <Line.Segment point1={[15, 0.5]} point2={[31, 0.5]} color={C.g} style="dashed" weight={2} />
        <Label at={[16, 0.5]} color={C.g} attach="ne">Pr = 0.5</Label>
        <Line.Segment point1={[CROSS, 0.37]} point2={[CROSS, 0.5]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[CROSS, 0.4]} color={C.guide} attach="e">22.76</Label>
        {TICKS.map(k => (
          <Label key={k} at={[k, 0.37]} attach="s" size={12} bold={false}>{k}</Label>
        ))}
        {NS.map(k => (
          <Point key={k} x={k} y={P(k)} color={k === n ? colour : C.guide} opacity={k === n ? 1 : 0.5} />
        ))}
        <Line.Segment point1={[n, 0.37]} point2={[n, p]} color={colour} weight={2} />
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={16} max={30} step={1} format={v => v.toFixed(0)} />
        <Readouts>
          <Readout tex={`0.97^{${n}} \\approx ${(0.97 ** n).toFixed(3)}`} />
          <Readout
            color={colour}
            tex={`1 - 0.97^{${n}} \\approx ${p.toFixed(3)}\\ ${above ? '> 0.5' : '< 0.5'}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
