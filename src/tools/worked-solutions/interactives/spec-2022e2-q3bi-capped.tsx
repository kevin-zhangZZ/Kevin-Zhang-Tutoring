// 2022 Specialist Exam 2 Q3b.i — why the graph of x = log_e(tan⁻¹(2t) + 1) has the horizontal
// asymptote x = log_e(π/2 + 1). Push t from 0.1 up to 10 000 and follow the value through each
// layer of the rule on its own number line: tan⁻¹(2t) presses up against π/2 but never reaches
// it, adding 1 moves that wall to π/2 + 1, and log_e moves it to log_e(π/2 + 1) ≈ 0.944. A toggle
// tests the common incorrect response x = 1: the gap from x to 1 levels off at about 0.056
// instead of shrinking to 0.

import { useState, type ReactNode } from 'react'
import { C, Controls, M, Notice, Readout, Readouts, Slider, Toggle } from './kit'

const TS = [0.1, 0.25, 0.5, 1, 2, 3, 5, 10, 20, 50, 100, 1000, 10000]
const START = TS.indexOf(10)
const HALF_PI = Math.PI / 2
const CAP = Math.log(HALF_PI + 1)

/** t as plain text and as TeX, with a space as the thousands separator (VCAA style). */
const tText = (t: number) => (t >= 1000 ? t.toLocaleString('en-AU').replace(/,/g, '\u00a0') : String(t))
const tTex = (t: number) => (t >= 1000 ? t.toLocaleString('en-AU').replace(/,/g, '\\,') : String(t))

/** A small positive gap: four decimal places, or scientific notation once it gets tiny. */
function gapTex(g: number): string {
  if (g >= 0.001) return g.toFixed(4)
  const e = Math.floor(Math.log10(g))
  return `${(g / 10 ** e).toFixed(2)}\\times10^{${e}}`
}

function NumberLine({
  lo,
  hi,
  ticks,
  value,
  cap,
  capLabel,
  wrongWall,
  label,
}: {
  lo: number
  hi: number
  ticks: number[]
  value: number
  cap: number
  capLabel: string
  wrongWall?: number
  label: string
}) {
  const L = 12
  const R = 348
  const Y = 32
  const sx = (v: number) => L + ((v - lo) / (hi - lo)) * (R - L)
  return (
    <svg viewBox="0 0 360 52" className="w-full text-gray-700 dark:text-gray-300" role="img" aria-label={label}>
      <line x1={L} y1={Y} x2={R} y2={Y} stroke="currentColor" strokeWidth={1.5} />
      {ticks.map(v => (
        <g key={v}>
          <line x1={sx(v)} y1={Y - 4} x2={sx(v)} y2={Y + 4} stroke="currentColor" strokeWidth={1.2} />
          <text x={sx(v)} y={Y + 17} fontSize={11.5} textAnchor="middle" fill="currentColor">
            {v}
          </text>
        </g>
      ))}
      <rect x={sx(lo)} y={Y - 5} width={Math.max(0, sx(value) - sx(lo))} height={10} fill={C.f} opacity={0.28} />
      <line x1={sx(cap)} y1={8} x2={sx(cap)} y2={Y + 7} stroke={C.violet} strokeWidth={2} strokeDasharray="4 3" />
      <text x={sx(cap) - 5} y={15} fontSize={12} textAnchor="end" fill={C.violet} fontWeight={600}>
        {capLabel}
      </text>
      {wrongWall !== undefined && (
        <>
          <line x1={sx(wrongWall)} y1={8} x2={sx(wrongWall)} y2={Y + 7} stroke={C.bad} strokeWidth={2} strokeDasharray="4 3" />
          <text x={sx(wrongWall) + 4} y={15} fontSize={12} fill={C.bad} fontWeight={600}>
            1
          </text>
        </>
      )}
      <circle cx={sx(value)} cy={Y} r={5.5} fill={C.f} />
    </svg>
  )
}

function Row({ name, value, gap, wall, children }: { name: string; value: number; gap: number; wall: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-[13px] text-gray-700 dark:text-gray-300">
        <span>
          <M>{`${name} = ${value.toFixed(5)}`}</M>
        </span>
        <span className="text-[12px] text-gray-500 dark:text-gray-400">
          below <M>{wall}</M> by <M>{gapTex(gap)}</M>
        </span>
      </div>
      {children}
    </div>
  )
}

