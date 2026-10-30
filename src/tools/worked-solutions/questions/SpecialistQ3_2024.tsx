// 2024 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 70% correct.
// No turning points: a negative discriminant, plus the two cancelling cases. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
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
    reason: <>Turning points occur where <Katex tex="f'(x)=0" />, so differentiate. Expanding the denominator makes the quotient rule tidier.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{\left(x^2-3x-4\right)-(x-h)(2x-3)}{\left(x^2-3x-4\right)^2}" />,
    reason: <>Quotient rule. A fraction is 0 only when its numerator is 0, so only the numerator matters.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&\left(x^2-3x-4\right)-\left(2x^2-3x-2hx+3h\right)\\ =\ &-x^2+2hx-3h-4 = 0\\ \iff\ &x^2-2hx+(3h+4) = 0\end{aligned}"
      />
    ),
    reason: <>Expand and collect the numerator of <Katex tex="f'(x)" />, set it to 0, then multiply through by −1 to get a monic quadratic in <Katex tex="x" />.</>,
    more: <>On CAS, <Cas fn="solve">solve(d/dx(f(x))=0, x)</Cas> gives <Katex tex="x=h\pm\sqrt{h^2-3h-4}" />, as in the report: there are no turning points when the expression under the square root is negative, which is the same condition as the next row.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Delta &= 4h^2-4(3h+4)\\ &= 4\left(h^2-3h-4\right)\\ &= 4(h-4)(h+1)\end{aligned}" />,
    reason: <>No turning points needs this quadratic to have no real solutions, so a negative discriminant.</>,
  },
  {
    working: <Katex display tex="\Delta<0 \iff -1<h<4" />,
    reason: <>An upward parabola in <Katex tex="h" />, negative strictly between its roots.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}h=-1:\ f(x)&=\frac{x+1}{(x+1)(x-4)}\\ &=\frac{1}{x-4}\\[6pt] h=4:\ f(x)&=\frac{x-4}{(x+1)(x-4)}\\ &=\frac{1}{x+1}\end{aligned}"
      />
    ),
    reason: <>The endpoints need their own check: at <Katex tex="h=-1" /> or <Katex tex="h=4" /> the numerator cancels a denominator factor, leaving a hyperbola with no turning points. So both are included.</>,
    more: <>Why these two values are special: at <Katex tex="\Delta=0" /> the repeated solution is <Katex tex="x=h" />, which is <Katex tex="x=-1" /> or <Katex tex="x=4" />, both outside the domain of <Katex tex="f" />. So there is no stationary point there either. The report says <Katex tex="f(x)" /> "cancels to a linear function"; strictly it is the reciprocal of a linear function, but either way it has no turning points.</>,
  },
  {
    working: <Katex display tex="\boxed{-1 \le h \le 4}" />,
    reason: <>Matches option <b>C</b>: the open interval from the discriminant, plus both endpoints.</>,
    more: <>
      <b>A</b> (13%) describes where <Katex tex="\Delta>0" />, i.e. where there <em>are</em> two turning points; and as written ("<Katex tex="h<-1" /> and <Katex tex="h>4" />") no value of <Katex tex="h" /> satisfies it at all. <b>B</b> and <b>D</b> have endpoints <Katex tex="-4" /> and 1, which is what the discriminant gives with the sign of the <Katex tex="3h" /> term flipped: <Katex tex="h^2+3h-4=(h+4)(h-1)" />. <b>B</b> (11%) is also an open interval, so it makes the other error as well: leaving out the endpoints where the numerator cancels.
    </>,
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
