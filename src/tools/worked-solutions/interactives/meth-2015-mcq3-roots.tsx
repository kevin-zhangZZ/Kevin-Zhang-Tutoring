// 2015 Methods Exam 2 MCQ 3 — which factor puts a root at a negative number b? The paper's
// graph has a simple root at b < 0, a touching root at c and a simple root at d; here c = 1 and
// d = 3 are fixed and b can be slid between −3 and −0.5. Option buttons draw each option's rule with
// those numbers substituted. C lands its roots exactly on b, c, d (grey targets). A (61% of
// students) writes (x + b): with b = −2 that is (x − 2), so its root sits at x = +2, mirrored to the
// wrong side of the origin. B adds upward tails, D is a cubic that crosses at c, and E mirrors c
// and d instead.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const c = 1
const d = 3
const X: [number, number] = [-4, 4.5]
const Y: [number, number] = [-1.4, 1.4]

type Letter = 'A' | 'B' | 'C' | 'D' | 'E'

// Each option as (k, factors), given b. Each factor is [its root, multiplicity, the target it
// stands in for]; a root counts as on target only when it lands on ITS OWN target, so (x + b)
// landing on c or d (b = -1 or -3) still shows red.
function option(letter: Letter, b: number): { k: number; roots: [number, number, number][] } {
  switch (letter) {
    case 'A':
      return { k: -2, roots: [[-b, 1, b], [c, 2, c], [d, 1, d]] }
    case 'B':
      return { k: 2, roots: [[-b, 1, b], [c, 2, c], [d, 1, d]] }
    case 'C':
      return { k: -2, roots: [[b, 1, b], [c, 2, c], [d, 1, d]] }
    case 'D':
      return { k: 2, roots: [[b, 1, b], [c, 1, c], [d, 1, d]] }
    case 'E':
      return { k: -2, roots: [[b, 1, b], [-c, 2, c], [-d, 1, d]] }
  }
}

const fmt = (v: number) => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : v.toFixed(1))
const factor = (r: number, m: number) => {
  const inner = Math.abs(r) < 1e-9 ? 'x' : r > 0 ? `x-${fmt(r)}` : `x+${fmt(-r)}`
  return m === 2 ? `(${inner})^2` : `(${inner})`
}

export default function Roots() {
  const [b, setB] = useState(-2)
  const [letter, setLetter] = useState<Letter>('A')
  const { k, roots } = option(letter, b)
  const raw = (x: number) => roots.reduce((p, [r, m]) => p * (x - r) ** m, k)
  const rootList = [...new Set(roots.map(([r]) => r))].sort((p, q) => p - q)
  // The paper's graph has no vertical scale, so scale each curve to fit: its largest height between
  // its outer roots becomes 1.
  let peak = 0
  const lo = rootList[0]
  const hi = rootList[rootList.length - 1]
  for (let i = 0; i <= 200; i++) peak = Math.max(peak, Math.abs(raw(lo + ((hi - lo) * i) / 200)))
  const y = (x: number) => raw(x) / (peak || 1)

  let notice
  if (letter === 'C') {
    notice = (
      <Notice tone="good">
        <b>Option C hits every target.</b> <M>(x-b)</M> is zero at <M>x=b</M>, wherever <M>b</M> is; <M>{'(x-c)^2'}</M>{' '}
        makes the curve touch at <M>c</M>; and <M>-2</M> sends both ends down. Slide <M>b</M>: the root follows it.
      </Notice>
    )
  } else if (letter === 'A' || letter === 'B') {
    notice = (
      <Notice tone="warn">
        <b>With <M>{`b=${fmt(b)}`}</M>, the factor <M>(x+b)</M> is <M>{factor(-b, 1)}</M></b>, which is zero at{' '}
        <M>{`x=${fmt(-b)}`}</M>, not at <M>b</M>. Slide <M>b</M>: this root is always the mirror image of <M>b</M>{' '}
        across the origin.
        {(Math.abs(-b - c) < 1e-9 || Math.abs(-b - d) < 1e-9) &&
          " Here it happens to land on another root's spot, which still leaves b with no root."}
        {letter === 'B' && ' On top of that, +2 sends both ends of the graph up.'} Now try C.
      </Notice>
    )
  } else if (letter === 'D') {
    notice = (
      <Notice tone="warn">
        <b>Option D is a cubic.</b> With a single <M>(x-c)</M> it <em>crosses</em> the axis at <M>c</M> instead of touching
        it, and its ends go in opposite directions. Now try C.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>Option E makes the sign slip on <M>c</M> and <M>d</M>.</b> <M>{'(x+c)^2'}</M> and <M>(x+d)</M> put the
        roots at <M>-c</M> and <M>-d</M>, so the touching point and the right-hand root jump to the left.
        {(Math.abs(-c - b) < 1e-9 || Math.abs(-d - b) < 1e-9) &&
          " One of them lands on b's spot, but the spots at c and d are left empty."}{' '}
        Now try C.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={X} y={Y} xStep={1} yStep={0.5} height={300} yLabels={false}>
        <Plot.OfX y={y} domain={X} color={letter === 'C' ? C.good : C.f} weight={3} />
        {[b, c, d].map((t, i) => (
          <Point key={i} x={t} y={0} color={C.guide} svgCircleProps={{ r: 5 }} />
        ))}
        <Label at={[b, 0]} attach="n" gap={12} color={C.ink}>b</Label>
        <Label at={[c, 0]} attach="n" gap={12} color={C.ink}>c</Label>
        <Label at={[d, 0]} attach="n" gap={12} color={C.ink}>d</Label>
        {/* hits first, misses on top, so a wrong root sharing a spot with a right one shows red */}
        {[...roots]
          .map(([r, , t]) => ({ r, hit: Math.abs(t - r) < 1e-9 }))
          .sort((p, q) => Number(q.hit) - Number(p.hit))
          .map(({ r, hit }, i) => (
            <Point key={i} x={r} y={0} color={hit ? C.good : C.bad} svgCircleProps={{ r: 3.5 }} />
          ))}
      </Plane>
      <p className="mt-1 text-[12px] text-gray-500 dark:text-gray-400">
        Grey dots: where the graph in the question has its roots. Coloured dots: where the chosen option&apos;s roots
        are — <span className="font-semibold text-emerald-600 dark:text-emerald-400">green</span> on target,{' '}
        <span className="font-semibold text-red-500 dark:text-red-400">red</span> off it. The paper&apos;s graph has no
        vertical scale, so each curve is scaled to fit.
      </p>
      <Controls>
        <Slider label="b" value={b} onChange={setB} min={-3} max={-0.5} step={0.5} format={v => fmt(v).replace('-', '−')} />
        <Buttons>
          {(['A', 'B', 'C', 'D', 'E'] as Letter[]).map(L => (
            <ActionButton key={L} label={L === letter ? `▶ Option ${L}` : `Option ${L}`} onClick={() => setLetter(L)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout
            color={letter === 'C' ? C.good : C.f}
            tex={`y=${k}${roots.map(([r, m]) => factor(r, m)).join('')}`}
          />
          <Readout tex={`\\text{roots at } x=${rootList.map(fmt).join(',\\ ')}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
