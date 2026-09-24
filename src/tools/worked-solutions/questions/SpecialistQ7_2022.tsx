// 2022 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 68% correct.
// Changing an integral to a new variable, terminals and all. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 23, C: 5, D: 68, E: 2 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = 1+e^x \implies \frac{du}{dx} = e^x = u-1" />,
    reason: <>Writing the derivative in terms of <Katex tex="u" /> is the move that makes everything cancel later.</>,
  },
  {
    working: <Katex display tex="dx = \frac{du}{u-1}" />,
    reason: <>Rearranging.</>,
  },
  {
    working: <Katex display tex="\int\frac{1}{1+e^x}\,dx = \int\frac{1}{u}\cdot\frac{du}{u-1} = \int\frac{1}{u(u-1)}\,du" />,
    reason: <>The integrand itself is simply <Katex tex="\tfrac1u" />.</>,
  },
  {
    working: <Katex display tex="\frac{1}{u(u-1)} = \frac{A}{u}+\frac{B}{u-1} \implies 1 = A(u-1)+Bu" />,
    reason: <>Partial fractions on the new integrand.</>,
  },
  {
    working: <Katex display tex="u=0: \ A=-1; \quad u=1: \ B=1 \implies \frac{1}{u-1}-\frac{1}{u}" />,
    reason: <>Substituting the two convenient values. Note the order: <Katex tex="\tfrac{1}{u-1}" /> comes first with the plus sign, which is what separates <b>D</b> from <b>B</b>.</>,
  },
  {
    working: <Katex display tex="x=0 \implies u = 1+e^0 = 2; \qquad x=\log_e(2) \implies u = 1+2 = 3" />,
    reason: <>The terminals must change too — leaving them as <Katex tex="0" /> and <Katex tex="\log_e(2)" /> is the trap in <b>A</b>; <b>C</b> starts at <Katex tex="1=e^0" />, dropping the <Katex tex="1+" />, and <b>E</b> substitutes <Katex tex="x=2" /> for the upper terminal.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_2^3\left(\frac{1}{u-1}-\frac{1}{u}\right)du}" />,
    reason: <>Matches option <b>D</b>. Its value is <Katex tex="\left[\log_e\left|\tfrac{u-1}{u}\right|\right]_2^3=\log_e\tfrac43" />, matching the original integral.</>,
  },
]

export default function SpecialistQ7_2022() {
  return (
    <MCQShell
      question={
        <p>
          Using the substitution <Katex tex="u=1+e^x" />,{' '}
          <Katex tex="\displaystyle\int_0^{\log_e 2}\frac{1}{1+e^x}\,dx" /> can be expressed as
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_0^{\log_e 2}\left(\frac{1}{u-1}-\frac{1}{u}\right)du" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int_2^3\left(\frac{1}{u}-\frac{1}{u-1}\right)du" /> },
        { letter: 'C', content: <Katex tex="\displaystyle\int_1^3\left(\frac{1}{u}-\frac{1}{u-1}\right)du" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int_2^3\left(\frac{1}{u-1}-\frac{1}{u}\right)du" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\displaystyle\int_2^{1+e^2}\left(\frac{1}{u-1}-\frac{1}{u}\right)du" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
