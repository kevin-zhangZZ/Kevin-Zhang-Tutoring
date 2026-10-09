// 2023 Mathematical Methods — Exam 2, MCQ 3. VCAA examination report: 47% correct.
// The domain of a sum is the intersection, not the union. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 22, B: 12, C: 11, D: 7, E: 47 },
  answer: 'E',
  comment: (
    <>
      The domain of <Katex tex="p" /> is <Katex tex="[-2,3)" /> and the domain of{' '}
      <Katex tex="q" /> is <Katex tex="(-1,5]" />.
      <br />
      The domain of the sum function <Katex tex="p+q" /> is the intersection of the two
      domains.
      <br />
      <Katex tex="[-2,3)\cap(-1,5]" />
      <br />
      <Katex tex="=(-1,3)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{dom}(p+q) = \mathrm{dom}(p)\cap\mathrm{dom}(q)" />,
    reason: <>The sum function is <Katex tex="(p+q)(x)=p(x)+q(x)" />, so it can only be evaluated where <em>both</em> <Katex tex="p(x)" /> and <Katex tex="q(x)" /> exist. That means <Katex tex="x" /> must lie in both domains: their intersection.</>,
    more: <>The same rule holds for the difference <Katex tex="p-q" /> and the product <Katex tex="pq" />: each is defined only where both functions are.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} [-2,3) &: \ -2 \le x < 3 \\ (-1,5] &: \ -1 < x \le 5 \end{aligned}" />,
    reason: <>Write each domain as an inequality. A square bracket means the endpoint is included (<Katex tex="\le" />); a round bracket means it is excluded (<Katex tex="<" />).</>,
  },
  {
    working: <Katex display tex="\text{both hold when } -1 < x < 3" />,
    reason: <>Take the stricter condition at each end: <Katex tex="x>-1" /> (stricter than <Katex tex="x\ge-2" />) and <Katex tex="x<3" /> (stricter than <Katex tex="x\le5" />). Both ends are open because <Katex tex="q(-1)" /> and <Katex tex="p(3)" /> do not exist.</>,
    more: <>On a number line, shade both intervals and keep only the overlap. It starts at <Katex tex="-1" />, where the domain of <Katex tex="q" /> starts, and stops at <Katex tex="3" />, where the domain of <Katex tex="p" /> stops, so each end keeps the bracket of the interval it came from.</>,
  },
  {
    working: <Katex display tex="\boxed{(-1,\,3)}" />,
    reason: <>Matches option <b>E</b>; option <b>A</b> is the union of the two domains, not their intersection.</>,
    more: <>Option <b>A</b> (chosen by 22%) is <Katex tex="[-2,3)\cup(-1,5]=[-2,5]" />, which includes values such as <Katex tex="x=4" />, where <Katex tex="q(4)" /> exists but <Katex tex="p(4)" /> does not, so <Katex tex="p(4)+q(4)" /> cannot be found. Option <b>D</b> has the right endpoints but wrongly closes both ends. Options <b>B</b> and <b>C</b> include <Katex tex="x=-2" />, where <Katex tex="q" /> is undefined. The word &lsquo;continuous&rsquo; in the stem does not affect the answer.</>,
  },
]

export default function MethodsQ3_2023() {
  return (
    <MCQShell
      question={
        <p>
          Two functions, <Katex tex="p" /> and <Katex tex="q" />, are continuous over their
          domains, which are <Katex tex="[-2,3)" /> and <Katex tex="(-1,5]" />, respectively.
          <br />
          The domain of the sum function <Katex tex="p+q" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="[-2,5]" /> },
        { letter: 'B', content: <Katex tex="[-2,-1)\cup(3,5]" /> },
        { letter: 'C', content: <Katex tex="[-2,-1)\cup(-1,3)\cup(3,5]" /> },
        { letter: 'D', content: <Katex tex="[-1,3]" /> },
        { letter: 'E', content: <Katex tex="(-1,3)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
