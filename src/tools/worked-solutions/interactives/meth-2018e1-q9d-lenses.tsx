// 2018 Methods Exam 1 Q9d — the shaded area built up in steps, the way the examiner's report
// describes: the two tangents and the y-axis make a triangle (9π²); the white holes are lenses
// between f and g = −f; f is x sin(x) mirrored, so its humps are part a.'s π, 3π, 5π in reverse;
// each lens is twice a hump (18π in all); shaded = 9π² − 18π. On the last step a toggle shades
// what ∫(l₁ − f) + ∫(g − l₂) over [0, 3π] measures instead — the middle lens counted twice.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, StepNav, Toggle, useSteps,
} from './kit'

const PI = Math.PI
const f = (x: number) => (3 * PI - x) * Math.sin(x)
const g = (x: number) => -f(x)
const l1 = (x: number) => 3 * PI - x
const l2 = (x: number) => x - 3 * PI
const absF = (x: number) => Math.abs(f(x))
const xsinx = (x: number) => x * Math.sin(x)
const piTick = (v: number) => {
  const k = Math.round(v / PI)
  if (Math.abs(v - k * PI) > 1e-6) return ''
  return k === 1 ? 'π' : k === -1 ? '−π' : `${k}π`
}
const SHADED = 9 * PI * PI - 18 * PI
const WRONG = 9 * PI * PI - 6 * PI

