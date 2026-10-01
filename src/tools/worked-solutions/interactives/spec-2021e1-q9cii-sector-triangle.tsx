// 2021 Specialist Exam 1 Q9c.ii — what part c.i's antiderivative means geometrically, so the
// arithmetic at the limits can be seen. y = √(−x² − 2x + 15) is the top of the circle
// (x + 1)² + y² = 16 (centre (−1, 0), radius 4), and the area under it from −1 to x is a sector
// of angle θ = arcsin((x + 1)/4) — area 8θ, the arcsin term — plus a right triangle of base
// x + 1 and height √(−x² − 2x + 15), the second term. Buttons snap x to the question's limits
// (θ = π/3 and π/6); the "Subtract" toggle shows both at once: the two triangles are congruent
// (2√3 × 2 and 2 × 2√3), so the 2√3 terms cancel, leaving the wedge of angle π/6, area 4π/3,
// and the question's curve (the circle squashed by √3/6) gives A = 2√3π/9 ≈ 1.209.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Region, Slider,
  Toggle, integrate,
} from './kit'

const R = 4
const K: [number, number] = [-1, 0]
const Y = (x: number) => Math.sqrt(Math.max(0, 15 - 2 * x - x * x))
const S = Math.sqrt(3) / 6
const curve = (x: number) => S * Y(x)
const LO = 1
const HI = 2 * Math.sqrt(3) - 1

/** Point on the circle at angle φ measured from the vertical radius. */
const onCircle = (phi: number): [number, number] => [-1 + R * Math.sin(phi), R * Math.cos(phi)]
const arcPts = (a: number, b: number, n = 48): [number, number][] =>
  Array.from({ length: n + 1 }, (_, i) => onCircle(a + ((b - a) * i) / n))
/** Small angle-marker arc at the centre, radius ρ, from angle a to b. */
const marker = (rho: number) => (t: number): [number, number] => [-1 + rho * Math.sin(t), rho * Math.cos(t)]
const theta = (x: number) => Math.asin((x + 1) / R)
const sector = (x: number) => 8 * theta(x)
const triangle = (x: number) => ((x + 1) * Y(x)) / 2

