// 2020 Specialist Exam 1 Q7b — the area under f from x = 0 to x = √3, built up in three steps the
// way a teacher would draw it: (1) the rule changes at the join x = 1, so the region splits into
// A₁ under the line y = −2x + 4 and A₂ under the curve y = 4/(1 + x²); (2) A₁ is a trapezium with
// parallel sides f(0) = 4 and f(1) = 2 and width 1, so A₁ = 3 with no integral; (3) A₂ =
// 4[arctan x] from 1 to √3 = π/3 ≈ 1.047, which must lie between the boxes 1 × (√3 − 1) ≈ 0.732
// and 2 × (√3 − 1) ≈ 1.464 because the curve falls from height 2 to height 1 there. A toggle shows
// the formula-sheet misreading the examiner's report names (¼ arctan x): A₂ would be π/48 ≈ 0.065,
// a sliver far below the smaller box.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Region, StepNav, Toggle,
  num, useSteps,
} from './kit'

const R3 = Math.sqrt(3)
const line = (x: number) => -2 * x + 4
const g = (x: number) => 4 / (1 + x * x)
const zero = () => 0
const A2 = Math.PI / 3 // 4(π/3 − π/4)
const WRONG = Math.PI / 48 // ¼(π/3 − π/4)
const W = R3 - 1
const LO = 1 * W // box under the curve: height f(√3) = 1
const HI = 2 * W // box over the curve: height f(1) = 2
const XL = -0.2
const XR = 2.2
const YT = 4.5
const TITLES = ['Split at the join', 'The trapezium', 'The arctan piece']

// Only whole numbers on the x-axis: x = √3 is labelled on its own boundary line.
const xTicks = (v: number) => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : '')
// No "4" on the y-axis: the line crosses the axis right there, at (0, 4).
const yTicks = (v: number) => (Math.abs(v - 4) < 1e-9 ? '' : String(Math.round(v)))

function Box({ h, color }: { h: number; color: string }) {
  return (
    <Polygon
      points={[[1, 0], [R3, 0], [R3, h], [1, h]]}
      color={color}
      fillOpacity={0}
      weight={2}
      strokeStyle="dashed"
    />
  )
}

