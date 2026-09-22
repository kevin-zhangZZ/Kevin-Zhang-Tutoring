// 2021 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 76% correct.
// The implied domain of an inverse cosine of a logarithm. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 2, C: 15, D: 4, E: 76 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos^{-1}(u) \text{ needs } -1 \le u \le 1" />,
    reason: 'The domain of inverse cosine is the binding constraint.',
  },
  {
    working: <Katex display tex="-1 \le \log_e(bx) \le 1" />,
    reason: <>The log's own requirement <Katex tex="bx>0" /> is automatically satisfied by this band.</>,
  },
  {
    working: <Katex display tex="e^{-1} \le bx \le e^1" />,
    reason: <>Exponentiating is safe because <Katex tex="e^u" /> is increasing, so the inequalities keep their direction.</>,
  },
  {
    working: <Katex display tex="\boxed{\left[\frac{1}{be},\ \frac{e}{b}\right]}" />,
    reason: <>Dividing by <Katex tex="b>0" /> keeps the order. Matches option <b>E</b>; option C uses <Katex tex="\tfrac1b" /> instead of <Katex tex="\tfrac{1}{be}" />, forgetting that <Katex tex="e^{-1}\ne1" />.</>,
  },
]

export default function SpecialistQ2_2021() {
  return (
    <MCQShell
      question={
        <p>
          The implied domain of the function with rule{' '}
          <Katex tex="f(x)=\cos^{-1}\bigl(\log_e(bx)\bigr)" />, <Katex tex="b>0" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(0,\ 1]" /> },
        { letter: 'B', content: <Katex tex="[1,\ e]" /> },
        { letter: 'C', content: <Katex tex="\left[\tfrac1b,\ \tfrac eb\right]" /> },
        { letter: 'D', content: <Katex tex="\left[\tfrac1b,\ \tfrac{e^\pi}{b}\right]" /> },
        { letter: 'E', content: <Katex tex="\left[\tfrac{1}{be},\ \tfrac eb\right]" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
