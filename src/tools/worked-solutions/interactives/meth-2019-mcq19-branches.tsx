// 2019 Methods Exam 2 MCQ 19 — y = tan(2x) has period π/2, so the interval 0 < x < 5π/4 holds
// two and a half periods: the positive half of a branch on (0, π/4), then two full branches. A
// horizontal line y = d > 0 cuts each branch exactly once, at x = α/2, α/2 + π/2 and α/2 + π
// (α = tan⁻¹ d), so the sum is 3(π + α)/2 whatever d is. A toggle shows the most popular wrong
// answer: stopping after one revolution of 2x (0 < x < π) keeps only the first two solutions,
// which sum to π/2 + α (option D, chosen by 30%).

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle, num } from './kit'

const Q = Math.PI / 4
const END = 5 * Q
const YMAX = 4.5
// Each branch is drawn only where |tan(2x)| ≤ 5, so it stops just short of its asymptote.
const GAP = (Math.PI / 2 - Math.atan(5)) / 2
const BRANCHES: [number, number][] = [
  [0, Q - GAP],
  [Q + GAP, 3 * Q - GAP],
  [3 * Q + GAP, END - GAP],
]
const f = (x: number) => Math.tan(2 * x)

/** Multiples of π/4 as fractions of π. */
function piTick(v: number): string {
  const n = Math.round(v / Q)
  if (Math.abs(v - n * Q) > 1e-6) return ''
  const names: Record<number, string> = { 1: 'π/4', 2: 'π/2', 3: '3π/4', 4: 'π', 5: '5π/4' }
  return names[n] ?? ''
}

export default function Branches() {
  const [d, setD] = useState(1.5)
  const [two, setTwo] = useState(false)

  const a = Math.atan(d)
  const xs = [a / 2, a / 2 + 2 * Q, a / 2 + 4 * Q]
  const sum = xs[0] + xs[1] + xs[2]
  const nearOne = Math.abs(d - 1) < 0.02

  let notice
  if (two) {
    notice = (
      <Notice tone="warn">
        &ldquo;Tan is positive in quadrants 1 and 3&rdquo; gives two answers per revolution of the angle, but here the angle
        is <M>2x</M>, and it goes round <b>more than once</b>: <M>{'0 < 2x < \\tfrac{5\\pi}{2}'}</M>. Stopping at one
        revolution (<M>{'x < \\pi'}</M>) loses the red solution in <M>{'\\left(\\pi,\\tfrac{5\\pi}{4}\\right)'}</M>, and the
        two that are left add to <M>{'\\tfrac{\\pi}{2}+\\alpha'}</M>, which is option D.
      </Notice>
    )
  } else if (nearOne) {
    notice = (
      <Notice tone="good">
        <b>A quick check with a nice value.</b> <M>d = 1</M> gives <M>{'\\alpha = \\tfrac{\\pi}{4}'}</M>, so the solutions
        are <M>{'\\tfrac{\\pi}{8}, \\tfrac{5\\pi}{8}, \\tfrac{9\\pi}{8}'}</M>. They add to <M>{'\\tfrac{15\\pi}{8}'}</M>, and
        option E gives <M>{'\\tfrac{3(\\pi + \\pi/4)}{2} = \\tfrac{15\\pi}{8}'}</M> too.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>y = \tan(2x)</M> repeats every <M>{'\\tfrac{\\pi}{2}'}</M>, half of tan&apos;s usual period. That means{' '}
        <M>{'0 < x < \\tfrac{5\\pi}{4}'}</M> holds two and a half periods: the top half of a branch, then two full branches.
        Each branch climbs from <M>-\infty</M> to <M>\infty</M>, so the line <M>y = d</M> cuts every one of them once.
        Drag <M>d</M>: the three crossings slide, but they always stay <M>{'\\tfrac{\\pi}{2}'}</M> apart. Try <M>d = 1</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, END + 0.2]} y={[-YMAX, YMAX]} xStep={Q} yStep={1} height={330} xLabels={piTick} yLabels={v => (v % 2 === 0 ? String(v) : '')}>
        {two && <Region top={() => YMAX} bottom={() => -YMAX} from={4 * Q} to={END} color={C.bad} opacity={0.1} />}
        {[Q, 3 * Q, END].map(x => (
          <Line.Segment key={x} point1={[x, -YMAX]} point2={[x, YMAX]} color={C.guide} style="dashed" weight={1.5} />
        ))}
        {BRANCHES.map(([lo, hi]) => (
          <Plot.OfX key={lo} y={f} domain={[lo, hi]} color={C.f} weight={3} />
        ))}
        <Line.Segment point1={[0, d]} point2={[END, d]} color={C.g} weight={2.5} />
        <Label at={[Q, d]} color={C.g} attach="ne">y = d</Label>
        {xs.map((x, i) => {
          const lost = two && i === 2
          const col = lost ? C.bad : C.good
          return (
            <g key={i}>
              <Line.Segment point1={[x, 0]} point2={[x, d]} color={col} style="dashed" weight={1.5} />
              <Point x={x} y={d} color={col} />
              <Label at={[x, d]} color={col} attach="nw">{lost ? 'missed' : `x${'₁₂₃'[i]}`}</Label>
            </g>
          )
        })}
        {[0, 1].map(i => (
          <Label key={i} at={[(xs[i] + xs[i + 1]) / 2, d]} color={C.violet} attach="s" size={12}>+π/2</Label>
        ))}
        <Label at={[0.976, f(0.976)]} color={C.f} attach="e">y = tan(2x)</Label>
      </Plane>
      <Controls>
        <Slider label="d" value={d} onChange={setD} min={0.15} max={3.8} step={0.01} />
        <Toggle label="Stop after one revolution of 2x (option D)" checked={two} onChange={setTwo} />
        <Readouts>
          <Readout tex={`\\alpha = \\tan^{-1}(${num(d)}) \\approx ${num(a, 3)}`} />
          <Readout color={C.good} tex={`x_1 = \\tfrac{\\alpha}{2} \\approx ${num(xs[0], 3)}`} />
          <Readout color={C.good} tex={`x_2 = \\tfrac{\\alpha}{2} + \\tfrac{\\pi}{2} \\approx ${num(xs[1], 3)}`} />
          <Readout color={two ? C.bad : C.good} tex={`x_3 = \\tfrac{\\alpha}{2} + \\pi \\approx ${num(xs[2], 3)}`} />
          {two ? (
            <Readout color={C.bad} tex={`x_1 + x_2 = \\tfrac{\\pi}{2} + \\alpha \\approx ${num(xs[0] + xs[1], 3)}`} />
          ) : (
            <Readout color={C.good} tex={`x_1 + x_2 + x_3 \\approx ${num(sum, 3)} = \\tfrac{3(\\pi + \\alpha)}{2}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
