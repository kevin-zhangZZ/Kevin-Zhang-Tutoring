// 2016 Methods Exam 1 Q7b — the reduced sample space, drawn as the motors themselves. One hour's
// 90 motors: 40 from Line A (blue block) and 50 from Line B (orange block). Picture an hour in
// which exactly 5% of A's and 8% of B's are faulty: 2 and 4, so 6 faulty motors (ringed in red).
// Stepping through: all 90 (Pr(A) = 4/9); mark the faulty ones (Pr(F) = 6/90 = 1/15, part a., and
// Pr(A ∩ F) = 2/90 = 1/45, where students who miss the reduced sample space stop); then "given
// faulty" fades everything but the 6, and Pr(A | F) = 2/6 = 1/3. On the last step a toggle
// conditions the other way, on Line A: 2 of its 40 are faulty, Pr(F | A) = 1/20, the rate the
// question gives — the reversal the report's comment is about.

import { useState } from 'react'
import { C, Controls, M, Notice, Readout, Readouts, StepNav, Toggle, useSteps } from './kit'

const COLS = 10
const CELL = 26
const LM = 58 // room for the line labels
const TOP = 8
const GAP = 18
const A_ROWS = 4
const B_ROWS = 5
const W = LM + COLS * CELL + 4
const H = TOP + (A_ROWS + B_ROWS) * CELL + GAP + 6

// Which motors are faulty (any 2 of A's 40 and any 4 of B's 50 — the positions don't matter).
const FAULTY_A = new Set([7, 26])
const FAULTY_B = new Set([3, 17, 31, 44])

type Motor = { line: 'A' | 'B'; x: number; y: number; faulty: boolean }
const MOTORS: Motor[] = []
for (let i = 0; i < 40; i++) {
  MOTORS.push({ line: 'A', x: LM + (i % COLS) * CELL + CELL / 2, y: TOP + Math.floor(i / COLS) * CELL + CELL / 2, faulty: FAULTY_A.has(i) })
}
for (let i = 0; i < 50; i++) {
  MOTORS.push({
    line: 'B',
    x: LM + (i % COLS) * CELL + CELL / 2,
    y: TOP + (A_ROWS + Math.floor(i / COLS)) * CELL + GAP + CELL / 2,
    faulty: FAULTY_B.has(i),
  })
}

const STEPS = 3

