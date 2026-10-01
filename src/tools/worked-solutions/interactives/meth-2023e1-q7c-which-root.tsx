// 2023 Methods Exam 1 Q7c — solving x = (y − 1)² − 1 for y gives two roots, 1 ± √(x + 1), because
// that equation is the WHOLE parabola reflected. Drag a point P along f (domain (−∞, 1]): its
// mirror image P′ in y = x always lands on y = 1 − √(x + 1), with y-coordinate P's x-coordinate
// (≤ 1). A toggle shows the report's most common error, 1 + √(x + 1): it is the mirror image of
// the half of the parabola (x ≥ 1) that f's domain removed, and it sits at height 2 − a, not a.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const f = (x: number) => x * x - 2 * x
const minus = (x: number) => 1 - Math.sqrt(x + 1)
const plus = (x: number) => 1 + Math.sqrt(x + 1)

export default function WhichRoot() {
  const [a, setA] = useState(-0.5)
  const [showPlus, setShowPlus] = useState(false)

  const fa = f(a)
  const P: [number, number] = [a, fa]
  const P2: [number, number] = [fa, a]
  const Q: [number, number] = [2 - a, fa]
  const Q2: [number, number] = [fa, 2 - a]
  const atEnd = a > 0.97

  let notice
  if (atEnd) {
    notice = (
      <Notice tone="good">
        <b>At f&apos;s endpoint <M>(1,-1)</M></b> the mirror image is <M>(-1,1)</M>, where the two roots meet:{' '}
        <M>{'1 \\pm \\sqrt{0} = 1'}</M>. Drag <M>P</M> back to the left: the roots split, and f&apos;s points
        always land on the lower one.
      </Notice>
    )
  } else if (!showPlus) {
    notice = (
      <Notice>
        Drag <M>P</M> along <M>f</M>. Its mirror image <M>P&apos;</M> always lands on the orange curve{' '}
        <M>{'y = 1-\\sqrt{x+1}'}</M>, and the <M>y</M>-coordinate of <M>P&apos;</M> is the <M>x</M>-coordinate of{' '}
        <M>P</M>, which is at most <M>1</M> (f&apos;s domain). So <M>{'f^{-1}'}</M> only takes values{' '}
        <M>{'y \\le 1'}</M>, and <M>{'1+\\sqrt{x+1}'}</M> is never below <M>1</M>. Turn on &ldquo;Show the + root&rdquo;
        to see what that curve is.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        The red curve <M>{'y = 1+\\sqrt{x+1}'}</M> is the mirror image of the <b>dashed half</b> of the parabola,{' '}
        <M>{'x \\ge 1'}</M>, which f&apos;s domain <M>{'(-\\infty, 1]'}</M> removed. At <M>{`x = ${num(fa)}`}</M> it gives{' '}
        <M>{`2 - a = ${num(2 - a)}`}</M> (the point <M>Q&apos;</M>), not <M>{`a = ${num(a)}`}</M>. The equation{' '}
        <M>{'x = (y-1)^2 - 1'}</M> describes the whole sideways parabola, so it has both arms; f&apos;s domain picks
        the lower one.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.5, 3.5]} y={[-1.5, 3.5]} equalScale height={460}>
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={f} domain={[1, 3.5]} color={showPlus ? C.bad : C.guide} style="dashed" weight={2} />
        <Plot.OfX y={f} domain={[-1.5, 1]} color={C.f} weight={3} />
        <Plot.OfX y={minus} domain={[-1, 3.5]} color={C.g} weight={3} />
        {showPlus && <Plot.OfX y={plus} domain={[-1, 3.5]} color={C.bad} weight={3} />}
        <Point x={1} y={-1} color={C.f} />
        <Point x={-1} y={1} color={C.g} />

        {showPlus && !atEnd && (
          <>
            <Line.Segment point1={Q} point2={Q2} color={C.bad} style="dashed" weight={1.5} />
            <Point x={Q[0]} y={Q[1]} color={C.bad} />
            <Point x={Q2[0]} y={Q2[1]} color={C.bad} />
            <Label at={Q} color={C.bad} attach="e">Q</Label>
            <Label at={Q2} color={C.bad} attach="n">Q′</Label>
          </>
        )}
        <Line.Segment point1={P} point2={P2} color={C.guide} style="dashed" weight={1.5} />
        <Point x={P[0]} y={P[1]} color={C.f} />
        <Point x={P2[0]} y={P2[1]} color={C.g} />
        <Label at={P} color={C.f} attach="w">P</Label>
        <Label at={P2} color={C.g} attach="s">P′</Label>

        <Label at={[-0.85, f(-0.85)]} color={C.f} attach="w">f</Label>
        <Label at={[3.2, minus(3.2)]} color={C.g} attach="n">f⁻¹</Label>
        <Label at={[-1.2, -1.2]} color={C.guide} attach="e">y = x</Label>
        <Label at={[2.2, f(2.2)]} color={showPlus ? C.bad : C.guide} attach="e">x ≥ 1</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={-1} max={1} step={0.01} />
        <Toggle label="Show the + root" checked={showPlus} onChange={setShowPlus} />
        <Readouts>
          <Readout color={C.f} tex={`P = (a,\\ f(a)) = (${num(a)},\\ ${num(fa)})`} />
          <Readout color={C.g} tex={`P' = (${num(fa)},\\ ${num(a)})`} />
          <Readout color={C.g} tex={`1-\\sqrt{${num(fa)}+1} = ${num(minus(fa))} = a\\ \\checkmark`} />
          {showPlus && (
            <Readout
              color={C.bad}
              tex={`1+\\sqrt{${num(fa)}+1} = ${num(plus(fa))}${atEnd ? '\\ \\text{(the roots meet)}' : ` \\ne ${num(a)}`}`}
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
