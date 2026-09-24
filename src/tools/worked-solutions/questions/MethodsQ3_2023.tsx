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
    reason: <>To add two outputs you need <em>both</em> to exist, so the domains intersect. Option <b>A</b> takes the union instead.</>,
  },
  {
    working: <Katex display tex="[-2,3)\cap(-1,5]" />,
    reason: <>Substituting the two given domains.</>,
  },
  {
    working: <Katex display tex="\text{lower end: } \max(-2,-1) = -1, \text{ excluded (open in } q)" />,
    reason: <>Where the two intervals disagree about a bracket, the stricter one wins: <Katex tex="q" /> excludes <Katex tex="-1" />, so the intersection does too.</>,
  },
  {
    working: <Katex display tex="\text{upper end: } \min(3,5) = 3, \text{ excluded (open in } p)" />,
    reason: <>Same reasoning at the other end.</>,
  },
  {
    working: <Katex display tex="\boxed{(-1,\,3)}" />,
    reason: <>Matches option <b>E</b>. Option <b>D</b> has the right numbers with the wrong brackets — at <Katex tex="x=3" />, <Katex tex="p(3)" /> does not exist, so neither does the sum.</>,
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
