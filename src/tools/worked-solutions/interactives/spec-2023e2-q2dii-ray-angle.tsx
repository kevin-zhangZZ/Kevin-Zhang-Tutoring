// 2023 Specialist Exam 2 Q2d.ii — in Arg(z − 1) = θ, the angle θ is measured anticlockwise from
// the positive real direction at the ray's starting point z = 1. Turn the ray from z = 1 in steps
// of π/14: it starts at the report's common wrong answer 5π/14, which heads up and to the right
// and misses cis(2π/7). The violet angle is the isosceles triangle's base angle 5π/14, measured
// from the direction back towards O; the orange θ and the violet angle make a straight angle, so
// the ray hits cis(2π/7) only at θ = π − 5π/14 = 9π/14.

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider } from './kit'

const WX = Math.cos((2 * Math.PI) / 7)
const WY = Math.sin((2 * Math.PI) / 7)
const BASE = (5 * Math.PI) / 14 // the triangle's angle at z = 1
const HIT = 9 // θ = 9π/14 is the ray through cis(2π/7)
const WRONG = 5 // the report's common incorrect angle 5π/14
const LEN = 1.45

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

/** k·π/14 in lowest terms, as TeX (\tfrac) or as plain text for the slider. */
function piOver14(k: number, tex: boolean): string {
  if (k === 0) return '0'
  const g = gcd(k, 14)
  const n = k / g
  const d = 14 / g
  const top = n === 1 ? (tex ? '\\pi' : 'π') : tex ? `${n}\\pi` : `${n}π`
  if (d === 1) return top
  return tex ? `\\tfrac{${top}}{${d}}` : `${top}/${d}`
}

export default function RayAngle() {
  const [k, setK] = useState(WRONG)
  const theta = (k * Math.PI) / 14
  const hit = k === HIT
  const rayColor = hit ? C.good : C.g
  const end: [number, number] = [1 + LEN * Math.cos(theta), LEN * Math.sin(theta)]

  let notice
  if (hit) {
    notice = (
      <Notice tone="good">
        <b>The ray passes through <M>{'\\mathrm{cis}\\left(\\tfrac{2\\pi}{7}\\right)'}</M>.</b> The orange angle{' '}
        <M>\theta</M> (from the positive real direction) and the violet angle <M>{'\\tfrac{5\\pi}{14}'}</M> (from the
        direction back to <M>O</M>) sit side by side on a straight line, so they add to <M>\pi</M>. That is why{' '}
        <M>{'\\theta = \\pi - \\tfrac{5\\pi}{14} = \\tfrac{9\\pi}{14}'}</M>.
      </Notice>
    )
  } else if (k === WRONG) {
    notice = (
      <Notice tone="warn">
        <M>{'\\theta = \\tfrac{5\\pi}{14}'}</M> was the common wrong answer. It is the triangle&apos;s angle at{' '}
        <M>z = 1</M>, but that angle is measured from the direction <em>back towards</em> <M>O</M> (pointing left). Arg
        is measured from the positive real direction (pointing right), so this ray heads up and to the right and misses
        the point. Slide <M>\theta</M> until the ray hits it.
      </Notice>
    )
  } else if (k <= 7) {
    notice = (
      <Notice>
        At <M>{`\\theta = ${piOver14(k, true)}`}</M> the ray does not point to the left at all, but{' '}
        <M>{'\\mathrm{cis}\\left(\\tfrac{2\\pi}{7}\\right)'}</M> is up and to the <em>left</em> of <M>z = 1</M>: its
        real part <M>{'\\cos\\tfrac{2\\pi}{7} \\approx 0.62'}</M> is less than 1. So <M>\theta</M> must be between{' '}
        <M>{'\\tfrac{\\pi}{2}'}</M> and <M>\pi</M>. Keep sliding.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At <M>{`\\theta = ${piOver14(k, true)}`}</M> the ray points up and to the left, but it passes{' '}
        {k < HIT ? 'above' : 'below'} the point. The ray hits the point only when the orange and violet angles
        together make a straight angle <M>\pi</M>. {k < HIT ? 'Increase' : 'Decrease'} <M>\theta</M> to find it.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.15, 1.75]} y={[-1.1, 1.35]} xStep={1} yStep={1} equalScale height={360} xLabel="" yLabel="Im(z)">
        <Label at={[1.62, 0]} attach="n" size={13} italic gap={5}>
          Re(z)
        </Label>
        <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} weight={1.5} />
        {/* The isosceles triangle O, 1, cis(2π/7) and its base angle at z = 1. */}
        <Polygon points={[[0, 0], [1, 0], [WX, WY]]} color={C.violet} fillOpacity={0.08} weight={1.5} strokeStyle="dashed" />
        <Plot.Parametric
          xy={t => [1 + 0.2 * Math.cos(t), 0.2 * Math.sin(t)]}
          domain={[Math.PI - BASE, Math.PI]}
          color={C.violet}
          weight={2.5}
        />
        <Label at={[1 + 0.27 * Math.cos(Math.PI - BASE / 2), 0.27 * Math.sin(Math.PI - BASE / 2)]} color={C.violet} attach="nw" gap={2} size={12}>
          5π/14
        </Label>
        {/* θ, from the positive real direction at z = 1. */}
        {k > 0 && (
          <Plot.Parametric xy={t => [1 + 0.34 * Math.cos(t), 0.34 * Math.sin(t)]} domain={[0, theta]} color={rayColor} weight={2.5} />
        )}
        {k > 0 && (
          <Label at={[1 + 0.4 * Math.cos(theta / 2), 0.4 * Math.sin(theta / 2)]} color={rayColor} attach="ne" gap={2} size={13} italic>
            θ
          </Label>
        )}
        <Line.Segment point1={[1, 0]} point2={end} color={rayColor} weight={3} />
        <Point x={0} y={0} color={C.ink} />
        <Label at={[0, 0]} attach="sw" size={12} italic>
          O
        </Label>
        <Point x={WX} y={WY} color={C.f} />
        <Label at={[WX, WY]} attach="e" color={C.f} size={12}>
          cis(2π/7)
        </Label>
        <Circle center={[1, 0]} radius={0.035} color={rayColor} fillOpacity={0} weight={2.5} />
      </Plane>
      <Controls>
        <Slider label="\theta" value={k} onChange={setK} min={0} max={14} step={1} format={v => piOver14(v, false)} />
        <Readouts>
          <Readout color={rayColor} tex={`\\mathrm{Arg}(z-1) = ${piOver14(k, true)}`} />
          <Readout
            color={hit ? C.good : C.bad}
            tex={hit ? '\\text{passes through } \\mathrm{cis}\\left(\\tfrac{2\\pi}{7}\\right)\\ \\checkmark' : '\\text{misses } \\mathrm{cis}\\left(\\tfrac{2\\pi}{7}\\right)'}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
