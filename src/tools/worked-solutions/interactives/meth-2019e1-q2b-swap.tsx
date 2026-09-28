// 2019 Methods Exam 1 Q2b — why the domain of f⁻¹ is the range of f. Slide P = (a, f(a)) along
// f(x) = 1/(3x − 1); its mirror image in y = x is P' = (f(a), a) on f⁻¹(x) = 1/(3x) + 1/3 (part a).
// The height of P (an output of f, marked on the y-axis) is the across-position of P' (an input
// of f⁻¹, marked on the x-axis). Pushing a far left or right shows f(a) creeping toward 0 without
// ever reaching it: the hole at 0 in ran f is the hole at x = 0 in dom f⁻¹. Near a = 1/3 the same
// swap works the other way: f's missing input 1/3 becomes f⁻¹'s missing output (asymptote y = 1/3).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const f = (x: number) => 1 / (3 * x - 1)
const fInv = (x: number) => 1 / (3 * x) + 1 / 3
const R = 2.5
const EPS = 0.04
const FAR = 12 // draw well past the grid: on a wide screen the equal-scale plane shows more x

function Hollow({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 4.5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2 } }} />
}

const show = (v: number) => (Math.abs(v) < 0.1 ? v.toFixed(4) : v.toFixed(3))

export default function RangeBecomesDomain() {
  const [a, setA] = useState(1.5)
  const fa = f(a)
  const far = Math.abs(a) > R
  const nearAsym = Math.abs(a - 1 / 3) < 0.1 // |f(a)| > 3.3: P and P' really are off the grid
  const pBelow = fa < a
  const faOnGrid = Math.abs(fa) <= R

  let notice
  if (far) {
    notice = (
      <Notice tone="warn">
        P has run off the edge of the grid, but its height <M>{`f(a) = ${show(fa)}`}</M> is still marked: the blue dot
        on the <M>y</M>-axis and, swapped, the orange dot on the <M>x</M>-axis. Push <M>a</M> further out: both dots
        creep toward the origin but never land on it, because <M>{'\\tfrac{1}{3a-1}'}</M> is never <M>0</M>. The
        missing output <M>0</M> of <M>f</M> is the missing input <M>0</M> of <M>{'f^{-1}'}</M>, so{' '}
        <M>{'\\operatorname{dom} f^{-1} = R\\setminus\\{0\\}'}</M>.
      </Notice>
    )
  } else if (nearAsym) {
    notice = (
      <Notice>
        Near <M>{'a = \\tfrac13'}</M>, <M>f(a)</M> is huge, so P and P&apos; leave the grid. The swap works this way too:{' '}
        <M>{'\\tfrac13'}</M> is the input <M>f</M> can&apos;t take, so it is the output <M>{'f^{-1}'}</M> never gives.
        That is why <M>{'f^{-1}'}</M> has the horizontal asymptote <M>{'y = \\tfrac13'}</M>. Domain and range
        swap over together.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        P&apos; is P reflected in <M>y = x</M>, which just swaps its coordinates. So the <b>height</b> of P (an output
        of <M>f</M>, blue dot on the <M>y</M>-axis) is the <b>across-position</b> of P&apos; (an input of{' '}
        <M>{'f^{-1}'}</M>, orange dot on the <M>x</M>-axis). Every output of <M>f</M> becomes an input of{' '}
        <M>{'f^{-1}'}</M>. Now slide <M>a</M> far left or far right. Which output does <M>f</M> never reach?
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-R, R]} y={[-R, R]} equalScale height={360}>
        {/* the range of f along the y-axis, and the domain of f⁻¹ along the x-axis — both missing 0 */}
        <Line.Segment point1={[0, 0.12]} point2={[0, FAR]} color={C.f} weight={7} opacity={0.22} />
        <Line.Segment point1={[0, -FAR]} point2={[0, -0.12]} color={C.f} weight={7} opacity={0.22} />
        <Line.Segment point1={[0.12, 0]} point2={[FAR, 0]} color={C.g} weight={7} opacity={0.22} />
        <Line.Segment point1={[-FAR, 0]} point2={[-0.12, 0]} color={C.g} weight={7} opacity={0.22} />

        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[1 / 3, -FAR]} point2={[1 / 3, FAR]} color={C.f} style="dashed" weight={1} opacity={0.6} />
        <Line.Segment point1={[-FAR, 1 / 3]} point2={[FAR, 1 / 3]} color={C.g} style="dashed" weight={1} opacity={0.6} />

        <Plot.OfX y={f} domain={[-FAR, 1 / 3 - EPS]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[1 / 3 + EPS, FAR]} color={C.f} weight={3} />
        <Plot.OfX y={fInv} domain={[-FAR, -EPS]} color={C.g} weight={3} />
        <Plot.OfX y={fInv} domain={[EPS, FAR]} color={C.g} weight={3} />

        <Label at={[fInv(2.2), 2.2]} color={C.f} attach="e">f</Label>
        <Label at={[2.2, fInv(2.2)]} color={C.g} attach="n">f⁻¹</Label>
        <Label at={[-1.9, -1.9]} color={C.guide} attach="se">y = x</Label>
        <Label at={[1 / 3, -2.2]} color={C.f} attach="e">x = 1/3</Label>
        <Label at={[-2.4, 1 / 3]} color={C.g} attach="ne">y = 1/3</Label>

        {/* P → its projection on the y-axis; P' → its projection on the x-axis; P ↔ P' across y = x */}
        <Line.Segment point1={[a, fa]} point2={[0, fa]} color={C.f} style="dashed" weight={1.5} />
        <Line.Segment point1={[fa, a]} point2={[fa, 0]} color={C.g} style="dashed" weight={1.5} />
        <Line.Segment point1={[a, fa]} point2={[fa, a]} color={C.guide} style="dashed" weight={1.5} />

        <Hollow x={0} y={0} color={C.bad} />
        {faOnGrid && <Point x={0} y={fa} color={C.f} />}
        {faOnGrid && <Point x={fa} y={0} color={C.g} />}
        <Point x={a} y={fa} color={C.f} />
        <Point x={fa} y={a} color={C.g} />
        {!far && !nearAsym && <Label at={[a, fa]} color={C.f} attach={pBelow ? 'se' : 'nw'}>P</Label>}
        {!far && !nearAsym && <Label at={[fa, a]} color={C.g} attach={pBelow ? 'nw' : 'se'}>P′</Label>}
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={-8} max={8} step={0.02} />
        <Readouts>
          <Readout color={C.f} tex={`f(${a.toFixed(2)}) = ${show(fa)}`} />
          <Readout color={C.g} tex={`f^{-1}(${show(fa)}) = ${fInv(fa).toFixed(2)}`} />
          <Readout color={C.bad} tex={'f(a) \\ne 0 \\text{ for every } a'} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
