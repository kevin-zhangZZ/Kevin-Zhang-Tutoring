// 2023 Specialist Exam 2 Q3d — the disc that closes the far end of the solid has radius √(k − 1),
// so its area is π(k − 1). The solid from rotating y² = x − 1, 2 ≤ x ≤ k, about the x-axis is drawn
// in side view; drag k and the end disc always fits the solid, because its radius is the curve's
// height y = √(k − 1) at x = k. At k = 8 the volume π((k − 1)² − 1)/2 is 24π, the curved surface
// (π/6)(29^{3/2} − 5^{3/2}) ≈ 75.916 and the ends π + 7π = 8π, so the ratio is ≈ 1.34, as in the
// working. A toggle swaps in a disc of radius k − 1 (reading y² = k − 1 as y = k − 1): at k = 8 it
// has radius 7 against the curve's height √7 ≈ 2.65, plainly not the end of this solid, and the
// ratio jumps to (75.916 + 50π)/(24π) ≈ 3.09.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Slider,
  Toggle, num, type vec,
} from './kit'

const y = (x: number) => Math.sqrt(x - 1)
const A = 2
const RA = y(A) // 1
const surface = (k: number) => (Math.PI / 6) * ((4 * k - 3) ** 1.5 - 5 ** 1.5)
const volume = (k: number) => (Math.PI / 2) * ((k - 1) ** 2 - 1)
// A circle of radius r at x, seen slightly from the side, is an ellipse this many x-units wide
// per unit of radius (either side of its centre).
const K = 0.12
const TOP = 4.2

function ring(x: number, r: number, a0: number, a1: number, n = 36): vec.Vector2[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / n
    return [x + K * r * Math.cos(a), r * Math.sin(a)] as vec.Vector2
  })
}

/** A tidy decimal for TeX: 7 not 7.0, 6.5 stays 6.5, 42.25 stays 42.25. */
const tidy = (v: number) => String(Math.round(v * 100) / 100)

