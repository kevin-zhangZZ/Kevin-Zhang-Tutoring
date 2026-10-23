// 2026 Specialist NHT — Exam 2, MCQ 11. The NHT report gives the answer key and a short comment
// only, with no statistics. Differential equations: simplify with the compound- and double-angle
// formulas, then separate the variables. Question text transcribed from the original paper.
// Solution is original; the answer A agrees with the report's key. The report's comment expands
// sin(x + y) as sin(x)cos(y) − cos(x)sin(y) (a sign slip: it is + cos(x)sin(y)), which leads it to a
// −cos(x) in the denominator; kept verbatim in the comment and pointed out in the working.
// sympy confirms the right side equals 2eˣ sin(x) · eʸ / sin(y).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'A',
  comment: (
    <>
      <Katex tex="\dfrac{dy}{dx}=\dfrac{e^xe^y\sin(2x)}{\sin(x)\cos(y)-\cos(x)\sin(y)-\sin(x)\cos(y)}" />
      <br />
      <Katex tex="\dfrac{dy}{dx}=\dfrac{e^x\sin(2x)}{-\cos(x)}\times\dfrac{e^y}{\sin(y)}" />
      <br />
      Double angle formula
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\sin(x+y)-\sin(x)\cos(y)\\ &\quad=\sin(x)\cos(y)+\cos(x)\sin(y)\\ &\qquad-\sin(x)\cos(y)\\ &\quad=\cos(x)\sin(y)\end{aligned}" />,
    reason: <>The denominator mixes <Katex tex="x" /> and <Katex tex="y" />, so it can&apos;t be separated as it stands. Expand <Katex tex="\sin(x+y)" /> with the compound-angle formula (on the formula sheet) and the <Katex tex="\sin(x)\cos(y)" /> terms cancel.</>,
    more: <>The report&apos;s comment writes the expansion as <Katex tex="\sin(x)\cos(y)-\cos(x)\sin(y)" />, which is a sign slip: <Katex tex="\sin(x+y)" /> has a plus. That slip is where its <Katex tex="-\cos(x)" /> comes from; carried through, it would put a factor <Katex tex="-2" /> on the right, which no option has. With the correct sign the denominator is <Katex tex="+\cos(x)\sin(y)" /> and the factor is <Katex tex="+2" />.</>,
  },
  {
    working: <Katex display tex="e^{x+y}\sin(2x)=e^xe^y\cdot2\sin(x)\cos(x)" />,
    reason: <>Split the exponential with an index law, and use the double-angle formula <Katex tex="\sin(2x)=2\sin(x)\cos(x)" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}=\frac{2e^xe^y\sin(x)\cos(x)}{\cos(x)\sin(y)}=\frac{2e^x\sin(x)\,e^y}{\sin(y)}" />,
    reason: <>The <Katex tex="\cos(x)" /> cancels, leaving a function of <Katex tex="x" /> times a function of <Katex tex="y" />: exactly the form separation of variables needs.</>,
  },
  {
    working: <Katex display tex="\frac{\sin(y)}{e^y}\,\frac{dy}{dx}=2e^x\sin(x)" />,
    reason: <>Move every <Katex tex="y" /> to the left by multiplying both sides by <Katex tex="\tfrac{\sin(y)}{e^y}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\int e^{-y}\sin(y)\,dy=2\int e^x\sin(x)\,dx}" />,
    reason: <>Matches option <b>A</b>. Integrate both sides, writing <Katex tex="\tfrac{1}{e^y}" /> as <Katex tex="e^{-y}" />.</>,
    more: <>Options <b>C</b> and <b>D</b> have the exponentials on the wrong sides of their signs (<Katex tex="e^{y}" /> and <Katex tex="e^{-x}" />): <Katex tex="e^y" /> is a factor of the right-hand side, so it ends up <em>dividing</em> on the left. Options <b>B</b> and <b>C</b> have cosines where the simplified equation keeps sines, and <b>B</b> and <b>D</b> lose the factor 2 from <Katex tex="\sin(2x)" />.</>,
  },
]

export default function SpecialistQ11_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          By separation of variables, the differential equation{' '}
          <Katex tex="\dfrac{dy}{dx}=\dfrac{e^{x+y}\sin(2x)}{\sin(x+y)-\sin(x)\cos(y)}" /> leads to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int e^{-y}\sin(y)\,dy=2\int e^x\sin(x)\,dx" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\displaystyle\int e^{-y}\cos(y)\,dy=\int e^x\cos(x)\,dx" /> },
        { letter: 'C', content: <Katex tex="\displaystyle\int e^{y}\cos(y)\,dy=2\int e^{-x}\cos(x)\,dx" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int e^{y}\sin(y)\,dy=\int e^{-x}\sin(x)\,dx" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
