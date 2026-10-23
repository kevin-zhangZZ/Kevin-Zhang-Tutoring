// 2026 Specialist NHT — Exam 2, MCQ 15. The NHT report gives the answer key and a short comment
// only, with no statistics. Vectors: the scalar resolute of u in the direction of v is u · v̂;
// set it to 2 and solve for a. Question text transcribed from the original paper. Solution is
// original; the answer C agrees with the report's key. sympy: (2a + 1)/3 = 2 gives a = 5/2;
// distractors checked (no division by |v| gives 1/2, division by |v|² gives 17/2).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'C',
  comment: (
    <>
      <Katex tex="\underset{\sim}{u}\cdot\hat{\underset{\sim}{v}}=2" />
      <br />
      <Katex tex="\dfrac{2a+6-5}{3}=2" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{scalar resolute of }\underset{\sim}{u}\text{ on }\underset{\sim}{v}=\underset{\sim}{u}\cdot\hat{\underset{\sim}{v}}=\frac{\underset{\sim}{u}\cdot\underset{\sim}{v}}{|\underset{\sim}{v}|}" />,
    reason: <>The scalar resolute is the signed length of <Katex tex="\underset{\sim}{u}" />&apos;s shadow along <Katex tex="\underset{\sim}{v}" />: dot <Katex tex="\underset{\sim}{u}" /> with the <b>unit</b> vector in <Katex tex="\underset{\sim}{v}" />&apos;s direction.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{u}\cdot\underset{\sim}{v}&=2a+(-3)(-2)+5(-1)=2a+1\\ |\underset{\sim}{v}|&=\sqrt{2^2+(-2)^2+(-1)^2}=\sqrt9=3\end{aligned}" />,
    reason: <>Multiply matching components and add. Watch the signs: <Katex tex="(-3)(-2)=+6" /> and <Katex tex="5(-1)=-5" />.</>,
  },
  {
    working: <Katex display tex="\frac{2a+1}{3}=2\implies2a+1=6\implies a=\frac52" />,
  },
  {
    working: <Katex display tex="\boxed{a=\tfrac{5}{2}}" />,
    reason: <>Matches option <b>C</b>. Check: <Katex tex="\underset{\sim}{u}\cdot\underset{\sim}{v}=2\left(\tfrac52\right)+1=6" />, and <Katex tex="\tfrac{6}{3}=2" />.</>,
    more: <>Option <b>B</b>, <Katex tex="\tfrac12" />, sets <Katex tex="\underset{\sim}{u}\cdot\underset{\sim}{v}=2" />, forgetting to divide by <Katex tex="|\underset{\sim}{v}|" />. Option <b>D</b>, <Katex tex="\tfrac{17}{2}" />, divides by <Katex tex="|\underset{\sim}{v}|^2=9" />: that is the coefficient in the <em>vector</em> resolute, <Katex tex="\tfrac{\underset{\sim}{u}\cdot\underset{\sim}{v}}{|\underset{\sim}{v}|^2}\underset{\sim}{v}" />, not the scalar resolute.</>,
  },
]

export default function SpecialistQ15_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="\underset{\sim}{u}=a\underset{\sim}{i}-3\underset{\sim}{j}+5\underset{\sim}{k}" />, where{' '}
          <Katex tex="a\in R" />, and <Katex tex="\underset{\sim}{v}=2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}" />.
          <br />
          If the scalar resolute of <Katex tex="\underset{\sim}{u}" /> in the direction of <Katex tex="\underset{\sim}{v}" /> is
          2, then the value of <Katex tex="a" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{2}{5}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{1}{2}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{5}{2}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{17}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
