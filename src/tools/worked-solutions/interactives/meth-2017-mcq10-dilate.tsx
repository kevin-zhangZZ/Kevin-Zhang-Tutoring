// 2017 Methods Exam 2 MCQ 10 — the two dilations x' = 2x and y' = y/3 applied one at a time to
// y = 3sin(2(x + π/4)). The original already has its maximum on the y-axis at (0, 3) (it is
// 3cos(2x)); a dilation from an axis never moves the points on that axis, so the peak stays on the
// y-axis and ends at (0, 1): amplitude 1, period 2π, maximum at x = 0 — that is y = cos(x). A
// draggable point P shows (x, y) → (2x, y) → (2x, y/3). On the last step a toggle overlays option B,
// sin(x − π/2), which is −cos(x): a minimum on the y-axis (and the same graph as option C).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, StepNav, Toggle, Vector,
  clamp, num, useSteps,
} from './kit'

const PI = Math.PI
const orig = (x: number) => 3 * Math.sin(2 * (x + PI / 4))
// Horizontal and vertical scale factors after each step.
const STAGES = [
  { h: 1, v: 1 },
  { h: 2, v: 1 },
  { h: 2, v: 1 / 3 },
]
const stageCurve = (s: number) => (x: number) => STAGES[s].v * orig(x / STAGES[s].h)
const stagePoint = (s: number, x0: number): [number, number] => [STAGES[s].h * x0, STAGES[s].v * orig(x0)]
const optionB = (x: number) => Math.sin(x - PI / 2)

const HEADINGS = [
  'The original graph',
  "x' = 2x: dilation by factor 2 from the y-axis",
  "y' = y/3: dilation by factor 1/3 from the x-axis",
]

const RULES = [
  'y=3\\sin\\left(2\\left(x+\\tfrac{\\pi}{4}\\right)\\right)',
  'y=3\\sin\\left(x+\\tfrac{\\pi}{2}\\right)',
  'y=\\sin\\left(x+\\tfrac{\\pi}{2}\\right)=\\cos(x)',
]

/** Tick numbers at multiples of π only (the grid is every π/2). */
function piTick(v: number): string {
  const n = Math.round(v / PI)
  if (Math.abs(v - n * PI) > 1e-6) return ''
  if (n === 1) return 'π'
  if (n === -1) return '−π'
  return `${n < 0 ? '−' : ''}${Math.abs(n)}π`
}

export default function DilateSteps() {
  const { step, next, back } = useSteps(3)
  const [x0, setX0] = useState(PI / 3)
  const [showB, setShowB] = useState(false)

  const { h } = STAGES[step]
  const P = stagePoint(step, x0)
  const prev = step > 0 ? stagePoint(step - 1, x0) : null
  const peakY = STAGES[step].v * 3
  const toX0 = (px: number) => clamp(px / h, -PI, PI)

  let notice
  if (step === 0) {
    notice = (
      <Notice>
        Put <M>x = 0</M> into the rule: <M>{'3\\sin\\left(\\tfrac{\\pi}{2}\\right) = 3'}</M>. So the original graph already has
        its <b>maximum on the y-axis</b>, at <M>(0, 3)</M> (it is really <M>{'3\\cos(2x)'}</M>). Drag <M>P</M> along the curve,
        then press Next to apply <M>{"x' = 2x"}</M>.
      </Notice>
    )
  } else if (step === 1) {
    notice = (
      <Notice>
        Every point moves to <b>twice its distance from the y-axis</b>: <M>{'(x, y) \\to (2x, y)'}</M>, so the period doubles
        from <M>\pi</M> to <M>{'2\\pi'}</M>. But the peak has <M>x = 0</M>, and <M>{'2 \\times 0 = 0'}</M>: a point on the
        y-axis doesn&apos;t move. That is why the <M>{'\\tfrac{\\pi}{4}'}</M> shift became <M>{'\\tfrac{\\pi}{2}'}</M> — the peak
        stays put while the period doubles. Press Next for <M>{"y' = \\tfrac13 y"}</M>.
      </Notice>
    )
  } else if (!showB) {
    notice = (
      <Notice tone="good">
        Every height is divided by 3: <M>{'(x, y) \\to (x, \\tfrac{y}{3})'}</M>, so the peak goes from <M>(0, 3)</M> to{' '}
        <M>(0, 1)</M>. Amplitude 1, period <M>{'2\\pi'}</M>, <b>maximum on the y-axis</b>: that is exactly{' '}
        <M>{'y = \\cos(x)'}</M>, option D. Turn on option B to compare.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Option B is sine shifted <b>right</b> by <M>{'\\tfrac{\\pi}{2}'}</M>: at <M>x = 0</M> it is{' '}
        <M>{'\\sin\\left(-\\tfrac{\\pi}{2}\\right) = -1'}</M>, a <b>minimum</b> on the y-axis. It is <M>{'-\\cos(x)'}</M>, the
        image upside down. Option C, <M>{'\\cos(x + \\pi)'}</M>, is the same red graph, so neither can be the one answer.
      </Notice>
    )
  }

  return (
    <div>
      <p className="mb-2 text-[13px] font-semibold text-gray-700 dark:text-gray-200">
        Step {step + 1}: {HEADINGS[step]}
      </p>
      <Plane x={[-2 * PI, 2 * PI]} y={[-3.4, 3.4]} xStep={PI / 2} yStep={1} height={300} xLabels={piTick}>
        {step === 1 && <Plot.OfX y={orig} domain={[-2 * PI, 2 * PI]} color={C.guide} weight={2} style="dashed" />}
        {step === 2 && <Plot.OfX y={stageCurve(1)} domain={[-2 * PI, 2 * PI]} color={C.g} weight={2} style="dashed" />}
        {step === 2 && showB && <Plot.OfX y={optionB} domain={[-2 * PI, 2 * PI]} color={C.bad} weight={3} style="dashed" />}
        <Plot.OfX y={stageCurve(step)} domain={[-2 * PI, 2 * PI]} color={C.f} weight={3} />
        {prev && <Point x={prev[0]} y={prev[1]} color={C.guide} />}
        {prev && (Math.abs(prev[0] - P[0]) > 0.05 || Math.abs(prev[1] - P[1]) > 0.05) && (
          <Vector tail={prev} tip={P} color={C.violet} weight={2} />
        )}
        <Point x={0} y={peakY} color={C.good} />
        <Label at={[0, peakY]} attach="nw" color={C.good}>
          {`(0, ${step === 2 ? 1 : 3})`}
        </Label>
        {step === 2 && showB && (
          <>
            <Point x={0} y={-1} color={C.bad} />
            <Label at={[0, -1]} attach="sw" color={C.bad}>
              B: (0, −1)
            </Label>
          </>
        )}
        <MovablePoint
          point={P}
          color={C.violet}
          constrain={p => stagePoint(step, toX0(p[0]))}
          onMove={p => setX0(toX0(p[0]))}
        />
        <Label at={P} attach="e" gap={14} color={C.violet}>
          P
        </Label>
      </Plane>
      <Controls>
        <StepNav step={step} count={3} onBack={back} onNext={next} />
        {step === 2 && (
          <Buttons>
            <Toggle label="Compare option B: sin(x − π/2)" checked={showB} onChange={setShowB} />
          </Buttons>
        )}
        <Readouts>
          <Readout color={C.f} tex={RULES[step]} />
          <Readout color={C.violet} tex={`P = (${num(P[0])},\\ ${num(P[1])})`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
