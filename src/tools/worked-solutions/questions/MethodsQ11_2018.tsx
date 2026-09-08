// 2018 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 26% correct —
// the fourth-hardest MCQ in the 2017-2018 Methods Exam 2 papers.
// Pin down a in y = tan(ax) from one asymptote location and a count of x-intercepts.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 38, B: 29, C: 26, D: 4, E: 3 },
  answer: 'C',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="y=\tan(ax) \;\implies\; y=\tan\!\left(\dfrac{x}{2}\right)" />, Period <Katex tex="=2\pi" />.
      Asymptotes are at <Katex tex="x=\pi,\,x=3\pi" />. The <Katex tex="x" />-intercept is <Katex tex="2\pi" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{asymptotes: } ax=\frac{\pi}{2}+n\pi \;\implies\; x=\frac{(2n+1)\pi}{2a}, \quad n=0,1,2,\dots" />,
    reason: <>Vertical asymptotes of <Katex tex="\tan" /> occur where its argument is an odd multiple of <Katex tex="\tfrac{\pi}{2}" />.</>,
  },
  {
    working: <Katex display tex="x\text{-intercepts: } ax=n\pi \;\implies\; x=\frac{n\pi}{a}, \quad n=0,1,2,\dots" />,
  },
  {
    working: <Katex display tex="\text{need } \frac{(2n+1)\pi}{2a}=3\pi \text{ for some integer } n\ge 0 \;\implies\; a=\frac{2n+1}{6}" />,
    reason: <>Test which options give an integer <Katex tex="n" /> — only these values of <Katex tex="a" /> can produce an asymptote exactly at <Katex tex="x=3\pi" />.</>,
  },
  {
    working: <Katex display tex="a=\tfrac12 \;\implies\; \frac{2n+1}{6}=\tfrac12 \;\implies\; n=1 \quad\checkmark \text{ (integer)}" />,
    reason: <>Options A <Katex tex="(\tfrac16)" />, B <Katex tex="(\tfrac13)" />, D <Katex tex="(1)" /> and E <Katex tex="(2)" /> all give non-integer <Katex tex="n" /> here — only <Katex tex="a=\tfrac12" /> works.</>,
  },
  {
    working: <Katex display tex="a=\tfrac12 \;\implies\; \text{asymptotes in } (0,3\pi]\text{ at } x=\pi,\,3\pi \qquad \text{intercepts at } x=\frac{n\pi}{1/2}=2n\pi" />,
    reason: <>With <Katex tex="n=0" /> in the asymptote formula, the first asymptote is at <Katex tex="x=\pi" />, then <Katex tex="x=3\pi" /> matches the given one. Now check the intercept count.</>,
  },
  {
    working: <Katex display tex="0<2n\pi<3\pi \;\implies\; 0<n<1.5 \;\implies\; n=1 \text{ only} \;\implies\; x=2\pi" />,
    reason: <>Exactly one integer <Katex tex="n" /> satisfies this, giving exactly one <Katex tex="x" />-intercept in <Katex tex="(0,3\pi)" /> — matching the condition given.</>,
  },
  {
    working: <Katex display tex="\boxed{a=\tfrac12}" />,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function MethodsQ11_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The graph of <Katex tex="y=\tan(ax)" />, where <Katex tex="a\in\mathbb{R}^+" />, has a vertical
            asymptote <Katex tex="x=3\pi" /> and has exactly one <Katex tex="x" />-intercept in the region{' '}
            <Katex tex="(0,3\pi)" />.
          </p>
          <p>The value of <Katex tex="a" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{1}{6}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{1}{3}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{1}{2}" />, isAnswer: true },
        { letter: 'D', content: '1' },
        { letter: 'E', content: '2' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
