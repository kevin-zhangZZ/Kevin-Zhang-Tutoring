// 2018 Specialist Mathematics — Exam 2, MCQ 19. VCAA examination report: 57% correct.
// A probability about the sample mean, using the distribution of X̄ rather than X itself.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 7, C: 25, D: 7, E: 57 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim N(\mu, \sigma^2), \qquad \mu=66, \ \sigma^2=\frac{16}{9}" />,
    reason: 'The gestation period of a single cat.',
  },
  {
    working: <Katex display tex="\bar X \sim N\!\left(\mu, \frac{\sigma^2}{n}\right), \qquad n=5" />,
    reason: <>The sample <em>mean</em> of 5 cats has a smaller variance than a single cat's gestation period — this is the step most easily forgotten.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} \mathrm{Var}(\bar X) &= \frac{16/9}{5} \\ &= \frac{16}{45} \end{aligned}" />
        <Katex display tex="\begin{aligned} \mathrm{sd}(\bar X) &= \sqrt{\frac{16}{45}} \\ &= \frac{4}{3\sqrt5} \end{aligned}" />
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\Pr(\bar X > 65) = \Pr\!\left(Z > \frac{65-66}{4/(3\sqrt5)}\right)" />
        <Katex display tex="= \Pr\bigl(Z > -0.75\sqrt5\bigr) = \Pr(Z>-1.677)" />
      </>
    ),
    reason: 'Standardise using the distribution of the sample mean, not the individual variable.',
  },
  {
    working: <Katex display tex="\boxed{\Pr(Z>-1.677) \approx 0.9532}" />,
    reason: <>Matches option <b>E</b>.</>,
  },
]

export default function SpecialistQ19_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The gestation period of cats is normally distributed with mean <Katex tex="\mu=66" /> days and
            variance <Katex tex="\sigma^2=\dfrac{16}{9}" />.
          </p>
          <p>
            The probability that a sample of five cats chosen at random has an average gestation period
            greater than 65 days is closest to
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.5000" /> },
        { letter: 'B', content: <Katex tex="0.7131" /> },
        { letter: 'C', content: <Katex tex="0.7734" /> },
        { letter: 'D', content: <Katex tex="0.8958" /> },
        { letter: 'E', content: <Katex tex="0.9532" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
