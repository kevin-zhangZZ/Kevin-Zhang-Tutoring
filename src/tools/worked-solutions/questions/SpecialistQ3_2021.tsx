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
    working: <Katex display tex="y = \frac{1}{\bigl(\cos(ax)+1\bigr)^2+3}" />,
    reason: <>The denominator is always at least 3, so <Katex tex="y>0" /> everywhere and no calculus is needed.</>,
  },
  {
    working: <Katex display tex="y \text{ is largest when the denominator is smallest}" />,
    reason: 'A positive reciprocal turns a maximisation into a minimisation.',
  },
  {
    working: <Katex display tex="\bigl(\cos(ax)+1\bigr)^2 \ge 0, \text{ with equality when } \cos(ax) = -1" />,
    reason: <>A square, so its minimum is zero — reached only at <Katex tex="\cos(ax)=-1" />, not at <Katex tex="\cos(ax)=1" />.</>,
  },
  {
    working: <Katex display tex="y_{\max} = \frac{1}{0+3} = \frac13" />,
    reason: <>Options with <Katex tex="\tfrac14" /> take <Katex tex="\cos(ax)=0" />; the one with <Katex tex="\tfrac17" /> takes <Katex tex="\cos(ax)=1" />, which is the <em>minimum</em>.</>,
  },
  {
    working: <Katex display tex="\cos(ax) = -1 \implies ax = \pi(1+2k) \implies x = \frac{\pi(1+2k)}{a}" />,
    reason: <>The odd multiples of <Katex tex="\pi" />, for <Katex tex="k\in Z" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\frac{\pi(1+2k)}{a},\ \frac13\right), \ k\in Z}" />,
    reason: <>Matches option <b>E</b>.</>,
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
