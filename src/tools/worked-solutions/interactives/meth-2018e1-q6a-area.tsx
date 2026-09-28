// 2018 Methods Exam 1 Q6a — probability as area. The square is the whole sample space
// (probability 1). Step 1 cuts it into two equal columns (choose a box, 1/2 each); step 2 cuts each
// column into its stones (1/4 of the column each), so every stone is a 1/2 × 1/4 = 1/8 rectangle —
// which is why you multiply along a tree branch; step 3 shades the black stones: all of Box 1 (1/2)
// plus the top half of Box 2 (1/4), so Pr(black) = 3/4 (add the black branches). A "what if" toggle
// gives Box 2 six stones (2 black, 4 white): its stones shrink to 1/12, and counting black stones
// (6 of 10 = 3/5) no longer matches the black area (1/2 + 1/6 = 2/3) — the report's 6/8 counting
// shortcut works only because both boxes hold the same number of stones.

import { useState } from 'react'
import { C, Controls, M, Notice, Readout, Readouts, StepNav, Toggle, useSteps } from './kit'

// The square, in the SVG's own units (viewBox 340 × 262).
const X = 60
const W = 220
const Y = 34
const H = 200
const COL = W / 2

type Cell = { box: 1 | 2; i: number; n: number; black: boolean }
function makeCells(box2n: number): Cell[] {
  const out: Cell[] = []
  for (let i = 0; i < 4; i++) out.push({ box: 1, i, n: 4, black: true })
  for (let i = 0; i < box2n; i++) out.push({ box: 2, i, n: box2n, black: i < 2 })
  return out
}
const colX = (box: 1 | 2) => X + (box - 1) * COL
const cellY = (c: Cell) => Y + (c.i * H) / c.n

/** A stone: black or white, outlined so both read on a light or dark page. */
function Stone({ cx, cy, r, black }: { cx: number; cy: number; r: number; black: boolean }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={black ? '#111827' : '#ffffff'}
      stroke={black ? '#94a3b8' : '#64748b'}
      strokeWidth={1.4}
    />
  )
}