export default function Lenses() {
  const { step, next, back } = useSteps(5)
  const [wrong, setWrong] = useState(false)
  const showWrong = wrong && step === 4

  const notices = [
    <Notice key={0}>
      This is the exam&apos;s figure, drawn from the actual rules. The grey sits between each tangent and the curves.
      Integrating tangent minus curve is valid but lengthy, and the report says it was rarely successful. Instead, see
      the grey as <b>a triangle with holes cut out</b> (white in the exam&apos;s figure). Press Next.
    </Notice>,
    <Notice key={1}>
      <M>{'l_1'}</M> is part b.&apos;s tangent <M>y = -x</M> moved <M>{'3\\pi'}</M> right by part c.&apos;s{' '}
      <M>T</M>, so <M>{'l_1: y = 3\\pi - x'}</M>, and <M>{'l_2: y = x - 3\\pi'}</M> is its mirror image in the{' '}
      <M>x</M>-axis. With the <M>y</M>-axis they make a triangle: base <M>{'6\\pi'}</M>, height <M>{'3\\pi'}</M>, area{' '}
      <M>{'9\\pi^2'}</M>.
    </Notice>,
    <Notice key={2}>
      The dashed curve is <M>{'y = x\\sin(x)'}</M>. <M>f</M> is its mirror image, so part a.&apos;s hump areas{' '}
      <M>{'\\pi, 3\\pi, 5\\pi'}</M> appear in reverse: <M>{'5\\pi, 3\\pi, \\pi'}</M>. The middle hump&apos;s integral
      is <M>{'-3\\pi'}</M>, but as an area it counts as <M>{'3\\pi'}</M>. No new integration needed.
    </Notice>,
    <Notice key={3}>
      <M>{'g = -f'}</M>, so each unshaded lens is a hump of <M>f</M> plus its reflection in the <M>x</M>-axis:{' '}
      <b>twice</b> the hump. The six unshaded pieces total <M>{'2(5\\pi + 3\\pi + \\pi) = 18\\pi'}</M>.
    </Notice>,
    showWrong ? (
      <Notice key={4} tone="warn">
        <M>{'\\int_0^{3\\pi}(l_1 - f)\\,dx'}</M> measures from <M>f</M> up to <M>{'l_1'}</M>. On{' '}
        <M>{'[\\pi, 2\\pi]'}</M> <M>f</M> is the <b>lower</b> edge of the middle lens, so that strip swallows the whole
        lens, and <M>{'\\int_0^{3\\pi}(g - l_2)\\,dx'}</M> swallows it again from below. A hole that should count zero
        times counts twice: <M>{'9\\pi^2 - 6\\pi'}</M>, too big by <M>{'12\\pi'}</M>.
      </Notice>
    ) : (
      <Notice key={4} tone="good">
        Triangle minus lenses: <M>{'9\\pi^2 - 18\\pi = 9\\pi(\\pi - 2) \\approx 32.3'}</M>, about a third of the
        triangle. Turn on the toggle to see what integrating <M>{'l_1 - f'}</M> over the whole domain would count
        instead.
      </Notice>
    ),
  ]

  return (
    <div>
      <Plane x={[0, 3 * PI]} y={[-3 * PI, 3 * PI]} xStep={PI} yStep={PI} height={400} xLabels={piTick} yLabels={false}>
        {step === 0 && (
          <>
            <Region top={l1} bottom={absF} from={0} to={3 * PI} color={C.guide} opacity={0.45} />
            <Region top={x => -absF(x)} bottom={l2} from={0} to={3 * PI} color={C.guide} opacity={0.45} />
          </>
        )}
        {step === 1 && (
          <Polygon points={[[0, 3 * PI], [0, -3 * PI], [3 * PI, 0]]} color={C.violet} fillOpacity={0.2} weight={0} />
        )}
        {step === 2 && (
          <>
            <Region top={x => Math.max(f(x), 0)} bottom={x => Math.min(f(x), 0)} from={0} to={3 * PI} color={C.f} opacity={0.3} />
            <Plot.OfX y={xsinx} domain={[0, 3 * PI]} color={C.guide} weight={2} style="dashed" />
          </>
        )}
        {step === 3 && <Region top={absF} bottom={x => -absF(x)} from={0} to={3 * PI} color={C.bad} opacity={0.3} />}
        {step === 4 &&
          (showWrong ? (
            <>
              <Region top={l1} bottom={f} from={0} to={3 * PI} color={C.bad} opacity={0.25} />
              <Region top={g} bottom={l2} from={0} to={3 * PI} color={C.bad} opacity={0.25} />
            </>
          ) : (
            <>
              <Region top={l1} bottom={absF} from={0} to={3 * PI} color={C.good} opacity={0.35} />
              <Region top={x => -absF(x)} bottom={l2} from={0} to={3 * PI} color={C.good} opacity={0.35} />
            </>
          ))}

        <Line.Segment point1={[0, 3 * PI]} point2={[3 * PI, 0]} color={C.ink} weight={2} />
        <Line.Segment point1={[0, -3 * PI]} point2={[3 * PI, 0]} color={C.ink} weight={2} />
        <Plot.OfX y={g} domain={[0, 3 * PI]} color={C.g} weight={2.5} />
        <Plot.OfX y={f} domain={[0, 3 * PI]} color={C.f} weight={3} />

        <Label at={[1.1 * PI, l1(1.1 * PI)]} attach="ne">l₁</Label>
        <Label at={[1.1 * PI, l2(1.1 * PI)]} attach="se">l₂</Label>
        <Label at={[1.5 * PI, f(1.5 * PI)]} color={C.f} attach="s">f</Label>
        <Label at={[1.5 * PI, g(1.5 * PI)]} color={C.g} attach="n">g</Label>

        {step === 1 && (
          <>
            <Label at={[0, 3 * PI]} color={C.violet} attach="e">(0, 3π)</Label>
            <Label at={[0, -3 * PI]} color={C.violet} attach="e">(0, −3π)</Label>
            <Label at={[3 * PI, 0]} color={C.violet} attach="n" gap={10}>(3π, 0)</Label>
          </>
        )}
        {step === 2 && (
          <>
            <Label at={[0.5 * PI, 1.25 * PI]} color={C.f} attach="c">5π</Label>
            <Label at={[1.5 * PI, -0.6 * PI]} color={C.f} attach="c">3π</Label>
            <Label at={[2.5 * PI, 0.25 * PI]} color={C.f} attach="c" size={12}>π</Label>
          </>
        )}
        {step === 3 && (
          <>
            <Label at={[0.5 * PI, 0]} color={C.bad} attach="c">10π</Label>
            <Label at={[1.5 * PI, 0]} color={C.bad} attach="c">6π</Label>
            <Label at={[2.5 * PI, 0]} color={C.bad} attach="c" size={12}>2π</Label>
          </>
        )}
      </Plane>
      <Controls>
        <StepNav step={step} count={5} onBack={back} onNext={next} />
        {step === 4 && (
          <Toggle label="Wrong idea: ∫(l₁ − f) + ∫(g − l₂) over [0, 3π]" checked={wrong} onChange={setWrong} />
        )}
        <Readouts>
          {step >= 1 && <Readout color={C.violet} tex={'\\text{triangle} = \\tfrac12(6\\pi)(3\\pi) = 9\\pi^2'} />}
          {step >= 2 && <Readout color={C.f} tex={'\\text{humps of } f\\text{:}\\ 5\\pi + 3\\pi + \\pi = 9\\pi'} />}
          {step >= 3 && <Readout color={C.bad} tex={'\\text{lenses} = 2 \\times 9\\pi = 18\\pi'} />}
          {step === 4 &&
            (showWrong ? (
              <Readout color={C.bad} tex={`9\\pi^2 - 6\\pi \\approx ${WRONG.toFixed(1)}\\ \\text{(wrong)}`} />
            ) : (
              <Readout color={C.good} tex={`\\text{shaded} = 9\\pi^2 - 18\\pi \\approx ${SHADED.toFixed(1)}`} />
            ))}
        </Readouts>
        {notices[step]}
      </Controls>
    </div>
  )
}
