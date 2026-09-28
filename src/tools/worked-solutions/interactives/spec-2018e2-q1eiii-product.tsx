// 2018 Specialist Exam 2 Q1e.ii–iii — g is not f′. Since f′(x) = g(x)/√(2 − x²), g(x) =
// f′(x)·√(2 − x²) = 4x/|x|: multiplying f′ = ±4/√(2 − x²) by the root it was divided by cancels the
// blow-up at x = ±√2 and leaves only the sign of x. Slide x to read f′(x), √(2 − x²) and their
// product g(x) = ±4 at the same x. The toggle shows f′ in blue (the report says students frequently
// sketched f′ instead of g): asymptotes at x = ±√2 and a jump at 0 from −2√2 to 2√2. The two graphs
// cross where √(2 − x²) = 1, i.e. x = ±1. g is two flat segments with four open circles.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle,
  num,
} from './kit'

const R2 = Math.SQRT2
const fpRight = (x: number) => 4 / Math.sqrt(2 - x * x)
const fpLeft = (x: number) => -4 / Math.sqrt(2 - x * x)
const CLIP = Math.sqrt(2 - 16 / 8.6 ** 2) // where |f′| reaches 8.6, just past the top of the grid

function Hollow({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 4.5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2 } }} />
}

const showX = (k: number) => (k === 0 ? '0' : Math.abs(k) === 100 ? (k < 0 ? '−√2' : '√2') : ((k * R2) / 100).toFixed(2))

export default function GIsNotFPrime() {
  const [k, setK] = useState(40)
  const [showFp, setShowFp] = useState(true)
  const x0 = (k * R2) / 100
  const outside = k === 0 || Math.abs(k) === 100
  const root = Math.sqrt(Math.max(0, 2 - x0 * x0))
  const fp = x0 > 0 ? fpRight(x0) : fpLeft(x0)
  const g = Math.sign(x0) * 4
  const fpOnGrid = Math.abs(fp) <= 8

  let notice
  if (k === 0) {
    notice = (
      <Notice tone="warn">
        <M>x = 0</M> is not in the domain of <M>f'</M> (part e.i.), so <M>g(0)</M> is not defined either: each
        branch of <M>g</M> ends in an <b>open</b> circle at <M>x = 0</M>. Filling in both circles would give{' '}
        <M>x = 0</M> two <M>y</M>-values, and the graph would no longer be a function.
      </Notice>
    )
  } else if (outside) {
    notice = (
      <Notice tone="warn">
        At <M>{'x=\\pm\\sqrt2'}</M> the root is <M>0</M> and <M>f'</M> is undefined, so <M>g</M> is undefined too:
        open circles at <M>{'(\\pm\\sqrt2,\\pm4)'}</M>. <M>g</M> runs flat right up to the circle — it never
        heads for an asymptote.
      </Notice>
    )
  } else if (Math.abs(x0) > 1.2) {
    notice = (
      <Notice tone="good">
        Near <M>{'x=\\sqrt2'}</M>, <M>{"f'(x)"}</M> shoots off towards infinity, but <M>{'\\sqrt{2-x^2}'}</M> shrinks
        towards <M>0</M> at exactly the matching rate: the product is still <M>{`${g}`}</M>. The blow-up belongs to the
        root in the denominator, and <M>g</M> is what is left once that root is multiplied back.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At <M>{`x=${num(x0)}`}</M>: <M>{`f'(x)=${num(fp)}`}</M> and <M>{`\\sqrt{2-x^2}=${num(root)},`}</M> so{' '}
        <M>{`g(x)=${num(fp)}\\times${num(root)}=${g}`}</M>. Slide anywhere on this side and the product stays{' '}
        <M>{`${g}`}</M>: <M>{'g(x)=\\tfrac{4x}{|x|}'}</M> keeps only the <b>sign</b> of <M>x</M>. Slide towards{' '}
        <M>{'\\sqrt2'}</M>, then try <M>x = 0</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2, 2]} y={[-8, 8]} xStep={0.5} yStep={2} height={340}>
        {showFp && (
          <>
            <Line.Segment point1={[R2, -8]} point2={[R2, 8]} color={C.guide} style="dashed" weight={1.5} />
            <Line.Segment point1={[-R2, -8]} point2={[-R2, 8]} color={C.guide} style="dashed" weight={1.5} />
            <Plot.OfX y={fpRight} domain={[0, CLIP]} color={C.f} weight={2.5} />
            <Plot.OfX y={fpLeft} domain={[-CLIP, 0]} color={C.f} weight={2.5} />
            <Hollow x={0} y={2 * R2} color={C.f} />
            <Hollow x={0} y={-2 * R2} color={C.f} />
            <Label at={[1.25, fpRight(1.25)]} attach="w" color={C.f}>y = f′(x)</Label>
          </>
        )}
        <Line.Segment point1={[0, 4]} point2={[R2, 4]} color={C.g} weight={3.5} />
        <Line.Segment point1={[-R2, -4]} point2={[0, -4]} color={C.g} weight={3.5} />
        <Hollow x={0} y={4} color={C.g} />
        <Hollow x={R2} y={4} color={C.g} />
        <Hollow x={-R2} y={-4} color={C.g} />
        <Hollow x={0} y={-4} color={C.g} />
        <Label at={[-0.7, -4]} attach="s" color={C.g}>y = g(x)</Label>

        {!outside && (
          <>
            <Line.Segment point1={[x0, -8]} point2={[x0, 8]} color={C.guide} style="dashed" weight={1} />
            {showFp && fpOnGrid && <Point x={x0} y={fp} color={C.f} />}
            <Point x={x0} y={g} color={C.g} />
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="x" value={k} onChange={setK} min={-100} max={100} step={1} format={showX} />
        <Buttons>
          <ActionButton label={<>Near <M>{'x = \\sqrt2'}</M></>} onClick={() => setK(97)} />
          <ActionButton label={<>Try the gap at <M>x = 0</M></>} onClick={() => setK(0)} />
          <ActionButton label="Try the left branch" onClick={() => setK(-50)} />
        </Buttons>
        <Toggle label={<>Show <M>f'</M> (the graph that is <b>not</b> <M>g</M>)</>} checked={showFp} onChange={setShowFp} />
        <Readouts>
          {outside ? (
            <Readout color={C.bad} tex={`x = ${k === 0 ? '0' : k < 0 ? '-\\sqrt2' : '\\sqrt2'}:\\ f'(x),\\ g(x)\\ \\text{undefined}`} />
          ) : (
            <>
              <Readout color={C.f} tex={`f'(x) = ${num(fp)}`} />
              <Readout color={C.guide} tex={`\\sqrt{2-x^2} = ${num(root)}`} />
              <Readout color={C.g} tex={`g(x) = f'(x)\\sqrt{2-x^2} = ${g}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
