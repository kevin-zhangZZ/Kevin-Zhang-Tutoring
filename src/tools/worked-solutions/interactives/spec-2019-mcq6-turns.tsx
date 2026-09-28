// 2019 Specialist Exam 2 MCQ 6 — why Arg(z⁵/w⁴) = −π/2. Only directions matter, so z and w are drawn
// as their directions: Arg z = π/2, Arg w = π/4. Each factor of z turns the arrow a quarter-turn
// anticlockwise (blue spiral) and each division by w turns it back π/4 clockwise (orange spiral).
// Slide m (the power of z) and k (the power of w): the total turn is m·π/2 − k·π/4. At m = 5, k = 0
// the arrow has turned 5π/2, more than a full turn, and points straight up again (Arg z⁵ = π/2, not
// 5π/2, option D). Dividing by w four times turns it back π, half a turn, so it points straight down:
// 5π/2 − π = 3π/2 → 3π/2 − 2π = −π/2 (option A). The faint orange arrow is w^k on its own: w⁴ points
// along the negative real axis, and dividing by a negative real number reverses the direction, which
// is why π/2 (option B) can't be right.

import { useState } from 'react'
import { C, Circle, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Vector } from './kit'

const SUP = ['⁰', '¹', '²', '³', '⁴', '⁵']
const R0 = 0.42
const GROW = 0.1
const ARROW = 1.85

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

/** q·π/4 as TeX, reduced. */
function piTex(q: number): string {
  if (q === 0) return '0'
  const g = gcd(Math.abs(q), 4)
  const num = q / g
  const den = 4 / g
  const sign = num < 0 ? '-' : ''
  const a = Math.abs(num)
  if (den === 1) return `${sign}${a === 1 ? '' : a}\\pi`
  return `${sign}\\tfrac{${a === 1 ? '' : a}\\pi}{${den}}`
}

/** Reduce q (in units of π/4) into the principal range (−π, π], i.e. (−4, 4]. */
const principal = (q: number) => q - 8 * Math.ceil((q - 4) / 8)

