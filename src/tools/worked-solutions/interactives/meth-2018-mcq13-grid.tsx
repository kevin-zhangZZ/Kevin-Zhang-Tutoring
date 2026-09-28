// 2018 Methods Exam 2 MCQ 13 — every (Box 1 marble, Box 2 marble) pair as one cell of a 6 × 5
// grid. Each marble is equally likely to be picked from its box, so all 30 cells are equally
// likely and a probability is just "cells ÷ 30". Choose a target score: +1 lights up TWO blocks,
// white-from-Box-1 with red-from-Box-2 (4 × 3 = 12) and red-from-Box-1 with white-from-Box-2
// (2 × 2 = 4), giving 16/30 = 8/15. The toggle keeps only the first block — 12/30 = 2/5, option C —
// and the orange block alone is 4/30 = 2/15, option D. The same-colour scores (−4, +6) have one
// block each, which is why only the mixed pair can happen "two ways".

import { useState } from 'react'
import { Buttons, C, Controls, M, Notice, Readout, Readouts, Toggle } from './kit'

type Colour = 'W' | 'R'
const BOX1: Colour[] = ['W', 'W', 'W', 'W', 'R', 'R'] // columns
const BOX2: Colour[] = ['W', 'W', 'R', 'R', 'R'] // rows
const PTS: Record<Colour, number> = { W: -2, R: 3 }
type Target = -4 | 1 | 6

const CW = 46 // cell width
const CH = 36 // cell height
const LM = 72 // left margin (Box 2 marbles)
const TM = 58 // top margin (Box 1 marbles)
const W = LM + BOX1.length * CW + 6
const H = TM + BOX2.length * CH + 6

const signed = (v: number) => (v > 0 ? `+${v}` : `−${Math.abs(v)}`)

function Marble({ cx, cy, c }: { cx: number; cy: number; c: Colour }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={9}
      fill={c === 'R' ? C.bad : '#ffffff'}
      stroke={c === 'R' ? '#b91c1c' : '#94a3b8'}
      strokeWidth={1.5}
    />
  )
}