export default function AreaSteps() {
  const { step, next, back } = useSteps(3)
  const [wrongOn, setWrongOn] = useState(false)
  const wrong = wrongOn && step === 2

  const op1 = step === 2 ? 0.08 : step === 1 ? 0.4 : 0.25
  const op2 = step === 1 ? 0.08 : step === 2 ? 0.35 : 0.25

  let notice
  if (step === 0) {
    notice = (
      <Notice>
        The graph is made of <b>two rules</b>: the line <M>y = -2x + 4</M> up to <M>x = 1</M>, then the curve{' '}
        <M>{'y = \\tfrac{4}{1+x^2}'}</M>. No single antiderivative covers both, so <b>split the region at the join</b>:{' '}
        <M>{'A_1'}</M> under the line from <M>0</M> to <M>1</M>, and <M>{'A_2'}</M> under the curve from <M>1</M> to{' '}
        <M>{'\\sqrt3'}</M>. Both pieces lie above the <M>x</M>-axis, so each area is just an integral. Press Next.
      </Notice>
    )
  } else if (step === 1) {
    notice = (
      <Notice>
        <M>{'A_1'}</M> is a <b>trapezium</b>. Its parallel sides are the heights <M>f(0) = 4</M> and <M>f(1) = 2</M>, and
        its width is <M>1</M>, so <M>{'A_1 = \\tfrac12(4 + 2) \\times 1 = 3'}</M>. That is exactly what{' '}
        <M>{'\\int_0^1(-2x+4)\\,dx = \\left[-x^2+4x\\right]_0^1'}</M> gives: spotting the shape saves an integral.
      </Notice>
    )
  } else if (!wrong) {
    notice = (
      <Notice tone="good">
        <M>{'A_2 = 4\\left[\\arctan(x)\\right]_1^{\\sqrt3} = 4\\left(\\tfrac\\pi3 - \\tfrac\\pi4\\right) = \\tfrac\\pi3 \\approx 1.05'}</M>.
        Check it against the dashed boxes: from <M>x = 1</M> to <M>{'\\sqrt3'}</M> the curve falls from height 2 to
        height 1, so <M>{'A_2'}</M> must be more than the short box (<M>\approx 0.73</M>) and less than the tall one (
        <M>\approx 1.46</M>). It is. Now try &ldquo;What if the 4 became ¼?&rdquo;
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        With <M>{'\\int\\tfrac{4}{1+x^2}\\,dx = \\tfrac14\\arctan(x)'}</M>, the curved piece would be{' '}
        <M>{'\\tfrac14\\left(\\tfrac\\pi3 - \\tfrac\\pi4\\right) = \\tfrac{\\pi}{48} \\approx 0.065'}</M>: the thin red strip.
        But the curve is at least 1 high all the way from <M>x = 1</M> to <M>{'\\sqrt3'}</M>, so the area can&apos;t be less
        than the short box, <M>\approx 0.73</M>. The 4 is a constant multiple: <M>{'\\int\\tfrac{4}{1+x^2}\\,dx = 4\\arctan(x)'}</M>.
        (Differentiate <M>{'\\tfrac14\\arctan(x)'}</M> and you get <M>{'\\tfrac{1}{4(1+x^2)}'}</M>, sixteen times too small.)
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[XL, XR]} y={[0, YT]} xStep={0.5} yStep={1} height={310} xLabels={xTicks} yLabels={yTicks}>
        <Region top={line} bottom={zero} from={0} to={1} color={C.f} opacity={op1} />
        <Region top={g} bottom={zero} from={1} to={R3} color={C.g} opacity={op2} />

        {step === 0 && (
          <>
            <Line.Segment point1={[1, 0]} point2={[1, 4.3]} color={C.guide} style="dashed" weight={1.5} />
            <Label at={[1, 4.1]} color={C.guide} attach="e" size={12}>join x = 1</Label>
            <Label at={[0.5, 1.2]} attach="c" color={C.f}>A₁</Label>
            <Label at={[R3 / 2 + 0.5, 0.6]} attach="c" color={C.g}>A₂</Label>
          </>
        )}

        {step === 1 && (
          <>
            <Line.Segment point1={[0, 0]} point2={[0, 4]} color={C.f} weight={4} />
            <Line.Segment point1={[1, 0]} point2={[1, 2]} color={C.f} weight={4} />
            <Label at={[0, 2]} attach="w" color={C.f}>4</Label>
            <Label at={[1, 1]} attach="e" color={C.f}>2</Label>
            <Label at={[0.5, 0.7]} attach="c" color={C.f}>A₁ = 3</Label>
          </>
        )}

        {step === 2 && (
          <>
            <Box h={2} color={C.guide} />
            <Box h={1} color={C.guide} />
            {wrong && (
              <Polygon
                points={[[1, 0], [R3, 0], [R3, WRONG / W], [1, WRONG / W]]}
                color={C.bad}
                fillOpacity={0.85}
                weight={1}
              />
            )}
            <Label at={[(1 + R3) / 2, wrong ? 0.72 : 0.5]} attach="c" color={C.g}>A₂ ≈ 1.05</Label>
            {wrong && <Label at={[(1 + R3) / 2, WRONG / W]} attach="n" gap={6} color={C.bad} size={12}>π/48</Label>}
          </>
        )}

        <Line.Segment point1={[XL, line(XL)]} point2={[1, 2]} color={C.f} weight={3} />
        <Plot.OfX y={g} domain={[1, XR]} color={C.f} weight={3} />
        <Line.Segment point1={[R3, 0]} point2={[R3, 4.3]} color={C.bad} style="dashed" weight={2} />
        <Label at={[R3, 3.4]} color={C.bad} attach="e" size={12}>x = √3</Label>
        <Point x={1} y={2} color={C.f} />
        {step === 1 && <Point x={0} y={4} color={C.f} />}
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <StepNav step={step} count={3} onBack={back} onNext={next} />
          <span className="text-[12.5px] font-semibold text-gray-600 dark:text-gray-300">{TITLES[step]}</span>
        </div>
        {step === 2 && (
          <Buttons>
            <Toggle label="What if the 4 became ¼?" checked={wrongOn} onChange={setWrongOn} />
          </Buttons>
        )}
        <Readouts>
          {step === 0 && <Readout tex="A = A_1 + A_2" />}
          {step >= 1 && <Readout color={C.f} tex="A_1 = \tfrac12(4+2)\times1 = 3" />}
          {step === 2 && !wrong && <Readout color={C.g} tex={`A_2 = \\tfrac\\pi3 \\approx ${num(A2, 3)}`} />}
          {wrong && <Readout color={C.bad} tex={`\\text{wrong } A_2 = \\tfrac{\\pi}{48} \\approx ${num(WRONG, 3)}`} />}
          {step === 2 && <Readout color={C.guide} tex={`\\text{boxes: } ${num(LO, 3)} < A_2 < ${num(HI, 3)}`} />}
          {step === 2 && !wrong && <Readout color={C.good} tex={`A = 3 + \\tfrac\\pi3 \\approx ${num(3 + A2, 3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
