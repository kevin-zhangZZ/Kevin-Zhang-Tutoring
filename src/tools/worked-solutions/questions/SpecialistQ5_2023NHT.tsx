// 2023 Specialist NHT — Exam 2, MCQ 5. The NHT report gives the answer key only, with no
// statistics. Complex numbers: the real root of a real cubic with root 2 + 4i — conjugate root
// theorem, then compare constant terms. Question text transcribed from the original paper.
// Solution is original; the answer B agrees with the report's key (sympy: matching the constant
// term of (z − (2 + 4i))(z − (2 − 4i))(z − r) to 5 gives r = −1/4).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z=2+4i \implies z=2-4i \text{ is also a root}" />,
    reason: <>The coefficients <Katex tex="1,\ p,\ q,\ 5" /> are all real, so non-real roots come in conjugate pairs (the conjugate root theorem).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\big(z-(2+4i)\big)\big(z-(2-4i)\big)\\ &\quad=(z-2)^2+16=z^2-4z+20\end{aligned}" />,
    reason: <>Multiply the conjugate factors as a difference of squares: <Katex tex="(z-2)^2-(4i)^2" />.</>,
  },
  {
    working: <Katex display tex="z^3+pz^2+qz+5=(z^2-4z+20)(z-r)" />,
    reason: <>A cubic has three roots, so the third is real; call it <Katex tex="r" />. The leading coefficient is 1 on both sides.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{constant terms: } 20\times(-r)=5\\ &\implies r=-\tfrac{5}{20}=-\tfrac14\end{aligned}" />,
    reason: <>There is no need to find <Katex tex="p" /> and <Katex tex="q" />: the constant term on the right is <Katex tex="20\cdot(-r)" />, and on the left it is 5.</>,
    more: <>Check: <Katex tex="(z^2-4z+20)\left(z+\tfrac14\right)=z^3-\tfrac{15}{4}z^2+19z+5" />, so <Katex tex="p=-\tfrac{15}{4}" /> and <Katex tex="q=19" />, both real as required.</>,
  },
  {
    working: <Katex display tex="\boxed{z=-\tfrac14}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option C, <Katex tex="\tfrac14" />, comes from matching <Katex tex="20r=5" />, forgetting that the factor is <Katex tex="z-r" />, so its constant is <Katex tex="-r" />. Option A, <Katex tex="-4" />, divides the wrong way round (<Katex tex="-\tfrac{20}{5}" />). Option E, 20, is the product of the two complex roots, not the real root.</>,
  },
]

export default function SpecialistQ5_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          <Katex tex="z=2+4i" /> is a root of the equation <Katex tex="z^3+pz^2+qz+5=0" />, where <Katex tex="p,q\in R" />.
          <br />
          The real root of the equation is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-4" /> },
        { letter: 'B', content: <Katex tex="-\dfrac14" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac14" /> },
        { letter: 'D', content: <Katex tex="4" /> },
        { letter: 'E', content: <Katex tex="20" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
