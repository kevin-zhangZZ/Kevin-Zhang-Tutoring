// 2015 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 43% correct
// (tied for fourth-hardest in the 2014-2016 Specialist Exam 2 papers).
// Identify which relation's graph in the complex plane passes through a given point.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 8, C: 21, D: 16, E: 43 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>A sketch of each shows that option E is the line <Katex tex="x=1" />.</>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="z = 1+2i" />
        <Katex display tex="\implies\; \bar z = 1-2i" />
      </>
    ),
    reason: <>Write down the point being tested, <Katex tex="z=1+2i" />, and its conjugate — both are needed to check the options.</>,
  },
  {
    working: <Katex display tex="\text{A: } z\bar z = |z|^2 = 1^2+2^2 = 5 \ne \sqrt5" />,
    reason: <>Option A requires <Katex tex="z\bar z=\sqrt5" />, i.e. <Katex tex="|z|=5^{1/4}" /> — but <Katex tex="|1+2i|=\sqrt5\ne 5^{1/4}" />.</>,
  },
  {
    working: <Katex display tex="\text{B: } \mathrm{Arg}(1+2i) = \arctan(2) \approx 1.107 \ne \frac{\pi}{3}\approx1.047" />,
  },
  {
    working: <Katex display tex="\text{C: } |z-1| = |2i| = 2, \qquad |z-2i| = |1| = 1 \quad (2 \ne 1)" />,
  },
  {
    working: <Katex display tex="\text{D: } \mathrm{Re}(z)=1, \qquad 2\,\mathrm{Im}(z) = 4 \quad (1 \ne 4)" />,
  },
  {
    working: <Katex display tex="\text{E: } z+\bar z = (1+2i)+(1-2i) = 2 \quad \checkmark" />,
    reason: <>This one holds exactly. Since <Katex tex="z+\bar z = 2\,\mathrm{Re}(z)" /> for every <Katex tex="z" />, the relation <Katex tex="z+\bar z=2" /> is really just <Katex tex="\mathrm{Re}(z)=1" /> — the vertical line <Katex tex="x=1" /> — which does pass through <Katex tex="1+2i" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z+\bar z = 2}" />,
    reason: <>Matches option <b>E</b>.</>,
  },
]

export default function SpecialistQ6_2015() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following relations has a graph that passes through the point <Katex tex="1+2i" />{' '}
          in the complex plane?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="z\bar z = \sqrt5" /> },
        { letter: 'B', content: <Katex tex="\mathrm{Arg}(z) = \dfrac{\pi}{3}" /> },
        { letter: 'C', content: <Katex tex="|z-1| = |z-2i|" /> },
        { letter: 'D', content: <Katex tex="\mathrm{Re}(z) = 2\,\mathrm{Im}(z)" /> },
        { letter: 'E', content: <Katex tex="z+\bar z = 2" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
