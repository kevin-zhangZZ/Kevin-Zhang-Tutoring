// 2020 Methods Exam 2 MCQ 3 — every antiderivative of f′(x) = 2/√(2x − 3) is the same curve
// y = 2√(2x − 3) slid up or down by c, and the condition f(6) = 4 picks out exactly one. The c
// slider moves the curve through the faint family; the orange tangent at x = 6 keeps its gradient
// f′(6) = 2/3 whatever c is (sliding never changes steepness), so only the point can fix c. The
// default c = 0 is option A (the + c left off: it passes through (6, 6)); c = −2 is option C. A
// toggle overlays options B, E and D, √(2x − 3) − 2, √(2x − 3) and √(2x − 3) + 2: flatter everywhere
// (gradient 1/3 at x = 6, half of f′(6)) and none through (6, 4) (they give 1, 3 and 5).

import { Fragment, useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const F = (x: number) => 2 * Math.sqrt(2 * x - 3)
const G = (x: number) => Math.sqrt(2 * x - 3)
const X0 = 1.5 // 2x − 3 = 0: where every curve starts
const X1 = 10
const FAMILY = [-4, -3, -2, -1, 0, 1, 2, 3]
const OPTIONS: [string, number][] = [
  ['B', -2],
  ['E', 0],
  ['D', 2],
]
const SLOPE = 2 / 3 // f′(6) = 2/√9
const TAN = 1.5 // half-length of the tangent segment, in x

const d = (v: number) => {
  const r = Math.round(v * 100) / 100
  return (Object.is(r, -0) ? 0 : r).toString().replace('-', '−')
}
const t = (v: number) => d(v).replace('−', '-')

export default function Family() {
  const [c, setC] = useState(0)
  const [showOpts, setShowOpts] = useState(false)
  const f = (x: number) => F(x) + c
  const at6 = 6 + c
  const hit = Math.abs(c + 2) < 1e-9
  const cTex = Math.abs(c) < 1e-9 ? '' : c < 0 ? ` - ${t(-c)}` : ` + ${t(c)}`

  let notice
  if (showOpts) {
    notice = (
      <Notice tone="warn">
        The dashed red curves are options B, E and D: <M>{'\\sqrt{2x-3}'}</M> with <M>-2</M>, <M>0</M> and <M>+2</M> added. They
        are flatter than the blue family everywhere, because <M>{'\\tfrac{d}{dx}\\sqrt{2x-3} = \\tfrac{1}{\\sqrt{2x-3}}'}</M>,
        half of <M>f&apos;(x)</M>: at <M>x = 6</M> their gradient is <M>{'\\tfrac13'}</M>, not <M>{'\\tfrac23'}</M>. They have
        lost the factor of 2, so none of them is an antiderivative of <M>f&apos;</M>, and none passes through <M>(6, 4)</M>{' '}
        anyway (they give <M>f(6) = 1</M>, <M>3</M> and <M>5</M>).
      </Notice>
    )
  } else if (hit) {
    notice = (
      <Notice tone="good">
        <b>Through the point.</b> Every curve in the family has gradient <M>f&apos;(x)</M> at every <M>x</M>, because sliding a
        curve up or down doesn&apos;t change how steep it is. That is why the derivative alone can&apos;t decide <M>c</M>. The
        condition <M>f(6) = 4</M> picks out exactly one curve: <M>6 + c = 4</M>, so <M>c = -2</M>. Option C.
      </Notice>
    )
  } else if (Math.abs(c) < 1e-9) {
    notice = (
      <Notice tone="warn">
        <M>c = 0</M> is option A, the antiderivative with the <M>+\,c</M> left off. It has the right gradient everywhere, but at{' '}
        <M>x = 6</M> it is at height 6, not 4: it misses the point <M>(6, 4)</M>. Slide <M>c</M> until the curve passes through it.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At <M>x = 6</M> this curve is at <M>{`6 + c = ${t(at6)}`}</M>, {at6 > 4 ? 'above' : 'below'} the point{' '}
        <M>(6, 4)</M>. Watch the orange tangent as you slide: its gradient stays <M>{'\\tfrac23'}</M>, so every one of these
        curves has the right derivative. Only the point can choose between them.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, X1]} y={[-4, 10]} xStep={1} yStep={2} height={320}>
        {FAMILY.filter(k => k !== c).map(k => (
          <Plot.OfX key={k} y={x => F(x) + k} domain={[X0, X1]} color={C.guide} weight={1} opacity={0.45} />
        ))}
        {showOpts &&
          OPTIONS.map(([letter, k]) => (
            <Fragment key={letter}>
              <Plot.OfX y={x => G(x) + k} domain={[X0, X1]} color={C.bad} weight={2} style="dashed" />
              <Point x={6} y={3 + k} color={C.bad} />
              <Label at={[X1, G(X1) + k]} color={C.bad} attach="e" size={12}>{letter}</Label>
            </Fragment>
          ))}
        <Plot.OfX y={f} domain={[X0, X1]} color={C.f} weight={3} />
        {!hit && <Line.Segment point1={[6, 4]} point2={[6, at6]} color={C.bad} style="dashed" weight={1.5} />}
        <Line.Segment point1={[6 - TAN, at6 - SLOPE * TAN]} point2={[6 + TAN, at6 + SLOPE * TAN]} color={C.g} weight={2.5} />
        <Point x={6} y={at6} color={hit ? C.good : C.f} />
        <Point x={6} y={4} color={hit ? C.good : C.ink} />
        {!showOpts && <Label at={[6, 4]} color={hit ? C.good : C.ink} attach="se" size={12}>(6, 4)</Label>}
      </Plane>
      <Controls>
        <Slider label="c" value={c} onChange={setC} min={-4} max={3} step={0.25} format={d} />
        <Buttons>
          <Toggle label="Compare options B, D and E" checked={showOpts} onChange={setShowOpts} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`f(x) = 2\\sqrt{2x-3}${cTex}`} />
          <Readout color={hit ? C.good : C.f} tex={`f(6) = 6 + c = ${t(at6)}`} />
          <Readout color={C.g} tex="\text{gradient at } x = 6\text{: } \tfrac23" />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
