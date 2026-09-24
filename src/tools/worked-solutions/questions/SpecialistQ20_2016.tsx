// 2016 Specialist Mathematics — Exam 2, MCQ 20. VCAA examination report: 68% correct.
// The distribution of a sample mean of 25 battery lifetimes. Question text transcribed
// from the original paper; answer verified with scipy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 4, C: 14, D: 7, E: 68 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\mathrm{E}(\bar X)=20,\ \mathrm{sd}(\bar X)=\tfrac{2}{\sqrt{25}}=\tfrac25" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim N\!\left(20,\,2^2\right), \qquad n = 25" />,
    reason: <>One battery. The question asks about the mean of twenty-five, so this is not the distribution to use directly.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(\bar X) = 20, \qquad \mathrm{sd}(\bar X) = \frac{2}{\sqrt{25}} = \frac25" />,
    reason: <>Averaging leaves the centre alone and shrinks the spread by <Katex tex="\sqrt{n}" />.</>,
  },
  {
    working: <Katex display tex="\Pr(\bar X>19.3) = \Pr\!\left(Z>\frac{19.3-20}{0.4}\right) = \Pr(Z>-1.75)" />,
    reason: <>Standardising with the standard deviation of the mean.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(19.3, ∞, 20, 0.4)</Cas>,
    reason: <>Or directly, without standardising.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.9599}" />,
    reason: <>Matches option <b>E</b>. Option A is the complement, <Katex tex="\Pr(\bar X<19.3)" />. Sensible: <Katex tex="19.3" /> is below the mean, so the probability of exceeding it must be well over a half — options A and B fail that check on sight.</>,
  },
]

export default function SpecialistQ20_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The lifetime of a certain brand of batteries is normally distributed with a mean
            lifetime of <Katex tex="20" /> hours and a standard deviation of two hours. A
            random sample of <Katex tex="25" /> batteries is selected.
          </p>
          <p>
            The probability that the mean lifetime of this sample of <Katex tex="25" />{' '}
            batteries exceeds <Katex tex="19.3" /> hours is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.0401" /> },
        { letter: 'B', content: <Katex tex="0.1368" /> },
        { letter: 'C', content: <Katex tex="0.6103" /> },
        { letter: 'D', content: <Katex tex="0.8632" /> },
        { letter: 'E', content: <Katex tex="0.9599" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
