// 2016 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 84% correct.
// Implied domain of arccos((x − a)/b). Question text transcribed from the original paper;
// solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 84, C: 8, D: 4, E: 1 },
  answer: 'B',
  noAnswer: 0,
  comment: <Katex tex="-1\le\tfrac{x-a}{b}\le1" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="-1\le\frac{x-a}{b}\le1" />,
    reason: <>The domain of <Katex tex="\arccos" /> is <Katex tex="[-1,1]" />, so whatever goes inside has to land there.</>,
  },
  {
    working: <Katex display tex="-b\le x-a\le b" />,
    reason: <>Multiply through by <Katex tex="b" />. Because <Katex tex="b>0" /> is given, the inequality signs do not flip.</>,
    more: <>That is exactly why the question states <Katex tex="b>0" />. If <Katex tex="b" /> were negative the signs would flip, and the domain would be <Katex tex="[a+b,\ a-b]" /> instead.</>,
  },
  {
    working: <Katex display tex="\boxed{a-b\le x\le a+b}" />,
    reason: <>Add <Katex tex="a" /> throughout. Matches option <b>B</b>.</>,
    more: (
      <>
        <b>C</b> (8%, the most common wrong answer) is what you get if the <Katex tex="b" /> never gets multiplied through;{' '}
        <b>E</b> if the <Katex tex="a" /> never gets added; <b>A</b> is the domain of plain <Katex tex="\arccos(x)" />, ignoring the
        transformation altogether. <b>D</b> confuses the domain with the range: it sets <Katex tex="\tfrac{x-a}{b}" /> in{' '}
        <Katex tex="[0,\pi]" />, which is the range of <Katex tex="\arccos" />, not its domain.
      </>
    ),
  },
]

export default function SpecialistQ2_2016() {
  return (
    <MCQShell
      question={
        <p>
          The implied domain of{' '}
          <Katex tex="y=\arccos\!\left(\dfrac{x-a}{b}\right)" />, where{' '}
          <Katex tex="b>0" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="[-1,1]" /> },
        { letter: 'B', content: <Katex tex="[a-b,\ a+b]" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="[a-1,\ a+1]" /> },
        { letter: 'D', content: <Katex tex="[a,\ a+b\pi]" /> },
        { letter: 'E', content: <Katex tex="[-b,\ b]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