export default function SectorTriangle() {
  const [x0, setX0] = useState(HI)
  const [both, setBoth] = useState(false)

  const atHi = Math.abs(x0 - HI) < 0.006
  const atLo = Math.abs(x0 - LO) < 0.006
  const x = atHi ? HI : atLo ? LO : x0
  const th = theta(x)
  const P: [number, number] = [x, Y(x)]
  const P1: [number, number] = [LO, Y(LO)]
  const P2: [number, number] = [HI, Y(HI)]
  const area = integrate(curve, LO, HI)

  const move = (v: number) => {
    setBoth(false)
    setX0(v)
  }

  let notice
  if (both) {
    notice = (
      <Notice tone="good">
        <b>The two orange triangles have the same area</b>: one is <M>2\sqrt3</M> wide and <M>2</M> tall, the other{' '}
        <M>2</M> wide and <M>2\sqrt3</M> tall. So when c.i&apos;s antiderivative is evaluated at the two limits and
        subtracted, the <M>2\sqrt3</M> terms cancel: the area
        under the circle between the two orange verticals equals just the violet wedge between the two radii, angle <M>{'\\tfrac\\pi3-\\tfrac\\pi6=\\tfrac\\pi6'}</M>, area{' '}
        <M>{'\\tfrac12\\cdot4^2\\cdot\\tfrac\\pi6=\\tfrac{4\\pi}{3}'}</M>. The blue curve is the question&apos;s: the
        circle squashed vertically by <M>{'\\tfrac{\\sqrt3}{6}'}</M>, so{' '}
        <M>{'A=\\tfrac{\\sqrt3}{6}\\cdot\\tfrac{4\\pi}{3}=\\tfrac{2\\sqrt3\\,\\pi}{9}'}</M>.
      </Notice>
    )
  } else if (atHi) {
    notice = (
      <Notice>
        The quarter-circle arc is<M>{'y=\\sqrt{-x^2-2x+15}'}</M>, the top of the circle <M>{'(x+1)^2+y^2=16'}</M>, and part
        c.i&apos;s antiderivative is the area under it from <M>-1</M> to <M>x</M>. At the upper limit{' '}
        <M>{'\\sin\\theta=\\tfrac{x+1}{4}=\\tfrac{\\sqrt3}{2}'}</M> (<M>\theta</M> is measured from the vertical), so{' '}
        <M>{'\\theta=\\tfrac\\pi3'}</M>: the violet sector is <M>{'\\tfrac12\\cdot4^2\\cdot\\theta=\\tfrac{8\\pi}{3}'}</M>, the
        arcsin term, and the orange triangle (<M>2\sqrt3</M> wide, <M>2</M> tall) is <M>2\sqrt3</M>, the second term. Now
        press <b>x = 1</b>.
      </Notice>
    )
  } else if (atLo) {
    notice = (
      <Notice>
        At the lower limit <M>{'\\tfrac{x+1}{4}=\\tfrac12'}</M>, so <M>{'\\theta=\\tfrac\\pi6'}</M> and the sector is{' '}
        <M>{'8\\cdot\\tfrac\\pi6=\\tfrac{4\\pi}{3}'}</M>. The triangle is <M>2</M> wide and <M>2\sqrt3</M> tall: area{' '}
        <M>2\sqrt3</M> again, exactly as at the upper limit. Turn on <b>Subtract</b> to see what survives.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Part c.i&apos;s antiderivative belongs to <M>{'y=\\sqrt{-x^2-2x+15}'}</M>, the top of the circle{' '}
        <M>{'(x+1)^2+y^2=16'}</M>. For any <M>x</M>, the area under it from <M>-1</M> to <M>x</M> is the violet sector{' '}
        (<M>{'8\\theta=8\\arcsin\\left(\\tfrac{x+1}{4}\\right)'}</M>) plus the orange triangle (base <M>x+1</M>, height{' '}
        <M>{'\\sqrt{-x^2-2x+15}'}</M>). Drag to <M>x=3</M>: the triangle vanishes and the sector is the whole quarter
        circle, <M>4\pi</M>. Then press the buttons for the question&apos;s limits.
      </Notice>
    )
  }

  const thetaTex = atHi ? '\\tfrac\\pi3' : atLo ? '\\tfrac\\pi6' : `${th.toFixed(3)}`

  return (
    <div>
      <Plane x={[-1.5, 3.5]} y={[0, 4.4]} equalScale height={420}>
        {both ? (
          <>
            <Polygon points={[K, [LO, 0], P1]} color={C.g} fillOpacity={0.2} weight={2} />
            <Polygon points={[K, [HI, 0], P2]} color={C.g} fillOpacity={0.2} weight={2} />
            <Polygon points={[K, ...arcPts(Math.PI / 6, Math.PI / 3)]} color={C.violet} fillOpacity={0.4} weight={2} />
            <Region top={curve} bottom={() => 0} from={LO} to={HI} color={C.f} opacity={0.5} />
            <Plot.OfX y={curve} domain={[-1, 3]} color={C.f} weight={2.5} />
            <Plot.Parametric xy={marker(0.6)} domain={[Math.PI / 6, Math.PI / 3]} color={C.violet} weight={2} />
            <Label at={[-1 + 1.1 * Math.SQRT1_2, 1.1 * Math.SQRT1_2]} attach="c" color={C.violet}>
              π/6
            </Label>
            <Label at={[(LO + HI) / 2, 0.38]} attach="c" color={C.f}>
              A
            </Label>
            <Point x={P1[0]} y={P1[1]} color={C.ink} />
            <Point x={P2[0]} y={P2[1]} color={C.ink} />
          </>
        ) : (
          <>
            {th > 0.001 && <Polygon points={[K, ...arcPts(0, th)]} color={C.violet} fillOpacity={0.3} weight={2} />}
            {x > -0.999 && <Polygon points={[K, [x, 0], P]} color={C.g} fillOpacity={0.32} weight={2} />}
            {th > 0.3 && <Plot.Parametric xy={marker(0.55)} domain={[0, th]} color={C.violet} weight={2} />}
            {th > 0.3 && (
              <Label at={[-1 + 1.05 * Math.sin(th / 2), 1.05 * Math.cos(th / 2)]} attach="c" color={C.violet} size={15}>
                θ
              </Label>
            )}
            <Point x={P[0]} y={P[1]} color={C.ink} />
          </>
        )}
        <Plot.Parametric xy={onCircle} domain={[0, Math.PI / 2]} color={C.ink} weight={2} />
        <Label at={[-1, 4]} attach="nw" color={C.ink}>
          r = 4
        </Label>
        <Point x={K[0]} y={K[1]} color={C.ink} />
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={move} min={-1} max={3} step={0.01} />
        <Buttons>
          <ActionButton label="x = 1" onClick={() => move(LO)} />
          <ActionButton label="x = 2√3 − 1" onClick={() => move(HI)} />
          <Toggle
            label="Subtract: both limits"
            checked={both}
            onChange={v => {
              setBoth(v)
              if (v) setX0(HI)
            }}
          />
        </Buttons>
        <Readouts>
          {both ? (
            <>
              <Readout color={C.violet} tex="\text{sectors: } \tfrac{8\pi}{3}-\tfrac{4\pi}{3}=\tfrac{4\pi}{3}" />
              <Readout color={C.g} tex="\text{triangles: } 2\sqrt3-2\sqrt3=0" />
              <Readout
                color={C.f}
                tex={`A=\\tfrac{\\sqrt3}{6}\\cdot\\tfrac{4\\pi}{3}=\\tfrac{2\\sqrt3\\,\\pi}{9}\\approx ${area.toFixed(3)}`}
              />
            </>
          ) : (
            <>
              <Readout tex={`\\theta=\\arcsin\\left(\\tfrac{x+1}{4}\\right)=${thetaTex}`} />
              <Readout
                color={C.violet}
                tex={`\\text{sector}=8\\theta${atHi ? '=\\tfrac{8\\pi}{3}' : atLo ? '=\\tfrac{4\\pi}{3}' : ''}\\approx ${sector(x).toFixed(3)}`}
              />
              <Readout
                color={C.g}
                tex={`\\text{triangle}${atHi || atLo ? '=2\\sqrt3' : ''}\\approx ${triangle(x).toFixed(3)}`}
              />
              <Readout tex={`\\text{sum}\\approx ${(sector(x) + triangle(x)).toFixed(3)}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
