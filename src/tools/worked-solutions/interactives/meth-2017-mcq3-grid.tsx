// 2017 Methods Exam 2 MCQ 3 — every ordered draw of two marbles from 5 red and 3 yellow, as an
// 8 × 8 grid (row = first marble, column = second). The diagonal is crossed out because the first
// marble is not replaced, leaving 56 equally likely cells. Step 2 shades red-then-yellow
// (5 × 3 = 15 cells, i.e. 5/8 × 3/7 = 15/56 — option D, where 12% of students stopped); step 3
// adds the mirror-image block yellow-then-red for 30/56 = 15/28 (option C).

import type { ReactElement } from 'react'
import { C, Controls, M, Notice, Readout, Readouts, StepNav, useSteps } from './kit'

const MARBLES: ('R' | 'Y')[] = ['R', 'R', 'R', 'R', 'R', 'Y', 'Y', 'Y']
const NUM = [1, 2, 3, 4, 5, 1, 2, 3]
const RED = '#ef4444'
const YELLOW = '#facc15'
const S = 36 // cell size
const H = 30 // header size
const SIZE = H + 8 * S

export default function MarbleGrid() {
  const s = useSteps(3)
  const showRY = s.step >= 1
  const showYR = s.step >= 2
  const shaded = (showRY ? 15 : 0) + (showYR ? 15 : 0)

  const marble = (k: number, cx: number, cy: number) => (
    <g key={`m${cx}-${cy}`}>
      <circle cx={cx} cy={cy} r={10} fill={MARBLES[k] === 'R' ? RED : YELLOW} />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fill={MARBLES[k] === 'R' ? '#fff' : '#422006'}
      >
        {NUM[k]}
      </text>
    </g>
  )

  const cells: ReactElement[] = []
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const x = H + c * S
      const y = H + r * S
      const key = `${r}-${c}`
      if (r === c) {
        cells.push(
          <g key={key}>
            <rect x={x} y={y} width={S} height={S} className="fill-gray-200 stroke-white dark:fill-gray-700 dark:stroke-gray-900" strokeWidth={2} />
            <text x={x + S / 2} y={y + S / 2 + 5} textAnchor="middle" fontSize={15} className="fill-gray-400 dark:fill-gray-500">
              ×
            </text>
          </g>,
        )
        continue
      }
      const a = MARBLES[r]
      const b = MARBLES[c]
      const ry = a === 'R' && b === 'Y'
      const yr = a === 'Y' && b === 'R'
      const fill = ry && showRY ? C.f : yr && showYR ? C.violet : null
      cells.push(
        <g key={key}>
          {fill ? (
            <rect x={x} y={y} width={S} height={S} fill={fill} fillOpacity={0.85} className="stroke-white dark:stroke-gray-900" strokeWidth={2} />
          ) : (
            <rect x={x} y={y} width={S} height={S} className="fill-white stroke-gray-200 dark:fill-gray-900 dark:stroke-gray-700" strokeWidth={1.5} />
          )}
          <text
            x={x + S / 2}
            y={y + S / 2 + 4}
            textAnchor="middle"
            fontSize={10.5}
            fontWeight={600}
            className={fill ? 'fill-white' : 'fill-gray-400 dark:fill-gray-500'}
          >
            {a}
            {b}
          </text>
        </g>,
      )
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-1">
        <div className="text-[12px] text-gray-500 dark:text-gray-400">
          Row: <b>first</b> marble · Column: <b>second</b> marble
        </div>
        <svg viewBox={`0 0 ${SIZE + 2} ${SIZE + 2}`} className="w-full max-w-[340px]" role="img" aria-label="Grid of all ordered draws of two marbles">
          {MARBLES.map((_, k) => marble(k, H + k * S + S / 2, H / 2))}
          {MARBLES.map((_, k) => marble(k, H / 2, H + k * S + S / 2))}
          {cells}
          {showRY && (
            <rect x={H + 5 * S} y={H} width={3 * S} height={5 * S} fill="none" stroke={C.f} strokeWidth={2.5} rx={3} />
          )}
          {showYR && (
            <rect x={H} y={H + 5 * S} width={5 * S} height={3 * S} fill="none" stroke={C.violet} strokeWidth={2.5} rx={3} />
          )}
        </svg>
      </div>
      <Controls>
        <StepNav step={s.step} count={3} onBack={s.back} onNext={s.next} />
        <Readouts>
          {s.step === 0 ? (
            <Readout tex="\text{possible draws} = 8 \times 7 = 56" />
          ) : (
            <>
              {showRY && <Readout color={C.f} tex="\text{RY: } 5 \times 3 = 15" />}
              {showYR && <Readout color={C.violet} tex="\text{YR: } 3 \times 5 = 15" />}
              <Readout
                tex={`\\Pr = \\tfrac{${shaded}}{56}${showYR ? ' = \\tfrac{15}{28}' : ''}`}
              />
            </>
          )}
        </Readouts>
        {s.step === 0 && (
          <Notice>
            Each cell is one way the two draws could go: the row is the first marble, the column the second. The
            diagonal is crossed out because the first marble is not put back, so it cannot come out again. That
            leaves <M>8 \times 7 = 56</M> cells, all equally likely. Press Next to shade the ones with different
            colours.
          </Notice>
        )}
        {s.step === 1 && (
          <Notice tone="warn">
            Red first, then yellow: <M>5</M> red rows times <M>3</M> yellow columns is <M>15</M> cells, so{' '}
            <M>{'\\Pr(RY) = \\tfrac{15}{56}'}</M>, exactly <M>{'\\tfrac58 \\times \\tfrac37'}</M>. That is option D, the
            answer 12% of students chose. But look at the bottom-left of the grid: those draws also have
            different colours.
          </Notice>
        )}
        {s.step === 2 && (
          <Notice tone="good">
            Yellow first, then red adds another <M>3 \times 5 = 15</M> cells, the mirror image of the first block
            across the diagonal. So <M>{'\\Pr(\\text{different}) = \\tfrac{30}{56} = \\tfrac{15}{28}'}</M>, option C.
            The two blocks are always the same size, which is why <M>{'\\Pr(RY) = \\Pr(YR)'}</M>.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
