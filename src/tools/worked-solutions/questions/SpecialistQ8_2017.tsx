// 2017 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 29% correct —
// the most popular answer (D, 52%) was wrong. Where the gradient of x³ − mx² + 4 is strictly increasing. Question text
// transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 29, C: 7, D: 52, E: 7 },
  answer: 'B',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="f''(x)=6x-2m\ge0" /> when <Katex tex="x\ge\tfrac{m}{3}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{the gradient of } f \text{ is } f'(x)" />,
    reason: <>Read the question twice. It asks where the <em>gradient</em> is increasing, not where <Katex tex="f" /> is increasing — so the object being examined is <Katex tex="f'" />, and the tool is <Katex tex="f''" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = 3x^2-2mx" />,
    reason: <>Differentiating <Katex tex="f(x)=x^3-mx^2+4" />. Stopping here and solving <Katex tex="f'(x)>0" /> is what produces the popular wrong answer.</>,
  },
  {
    working: <Katex display tex="f''(x) = 6x-2m" />,
    reason: <>Differentiating again.</>,
  },
  {
    working: <Katex display tex="6x-2m\ge0 \implies x\ge\frac{m}{3}" />,
    reason: <>Dividing by <Katex tex="6" />: <Katex tex="\tfrac{2m}{6}=\tfrac{m}{3}" />. Option D's <Katex tex="x\ge\tfrac{2m}{3}" /> is where <Katex tex="f'(x)=x(3x-2m)\ge0" /> (for <Katex tex="m>0" />) — where <Katex tex="f" /> is increasing, not its gradient.</>,
  },
  {
    working: <Katex display tex="f'\!\left(\tfrac{m}{3}\right) = -\frac{m^2}{3}" />,
    reason: <>A structural check: <Katex tex="x=\tfrac{m}{3}" /> is the vertex of the parabola <Katex tex="y=f'(x)" />, its minimum — which is exactly the point from which <Katex tex="f'" /> starts climbing.</>,
  },
  {
    working: <Katex display tex="\boxed{x\ge\frac{m}{3}}" />,
    reason: <>Matches option <b>B</b>. Why the endpoint is included: <Katex tex="f''\left(\tfrac{m}{3}\right)=0" />, but <Katex tex="f'" /> is still <em>strictly</em> increasing across the whole of <Katex tex="\left[\tfrac{m}{3},\infty\right)" /> — a single point of zero second derivative does not create a flat stretch.</>,
  },
]

export default function SpecialistQ8_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="f(x)=x^3-mx^2+4" />, where <Katex tex="m,x\in R" />.
          </p>
          <p>
            The <strong>gradient</strong> of <Katex tex="f" /> will always be strictly
            increasing for
          </p>
        </>
      }
      background={
        <p>
          "The function is increasing" and "the gradient is increasing" are different
          statements about different derivatives. The first is <Katex tex="f'>0" /> and
          describes going uphill; the second is <Katex tex="f''>0" /> and describes the curve
          being concave up. More than half of all students chose option D, which is where{' '}
          <Katex tex="f" /> itself is increasing (for <Katex tex="m>0" />).
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x\ge0" /> },
        { letter: 'B', content: <Katex tex="x\ge\dfrac{m}{3}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="x\le\dfrac{m}{3}" /> },
        { letter: 'D', content: <Katex tex="x\ge\dfrac{2m}{3}" /> },
        { letter: 'E', content: <Katex tex="x\le\dfrac{2m}{3}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
