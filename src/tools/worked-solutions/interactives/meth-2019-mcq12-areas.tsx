// 2019 Methods Exam 2 MCQ 12 — the two given integrals as signed areas, in three steps. (1) From
// 1 to 4 the net signed area is 4. (2) From 2 to 4 it is −2, and the whole is the sum of its
// pieces, so 4 = ∫₁² f + (−2) and ∫₁² f = 6, not 4 + (−2). (3) Adding x lifts the graph by x,
// adding the trapezium under y = x from 1 to 2 (area 3/2): total 15/2. The example f is a cubic
// built to satisfy both given integrals; the "reshape f" slider adds k·sin(2πx), which integrates
// to 0 over [1, 2] and over [2, 4], so every area readout stays the same: f itself is never needed.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, StepNav, integrate, useSteps,
} from './kit'

const base = (x: number) => 100 / 27 + (35 / 3) * x - (79 / 9) * x * x + (38 / 27) * x * x * x
const pos = (fn: (x: number) => number) => (x: number) => Math.max(fn(x), 0)
const neg = (fn: (x: number) => number) => (x: number) => Math.min(fn(x), 0)
const zero = () => 0

export default function Areas() {
  const { step, next, back } = useSteps(3)
  const [k, setK] = useState(0)

  const f = (x: number) => base(x) + k * Math.sin(2 * Math.PI * x)
  const fx = (x: number) => f(x) + x
  const I14 = integrate(f, 1, 4, 400)
  const I24 = integrate(f, 2, 4, 400)
  const I12 = integrate(f, 1, 2, 400)
  const Ix = integrate(x => x, 1, 2)

  const faint = C.guide

  let notice
  if (step === 0) {
    notice = (
      <Notice>
        An integral counts area <b>above</b> the <M>x</M>-axis as positive (blue) and area <b>below</b> as negative
        (red). From <M>x = 1</M> to <M>x = 4</M> the blue outweighs the red by <M>4</M>: that is what{' '}
        <M>{'\\int_1^4 f(x)\\,dx = 4'}</M> says. Click Next for the second fact.
      </Notice>
    )
  } else if (step === 1) {
    notice = (
      <Notice tone="warn">
        The piece from <M>2</M> to <M>4</M> has net area <M>-2</M>: more below than above. The whole is the sum of its
        pieces, <M>{'\\int_1^4 = \\int_1^2 + \\int_2^4'}</M>, so <M>{'4 = \\int_1^2 f(x)\\,dx + (-2)'}</M> and the{' '}
        <M>[1, 2]</M> piece is <M>6</M>. It must be <em>bigger</em> than <M>4</M>, because the negative piece was
        cancelling some of it: <M>4 + (-2) = 2</M> gets this backwards.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Adding <M>x</M> lifts every point of the graph by <M>x</M>, so the area gains the orange band, which has the
        same area as the trapezium under <M>y = x</M> from <M>1</M> to <M>2</M>:{' '}
        <M>{'\\tfrac{1+2}{2}\\times 1 = \\tfrac32'}</M>. Total <M>{'6 + \\tfrac32 = \\tfrac{15}{2}'}</M>. Now drag
        &ldquo;reshape&rdquo;: the curve changes but every area stays the same, so you never needed <M>f</M> itself.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 4.5]} y={[-4, 10]} xStep={1} yStep={2} height={320}>
        {step === 0 && (
          <>
            <Region top={pos(f)} bottom={zero} from={1} to={4} color={C.f} opacity={0.35} />
            <Region top={zero} bottom={neg(f)} from={1} to={4} color={C.bad} opacity={0.35} />
            <Label at={[1.5, 2.5]} color={C.ink} attach="c">positive</Label>
            <Label at={[3.2, -1.1]} color={C.ink} attach="c">negative</Label>
          </>
        )}
        {step === 1 && (
          <>
            <Region top={pos(f)} bottom={zero} from={1} to={2} color={faint} opacity={0.25} />
            <Region top={pos(f)} bottom={zero} from={2} to={4} color={C.f} opacity={0.35} />
            <Region top={zero} bottom={neg(f)} from={2} to={4} color={C.bad} opacity={0.35} />
            <Label at={[1.5, 2.2]} color={C.ink} attach="c">? (unknown)</Label>
            <Label at={[3.2, -1.1]} color={C.bad} attach="c">net −2</Label>
          </>
        )}
        {step === 2 && (
          <>
            <Region top={f} bottom={zero} from={1} to={2} color={C.f} opacity={0.35} />
            <Region top={fx} bottom={f} from={1} to={2} color={C.g} opacity={0.45} />
            <Plot.OfX y={fx} domain={[1, 2]} color={C.g} weight={3} />
            <Label at={[1.5, 2.2]} color={C.ink} attach="c">6</Label>
            <Label at={[2, f(2) + 1]} color={C.g} attach="e" size={14}>← 3/2</Label>
            <Label at={[1.5, fx(1.5)]} color={C.g} attach="ne">y = f(x) + x</Label>
          </>
        )}
        <Line.Segment point1={[1, -4]} point2={[1, 10]} color={C.guide} style="dashed" weight={1.2} />
        <Line.Segment point1={[2, -4]} point2={[2, 10]} color={step === 1 ? C.violet : C.guide} style="dashed" weight={step === 1 ? 2 : 1.2} />
        <Line.Segment point1={[4, -4]} point2={[4, 10]} color={C.guide} style="dashed" weight={1.2} />
        <Plot.OfX y={f} domain={[0.7, 4.3]} color={C.f} weight={3} />
        <Label at={[3.5, f(3.5)]} color={C.f} attach="sw">y = f(x)</Label>
      </Plane>
      <Controls>
        <StepNav step={step} count={3} onBack={back} onNext={next} />
        <Slider label="\text{reshape}" value={k} onChange={setK} min={-1} max={1} step={0.1} format={v => v.toFixed(1)} />
        <Readouts>
          {step === 0 && <Readout color={C.f} tex={`\\int_1^4 f(x)\\,dx = ${I14.toFixed(2)}`} />}
          {step >= 1 && step < 2 && <Readout color={C.bad} tex={`\\int_2^4 f(x)\\,dx = ${I24.toFixed(2)}`} />}
          {step === 1 && <Readout tex={`\\int_1^2 f(x)\\,dx = 4 - (-2) = ${I12.toFixed(2)}`} />}
          {step === 2 && <Readout color={C.f} tex={`\\int_1^2 f(x)\\,dx = ${I12.toFixed(2)}`} />}
          {step === 2 && <Readout color={C.g} tex={`\\int_1^2 x\\,dx = ${Ix.toFixed(2)}`} />}
          {step === 2 && <Readout color={C.good} tex={`\\int_1^2 \\big(f(x)+x\\big)dx = ${(I12 + Ix).toFixed(2)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
