// 2023 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 72% correct.
// Counting solutions of cos(x) = k on a closed interval, endpoints included. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 6, C: 14, D: 4, E: 72 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a+\sec(x) = 0 \implies \sec(x) = -a \implies \cos(x) = -\frac1a" />,
    reason: <>Turning the secant into a cosine makes the counting easy. Note <Katex tex="a\ne0" /> is forced, since <Katex tex="\sec(x)" /> is never 0.</>,
  },
  {
    working: <Katex display tex="\text{On } [-\pi,\pi]: \ \cos(x) = k \text{ has 2 solutions if } -1\le k<1, \ 1 \text{ if } k=1, \ 0 \text{ if } |k|>1" />,
    reason: <>Cosine is even, so solutions come in pairs <Katex tex="\pm x_0" /> — except at <Katex tex="k=1" />, where the pair collapses to <Katex tex="x=0" />. At <Katex tex="k=-1" /> the two endpoints <Katex tex="\pm\pi" /> are both included.</>,
  },
  {
    working: <Katex display tex="k = -\frac1a: \quad |k|\le1 \iff |a|\ge1" />,
    reason: 'Outside this there are no intercepts at all.',
  },
  {
    working: <Katex display tex="k = 1 \iff a = -1 \ \text{(one solution only — excluded)}" />,
    reason: <>The single tangential crossing at <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="k = -1 \iff a = 1 \ \text{(two solutions, } x=\pm\pi\text{ — included)}" />,
    reason: 'Both endpoints of the closed interval count, which is why the answer has a closed bracket on one side only.',
  },
  {
    working: <Katex display tex="\boxed{a < -1 \ \text{ or } \ a \ge 1}" />,
    reason: <>Option <b>E</b>. The asymmetry is the whole question: <Katex tex="a=1" /> works and <Katex tex="a=-1" /> does not.</>,
  },
]

export default function SpecialistQ3_2023() {
  return (
    <MCQShell
      question={
        <p>
          In the interval <Katex tex="-\pi\le x\le\pi" />, the graph of{' '}
          <Katex tex="y=a+\sec(x)" />, where <Katex tex="a\in\mathbb{R}" />, has two{' '}
          <Katex tex="x" />-intercepts when
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0\le a\le1" /> },
        { letter: 'B', content: <Katex tex="-1<a<1" /> },
        { letter: 'C', content: <Katex tex="a\le-1 \ \text{ or } \ a>1" /> },
        { letter: 'D', content: <Katex tex="-1\le a<0" /> },
        { letter: 'E', content: <Katex tex="a<-1 \ \text{ or } \ a\ge1" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
