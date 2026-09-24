// 2024 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 70% correct.
// No turning points: a negative discriminant, plus the two cancelling cases. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 11, C: 70, D: 6 },
  answer: 'C',
  comment: (
    <>
      <Katex tex="\text{Use CAS to solve } f'(x)=0" />
      <br />
      <Katex tex="\Rightarrow x=h\pm\sqrt{h^2-3h-4}" />
      <br />
      <Katex tex="\text{No TP's if } h^2-3h-4<0" />
      <br />
      <Katex tex="\Rightarrow -1<h<4" />
      <br />
      Solving <Katex tex="f'(x)=0" /> assuming no cancellation yields{' '}
      <Katex tex="x=h\pm\sqrt{h^2-3h-4}" />. For no turning points we require{' '}
      <Katex tex="h^2-3h-4=(h-4)(h+1)<0" /> so <Katex tex="-1<h<4" />. If{' '}
      <Katex tex="h=-1" /> or 4 then <Katex tex="f(x)" /> cancels to a linear function which
      also has no turning points.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{x-h}{x^2-3x-4}" />,
    reason: <>Expanding the denominator makes the quotient rule tidier.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{\left(x^2-3x-4\right)-(x-h)(2x-3)}{\left(x^2-3x-4\right)^2}" />,
    reason: <>Quotient rule. Only the numerator can vanish.</>,
  },
  {
    working: <Katex display tex="\text{numerator} = -x^2+2hx-3h-4 = 0 \iff x^2-2hx+(3h+4) = 0" />,
    reason: <>Multiplying through by −1 to get a monic quadratic.</>,
  },
  {
    working: <Katex display tex="\Delta = 4h^2-4(3h+4) = 4\left(h^2-3h-4\right) = 4(h-4)(h+1)" />,
    reason: <>No turning points needs no real solutions, so a negative discriminant.</>,
  },
  {
    working: <Katex display tex="\Delta<0 \iff -1<h<4" />,
    reason: <>An upward parabola in <Katex tex="h" />, negative strictly between its roots.</>,
  },
  {
    working: <Katex display tex="h=-1: \ f(x)=\frac{x+1}{(x+1)(x-4)}=\frac{1}{x-4}; \qquad h=4: \ f(x)=\frac{1}{x+1}" />,
    reason: <>The endpoints are special: the numerator cancels a factor, leaving a hyperbola with no turning points either. So both belong in the answer. (The report calls this "a linear function"; strictly it is the reciprocal of one.)</>,
  },
  {
    working: <Katex display tex="\boxed{-1 \le h \le 4}" />,
    reason: <>Matches option <b>C</b>. Options <b>B</b> and <b>D</b> have endpoints <Katex tex="-4" /> and 1 instead, which is what the discriminant gives with the sign of the <Katex tex="3h" /> term flipped: <Katex tex="h^2+3h-4=(h+4)(h-1)" />.</>,
  },
]

export default function SpecialistQ3_2024() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="f(x)=\dfrac{x-h}{(x+1)(x-4)}" />, where{' '}
          <Katex tex="h\in R" />, will have no turning points when
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="h<-1 \text{ and } h>4" /> },
        { letter: 'B', content: <Katex tex="-4<h<1" /> },
        { letter: 'C', content: <Katex tex="-1\le h\le 4" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="-4\le h\le 1" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
