// 2023 Methods Exam 2 Q5a — after the dilation y = ½f(x), the order of the reflection and the
// translation decides where the catenary lands. Pick a sequence and step through it: reflecting
// then translating 2 right (or translating 2 left then reflecting) lands on g(x) = ½f(2 − x),
// minimum (2, 1); the report's common wrong answer, reflect then translate 2 left, lands at
// (−2, 1). A tracked point A shows the reflection doing something even though f is even.

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, StepNav, Toggle } from './kit'

const half = (u: number) => Math.cosh(u) // ½f(u) = ½(e^u + e^−u)
const target = (x: number) => half(2 - x)

type Seq = {
  label: string
  ok: boolean
  // x ↦ argument of ½f after each stage (stage 0 = start, 1 = after 2nd, 2 = after 3rd)
  arg: [(x: number) => number, (x: number) => number, (x: number) => number]
  // where the tracked point A (starting at x = 1) has moved to after each stage
  ax: [number, number, number]
  rule: [string, string, string]
  min: [number, number, number]
  steps: [string, string]
}

const SEQS: Seq[] = [
  {
    label: 'Reflect, then 2 right',
    ok: true,
    arg: [x => x, x => -x, x => -(x - 2)],
    ax: [1, -1, 1],
    rule: ['y=\\tfrac12f(x)', 'y=\\tfrac12f(-x)', 'y=\\tfrac12f\\bigl(-(x-2)\\bigr)=\\tfrac12f(2-x)'],
    min: [0, 0, 2],
    steps: ['\\text{reflect in the } y\\text{-axis: } x\\to -x', '\\text{translate 2 right: } x\\to x-2'],
  },
  {
    label: 'Reflect, then 2 left',
    ok: false,
    arg: [x => x, x => -x, x => -(x + 2)],
    ax: [1, -1, -3],
    rule: ['y=\\tfrac12f(x)', 'y=\\tfrac12f(-x)', 'y=\\tfrac12f\\bigl(-(x+2)\\bigr)=\\tfrac12f(-2-x)'],
    min: [0, 0, -2],
    steps: ['\\text{reflect in the } y\\text{-axis: } x\\to -x', '\\text{translate 2 left: } x\\to x+2'],
  },
  {
    label: '2 left, then reflect',
    ok: true,
    arg: [x => x, x => x + 2, x => -x + 2],
    ax: [1, -1, 1],
    rule: ['y=\\tfrac12f(x)', 'y=\\tfrac12f(x+2)', 'y=\\tfrac12f(-x+2)=\\tfrac12f(2-x)'],
    min: [0, -2, 2],
    steps: ['\\text{translate 2 left: } x\\to x+2', '\\text{reflect in the } y\\text{-axis: } x\\to -x'],
  },
  {
    label: '2 right, then reflect',
    ok: false,
    arg: [x => x, x => x - 2, x => -x - 2],
    ax: [1, 3, -3],
    rule: ['y=\\tfrac12f(x)', 'y=\\tfrac12f(x-2)', 'y=\\tfrac12f(-x-2)'],
    min: [0, 2, -2],
    steps: ['\\text{translate 2 right: } x\\to x-2', '\\text{reflect in the } y\\text{-axis: } x\\to -x'],
  },
]

const AY = half(1)

export default function Order() {
  const [pick, setPick] = useState(1)
  const [st, setSt] = useState(2)
  const seq = SEQS[pick]
  const fn = (x: number) => half(seq.arg[st](x))
  const prev = st > 0 ? (x: number) => half(seq.arg[st - 1](x)) : null
  const done = st === 2
  const color = !done ? C.f : seq.ok ? C.good : C.bad

  let notice
  if (st === 0) {
    notice = (
      <Notice>
        The dilation has already been done: <M>{'y=\\tfrac12f(x)'}</M> has its minimum at <M>(0,1)</M>. The dashed
        curve is the target <M>g</M>, with minimum <M>(2,1)</M>. Press <b>Next</b> to apply the second
        transformation.
      </Notice>
    )
  } else if (st === 1) {
    notice = (
      <Notice>
        Step 2: <M>{seq.steps[0]}</M>.{' '}
        {pick < 2 ? (
          <>
            Because <M>f</M> is even, the curve looks the same, but the point <M>A</M> has jumped to the other side:
            the reflection did happen.
          </>
        ) : (
          <>The whole curve, and the point <M>A</M>, moved 2 units.</>
        )}{' '}
        Press <b>Next</b>.
      </Notice>
    )
  } else if (seq.ok) {
    notice = (
      <Notice tone="good">
        <b>Lands exactly on <M>g</M>.</b> The rule is <M>{seq.rule[2]}</M>. Writing{' '}
        <M>{'2-x=-(x-2)'}</M> shows both steps: <M>{'x\\to -x'}</M> (reflect), then <M>{'x\\to x-2'}</M>{' '}
        (2 <em>right</em>). Now try &ldquo;Reflect, then 2 left&rdquo;.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>Lands at <M>(-2,1)</M>, not <M>(2,1)</M>.</b> The rule is <M>{seq.rule[2]}</M>, the mirror image of{' '}
        <M>g</M>.{' '}
        {pick === 1 ? (
          <>This is the report&rsquo;s common wrong answer.</>
        ) : (
          <>
            Translating right first puts the minimum at <M>x=2</M>, but the reflection then flips it to <M>x=-2</M>.
          </>
        )}{' '}
        Pick a sequence that ends on the dashed curve.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-5, 5]} y={[0, 5]} xStep={1} yStep={1} height={300}>
        <Plot.OfX y={target} color={C.guide} style="dashed" weight={2} />
        {prev && <Plot.OfX y={prev} color={C.guide} weight={1.5} opacity={0.6} />}
        <Plot.OfX y={fn} color={color} weight={3} />
        <Point x={seq.ax[st]} y={AY} color={C.violet} />
        <Label at={[seq.ax[st], AY]} color={C.violet} attach={seq.ax[st] < 0 ? 'w' : 'e'}>
          A
        </Label>
        <Point x={seq.min[st]} y={1} color={color} />
        <Label at={[2.6, target(2.6)]} color={C.guide} attach="e">
          g
        </Label>
      </Plane>
      <Controls>
        <Buttons>
          {SEQS.map((q, i) => (
            <Toggle
              key={q.label}
              label={q.label}
              checked={pick === i}
              onChange={() => {
                setPick(i)
                setSt(2)
              }}
            />
          ))}
        </Buttons>
        <StepNav step={st} count={3} onBack={() => setSt(Math.max(0, st - 1))} onNext={() => setSt(Math.min(2, st + 1))} />
        <Readouts>
          <Readout color={color} tex={seq.rule[st]} />
          <Readout color={color} tex={`\\text{minimum } (${seq.min[st]},\\ 1)`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
