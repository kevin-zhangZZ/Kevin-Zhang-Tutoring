// 2017 Specialist Exam 2 MCQ 20 — "reject H₀ when p < 0.05" is the same statement as "the
// observed result lands in the 5% tail". The curve is the standard normal distribution of the test
// statistic if H₀ is true; the red region is the 5% rejection tail (z > 1.645 one-sided). Slide the
// observed z: the blue area beyond it is the p-value. Buttons set z so that p equals each option's
// value (0.06, 0.04, 0.03, 0.01). A two-sided toggle splits the 5% into two 2.5% tails and doubles
// p: the calculation of p changes, the comparison with 0.05 doesn't.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider,
  Toggle, tick,
} from './kit'

const phi = (x: number) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI)

// Standard normal upper tail (Abramowitz & Stegun 7.1.26 erf; error below 2e-7).
function upperTail(z: number): number {
  const x = Math.abs(z) / Math.SQRT2
  const t = 1 / (1 + 0.3275911 * x)
  const erf = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)
  return 1 - 0.5 * (1 + (z >= 0 ? erf : -erf))
}

/** z > 0 with Pr(Z > z) = tail, by bisection. */
function zForTail(tail: number): number {
  let lo = 0
  let hi = 6
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    if (upperTail(mid) > tail) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

const OPTIONS: [string, number][] = [['B', 0.06], ['A', 0.04], ['C', 0.03], ['E', 0.01]]

export default function RejectionTail() {
  const [z, setZ] = useState(1.3)
  const [twoSided, setTwoSided] = useState(false)
  const p = twoSided ? 2 * upperTail(z) : upperTail(z)
  const crit = twoSided ? zForTail(0.025) : zForTail(0.05)
  const reject = p < 0.05

  const twoSidedNote = twoSided && (
    <>
      {' '}In a two-sided test the 5% is split into two 2.5% tails and <M>p</M> counts both sides. That changes how{' '}
      <M>p</M> is <em>calculated</em>; the rule &ldquo;reject when <M>{'p<0.05'}</M>&rdquo; is the same.
    </>
  )

  const notice = reject ? (
    <Notice tone="good">
      The observed value is inside the red 5% rejection region, so the blue area beyond it, the <M>p</M>-value, is{' '}
      <b>less than 0.05</b>. A result this extreme would happen less than 5% of the time if <M>{'H_0'}</M> were true, so
      reject <M>{'H_0'}</M>. Smaller <M>p</M> means stronger evidence against <M>{'H_0'}</M>.
      {twoSidedNote}
    </Notice>
  ) : (
    <Notice>
      The observed value is outside the red 5% rejection region, so the blue area beyond it, the <M>p</M>-value, is{' '}
      <b>more than 0.05</b>. A result like this isn&apos;t unusual if <M>{'H_0'}</M> is true, so don&apos;t reject{' '}
      <M>{'H_0'}</M>. Drag right: the blue area shrinks as the evidence gets stronger. Where does it drop below 0.05?
      {twoSidedNote}
    </Notice>
  )

  return (
    <div>
      <Plane
        x={[-3.5, 3.5]}
        y={[0, 0.45]}
        xStep={1}
        yStep={0.1}
        height={260}
        xLabel="z"
        yLabel=""
        xLabels={v => (Math.abs(v) > 3.5 ? '' : tick(v))}
        yLabels={false}
      >
        <Region top={phi} bottom={() => 0} from={crit} to={3.5} color={C.bad} opacity={0.18} />
        {twoSided && <Region top={phi} bottom={() => 0} from={-3.5} to={-crit} color={C.bad} opacity={0.18} />}
        <Region top={phi} bottom={() => 0} from={z} to={3.5} color={C.f} opacity={0.5} />
        {twoSided && <Region top={phi} bottom={() => 0} from={-3.5} to={-z} color={C.f} opacity={0.5} />}
        <Plot.OfX y={phi} domain={[-3.5, 3.5]} color={C.ink} weight={2.5} />
        {/* The rejection region, as a thick red bar along the axis so it shows through the blue. */}
        <Line.Segment point1={[crit, 0]} point2={[3.5, 0]} color={C.bad} weight={6} />
        {twoSided && <Line.Segment point1={[-3.5, 0]} point2={[-crit, 0]} color={C.bad} weight={6} />}
        <Line.Segment point1={[crit, 0]} point2={[crit, 0.34]} color={C.bad} style="dashed" weight={2} />
        <Label at={[crit, 0.34]} attach="n" color={C.bad}>{twoSided ? '2.5% each side' : 'extreme 5%'}</Label>
        {twoSided && <Line.Segment point1={[-crit, 0]} point2={[-crit, 0.34]} color={C.bad} style="dashed" weight={2} />}
        <Line.Segment point1={[z, 0]} point2={[z, phi(z)]} color={C.f} weight={2.5} />
        <Point x={z} y={0} color={C.f} />
        <Label at={[z, phi(z)]} attach={z < crit || z > 2.5 ? 'nw' : 'ne'} color={C.f}>observed</Label>
      </Plane>
      <Controls>
        <Slider label={'z_{\\text{obs}}'} value={z} onChange={setZ} min={0} max={3.2} step={0.01} />
        <Buttons>
          {OPTIONS.map(([letter, value]) => (
            <ActionButton
              key={letter}
              label={`p = ${value} (${letter})`}
              onClick={() => setZ(zForTail(twoSided ? value / 2 : value))}
            />
          ))}
        </Buttons>
        <Buttons>
          <Toggle label="Two-sided test instead" checked={twoSided} onChange={setTwoSided} />
        </Buttons>
        <Readouts>
          <Readout
            color={C.f}
            tex={`p=${twoSided ? '2\\Pr(Z>' : '\\Pr(Z>'}${z.toFixed(2)})=${p.toFixed(3)}`}
          />
          <Readout color={C.bad} tex={`\\text{critical } z=${twoSided ? '\\pm' : ''}${crit.toFixed(3)}`} />
          <Readout
            color={reject ? C.good : C.guide}
            tex={reject ? 'p<0.05 \\implies \\text{reject } H_0' : 'p>0.05 \\implies \\text{do not reject } H_0'}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
