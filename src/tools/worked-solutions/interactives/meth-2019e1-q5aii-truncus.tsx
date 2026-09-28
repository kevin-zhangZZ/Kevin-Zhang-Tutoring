// 2019 Methods Exam 1 Q5a.ii — build y = 2/(x − 1)² + 1 from the basic truncus y = 1/x², one
// transformation per step (dilate by factor 2 from the x-axis, translate 1 right, translate 1 up),
// with the previous step ghosted and the asymptotes moving with the graph. Because the denominator
// is squared, both branches stay on the same side of the horizontal asymptote. A toggle overlays
// the matching rectangular hyperbola (1/x, 2/x, 2/(x − 1), 2/(x − 1) + 1) — the shape the report
// says weaker students drew — which at the last step passes through (−1, 0) and (0, −1),
// contradicting f(−1) = 3/2 from part a.i.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, StepNav, Toggle, useSteps,
} from './kit'

type Stage = { a: number; h: number; k: number; tex: string; hypTex: string }

const STAGES: Stage[] = [
  { a: 1, h: 0, k: 0, tex: 'y = \\dfrac{1}{x^2}', hypTex: 'y = \\dfrac{1}{x}' },
  { a: 2, h: 0, k: 0, tex: 'y = \\dfrac{2}{x^2}', hypTex: 'y = \\dfrac{2}{x}' },
  { a: 2, h: 1, k: 0, tex: 'y = \\dfrac{2}{(x-1)^2}', hypTex: 'y = \\dfrac{2}{x-1}' },
  { a: 2, h: 1, k: 1, tex: 'y = \\dfrac{2}{(x-1)^2}+1', hypTex: 'y = \\dfrac{2}{x-1}+1' },
]

const X0 = -5
const X1 = 5

/** Both branches of y = a/(x − h)² + k, cut where they leave the plane (height k + 8). */
function Truncus({ s, color, dashed }: { s: Stage; color: string; dashed?: boolean }) {
  const y = (x: number) => s.a / (x - s.h) ** 2 + s.k
  const d = Math.sqrt(s.a / 8)
  const style = dashed ? 'dashed' : 'solid'
  const weight = dashed ? 2 : 3
  return (
    <>
      <Plot.OfX y={y} domain={[X0, s.h - d]} color={color} weight={weight} style={style} />
      <Plot.OfX y={y} domain={[s.h + d, X1]} color={color} weight={weight} style={style} />
    </>
  )
}

/** Both branches of the rectangular hyperbola y = a/(x − h) + k, cut at heights k ± 8. */
function Hyperbola({ s }: { s: Stage }) {
  const y = (x: number) => s.a / (x - s.h) + s.k
  const d = s.a / 8
  return (
    <>
      <Plot.OfX y={y} domain={[X0, s.h - d]} color={C.bad} weight={2.5} />
      <Plot.OfX y={y} domain={[s.h + d, X1]} color={C.bad} weight={2.5} />
    </>
  )
}

