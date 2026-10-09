// 2023 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 37% correct.
// Setting up a mixing/dilution differential equation with unequal in/out flow rates.
// Question text transcribed from the original paper. Solution is original.
// Answer A checked with sympy: dQ/dt = 0 - 20Q/(8000 - 5t) = 4Q/(t - 1600). Distractors verified
// exactly: E = +20Q/(8000 - 5t) (minus sign lost), C = -15Q/(8000 - 5t) (inflow rate 15 used for
// the outflow), D = +15Q/(8000 - 5t) (both), B = -20Q/8000 (volume held at 8000 L; equals A at t = 0).
// Interactive diagram (§15): interactives/spec-2023-mcq8-moment.tsx drains the pool with a time
// slider and, for a pool holding 10 kg at that moment, compares the physical rate -20Q/V with each
// option's value; only A agrees at every t, and B agrees only at t = 0.
// Concise/Detailed (Oct 2026): reasons trimmed to the step's "why"; the varying-volume note, the
// current-not-starting-volume note and the option-by-option analysis moved into rows' `more`
// (Detailed only); the sign check is now the final row's one short clause.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const W = lazyWidget(() => import('../interactives/spec-2023-mcq8-moment'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 37, B: 6, C: 13, D: 14, E: 29 },
  answer: 'A',
  comment: (
    <>
      <Katex tex="\tfrac{dQ}{dt}=15\times0-20\times\tfrac{Q}{8000-5t}=\tfrac{-20Q}{8000-5t}=\tfrac{4Q}{t-1600}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="V = 8000 + 15t - 20t = 8000 - 5t" />,
    reason: (
      <>
        Each minute 15 L come in and 20 L go out, so the pool loses 5 L a minute from its starting 8000 L.
      </>
    ),
    more: (
      <>
        The volume is not constant because the two flow rates are different. The model works while{' '}
        <Katex tex="V > 0" />, i.e. for{' '}
        <Katex tex="0 \le t < 1600" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{dQ}{dt} = \text{rate in} - \text{rate out}" />,
    reason: (
      <>
        <Katex tex="Q" /> changes only because chemical arrives or leaves. Each rate is in kg of chemical per minute:
        (litres per minute) <Katex tex="\times" /> (kg in each litre).
      </>
    ),
  },
  {
    working: <Katex display tex="\text{in: } 15 \times 0 = 0" />,
    reason: <>The incoming water is fresh: it carries no chemical.</>,
  },
  {
    working: <Katex display tex="\text{out: } 20 \times \frac{Q}{8000-5t}" />,
    reason: (
      <>
        Well mixed means every litre holds the same amount, <Katex tex="\tfrac{Q}{V}" /> kg, where{' '}
        <Katex tex="V = 8000 - 5t" /> is the current volume. Chemical leaves with the 20 L pumped out each minute.
      </>
    ),
    more: (
      <>
        Dividing by the current volume, not the starting 8000 L, matters: as the pool shrinks, the same{' '}
        <Katex tex="Q" /> kg is packed into fewer litres, so each litre pumped out carries more chemical. The 15 L coming
        in add volume but no chemical.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \frac{dQ}{dt} &= 0 - \frac{20Q}{8000-5t} \\ &= \frac{-20Q}{5(1600-t)} = \frac{-4Q}{1600-t} \end{aligned}"
      />
    ),
    reason: <>Take 5 out of the denominator as a common factor and cancel it with the 20.</>,
  },
  {
    working: <Katex display tex="\frac{-4Q}{1600-t} = \frac{4Q}{-(1600-t)} = \frac{4Q}{t-1600}" />,
    reason: (
      <>
        No option has a minus sign in the numerator, but A and C have <Katex tex="t - 1600" /> in the denominator. So move
        the minus sign down: <Katex tex="-(1600 - t) = t - 1600" />. Dropping the minus sign instead would give E, a
        different (positive) rate.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{dQ}{dt} = \frac{4Q}{t-1600}}" />,
    reason: (
      <>
        Matches option <b>A</b>, which is negative while the pool still holds water (<Katex tex="t < 1600" />): the
        chemical decreases.
      </>
    ),
    more: (
      <>
        A negative rate is what we expect, as only fresh water comes in. E (
        <Katex tex="\tfrac{4Q}{1600-t} = \tfrac{20Q}{8000-5t}" />) is positive, so it says the chemical is increasing.
        C (<Katex tex="\tfrac{3Q}{t-1600} = \tfrac{-15Q}{8000-5t}" />) uses the 15 L/min
        flowing in instead of the 20 L/min flowing out, and D (<Katex tex="\tfrac{3Q}{1600-t}" />) does that and also
        loses the minus sign. B (<Katex tex="\tfrac{-Q}{400} = \tfrac{-20Q}{8000}" />) treats the volume as fixed at 8000
        L, so it is right only at <Katex tex="t = 0" />.
      </>
    ),
  },
]

export default function SpecialistQ8_2023() {
  return (
    <MCQShell
      question={
        <p>
          Initially a spa pool is filled with 8000 litres of water that contains a quantity of dissolved chemical.
          It is discovered that too much chemical is contained in the spa pool water. To correct this situation,
          20 litres of well-mixed spa pool water is pumped out every minute while 15 litres of fresh water is
          pumped in each minute.
          <br />
          Let <Katex tex="Q" /> be the number of kilograms of chemical that remains dissolved in the spa pool after{' '}
          <Katex tex="t" /> minutes.
          <br />
          The differential equation relating <Katex tex="Q" /> to <Katex tex="t" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{dQ}{dt}=\dfrac{4Q}{t-1600}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\dfrac{dQ}{dt}=\dfrac{-Q}{400}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{dQ}{dt}=\dfrac{3Q}{t-1600}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{dQ}{dt}=\dfrac{3Q}{1600-t}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{dQ}{dt}=\dfrac{4Q}{1600-t}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <Explore title="Test the options at one moment: chemical leaves at 20 × Q ÷ V, and V keeps shrinking">
          <W />
        </Explore>
      }
    />
  )
}
