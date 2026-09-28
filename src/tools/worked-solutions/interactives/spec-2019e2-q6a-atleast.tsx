// 2019 Specialist Exam 2 Q6a — "at least one of the two samples" as an area. A unit square is
// cut at p = Pr(370 < X̄ < 375) ≈ 0.4908 across (sample 1) and down (sample 2), giving the four
// outcomes of the two independent samples, with areas p², p(1−p), (1−p)p and (1−p)². "At least
// one" is every piece except the "neither" corner: 1 − (1 − p)² ≈ 0.741. A toggle shows what
// adding p + p does: sample 1's column and sample 2's row overlap in the "both" square, which is
// counted twice, so p + p ≈ 0.982 = 0.741 + 0.241. Values checked in scipy.

import { useState } from 'react'
import { Buttons, C, Controls, M, Notice, Readout, Readouts, Toggle } from './kit'

const P = 0.4907889372729505 // normCdf(370, 375, 375, 15/√50)
const Q = 1 - P
const SIDE = 220
const OX = 96 // square's left edge
const OY = 44 // square's top edge
const PX = P * SIDE

export default function AtLeast() {
  const [add, setAdd] = useState(false)
  const [showNeither, setShowNeither] = useState(true)

  const cell = (x: number, y: number, w: number, h: number, fill: string, opacity: number) => (
    <rect x={OX + x} y={OY + y} width={w} height={h} fill={fill} fillOpacity={opacity} />
  )
  const text = (x: number, y: number, lines: string[], cls = 'fill-gray-800 dark:fill-gray-100') => (
    <text x={OX + x} y={OY + y} textAnchor="middle" fontSize={12} className={cls}>
      {lines.map((l, i) => (
        <tspan key={i} x={OX + x} dy={i === 0 ? 0 : 15}>
          {l}
        </tspan>
      ))}
    </text>
  )

  return (
    <div>
      <div className="flex justify-center">
        <svg viewBox="0 0 340 290" className="w-full max-w-[380px]" role="img" aria-label="Unit square of outcomes for two samples">
          {/* column and row headings */}
          <text x={OX + SIDE / 2} y={14} textAnchor="middle" fontSize={12} className="fill-gray-700 dark:fill-gray-300 font-semibold">Sample 1</text>
          <text x={OX + PX / 2} y={34} textAnchor="middle" fontSize={11} className="fill-gray-600 dark:fill-gray-400">in band, p</text>
          <text x={OX + PX + (SIDE - PX) / 2} y={34} textAnchor="middle" fontSize={11} className="fill-gray-600 dark:fill-gray-400">not, 1 − p</text>
          <text x={14} y={OY + SIDE / 2} textAnchor="middle" fontSize={12} transform={`rotate(-90 14 ${OY + SIDE / 2})`} className="fill-gray-700 dark:fill-gray-300 font-semibold">Sample 2</text>
          <text x={OX - 8} y={OY + PX / 2 + 4} textAnchor="end" fontSize={11} className="fill-gray-600 dark:fill-gray-400">in band, p</text>
          <text x={OX - 8} y={OY + PX + (SIDE - PX) / 2 + 4} textAnchor="end" fontSize={11} className="fill-gray-600 dark:fill-gray-400">not, 1 − p</text>

          {add ? (
            <>
              {/* sample 1's column (p) and sample 2's row (p), drawn over each other */}
              {cell(0, 0, PX, SIDE, C.f, 0.3)}
              {cell(0, 0, SIDE, PX, C.g, 0.3)}
              {cell(0, 0, PX, PX, C.bad, 0.35)}
              {text(PX / 2, PX / 2 - 4, ['both: p²', 'counted twice'])}
              {text(PX + (SIDE - PX) / 2, PX / 2 - 4, ['only 2', '(orange row)'])}
              {text(PX / 2, PX + (SIDE - PX) / 2 - 4, ['only 1', '(blue column)'])}
              {text(PX + (SIDE - PX) / 2, PX + (SIDE - PX) / 2 - 4, ['neither', '(1 − p)²'], 'fill-gray-500 dark:fill-gray-400')}
            </>
          ) : (
            <>
              {cell(0, 0, PX, PX, C.good, 0.45)}
              {cell(PX, 0, SIDE - PX, PX, C.good, 0.3)}
              {cell(0, PX, PX, SIDE - PX, C.good, 0.3)}
              {showNeither && cell(PX, PX, SIDE - PX, SIDE - PX, C.guide, 0.35)}
              {text(PX / 2, PX / 2 - 4, ['both', 'p² ≈ 0.241'])}
              {text(PX + (SIDE - PX) / 2, PX / 2 - 4, ['only 2', 'p(1−p) ≈ 0.250'])}
              {text(PX / 2, PX + (SIDE - PX) / 2 - 4, ['only 1', 'p(1−p) ≈ 0.250'])}
              {text(PX + (SIDE - PX) / 2, PX + (SIDE - PX) / 2 - 4, ['neither', '(1−p)² ≈ 0.259'])}
            </>
          )}
          {/* the square and its cuts */}
          <rect x={OX} y={OY} width={SIDE} height={SIDE} fill="none" className="stroke-gray-500 dark:stroke-gray-400" strokeWidth={1.5} />
          <line x1={OX + PX} y1={OY} x2={OX + PX} y2={OY + SIDE} className="stroke-gray-500 dark:stroke-gray-400" strokeWidth={1.5} />
          <line x1={OX} y1={OY + PX} x2={OX + SIDE} y2={OY + PX} className="stroke-gray-500 dark:stroke-gray-400" strokeWidth={1.5} />
          <text x={OX + SIDE / 2} y={OY + SIDE + 20} textAnchor="middle" fontSize={11} className="fill-gray-500 dark:fill-gray-400">whole square = all outcomes, area 1</text>
        </svg>
      </div>
      <Controls>
        <Buttons>
          <Toggle label="Grey out “neither”" checked={showNeither} onChange={setShowNeither} />
          <Toggle label="What if I just add p + p?" checked={add} onChange={setAdd} />
        </Buttons>
        <Readouts>
          {add ? (
            <Readout color={C.bad} tex={`p + p \\approx ${(2 * P).toFixed(3)} = 0.741 + \\underbrace{${(P * P).toFixed(3)}}_{\\text{both, again}}`} />
          ) : (
            <>
              <Readout color={C.good} tex={`1 - (1-p)^2 \\approx 1 - ${(Q * Q).toFixed(4)} \\approx ${(1 - Q * Q).toFixed(3)}`} />
              <Readout tex={`p \\approx ${P.toFixed(4)}`} />
            </>
          )}
        </Readouts>
        {add ? (
          <Notice tone="warn">
            Adding <M>p + p</M> takes sample 1&apos;s whole column (blue) and sample 2&apos;s whole row (orange). They
            overlap in the red square where <b>both</b> samples land in the band, so that outcome is counted twice. The
            result, <M>0.982</M>, is far too big: two tries at a <M>49\%</M> chance can&apos;t make success almost certain.
          </Notice>
        ) : (
          <Notice>
            The green L-shape is &ldquo;at least one&rdquo;: three of the four outcomes. Adding its three pieces works, but
            the grey corner is quicker: <M>{'1 - (1-p)^2'}</M>. That is the binomial <M>{'\\Pr(Y \\ge 1)'}</M> for{' '}
            <M>{'Y \\sim \\operatorname{Bi}(2,\\ p)'}</M>. Turn on &ldquo;just add&rdquo; to see why doubling fails.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
