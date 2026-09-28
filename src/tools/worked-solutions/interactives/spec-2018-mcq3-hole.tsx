// 2018 Specialist Exam 2 MCQ 3 — the graph of (2x² + 3x + 1)/((2x + 1)³(x² − 1)) is the graph of
// 1/((2x + 1)²(x − 1)) with one point missing: the cancelled factor (x + 1) leaves a HOLE at
// (−1, −½), not an asymptote, and the cancelled (2x + 1) leaves a squared factor, so the curve
// runs to −∞ on BOTH sides of x = −½. Pick an option: the partial-fraction form it proposes would
// put an asymptote at x = −1 (A, B, C — red dashed line) and/or make the curve switch sides at
// x = −½ (odd top power: A, B, C — red arrow). D and E pass both tests; E fails on uniqueness.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Toggle, Vector } from './kit'

const F = (x: number) => 1 / ((2 * x + 1) ** 2 * (x - 1))
const X0 = -2.5
const X1 = 2.5
const Y0 = -3
const Y1 = 3
const E = 0.004

/** A dashed vertical line with a gap where it crosses the x-axis tick labels, so the ticks stay readable. */
function VLine({ x, color, weight }: { x: number; color: string; weight: number }) {
  return (
    <>
      <Line.Segment point1={[x, Y0]} point2={[x, -0.42]} color={color} style="dashed" weight={weight} />
      <Line.Segment point1={[x, 0]} point2={[x, Y1]} color={color} style="dashed" weight={weight} />
    </>
  )
}

type Opt = 'A' | 'B' | 'C' | 'D' | 'E'
const OPTS: Record<Opt, { form: string; minusOne: boolean; power: number; unique: boolean }> = {
  A: { form: '\\frac{A}{2x+1}+\\frac{B}{x-1}+\\frac{C}{x+1}', minusOne: true, power: 1, unique: true },
  B: { form: '\\frac{A}{2x+1}+\\frac{B}{(2x+1)^2}+\\frac{C}{(2x+1)^3}+\\frac{Dx}{x^2-1}', minusOne: true, power: 3, unique: true },
  C: { form: '\\frac{A}{2x+1}+\\frac{Bx+C}{x^2-1}', minusOne: true, power: 1, unique: true },
  D: { form: '\\frac{A}{2x+1}+\\frac{B}{(2x+1)^2}+\\frac{C}{x-1}', minusOne: false, power: 2, unique: true },
  E: { form: '\\frac{A}{2x+1}+\\frac{Bx+C}{(2x+1)^2}+\\frac{D}{x-1}', minusOne: false, power: 2, unique: false },
}

function OpenPoint({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2.5 } }} />
}

export default function HoleWidget() {
  const [opt, setOpt] = useState<Opt>('B')
  const o = OPTS[opt]
  const odd = o.power % 2 === 1
  const passes = !o.minusOne && !odd

  let notice
  if (opt === 'D') {
    notice = (
      <Notice tone="good">
        D&rsquo;s denominators are exactly the curve&rsquo;s: asymptotes at <M>{'x=-\\tfrac12'}</M> and <M>{'x=1'}</M>, nothing
        at <M>{'x=-1'}</M> (only a hole), and a top power of <M>2</M>, so both sides of <M>{'x=-\\tfrac12'}</M> head the same way.
        With <M>{'A=-\\tfrac29,\\ B=-\\tfrac23,\\ C=\\tfrac19'}</M> the three pieces add up to this curve exactly.
      </Notice>
    )
  } else if (opt === 'E') {
    notice = (
      <Notice tone="warn">
        E passes both graph tests, but its <M>{'Bx+C'}</M> is a disguise:{' '}
        <M>{'\\tfrac{Bx+C}{(2x+1)^2}=\\tfrac{B/2}{2x+1}+\\tfrac{C-B/2}{(2x+1)^2}'}</M> — just more <M>{'\\tfrac{\\cdot}{2x+1}'}</M>{' '}
        and <M>{'\\tfrac{\\cdot}{(2x+1)^2}'}</M> terms. So <M>A</M> and <M>B</M> can be traded for each other and are never
        pinned down. Powers of a <em>linear</em> factor take constant numerators — that is D.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        {o.minusOne && (
          <>
            {opt} has a denominator that is zero at <M>{'x=-1'}</M>, so its graph would have an asymptote there (red dashed
            line). The real graph has only a <b>hole</b>: <M>{'(x+1)'}</M> cancelled, so it gets no fraction.{' '}
          </>
        )}
        {odd && (
          <>
            Its highest power of <M>{'(2x+1)'}</M> is <M>{String(o.power)}</M> (odd), which would send the curve to{' '}
            <M>{'+\\infty'}</M> on one side of <M>{'x=-\\tfrac12'}</M> (red arrow) — but it goes to <M>{'-\\infty'}</M> on both,
            the sign of a <em>squared</em> factor.
          </>
        )}
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[Y0, Y1]} xStep={0.5} yStep={1} height={330} xLabels={v => (Number.isInteger(v) ? String(v) : Math.abs(v + 0.5) < 1e-9 ? '−1/2' : '')}>
        {/* the real asymptotes (x = −½ is named by its axis tick: a label would cross the y-axis on a phone) */}
        <VLine x={-0.5} color={C.guide} weight={1.5} />
        <VLine x={1} color={C.guide} weight={1.5} />
        <Label at={[1, Y0 + 0.15]} attach="e" color={C.guide} size={12}>x = 1</Label>

        {/* the option's predictions */}
        {o.minusOne && (
          <>
            <VLine x={-1} color={C.bad} weight={2} />
            <Label at={[-1, Y1 - 0.15]} attach="w" color={C.bad} size={12}>{`${opt}: asymptote?`}</Label>
          </>
        )}
        {odd && <Vector tail={[-0.38, 0.4]} tip={[-0.38, 1.9]} color={C.bad} />}

        {/* the curve, in three branches, with its hole */}
        <Plot.OfX y={F} domain={[X0, -0.5 - E]} color={C.f} weight={3} />
        <Plot.OfX y={F} domain={[-0.5 + E, 1 - E]} color={C.f} weight={3} />
        <Plot.OfX y={F} domain={[1 + E, X1]} color={C.f} weight={3} />
        <OpenPoint x={-1} y={-0.5} color={C.f} />
        <Label at={[-1, -0.5]} attach="sw" color={C.f} size={12}>hole (−1, −½)</Label>
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-2 text-[13px] text-gray-700 dark:text-gray-300">
          <span>Test option</span>
          {(Object.keys(OPTS) as Opt[]).map(L => (
            <Toggle key={L} label={L} checked={opt === L} onChange={() => setOpt(L)} />
          ))}
        </div>
        <Readouts>
          <Readout color={passes ? (o.unique ? C.good : C.bad) : C.bad} tex={o.form} />
        </Readouts>
        <Readouts>
          <Readout
            color={o.minusOne ? C.bad : C.good}
            tex={o.minusOne ? 'x=-1:\\ \\text{asymptote, not a hole}' : 'x=-1:\\ \\text{no term, so a hole}'}
          />
          <Readout
            color={odd ? C.bad : C.good}
            tex={`x=-\\tfrac12:\\ \\text{top power } ${o.power}\\ \\text{(${odd ? 'odd' : 'even'})}`}
          />
          {!o.unique && <Readout color={C.bad} tex={'\\text{constants not unique}'} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