export default function Capped() {
  const [i, setI] = useState(START)
  const [wrong, setWrong] = useState(false)
  const t = TS[i]
  const a = Math.atan(2 * t)
  const x = Math.log(a + 1)

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        The red line <M>x = 1</M> sits above the whole curve, but it is not where <M>x</M> is heading. Push{' '}
        <M>t</M> all the way: the gap <M>1 - x</M> only shrinks to{' '}
        <M>{'1 - \\log_e\\left(\\tfrac\\pi2 + 1\\right) \\approx 0.056'}</M> and stops there, while the gap to the
        violet wall keeps shrinking towards 0. An asymptote is a line the graph gets as close to as you like, so{' '}
        <M>x = 1</M> is not one.
      </Notice>
    )
  } else if (t <= 1) {
    notice = (
      <Notice>
        At <M>{`t = ${tTex(t)}`}</M>, <M>{'\\tan^{-1}(2t)'}</M> is still well below <M>{'\\tfrac\\pi2'}</M>, and each
        marker is climbing quickly. Each violet dashed line is a wall: the value that layer gets closer and closer
        to but never reaches. Drag <M>t</M> to the right and watch the markers slow down as they near their walls.
      </Notice>
    )
  } else if (t < 1000) {
    notice = (
      <Notice>
        At <M>{`t = ${tTex(t)}`}</M>, <M>{`2t = ${tTex(2 * t)}`}</M> and <M>{`\\tan^{-1}(${tTex(2 * t)})`}</M> is
        only <M>{gapTex(HALF_PI - a)}</M> below <M>{'\\tfrac\\pi2'}</M>. Adding 1 and then taking <M>\log_e</M> are
        both increasing, so the violet wall (the value each layer can never reach) is carried along too:{' '}
        <M>{'\\tfrac\\pi2 \\to \\tfrac\\pi2 + 1 \\to \\log_e\\left(\\tfrac\\pi2+1\\right)'}</M>. Push <M>t</M> much
        further and see whether any marker gets past its wall.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Even at <M>{`t = ${tTex(t)}`}</M>, <M>{'\\tan^{-1}(2t)'}</M> is still <M>{gapTex(HALF_PI - a)}</M> short
        of <M>{'\\tfrac\\pi2'}</M>. It never reaches <M>{'\\tfrac\\pi2'}</M>, because the range of{' '}
        <M>{'\\tan^{-1}'}</M> is <M>{'\\left(-\\tfrac\\pi2, \\tfrac\\pi2\\right)'}</M>. So as{' '}
        <M>{'t \\to \\infty'}</M>, <M>{'x \\to \\log_e\\left(\\tfrac\\pi2+1\\right) \\approx 0.944'}</M>, and the
        asymptote is <M>{'x = \\log_e\\left(\\tfrac\\pi2+1\\right)'}</M>. The vertical axis is <M>x</M>, so write{' '}
        <M>{'x = \\ldots'}</M>, not <M>{'y = \\ldots'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <div className="mx-auto flex w-full max-w-[460px] flex-col gap-3">
        <Row name="\tan^{-1}(2t)" value={a} gap={HALF_PI - a} wall="\tfrac\pi2">
          <NumberLine
            lo={0}
            hi={1.8}
            ticks={[0, 0.5, 1, 1.5]}
            value={a}
            cap={HALF_PI}
            capLabel="π/2 ≈ 1.571"
            label={`tan⁻¹(2t) = ${a.toFixed(5)}, just below the wall at π/2`}
          />
        </Row>
        <Row name="\tan^{-1}(2t) + 1" value={a + 1} gap={HALF_PI - a} wall="\tfrac\pi2 + 1">
          <NumberLine
            lo={1}
            hi={2.8}
            ticks={[1, 1.5, 2, 2.5]}
            value={a + 1}
            cap={HALF_PI + 1}
            capLabel="π/2 + 1 ≈ 2.571"
            label={`tan⁻¹(2t) + 1 = ${(a + 1).toFixed(5)}, just below the wall at π/2 + 1`}
          />
        </Row>
        <Row name="x" value={x} gap={CAP - x} wall="\log_e\left(\tfrac\pi2+1\right)">
          <NumberLine
            lo={0}
            hi={1.1}
            ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]}
            value={x}
            cap={CAP}
            capLabel="logₑ(π/2 + 1) ≈ 0.944"
            wrongWall={wrong ? 1 : undefined}
            label={`x = ${x.toFixed(5)}, just below the wall at log_e(π/2 + 1)`}
          />
        </Row>
      </div>
      <Controls>
        <Slider
          label="t"
          value={i}
          onChange={v => setI(Math.round(v))}
          min={0}
          max={TS.length - 1}
          step={1}
          format={v => tText(TS[Math.round(v)])}
        />
        <Toggle label="Test x = 1 as the asymptote" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout tex={`\\text{input to } \\tan^{-1}\\text{:}\\ \\ 2t = ${tTex(2 * t)}`} />
          {wrong && <Readout color={C.bad} tex={`1 - x = ${(1 - x).toFixed(4)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
