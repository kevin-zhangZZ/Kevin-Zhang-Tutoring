// 2024 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 36% correct. This
// year's paper used four options (A–D) rather than five. Given the vector resolute of r in
// the direction of s, find the scalar resolute of s in the direction of r. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 36, C: 33, D: 17 },
  answer: 'B',
  comment: (
    <>
      Vector resolute of <Katex tex="\underset{\sim}{r}" /> in the direction of{' '}
      <Katex tex="\underset{\sim}{s}=\dfrac{\underset{\sim}{r}\cdot \underset{\sim}{s}}{|\underset{\sim}{s}|^2}\underset{\sim}{s}=-4\underset{\sim}{i}+4\underset{\sim}{j}-2\underset{\sim}{k}" />
      <br />
      so <Katex tex="\dfrac{\underset{\sim}{r}\cdot \underset{\sim}{s}}{9}\left(2\underset{\sim}{i}-2\underset{\sim}{j}+\underset{\sim}{k}\right)=-4\underset{\sim}{i}+4\underset{\sim}{j}-2\underset{\sim}{k}" /> hence{' '}
      <Katex tex="\underset{\sim}{r}\cdot \underset{\sim}{s}=-18" />.
      <br />
      Scalar resolute or <Katex tex="\underset{\sim}{s}" /> in the direction of{' '}
      <Katex tex="\underset{\sim}{r}=\dfrac{\underset{\sim}{r}\cdot \underset{\sim}{s}}{|\underset{\sim}{r}|}=-\dfrac{18}{9}=-2" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{vector resolute of } \underset{\sim}{r} \text{ on } \underset{\sim}{s} = \left(\frac{\underset{\sim}{r}\cdot\underset{\sim}{s}}{|\underset{\sim}{s}|^2}\right)\underset{\sim}{s}" />,
    reason: (
      <>
        Standard formula for the vector resolute of <Katex tex="\underset{\sim}{r}" /> in the direction of{' '}
        <Katex tex="\underset{\sim}{s}" />. Matching it to the given resolute lets us find{' '}
        <Katex tex="\underset{\sim}{r}\cdot\underset{\sim}{s}" /> without knowing <Katex tex="\underset{\sim}{r}" />.
      </>
    ),
    more: (
      <>
        The plan: the given vector resolute tells us the bracketed number, and that number contains{' '}
        <Katex tex="\underset{\sim}{r}\cdot\underset{\sim}{s}" />. The dot product is the one quantity both resolutes
        share, so once we have it, the scalar resolute asked for is one division away.
      </>
    ),
  },
  {
    working: <Katex display tex="-4\underset{\sim}{i}+4\underset{\sim}{j}-2\underset{\sim}{k} = -2\big(2\underset{\sim}{i}-2\underset{\sim}{j}+\underset{\sim}{k}\big) = -2\underset{\sim}{s}" />,
    reason: <>A vector resolute along <Katex tex="\underset{\sim}{s}" /> is always a multiple of <Katex tex="\underset{\sim}{s}" />, so factor it out.</>,
  },
  {
    working: <Katex display tex="\frac{\underset{\sim}{r}\cdot\underset{\sim}{s}}{|\underset{\sim}{s}|^2} = -2 \;\implies\; \underset{\sim}{r}\cdot\underset{\sim}{s} = -2|\underset{\sim}{s}|^2" />,
    reason: <>Compare with the formula: the number multiplying <Katex tex="\underset{\sim}{s}" /> must be <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="|\underset{\sim}{s}|^2 = 2^2+(-2)^2+1^2 = 9 \;\implies\; \underset{\sim}{r}\cdot\underset{\sim}{s} = -18" />,
    reason: <>Compute <Katex tex="|\underset{\sim}{s}|^2" /> directly from its components.</>,
  },
  {
    working: <Katex display tex="\text{scalar resolute of } \underset{\sim}{s} \text{ on } \underset{\sim}{r} = \frac{\underset{\sim}{s}\cdot\underset{\sim}{r}}{|\underset{\sim}{r}|}" />,
    reason: (
      <>
        Now the roles swap: we resolve <Katex tex="\underset{\sim}{s}" /> onto <Katex tex="\underset{\sim}{r}" />, so divide by{' '}
        <Katex tex="|\underset{\sim}{r}|" /> (not squared). Also <Katex tex="\underset{\sim}{s}\cdot\underset{\sim}{r}=\underset{\sim}{r}\cdot\underset{\sim}{s}" />.
      </>
    ),
    more: (
      <>
        Read &ldquo;scalar resolute of <Katex tex="\underset{\sim}{s}" /> in the direction of <Katex tex="\underset{\sim}{r}" />&rdquo; carefully:
        you always divide by the length of the vector you are resolving <em>onto</em>. The scalar resolute the other way
        round, <Katex tex="\underset{\sim}{r}" /> on <Katex tex="\underset{\sim}{s}" />, would be{' '}
        <Katex tex="\tfrac{-18}{3}=-6" />, which isn&apos;t an option.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{-18}{9} = -2}" />,
    reason: <>Using <Katex tex="|\underset{\sim}{r}|=9" />. Matches option <b>B</b>.</>,
    more: (
      <>
        Sign check: the vector resolute <Katex tex="-2\underset{\sim}{s}" /> points opposite to <Katex tex="\underset{\sim}{s}" />, so
        the angle between <Katex tex="\underset{\sim}{r}" /> and <Katex tex="\underset{\sim}{s}" /> is obtuse and the scalar resolute
        must be negative. That rules out option <b>C</b> (33%, the most common wrong answer), which is the right size with
        the sign lost, and option <b>D</b>, 3, which is just <Katex tex="|\underset{\sim}{s}|" />. Option <b>A</b>,{' '}
        <Katex tex="-18" />, is <Katex tex="\underset{\sim}{r}\cdot\underset{\sim}{s}" /> before dividing by{' '}
        <Katex tex="|\underset{\sim}{r}|" />.
      </>
    ),
  },
]

export default function SpecialistQ14_2024() {
  return (
    <MCQShell
      question={
        <p>
          Consider the vectors <Katex tex="\underset{\sim}{r}" /> and <Katex tex="\underset{\sim}{s}" /> where <Katex tex="|\underset{\sim}{r}|=9" /> and{' '}
          <Katex tex="\underset{\sim}{s}=2\underset{\sim}{i}-2\underset{\sim}{j}+\underset{\sim}{k}" />.
          <br />
          If the vector resolute of <Katex tex="\underset{\sim}{r}" /> in the direction of <Katex tex="\underset{\sim}{s}" /> is equal to{' '}
          <Katex tex="-4\underset{\sim}{i}+4\underset{\sim}{j}-2\underset{\sim}{k}" />, then the scalar resolute of <Katex tex="\underset{\sim}{s}" /> in the direction
          of <Katex tex="\underset{\sim}{r}" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-18" /> },
        { letter: 'B', content: <Katex tex="-2" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="2" /> },
        { letter: 'D', content: <Katex tex="3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
