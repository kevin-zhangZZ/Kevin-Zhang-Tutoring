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
    working: (
      <>
        <Katex display tex="\text{asymptotes: } ax=\frac{\pi}{2}+n\pi" />
        <Katex display tex="\implies\; x=\frac{(2n+1)\pi}{2a}" />
        <Katex display tex="n=0,1,2,\dots" />
      </>
    ),
    reason: <>Vertical asymptotes of <Katex tex="\tan" /> occur where its argument is an odd multiple of <Katex tex="\tfrac{\pi}{2}" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x\text{-intercepts: } ax=n\pi" />
        <Katex display tex="\implies\; x=\frac{n\pi}{a}, \quad n=0,1,2,\dots" />
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\text{need } \frac{(2n+1)\pi}{2a}=3\pi" />
        <Katex display tex="\text{for integer } n\ge 0" />
        <Katex display tex="\implies\; a=\frac{2n+1}{6}" />
      </>
    ),
    reason: <>Test which options give an integer <Katex tex="n" /> — only these values of <Katex tex="a" /> can produce an asymptote exactly at <Katex tex="x=3\pi" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="a=\tfrac16 \Rightarrow n=0 \ \checkmark" />
        <Katex display tex="a=\tfrac12 \Rightarrow n=1 \ \checkmark" />
        <Katex display tex="a=\tfrac13,\,1,\,2 \Rightarrow n=\tfrac12,\,\tfrac52,\,\tfrac{11}{2} \ \times" />
      </>
    ),
    reason: <>Only options A <Katex tex="(\tfrac16)" /> and C <Katex tex="(\tfrac12)" /> give an integer <Katex tex="n" />, so only those two can have an asymptote at <Katex tex="x=3\pi" /> at all. The intercept condition decides between them.</>,
  },
  {
    working: (
      <>
        <Katex display tex="a=\tfrac16: \ x\text{-intercepts at } x=6n\pi" />
        <Katex display tex="\implies\; 0<6n\pi<3\pi" />
        <Katex display tex="\iff\; 0<n<\tfrac12" />
        <Katex display tex="\implies\; \text{no integer } n" />
      </>
    ),
    reason: <>Option A gives <em>zero</em> <Katex tex="x" />-intercepts in <Katex tex="(0,3\pi)" /> (the first one after <Katex tex="x=0" /> is way out at <Katex tex="6\pi" />), so it fails the "exactly one" requirement.</>,
  },
  {
    working: (
      <>
        <Katex display tex="a=\tfrac12: \ x\text{-intercepts at } x=2n\pi" />
        <Katex display tex="\implies\; 0<2n\pi<3\pi" />
        <Katex display tex="\iff\; 0<n<\tfrac32" />
        <Katex display tex="\implies\; n=1 \text{ only},\ x=2\pi" />
      </>
    ),
    reason: <>Exactly one <Katex tex="x" />-intercept in <Katex tex="(0,3\pi)" />, at <Katex tex="x=2\pi" /> — matching the condition given. (Its asymptotes there are <Katex tex="x=\pi" /> and <Katex tex="x=3\pi" />.)</>,
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