export default function TurnsWidget() {
  const [m, setM] = useState(5)
  const [k, setK] = useState(0)

  const up = (m * Math.PI) / 2 // anticlockwise turn from the z factors
  const back = (k * Math.PI) / 4 // clockwise turn from dividing by w
  const q = 2 * m - k // total, in units of π/4
  const p = principal(q)
  const theta = (q * Math.PI) / 4
  const tip: [number, number] = [ARROW * Math.cos(theta), ARROW * Math.sin(theta)]
  const wTip: [number, number] = [1.05 * Math.cos(back), 1.05 * Math.sin(back)]
  const name = k === 0 ? (m === 0 ? '1' : `z${m === 1 ? '' : SUP[m]}`) : `${m === 0 ? '1' : `z${m === 1 ? '' : SUP[m]}`}/w${k === 1 ? '' : SUP[k]}`
  const texName = k === 0 ? (m === 0 ? '1' : `z^{${m}}`) : `\\frac{${m === 0 ? '1' : `z^{${m}}`}}{w^{${k}}}`
  const inRange = p === q

  let notice
  let tone: 'neutral' | 'good' | 'warn' = 'neutral'
  if (m === 5 && k === 4) {
    tone = 'good'
    notice = (
      <>
        Four divisions by <M>w</M> turn the arrow back <M>{'4\\times\\tfrac{\\pi}{4} = \\pi'}</M>, half a turn: the arrow that
        pointed straight up now points straight down. The total, <M>{'\\tfrac{5\\pi}{2} - \\pi = \\tfrac{3\\pi}{2}'}</M>, is
        outside <M>{'(-\\pi, \\pi]'}</M>; the same direction is <M>{'\\tfrac{3\\pi}{2} - 2\\pi = -\\tfrac{\\pi}{2}'}</M>, option A.
        The faint arrow <M>{'w^4'}</M> lies along the negative real axis: dividing by a negative number reverses direction,
        so the answer can&apos;t stay at <M>{'\\tfrac{\\pi}{2}'}</M>.
      </>
    )
  } else if (m === 5 && k === 0) {
    notice = (
      <>
        Each factor of <M>z</M> turns the arrow a quarter-turn anticlockwise, so <M>{'z^5'}</M> has turned{' '}
        <M>{'\\tfrac{5\\pi}{2}'}</M>: one full turn and then <M>{'\\tfrac{\\pi}{2}'}</M>. It points straight up again, so{' '}
        <M>{'\\mathrm{Arg}(z^5) = \\tfrac{\\pi}{2}'}</M>, not <M>{'\\tfrac{5\\pi}{2}'}</M> (option D isn&apos;t even in{' '}
        <M>{'(-\\pi, \\pi]'}</M>). Now slide <M>k</M> to divide by <M>w</M>, one factor at a time.
      </>
    )
  } else if (m === 5) {
    notice = (
      <>
        Dividing subtracts arguments, so each division by <M>w</M> turns the arrow back <M>{'\\tfrac{\\pi}{4}'}</M>{' '}
        clockwise (orange). Keep going to <M>k = 4</M>.
      </>
    )
  } else {
    notice = (
      <>
        Powers multiply the argument and division subtracts, so the arrow has turned{' '}
        <M>{`${m}\\times\\tfrac{\\pi}{2} - ${k}\\times\\tfrac{\\pi}{4}`}</M> in total. The question has <M>m = 5</M> and{' '}
        <M>k = 4</M>: slide <M>m</M> up to <M>5</M> and watch the blue spiral pass a full turn.
      </>
    )
  }

  return (
    <div>
      <Plane x={[-2.1, 2.1]} y={[-2.1, 2.1]} equalScale height={320} xLabel="Re" yLabel="Im" labels={false}>
        {m > 0 && (
          <Plot.Parametric
            xy={t => [(R0 + GROW * t) * Math.cos(t), (R0 + GROW * t) * Math.sin(t)]}
            domain={[0, up]}
            color={C.f}
            weight={3}
          />
        )}
        {k > 0 && (
          <Plot.Parametric
            xy={s => [(R0 + GROW * (up + s)) * Math.cos(up - s), (R0 + GROW * (up + s)) * Math.sin(up - s)]}
            domain={[0, back]}
            color={C.g}
            weight={3}
          />
        )}
        {/* A dot at the end of each factor's turn, so the quarter-turns (and eighth-turns back) can be counted. */}
        {Array.from({ length: m }, (_, j) => {
          const t = ((j + 1) * Math.PI) / 2
          const r = R0 + GROW * t
          return <Circle key={`u${j}`} center={[r * Math.cos(t), r * Math.sin(t)]} radius={0.05} color={C.f} fillOpacity={1} />
        })}
        {Array.from({ length: k }, (_, j) => {
          const s = ((j + 1) * Math.PI) / 4
          const r = R0 + GROW * (up + s)
          return <Circle key={`d${j}`} center={[r * Math.cos(up - s), r * Math.sin(up - s)]} radius={0.05} color={C.g} fillOpacity={1} />
        })}
        {k > 0 && <Vector tail={[0, 0]} tip={wTip} color={C.g} opacity={0.45} />}
        {k > 0 && (
          <Label at={wTip} attach={k === 4 ? 's' : 'ne'} color={C.g} gap={8}>
            {`w${k === 1 ? '' : SUP[k]}`}
          </Label>
        )}
        <Point x={R0} y={0} color={C.f} />
        <Vector tail={[0, 0]} tip={tip} color={m === 5 && k === 4 ? C.good : C.violet} weight={3} />
        <Label at={tip} attach={Math.abs(Math.sin(theta)) > 0.7 ? 'e' : 'n'} color={m === 5 && k === 4 ? C.good : C.violet} gap={10}>
          {name}
        </Label>
      </Plane>
      <Controls>
        <Slider label="m\ (\text{power of } z)" value={m} onChange={v => setM(Math.round(v))} min={0} max={5} step={1} format={v => String(Math.round(v))} />
        <Slider label="k\ (\text{power of } w)" value={k} onChange={v => setK(Math.round(v))} min={0} max={4} step={1} format={v => String(Math.round(v))} />
        <Readouts>
          <Readout tex={`\\text{turned } ${m}\\times\\tfrac{\\pi}{2} - ${k}\\times\\tfrac{\\pi}{4} = ${piTex(q)}`} color={C.violet} />
        </Readouts>
        <Readouts>
          <Readout
            tex={`\\mathrm{Arg}\\!\\left(${texName}\\right) = ${inRange ? piTex(p) : `${piTex(q)} ${q > p ? '-' : '+'} ${piTex(Math.abs(q - p))} = ${piTex(p)}`}`}
            color={m === 5 && k === 4 ? C.good : undefined}
          />
        </Readouts>
        <Notice tone={tone}>{notice}</Notice>
      </Controls>
    </div>
  )
}
