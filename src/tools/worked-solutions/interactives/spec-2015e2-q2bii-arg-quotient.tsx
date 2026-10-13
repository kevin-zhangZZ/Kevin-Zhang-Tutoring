// 2015 Specialist Exam 2 Q2b.ii — z₁/z₂ = 2cis(α) ÷ 2cis(−α) = cis(2α): dividing subtracts the
// arguments, so the angle from z₂ to z₁ is the argument of the quotient. Slide α (steps of π/72)
// until the green quotient on the unit circle reaches the 5π/6 ray: α = 5π/12, not 5π/6 (that is
// 2α) — the report lists 5π/6 and −5π/12 as common errors. Since 0 < α < π/2, 2α stays in (0, π),
// already a principal argument. A toggle swaps which root is z₁: the quotient becomes cis(−2α),
// below the axis, and the question's modulus signs make |Arg| = 2α either way.

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const N = 72
const TARGET = 30 // 30π/72 = 5π/12
const T = (5 * Math.PI) / 6

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}
function fracText(k: number): string {
  const g = gcd(k, N)
  const n = k / g
  const d = N / g
  return `${n === 1 ? '' : n}π${d === 1 ? '' : `/${d}`}`
}
function fracTex(k: number): string {
  const g = gcd(Math.abs(k), N)
  const n = Math.abs(k) / g
  const d = N / g
  const s = k < 0 ? '-' : ''
  if (d === 1) return `${s}${n === 1 ? '' : n}\\pi`
  return `${s}\\tfrac{${n === 1 ? '' : n}\\pi}{${d}}`
}

export default function ArgQuotient() {
  const [k, setK] = useState(12)
  const [swap, setSwap] = useState(false)

  const a = (k * Math.PI) / N
  const s = swap ? -1 : 1
  const z1: [number, number] = [2 * Math.cos(a), 2 * s * Math.sin(a)]
  const z2: [number, number] = [2 * Math.cos(a), -2 * s * Math.sin(a)]
  const w: [number, number] = [Math.cos(2 * a), s * Math.sin(2 * a)]
  const hit = k === TARGET

  let notice
  if (swap) {
    notice = (
      <Notice>
        <b>With the labels swapped</b>, <M>{'z_1 = 2\\,\\mathrm{cis}(-\\alpha)'}</M> and the quotient is{' '}
        <M>{'\\mathrm{cis}(-2\\alpha)'}</M>, below the axis: <M>{'\\mathrm{Arg} = -2\\alpha'}</M>. The question&apos;s modulus
        signs make <M>{'|\\mathrm{Arg}| = 2\\alpha'}</M> either way, so the answer for <M>\alpha</M> doesn&apos;t depend on
        which root you call <M>{'z_1'}</M>.
      </Notice>
    )
  } else if (hit) {
    notice = (
      <Notice tone="good">
        <b>The quotient is on the <M>{'\\tfrac{5\\pi}6'}</M> ray when <M>{'\\alpha = \\tfrac{5\\pi}{12}'}</M>.</b> It is{' '}
        <M>2\alpha</M>, not <M>\alpha</M>, that equals <M>{'\\tfrac{5\\pi}6'}</M>. And <M>{'-\\tfrac{5\\pi}{12}'}</M> is not
        allowed: the slider never goes below <M>0</M>, because the question says <M>{'0<\\alpha<\\tfrac\\pi2'}</M>. Now try the
        toggle.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Dividing subtracts arguments: <M>{'\\alpha - (-\\alpha) = 2\\alpha'}</M>, the violet angle from <M>{'z_2'}</M> up to{' '}
        <M>{'z_1'}</M>. The green quotient sits at that same angle, measured from the real axis (small green arc), on the unit circle. Since <M>{'\\alpha<\\tfrac\\pi2'}</M>,{' '}
        <M>{'2\\alpha<\\pi'}</M>, so no <M>2\pi</M> adjustment is ever needed. Slide <M>\alpha</M> until the green point
        reaches the dashed <M>{'\\tfrac{5\\pi}6'}</M> ray.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.6, 2.6]} y={[-2.4, 2.4]} equalScale height={380} xLabel="" xLabels={false} yLabel="Im" yLabels={false}>
        <Label at={[2.6, 0]} attach="nw" size={14} italic>Re</Label>
        <Circle center={[0, 0]} radius={2} color={C.guide} fillOpacity={0} strokeStyle="dashed" weight={1} />
        <Circle center={[0, 0]} radius={1} color={C.good} fillOpacity={0} strokeStyle="dashed" weight={1} />
        <Line.Segment point1={[0, 0]} point2={[2.4 * Math.cos(T), 2.4 * Math.sin(T)]} color={C.guide} style="dashed" weight={2} />
        <Label at={[2.4 * Math.cos(T), 2.4 * Math.sin(T)]} color={C.guide} attach="s" size={12}>5π/6</Label>
        <Line.Segment point1={[0, 0]} point2={z1} color={C.f} weight={2} />
        <Line.Segment point1={[0, 0]} point2={z2} color={C.g} weight={2} />
        <Plot.Parametric
          xy={t => [1.45 * Math.cos(t), 1.45 * Math.sin(t)]}
          domain={[-a, a]}
          color={C.violet}
          weight={2.5}
        />
        <Label at={[1.45 * Math.cos(a / 2), 1.45 * Math.sin(a / 2)]} color={C.violet} attach="ne" size={13}>2α</Label>
        <Plot.Parametric xy={t => [0.6 * Math.cos(t), 0.6 * Math.sin(t)]} domain={swap ? [-2 * a, 0] : [0, 2 * a]} color={C.good} weight={2} />
        <Line.Segment point1={[0, 0]} point2={[1.2, 0]} color={C.good} style="dashed" weight={1.5} />
        <Line.Segment point1={[0, 0]} point2={w} color={C.good} weight={2.5} />
        <Point x={z1[0]} y={z1[1]} color={C.f} />
        <Point x={z2[0]} y={z2[1]} color={C.g} />
        <Point x={w[0]} y={w[1]} color={C.good} />
        <Label at={z1} color={C.f} attach={swap ? 'se' : 'ne'} size={14}>z₁</Label>
        <Label at={z2} color={C.g} attach={swap ? 'ne' : 'se'} size={14}>z₂</Label>
        <Label at={w} color={C.good} attach={w[0] < -0.1 ? 'nw' : 'e'} size={13}>z₁/z₂</Label>
      </Plane>
      <Controls>
        <Slider label="\alpha" value={k} onChange={setK} min={1} max={N / 2 - 1} step={1} format={fracText} />
        <Toggle label="Swap which root is z₁" checked={swap} onChange={setSwap} />
        <Readouts>
          <Readout color={C.f} tex={`\\mathrm{Arg}(z_1) = ${fracTex(s * k)}`} />
          <Readout color={C.g} tex={`\\mathrm{Arg}(z_2) = ${fracTex(-s * k)}`} />
          <Readout color={C.good} tex={`\\mathrm{Arg}\\left(\\tfrac{z_1}{z_2}\\right) = ${fracTex(2 * s * k)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
