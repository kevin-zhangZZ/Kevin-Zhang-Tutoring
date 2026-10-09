// 2022 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 85% correct.
// Two absolute values over an interval where both signs are known. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 85, C: 8, D: 3, E: 3 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\tfrac12 \le x \le 3 \implies 2x-1 \ge 0" />,
    reason: <>To remove an absolute value you need the sign of what is inside it. <Katex tex="2x-1" /> is <Katex tex="0" /> at <Katex tex="x=\tfrac12" /> and increases from there, so it is never negative on this interval.</>,
    more: <>The interval is chosen to make this work: its endpoints are exactly where each bracket is zero (<Katex tex="2x-1=0" /> at <Katex tex="x=\tfrac12" />, <Katex tex="x-3=0" /> at <Katex tex="x=3" />). So neither bracket changes sign anywhere in between, and each absolute value can be replaced by one ordinary expression for the whole interval.</>,
  },
  {
    working: <Katex display tex="|2x-1| = 2x-1" />,
    reason: <>The absolute value of a number that is zero or positive is the number itself.</>,
  },
  {
    working: <Katex display tex="\tfrac12 \le x \le 3 \implies x-3 \le 0" />,
    reason: <><Katex tex="x-3" /> is <Katex tex="0" /> at <Katex tex="x=3" /> and negative for every smaller <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="|x-3| = -(x-3) = 3-x" />,
    reason: <>For a number that is zero or negative, <Katex tex="|a|=-a" />: the absolute value flips the sign of <i>every</i> term in the bracket.</>,
  },
  {
    working: <Katex display tex="y = (2x-1)-(3-x)" />,
    reason: <>Substitute both into <Katex tex="y" />. Keep the brackets: the minus sign in front of <Katex tex="|x-3|" /> applies to the whole of <Katex tex="3-x" />.</>,
  },
  {
    working: <Katex display tex="y = 2x-1-3+x" />,
    reason: <>Distribute the minus sign: <Katex tex="-(3-x)=-3+x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 3x-4}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Spot-check <Katex tex="x=1" />: <Katex tex="|1|-|-2|=-1" />, and <Katex tex="3(1)-4=-1" />. Option C, the most common wrong answer, comes from not flipping the second bracket, <Katex tex="(2x-1)-(x-3)=x+2" />; option A from flipping the first bracket as well, <Katex tex="(1-2x)-(3-x)=-x-2" />. Options D and E are sign slips on the second bracket: writing <Katex tex="|x-3|" /> as <Katex tex="-x-3" /> gives <Katex tex="3x+2" /> (D), and expanding <Katex tex="-(3-x)" /> as <Katex tex="-3-x" /> gives <Katex tex="x-4" /> (E).</>,
  },
]

export default function SpecialistQ1_2022() {
  return (
    <MCQShell
      question={
        <p>
          For the interval <Katex tex="\tfrac12\le x\le3" />, the graph of{' '}
          <Katex tex="y=|2x-1|-|x-3|" /> is the same as the graph of
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=-x-2" /> },
        { letter: 'B', content: <Katex tex="y=3x-4" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="y=x+2" /> },
        { letter: 'D', content: <Katex tex="y=3x+2" /> },
        { letter: 'E', content: <Katex tex="y=x-4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
