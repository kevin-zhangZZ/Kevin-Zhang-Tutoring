// 2018 Specialist Exam 1 Q7 — why the question adds exactly ½tan(x). Splitting the fraction
// (1 − tan²x)/(2tan x) gives cot(2x) = ½cot(x) − ½tan(x): cot(2x) sits exactly halfway between
// cot(x) and −tan(x). Three steps: the two curves with a segment joining them at x; the
// segment's midpoint tracing y = cot(2x); then adding ½tan(x), which is the same as lifting the
// bottom end from −tan(x) to 0, so the midpoint becomes ½cot(x) — hence a = ½.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, StepNav, Vector, num, useSteps } from './kit'

const PI = Math.PI
const cot = (x: number) => Math.cos(x) / Math.sin(x)
const negTan = (x: number) => -Math.tan(x)

const piTick = (v: number) => {
  const k = Math.round(v / (PI / 8))
  if (Math.abs(v - (k * PI) / 8) > 1e-6) return ''
  return ['', 'π/8', 'π/4', '3π/8', 'π/2'][k] ?? ''
}

export default function Midpoint() {
  const [x0, setX0] = useState(0.9)
  const { step, next, back } = useSteps(3)

  const top = cot(x0)
  const bot = negTan(x0)
  const mid = (top + bot) / 2 // = cot(2x0)
  const half = top / 2 // = cot(2x0) + ½tan(x0)
  const lifted = step === 2
  const lowEnd = lifted ? 0 : bot

  let notice
  if (step === 0) {
    notice = (
      <Notice>
        Take the formula-sheet result and <b>split</b> the fraction instead of combining it:{' '}
        <M>{'\\cot(2x)=\\frac{1-\\tan^2(x)}{2\\tan(x)}=\\frac{1}{2\\tan(x)}-\\frac{\\tan(x)}{2}'}</M>, which is{' '}
        <M>{'\\tfrac12\\big(\\cot(x)+(-\\tan(x))\\big)'}</M>. So <M>{'\\cot(2x)'}</M> is the <b>average</b> of the blue and
        orange curves. Press Next to see where that average sits.
      </Notice>
    )
  } else if (step === 1) {
    notice = (
      <Notice>
        The midpoint of the dashed segment always lands on the violet curve <M>{'y=\\cot(2x)'}</M>. Drag x to check. At{' '}
        <M>{'x=\\tfrac{\\pi}{4}'}</M> the ends are <M>1</M> and <M>-1</M>, so the midpoint is <M>0</M>, and indeed{' '}
        <M>{'\\cot\\left(\\tfrac{\\pi}{2}\\right)=0'}</M>. Next: add the question&apos;s <M>{'\\tfrac12\\tan(x)'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Adding <M>{'\\tfrac12\\tan(x)'}</M> lifts the midpoint by <M>{'\\tfrac12\\tan(x)'}</M>, exactly as if the bottom end
        moved from <M>{'-\\tan(x)'}</M> up to <M>0</M>. The midpoint of <M>{'\\cot(x)'}</M> and <M>0</M> is{' '}
        <M>{'\\tfrac12\\cot(x)'}</M>, at every x. So <M>{'\\cot(2x)+\\tfrac12\\tan(x)=\\tfrac12\\cot(x)'}</M> and{' '}
        <M>{'a=\\tfrac12'}</M>: the question adds exactly the <M>{'\\tfrac12\\tan(x)'}</M> needed to cancel the{' '}
        <M>{'-\\tfrac12\\tan(x)'}</M> hidden inside <M>{'\\cot(2x)'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, PI / 2]} y={[-3, 3]} xStep={PI / 8} yStep={1} height={320} xLabels={piTick}>
        <Plot.OfX y={cot} domain={[0.12, PI / 2]} color={C.f} weight={3} />
        <Plot.OfX y={negTan} domain={[0, 1.45]} color={C.g} weight={3} />
        {step >= 1 && (
          <Plot.OfX
            y={x => cot(2 * x)}
            domain={[0.12, PI / 2 - 0.03]}
            color={C.violet}
            weight={lifted ? 1.5 : 3}
            style={lifted ? 'dashed' : 'solid'}
          />
        )}
        {lifted && <Plot.OfX y={x => cot(x) / 2} domain={[0.06, PI / 2]} color={C.good} weight={3} />}

        <Line.Segment point1={[x0, top]} point2={[x0, lowEnd]} color={C.guide} style="dashed" weight={2} />
        <Point x={x0} y={top} color={C.f} />
        <Label at={[x0, top]} attach="e" color={C.f}>cot x</Label>
        {lifted ? (
          <>
            <Point x={x0} y={bot} color={C.guide} />
            <Point x={x0} y={0} color={C.g} />
            {/* The lift of ½tan(x), drawn just right of the segment so it doesn't hide the points. */}
            <Vector tail={[x0 + 0.045, mid]} tip={[x0 + 0.045, half]} color={C.good} />
            <Point x={x0} y={mid} color={C.violet} />
            <Point x={x0} y={half} color={C.good} />
            {/* Left of the segment: the lift arrow and the cot x label are on the right. */}
            <Label at={[x0, half]} attach="w" color={C.good}>½cot x</Label>
          </>
        ) : (
          <>
            <Point x={x0} y={bot} color={C.g} />
            <Label at={[x0, bot]} attach="e" color={C.g}>−tan x</Label>
          </>
        )}
        {step === 1 && (
          <>
            <Point x={x0} y={mid} color={C.violet} />
            {/* Near the x-axis, sit the label off the axis so it clears the π/8 … tick numbers. */}
            <Label
              at={[x0, mid]}
              attach={Math.abs(mid) < 0.6 ? (mid >= 0 ? 'nw' : 'sw') : 'w'}
              gap={Math.abs(mid) < 0.6 ? 12 : 7}
              color={C.violet}
            >
              cot 2x
            </Label>
          </>
        )}
      </Plane>
      <Controls>
        <StepNav step={step} count={3} onBack={back} onNext={next} />
        <Slider label="x" value={x0} onChange={setX0} min={0.33} max={1.24} step={0.01} />
        <Readouts>
          <Readout color={C.f} tex={`\\cot(x) = ${num(top, 3)}`} />
          {step < 2 && <Readout color={C.g} tex={`-\\tan(x) = ${num(bot, 3)}`} />}
          {step === 1 && <Readout color={C.violet} tex={`\\text{midpoint} = ${num(mid, 3)} = \\cot(2x)`} />}
          {lifted && <Readout color={C.good} tex={`\\cot(2x)+\\tfrac12\\tan(x) = ${num(half, 3)} = \\tfrac12\\cot(x)`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
