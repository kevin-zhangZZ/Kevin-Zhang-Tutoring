// 2025 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 48% correct. This
// year's paper used four options (A–D) rather than five. Finding a counter-example to
// "f''(0)=0 implies an inflection point at x=0". Question text transcribed from the original
// paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 6, C: 40, D: 48 },
  answer: 'D',
  comment: (
    <>
      To show a point of inflection exists at <Katex tex="x=0" />, the second derivative must equal zero at{' '}
      <Katex tex="x=0" /> <b>and change sign</b> there — option D's <Katex tex="f''" /> doesn't.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A point of inflection needs <Katex tex="f''(x)" /> to equal zero <i>and change sign</i> — not merely touch zero.</>,
    reason: 'The statement to disprove conflates the two — a counter-example needs f″(0)=0 with no actual sign change.',
  },
  {
    working: <Katex display tex="f(x) = x^4-x \;\implies\; f'(x)=4x^3-1 \;\implies\; f''(x)=12x^2" />,
    reason: 'Differentiate option D twice.',
  },
  {
    working: <Katex display tex="f''(0) = 12(0)^2 = 0" />,
    reason: 'The premise of the statement is satisfied.',
  },
  {
    working: <Katex display tex="f''(x) = 12x^2 \geq 0 \text{ for all } x" />,
    reason: <>A perfect square — <Katex tex="f''" /> never goes negative, so it does not change sign at <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x)=x^4-x \text{ has no inflection point at } x=0}" />,
    reason: <>This genuinely contradicts the statement — matches option <b>D</b>. (By contrast, <Katex tex="f(x)=\sin^{-1}(x)" /> in option A really does have an inflection at <Katex tex="x=0" />, so it doesn't disprove anything.)</>,
  },
]

export default function SpecialistQ2_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following statement.</p>
          <p className="mb-2 italic">
            'If <Katex tex="f''(0)=0" />, then the graph of <Katex tex="f" /> necessarily has a point of inflection at{' '}
            <Katex tex="x=0" />.'
          </p>
          <p>A counter-example that disproves this statement is when</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x) = \sin^{-1}(x)" /> },
        { letter: 'B', content: <Katex tex="f(x) = \dfrac{2x}{x^2-1}" /> },
        { letter: 'C', content: <Katex tex="f(x) = x^{1/3}" /> },
        { letter: 'D', content: <Katex tex="f(x) = x^4-x" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
