// 2018 Methods Exam 1 Q5 — why the inverse takes the + square root. A horizontal line y = k meets
// the WHOLE truncus y = 1/(x − 2)² twice, at x = 2 ± 1/√k: those two points are the two signs you
// get from square-rooting (x − 2)² = 1/k. Only the right-hand point has x > 2, so only the + sign
// belongs to f. A toggle removes the restriction x > 2 to show why f needed it: every horizontal
// line then hits the graph twice, one output goes back to two inputs, and there is no inverse
// function.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const f = (x: number) => 1 / (x - 2) ** 2
const X0 = -2
const X1 = 6
const YTOP = 5.2
// How far either side of x = 2 the branches leave the top of the plane.
const EDGE = 1 / Math.sqrt(YTOP + 0.3)

export default function PlusRoot() {
  const [k, setK] = useState(1)
  const [free, setFree] = useState(false)
  const r = 1 / Math.sqrt(k)
  const xr = 2 + r
  const xl = 2 - r

  return (
    <div>
      <Plane x={[X0, X1]} y={[-0.35, YTOP]} xStep={1} yStep={1} height={300}>
        <Line.Segment point1={[2, -0.35]} point2={[2, YTOP]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[2, 0.3]} color={C.guide} attach="e" size={12}>
          x = 2
        </Label>
        <Plot.OfX
          y={f}
          domain={[X0, 2 - EDGE]}
          color={free ? C.f : C.guide}
          weight={free ? 3 : 2}
          style={free ? 'solid' : 'dashed'}
        />
        <Plot.OfX y={f} domain={[2 + EDGE, X1]} color={C.f} weight={3} />
        {!free && (
          <>
            <Label at={[X0 + 0.05, 3.0]} color={C.guide} attach="e" size={12}>
              x &lt; 2:
            </Label>
            <Label at={[X0 + 0.05, 2.5]} color={C.guide} attach="e" size={12}>
              not in f
            </Label>
          </>
        )}
        <Label at={[2.6, f(2.6)]} color={C.f} attach="e">
          f
        </Label>
        <Line.Segment point1={[X0, k]} point2={[X1, k]} color={C.violet} style="dashed" weight={2} />
        <Label at={[X1 - 0.05, k]} color={C.violet} attach="sw" size={12}>
          {`y = ${num(k)}`}
        </Label>
        <Point x={xl} y={k} color={free ? C.g : C.bad} />
        <Point x={xr} y={k} color={free ? C.g : C.good} />
        <Label at={[xl, k]} color={free ? C.g : C.bad} attach="nw">
          {`x = ${num(xl)}`}
        </Label>
        <Label at={[xr, k]} color={free ? C.g : C.good} attach="ne">
          {`x = ${num(xr)}`}
        </Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={0.2} max={5} step={0.01} />
        <Toggle label="Remove the restriction x > 2" checked={free} onChange={setFree} />
        <Readouts>
          <Readout tex={`(x-2)^2 = \\tfrac{1}{k} = ${num(1 / k)}`} />
          <Readout tex={`x-2 = \\pm\\tfrac{1}{\\sqrt{k}} = \\pm ${num(r)}`} />
          <Readout color={free ? C.g : C.good} tex={`x = 2 + ${num(r)} = ${num(xr)}${free ? '' : '\\ \\checkmark'}`} />
          <Readout
            color={free ? C.g : C.bad}
            tex={`x = 2 - ${num(r)} = ${num(xl)}${free ? '' : '\\ (\\text{not} > 2)'}`}
          />
        </Readouts>
        {free ? (
          <Notice tone="warn">
            Now both branches are part of the function, and <b>every line <M>{'y = k'}</M> with{' '}
            <M>{'k > 0'}</M> hits the graph twice</b>. One output would have to lead back to two different inputs, so
            there is no inverse <em>function</em>. The restriction <M>{'x > 2'}</M> does two jobs: it makes{' '}
            <M>f</M> one-to-one, and it tells you which square root to keep.
          </Notice>
        ) : (
          <Notice>
            The line <M>{'y = k'}</M> cuts the full truncus at two points, <M>{'x = 2 \\pm \\tfrac{1}{\\sqrt{k}}'}</M>:
            one for each sign of the square root. <b>Only the green point has <M>{'x > 2'}</M></b>. The red one is
            always left of the asymptote, on the half of the curve that <M>f</M> leaves out. Slide <M>k</M> and check.
            Then turn on &ldquo;Remove the restriction&rdquo; to see why <M>f</M> needed it.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
