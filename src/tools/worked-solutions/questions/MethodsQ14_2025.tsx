// 2025 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 66% correct.
// A two-branch density whose total area fixes the constant. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 66, C: 17, D: 5 },
  answer: 'B',
  comment: (
    <>
      Solve <Katex tex="\displaystyle\int_{-\infty}^{\infty}f(x)\,dx=1" /> for <Katex tex="k" />.
      <br />
      <Katex tex="k=\dfrac{\sqrt{2}+2}{2}=\dfrac{1}{2-\sqrt{2}}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^{\pi/4}k\sin(x)\,dx+\int_{\pi/4}^{\pi/2}k\cos(x)\,dx = 1" />,
    reason: <>The total area under a density is 1. Split the integral at <Katex tex="x=\tfrac{\pi}{4}" />, where the rule changes; the &ldquo;otherwise&rdquo; part adds 0.</>,
  },
  {
    working: <Katex display tex="k\bigl[-\cos(x)\bigr]_0^{\pi/4} = k\left(-\tfrac{\sqrt2}{2}+1\right)" />,
    reason: <>The first branch: an antiderivative of <Katex tex="\sin(x)" /> is <Katex tex="-\cos(x)" />, with <Katex tex="\cos\!\left(\tfrac{\pi}{4}\right)=\tfrac{\sqrt2}{2}" /> and <Katex tex="\cos(0)=1" />.</>,
  },
  {
    working: <Katex display tex="k\bigl[\sin(x)\bigr]_{\pi/4}^{\pi/2} = k\left(1-\tfrac{\sqrt2}{2}\right)" />,
    reason: <>The second branch: an antiderivative of <Katex tex="\cos(x)" /> is <Katex tex="\sin(x)" />, with <Katex tex="\sin\!\left(\tfrac{\pi}{2}\right)=1" /> and <Katex tex="\sin\!\left(\tfrac{\pi}{4}\right)=\tfrac{\sqrt2}{2}" />. Same value as the first branch.</>,
    more: <>The two values match because the pieces are mirror images about <Katex tex="x=\tfrac{\pi}{4}" />, since <Katex tex="\cos(x)=\sin\!\left(\tfrac{\pi}{2}-x\right)" />: reflecting <Katex tex="y=\sin(x)" /> on <Katex tex="\left[0,\tfrac{\pi}{4}\right]" /> in the line <Katex tex="x=\tfrac{\pi}{4}" /> gives <Katex tex="y=\cos(x)" /> on <Katex tex="\left[\tfrac{\pi}{4},\tfrac{\pi}{2}\right]" />. Spotting it means you could work out one integral and double it.</>,
  },
  {
    working: <Katex display tex="2k\left(1-\tfrac{\sqrt2}{2}\right) = k\left(2-\sqrt2\right) = 1" />,
    reason: <>Add the two equal pieces and simplify.</>,
    more: <>On CAS you can do it in one step: apply <Cas fn="solve" /> to the area equation, solving for <Katex tex="k" />. Expect the output in rationalised form, <Katex tex="k=\tfrac{\sqrt2}{2}+1" />, which matches none of the options as written until you rationalise <Katex tex="\tfrac{1}{2-\sqrt2}" /> too (next row).</>,
  },
  {
    working: <Katex display tex="\boxed{k = \frac{1}{2-\sqrt2}}" />,
    reason: <>Matches option <b>B</b> (about <Katex tex="1.71" />), the same as the report&apos;s rationalised form <Katex tex="\tfrac{\sqrt2+2}{2}" />.</>,
    more: <>
      Rationalising: <Katex tex="\dfrac{1}{2-\sqrt2}\times\dfrac{2+\sqrt2}{2+\sqrt2}=\dfrac{2+\sqrt2}{4-2}=\dfrac{2+\sqrt2}{2}" />.
      <br />• <b>C</b> (<Katex tex="\sqrt2+2" />, 17%) is double the answer. It is what you get from using only one branch, <Katex tex="k\left(1-\tfrac{\sqrt2}{2}\right)=1" />, or from forgetting to divide by <Katex tex="4-2=2" /> when rationalising.
      <br />• <b>D</b> (<Katex tex="2-\sqrt2" />) is the reciprocal: the area per unit of <Katex tex="k" />, not <Katex tex="k" /> itself. From <Katex tex="k(2-\sqrt2)=1" /> you still have to divide.
      <br />• <b>A</b> (<Katex tex="\tfrac{1}{\sqrt2}" />) fails the check: it makes the total area <Katex tex="\tfrac{2-\sqrt2}{\sqrt2}=\sqrt2-1\approx0.41" />, not 1.
    </>,
  },
]

export default function MethodsQ14_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            Let <Katex tex="f" /> be the probability density function for a continuous random
            variable <Katex tex="X" />, where
          </p>
          <Katex
            display
            tex="f(x)=\begin{cases}k\sin(x) & 0\le x<\dfrac{\pi}{4}\\[6pt] k\cos(x) & \dfrac{\pi}{4}\le x\le\dfrac{\pi}{2}\\[6pt] 0 & \text{otherwise}\end{cases}"
          />
          <p>
            and <Katex tex="k" /> is a positive real number.
            <br />
            The value of <Katex tex="k" /> is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac{1}{\sqrt2}" /> },
        { letter: 'B', content: <Katex tex="\frac{1}{2-\sqrt2}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\sqrt2+2" /> },
        { letter: 'D', content: <Katex tex="2-\sqrt2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