export default function TruncusBuild() {
  const steps = useSteps(STAGES.length)
  const [hyp, setHyp] = useState(false)
  const s = STAGES[steps.step]
  const prev = steps.step > 0 ? STAGES[steps.step - 1] : null
  const final = steps.last

  let notice
  if (hyp && final) {
    notice = (
      <Notice tone="warn">
        The red <b>rectangular hyperbola</b> <M>{'y = \\frac{2}{x-1}+1'}</M> has the same asymptotes, but its left
        branch drops <b>below</b> <M>y = 1</M> and passes through <M>(-1, 0)</M> and <M>(0, -1)</M>. Part a.i says{' '}
        <M>{'f(-1) = \\tfrac32'}</M>, so this cannot be <M>f</M>. Plotting that one point is enough to catch the
        mistake.
      </Notice>
    )
  } else if (hyp) {
    notice = (
      <Notice tone="warn">
        Red is the hyperbola version, <M>{s.hypTex.replace('\\dfrac', '\\frac')}</M>, with no square. Left of the vertical
        asymptote its denominator is <b>negative</b>, so that branch sits below the horizontal asymptote. The truncus has a
        square, which is never negative, so both of its branches sit above. Step through to see this stays true.
      </Notice>
    )
  } else if (steps.step === 0) {
    notice = (
      <Notice>
        Start from the basic truncus <M>{'y = \\frac{1}{x^2}'}</M>. Since <M>{'x^2 > 0'}</M> on <b>both</b> sides of{' '}
        <M>x = 0</M>, both branches sit above the <M>x</M>-axis, and the graph is symmetric about <M>x = 0</M>. Press{' '}
        <b>Next</b> to apply the first transformation.
      </Notice>
    )
  } else if (steps.step === 1) {
    notice = (
      <Notice>
        Multiplying by <M>2</M> is a <b>dilation by factor 2 from the <M>x</M>-axis</b>: every height doubles (grey dashed is
        the previous step). The asymptotes don&apos;t move, because <M>{'2 \\times 0'}</M> is still <M>0</M>.
      </Notice>
    )
  } else if (steps.step === 2) {
    notice = (
      <Notice>
        Replacing <M>x</M> by <M>x - 1</M> <b>translates 1 unit right</b>. The denominator <M>{'(x-1)^2'}</M> is zero at{' '}
        <M>x = 1</M>, so the vertical asymptote moves to <M>x = 1</M>, and the graph is now symmetric about that line.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Adding <M>1</M> <b>lifts everything 1 unit</b>, so the horizontal asymptote is <M>y = 1</M>. Since{' '}
        <M>{'\\frac{2}{(x-1)^2} > 0'}</M>, the whole graph is above <M>y = 1</M>, hugging it as <M>{'x \\to \\pm\\infty'}</M>.
        Blue dots are <M>{'(-1, \\tfrac32)'}</M> from part a.i and the <M>y</M>-intercept <M>(0, 3)</M>; violet dots are their
        mirror images in <M>x = 1</M>. Turn on the toggle to test the hyperbola.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[-4, 6]} height={330}>
        {/* asymptotes */}
        <Line.Segment point1={[s.h, -4]} point2={[s.h, 6]} color={C.guide} style="dashed" weight={2} />
        {s.k !== 0 && <Line.Segment point1={[X0, s.k]} point2={[X1, s.k]} color={C.guide} style="dashed" weight={2} />}
        {s.h !== 0 && <Label at={[s.h, -3.3]} attach="e" color={C.ink}>{`x = ${s.h}`}</Label>}
        {final && <Label at={[s.h, s.k]} attach="se" color={C.ink}>y = 1</Label>}

        {prev && <Truncus s={prev} color={C.guide} dashed />}
        {hyp && <Hyperbola s={s} />}
        <Truncus s={s} color={C.f} />

        {final && (
          <>
            <Point x={-1} y={1.5} color={C.f} />
            <Point x={0} y={3} color={C.f} />
            <Point x={3} y={1.5} color={C.violet} />
            <Point x={2} y={3} color={C.violet} />
            {hyp && <Point x={-1} y={0} color={C.bad} />}
            {hyp && <Point x={0} y={-1} color={C.bad} />}
          </>
        )}
      </Plane>
      <Controls>
        <Buttons>
          <StepNav step={steps.step} count={STAGES.length} onBack={steps.back} onNext={steps.next} />
          <Toggle label="Compare the hyperbola (no square)" checked={hyp} onChange={setHyp} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={s.tex} />
          <Readout tex={`\\text{asymptotes: } x = ${s.h},\\ y = ${s.k}`} />
          {final && <Readout color={C.f} tex={'f(-1) = \\tfrac32,\\quad f(0) = 3'} />}
          {final && <Readout color={C.violet} tex={'f(3) = \\tfrac32,\\quad f(2) = 3'} />}
          {hyp && final && <Readout color={C.bad} tex={'\\tfrac{2}{-1-1}+1 = 0 \\ne \\tfrac32'} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
