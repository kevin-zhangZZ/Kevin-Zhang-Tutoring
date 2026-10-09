// 2017 Methods Exam 1 Q5a — why "never logs on" is (3/5)³. Picture 125 Jacs (125 = 5³, so every
// count comes out whole) and step through the three attempts. Each time, 2 in 5 of those still
// trying get in and stop, and 3 in 5 stay locked out, so the "still trying" group shrinks
// 125 → 75 → 45 → 27 — multiply by 3/5 once per attempt. The layout makes the product visible:
// block = 1st attempt, row = 2nd, column = 3rd, and the 27 locked out are 3 of 5 blocks × 3 of 5
// rows × 3 of 5 columns. The last step also sets up part (b): the other 98 (= 50 + 30 + 18) got in.
// Also exports the dot grid used by the part c. widget (meth-2017e1-q5c-count.tsx).

import type { ReactNode } from 'react'
import { C, M, Notice, Readout, Readouts, StepNav, useSteps } from './kit'

/** When the Jac at (block b, row r, column c) gets in: attempt 1, 2 or 3, or 0 for never.
 *  Blocks 0–1 are the 2 in 5 right on the 1st attempt; within the other blocks rows 0–1 are right
 *  on the 2nd, and within the rest columns 0–1 are right on the 3rd. */
export function attemptIn(b: number, r: number, c: number): 0 | 1 | 2 | 3 {
  if (b < 2) return 1
  if (r < 2) return 2
  if (c < 2) return 3
  return 0
}

/** Colour of a Jac by when they got in (0 = locked out). */
export const IN_COLOUR: Record<0 | 1 | 2 | 3, string> = { 1: C.good, 2: C.f, 3: C.violet, 0: C.bad }

export type DotLook = { fill?: string; stroke?: string; opacity?: number; dashed?: boolean }

// Geometry in the SVG's own units: 5 blocks of 5 × 5 dots side by side, a caption band on top.
const CELL = 12
const GAP = 10
const PADX = 4
export const GRID_TOP = 22
const W = PADX * 2 + 25 * CELL + 4 * GAP
const H = GRID_TOP + 5 * CELL + 4
export const blockX = (b: number) => PADX + b * (5 * CELL + GAP)
export const BLOCK_W = 5 * CELL
export const GRID_H = 5 * CELL

/** A bracket over blocks `from`..`to` with a caption above it. */
export function Caption({ from, to, color, children }: { from: number; to: number; color?: string; children: ReactNode }) {
  const x1 = blockX(from) + 1
  const x2 = blockX(to) + BLOCK_W - 1
  const y = GRID_TOP - 4
  return (
    <g>
      <path d={`M${x1},${y + 3} V${y} H${x2} V${y + 3}`} fill="none" stroke={color ?? C.guide} strokeWidth={1} />
      <text x={(x1 + x2) / 2} y={y - 4} textAnchor="middle" fontSize={10.5} fontWeight={600} fill={color ?? 'currentColor'}>
        {children}
      </text>
    </g>
  )
}

/** The 125 Jacs. `look` styles each dot; `overlay` draws captions/frames in grid units. */
export function JacGrid({ look, overlay, label }: { look: (b: number, r: number, c: number) => DotLook; overlay?: ReactNode; label: string }) {
  const dots: ReactNode[] = []
  for (let b = 0; b < 5; b++)
    for (let r = 0; r < 5; r++)
      for (let c = 0; c < 5; c++) {
        const s = look(b, r, c)
        dots.push(
          <circle
            key={`${b}${r}${c}`}
            cx={blockX(b) + c * CELL + CELL / 2}
            cy={GRID_TOP + r * CELL + CELL / 2}
            r={4.4}
            fill={s.fill ?? 'none'}
            stroke={s.stroke ?? s.fill ?? C.guide}
            strokeWidth={s.fill ? 0.8 : 1.3}
            strokeDasharray={s.dashed ? '2 1.6' : undefined}
            opacity={s.opacity ?? 1}
          />,
        )
      }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full max-w-[600px] mx-auto text-gray-600 dark:text-gray-300" role="img" aria-label={label}>
      {overlay}
      {dots}
    </svg>
  )
}

const STILL = [125, 75, 45, 27]