export default function EndRadius() {
  const [k, setK] = useState(8)
  const [wrong, setWrong] = useState(false)

  const at8 = Math.abs(k - 8) < 1e-9
  const r = y(k)
  const km1 = tidy(k - 1)
  const S = surface(k)
  const V = volume(k)
  const endFar = wrong ? Math.PI * (k - 1) ** 2 : Math.PI * (k - 1)
  const ratio = (S + Math.PI + endFar) / V

  const xs = Array.from({ length: 81 }, (_, i) => A + ((k - A) * i) / 80)
  const silhouette: vec.Vector2[] = [
    ...ring(A, RA, Math.PI / 2, (3 * Math.PI) / 2),
    ...xs.map(x => [x, -y(x)] as vec.Vector2),
    ...ring(k, r, -Math.PI / 2, Math.PI / 2),
    ...[...xs].reverse().map(x => [x, y(x)] as vec.Vector2),
  ]

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <b>A radius of {km1} does not fit.</b> That disc reaches far beyond the curve, whose height at{' '}
        <M>x=k</M> is only <M>{`\\sqrt{${km1}}\\approx${num(r, 2)}`}</M>, so it cannot be the end of this solid.
        This is what happens if <M>y^2=k-1</M> is read as <M>y=k-1</M>: the end area becomes{' '}
        <M>{'\\pi(k-1)^2'}</M> and the ratio jumps to <M>{`\\approx ${num(ratio, 2)}`}</M>. Switch the wrong radius off.
      </Notice>
    )
  } else if (at8) {
    notice = (
      <Notice tone="good">
        <b>At k = 8 the volume is 24π</b>, the value found in the working. The disc closing this end has radius
        equal to the curve&apos;s height there, <M>{'y=\\sqrt{8-1}=\\sqrt7\\approx2.65'}</M>, so its area is{' '}
        <M>{'\\pi(\\sqrt7)^2=7\\pi'}</M>. With the left disc&apos;s <M>\pi</M>, the ratio is{' '}
        <M>{'(75.916+8\\pi)\\div(24\\pi)\\approx1.34'}</M>. Now try the wrong radius.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        However far you drag <M>k</M>, the far disc fits the end of the solid exactly, because its radius is the
        curve&apos;s height <M>{'\\sqrt{k-1}'}</M> at <M>x=k</M>. Its area is <M>{'\\pi(\\sqrt{k-1})^2=\\pi(k-1)'}</M>:
        squaring undoes the root. Only <M>k=8</M> gives the volume <M>24\pi</M> the question asks for.
      </Notice>
    )
  }

  const rw = k - 1 // the wrong radius
  const hw = Math.min(rw, TOP) * 0.75 // height of its label, just outside the dashed rim
  return (
    <div>
      <Plane x={[0.6, 10.4]} y={[-TOP, TOP]} xStep={1} yStep={1} height={320} labels={false} yLabel="">
        <Polygon points={silhouette} color={C.f} fillOpacity={0.14} weight={0} strokeOpacity={0} />
        <Polygon points={ring(A, RA, 0, 2 * Math.PI)} color={C.g} fillOpacity={0.4} weight={1.5} />
        <Plot.OfX y={x => -y(x)} domain={[A, k]} color={C.f} weight={1.5} />
        <Plot.OfX y={y} domain={[A, k]} color={C.f} weight={3} />
        {wrong ? (
          <>
            <Polygon points={ring(k, r, -Math.PI / 2, Math.PI / 2)} color={C.f} fillOpacity={0} weight={1.5} />
            <Polygon points={ring(k, rw, 0, 2 * Math.PI, 60)} color={C.bad} fillOpacity={0.12} weight={2} strokeStyle="dashed" />
            <Line.Segment point1={[k, 0]} point2={[k, Math.min(rw, TOP)]} color={C.bad} weight={2} />
            <Label at={[k - K * rw * Math.cos(Math.asin(hw / rw)), hw]} attach="w" size={12} color={C.bad}>
              {`r = ${km1}`}
            </Label>
          </>
        ) : (
          <>
            <Polygon points={ring(k, r, 0, 2 * Math.PI)} color={C.g} fillOpacity={0.5} weight={2} />
            <Line.Segment point1={[k, 0]} point2={[k, r]} color={C.ink} weight={2} />
            <Label at={[k, r]} attach="n" size={12} color={C.g}>{`r = √${km1}`}</Label>
          </>
        )}
        <Label at={[A - K * RA, RA / 2]} attach="w" size={12}>r = 1</Label>
        <Label at={[A, -RA]} attach="s" size={12}>x = 2</Label>
        <Label at={[k, -r]} attach="s" size={12}>x = k</Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={v => setK(Math.round(v * 10) / 10)} min={3.5} max={9.5} step={0.1} format={v => v.toFixed(1)} />
        <Buttons>
          <Toggle label="Use radius k − 1 instead" checked={wrong} onChange={setWrong} />
          {!at8 && <ActionButton label="Go to k = 8" onClick={() => setK(8)} />}
        </Buttons>
        <Readouts>
          <Readout tex={`V \\approx ${num(V, 3)}${at8 ? ' = 24\\pi' : ''}`} />
          <Readout color={C.f} tex={`\\text{curved } S \\approx ${num(S, 3)}`} />
          <Readout
            color={wrong ? C.bad : C.g}
            tex={
              wrong
                ? `\\text{ends} = \\pi + \\pi(${km1})^2 = \\pi + ${tidy((k - 1) ** 2)}\\pi`
                : `\\text{ends} = \\pi + \\pi(\\sqrt{${km1}})^2 = \\pi + ${km1}\\pi`
            }
          />
          <Readout color={wrong ? C.bad : C.good} tex={`\\tfrac{\\text{total SA}}{V} \\approx ${num(ratio, 2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
