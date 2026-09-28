// 2018 Methods Exam 1 Q2 — antidifferentiating f′(x) = ½ − 1/(2x−2) gives a whole family of
// curves y = x/2 − ½log_e(2x−2) + c: every member has exactly the slope f′ asks for (drag the
// tangent point and compare the two slope readouts), and c only slides the curve up or down.
// Only one member passes through (2, 0), and there the tangent is flat because f′(2) = 0.
// A toggle shows the report's common error (log_e(2x−2) with no ½): c can still be chosen to hit
// (2, 0), but the curve's slope never matches f′, so no constant can rescue it.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider,
  Toggle, clamp,
} from './kit'

const fp = (x: number) => 0.5 - 1 / (2 * x - 2) // the given f′
const F = (x: number) => x / 2 - 0.5 * Math.log(2 * x - 2) // correct antiderivative, c = 0
const Fw = (x: number) => x / 2 - Math.log(2 * x - 2) // the ½ dropped
const FwSlope = (x: number) => 0.5 - 1 / (x - 1)
const C_RIGHT = 0.5 * Math.LN2 - 1 // ≈ −0.653
const C_WRONG = Math.LN2 - 1 // ≈ −0.307
const FAMILY = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5]
const X_MAX = 6.5
const Y: [number, number] = [-2, 3]
const HALF = 0.8 // half-width of the tangent segments, in x

export default function AntiderivativeFamily() {
  const [c, setC] = useState(0)
  const [a, setA] = useState(3)
  const [wrong, setWrong] = useState(false)

  const base = wrong ? Fw : F
  const G = (x: number) => base(x) + c
  const target = wrong ? C_WRONG : C_RIGHT
  const hits = Math.abs(c - target) < 1e-9
  const need = fp(a) // slope the question demands
  const have = wrong ? FwSlope(a) : fp(a) // slope the drawn curve actually has
  const ya = G(a)
  const y2 = G(2)
  const curveColor = wrong ? C.bad : C.f
  const labelX = 5.6
  const labelY = clamp(G(labelX), Y[0] + 0.3, Y[1] - 0.4)

  const setCSnapped = (v: number) => setC(Math.abs(v - target) < 0.02 ? target : v)

  let notice
  if (!wrong && !hits) {
    notice = (
      <Notice>
        Every value of <M>c</M> gives a curve with <b>exactly the slope <M>f'(x)</M> asks for</b>: drag the violet point
        along the curve and the two slope readouts always agree. Changing <M>c</M> only slides the curve up or down (the
        grey curves are other members of the family), so <M>f'</M> alone can&apos;t tell you which one is <M>f</M>. Slide{' '}
        <M>c</M> until the curve passes through the green point <M>(2,\,0)</M>.
      </Notice>
    )
  } else if (!wrong) {
    notice = (
      <Notice tone="good">
        <M>{'c = \\tfrac12\\log_e(2) - 1 \\approx -0.653'}</M> puts the curve through <M>(2,\,0)</M>: that is{' '}
        <M>f</M>. Drag the violet point to <M>x = 2</M>: the tangent is flat, because{' '}
        <M>{"f'(2) = \\tfrac12 - \\tfrac12 = 0"}</M>. So <M>(2,\,0)</M> is the minimum and the graph just touches the
        x-axis there. Now turn on &ldquo;Drop the ½&rdquo; to see the report&apos;s common error.
      </Notice>
    )
  } else if (!hits) {
    notice = (
      <Notice tone="warn">
        This red curve is <M>{'\\tfrac{x}{2} - \\log_e(2x-2) + c'}</M>, with the ½ missing. Drag the violet point: its
        tangent never lines up with the green dashed slope that <M>f'</M> demands (at <M>x = 3</M> the curve is flat but{' '}
        <M>{"f'(3) = \\tfrac14"}</M>). Sliding <M>c</M> can&apos;t fix that, because <M>c</M> only moves the curve up and
        down. Press &ldquo;Use f(2) = 0&rdquo; and see what happens.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        It passes through <M>(2,\,0)</M> with <M>{'c = \\log_e(2) - 1'}</M>, which is why this error feels right: the
        constant step still &ldquo;works&rdquo;. But drag to <M>x = 2</M>: the curve is still heading down with slope{' '}
        <M>{'-\\tfrac12'}</M>, while <M>{"f'(2) = 0"}</M>. Differentiating <M>{'\\log_e(2x-2)'}</M> gives{' '}
        <M>{'\\tfrac{2}{2x-2}'}</M>, twice the term you started with; the ½ out the front cancels that 2.
      </Notice>
    )
  }

  const seg = (m: number): [[number, number], [number, number]] => [
    [a - HALF, ya - HALF * m],
    [a + HALF, ya + HALF * m],
  ]
  const [n1, n2] = seg(need)
  const [h1, h2] = seg(have)

  return (
    <div>
      <Plane x={[0, X_MAX]} y={Y} xStep={1} yStep={1} height={320}>
        {FAMILY.map(k => (
          <Plot.OfX key={k} y={x => F(x) + k} domain={[1.0005, X_MAX]} color={C.guide} weight={1.5} opacity={0.5} />
        ))}
        <Line.Segment point1={[1, Y[0]]} point2={[1, Y[1]]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[1, Y[1] - 0.25]} color={C.guide} attach="e" size={12}>x = 1</Label>
        <Plot.OfX y={G} domain={[1.0005, X_MAX]} color={curveColor} weight={3} />
        <Label at={[labelX, labelY]} color={curveColor} attach="n">{wrong ? 'no ½' : hits ? 'y = f(x)' : 'f(x) + c'}</Label>
        <Line.Segment point1={h1} point2={h2} color={C.violet} weight={3} />
        <Line.Segment point1={n1} point2={n2} color={C.good} style="dashed" weight={2.5} />
        <Point x={2} y={0} color={C.good} />
        <Label at={[2, 0]} color={C.good} attach="s" gap={24}>(2, 0)</Label>
        <MovablePoint
          point={[a, ya]}
          color={C.violet}
          onMove={([x]) => setA(clamp(x, 1.2, 6.2))}
          constrain={([x]) => {
            const xx = clamp(x, 1.2, 6.2)
            return [xx, G(xx)]
          }}
        />
      </Plane>
      <Controls>
        <Slider label="c" value={c} onChange={setCSnapped} min={-2} max={1.5} step={0.01} />
        <Buttons>
          <ActionButton label="Use f(2) = 0" onClick={() => setC(target)} />
          <Toggle label="Drop the ½ (common error)" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.good} tex={`f'(${a.toFixed(2)}) = ${need.toFixed(3)}`} />
          <Readout color={C.violet} tex={`\\text{curve's slope} = ${have.toFixed(3)}`} />
          <Readout
            color={hits ? C.good : curveColor}
            tex={`\\text{at } x=2{:}\\ y = ${Math.abs(y2) < 5e-4 ? '0' : y2.toFixed(3)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