function Chain({ step }: { step: number }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-[13px] text-gray-700 dark:text-gray-300">
      <span className="basis-full sm:basis-auto text-center text-[12px] text-gray-500 dark:text-gray-400 sm:mr-1">Still locked out:</span>
      {STILL.map((n, i) => (
        <span key={n} className="inline-flex items-center gap-1.5">
          {i > 0 && (
            <span className={`inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 ${i <= step ? '' : 'opacity-30'}`}>
              <M>{'\\times\\tfrac35'}</M>
              <span aria-hidden>→</span>
            </span>
          )}
          <span
            className={`tabular-nums font-semibold px-2 py-0.5 rounded-md border ${
              i <= step
                ? i === 3
                  ? 'border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300'
                  : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900'
                : 'border-dashed border-gray-300 text-gray-500 dark:border-gray-700 dark:text-gray-400'
            }`}
          >
            {i <= step ? n : '?'}
          </span>
        </span>
      ))}
    </div>
  )
}

export default function Attempts() {
  const s = useSteps(4)
  const k = s.step

  const look = (b: number, r: number, c: number): DotLook => {
    const o = attemptIn(b, r, c)
    const faded = k < 3 ? 0.45 : 1
    if (o !== 0 && o <= k) return { fill: IN_COLOUR[o], opacity: o === k ? 1 : faded }
    if (o === 0 && k === 3) return { fill: C.bad }
    return { stroke: C.guide }
  }

  const right = [
    null,
    '75 wrong: try again',
    '30 in on 2nd, 45 try again',
    '18 in on 3rd, 27 locked out',
  ][k]

  const overlay =
    k === 0 ? (
      <Caption from={0} to={4}>125 Jacs, no attempts yet</Caption>
    ) : (
      <>
        <Caption from={0} to={1} color={C.good}>50 in on 1st go</Caption>
        <Caption from={2} to={4} color={k === 3 ? C.bad : undefined}>{right}</Caption>
      </>
    )

  const notices = [
    <Notice key={0}>
      Picture <b>125 Jacs</b> at the same login screen — <M>125 = 5\times5\times5</M>, so every count below is a
      whole number. Each block of 25 is one fifth of them. Every Jac has a <M>\tfrac25</M> chance on each attempt,
      so in any group, about 2 in every 5 get in. Press <b>Next</b> for attempt 1.
    </Notice>,
    <Notice key={1}>
      <b>Attempt 1:</b> 2 in every 5 get in, so 2 of the 5 blocks — <M>125\times\tfrac25 = 50</M> Jacs (green) —
      are in and stop. The other <M>\tfrac35</M> of them, <M>125\times\tfrac35 = 75</M>, are still locked out, and
      only they type again.
    </Notice>,
    <Notice key={2}>
      <b>Attempt 2:</b> of the 75 still trying, 2 in 5 get in — the top 2 rows of each remaining block,{' '}
      <M>75\times\tfrac25=30</M> (blue). Still out: <M>75\times\tfrac35 = 45</M>. We multiplied by{' '}
      <M>\tfrac35</M> again because the attempts are independent: failing once doesn&apos;t change the odds next
      time.
    </Notice>,
    <Notice key={3} tone="good">
      <b>Attempt 3, the last:</b> 18 more get in (violet) and <b>27 are locked out for good</b> (red). So{' '}
      <M>{'\\Pr(\\text{no log on}) = \\tfrac{27}{125} = \\left(\\tfrac35\\right)^3'}</M> — the three factors of <M>\tfrac35</M> are
      the red corner: 3 of 5 blocks, 3 of 5 rows, 3 of 5 columns. Everyone else,{' '}
      <M>50+30+18 = 98</M>, got in: that&apos;s part (b), <M>{'1-\\tfrac{27}{125}'}</M>.
    </Notice>,
  ]

  const readouts = [
    [<Readout key="s" tex="\text{still trying} = 125" color={C.guide} />],
    [
      <Readout key="1" tex="\text{in on 1st} = 125\times\tfrac25 = 50" color={C.good} />,
      <Readout key="s" tex="\text{still out} = 125\times\tfrac35 = 75" color={C.guide} />,
    ],
    [
      <Readout key="2" tex="\text{in on 2nd} = 75\times\tfrac25 = 30" color={C.f} />,
      <Readout key="s" tex="\text{still out} = 125\times\left(\tfrac35\right)^2 = 45" color={C.guide} />,
    ],
    [
      <Readout key="3" tex="\text{in on 3rd} = 45\times\tfrac25 = 18" color={C.violet} />,
      <Readout key="0" tex="\text{locked out} = 125\times\left(\tfrac35\right)^3 = 27" color={C.bad} />,
    ],
  ][k]

  return (
    <div className="flex flex-col gap-3">
      <StepNav step={k} count={4} onBack={s.back} onNext={s.next} />
      <JacGrid
        look={look}
        overlay={overlay}
        label={`125 dots in five blocks of 25 showing how many Jacs are still locked out after attempt ${k}`}
      />
      <Chain step={k} />
      <Readouts>{readouts}</Readouts>
      {notices[k]}
    </div>
  )
}
