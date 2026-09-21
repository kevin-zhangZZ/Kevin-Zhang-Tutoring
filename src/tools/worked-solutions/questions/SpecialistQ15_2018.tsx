// 2018 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 69% correct.
// A constant force accelerating a particle between two speeds over a given distance.
//
// Newton's second law is off the current study design, but this question needs it only as a
// single substitution, F = ma, after an ordinary constant-acceleration calculation. Guide
// §13.7 — judge the mathematics, not the vocabulary; the skip guide records the same reading
// here as it does for 2019 Exam 2 MCQ 13.
//
// Question text transcribed from the original paper; VCAA printed no diagram and neither
// does the stem here (guide §7). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 7, C: 17, D: 4, E: 69 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="v^2 = u^2 + 2as" />,
    reason: <>The constant-acceleration relation linking the two speeds to the distance, with no time involved — which is what makes it the right one here, since no time is given.</>,
  },
  {
    working: <Katex display tex="20^2 = 4^2 + 2a(15)" />,
    reason: <>Substituting <Katex tex="u=4" />, <Katex tex="v=20" />, <Katex tex="s=15" />.</>,
  },
  {
    working: <Katex display tex="400 - 16 = 30a \implies 384 = 30a" />,
    reason: <>Rearranging.</>,
  },
  {
    working: <Katex display tex="a = \frac{384}{30} = 12.8 \ \text{m s}^{-2}" />,
    reason: <>The acceleration. Option <b>C</b> is exactly this value — it is the answer to a question that was not asked.</>,
  },
  {
    working: <Katex display tex="P = ma = 8 \times 12.8" />,
    reason: <>Force equals mass times acceleration. This is the one line of mechanics in the question, and everything else is ordinary algebra.</>,
  },
  {
    working: <Katex display tex="\boxed{P = 102.4 \text{ newtons}}" />,
    reason: <>Matches option <b>E</b>. Option <b>C</b> <Katex tex="(12.8)" />, chosen by <Katex tex="17\%" />, stops at the acceleration and forgets to multiply by the mass. Option <b>A</b> <Katex tex="(9.8)" /> is just <Katex tex="g" />, which plays no part here — the motion is horizontal and gravity is irrelevant.</>,
  },
]

export default function SpecialistQ15_2018() {
  return (
    <MCQShell
      question={
        <p>
          A constant force of magnitude <Katex tex="P" /> newtons accelerates a particle of
          mass <Katex tex="8" /> kg in a straight line from a speed of <Katex tex="4" /> m
          s<Katex tex="^{-1}" /> to a speed of <Katex tex="20" /> m s<Katex tex="^{-1}" /> over
          a distance of <Katex tex="15" /> m. The magnitude of <Katex tex="P" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="9.8" /> },
        { letter: 'B', content: <Katex tex="12.5" /> },
        { letter: 'C', content: <Katex tex="12.8" /> },
        { letter: 'D', content: <Katex tex="100" /> },
        { letter: 'E', content: <Katex tex="102.4" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Two steps, and the options punish stopping after one">
          <p>
            Speeds and a distance, with no time mentioned, point straight at{' '}
            <Katex tex="v^2=u^2+2as" />. That gives the acceleration.
          </p>
          <p>
            The question asks for a <em>force</em>, though, so one more step is needed:{' '}
            <Katex tex="P=ma" />. The acceleration itself appears as option C, so finishing
            the second step is the whole difference between the two.
          </p>
        </Background>
      }
    />
  )
}
