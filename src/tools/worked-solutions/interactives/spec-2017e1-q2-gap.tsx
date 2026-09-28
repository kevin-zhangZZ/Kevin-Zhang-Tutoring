// 2017 Specialist Exam 1 Q2 — after partial fractions, ∫₁^√3 1/(x(1+x²)) dx is the area of the GAP
// between y = 1/x and y = x/(1+x²), because at every x the gap's height 1/x − x/(1+x²) is exactly the
// integrand. Three steps build it up: area under 1/x (log_e √3 ≈ 0.549), area under x/(1+x²)
// (½log_e 4 − ½log_e 2 ≈ 0.347), then the difference log_e √(3/2) ≈ 0.203. The toggle shows the slip
// behind the report's common wrong answer log_e √(3/4): treating ½log_e(1+x²) as 0 at x = 1 is the
// same as starting the second area at x = 0, which subtracts the extra red area and gives a
// negative answer for a positive integrand.

import { C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, StepNav, Toggle, useSteps } from './kit'
import { useState } from 'react'

const R3 = Math.sqrt(3)
const f1 = (x: number) => 1 / x
const f2 = (x: number) => x / (1 + x * x)
const zero = () => 0
const P1 = Math.log(3) / 2 // ∫₁^√3 1/x dx = log_e √3
const P2 = Math.log(2) / 2 // ∫₁^√3 x/(1+x²) dx = ½log_e 4 − ½log_e 2
const P2_SLIP = Math.log(4) / 2 // ½log_e 4 − 0: the same as integrating from x = 0

export default function Gap() {
  const steps = useSteps(3)
  const [slip, setSlip] = useState(false)
  const s = steps.step
  const second = slip ? P2_SLIP : P2
  const result = P1 - second

  let notice
  if (s === 0) {
    notice = (
      <Notice>
        <b>Step 1.</b> Partial fractions turned the integrand into <M>{'\\frac1x - \\frac{x}{1+x^2}'}</M>, a
        difference of two curves. The area under <M>{'y = \\frac1x'}</M> from 1 to <M>{'\\sqrt3'}</M> is{' '}
        <M>{'\\log_e\\sqrt3 - \\log_e 1'}</M>, and here the lower end really is 0 because <M>{'\\log_e 1 = 0'}</M>.
        Press Next for the second curve.
      </Notice>
    )
  } else if (s === 1 && !slip) {
    notice = (
      <Notice>
        <b>Step 2.</b> The area under <M>{'y = \\frac{x}{1+x^2}'}</M> is{' '}
        <M>{'\\left[\\tfrac12\\log_e(1+x^2)\\right]_1^{\\sqrt3}'}</M>. At the lower end <M>{'1 + x^2 = 2'}</M>, not 1,
        so that end is <M>{'\\tfrac12\\log_e 2'}</M>, not 0. Tick the slip below to see what dropping it does.
      </Notice>
    )
  } else if (s === 1) {
    notice = (
      <Notice tone="warn">
        Dropping the lower value is the same as starting at <M>x = 0</M>, since{' '}
        <M>{'\\tfrac12\\log_e(1+0^2) = 0'}</M>. The red area from 0 to 1 sneaks in, and the second piece becomes{' '}
        <M>{'\\tfrac12\\log_e 4 \\approx 0.693'}</M> instead of <M>{'0.347'}</M>. Press Next to see the damage.
      </Notice>
    )
  } else if (!slip) {
    notice = (
      <Notice tone="good">
        <b>Step 3.</b> At every <M>x</M> the gap between the curves has height{' '}
        <M>{'\\frac1x - \\frac{x}{1+x^2} = \\frac{1}{x(1+x^2)}'}</M>, the integrand itself. So the green area is
        the answer: <M>{'\\log_e\\sqrt3 - \\tfrac12\\log_e 2 = \\log_e\\sqrt{\\tfrac32} \\approx 0.203'}</M>. Now
        tick the slip.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        With the slip, <M>{'0.549 - 0.693 = -0.144'}</M>, which is <M>{'\\log_e\\sqrt{\\tfrac34}'}</M>, the wrong
        answer the report says was frequent. It is <b>negative</b>, yet <M>{'\\frac{1}{x(1+x^2)} > 0'}</M> on{' '}
        <M>{'[1, \\sqrt3]'}</M>, so the integral must be positive. A sign check catches it in seconds.
      </Notice>
    )
  }

  const bad = slip && s >= 1
  return (
    <div>
      <Plane x={[0, 2.6]} y={[0, 2.1]} xStep={0.5} yStep={0.5} height={300}>
        {s === 0 && <Region top={f1} bottom={zero} from={1} to={R3} color={C.f} opacity={0.3} />}
        {s === 1 && <Region top={f2} bottom={zero} from={1} to={R3} color={C.g} opacity={0.35} />}
        {s === 2 && <Region top={f1} bottom={f2} from={1} to={R3} color={C.good} opacity={0.35} />}
        {bad && <Region top={f2} bottom={zero} from={0} to={1} color={C.bad} opacity={0.35} />}
        <Line.Segment point1={[1, 0]} point2={[1, 2.1]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[R3, 0]} point2={[R3, 2.1]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[R3, 1.5]} attach="e" color={C.guide}>x = √3</Label>
        <Plot.OfX y={f1} domain={[1 / 2.1, 2.6]} color={C.f} weight={3} />
        <Plot.OfX y={f2} domain={[0, 2.6]} color={C.g} weight={3} />
        <Label at={[0.62, f1(0.62)]} attach="ne" color={C.f}>y = 1/x</Label>
        <Label at={[2.55, f2(2.55)]} attach="sw" color={C.g}>y = x/(1+x²)</Label>
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <StepNav step={s} count={3} onBack={steps.back} onNext={steps.next} />
          <Toggle label={<>Slip: take <M>{'\\tfrac12\\log_e(1+x^2)'}</M> as 0 at <M>x = 1</M></>} checked={slip} onChange={setSlip} />
        </div>
        <Readouts>
          <Readout color={C.f} tex={`\\int_1^{\\sqrt3}\\tfrac1x\\,dx \\approx ${P1.toFixed(3)}`} />
          {s >= 1 && (
            <Readout
              color={bad ? C.bad : C.g}
              tex={`\\int_{${slip ? 0 : 1}}^{\\sqrt3}\\tfrac{x}{1+x^2}\\,dx \\approx ${second.toFixed(3)}`}
            />
          )}
          {s === 2 && (
            <Readout
              color={slip ? C.bad : C.good}
              tex={`\\text{difference} \\approx ${result.toFixed(3)}${slip ? '' : '\\ \\checkmark'}`}
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
