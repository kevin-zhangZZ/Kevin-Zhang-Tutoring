// 2020 Methods Exam 1 Q5b — why the answer has the shape a³/(b⁴ − c⁴). Give each person one of
// five equally likely tickets, three marked "has the gene" and two "doesn't" (that is the 3/5).
// Four people then have 5⁴ = 625 equally likely ticket combinations: a 25 × 25 square, persons 1
// and 2 across, persons 3 and 4 down. Each of the 16 blocks is one path of part a.'s tree, and its
// cell count is that path's probability in 625ths. Stepping through: exactly two with the gene is
// six blocks of 3² × 2² = 36 cells, so 6 × 6² = 6³ = 216; "given at least one" crosses out only
// the 2⁴ = 16-cell corner where nobody has it, leaving 5⁴ − 2⁴ = 609; the answer is the orange
// share of what is left, 216/609. On the last step a toggle conditions on "person 1 has it"
// instead (the fix-one-person slip): 250 cells go, and the share drops to 108/375 = 36/125.

import { useState } from 'react'
import { Buttons, C, Controls, M, Notice, Readout, Readouts, StepNav, Toggle, useSteps } from './kit'
import { Dot } from './meth-2020e1-q5a-tree'

const HAS = <Dot on />
const NOT = <Dot on={false} />
const NOBODY = <>{NOT}{NOT}{NOT}{NOT}</>

// The four bands on each side, in cells: both have the gene (3 × 3 tickets), first only (3 × 2),
// second only (2 × 3), neither (2 × 2).
const BANDS = [
  { pat: [true, true], w: 9, k: 2 },
  { pat: [true, false], w: 6, k: 1 },
  { pat: [false, true], w: 6, k: 1 },
  { pat: [false, false], w: 4, k: 0 },
]
const START = [0, 9, 15, 21]
const CELL = 12
const LM = 34 // room for the row-band dots
const TM = 22 // room for the column-band dots
const SIDE = 25 * CELL

const STEPS = 4

