// 2022 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 39% correct. The
// maximal domain of f(x) = ln((x+a)/(x−a)). Question text transcribed from the original
// paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 15, C: 39, D: 40, E: 3 },
  answer: 'C',
  comment: <>For the maximal domain, solve <Katex tex="\dfrac{x+a}{x-a}>0" /> for <Katex tex="x" />. The maximal domain is <Katex tex="\mathbb{R}\setminus[-a,a]" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \log_e\!\left(\frac{x+a}{x-a}\right)" />,
    reason: <>Need <Katex tex="\dfrac{x+a}{x-a} > 0" />, since log is only defined for positive input.</>,
  },
  {
    working: <Katex display tex="\text{Critical points: } x=-a,\ x=a" />,
    reason: 'Where the numerator or denominator is zero.',
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span><Katex tex="x<-a" />: both <Katex tex="x+a<0" /> and <Katex tex="x-a<0" /> → ratio positive ✓</span>
        <span><Katex tex="-a<x<a" />: <Katex tex="x+a>0" /> but <Katex tex="x-a<0" /> → ratio negative ✗</span>
        <span><Katex tex="x>a" />: both <Katex tex="x+a>0" /> and <Katex tex="x-a>0" /> → ratio positive ✓</span>
      </div>
    ),
    reason: <>Test the sign of <Katex tex="\dfrac{x+a}{x-a}" /> on each of the three intervals created by the critical points (recall <Katex tex="a>0" />).</>,
  },
  {
    working: <Katex display tex="\boxed{(-\infty,-a)\cup(a,\infty) = \mathbb{R}\setminus[-a,a]}" />,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function MethodsQ13_2022() {
  return (
    <MCQShell
      question={
        <p>
          The function <Katex tex="f(x)=\log_e\!\left(\dfrac{x+a}{x-a}\right)" />, where <Katex tex="a" /> is a
          positive real constant, has the maximal domain
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="[-a,a]" /> },
        { letter: 'B', content: <Katex tex="(-a,a)" /> },
        { letter: 'C', content: <Katex tex="\mathbb{R}\setminus[-a,a]" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\mathbb{R}\setminus(-a,a)" /> },
        { letter: 'E', content: <Katex tex="\mathbb{R}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
