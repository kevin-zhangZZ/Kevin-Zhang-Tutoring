// 2021 Specialist Exam 1 Q4b — y = sin(kx) is y = sin(x) dilated by 1/k from the y-axis, so the
// solid is part a's solid squashed along the x-axis. Both solids are drawn as the same 8 discs
// (midpoint radii): slide k and every disc keeps its radius, since sin(k · x/k) = sin(x), but its
// thickness π/8 becomes π/(8k). So every disc volume πr²Δx is divided by k, and so is the total:
// V = V_s/k. k < 1 stretches the arch instead and the volume grows. The total readout is computed
// by integrating π sin²(kx) from 0 to π/k, and agrees with π²/(2k) = V_s/k from the working.

import { useState, type ReactNode } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Polygon, Readout, Readouts, Slider,
  integrate, usePlayer,
} from './kit'

const N = 8
const VS = (Math.PI * Math.PI) / 2
const HALF_PI = Math.PI / 2
const X: [number, number] = [-0.3, 6.6]
const Y: [number, number] = [-1.25, 1.35]

// x tick numbers as multiples of π/2
const piTicks = (v: number) => {
  const n = Math.round(v / HALF_PI)
  if (n <= 0 || Math.abs(v - n * HALF_PI) > 1e-6) return ''
  if (n === 1) return 'π/2'
  if (n === 2) return 'π'
  return n % 2 === 0 ? `${n / 2}π` : `${n}π/2`
}

/** Radius of disc i (0-based): sin at the midpoint of its slice of part a's arch. */
const radius = (i: number) => Math.sin(((i + 0.5) * Math.PI) / N)

/** The solid of y = sin(kx) over [0, π/k], drawn side-on as N discs; disc j (1-based) highlighted. */
function Solid({ k, j, color }: { k: number; j: number; color: string }) {
  const end = Math.PI / k
  const dx = end / N
  const rect = (i: number): [number, number][] => {
    const r = radius(i)
    return [[i * dx, -r], [(i + 1) * dx, -r], [(i + 1) * dx, r], [i * dx, r]]
  }
  return (
    <>
      {Array.from({ length: N }, (_, i) =>
        i === j - 1 ? null : <Polygon key={i} points={rect(i)} color={color} fillOpacity={0.14} weight={1} />,
      )}
      <Plot.OfX y={x => Math.sin(k * x)} domain={[0, end]} color={color} weight={2.5} />
      <Plot.OfX y={x => -Math.sin(k * x)} domain={[0, end]} color={color} weight={1.5} style="dashed" />
      <Polygon points={rect(j - 1)} color={C.violet} fillOpacity={0.5} weight={2} />
    </>
  )
}

function Caption({ children }: { children: ReactNode }) {
  return <div className="text-[12.5px] font-semibold text-gray-500 dark:text-gray-400 mb-1">{children}</div>
}

export default function Squash() {
  const [k, setK] = useState(2)
  const [j, setJ] = useState(3)
  const player = usePlayer(setK, { min: 0.5, max: 4, seconds: 7 })

  const r = radius(j - 1)
  const dxA = Math.PI / N
  const dxB = Math.PI / (N * k)
  const discA = Math.PI * r * r * dxA
  const discB = Math.PI * r * r * dxB
  const V = Math.PI * integrate(x => Math.sin(k * x) ** 2, 0, Math.PI / k, 400)
  const end = Math.PI / k
  const one = Math.abs(k - 1) < 0.026

  // label for y = sin(kx): beside the arch while there's room, otherwise above its peak
  const kLabel =
    end < 4.2 ? (
      <Label at={[end + 0.12, 0.55]} attach="e" color={C.g}>y = sin(kx)</Label>
    ) : (
      <Label at={[end / 2, 1]} attach="n" color={C.g}>y = sin(kx)</Label>
    )

  let notice
  if (one) {
    notice = (
      <Notice>
        At <M>k = 1</M> the two pictures are identical: this is part a&apos;s solid, with{' '}
        <M>{'V_s = \\tfrac{\\pi^2}{2}'}</M>. Drag <M>k</M> up to 2 (or press play) and watch the purple disc: it
        still reaches the dashed line, and only gets thinner.
      </Notice>
    )
  } else if (k > 1) {
    notice = (
      <Notice tone="good">
        Disc {j} keeps its radius (it still reaches the dashed line), because{' '}
        <M>{'\\sin\\left(k\\cdot\\tfrac{x}{k}\\right) = \\sin(x)'}</M>. Only its thickness changes, from{' '}
        <M>{'\\tfrac{\\pi}{8}'}</M> to <M>{'\\tfrac{\\pi}{8k}'}</M>, so every disc volume <M>{'\\pi r^2\\,\\Delta x'}</M>{' '}
        is divided by <M>k</M>, and so is the total: <M>{'V = \\tfrac{V_s}{k}'}</M>. Only the <M>x</M>-direction is
        squashed, so it is <M>{'\\tfrac1k'}</M>, not <M>{'\\tfrac1{k^2}'}</M> or <M>{'\\tfrac1{k^3}'}</M>, and the
        answer goes in terms of <M>V_s</M>, as the question asks.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now <M>{'k < 1'}</M>, so the arch is <b>stretched</b>: the same discs are thicker,{' '}
        <M>{'\\tfrac{\\pi}{8k} > \\tfrac{\\pi}{8}'}</M>, and the volume grows. The rule <M>{'V = \\tfrac{V_s}{k}'}</M>{' '}
        still holds: dividing by a number less than 1 makes it bigger. It works for every positive <M>k</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Caption>Part a: y = sin(x), the arch from 0 to π</Caption>
      <Plane x={X} y={Y} xStep={HALF_PI} yStep={1} height={170} xLabels={piTicks}>
        <Line.Segment point1={[0, r]} point2={[X[1], r]} color={C.violet} style="dashed" weight={1} />
        <Solid k={1} j={j} color={C.f} />
        <Label at={[Math.PI + 0.12, 0.55]} attach="e" color={C.f}>y = sin(x)</Label>
      </Plane>
      <div className="mt-3" />
      <Caption>
        Part b: y = sin(kx), k = {k.toFixed(2)}: the arch from 0 to π/k ≈ {end.toFixed(2)}
      </Caption>
      <Plane x={X} y={Y} xStep={HALF_PI} yStep={1} height={170} xLabels={piTicks}>
        <Line.Segment point1={[0, r]} point2={[X[1], r]} color={C.violet} style="dashed" weight={1} />
        <Solid k={k} j={j} color={C.g} />
        {kLabel}
      </Plane>
      <Controls>
        <Slider
          label="k"
          value={k}
          onChange={v => {
            player.stop()
            setK(v)
          }}
          min={0.5}
          max={4}
          step={0.05}
        />
        <Slider label="\text{disc}" value={j} onChange={setJ} min={1} max={N} step={1} format={v => `${v} of ${N}`} />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(k)} label="Squash the arch" />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`r_{${j}} = ${r.toFixed(3)}\\ \\text{in both}`} />
          <Readout tex={`\\Delta x:\\ ${dxA.toFixed(3)} \\to ${dxB.toFixed(3)}`} />
          <Readout tex={`\\pi r^2\\,\\Delta x:\\ ${discA.toFixed(3)} \\to ${discB.toFixed(3)}`} />
          <Readout color={C.good} tex={`V = \\pi\\int_0^{\\pi/k}\\sin^2(kx)\\,dx \\approx ${V.toFixed(3)}`} />
          <Readout tex={`\\tfrac{V_s}{k} = \\tfrac{${VS.toFixed(3)}}{${k.toFixed(2)}} \\approx ${(VS / k).toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
