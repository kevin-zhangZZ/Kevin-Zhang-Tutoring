// 2015 Methods Exam 1 Q6b — Pr(X < 2.8 | X > 2.5) for X ~ N(2.5, 0.3²). Three steps: the
// condition X > 2.5 makes the right half (area 0.5) the whole "world"; the strip 2.5 < X < 2.8
// (z from 0 to 1) has area 0.5 − 0.16 = 0.34; the answer is the strip's share of the half,
// 0.34 / 0.5 = 0.68. A toggle shows the common wrong numerator Pr(X < 2.8) = 0.84, a region that
// spills outside the half and gives 0.84 / 0.5 = 1.68 > 1. The plane is drawn in z units with the
// tick numbers relabelled as x = 2.5 + 0.3z, so the 2.5 and 2.8 lines fall on grid lines. Areas
// use the question's two-decimal value Pr(Z < −1) = 0.16.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, StepNav, Toggle, useSteps } from './kit'

const phi = (z: number) => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI)
const zero = () => 0
const xTick = (v: number) => (2.5 + 0.3 * v).toFixed(1)

export default function ShareOfHalf() {
  const steps = useSteps(3)
  const [wrong, setWrong] = useState(false)
  const s = steps.step

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <M>{'\\Pr(X<2.8)'}</M> is everything left of <M>2.8</M> (red), and most of it lies <b>outside</b> the orange
        half we were told we are in. Dividing gives <M>{'\\tfrac{0.84}{0.5}=1.68'}</M>, more than 1, which no probability
        can be. The numerator must be the part of the orange half below <M>2.8</M>: turn the toggle off.
      </Notice>
    )
  } else if (s === 0) {
    notice = (
      <Notice>
        &ldquo;Given <M>{'X>2.5'}</M>&rdquo; means we only look at the orange right half. Its area,{' '}
        <M>{'\\tfrac12'}</M>, is now the whole: it goes on the bottom of the fraction. Press Next.
      </Notice>
    )
  } else if (s === 1) {
    notice = (
      <Notice>
        Inside that half, <M>{'X<2.8'}</M> is the blue strip from the mean to one standard deviation above it. Its area
        is the half less the tail beyond <M>z=1</M>: <M>0.5-0.16=0.34</M>. Press Next.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        The blue strip is about two-thirds of the orange half: <M>{'\\tfrac{0.34}{0.5}=0.68'}</M>. Now turn on the toggle
        to see the numerator many students used instead.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 3]} y={[0, 0.45]} xStep={1} yStep={0.1} xLabels={xTick} yLabels={false} xLabel="x" yLabel="" height={280}>
        <Region top={phi} bottom={zero} from={0} to={3} color={C.g} opacity={0.18} />
        {!wrong && s >= 1 && <Region top={phi} bottom={zero} from={0} to={1} color={C.f} opacity={0.45} />}
        {wrong && <Region top={phi} bottom={zero} from={-3} to={1} color={C.bad} opacity={0.3} />}
        <Plot.OfX y={phi} color={C.violet} weight={2.5} />
        <Line.Segment point1={[0, 0]} point2={[0, phi(0)]} color={C.g} weight={2} />
        <Line.Segment point1={[1, 0]} point2={[1, phi(1)]} color={C.f} style="dashed" weight={2} />
        <Label at={[0.12, 0]} attach="se" bold={false} size={12}>2.5</Label>
        <Label at={[1.25, 0.25]} color={C.g} attach="e">given X &gt; 2.5</Label>
        {!wrong && s >= 1 && <Label at={[0.5, 0.14]} color={C.f} attach="c">0.34</Label>}
        {!wrong && s >= 1 && <Label at={[1.7, 0.06]} color={C.g} attach="n">0.16</Label>}
        {wrong && <Label at={[-1, 0.14]} color={C.bad} attach="c">0.84</Label>}
      </Plane>
      <Controls>
        <Buttons>
          <StepNav step={s} count={3} onBack={steps.back} onNext={steps.next} />
          <Toggle label="Use Pr(X < 2.8) on top" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex="\Pr(X>2.5)=0.5" />
          {wrong ? (
            <>
              <Readout color={C.bad} tex="\Pr(X<2.8)=1-0.16=0.84" />
              <Readout color={C.bad} tex="\tfrac{0.84}{0.5}=1.68>1\ \times" />
            </>
          ) : (
            <>
              {s >= 1 && <Readout color={C.f} tex="\Pr(2.5<X<2.8)=0.5-0.16=0.34" />}
              {s >= 2 && <Readout color={C.good} tex="\tfrac{0.34}{0.5}=0.68\ \checkmark" />}
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
