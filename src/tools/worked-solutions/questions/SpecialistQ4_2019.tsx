// 2019 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 44% correct.
// Sum of i to the power of consecutive factorials. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 8, C: 44, D: 17, E: 13 },
  answer: 'C',
  comment: <><Katex tex="n!" /> is a multiple of 4 for <Katex tex="n\geq4,\ n\in N" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="1!=1,\ \ 2!=2,\ \ 3!=6,\ \ n!\text{ divisible by }4\text{ for }n\geq4" />,
    reason: <>The powers of <Katex tex="i" /> cycle with period 4, so only <Katex tex="n!\bmod4" /> matters.</>,
  },
  {
    working: <Katex display tex="i^{1!}=i^1=i" />,
    reason: <>First term: <Katex tex="1!=1" />.</>,
  },
  {
    working: <Katex display tex="i^{2!}=i^2=-1" />,
    reason: <>Second term: <Katex tex="2!=2" />.</>,
  },
  {
    working: <Katex display tex="i^{3!}=i^6=i^{6\bmod4}=i^2=-1" />,
    reason: <>Third term: <Katex tex="3!=6" />, and <Katex tex="6" /> leaves remainder <Katex tex="2" /> on division by <Katex tex="4" />.</>,
  },
  {
    working: <Katex display tex="i^{n!}=1 \text{ for } n=4,5,\dots,100" />,
    reason: <>Every <Katex tex="n!" /> for <Katex tex="n\geq4" /> contains a factor of 4 (from the <Katex tex="4" /> in the product), so <Katex tex="i^{n!}=(i^4)^{n!/4}=1" /> — that's 97 terms, each equal to 1.</>,
  },
  {
    working: <Katex display tex="\boxed{i+(-1)+(-1)+97(1) = 95+i}" />,
    reason: <>Matches option <b>C</b>. The other options come from miscounting the terms equal to <Katex tex="1" /> (there are <Katex tex="97" />, for <Katex tex="n=4" /> to <Katex tex="100" />) or mis-evaluating the first three powers.</>,
  },
]

export default function SpecialistQ4_2019() {
  return (
    <MCQShell
      question={
        <p>
          The expression <Katex tex="i^{1!}+i^{2!}+i^{3!}+\cdots+i^{100!}" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="96" /> },
        { letter: 'C', content: <Katex tex="95+i" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="94+2i" /> },
        { letter: 'E', content: <Katex tex="98+2i" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
