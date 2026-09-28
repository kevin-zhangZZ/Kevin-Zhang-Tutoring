// 2017 Specialist Exam 2 Q1c — splitting the solid of revolution of f(x) = x/(1 + x³), 0 ≤ x ≤ 3,
// into two equal volumes. Slide the cut x = a: the readouts give π∫f² on each side, and they
// balance at a ≈ 0.98 (each half 9π/56). A toggle shows the report's common error — not squaring
// f — which halves the AREA of S instead, at a ≈ 1.14.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle,
  integrate, tick,
} from './kit'

const f = (x: number) => x / (1 + x ** 3)
const neg = (x: number) => -f(x)
const zero = () => 0
const sq = (x: number) => f(x) ** 2
const V_TOTAL = (9 * Math.PI) / 28 // π∫₀³ f² dx exactly
const A_TOTAL = integrate(f, 0, 3, 600)
const A_VOL = 0.97646 // π∫₀ᵃ f² = π∫ₐ³ f²
const A_AREA = 1.13701 // ∫₀ᵃ f = ∫ₐ³ f (the not-squared equation)
const K = 0.28 // ellipse squash: how a circular cross-section looks side-on

const pct = (v: number) => `${Math.round(100 * v)}\\%`

export default function HalfVolume() {
  const [a, setA] = useState(1.5)
  const [area, setArea] = useState(false)

  const vl = Math.PI * integrate(sq, 0, a, 400)
  const vr = V_TOTAL - vl
  const al = integrate(f, 0, a, 400)
  const ar = A_TOTAL - al
  const r = f(a)
  const balanced = Math.abs(a - A_VOL) < 0.012
  const areaBalanced = Math.abs(a - A_AREA) < 0.012
  const ellipse = (x0: number, rad: number) => (t: number): [number, number] => [x0 + K * rad * Math.cos(t), rad * Math.sin(t)]
  const volAtAreaSplit = (Math.PI * integrate(sq, 0, A_AREA, 400)) / V_TOTAL

  let notice
  if (area) {
    notice = (
      <Notice tone="warn">
        Without the square, <M>{'\\int_0^a f(x)\\,dx = \\int_a^3 f(x)\\,dx'}</M> splits the <b>area</b> of{' '}
        <M>S</M>, which happens at <M>{'a \\approx 1.14'}</M>. But there the left solid holds about{' '}
        <M>{pct(volAtAreaSplit)}</M> of the volume. A disc&apos;s volume is <M>{'\\pi r^2\\,\\delta x'}</M>: a slice
        twice as tall makes a disc four times as big, so the tall slices near the peak count extra and the volume
        balances further left.
      </Notice>
    )
  } else if (balanced) {
    notice = (
      <Notice tone="good">
        <b>Balanced.</b> Each solid has volume about <M>{(V_TOTAL / 2).toFixed(3)}</M>, half of{' '}
        <M>{'\\tfrac{9\\pi}{28} \\approx 1.010'}</M>. So <M>{'a \\approx 0.98'}</M>, which is what the CAS solve in
        part c.ii. gives. Turn on the toggle to see where the cut lands if you forget to square <M>f</M>.
      </Notice>
    )
  } else if (Math.abs(a - 1.5) < 0.03) {
    notice = (
      <Notice>
        <M>x = 1.5</M> is halfway along <M>{'[0,\\ 3]'}</M>, but the left solid holds about <M>80\%</M> of the
        volume. The fat part of the solid is near the peak at <M>{'x \\approx 0.79'}</M>; the long thin tail on the
        right adds little. Slide <M>a</M> left until the two volumes match.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The left solid is <M>{pct(vl / V_TOTAL)}</M> of the total. Each thin disc has volume{' '}
        <M>{'\\pi\\bigl(f(x)\\bigr)^2\\,\\delta x'}</M>, so tall slices count far more than short ones. Slide{' '}
        <M>a</M> until the two volumes are equal{a > A_VOL ? ' (it is to the left)' : ' (it is to the right)'}.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 3.1]} y={[-0.65, 0.65]} xStep={0.5} yStep={0.5} height={300} equalScale xLabels={v => (Number.isInteger(v) ? tick(v) : '')}>
        {area ? (
          <>
            <Region top={f} bottom={zero} from={0} to={a} color={C.f} opacity={0.35} />
            <Region top={f} bottom={zero} from={a} to={3} color={C.g} opacity={0.35} />
            <Line.Segment point1={[A_AREA, 0]} point2={[A_AREA, f(A_AREA)]} color={C.bad} style="dashed" weight={2} />
            <Line.Segment point1={[A_VOL, 0]} point2={[A_VOL, f(A_VOL)]} color={C.good} style="dashed" weight={2} />
            <Label at={[A_VOL, f(A_VOL)]} attach="nw" color={C.good}>volume</Label>
            <Label at={[A_AREA, f(A_AREA)]} attach="ne" color={C.bad}>area</Label>
          </>
        ) : (
          <>
            <Region top={f} bottom={neg} from={0} to={a} color={C.f} opacity={0.3} />
            <Region top={f} bottom={neg} from={a} to={3} color={C.g} opacity={0.3} />
            <Plot.OfX y={neg} domain={[0, 3]} color={C.f} weight={2} />
            <Plot.Parametric xy={ellipse(3, f(3))} domain={[0, 2 * Math.PI]} color={C.g} weight={2} />
          </>
        )}
        <Plot.OfX y={f} domain={[0, 3]} color={C.f} weight={3} />
        <Line.Segment point1={[3, area ? 0 : -f(3)]} point2={[3, f(3)]} color={C.guide} weight={2} />
        {area ? (
          <Line.Segment point1={[a, 0]} point2={[a, r]} color={C.ink} weight={3} />
        ) : (
          <Plot.Parametric xy={ellipse(a, r)} domain={[0, 2 * Math.PI]} color={C.ink} weight={2.5} />
        )}
        <Label at={[a, r]} attach={area ? 'ne' : 'n'} gap={area ? 5 : 9}>x = a</Label>
        {!area && <Label at={[0.9, -f(0.9)]} attach="s" color={C.f}>left solid</Label>}
        {!area && <Label at={[2.3, -f(2.3)]} attach="s" color={C.g}>right solid</Label>}
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={0.2} max={2.8} step={0.005} />
        <Buttons>
          <ActionButton label="Make the volumes equal" onClick={() => setA(A_VOL)} />
          <Toggle label={<>Forget to square <M>f</M></>} checked={area} onChange={setArea} />
          {area && <ActionButton label="Make the areas equal" onClick={() => setA(A_AREA)} />}
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\pi\\int_0^{${a.toFixed(2)}} f^2\\,dx \\approx ${vl.toFixed(3)}`} />
          <Readout color={C.g} tex={`\\pi\\int_{${a.toFixed(2)}}^{3} f^2\\,dx \\approx ${vr.toFixed(3)}`} />
          {area && <Readout color={areaBalanced ? C.bad : C.f} tex={`\\int_0^{${a.toFixed(2)}} f\\,dx \\approx ${al.toFixed(3)}`} />}
          {area && <Readout color={areaBalanced ? C.bad : C.g} tex={`\\int_{${a.toFixed(2)}}^{3} f\\,dx \\approx ${ar.toFixed(3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