export default function Given() {
  const { step, next, back } = useSteps(STEPS)
  const [fixOne, setFixOne] = useState(false)
  const wrong = fixOne && step === STEPS - 1

  const showTwo = step >= 1
  /** Ruled out by the condition: the "nobody" corner, or (wrong idea) every column where person 1 lacks the gene. */
  const ruledOut = (c: number, r: number) => (wrong ? !BANDS[c].pat[0] : step >= 2 && c === 3 && r === 3)

  let left = 625
  let orange = 216
  if (wrong) {
    left = 375
    orange = 108
  } else if (step >= 2) {
    left = 609
  }

  let notice
  if (step === 0) {
    notice = (
      <Notice>
        <b>625 equally likely outcomes.</b> Give each person one of five equally likely tickets: three say &ldquo;has the
        gene&rdquo; ({HAS}) and two say &ldquo;doesn&apos;t&rdquo; ({NOT}), which is exactly a probability of{' '}
        <M>{'\\tfrac35'}</M>. Four people make <M>{'5 \\times 5 \\times 5 \\times 5 = 5^4 = 625'}</M> equally likely combinations:
        the small cells. The {HAS}{HAS} band is <M>3 \times 3 = 9</M> cells wide, the {NOT}{NOT} band <M>2 \times 2 = 4</M>. Each
        block is one path of the tree in part a., and its number of cells is that path&apos;s probability out of 625.
      </Notice>
    )
  } else if (step === 1) {
    notice = (
      <Notice>
        <b>Exactly two with the gene</b> is the six orange blocks, one for each choice of which two people have it:{' '}
        <M>{'\\binom42 = 6'}</M>. Every one of them is <M>{'3 \\times 3 \\times 2 \\times 2 = 3^2 \\times 2^2 = 6^2 = 36'}</M> cells
        (three tickets for each person with the gene, two for each without). So there are{' '}
        <M>{'6 \\times 6^2 = 6^3 = 216'}</M> orange cells: <M>{'\\Pr(X=2) = \\tfrac{6^3}{5^4}'}</M>. There is the{' '}
        <M>a^3</M>.
      </Notice>
    )
  } else if (step === 2) {
    notice = (
      <Notice>
        <b>Given at least one has the gene.</b> The only outcomes this rules out are the ones where <b>nobody</b> has it: the{' '}
        {NOBODY} corner, <M>{'2 \\times 2 \\times 2 \\times 2 = 2^4 = 16'}</M> cells. Everything else is still possible, so the{' '}
        <M>{'5^4 - 2^4 = 609'}</M> cells left are the new whole. That is <M>{'\\Pr(X \\ge 1) = 1 - \\Pr(X = 0) = \\tfrac{5^4 - 2^4}{5^4}'}</M>,
        and there is the <M>b^4 - c^4</M>.
      </Notice>
    )
  } else if (!wrong) {
    notice = (
      <Notice tone="good">
        <b>The answer is the orange share of what&apos;s left</b>: <M>{'\\tfrac{216}{609} = \\tfrac{6^3}{5^4 - 2^4}'}</M>. Dividing{' '}
        <M>{'\\tfrac{6^3}{5^4}'}</M> by <M>{'\\tfrac{5^4 - 2^4}{5^4}'}</M> just cancels the <M>5^4</M>, the same cancelling as in the
        working. Only 16 cells went, so the answer is only a little bigger than <M>{'\\Pr(X=2) = \\tfrac{216}{625} \\approx 0.346'}</M>.
        Now try the wrong idea: &ldquo;at least one has it, so say person 1 has it&rdquo;.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        &ldquo;Person 1 has the gene&rdquo; is a much <b>stronger</b> condition than &ldquo;at least one has it&rdquo;: it crosses out
        every column where person 1 is {NOT}, which is <b>250</b> cells, not 16. What&apos;s left holds 108 orange cells out of
        375: <M>{'\\tfrac{108}{375} = \\tfrac{36}{125} = 0.288'}</M>, the same as{' '}
        <M>{'\\binom31\\left(\\tfrac35\\right)\\left(\\tfrac25\\right)^2'}</M>. That answers a different question. &ldquo;At least
        one&rdquo; doesn&apos;t say <b>which</b> one, so only the {NOBODY} corner goes.
      </Notice>
    )
  }

  /** A band's two people side by side, centred on (cx, cy). */
  const dots = (pat: boolean[], cx: number, cy: number) =>
    pat.map((on, i) => {
      return (
        <circle
          key={i}
          cx={cx + (i - 0.5) * 11}
          cy={cy}
          r={3.8}
          fill={on ? C.f : 'none'}
          stroke={on ? C.f : C.guide}
          strokeWidth={1.4}
        />
      )
    })

  return (
    <div>
      <p className="text-[12.5px] text-gray-600 dark:text-gray-300 mb-2">
        Columns: persons 1 and 2. Rows: persons 3 and 4. {HAS} has the gene, {NOT} doesn&apos;t. Each small cell is one equally
        likely combination of tickets, and the number in a block counts its cells.
      </p>
      <div className="text-gray-700 dark:text-gray-300">
        <svg
          viewBox={`0 0 ${LM + SIDE + 4} ${TM + SIDE + 4}`}
          className="w-full max-w-[400px] mx-auto block"
          role="img"
          aria-label="A 25 by 25 square of equally likely outcomes for four people, split into 16 blocks; the blocks with exactly two people with the gene are orange, and the outcomes ruled out by the condition are hatched"
        >
          <defs>
            <pattern id="meth-2020e1-q5b-hatch" width={6} height={6} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1={0} y1={0} x2={0} y2={6} stroke={C.bad} strokeWidth={1.8} strokeOpacity={0.7} />
            </pattern>
          </defs>
          {BANDS.map((b, c) => <g key={`c${c}`}>{dots(b.pat, LM + (START[c] + b.w / 2) * CELL, TM / 2)}</g>)}
          {BANDS.map((b, r) => <g key={`r${r}`}>{dots(b.pat, LM / 2, TM + (START[r] + b.w / 2) * CELL)}</g>)}
          {BANDS.map((bc, c) =>
            BANDS.map((br, r) => {
              const x = LM + START[c] * CELL
              const y = TM + START[r] * CELL
              const w = bc.w * CELL
              const h = br.w * CELL
              const isTwo = bc.k + br.k === 2
              const out = ruledOut(c, r)
              const hot = showTwo && isTwo
              return (
                <g key={`${c}-${r}`}>
                  <rect
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    className={hot ? undefined : 'fill-gray-100 dark:fill-gray-800'}
                    fill={hot ? C.g : undefined}
                    fillOpacity={hot ? (out ? 0.25 : 0.6) : 1}
                  />
                  {out && <rect x={x} y={y} width={w} height={h} fill="url(#meth-2020e1-q5b-hatch)" />}
                </g>
              )
            }),
          )}
          {/* The 625 cells, faintly. */}
          {Array.from({ length: 26 }, (_, i) => (
            <g key={i}>
              <line x1={LM + i * CELL} y1={TM} x2={LM + i * CELL} y2={TM + SIDE} stroke="currentColor" strokeOpacity={0.14} strokeWidth={0.6} />
              <line x1={LM} y1={TM + i * CELL} x2={LM + SIDE} y2={TM + i * CELL} stroke="currentColor" strokeOpacity={0.14} strokeWidth={0.6} />
            </g>
          ))}
          {/* Block borders and counts; a ruled-out count gets a halo so it still reads over the hatching. */}
          {BANDS.map((bc, c) =>
            BANDS.map((br, r) => {
              const x = LM + START[c] * CELL
              const y = TM + START[r] * CELL
              const out = ruledOut(c, r)
              const hot = showTwo && bc.k + br.k === 2
              return (
                <g key={`b${c}-${r}`}>
                  <rect x={x} y={y} width={bc.w * CELL} height={br.w * CELL} fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.2} />
                  <text
                    x={x + (bc.w * CELL) / 2}
                    y={y + (br.w * CELL) / 2 + 4.5}
                    fontSize={13}
                    fontWeight={hot ? 800 : 600}
                    textAnchor="middle"
                    fill="currentColor"
                    opacity={out ? 0.8 : hot ? 1 : 0.7}
                    className={out ? 'stroke-white dark:stroke-gray-900' : undefined}
                    strokeWidth={out ? 4 : 0}
                    paintOrder="stroke"
                  >
                    {bc.w * br.w}
                  </text>
                </g>
              )
            }),
          )}
        </svg>
      </div>
      <Controls>
        <StepNav step={step} count={STEPS} onBack={() => { back(); setFixOne(false) }} onNext={next} />
        {step === STEPS - 1 && (
          <Buttons>
            <Toggle label="What if I say person 1 has it?" checked={fixOne} onChange={setFixOne} />
          </Buttons>
        )}
        <Readouts>
          {step === 0 && <Readout tex={'\\text{all cells: } 5^4 = 625'} />}
          {step >= 1 && <Readout color={C.g} tex={wrong ? `\\text{orange left: } ${orange}` : '\\text{orange: } 6 \\times 36 = 6^3 = 216'} />}
          {step === 1 && <Readout tex={'\\Pr(X=2) = \\tfrac{216}{625} \\approx 0.346'} />}
          {step >= 2 && (
            <Readout tex={wrong ? `\\text{left: } 625 - 250 = ${left}` : '\\text{left: } 5^4 - 2^4 = 625 - 16 = 609'} />
          )}
          {step === 3 && (
            <Readout
              color={wrong ? C.bad : C.good}
              tex={wrong ? '\\tfrac{108}{375} = \\tfrac{36}{125} = 0.288' : '\\Pr(X=2 \\mid X \\ge 1) = \\tfrac{216}{609} \\approx 0.355'}
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
