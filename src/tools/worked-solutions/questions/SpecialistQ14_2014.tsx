// 2014 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 72% correct.
// Matching a direction field to its differential equation. Question text transcribed from the original paper; the figure is a crop of VCAA's own artwork; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import fieldSrc from './spec-2014-mcq14-field.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 9, C: 72, D: 4, E: 8 },
  answer: 'C',
  noAnswer: 0,
  comment: (
    <>
      The vertical line segments on the line <Katex tex="y=x" />, so options A and C were
      possibilities. Negative gradients for <Katex tex="y=0" /> and <Katex tex="x>0" /> then
      gave option C.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{segments are vertical along } y = x" />,
    reason: <>A vertical segment means <Katex tex="\tfrac{dy}{dx}" /> is undefined there, so the denominator must vanish on that line.</>,
  },
  {
    working: <Katex display tex="\text{A: } \tfrac{1}{x-y} \text{ and C: } \tfrac{1}{y-x} \text{ are undefined when } y = x" />,
    reason: <>Both survive. Options B and D are defined everywhere, and option E blows up on <Katex tex="y=-x" /> instead.</>,
  },
  {
    working: <Katex display tex="\text{test } y = 0,\ x>0" />,
    reason: <>Along the positive <Katex tex="x" />-axis the printed segments slope downwards.</>,
  },
  {
    working: <Katex display tex="\text{A: } \frac{1}{x-0} = \frac1x > 0" />,
    reason: <>Positive gradients — the wrong way.</>,
  },
  {
    working: <Katex display tex="\text{C: } \frac{1}{0-x} = -\frac1x < 0 \ \checkmark" />,
    reason: <>Negative, matching the field.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{1}{y-x}}" />,
    reason: <>Matches option <b>C</b>. Two checks — where the field is vertical, then the sign somewhere convenient — settle it without testing every point.</>,
  },
]

export default function SpecialistQ14_2014() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-3">
            <img
              src={fieldSrc}
              alt="A direction field whose segments turn vertical along the diagonal line y = x and slope downwards along the positive x-axis — from the original 2014 VCAA exam paper"
              className="w-full max-w-[440px]"
            />
          </div>
          <p>
            The differential equation that is best represented by the above direction field is
          </p>
        </>
      }
      background={
        <p>
          Two quick tests handle almost every direction-field question: find where the
          segments are vertical (the denominator is zero there), then check the sign of the
          gradient at one convenient point.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{dy}{dx} = \tfrac{1}{x-y}" /> },
        { letter: 'B', content: <Katex tex="\tfrac{dy}{dx} = y-x" /> },
        { letter: 'C', content: <Katex tex="\tfrac{dy}{dx} = \tfrac{1}{y-x}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\tfrac{dy}{dx} = x-y" /> },
        { letter: 'E', content: <Katex tex="\tfrac{dy}{dx} = \tfrac{1}{y+x}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
