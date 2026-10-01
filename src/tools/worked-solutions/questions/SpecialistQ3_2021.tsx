// 2021 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 51% correct.
// Local maxima of a reciprocal, found by minimising the denominator. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 14, C: 10, D: 17, E: 51 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{gathered} y = \frac{1}{\bigl(\cos(ax)+1\bigr)^2+3} \\ \bigl(\cos(ax)+1\bigr)^2+3 \ge 3 \end{gathered}"
      />
    ),
    reason: <>A square is never negative, so the denominator is always at least 3 and <Katex tex="y" /> is always positive. Since <Katex tex="y" /> is 1 divided by the denominator, <Katex tex="y" /> is biggest where the denominator is smallest, so find the maxima by minimising the denominator instead of differentiating.</>,
  },
  {
    working: <Katex display tex="\bigl(\cos(ax)+1\bigr)^2 = 0 \iff \cos(ax) = -1" />,
    reason: <>The square is smallest (zero) when the bracket is zero. Careful: <Katex tex="\cos(ax)=1" /> makes the bracket 2 and the square its <em>largest</em> value, 4, so that gives the minima of <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="y_{\max} = \frac{1}{0+3} = \frac13" />,
    reason: <>Substitute <Katex tex="\cos(ax)=-1" /> into the rule.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \cos(ax) = -1 &\implies ax = \pi(1+2k) \\ &\implies x = \frac{\pi(1+2k)}{a} \end{aligned}"
      />
    ),
    reason: <>Cosine equals <Katex tex="-1" /> at <Katex tex="\pm\pi,\ \pm3\pi,\ \pm5\pi,\ \dots" />, the odd multiples of <Katex tex="\pi" />, written <Katex tex="\pi(1+2k)" /> for <Katex tex="k\in Z" />. Divide by <Katex tex="a" /> (allowed, as <Katex tex="a\neq0" />). These are the only local maxima: <Katex tex="\cos(ax)+1" /> is never negative, so the square rises and falls with <Katex tex="\cos(ax)" /> and <Katex tex="y" /> does the opposite, peaking exactly where <Katex tex="\cos(ax)" /> bottoms out at <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\frac{\pi(1+2k)}{a},\ \frac13\right), \ k\in Z}" />,
    reason: <>Matches option <b>E</b>. Option D has the right <Katex tex="x" />-values but the wrong height: <Katex tex="\tfrac14=\tfrac{1}{(0+1)^2+3}" /> is the value of <Katex tex="y" /> where <Katex tex="\cos(ax)=0" /> (option C's <Katex tex="x" />-values), and those points are not turning points at all. Options A and B use <Katex tex="x=\tfrac{2\pi k}{a}" />, where <Katex tex="\cos(ax)=1" />: there <Katex tex="y=\tfrac{1}{2^2+3}=\tfrac17" /> (option A), the local minima, and option B pairs those minima with the maxima's height.</>,
  },
]

export default function SpecialistQ3_2021() {
  return (
    <MCQShell
      question={
        <p>
          The coordinates of the local maxima of the graph of{' '}
          <Katex tex="y=\dfrac{1}{\bigl(\cos(ax)+1\bigr)^2+3}" />, where{' '}
          <Katex tex="a\in R\setminus\{0\}" />, are
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left(\tfrac{2\pi k}{a},\ \tfrac17\right),\ k\in Z" /> },
        { letter: 'B', content: <Katex tex="\left(\tfrac{2\pi k}{a},\ \tfrac13\right),\ k\in Z" /> },
        { letter: 'C', content: <Katex tex="\left(\tfrac{(1+2k)\pi}{2a},\ \tfrac14\right),\ k\in Z" /> },
        { letter: 'D', content: <Katex tex="\left(\tfrac{\pi(1+2k)}{a},\ \tfrac14\right),\ k\in Z" /> },
        {
          letter: 'E',
          content: <Katex tex="\left(\tfrac{\pi(1+2k)}{a},\ \tfrac13\right),\ k\in Z" />,
          isAnswer: true,
        },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
