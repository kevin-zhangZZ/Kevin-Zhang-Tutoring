// 2020 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 42% correct.
// Range of f(x) = |b·cos⁻¹(x) − a|. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 42, C: 24, D: 10, E: 5 },
  answer: 'B',
  comment: (
    <>
      Use transformations on <Katex tex="g(x)=\cos^{-1}(x)" />: dilate by <Katex tex="b" />, translate down by{' '}
      <Katex tex="a" />, then reflect any negative part up.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos^{-1}(x) \text{ has range } [0,\pi] \;\implies\; b\cos^{-1}(x) \text{ has range } [0,b\pi]" />,
    reason: <>Since <Katex tex="b>0" />, multiplying by <Katex tex="b" /> preserves the direction of the inequality.</>,
  },
  {
    working: <Katex display tex="b\cos^{-1}(x) - a \text{ has range } [-a,\ b\pi-a]" />,
    reason: 'Shift down by a.',
  },
  {
    working: <Katex display tex="-a < 0 < b\pi - a" />,
    reason: <>Since <Katex tex="a>0" /> and <Katex tex="a<\tfrac{b\pi}{2}<b\pi" />, this interval straddles zero — so taking the absolute value doesn't simply flip one endpoint.</>,
  },
  {
    working: <Katex display tex="\big|{-a}\big| = a, \qquad \big|b\pi-a\big| = b\pi - a" />,
    reason: 'The two candidate endpoints of |b·cos⁻¹(x) − a|, once the interval is folded at zero.',
  },
  {
    working: <Katex display tex="a < \tfrac{b\pi}{2} \;\implies\; b\pi - a > \tfrac{b\pi}{2} > a" />,
    reason: <>Given condition — so the folded interval's maximum is <Katex tex="b\pi-a" />, not <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Range} = [0,\ b\pi-a]}" />,
    reason: <>The minimum <Katex tex="0" /> is attained where <Katex tex="b\cos^{-1}(x)-a=0" />; matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ2_2020() {
  return (
    <MCQShell
      question={
        <p>
          A function <Katex tex="f" /> has the rule <Katex tex="f(x) = \big|b\cos^{-1}(x) - a\big|" />, where{' '}
          <Katex tex="a>0" />, <Katex tex="b>0" /> and <Katex tex="a<\dfrac{b\pi}{2}" />.
          <br />
          The range of <Katex tex="f" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="[-a,\ b\pi-a]" /> },
        { letter: 'B', content: <Katex tex="[0,\ b\pi-a]" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="[a,\ b\pi-a]" /> },
        { letter: 'D', content: <Katex tex="[0,\ b\pi+a]" /> },
        { letter: 'E', content: <Katex tex="[a-b\pi,\ a]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
