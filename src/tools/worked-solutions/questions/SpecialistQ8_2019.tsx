// 2019 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 75% correct. Rewriting
// a definite integral under the substitution u = 2x + 1, including transforming the terminals.
// Question text transcribed from the original paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 5, C: 4, D: 13, E: 75 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = 2x+1 \implies \dfrac{du}{dx}=2 \implies dx = \dfrac{du}{2}" />,
    reason: <>The natural substitution: it is what sits under the square root.</>,
  },
  {
    working: <Katex display tex="u = 2x+1 \implies 2x-1 = u-2" />,
    reason: <>The other factor must also be rewritten in terms of <Katex tex="u" />. Since <Katex tex="2x=u-1" />, subtracting <Katex tex="1" /> more gives <Katex tex="u-2" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x=1 \implies u = 2(1)+1 = 3" />
        <Katex display tex="x=5 \implies u = 2(5)+1 = 11" />
      </>
    ),
    reason: <>For a <em>definite</em> integral the terminals change too — they are <Katex tex="x" /> values, and the new integral is in <Katex tex="u" />. Options A and C keep the old terminals.</>,
  },
  {
    working: <Katex display tex="\int_1^5 (2x-1)\sqrt{2x+1}\ dx = \int_3^{11}(u-2)\sqrt{u}\ \dfrac{du}{2}" />,
    reason: <>Replace every piece — the integrand, <Katex tex="dx" /> and the terminals.</>,
  },
  {
    working: <Katex display tex="= \dfrac12\int_3^{11}\left(u\cdot u^{1/2}-2u^{1/2}\right)du" />,
    reason: <>Expand the bracket so each term is a plain power of <Katex tex="u" />, ready to integrate.</>,
  },
  {
    working: <Katex display tex="\boxed{\dfrac12\int_3^{11}\left(u^{3/2}-2u^{1/2}\right)du}" />,
    reason: <>Matches option <b>E</b>. Option <b>D</b> has <Katex tex="2" /> outside instead of <Katex tex="\tfrac12" /> — the result of multiplying by <Katex tex="\tfrac{du}{dx}" /> rather than dividing. Options <b>A</b> and <b>B</b> have <Katex tex="u^{3/2}+u^{1/2}=(u+1)\sqrt u" />, which rewrites <Katex tex="2x-1" /> as <Katex tex="u+1" /> instead of <Katex tex="u-2" />; <b>A</b> and <b>C</b> also keep the <Katex tex="x" /> terminals.</>,
  },
]

export default function SpecialistQ8_2019() {
  return (
    <MCQShell
      question={<p>With a suitable substitution, <Katex tex="\displaystyle\int_1^5 (2x-1)\sqrt{2x+1}\ dx" /> can be expressed as</p>}
      options={[
        { letter: 'A', content: <Katex tex="\tfrac12\displaystyle\int_1^5\left(u^{3/2}+u^{1/2}\right)du" /> },
        { letter: 'B', content: <Katex tex="2\displaystyle\int_3^{11}\left(u^{3/2}+u^{1/2}\right)du" /> },
        { letter: 'C', content: <Katex tex="2\displaystyle\int_1^5\left(u^{3/2}-2u^{1/2}\right)du" /> },
        { letter: 'D', content: <Katex tex="2\displaystyle\int_3^{11}\left(u^{3/2}-2u^{1/2}\right)du" /> },
        { letter: 'E', content: <Katex tex="\tfrac12\displaystyle\int_3^{11}\left(u^{3/2}-2u^{1/2}\right)du" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
