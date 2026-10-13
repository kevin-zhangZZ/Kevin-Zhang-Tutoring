// 2015 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 56% correct.
// Rewrite a definite integral after the substitution u = 3x + 1.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 56, C: 27, D: 6, E: 7 },
  answer: 'B',
  noAnswer: 0,
  comment: <>Using <Katex tex="u=3x+1" /> results in option B.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="u=3x+1 \;\implies\; x=\frac{u-1}{3}" />
        <Katex display tex="\frac{du}{dx}=3 \;\implies\; dx=\frac{du}{3}" />
      </>
    ),
    reason: <>Set <Katex tex="u" /> equal to what is inside the square root. Also solve for <Katex tex="x" />, because the <Katex tex="x^2" /> factor must be rewritten too.</>,
    more: <>Every option has powers <Katex tex="u^{5/2},\,u^{3/2},\,u^{1/2}" />: half-integer powers only appear if <Katex tex="\sqrt{3x+1}" /> becomes <Katex tex="\sqrt u" />, which confirms the choice <Katex tex="u=3x+1" />.</>,
  },
  {
    working: <Katex display tex="x=0 \implies u=1, \qquad x=1 \implies u=4" />,
    reason: <>Convert the limits too: substitute <Katex tex="x=0" /> and <Katex tex="x=1" /> into <Katex tex="u=3x+1" />.</>,
    more: <>Once the integral is in <Katex tex="u" />, its terminals must be <Katex tex="u" />-values; keeping the old terminals 0 and 1 is the error behind options A and D.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x^2\sqrt{3x+1} &= \left(\frac{u-1}{3}\right)^2\sqrt u \\ &= \frac{(u-1)^2}{9}\sqrt u \end{aligned}" />,
    reason: <>Rewrite the whole integrand — both the <Katex tex="x^2" /> factor and the square root — in terms of <Katex tex="u" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\int_0^1 x^2\sqrt{3x+1}\,dx = \int_1^4 \frac{(u-1)^2}{9}\sqrt u \cdot \frac{du}{3}" />
        <Katex display tex="= \frac{1}{27}\int_1^4 (u-1)^2\sqrt u \; du" />
      </>
    ),
    reason: 'Substitute the integrand, the differential, and the new limits all together.',
  },
  {
    working: (
      <>
        <Katex display tex="(u-1)^2\sqrt u = (u^2-2u+1)u^{1/2}" />
        <Katex display tex="= u^{5/2} - 2u^{3/2} + u^{1/2}" />
      </>
    ),
    reason: <>Expand the square, then multiply each term by <Katex tex="u^{1/2}" /> (add the indices).</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{1}{27}\int_1^4 \left(u^{5/2} - 2u^{3/2} + u^{1/2}\right) du}" />,
    reason: <>Matches option <b>B</b>: the constant <Katex tex="\tfrac19\times\tfrac13=\tfrac1{27}" /> and the terminals 1 and 4.</>,
    more: (
      <>
        Option C (27%, the most common wrong answer) has <Katex tex="\tfrac19" />: it squares{' '}
        <Katex tex="\tfrac{u-1}{3}" /> correctly but forgets the <Katex tex="\tfrac13" /> from{' '}
        <Katex tex="dx=\tfrac{du}{3}" />. Option E has only that <Katex tex="\tfrac13" />, losing the{' '}
        <Katex tex="\tfrac19" /> from <Katex tex="x^2" />.
      </>
    ),
  },
]

export default function SpecialistQ10_2015() {
  return (
    <MCQShell
      question={
        <p>
          Using a suitable substitution, the definite integral <Katex tex="\displaystyle\int_0^1 x^2\sqrt{3x+1}\;dx" /> is
          equivalent to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{1}{9}\displaystyle\int_0^1 \left(u^{5/2}-2u^{3/2}+u^{1/2}\right)du" /> },
        { letter: 'B', content: <Katex tex="\dfrac{1}{27}\displaystyle\int_1^4 \left(u^{5/2}-2u^{3/2}+u^{1/2}\right)du" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{1}{9}\displaystyle\int_1^4 \left(u^{5/2}-2u^{3/2}+u^{1/2}\right)du" /> },
        { letter: 'D', content: <Katex tex="\dfrac{1}{27}\displaystyle\int_0^1 \left(u^{5/2}-2u^{3/2}+u^{1/2}\right)du" /> },
        { letter: 'E', content: <Katex tex="\dfrac{1}{3}\displaystyle\int_1^4 \left(u^{5/2}-2u^{3/2}+u^{1/2}\right)du" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
