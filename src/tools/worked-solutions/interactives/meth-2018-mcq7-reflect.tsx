// 2018 Methods Exam 2 MCQ 7 — f(x) = k log₂(x) and its inverse f⁻¹(x) = 2^(x/k) are mirror
// images in y = x, so the given point (1, 8) on f⁻¹ is the point (8, 1) on f. Slide k: the blue
// curve reaches (8, 1) at exactly the same k (= 1/3) as the orange one reaches (1, 8). A toggle
// tries the wrong reading "f(1) = 8": every f passes through (1, 0), so no k can work.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num, tick,
} from './kit'

const f = (k: number, x: number) => k * Math.log2(x)
const fInv = (k: number, x: number) => 2 ** (x / k)
const LO = -1
const HI = 9.8
const YLO = -1.8
const THIRD = 1 / 3

export default function Reflect() {
  const [k, setK] = useState(0.7)
  const [wrong, setWrong] = useState(false)

  const hit = Math.abs(k - THIRD) < 0.002
  const f8 = 3 * k
  const inv1 = fInv(k, 1)
  // Keep each curve inside the picture: f from just below the bottom edge, f⁻¹ up to
  // where it leaves through the top.
  const fFrom = 2 ** ((YLO - 0.3) / k)
  const invTo = Math.min(HI, k * Math.log2(HI + 0.3))
  const labelY = 9.2
  const invLabelX = k * Math.log2(labelY)

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        Drag <M>k</M>: the blue curve swings, but it <b>always</b> passes through <M>(1, 0)</M>, because{' '}
        <M>{'\\log_2(1) = 0'}</M>. So &ldquo;<M>f(1) = 8</M>&rdquo; would need <M>{'k \\times 0 = 8'}</M>, which no{' '}
        <M>k</M> solves. The <M>8</M> in <M>{'f^{-1}(1) = 8'}</M> is an <em>output</em> of the inverse, which makes it an{' '}
        <em>input</em> of <M>f</M>.
      </Notice>
    )
  } else if (hit) {
    notice = (
      <Notice tone="good">
        At <M>{'k = \\tfrac13'}</M> the blue curve goes through <M>(8, 1)</M> and, at the same moment, its mirror image
        goes through <M>(1, 8)</M>. They are one fact read two ways: <M>{'f^{-1}(1) = 8 \\iff f(8) = 1'}</M>. That is why you
        never need the rule for <M>{'f^{-1}'}</M>: substitute into <M>f</M> instead.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The question gives the orange point <M>(1, 8)</M>, which lies on the <b>inverse</b>. Reflecting it in{' '}
        <M>y = x</M> (dashed) lands on <M>(8, 1)</M>, which must lie on <M>f</M>. Right now{' '}
        <M>{`f(8) = 3k = ${num(f8)}`}</M>, {f8 > 1 ? 'too high' : 'too low'}: drag <M>k</M> until the blue curve hits{' '}
        <M>(8, 1)</M> and watch the orange curve reach <M>(1, 8)</M> at the same time.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[LO, HI]} y={[YLO, HI]} xStep={1} yStep={1} height={500} equalScale
        xLabels={v => (v < -1 || v > 10 ? "" : tick(v))}
        yLabels={v => (v < 0 ? "" : tick(v))}
      >
        {!wrong && (
          <>
            <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
            <Label at={[8.3, 8.3]} color={C.guide} attach="se">y = x</Label>
            <Line.Segment point1={[1, 8]} point2={[8, 1]} color={C.guide} style="dashed" weight={1} />
            <Plot.OfX y={x => fInv(k, x)} domain={[LO, invTo]} color={C.g} weight={3} />
            {invLabelX < HI - 1.5 && (
              <Label at={[invLabelX, labelY]} color={C.g} attach="e">y = f⁻¹(x)</Label>
            )}
          </>
        )}
        <Plot.OfX y={x => f(k, x)} domain={[fFrom, HI]} color={C.f} weight={3} />
        <Label at={[9.3, f(k, 9.3)]} color={C.f} attach={f(k, 9.3) > 5 ? 'w' : 'n'}>y = f(x)</Label>

        {!wrong && (
          <>
            {/* How far each curve misses its target. */}
            {!hit && <Line.Segment point1={[8, 1]} point2={[8, Math.min(HI, f8)]} color={C.bad} style="dashed" weight={1.5} />}
            {!hit && inv1 < HI && (
              <Line.Segment point1={[1, 8]} point2={[1, inv1]} color={C.bad} style="dashed" weight={1.5} />
            )}
            {f8 < HI && <Point x={8} y={f8} color={C.f} />}
            {inv1 < HI && <Point x={1} y={inv1} color={C.g} />}
            <Point x={1} y={8} color={hit ? C.good : C.g} />
            <Label at={[1, 8]} color={hit ? C.good : C.g} attach="e">(1, 8)</Label>
            <Point x={8} y={1} color={hit ? C.good : C.f} />
            <Label at={[8, 1]} color={hit ? C.good : C.f} attach="s">(8, 1)</Label>
          </>
        )}
        {wrong && (
          <>
            <Point x={1} y={8} color={C.bad} />
            <Label at={[1, 8]} color={C.bad} attach="e">f(1) = 8 ?</Label>
            <Point x={1} y={0} color={C.bad} />
            <Label at={[1.2, -1.15]} color={C.bad} attach="e">f(1) = 0 for every k</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider
          label="k"
          value={k}
          onChange={setK}
          min={0.1}
          max={1.2}
          step={1 / 300}
          format={v => (Math.abs(v - THIRD) < 0.002 ? '1/3' : v.toFixed(2))}
        />
        <Buttons>
          <ActionButton label="Snap to k = 1/3" onClick={() => setK(THIRD)} />
          <Toggle label="Wrong reading: f(1) = 8" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          {wrong ? (
            <Readout color={C.bad} tex={'f(1) = k\\log_2(1) = k \\times 0 = 0 \\ne 8'} />
          ) : hit ? (
            <>
              <Readout color={C.good} tex={'f(8) = \\tfrac13\\log_2(8) = 1\\ \\checkmark'} />
              <Readout color={C.good} tex={'f^{-1}(1) = 2^{1/k} = 2^3 = 8\\ \\checkmark'} />
            </>
          ) : (
            <>
              <Readout color={C.f} tex={`f(8) = k\\log_2(8) = 3k = ${num(f8)}`} />
              <Readout color={C.g} tex={`f^{-1}(1) = 2^{1/k} = ${inv1 > 999 ? '\\text{huge}' : num(inv1)}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
