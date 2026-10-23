// 2023 Mathematical Methods NHT — Exam 2, MCQ 9. The NHT report gives the answer key only, with
// no statistics. Calculus: area bounded by a cubic and the x-axis where the curve crosses the axis
// inside the interval. Question text transcribed from the original paper. The shaded graph in the
// working is this site's own explanatory figure (matplotlib); VCAA printed no figure. Solution is
// original; the answer C agrees with the report's key. sympy: ∫_{−1}^{0} = 5/12, ∫_{0}^{2} = −8/3,
// ∫_{−1}^{2} = −9/4.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import areaSrc from './meth-2023nht-mcq9-area.png'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y=x(x^2-x-2)=x(x-2)(x+1)" />,
    reason: <>Before integrating, find where the curve crosses the <Katex tex="x" />-axis. Its zeros are <Katex tex="-1" />, <Katex tex="0" /> and <Katex tex="2" />, so there is a crossing at <Katex tex="x=0" /> <b>inside</b> the interval <Katex tex="[-1,2]" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={areaSrc}
          alt="This site's own graph of y = x³ − x² − 2x from x = −1 to x = 2: a small region above the x-axis between −1 and 0, area 5/12, and a larger region below the axis between 0 and 2, area 8/3"
          className="w-full max-w-[340px]"
        />
      </div>
    ),
    reason: <>Test a point in each piece: at <Katex tex="x=-\tfrac12" />, <Katex tex="y=\tfrac58>0" />; at <Katex tex="x=1" />, <Katex tex="y=-2<0" />. So the curve is above the axis on <Katex tex="[-1,0]" /> and below it on <Katex tex="[0,2]" />.</>,
    more: <>An integral counts area below the axis as negative. Integrating straight from <Katex tex="-1" /> to <Katex tex="2" /> would let the lower region cancel part of the upper one, so the two pieces have to be integrated separately.</>,
  },
  {
    working: <Katex display tex="\int\left(x^3-x^2-2x\right)dx=\frac{x^4}{4}-\frac{x^3}{3}-x^2" />,
  },
  {
    working: <Katex display tex="\begin{aligned}\int_{-1}^{0}\left(x^3-x^2-2x\right)dx&=0-\left(\frac14+\frac13-1\right)\\&=\frac{5}{12}\end{aligned}" />,
    reason: <>Upper piece: substitute the terminals into the antiderivative, upper minus lower.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\int_{0}^{2}\left(x^3-x^2-2x\right)dx&=\left(4-\frac83-4\right)-0\\&=-\frac{8}{3}\end{aligned}" />,
    reason: <>Lower piece: the negative sign confirms this region is below the axis. Its area is <Katex tex="\tfrac83" />.</>,
  },
  {
    working: <Katex display tex="\text{Area}=\frac{5}{12}+\frac{8}{3}=\frac{5}{12}+\frac{32}{12}=\boxed{\frac{37}{12}}" />,
    reason: <>Matches option <b>C</b>. Add the two areas, each taken as positive.</>,
    more: <>Option <b>D</b>, <Katex tex="-\tfrac94" />, is <Katex tex="\int_{-1}^{2}\left(x^3-x^2-2x\right)dx=\tfrac{5}{12}-\tfrac83" />, the signed integral in one go: an area can&apos;t be negative, so that is a warning sign in itself. Option <b>A</b>, <Katex tex="\tfrac{5}{12}" />, is only the region above the axis. Check: the lower region is a hump 2 wide and just over 2 deep, filling about two-thirds of a <Katex tex="2\times2" /> box, so about 2.7 ✓.</>,
  },
]

export default function MethodsQ9_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          The area between the graph of <Katex tex="y=x^3-x^2-2x" /> and the lines <Katex tex="y=0" />, <Katex tex="x=-1" /> and <Katex tex="x=2" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{5}{12}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{19}{12}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{37}{12}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="-\dfrac{9}{4}" /> },
        { letter: 'E', content: <Katex tex="-\dfrac{15}{4}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
