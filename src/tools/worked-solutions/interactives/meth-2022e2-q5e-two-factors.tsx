// 2022 Methods Exam 2 Q5e — g′(x) = 2cos(2x)·f′(sin(2x)) is zero when EITHER factor is zero.
// Factor 1: 2cos(2x) = 0, where the blue curve crosses the axis. Factor 2: f′(sin(2x)) = 0; the
// only zero of f′ the table gives is at √2/2, so we need sin(2x) = √2/2, where the orange curve
// meets the dashed line. Each gives two solutions in [0, π]; the next ones (9π/8, 5π/4) lie past
// x = π, in the shaded region outside the domain. It starts with factor 1 only — the two answers
// the report says some students stopped at.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Toggle } from './kit'

const PI = Math.PI
const R = Math.SQRT2 / 2
const X_MAX = 4.1
const f1 = (x: number) => 2 * Math.cos(2 * x)
const s2 = (x: number) => Math.sin(2 * x)

/** Tick numbers at π/2 and π only: the solutions get their own labels beside their dots, which
 *  sit on the axis where tick numbers would collide with them. */
const piTick = (v: number) => (Math.abs(v - PI / 2) < 1e-6 ? 'π/2' : Math.abs(v - PI) < 1e-6 ? 'π' : '')
/** Skip the "2" on the y-axis, where the blue curve starts. */
const yTick = (v: number) => (Math.abs(v - 2) < 1e-6 ? '' : String(Math.round(v)).replace('-', '−'))
const TOP = 2.75 // past the plane's padding, so the shaded region fills the full height


export default function TwoFactors() {
  const [one, setOne] = useState(true)
  const [two, setTwo] = useState(false)

  const found = (one ? 2 : 0) + (two ? 2 : 0)

  let notice
  if (one && two) {
    notice = (
      <Notice tone="good">
        <b>Four solutions</b>: <M>{'x=\\tfrac\\pi8,\\ \\tfrac\\pi4,\\ \\tfrac{3\\pi}8,\\ \\tfrac{3\\pi}4'}</M>. As{' '}
        <M>x</M> runs from <M>0</M> to <M>\pi</M>, the angle <M>2x</M> makes exactly one full turn, so{' '}
        <M>\cos(2x)=0</M> and <M>{'\\sin(2x)=\\tfrac{\\sqrt2}2'}</M> each have two solutions. The next ones,{' '}
        <M>{'\\tfrac{9\\pi}8'}</M> and <M>{'\\tfrac{5\\pi}4'}</M>, are in the shaded region <M>{'x>\\pi'}</M>, outside the
        domain.
      </Notice>
    )
  } else if (one) {
    notice = (
      <Notice tone="warn">
        The blue curve is the first factor, <M>2\cos(2x)</M>. It crosses the axis at <M>{'x=\\tfrac\\pi4'}</M> and{' '}
        <M>{'\\tfrac{3\\pi}4'}</M>, the two solutions the report says some students found. But <M>g'(x)</M> is a{' '}
        <b>product</b>, so it is also zero wherever the second factor <M>{"f'(\\sin(2x))"}</M> is zero. Turn on factor 2.
      </Notice>
    )
  } else if (two) {
    notice = (
      <Notice tone="warn">
        The table gives <M>{"f'(\\tfrac{\\sqrt2}2)=0"}</M>, so the second factor is zero when{' '}
        <M>{'\\sin(2x)=\\tfrac{\\sqrt2}2'}</M>: where the orange curve meets the dashed line, at{' '}
        <M>{'x=\\tfrac\\pi8'}</M> and <M>{'\\tfrac{3\\pi}8'}</M>. That is still only two solutions. Turn on factor 1 as well.
      </Notice>
    )
  } else {
    notice = <Notice>Turn on a factor to see where it is zero.</Notice>
  }

  return (
    <div>
      <Plane x={[0, X_MAX]} y={[-2.3, 2.3]} xStep={PI / 8} yStep={1} height={300} xLabels={piTick} yLabels={yTick}>
        <Region top={() => TOP} bottom={() => -TOP} from={PI} to={X_MAX} color={C.guide} opacity={0.18} />
        <Line.Segment point1={[PI, -TOP]} point2={[PI, TOP]} color={C.guide} style="dashed" weight={2} />
        <Label at={[(PI + X_MAX) / 2, 2.3]} color={C.guide} attach="s" size={12}>x &gt; π</Label>

        {two && (
          <>
            <Line.Segment point1={[0, R]} point2={[X_MAX, R]} color={C.g} style="dashed" weight={1.5} />
            <Plot.OfX y={s2} domain={[0, X_MAX]} color={C.g} weight={3} />
            {[PI / 8, (3 * PI) / 8].map(x => (
              <g key={x}>
                <Line.Segment point1={[x, 0]} point2={[x, R]} color={C.g} style="dashed" weight={1.5} />
                <Point x={x} y={R} color={C.g} />
                <Point x={x} y={0} color={C.g} />
              </g>
            ))}
            <Point x={(9 * PI) / 8} y={R} color={C.guide} opacity={0.7} />
            {/* labelled at the crossings, not on the axis, where they would crowd π/4 and π/2 */}
            <Label at={[PI / 8, R]} color={C.g} attach="n" size={12}>π/8</Label>
            <Label at={[(3 * PI) / 8, R]} color={C.g} attach="ne" size={12}>3π/8</Label>
            <Label at={[(9 * PI) / 8, R]} color={C.guide} attach="nw" size={12}>9π/8</Label>
            <Label at={[2.45, s2(2.45)]} color={C.g} attach="s">sin(2x)</Label>
            <Label at={[2.35, R]} color={C.g} attach="n" size={12}>√2/2</Label>
          </>
        )}

        {one && (
          <>
            <Plot.OfX y={f1} domain={[0, X_MAX]} color={C.f} weight={3} />
            {[PI / 4, (3 * PI) / 4].map(x => (
              <Point key={x} x={x} y={0} color={C.f} />
            ))}
            <Point x={(5 * PI) / 4} y={0} color={C.guide} opacity={0.7} />
            <Label at={[PI / 4, 0]} color={C.f} attach="sw" size={12}>π/4</Label>
            <Label at={[(3 * PI) / 4, 0]} color={C.f} attach="se" size={12}>3π/4</Label>
            <Label at={[(5 * PI) / 4, 0]} color={C.guide} attach="sw" size={12}>5π/4</Label>
            <Label at={[PI / 2, -2]} color={C.f} attach="s">2cos(2x)</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label="Factor 1: 2cos(2x) = 0" checked={one} onChange={setOne} />
          <Toggle label="Factor 2: f′(sin(2x)) = 0" checked={two} onChange={setTwo} />
        </Buttons>
        <Readouts>
          {one && <Readout color={C.f} tex={'2\\cos(2x)=0:\\ x=\\tfrac\\pi4,\\ \\tfrac{3\\pi}4'} />}
          {two && <Readout color={C.g} tex={'\\sin(2x)=\\tfrac{\\sqrt2}2:\\ x=\\tfrac\\pi8,\\ \\tfrac{3\\pi}8'} />}
          <Readout tex={`\\text{solutions in } [0,\\pi]\\text{ found: } ${found} \\text{ of } 4`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