export default function StonesAsArea() {
  const { step, next, back } = useSteps(3)
  const [whatIf, setWhatIf] = useState(false)
  const n2 = whatIf ? 6 : 4
  const cells = makeCells(n2)
  const box2Black = whatIf ? '\\tfrac26' : '\\tfrac12'
  const box2Term = whatIf ? '\\tfrac16' : '\\tfrac14'

  const blockLabel = (x: number, yMid: number, l1: string, l2: string, color: string) => (
    <g>
      <text x={x} y={yMid - 3} fontSize={10.5} textAnchor="middle" fill={color} fontWeight={700}>
        {l1}
      </text>
      <text x={x} y={yMid + 11} fontSize={10.5} textAnchor="middle" fill={color} fontWeight={700}>
        {l2}
      </text>
    </g>
  )

  let notice
  if (step === 0) {
    notice = (
      <Notice>
        The whole square is probability <M>1</M>. Choosing a box cuts it into two equal columns, each of area{' '}
        <M>{'\\tfrac12'}</M>: these are the first two branches of the tree. Press <b>Next</b> to draw a stone.
      </Notice>
    )
  } else if (step === 1) {
    notice = whatIf ? (
      <Notice tone="warn">
        With six stones, Box 2&apos;s column is cut into six thinner strips, each{' '}
        <M>{'\\tfrac12 \\times \\tfrac16 = \\tfrac1{12}'}</M>, while Box 1&apos;s stones are still{' '}
        <M>{'\\tfrac18'}</M>. The ten stones are no longer equally likely. Press <b>Next</b> to see what that does to
        counting.
      </Notice>
    ) : (
      <Notice>
        Each column is now cut into its four stones. A stone&apos;s rectangle is <M>{'\\tfrac12'}</M> wide and{' '}
        <M>{'\\tfrac14'}</M> of the column tall, so its area is <M>{'\\tfrac12 \\times \\tfrac14 = \\tfrac18'}</M>. That is
        why you <b>multiply</b> along a branch: the second probability is a fraction <em>of</em> the first. Press{' '}
        <b>Next</b> to shade the black stones.
      </Notice>
    )
  } else {
    notice = whatIf ? (
      <Notice tone="warn">
        The black area is now <M>{'\\tfrac12 + \\tfrac16 = \\tfrac23'}</M>, but counting says 6 black stones out of 10,{' '}
        <M>{'\\tfrac35'}</M>. Counting fails because Box 2&apos;s stones are smaller rectangles. The tree (area) method
        always works; the report&apos;s <M>{'\\tfrac68'}</M> shortcut needs every stone to have the same area, which
        happens here only because both boxes hold four stones. Turn the toggle off to return to the exam&apos;s boxes.
      </Notice>
    ) : (
      <Notice tone="good">
        Black covers all of Box 1&apos;s column, <M>{'\\tfrac12 \\times 1 = \\tfrac12'}</M>, and the top half of Box
        2&apos;s, <M>{'\\tfrac12 \\times \\tfrac12 = \\tfrac14'}</M>. The two pieces don&apos;t overlap, so you{' '}
        <b>add</b>: <M>{'\\Pr(K) = \\tfrac34'}</M>. The white quarter is <M>{'\\Pr(W) = \\tfrac14'}</M>, the
        report&apos;s <M>{'1 - \\tfrac14'}</M> route. All eight rectangles are equal, so counting 6 black out of 8 gives
        the same answer. Tick the <b>what if</b> box to see when counting breaks.
      </Notice>
    )
  }

  return (
    <div>
      <div className="text-gray-700 dark:text-gray-300">
        <svg
          viewBox="0 0 340 262"
          className="w-full max-w-[440px] mx-auto block"
          role="img"
          aria-label="A unit square split into a column for each box; each column is split into its stones, and the black stones are shaded"
        >
          {/* Column headers and widths */}
          {([1, 2] as const).map(b => (
            <g key={b}>
              <text x={colX(b) + COL / 2} y={Y - 10} fontSize={12} fontWeight={700} textAnchor="middle" fill="currentColor">
                Box {b}
              </text>
              <line x1={colX(b) + 4} x2={colX(b) + COL - 4} y1={Y + H + 8} y2={Y + H + 8} stroke="currentColor" strokeOpacity={0.5} />
              <text x={colX(b) + COL / 2} y={Y + H + 22} fontSize={11} textAnchor="middle" fill="currentColor" opacity={0.8}>
                width 1/2
              </text>
            </g>
          ))}

          {/* Cell tints (step 3: black stones shaded by box) */}
          {cells.map(c => {
            const tint = step === 2 && c.black ? (c.box === 1 ? C.f : C.g) : null
            return (
              <rect
                key={`t${c.box}-${c.i}`}
                x={colX(c.box)}
                y={cellY(c)}
                width={COL}
                height={H / c.n}
                fill={tint ?? 'currentColor'}
                fillOpacity={tint ? 0.24 : 0.05}
              />
            )
          })}

          {/* Cell dividers (step 2 only: one rectangle per stone) */}
          {step === 1 &&
            cells
              .filter(c => c.i > 0)
              .map(c => (
                <line
                  key={`d${c.box}-${c.i}`}
                  x1={colX(c.box)}
                  x2={colX(c.box) + COL}
                  y1={cellY(c)}
                  y2={cellY(c)}
                  stroke="currentColor"
                  strokeOpacity={0.35}
                  strokeDasharray="4 3"
                />
              ))}

          {/* The square and the box divider */}
          <rect x={X} y={Y} width={W} height={H} fill="none" stroke="currentColor" strokeWidth={1.6} />
          <line x1={X + COL} x2={X + COL} y1={Y} y2={Y + H} stroke="currentColor" strokeWidth={1.6} />

          {/* Stones */}
          {cells.map(c => (
            <Stone
              key={`s${c.box}-${c.i}`}
              cx={colX(c.box) + 28}
              cy={cellY(c) + H / c.n / 2}
              r={c.n === 4 ? 13 : 10.5}
              black={c.black}
            />
          ))}

          {/* Step 1: each column is 1/2 */}
          {step === 0 &&
            ([1, 2] as const).map(b => (
              <text key={b} x={colX(b) + 78} y={Y + H / 2 + 6} fontSize={18} fontWeight={700} textAnchor="middle" fill="currentColor">
                1/2
              </text>
            ))}

          {/* Step 2: each stone's area */}
          {step === 1 &&
            cells.map(c => (
              <text
                key={`a${c.box}-${c.i}`}
                x={colX(c.box) + 78}
                y={cellY(c) + H / c.n / 2 + 4}
                fontSize={11}
                textAnchor="middle"
                fill={c.n === 4 ? 'currentColor' : C.bad}
                fontWeight={c.n === 4 ? 400 : 700}
              >
                {c.n === 4 ? '1/8' : '1/12'}
              </text>
            ))}

          {/* Step 3: the black blocks and the white one */}
          {step === 2 && (
            <>
              {blockLabel(colX(1) + 78, Y + H / 2, '1/2 × 1', '= 1/2', C.f)}
              {blockLabel(colX(2) + 78, Y + (2 * H) / n2 / 2, whatIf ? '1/2 × 2/6' : '1/2 × 1/2', whatIf ? '= 1/6' : '= 1/4', C.g)}
              <text x={colX(2) + 78} y={Y + (H + (2 * H) / n2) / 2 + 4} fontSize={10.5} textAnchor="middle" fill="currentColor" opacity={0.7}>
                white
              </text>
            </>
          )}
        </svg>
      </div>
      <Controls>
        <StepNav step={step} count={3} onBack={back} onNext={next} />
        <Toggle label="What if Box 2 had 6 stones (2 black, 4 white)?" checked={whatIf} onChange={setWhatIf} />
        <Readouts>
          {step === 0 && <Readout tex={'\\Pr(B_1) = \\Pr(B_2) = \\tfrac12'} />}
          {step === 1 && <Readout tex={'\\text{Box 1 stone: } \\tfrac12 \\times \\tfrac14 = \\tfrac18'} />}
          {step === 1 && (
            <Readout
              color={whatIf ? C.bad : undefined}
              tex={whatIf ? '\\text{Box 2 stone: } \\tfrac12 \\times \\tfrac16 = \\tfrac1{12}' : '\\text{Box 2 stone: } \\tfrac12 \\times \\tfrac14 = \\tfrac18'}
            />
          )}
          {step === 2 && <Readout color={C.f} tex={'\\tfrac12 \\times 1 = \\tfrac12'} />}
          {step === 2 && <Readout color={C.g} tex={`\\tfrac12 \\times ${box2Black} = ${box2Term}`} />}
          {step === 2 && <Readout tex={whatIf ? '\\Pr(K) = \\tfrac12 + \\tfrac16 = \\tfrac23' : '\\Pr(K) = \\tfrac12 + \\tfrac14 = \\tfrac34'} />}
          {step === 2 && whatIf && <Readout color={C.bad} tex={'\\text{counting: } \\tfrac{6}{10} = \\tfrac35 \\ne \\tfrac23'} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
