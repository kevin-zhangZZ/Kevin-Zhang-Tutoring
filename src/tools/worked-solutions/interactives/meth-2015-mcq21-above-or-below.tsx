// 2015 Methods Exam 2 MCQ 21 — whether y = mx + c misses y = ax² depends on which side of the
// tangent line of the same gradient it sits. That tangent has y-intercept −m²/(4a) (Δ = 0). For a
// cap (a < 0) lines ABOVE the tangent miss — option D; for a cup (a > 0) lines BELOW it miss, so
// option C (a > 0, c above the tangent) always gives two intersections. Sliders for a, m, c; the
// dashed tangent and the Δ readout show the sign flip that 30% of students missed.

import { useState } from 'react'
import { C, Controls, Label, Notice, Plane, Plot, Point, Readout, Readouts, Slider, M, num } from './kit'

export default function AboveOrBelow() {
  const [a, setA] = useState(1)
  const [m, setM] = useState(1)
  const [c, setC] = useState(1)

  const k = -(m * m) / (4 * a) // y-intercept of the tangent with gradient m
  const disc = m * m + 4 * a * c
  const tangent = Math.abs(disc) < 1e-9
  const roots = disc > 0 ? [(m - Math.sqrt(disc)) / (2 * a), (m + Math.sqrt(disc)) / (2 * a)] : tangent ? [m / (2 * a)] : []
  const above = c > k + 1e-9
  const count = roots.length
  // Label the dashed tangent away from the axes (and their tick labels), at a point still on screen.
  const tx = [-2.5, 2.5, -1.5, 1.5].find(x => Math.abs(m * x + k) <= 5 && Math.abs(m * x + k) >= 0.8) ?? -2.5

  let notice
  if (tangent) {
    notice = (
      <Notice>
        <b>The line just touches the parabola</b>: <M>\Delta = 0</M>, so <M>{'c = -\\tfrac{m^2}{4a}'}</M> exactly. Move{' '}
        <M>c</M> either way to see which side misses.
      </Notice>
    )
  } else if (a > 0 && above) {
    notice = (
      <Notice tone="warn">
        <b>This is option C</b>: <M>a {'>'} 0</M> and <M>{'c > -\\tfrac{m^2}{4a}'}</M>. The line is above the dashed
        tangent, so it cuts the cup twice — <M>\Delta {'>'} 0</M> for every such <M>m</M> and <M>c</M>. Drag <M>c</M>{' '}
        below the tangent to make it miss.
      </Notice>
    )
  } else if (a > 0) {
    notice = (
      <Notice tone="good">
        <b>No intersection</b>: for a cup (<M>a {'>'} 0</M>) the line must sit <em>below</em> its tangent,{' '}
        <M>{'c < -\\tfrac{m^2}{4a}'}</M> — not an option. Now drag <M>a</M> negative to turn the cup into a cap.
      </Notice>
    )
  } else if (above) {
    notice = (
      <Notice tone="good">
        <b>Option D</b>: <M>a {'<'} 0</M> and <M>{'c > -\\tfrac{m^2}{4a}'}</M>. The line is above the cap&apos;s
        tangent, so it misses for every gradient <M>m</M> — try changing <M>m</M>; the tangent moves with it.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        For a cap (<M>a {'<'} 0</M>) a line <em>below</em> its tangent cuts it twice. Raise <M>c</M> above the dashed
        tangent to make it miss.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-4, 4]} y={[-6, 6]} xStep={1} yStep={2} height={320} label="Graph of y = ax² and the line y = mx + c">
        <Plot.OfX y={x => a * x * x} color={C.f} weight={3} />
        <Plot.OfX y={x => m * x + k} color={C.guide} style="dashed" weight={2} />
        <Plot.OfX y={x => m * x + c} color={C.g} weight={3} />
        {roots.map((x, i) => (
          <Point key={i} x={x} y={m * x + c} color={C.bad} />
        ))}
        <Point x={0} y={k} color={C.guide} />
        <Point x={0} y={c} color={C.g} />
        <Label at={[0, c]} color={C.g} attach={above ? 'nw' : 'sw'}>c</Label>
        <Label at={[tx, m * tx + k]} color={C.guide} attach={above ? 's' : 'n'}>tangent</Label>
        <Label at={[Math.min(3.3, Math.sqrt(4.5 / Math.abs(a))), a * Math.min(3.3, Math.sqrt(4.5 / Math.abs(a))) ** 2]} color={C.f} attach="e">y = ax²</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={v => setA(v === 0 ? (a > 0 ? -0.5 : 0.5) : v)} min={-2} max={2} step={0.5} />
        <Slider label="m" value={m} onChange={setM} min={-3} max={3} step={0.5} />
        <Slider label="c" value={c} onChange={setC} min={-5} max={5} step={0.25} />
        <Readouts>
          <Readout color={C.guide} tex={`\\text{tangent: } -\\tfrac{m^2}{4a} = ${num(k)}`} />
          <Readout tex={`\\Delta = m^2 + 4ac = ${num(disc)}`} />
          <Readout color={count ? C.bad : C.good} tex={`\\text{intersections: } ${count}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