export default function Faulty() {
  const { step, next, back } = useSteps(STEPS)
  const [givenA, setGivenA] = useState(false)
  const reverse = givenA && step === STEPS - 1

  /** Is this motor still in the sample space? */
  const inSpace = (m: Motor) => (step < 2 ? true : reverse ? m.line === 'A' : m.faulty)

  let readouts
  let notice
  if (step === 0) {
    readouts = (
      <Readouts>
        <Readout tex="\Pr(A) = \tfrac{40}{90} = \tfrac49" color={C.f} />
        <Readout tex="\Pr(B) = \tfrac{50}{90} = \tfrac59" color={C.g} />
      </Readouts>
    )
    notice = (
      <Notice>
        <b>All 90 motors from the hour.</b> The motor is picked from all of them, so Line A&apos;s share is{' '}
        <M>{'\\tfrac{40}{90}'}</M>, not <M>{'\\tfrac12'}</M>. Press Next to mark the faulty ones.
      </Notice>
    )
  } else if (step === 1) {
    readouts = (
      <Readouts>
        <Readout tex="\Pr(F) = \tfrac{6}{90} = \tfrac{1}{15}" color={C.bad} />
        <Readout tex="\Pr(A\cap F) = \tfrac{2}{90} = \tfrac{1}{45}" color={C.f} />
      </Readouts>
    )
    notice = (
      <Notice tone="warn">
        <b>The 6 faulty motors.</b> <M>{'5\\%'}</M> of 40 is 2 and <M>{'8\\%'}</M> of 50 is 4, so 6 of the 90 are faulty:
        that is part (a), <M>{'\\tfrac{1}{15}'}</M>. The 2 faulty Line A motors out of all 90 give{' '}
        <M>{'\\tfrac{1}{45}'}</M> — but that is &ldquo;from A <em>and</em> faulty&rdquo;, still counted over every motor.
        Part (b) tells us the motor <em>is</em> faulty. Press Next.
      </Notice>
    )
  } else if (!reverse) {
    readouts = (
      <Readouts>
        <Readout tex="\Pr(A\mid F) = \tfrac{2}{6} = \tfrac13" color={C.f} />
      </Readouts>
    )
    notice = (
      <Notice tone="good">
        <b>Given faulty, only the 6 faulty motors are left</b> — that is the reduced sample space. 2 of the 6 came from
        Line A, so <M>{'\\Pr(A\\mid F) = \\tfrac26 = \\tfrac13'}</M>. The formula does the same thing:{' '}
        <M>{'\\tfrac{1}{45} \\div \\tfrac{1}{15} = \\tfrac{2/90}{6/90} = \\tfrac26'}</M>, the 90s cancel. Now switch on
        &ldquo;Given Line A instead&rdquo;.
      </Notice>
    )
  } else {
    readouts = (
      <Readouts>
        <Readout tex="\Pr(F\mid A) = \tfrac{2}{40} = \tfrac{1}{20}" color={C.f} />
      </Readouts>
    )
    notice = (
      <Notice>
        <b>Conditioning the other way</b> keeps Line A&apos;s 40 motors instead, and 2 of them are faulty:{' '}
        <M>{'\\Pr(F\\mid A) = \\tfrac{2}{40} = \\tfrac{1}{20}'}</M>, the <M>{'5\\%'}</M> the question gave. The same 2
        motors sit over a different total, so the order of the condition matters: part (b) wants the line{' '}
        <em>given</em> faulty, out of 6.
      </Notice>
    )
  }

  return (
    <div>
      <p className="text-[12.5px] text-gray-600 dark:text-gray-300 mb-2">
        Each circle is one motor from the hour: Line A in blue, Line B in orange. Picture an hour in which exactly{' '}
        <M>{'5\\%'}</M> of Line A&apos;s and <M>{'8\\%'}</M> of Line B&apos;s motors are faulty — only the proportions
        matter, so the probabilities come out the same.
      </p>
      <div className="text-gray-700 dark:text-gray-300">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full max-w-[420px] mx-auto block"
          role="img"
          aria-label="90 motors: 40 from Line A and 50 from Line B, with the 6 faulty motors ringed in red"
        >
          <text x={4} y={TOP + (A_ROWS * CELL) / 2 + 4} fontSize={13} fontWeight={600} fill="currentColor">
            Line A
          </text>
          <text x={4} y={TOP + (A_ROWS * CELL) / 2 + 19} fontSize={11} fill="currentColor" opacity={0.7}>
            40
          </text>
          <text x={4} y={TOP + A_ROWS * CELL + GAP + (B_ROWS * CELL) / 2 + 4} fontSize={13} fontWeight={600} fill="currentColor">
            Line B
          </text>
          <text x={4} y={TOP + A_ROWS * CELL + GAP + (B_ROWS * CELL) / 2 + 19} fontSize={11} fill="currentColor" opacity={0.7}>
            50
          </text>
          {MOTORS.map((m, i) => {
            const on = inSpace(m)
            const col = m.line === 'A' ? C.f : C.g
            const showFault = step >= 1 && m.faulty
            return (
              <g key={i} opacity={on ? 1 : 0.12}>
                <circle cx={m.x} cy={m.y} r={8} fill={col} fillOpacity={showFault ? 1 : 0.45} />
                {showFault && <circle cx={m.x} cy={m.y} r={11} fill="none" stroke={C.bad} strokeWidth={2.6} />}
              </g>
            )
          })}
        </svg>
      </div>
      <div className="mt-2">{readouts}</div>
      <Controls>
        <StepNav
          step={step}
          count={STEPS}
          onBack={() => {
            setGivenA(false)
            back()
          }}
          onNext={next}
        />
        {step === STEPS - 1 && (
          <Toggle label="Given Line A instead" checked={givenA} onChange={setGivenA} />
        )}
      </Controls>
      <div className="mt-3">{notice}</div>
    </div>
  )
}
