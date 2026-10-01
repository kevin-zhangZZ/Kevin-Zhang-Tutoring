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
    reason: <>The implied domain is every <Katex tex="x" /> for which the rule gives a real value. Inverse cosine only accepts inputs from <Katex tex="-1" /> to <Katex tex="1" /> (its domain is <Katex tex="[-1,\ 1]" />), and here its input is <Katex tex="u=\log_e(bx)" />.</>,
  },
  {
    working: <Katex display tex="-1 \le \log_e(bx) \le 1" />,
    reason: <>The logarithm also needs <Katex tex="bx>0" />. The next line gives <Katex tex="bx\ge e^{-1}>0" />, so that condition is met automatically.</>,
  },
  {
    working: <Katex display tex="e^{-1} \le bx \le e^1" />,
    reason: <>Raise <Katex tex="e" /> to the power of all three parts to undo the log. This is safe because <Katex tex="e^u" /> is increasing, so the inequalities keep their direction.</>,
  },
  {
    working: <Katex display tex="\frac{1}{be} \le x \le \frac{e}{b}" />,
    reason: <>Divide all three parts by <Katex tex="b" />; it is positive, so the inequalities keep their direction. Note <Katex tex="\tfrac{e^{-1}}{b}=\tfrac{1}{be}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\left[\frac{1}{be},\ \frac{e}{b}\right]}" />,
    reason: <>Matches option <b>E</b>. Option C, <Katex tex="\left[\tfrac1b,\ \tfrac eb\right]" />, is what <Katex tex="0\le\log_e(bx)\le1" /> gives: it starts the band at <Katex tex="0" /> instead of <Katex tex="-1" />. Option D, <Katex tex="\left[\tfrac1b,\ \tfrac{e^\pi}b\right]" />, is what <Katex tex="0\le\log_e(bx)\le\pi" /> gives: the range of <Katex tex="\cos^{-1}" />, <Katex tex="[0,\ \pi]" />, used in place of its domain.</>,
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
