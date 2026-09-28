// 2018 Methods Exam 2 MCQ 14 — independence as an area model. The unit square is the whole sample
// space; A is a vertical strip of width p and B a horizontal strip of height 2p, so they cross in a
// p × 2p rectangle: Pr(A ∩ B) = Pr(A)Pr(B) is exactly what independence means. The shaded L-shape
// is the union, p + 2p − 2p². Slide p (or try each option) until the union covers 0.52: only
// p = 0.2 works. The graph beside it plots the same union against p: the equation also has the
// root p = 1.3, but anything past p = 0.5 would make Pr(B) = 2p > 1, so that root is impossible.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle } from './kit'

const TARGET = 0.52
const union = (p: number) => 3 * p - 2 * p * p
/** Up to 4 decimal places, trailing zeros dropped. */
const d = (v: number) => String(Math.round(v * 10000) / 10000)

const X0 = 14
const Y0 = 10
const S = 210
const VW = X0 + S + 40
const VH = Y0 + S + 30

function Square({ p }: { p: number }) {
  const aw = p * S // width of A
  const bh = 2 * p * S // height of B
  const bTop = Y0 + S - bh
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-[300px] mx-auto block" role="img" aria-label="Unit square with events A and B as crossing strips">
      <rect x={X0} y={Y0} width={S} height={S} fill="none" stroke={C.guide} strokeWidth={1.5} />
      <rect x={X0} y={Y0} width={aw} height={S} fill={C.f} fillOpacity={0.3} />
      <rect x={X0} y={bTop} width={S} height={bh} fill={C.g} fillOpacity={0.3} />
      <rect x={X0} y={bTop} width={aw} height={bh} fill={C.violet} fillOpacity={0.25} stroke={C.violet} strokeWidth={2.5} />
      {aw > 16 && bTop - Y0 > 24 && (
        <text x={X0 + aw / 2} y={Y0 + (bTop - Y0) / 2 + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill={C.f}>
          A
        </text>
      )}
      {bh > 18 && S - aw > 30 && (
        <text x={X0 + aw + (S - aw) / 2} y={bTop + bh / 2 + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill={C.g}>
          B
        </text>
      )}
      {aw > 44 && bh > 30 && (
        <text x={X0 + aw / 2} y={bTop + bh / 2 + 4} textAnchor="middle" fontSize={11.5} fontWeight={700} fill={C.violet}>
          A ∩ B
        </text>
      )}
      {/* width of A along the bottom, height of B up the right side */}
      <line x1={X0} y1={Y0 + S + 8} x2={X0 + aw} y2={Y0 + S + 8} stroke={C.f} strokeWidth={2} />
      <text x={X0 + Math.max(aw / 2, 22)} y={Y0 + S + 24} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.f}>
        {`p = ${d(p)}`}
      </text>
      <line x1={X0 + S + 8} y1={bTop} x2={X0 + S + 8} y2={Y0 + S} stroke={C.g} strokeWidth={2} />
      <text x={X0 + S + 12} y={Math.min(bTop + bh / 2 + 4, Y0 + S - 4)} fontSize={12} fontWeight={600} fill={C.g}>
        2p
      </text>
      <text x={X0 + S - 4} y={Y0 + 14} textAnchor="end" fontSize={11} className="fill-gray-500 dark:fill-gray-400">
        whole square: area 1
      </text>
    </svg>
  )
}

export default function IndependenceSquare() {
  const [p, setP] = useState(0.3)
  const u = union(p)
  const hit = Math.abs(p - 0.2) < 1e-9
  const opts: [string, number][] = [['A', 0.1], ['B', 0.2], ['C', 0.3], ['D', 0.4], ['E', 0.5]]
  const opt = opts.find(([, v]) => Math.abs(v - p) < 1e-9)?.[0]

  let notice
  if (hit) {
    notice = (
      <Notice tone="good">
        The overlap is a <M>0.2\times0.4</M> rectangle, area <M>0.08</M>: crossing strips like this is what
        independence means, <M>{'\\Pr(A\\cap B)=\\Pr(A)\\Pr(B)'}</M>. The union is <M>0.2+0.4-0.08=0.52</M> ✓. On the
        graph the same equation has a second solution, <M>p=1.3</M>, but it sits in the red zone where{' '}
        <M>{'\\Pr(B)=2p>1'}</M>. The slider cannot even reach it, and neither can a probability.
      </Notice>
    )
  } else if (opt === 'D') {
    notice = (
      <Notice tone="warn">
        At <M>p=0.4</M> (option D) the union is <M>0.4+0.8-0.32=0.88</M>, far more than <M>0.52</M>. The{' '}
        <M>0.4</M> in the real answer is <M>{'\\Pr(B)'}</M>, not <M>{'\\Pr(A)'}</M>. Press option B.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        {opt ? <>Option {opt}: </> : null}the shaded L-shape covers <M>{d(u)}</M> of the square, which is{' '}
        {u > TARGET ? 'too much' : 'too little'}. Notice the violet overlap is counted once, which is why{' '}
        <M>2p^2</M> is subtracted from <M>p+2p</M>. Slide <M>p</M> {u > TARGET ? 'down' : 'up'} until the union is
        exactly <M>0.52</M>, or try each option button.
      </Notice>
    )
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 items-center">
        <Square p={p} />
        <Plane x={[0, 1.75]} y={[0, 1.25]} xStep={0.5} yStep={0.25} height={270} xLabel="p" yLabel="" xLabels={v => (v > 1.6 ? '' : d(v))} yLabels={v => (v === 1 ? d(v) : '')}>
          <Region top={() => 1.25} bottom={() => 0} from={0.5} to={1.75} color={C.bad} opacity={0.08} />
          <Label at={[1.0, 0.2]} attach="c" color={C.bad} size={12}>
            Pr(B) = 2p &gt; 1
          </Label>
          <Line.Segment point1={[0, TARGET]} point2={[1.75, TARGET]} color={C.violet} style="dashed" weight={1.5} />
          <Label at={[0.85, TARGET]} attach="s" color={C.violet} size={12}>
            union = 0.52
          </Label>
          <Plot.OfX y={union} domain={[0.5, 1.5]} color={C.f} weight={2} style="dashed" />
          <Plot.OfX y={union} domain={[0, 0.5]} color={C.f} weight={3} />
          <Point x={0.2} y={TARGET} color={C.good} />
          <Label at={[0.2, TARGET]} attach="se" color={C.good} size={12}>
            0.2
          </Label>
          <Point x={1.3} y={TARGET} color={C.bad} />
          <Label at={[1.3, TARGET]} attach="ne" color={C.bad} size={12}>
            1.3
          </Label>
          <Line.Segment point1={[p, 0]} point2={[p, u]} color={C.guide} style="dashed" weight={1.2} />
          <Point x={p} y={u} color={C.f} />
        </Plane>
      </div>
      <Controls>
        <Slider label="p = \Pr(A)" value={p} onChange={v => setP(Math.round(v * 100) / 100)} min={0.01} max={0.5} step={0.01} format={v => v.toFixed(2)} />
        <Buttons>
          {opts.map(([L, v]) => (
            <Toggle key={L} label={`${L}: ${v}`} checked={opt === L} onChange={() => setP(v)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout tex={`\\Pr(A\\cap B)=${d(p)}\\times${d(2 * p)}=${d(2 * p * p)}`} color={C.violet} />
          <Readout tex={`\\Pr(A\\cup B)=${d(p)}+${d(2 * p)}-${d(2 * p * p)}=${d(u)}`} color={hit ? C.good : undefined} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
