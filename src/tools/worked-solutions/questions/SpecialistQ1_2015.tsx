// 2015 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 84% correct.
// Parametrising a translated ellipse. Question text transcribed from the original paper;
// solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 1, B: 3, C: 6, D: 5, E: 84 },
  answer: 'E',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="\tfrac{x-2}{3}=\cos(t)" />, <Katex tex="\tfrac{y-3}{2}=\sin(t)" />, then
      eliminate <Katex tex="t" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{(x-2)^2}{9}+\frac{(y-3)^2}{4}=1" />,
    reason: <>Compare with <Katex tex="\cos^2(t)+\sin^2(t)=1" />, the identity every ellipse parametrisation is built on.</>,
  },
  {
    working: <Katex display tex="\left(\frac{x-2}{3}\right)^2+\left(\frac{y-3}{2}\right)^2=1" />,
    reason: <>The denominators are <Katex tex="3^2" /> and <Katex tex="2^2" />, so the semi-axes are <Katex tex="3" /> and <Katex tex="2" /> — not 9 and 4, which is what option C assumes.</>,
  },
  {
    working: <Katex display tex="\frac{x-2}{3}=\cos(t), \qquad \frac{y-3}{2}=\sin(t)" />,
    reason: <>Matching the two squared terms to <Katex tex="\cos^2" /> and <Katex tex="\sin^2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 2+3\cos(t),\quad y = 3+2\sin(t)}" />,
    reason: <>Matches option <b>E</b>. Option D has the centre and the axes swapped; option B parametrises a hyperbola, since <Katex tex="\sec^2-\tan^2=1" /> carries a minus sign.</>,
  },
]

export default function SpecialistQ1_2015() {
  return (
    <MCQShell
      question={
        <p>
          The ellipse <Katex tex="\dfrac{(x-2)^2}{9}+\dfrac{(y-3)^2}{4}=1" /> can be expressed
          in parametric form as
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x=2+3t \text{ and } y=3+2\sqrt{1+t^2}" /> },
        { letter: 'B', content: <Katex tex="x=2+3\sec(t) \text{ and } y=3+2\tan(t)" /> },
        { letter: 'C', content: <Katex tex="x=2+9\cos(t) \text{ and } y=3+4\sin(t)" /> },
        { letter: 'D', content: <Katex tex="x=3+2\cos(t) \text{ and } y=2+3\sin(t)" /> },
        { letter: 'E', content: <Katex tex="x=2+3\cos(t) \text{ and } y=3+2\sin(t)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
