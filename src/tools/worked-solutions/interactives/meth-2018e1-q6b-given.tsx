// 2018 Methods Exam 1 Q6b — "given" means "this region is the new whole". Same area picture as
// part a. (square = probability 1, a column per box, a rectangle per stone). "Given black" fades the
// white quarter and outlines the black area (3/4); Box 1 owns 1/2 of it, so Pr(Box 1 | black) =
// (1/2)/(3/4) = 2/3 (4 of the 6 black stones). The bar underneath rescales the given region to
// length 1. "Given Box 1" shows the reverse conditional, Pr(black | Box 1) = 1 — part a.'s branch,
// not b.'s question. The third view divides all the black area by Box 1's column,
// Pr(K) ÷ Pr(B1) = (3/4)/(1/2) = 3/2: Box 2's black stones lie outside the region being divided by,
// so the bar overshoots 1 — the report's "probability greater than 1".

import { useState } from 'react'
import { C, Controls, M, Notice, Readout, Readouts, Toggle } from './kit'

type Mode = 'black' | 'box1' | 'slip'

// The square (viewBox 340 × 282), then the bar underneath.
const X = 60
const W = 220
const Y = 30
const H = 176
const COL = W / 2
const CELL = H / 4
const BAR_X = 60
const BAR_Y = 238
const BAR_H = 16
const UNIT = 170 // bar length of "the given region" = 1

type Cell = { box: 1 | 2; i: number; black: boolean }
const CELLS: Cell[] = [
  ...[0, 1, 2, 3].map(i => ({ box: 1 as const, i, black: true })),
  ...[0, 1, 2, 3].map(i => ({ box: 2 as const, i, black: i < 2 })),
]
const colX = (box: 1 | 2) => X + (box - 1) * COL

function Stone({ cx, cy, black }: { cx: number; cy: number; black: boolean }) {
  return <circle cx={cx} cy={cy} r={12} fill={black ? '#111827' : '#ffffff'} stroke={black ? '#94a3b8' : '#64748b'} strokeWidth={1.4} />
}

