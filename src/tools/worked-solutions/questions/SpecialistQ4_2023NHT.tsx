// 2023 Specialist NHT — Exam 2, MCQ 4. The NHT report gives the answer key only, with no
// statistics. Complex numbers: Arg(z + i z̄) for z = a + bi — the sum is (a + b)(1 + i), which lies
// on the line y = x in the first quadrant. Question text transcribed from the original paper.
// Solution is original; the answer D agrees with the report's key (checked with sympy).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\bar z=a-bi" />,
    reason: <>The conjugate flips the sign of the imaginary part.</>,
  },
  {
    working: <Katex display tex="i\bar z=i(a-bi)=ai-bi^2=b+ai" />,
    reason: <>Expand and use <Katex tex="i^2=-1" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}z+i\bar z&=(a+bi)+(b+ai)\\ &=(a+b)+(a+b)i\end{aligned}" />,
    reason: <>Add real parts and imaginary parts separately. The real and imaginary parts come out equal.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&a+b>0 \implies z+i\bar z=(a+b)(1+i)\\ &\text{is in the first quadrant}\end{aligned}" />,
    reason: <>Both <Katex tex="a" /> and <Katex tex="b" /> are positive, so the point is <Katex tex="(a+b,\,a+b)" />, on the line <Katex tex="y=x" /> with both coordinates positive. Always check the quadrant before writing down an argument.</>,
    more: <>Only <Katex tex="a+b>0" /> is actually needed. The extra condition <Katex tex="a>b" /> doesn&apos;t affect this answer; it only fixes the sign of <Katex tex="a-b" />, which matters for the wrong expression in the last row.</>,
  },
  {
    working: <Katex display tex="\boxed{\operatorname{Arg}(z+i\bar z)=\tfrac{\pi}{4}}" />,
    reason: <>Matches option <b>D</b>. A first-quadrant point with equal parts makes an angle of <Katex tex="45^\circ" /> with the positive real axis.</>,
    more: <>Option B, <Katex tex="-\tfrac{\pi}{4}" />, is what <Katex tex="z-i\bar z=(a-b)-(a-b)i" /> gives when <Katex tex="a>b" />, so it comes from a sign slip in the expansion. Option E, <Katex tex="\tfrac{5\pi}{4}" />, is outside the principal range <Katex tex="(-\pi,\pi]" />, so it can never be an <Katex tex="\operatorname{Arg}" />. Option C gives two values, but <Katex tex="\operatorname{Arg}" /> (capital A) is a single value.</>,
  },
]

export default function SpecialistQ4_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="z=a+bi" />, where <Katex tex="a,b\in R" /> and <Katex tex="a>b>0" />, then{' '}
          <Katex tex="\operatorname{Arg}\left(z+i\bar z\right)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\dfrac{3\pi}{4}" /> },
        { letter: 'B', content: <Katex tex="-\dfrac{\pi}{4}" /> },
        { letter: 'C', content: <><Katex tex="-\dfrac{3\pi}{4}" /> or <Katex tex="\dfrac{\pi}{4}" /></> },
        { letter: 'D', content: <Katex tex="\dfrac{\pi}{4}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{5\pi}{4}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
