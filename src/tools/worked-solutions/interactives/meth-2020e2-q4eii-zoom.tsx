// 2020 Methods Exam 2 Q4e.ii — f(3) looks like 0 on the printed graph, but f(3) = 6e⁻⁸ ≈ 0.00201.
// A zoom slider magnifies the corner at (3, 0) up to ×1000, keeping that corner fixed on screen: at
// ×1 the curve seems to land on the axis; by ×200 or so it is plainly still above it. The second
// segment (drawn with Q at n = 1.5) ends at (3, 6e⁻⁸). A toggle adds the segment you get by
// assuming f(3) = 0 (the report's named slip): it ends at (3, 0) instead, identical to the eye at
// ×1 and clearly a different line when zoomed. The same thin gap is why part e.iii's right-hand
// shape is a trapezium, not a triangle.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle,
} from './kit'

const f = (x: number) => 2 * x * Math.exp(1 - x * x)
const N = 1.5
const FN = f(N)
const F3 = 6 * Math.exp(-8) // 0.0020127…
// The unzoomed view; zooming shrinks it towards the fixed corner (3, 0).
const X0 = -0.1
const X1 = 3.6
const Y0 = -0.15
const Y1 = 2.5

/** A 1–2–5 step giving about four grid lines across `span`. */
function niceStep(span: number): number {
  const raw = span / 4
  const p = 10 ** Math.floor(Math.log10(raw))
  const m = raw / p
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p
}

export default function ZoomWidget() {
  const [s, setS] = useState(0) // log10 of the magnification
  const [wrong, setWrong] = useState(false)
  const z = 10 ** s
  const x: [number, number] = [3 + (X0 - 3) / z, 3 + (X1 - 3) / z]
  const y: [number, number] = [Y0 / z, Y1 / z]
  const xStep = niceStep(x[1] - x[0])
  const yStep = niceStep(y[1] - y[0])
  const dp = Math.max(0, -Math.floor(Math.log10(xStep) + 1e-9))
  const deep = z >= 200
  const showGuide = z >= 30

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <b>Assuming <M>f(3) = 0</M></b> gives the red segment, which ends at <M>(3, 0)</M> on the axis instead of at the
        end of the curve. {z < 30
          ? 'At this scale the two segments look identical, which is exactly why the slip is easy to make. Zoom in and watch them separate.'
          : 'Zoomed in, they are clearly two different lines with different equations.'}{' '}
        The report notes students who assumed <M>f(3) = 0</M>. The same gap is why part e.iii&apos;s right-hand shape is
        a trapezium, not a triangle.
      </Notice>
    )
  } else if (deep) {
    notice = (
      <Notice tone="good">
        <b>There it is.</b> At <M>x = 3</M> the curve is still <M>{'6e^{-8} \\approx 0.00201'}</M> above the axis, so
        the segment ends at <M>{'(3, 6e^{-8})'}</M> and its equation must use <M>{'f(3) = 6e^{-8}'}</M>. A quick check
        on your answer: put <M>x = 3</M> into it and you should get <M>{'6e^{-8}'}</M>, not <M>0</M>. Now turn on
        &ldquo;What if <M>f(3) = 0</M>?&rdquo;.
      </Notice>
    )
  } else if (z >= 15) {
    notice = (
      <Notice>
        Closer. The curve is flattening out, but it still hasn&apos;t reached the axis by <M>x = 3</M>. Keep zooming.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At this scale the curve seems to finish on the <M>x</M>-axis at <M>x = 3</M>, so it is tempting to take{' '}
        <M>f(3) = 0</M>. But <M>{'f(3) = 2(3)e^{1-9} = 6e^{-8}'}</M>, which isn&apos;t zero. Drag the zoom slider to
        magnify the corner at <M>(3, 0)</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={x}
        y={y}
        xStep={xStep}
        yStep={yStep}
        height={300}
        xLabels={v => v.toFixed(dp)}
        // Whole numbers only at ×1: the half-unit labels sit under the steep rising side of f.
        yLabels={z < 1.5 ? v => (Math.abs(v - Math.round(v)) < 1e-9 ? v.toFixed(0) : '') : false}
      >
        {showGuide && (
          <>
            <Line.Segment point1={[x[0], F3]} point2={[3, F3]} color={C.guide} style="dashed" weight={1.5} />
            <Label at={[x[0] + 0.35 * (3 - x[0]), F3]} color={C.guide} attach="se" gap={6} size={12}>y = 6e⁻⁸ ≈ 0.00201</Label>
          </>
        )}
        <Plot.OfX y={f} domain={[Math.max(0, x[0]), Math.min(3, x[1])]} color={C.f} weight={3} />
        {z < 1.5 && <Label at={[0.45, f(0.45)]} color={C.f} attach="nw">f</Label>}
        {wrong && (
          <>
            <Line.Segment point1={[N, FN]} point2={[3, 0]} color={C.bad} style="dashed" weight={2.5} />
            <Point x={3} y={0} color={C.bad} />
            {z >= 30 && <Label at={[3, 0]} color={C.bad} attach="ne" gap={9}>(3, 0)</Label>}
          </>
        )}
        <Line.Segment point1={[N, FN]} point2={[3, F3]} color={C.g} weight={2.5} />
        <Point x={3} y={F3} color={C.g} />
        {z >= 30 && <Label at={[3, F3]} color={C.g} attach="e" gap={9}>(3, f(3))</Label>}
        {z < 1.5 && (
          <>
            <Point x={N} y={FN} color={C.g} />
            <Label at={[N, FN]} color={C.g} attach="ne">Q</Label>
          </>
        )}
      </Plane>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
        Q is at <M>n = 1.5</M> here; any <M>n</M> between 1 and 3 behaves the same way.
      </p>
      <Controls>
        <Slider label="\text{zoom}" value={s} onChange={setS} min={0} max={3} step={0.01} format={v => `×${Math.round(10 ** v)}`} />
        <Buttons>
          <ActionButton label="Zoom right in" onClick={() => setS(3)} />
          <ActionButton label="Back to ×1" onClick={() => setS(0)} />
          <Toggle label={<>What if f(3) = 0?</>} checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex="f(3) = 6e^{-8} \approx 0.00201" />
          <Readout tex={`\\text{magnification} \\approx \\times ${Math.round(z)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}

