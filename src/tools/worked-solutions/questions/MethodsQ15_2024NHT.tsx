// 2024 Mathematical Methods NHT — Exam 2, MCQ 15. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment for this question (transcribed below from the rendered
// report). Calculus: minimising a cost over whole numbers — the stationary point is not an integer,
// so compare the neighbouring integers. Question text transcribed from the original paper. Solution
// is original; the answer D agrees with the report's key. sympy: C′(n) = 0 at n = 38.3499…,
// C(38.3499…) = 1229.8307…, C(38) = 1229.8947…, C(39) = 1230.0512….

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      <Katex tex="C(n)=0.5n^2-37.5n+1900+\dfrac{1250}{n},\ n\in Z^+" />
      <br />
      Solve <Katex tex="C'(n)=0" />, <Katex tex="n=38.34\ldots" />, but <Katex tex="n" /> is discrete.
      <br />
      <Katex tex="C(38)=1229.89\ldots,\ C(39)=1230.05\ldots" />
      <br />
      The minimum cost is closest to <Katex tex="\$1229.89" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="C'(n)=n-37.5-\frac{1250}{n^2}" />,
    reason: <>Treat <Katex tex="C" /> as a smooth function to find where its minimum is: differentiate term by term (<Katex tex="\tfrac{1250}{n}=1250n^{-1}" /> gives <Katex tex="-1250n^{-2}" />).</>,
  },
  {
    working: <Katex display tex="C'(n)=0\ \Rightarrow\ n=38.3499\ldots" />,
    reason: <>On CAS: <Cas fn="solve">solve(n−37.5−1250/n²=0, n) | n&gt;0</Cas>, the only positive solution. It is a minimum: <Katex tex="C'" /> changes from negative to positive there (e.g. <Katex tex="C'(30)<0" />, <Katex tex="C'(40)>0" />).</>,
    more: <>Multiplying by <Katex tex="n^2" /> gives the cubic <Katex tex="2n^3-75n^2-2500=0" />, which has one real root. Alternatively, go straight to the minimum with <Cas fn="fMin" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}C(38)&=1229.894\ldots\\ C(39)&=1230.051\ldots\end{aligned}" />,
    reason: <><Katex tex="n" /> is the number of items, so <Katex tex="n\in Z^+" />: <Katex tex="38.35" /> items can&apos;t be made. The minimum over the integers is at one of the two whole numbers either side, so compare them.</>,
    more: <>Because the graph of <Katex tex="C" /> falls to its turning point and then rises, every integer below 38 costs more than <Katex tex="C(38)" />, and every integer above 39 costs more than <Katex tex="C(39)" />. Only the two neighbours need checking.</>,
  },
  {
    working: <Katex display tex="\boxed{\$1229.89}" />,
    reason: <>The smaller of the two, at <Katex tex="n=38" />. Matches option <b>D</b>.</>,
    more: <>Option <b>C</b> ($1229.83) is <Katex tex="C(38.3499\ldots)" />, the minimum of the smooth curve, which needs a fractional number of items. Option <b>E</b> ($1230.05) is <Katex tex="C(39)" />, the neighbour that gives the larger cost. Options <b>A</b> and <b>B</b> are the stationary value of <Katex tex="n" /> (truncated and rounded), a number of items rather than a cost.</>,
  },
]

export default function MethodsQ15_2024NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            The finance team at a small technology company estimates that the production cost per item is given by
            the rule <Katex tex="C(n)=0.5n^2-37.5n+1900+\dfrac{1250}{n}" />, where <Katex tex="n\in Z^+" /> and{' '}
            <Katex tex="n" /> is the number of items produced.
          </p>
          <p>The minimum cost per item is closest to</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\$38.34" /> },
        { letter: 'B', content: <Katex tex="\$38.35" /> },
        { letter: 'C', content: <Katex tex="\$1229.83" /> },
        { letter: 'D', content: <Katex tex="\$1229.89" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\$1230.05" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