export default function MarbleGrid() {
  const [target, setTarget] = useState<Target>(1)
  const [oneOrder, setOneOrder] = useState(false)

  // Which colour a cell is shaded, if any, for the current target.
  const shade = (col: number, row: number): { fill?: string; missed?: boolean } => {
    const a = BOX1[col]
    const b = BOX2[row]
    if (PTS[a] + PTS[b] !== target) return {}
    if (target !== 1) return { fill: C.violet }
    if (a === 'W') return { fill: C.f }
    return oneOrder ? { missed: true } : { fill: C.g }
  }

  let readout: string
  let notice
  if (target === 1 && !oneOrder) {
    readout = '\\Pr(+1) = \\frac{4\\times3 + 2\\times2}{30} = \\frac{16}{30} = \\frac{8}{15}'
    notice = (
      <Notice tone="good">
        Each marble has chance <M>{'\\tfrac16'}</M> or <M>{'\\tfrac15'}</M>, so every cell has chance{' '}
        <M>{'\\tfrac1{30}'}</M>. A score of <M>+1</M> needs one white and one red, and the grid shows it happens in{' '}
        <b>two blocks</b>: white from Box 1 with red from Box 2 (blue, <M>4\times3</M>) and red from Box 1 with white
        from Box 2 (orange, <M>2\times2</M>). Turn on &ldquo;one order only&rdquo; to see what forgetting a block costs.
      </Notice>
    )
  } else if (target === 1) {
    readout = '\\Pr = \\frac{4\\times3}{30} = \\frac{12}{30} = \\frac25 \\quad (\\text{option C})'
    notice = (
      <Notice tone="warn">
        Only the blue block is counted: <M>{'\\tfrac{12}{30}=\\tfrac25'}</M>, option C (chosen by 15%). The 4 red-dashed
        pairs &mdash; a red from Box 1 (<M>+3</M>) with a white from Box 2 (<M>-2</M>) &mdash; also score <M>+1</M>{' '}
        and have been left out. Counting only those 4 instead gives <M>{'\\tfrac4{30}=\\tfrac2{15}'}</M>, option D.
      </Notice>
    )
  } else if (target === -4) {
    readout = '\\Pr(-4) = \\frac{4\\times2}{30} = \\frac{8}{30} = \\frac{4}{15}'
    notice = (
      <Notice>
        Two whites make a single block, <M>4\times2 = 8</M> cells. A same-colour score can only happen one way, since
        both marbles are white. It is the mixed pair that can come about in two ways, so switch back to{' '}
        <M>+1</M>.
      </Notice>
    )
  } else {
    readout = '\\Pr(+6) = \\frac{2\\times3}{30} = \\frac{6}{30} = \\frac15'
    notice = (
      <Notice>
        Two reds make one block of <M>2\times3 = 6</M> cells, and <M>{'\\tfrac{6}{30}=\\tfrac15'}</M> is option B, the
        chance of the wrong score. The three scores&rsquo; blocks fill the grid: <M>8 + 16 + 6 = 30</M>.
      </Notice>
    )
  }

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[400px] mx-auto block" role="img" aria-label="Grid of all 30 marble pairs and their scores">
        <text x={LM + (BOX1.length * CW) / 2} y={14} textAnchor="middle" fontSize={13} fontWeight={600} className="fill-gray-700 dark:fill-gray-200">
          Box 1 marble
        </text>
        <text transform={`translate(16 ${TM + (BOX2.length * CH) / 2}) rotate(-90)`} textAnchor="middle" fontSize={13} fontWeight={600} className="fill-gray-700 dark:fill-gray-200">
          Box 2 marble
        </text>
        {BOX1.map((c, i) => (
          <g key={`c${i}`}>
            <Marble cx={LM + i * CW + CW / 2} cy={TM - 30} c={c} />
            <text x={LM + i * CW + CW / 2} y={TM - 8} textAnchor="middle" fontSize={11} className="fill-gray-500 dark:fill-gray-400">
              {signed(PTS[c])}
            </text>
          </g>
        ))}
        {BOX2.map((c, j) => (
          <g key={`r${j}`}>
            <Marble cx={LM - 36} cy={TM + j * CH + CH / 2} c={c} />
            <text x={LM - 8} y={TM + j * CH + CH / 2 + 4} textAnchor="end" fontSize={11} className="fill-gray-500 dark:fill-gray-400">
              {signed(PTS[c])}
            </text>
          </g>
        ))}
        {BOX2.map((b, j) =>
          BOX1.map((a, i) => {
            const s = shade(i, j)
            const x = LM + i * CW
            const y = TM + j * CH
            const hit = !!s.fill
            return (
              <g key={`${i}-${j}`}>
                <rect x={x} y={y} width={CW} height={CH} fill={s.fill ?? 'transparent'} fillOpacity={s.fill ? 0.38 : 0} stroke={C.guide} strokeOpacity={0.55} strokeWidth={1} />
                {s.missed && (
                  <rect x={x + 3} y={y + 3} width={CW - 6} height={CH - 6} fill="none" stroke={C.bad} strokeWidth={2} strokeDasharray="4 3" />
                )}
                <text
                  x={x + CW / 2}
                  y={y + CH / 2 + 4.5}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={hit || s.missed ? 700 : 400}
                  className={hit || s.missed ? 'fill-gray-900 dark:fill-white' : 'fill-gray-400 dark:fill-gray-500'}
                >
                  {signed(PTS[a] + PTS[b])}
                </text>
              </g>
            )
          }),
        )}
        {/* the four colour blocks, outlined */}
        <rect x={LM} y={TM} width={BOX1.length * CW} height={BOX2.length * CH} fill="none" stroke={C.guide} strokeWidth={1.5} />
        <line x1={LM + 4 * CW} y1={TM} x2={LM + 4 * CW} y2={TM + 5 * CH} stroke={C.guide} strokeWidth={2} />
        <line x1={LM} y1={TM + 2 * CH} x2={LM + 6 * CW} y2={TM + 2 * CH} stroke={C.guide} strokeWidth={2} />
      </svg>
      <Controls>
        <Buttons>
          {([-4, 1, 6] as Target[]).map(t => (
            <Toggle key={t} label={`Score ${signed(t)}`} checked={target === t} onChange={() => setTarget(t)} />
          ))}
          {target === 1 && (
            <Toggle label="One order only (white then red)" checked={oneOrder} onChange={setOneOrder} />
          )}
        </Buttons>
        <Readouts>
          <Readout tex={readout} color={target === 1 && !oneOrder ? C.good : undefined} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
