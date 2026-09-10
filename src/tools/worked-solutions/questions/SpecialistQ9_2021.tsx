// 2021 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 38% correct.
// Which derivative corresponds to an f with no points of inflection. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 38, C: 12, D: 9, E: 22 },
  answer: 'B',
  comment: (
    <>
      The antiderivative of the expression in option B is a quartic with a turning point but no point of
      inflection. Alternatively, the sign of the second derivative doesn't change around <Katex tex="x=3" /> for
      option B.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>An inflection point of <Katex tex="f" /> occurs exactly where <Katex tex="f''(x)" /> <b>changes sign</b> — not merely where it equals zero.</>,
    reason: <>Since each option gives <Katex tex="f'(x)" />, differentiate once more to test each candidate's <Katex tex="f''(x)" /> for a genuine sign change.</>,
  },
  {
    working: <Katex display tex="\text{A: } f'=2(x-3)^2+5 \;\implies\; f''=4(x-3)" />,
    reason: <>Linear, changes sign at <Katex tex="x=3" /> — f <i>has</i> an inflection point. Ruled out.</>,
  },
  {
    working: <Katex display tex="\text{B: } f'=2(x-3)^3+5 \;\implies\; f''=6(x-3)^2" />,
    reason: <>A perfect square — <Katex tex="f''\geq0" /> everywhere, touching (but not crossing) zero at <Katex tex="x=3" />. No sign change, so <b>no inflection point</b>.</>,
  },
  {
    working: <Katex display tex="\text{C: } f'=\tfrac52(x-3)^2 \;\implies\; f''=5(x-3)" />,
    reason: 'Linear, changes sign at x = 3. Ruled out.',
  },
  {
    working: <Katex display tex="\text{D: } f'=\tfrac12(x-3)^2-5 \;\implies\; f''=(x-3)" />,
    reason: 'Linear, changes sign at x = 3. Ruled out.',
  },
  {
    working: <Katex display tex="\text{E: } f'=(x-3)^3-12x \;\implies\; f''=3(x-3)^2-12=3(x-5)(x-1)" />,
    reason: <>Changes sign at both <Katex tex="x=1" /> and <Katex tex="x=5" /> — two inflection points. Ruled out.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = 2(x-3)^3+5}" />,
    reason: <>Only option <b>B</b> has an <Katex tex="f''" /> that never changes sign.</>,
  },
]

export default function SpecialistQ9_2021() {
  return (
    <MCQShell
      question={<p>Which one of the following derivatives corresponds to a graph of <Katex tex="f" /> that has no points of inflection?</p>}
      options={[
        { letter: 'A', content: <Katex tex="f'(x) = 2(x-3)^2+5" /> },
        { letter: 'B', content: <Katex tex="f'(x) = 2(x-3)^3+5" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="f'(x) = \tfrac52(x-3)^2" /> },
        { letter: 'D', content: <Katex tex="f'(x) = \tfrac12(x-3)^2-5" /> },
        { letter: 'E', content: <Katex tex="f'(x) = (x-3)^3-12x" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