export default function GivenIsTheNewWhole() {
  const [mode, setMode] = useState<Mode>('black')

  /** Colour of a cell's tint, or null for none. */
  const tint = (c: Cell): string | null => {
    if (c.box === 1) return C.f
    if (!c.black) return null
    if (mode === 'black') return C.g
    if (mode === 'slip') return C.bad
    return null
  }
  const faded = (c: Cell) => (mode === 'black' ? !c.black : mode === 'box1' ? c.box === 2 : c.box === 2 && !c.black)

  // Outline of the region after the bar: the black L-shape, or Box 1's column.
  const given =
    mode === 'black'
      ? `${X},${Y} ${X + W},${Y} ${X + W},${Y + H / 2} ${X + COL},${Y + H / 2} ${X + COL},${Y + H} ${X},${Y + H}`
      : `${X},${Y} ${X + COL},${Y} ${X + COL},${Y + H} ${X},${Y + H}`

  // The bar: numerator pieces measured in units of the given region.
  const pieces: { from: number; to: number; color: string; label: string }[] =
    mode === 'black'
      ? [
          { from: 0, to: 2 / 3, color: C.f, label: '2/3' },
          { from: 2 / 3, to: 1, color: C.g, label: '1/3' },
        ]
      : mode === 'box1'
        ? [{ from: 0, to: 1, color: C.f, label: '1' }]
        : [
            { from: 0, to: 1, color: C.f, label: '1' },
            { from: 1, to: 1.5, color: C.bad, label: '+1/2' },
          ]
  const barCaption =
    mode === 'black' ? "Box 1's share of the black area" : mode === 'box1' ? "Black's share of Box 1" : 'All the black area measured against Box 1'

  let notice
  if (mode === 'black') {
    notice = (
      <Notice tone="good">
        Knowing the stone is black wipes out the white quarter: the black area, <M>{'\\tfrac34'}</M>, is the new whole.
        Box 1 owns <M>{'\\tfrac12'}</M> of it, which is <M>{'\\tfrac{1/2}{3/4} = \\tfrac23'}</M> of the black area (or
        count: 4 of the 6 equally likely black stones). The bar stretches the black area to length 1. Now press{' '}
        <b>Given Box 1</b> to see the conditional the other way round.
      </Notice>
    )
  } else if (mode === 'box1') {
    notice = (
      <Notice>
        Now the box is what you know, so the whole is Box 1&apos;s column, and all of it is black:{' '}
        <M>{'\\Pr(K\\mid B_1) = 1'}</M>. That is the branch part a. multiplied by, not what b. asks. In{' '}
        <M>{'\\Pr(A\\mid B)'}</M> the event after the bar is the new whole, and b. says &ldquo;given that the stone is
        black&rdquo;, so black goes after the bar. Press the third button to see how an answer above 1 appears.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Dividing the part a. answer by <M>{'\\Pr(B_1)'}</M> measures <em>all</em> the black area,{' '}
        <M>{'\\tfrac34'}</M>, against Box 1&apos;s column, <M>{'\\tfrac12'}</M>. The red-shaded stones sit in Box 2, outside the
        region you are dividing by, so the bar overshoots 1: <M>{'\\tfrac32'}</M>. The top of a conditional probability
        must be the overlap <M>{'\\Pr(A \\cap B)'}</M>, which lies inside the bottom region, so it can never exceed 1. The
        report notes answers above 1 from students who worked <M>{'\\Pr(\\text{Black}\\mid\\text{Box 1})'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <div className="text-gray-700 dark:text-gray-300">
        <svg
          viewBox="0 0 340 282"
          className="w-full max-w-[440px] mx-auto block"
          role="img"
          aria-label="The part a. area picture with the given region outlined, and a bar showing the numerator as a share of the given region"
        >
          {([1, 2] as const).map(b => (
            <text key={b} x={colX(b) + COL / 2} y={Y - 10} fontSize={12} fontWeight={700} textAnchor="middle" fill="currentColor">
              Box {b}
            </text>
          ))}

          {CELLS.map(c => {
            const t = tint(c)
            return (
              <g key={`${c.box}-${c.i}`} opacity={faded(c) ? 0.18 : 1}>
                <rect x={colX(c.box)} y={Y + c.i * CELL} width={COL} height={CELL} fill={t ?? 'currentColor'} fillOpacity={t ? 0.26 : 0.05} />
                <Stone cx={colX(c.box) + 28} cy={Y + c.i * CELL + CELL / 2} black={c.black} />
              </g>
            )
          })}
          <rect x={X} y={Y} width={W} height={H} fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.2} />
          <line x1={X + COL} x2={X + COL} y1={Y} y2={Y + H} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.2} />

          {/* Area labels for each block */}
          <text x={colX(1) + 78} y={Y + H / 2 + 5} fontSize={13} fontWeight={700} textAnchor="middle" fill={C.f}>
            1/2
          </text>
          <text x={colX(2) + 78} y={Y + H / 4 + 5} fontSize={13} fontWeight={700} textAnchor="middle" fill={mode === 'slip' ? C.bad : mode === 'black' ? C.g : 'currentColor'} opacity={mode === 'box1' ? 0.3 : 1}>
            1/4
          </text>
          <text x={colX(2) + 78} y={Y + (3 * H) / 4 + 5} fontSize={13} textAnchor="middle" fill="currentColor" opacity={0.3}>
            1/4
          </text>

          {/* The given region (after the bar) */}
          <polygon points={given} fill="none" stroke="currentColor" strokeWidth={2.6} strokeDasharray="7 4" strokeLinejoin="round" />

          {/* The bar: numerator as a multiple of the given region */}
          <text x={BAR_X} y={BAR_Y - 7} fontSize={11} fill="currentColor" opacity={0.8}>
            {barCaption}
          </text>
          {pieces.map(p => (
            <g key={p.label}>
              <rect x={BAR_X + p.from * UNIT} y={BAR_Y} width={(p.to - p.from) * UNIT} height={BAR_H} fill={p.color} fillOpacity={0.75} />
              <text x={BAR_X + ((p.from + p.to) / 2) * UNIT} y={BAR_Y + BAR_H - 4} fontSize={10.5} fontWeight={700} textAnchor="middle" fill="#ffffff">
                {p.label}
              </text>
            </g>
          ))}
          <rect x={BAR_X} y={BAR_Y} width={UNIT} height={BAR_H} fill="none" stroke="currentColor" strokeWidth={1.6} />
          {[0, 1].map(v => (
            <g key={v}>
              <line x1={BAR_X + v * UNIT} x2={BAR_X + v * UNIT} y1={BAR_Y - 2} y2={BAR_Y + BAR_H + 4} stroke="currentColor" strokeWidth={1.4} />
              <text x={BAR_X + v * UNIT} y={BAR_Y + BAR_H + 16} fontSize={11} textAnchor="middle" fill="currentColor">
                {v}
              </text>
            </g>
          ))}
          {mode === 'slip' && (
            <text x={BAR_X + 1.5 * UNIT + 4} y={BAR_Y + BAR_H - 3} fontSize={12} fontWeight={700} fill={C.bad}>
              3/2
            </text>
          )}
        </svg>
      </div>
      <Controls>
        <div className="flex flex-wrap items-center gap-2">
          <Toggle label="Given black (the question)" checked={mode === 'black'} onChange={() => setMode('black')} />
          <Toggle label="Given Box 1" checked={mode === 'box1'} onChange={() => setMode('box1')} />
          <Toggle label={<M>{'\\Pr(K) \\div \\Pr(B_1)'}</M>} checked={mode === 'slip'} onChange={() => setMode('slip')} />
        </div>
        <Readouts>
          {mode === 'black' && <Readout color={C.f} tex={'\\Pr(B_1\\cap K) = \\tfrac12'} />}
          {mode === 'black' && <Readout tex={'\\Pr(K) = \\tfrac34'} />}
          {mode === 'black' && <Readout color={C.good} tex={'\\Pr(B_1\\mid K) = \\tfrac{1/2}{3/4} = \\tfrac23'} />}
          {mode === 'box1' && <Readout tex={'\\Pr(K\\mid B_1) = \\tfrac{\\Pr(K\\cap B_1)}{\\Pr(B_1)} = \\tfrac{1/2}{1/2} = 1'} />}
          {mode === 'slip' && <Readout color={C.bad} tex={'\\tfrac{\\Pr(K)}{\\Pr(B_1)} = \\tfrac{3/4}{1/2} = \\tfrac32 > 1'} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
