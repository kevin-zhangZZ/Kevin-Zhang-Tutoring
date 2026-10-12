// 2025 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 72% correct.
// Tracing a while loop that prints inside the body. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 15, C: 72, D: 3 },
  answer: 'C',
  comment: (
    <>
      <Katex tex="n=17,\ k=5,\ n>k" />
      <br />
      <Katex tex="n=12,\ k=5,\ \text{print }12,\ n>k" />
      <br />
      <Katex tex="n=7,\ k=5,\ \text{print }7,\ n>k" />
      <br />
      <Katex tex="n=2,\ k=5,\ \text{print }2,\ n<k" /> end while
      <br />
      The printed values are 12, 7 and 2.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="n = 17, \quad k = 5" />,
    reason: <>The initial values. <Katex tex="k" /> never changes, so each pass of the loop subtracts 5 from <Katex tex="n" />.</>,
  },
  {
    working: <Katex display tex="17>5 \ \checkmark \implies n = 12, \ \text{print } 12" />,
    reason: <>The test <Katex tex="n>k" /> is checked first; if true, the body runs in order: subtract, then print the new <Katex tex="n" />.</>,
    more: <>A <code>while</code> loop only checks its condition at the top of each pass. Once the test passes, every line of the body runs, even if <Katex tex="n" /> drops below <Katex tex="k" /> partway through. Separately, 17 is never printed because the body subtracts 5 before it prints, so the first value printed is already 12.</>,
  },
  {
    working: <Katex display tex="12>5 \ \checkmark \implies n = 7, \ \text{print } 7" />,
    reason: <>Second pass: back to the test with the new value <Katex tex="n=12" />.</>,
  },
  {
    working: <Katex display tex="7>5 \ \checkmark \implies n = 2, \ \text{print } 2" />,
    reason: <>Third pass. The test was passed with <Katex tex="n=7" />, so 2 is still printed, even though <Katex tex="2<5" />.</>,
    more: <>This is the step behind option <b>B</b> (15%): stopping as soon as <Katex tex="n" /> falls below 5 and not printing 2. The comparison with <Katex tex="k" /> is only made at the top of the next pass, after 2 has already been printed.</>,
  },
  {
    working: <Katex display tex="2>5 \ \times \implies \text{loop ends}" />,
    reason: <>The test fails, so the body does not run again: nothing more is printed, and <Katex tex="-3" /> never appears.</>,
  },
  {
    working: <Katex display tex="\boxed{12,\ 7,\ 2}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>
      <b>A</b> (12) stops after a single pass, as if the <code>while</code> were a one-off <code>if</code>.{' '}
      <b>B</b> (12, 7) is the third-pass slip described above.{' '}
      <b>D</b> (12, 7, 2, <Katex tex="-3" />) runs one more pass after the test <Katex tex="2>5" /> has failed. Writing <Katex tex="n" /> after each line, as the report does, keeps the order test, subtract, print straight.
    </>,
  },
]

export default function MethodsQ7_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>Consider the algorithm below.</p>
          <pre className="text-[13px] leading-relaxed bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800 rounded-xl px-5 py-3 w-fit">
{`n ← 17
k ← 5
while n > k
    n ← n − k
    print n
end while`}
          </pre>
          <p>In order, the values printed by the algorithm are</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="12" /> },
        { letter: 'B', content: <Katex tex="12,\ 7" /> },
        { letter: 'C', content: <Katex tex="12,\ 7,\ 2" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="12,\ 7,\ 2,\ -3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
