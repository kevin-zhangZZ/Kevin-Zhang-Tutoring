// 2017 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 49% correct.
// When a parametric path is a circle rather than an ellipse. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 49, B: 21, C: 10, D: 11, E: 7 },
  answer: 'A',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x = 1-\sqrt a\sin(t), \qquad y = 1-\frac1b\cos(t)" />,
    reason: <>Reading off the components.</>,
  },
  {
    working: <Katex display tex="x-1 = -\sqrt a\sin(t), \qquad y-1 = -\frac1b\cos(t)" />,
    reason: <>Isolating the trigonometric terms, ready for the Pythagorean identity.</>,
  },
  {
    working: <Katex display tex="\frac{(x-1)^2}{a}+\frac{(y-1)^2}{\frac{1}{b^2}} = \sin^2 t+\cos^2 t = 1" />,
    reason: <>Squaring and adding. This is an ellipse centred at <Katex tex="(1,1)" /> with semi-axes <Katex tex="\sqrt a" /> and <Katex tex="\tfrac1b" />.</>,
  },
  {
    working: <Katex display tex="\text{circle} \iff \sqrt a = \frac1b" />,
    reason: <>A circle is the special case of an ellipse whose two semi-axes are equal. Both quantities are positive since <Katex tex="a,b\in R^+" />, so no sign case-work is needed.</>,
  },
  {
    working: <Katex display tex="\sqrt a\,b = 1 \implies ab^2 = 1" />,
    reason: <>Squaring both sides. Squaring <Katex tex="\sqrt a\,b=1" /> gives <Katex tex="ab^2" />, not <Katex tex="a^2b" /> — option B is what you get if the square root is attached to the wrong letter.</>,
  },
  {
    working: <Katex display tex="\boxed{ab^2 = 1}" />,
    reason: <>Option A. A quick test: <Katex tex="a=4" />, <Katex tex="b=\tfrac12" /> gives <Katex tex="ab^2=1" />, and then <Katex tex="\sqrt a=2=\tfrac1b" /> — a circle of radius <Katex tex="2" /> centred at <Katex tex="(1,1)" /> ✓.</>,
  },
]

export default function SpecialistQ12_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let{' '}
            <Katex tex="\underset{\sim}{r}(t)=\bigl(1-\sqrt a\sin(t)\bigr)\underset{\sim}{i}+\left(1-\tfrac1b\cos(t)\right)\underset{\sim}{j}" />{' '}
            for <Katex tex="t\ge0" /> and <Katex tex="a,b\in R^+" /> be the path of a
            particle moving in the cartesian plane.
          </p>
          <p>The path of the particle will always be a circle if</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="ab^2=1" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="a^2b=1" /> },
        { letter: 'C', content: <Katex tex="ab^2\ne1" /> },
        { letter: 'D', content: <Katex tex="ab=1" /> },
        { letter: 'E', content: <Katex tex="a^2b\ne1" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
