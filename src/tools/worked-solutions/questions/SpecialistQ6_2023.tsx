// 2023 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 69% correct.
// Tracing Euler's method through pseudocode, one pass at a time. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 12, C: 69, D: 14, E: 2 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y \leftarrow y+h\,f(x,y), \qquad x \leftarrow x+h, \qquad h = 0.5,\ f(x,y) = e^{xy}" />,
    reason: <>Euler's method. The loop updates <Katex tex="y" /> <em>first</em>, using the old <Katex tex="x" />, and only then advances <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\text{Start: } x_0 = 0,\ y_0 = 0" />,
    reason: 'Both initialised to zero.',
  },
  {
    working: <Katex display tex="\text{Pass 1: } y = 0+0.5e^{0\times0} = 0.5, \quad x = 0.5" />,
    reason: <><Katex tex="e^0=1" />.</>,
  },
  {
    working: <Katex display tex="\text{Pass 2: } y = 0.5+0.5e^{0.5\times0.5} = 0.5+0.5e^{0.25} = 1.1420, \quad x = 1" />,
    reason: <><Katex tex="e^{0.25}\approx1.2840" />.</>,
  },
  {
    working: <Katex display tex="\text{Pass 3: } y = 1.1420+0.5e^{1\times1.1420} = 1.1420+1.5665 = 2.7085" />,
    reason: <>Rounds to <Katex tex="2.709" />.</>,
  },
  {
    working: <Katex display tex="\boxed{3 \text{ iterations}}" />,
    reason: <>Option <b>C</b>. The growth is explosive — a fourth pass gives <Katex tex="31.8" /> — so there is no ambiguity about which iteration produced the printed value.</>,
  },
]

export default function SpecialistQ6_2023() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>Consider the following pseudocode.</p>
          <pre className="text-[12.5px] leading-relaxed bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-xl p-4 overflow-x-auto">
{`define f(x,y) = e^(xy)
    x ← 0
    y ← 0
    h ← 0.5
    n ← 0

while n ≥ 0
    y ← y + h × f(x,y)
    x ← x + h
    n ← n + 1

print y
end while`}
          </pre>
          <p>After how many iterations will the pseudocode print 2.709?</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="2" /> },
        { letter: 'C', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="4" /> },
        { letter: 'E', content: <Katex tex="5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
