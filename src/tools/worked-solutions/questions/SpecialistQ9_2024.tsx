// 2024 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 45% correct. This
// year's paper used four options (A–D) rather than five. Arc length of a cycloid. Question
// text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 45, B: 11, C: 29, D: 14 },
  answer: 'A',
  comment: (
    <>
      <Katex tex="l=\displaystyle\int_0^{2\pi}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />
      <br />
      <Katex tex="=\displaystyle\int_0^{2\pi}\sqrt{(\sin(t))^2+(1-\cos(t))^2}\,dt" />
      <br />
      <Katex tex="=\displaystyle\int_0^{2\pi}\sqrt{(\sin^2(t)+1-2\cos(t)+\cos^2(t))}\,dt" />
      <br />
      <Katex tex="=\displaystyle\int_0^{2\pi}\sqrt{2-2\cos(t)}\,dt" />
      <br />
      But <Katex tex="\sin^2(ax)=\dfrac{1}{2}(1-\cos(2ax))" />
      <br />
      <Katex tex="=\displaystyle\int_0^{2\pi}\sqrt{2\left(2\sin^2\left(\frac{t}{2}\right)\right)}\,dt" />
      <br />
      <Katex tex="=\displaystyle\int_0^{2\pi}2\sin\left(\frac{t}{2}\right)dt" />
      <br />
      Since <Katex tex="\sin\left(\dfrac{t}{2}\right)>0" /> for <Katex tex="0\le t\le2\pi" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="L = \int_0^{2\pi}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: <>Arc length of a parametric curve: integrate <Katex tex="\sqrt{(x')^2+(y')^2}" /> over the given interval of <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dt} = \sin(t) \qquad \frac{dy}{dt} = 1-\cos(t)" />,
    reason: <>Differentiate <Katex tex="x=1-\cos(t)" /> and <Katex tex="y=t-\sin(t)" />.</>,
    more: <>It is the derivatives that get squared, not <Katex tex="x" /> and <Katex tex="y" /> themselves. Option <b>B</b> puts <Katex tex="x" /> and <Katex tex="y" /> straight into the formula.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2 \\ &= \sin^2(t)+1-2\cos(t)+\cos^2(t) \\ &= 2-2\cos(t) \end{aligned}" />,
    reason: <>Expand <Katex tex="\big(1-\cos(t)\big)^2" /> and use <Katex tex="\sin^2(t)+\cos^2(t)=1" />.</>,
  },
  {
    working: <Katex display tex="2-2\cos(t) = 2\big(1-\cos(t)\big) = 4\sin^2\!\big(\tfrac{t}{2}\big)" />,
    reason: <>To remove the square root, write <Katex tex="1-\cos(t)" /> as a perfect square: <Katex tex="\cos(t)=1-2\sin^2(t/2)" />, so <Katex tex="1-\cos(t)=2\sin^2(t/2)" />.</>,
    more: <>The report writes this identity as <Katex tex="\sin^2(ax)=\tfrac12\big(1-\cos(2ax)\big)" /> with <Katex tex="a=\tfrac12" />. The other version of the double-angle formula, <Katex tex="\cos(t)=2\cos^2(t/2)-1" />, gives <Katex tex="1+\cos(t)=2\cos^2(t/2)" />, which has a plus sign and does not apply here; using it by mistake leads to the <Katex tex="\cos(t/2)" /> of option <b>D</b>. The <Katex tex="\sin(t/2)" /> in option <b>A</b> is also a hint to use this identity.</>,
  },
  {
    working: <Katex display tex="\sqrt{4\sin^2(t/2)} = 2\sin\!\big(\tfrac{t}{2}\big)" />,
    reason: <>Since <Katex tex="t\in[0,2\pi] \implies t/2\in[0,\pi]" />, <Katex tex="\sin(t/2)\geq0" /> throughout, so no absolute value is needed.</>,
  },
  {
    working: <Katex display tex="\boxed{L = \int_0^{2\pi} 2\sin\!\big(\tfrac{t}{2}\big)\,dt}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>The distractors: <b>B</b> is the derivative slip explained above. <b>C</b>, the most common wrong answer (29%), is <Katex tex="\int_0^{2\pi}\big(2-2\cos(t)\big)\,dt" />: the square root has been dropped. <b>D</b> has <Katex tex="\cos(t/2)" /> in place of <Katex tex="\sin(t/2)" />, and it integrates to 0, which is impossible for a length. A CAS check: option A evaluates to 8, while C gives <Katex tex="4\pi\approx12.57" />.</>,
  },
]

export default function SpecialistQ9_2024() {
  return (
    <MCQShell
      question={
        <p>
          The length of the curve specified by <Katex tex="x=1-\cos(t)" /> and <Katex tex="y=t-\sin(t)" />, where{' '}
          <Katex tex="t\in[0,2\pi]" />, is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_0^{2\pi} 2\sin\!\big(\tfrac{t}{2}\big)\,dt" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\displaystyle\int_0^{2\pi} \sqrt{\big(1-\cos(t)\big)^2+\big(t-\sin(t)\big)^2}\,dt" /> },
        { letter: 'C', content: <Katex tex="2\displaystyle\int_0^{2\pi} \big(1-\cos(t)\big)\,dt" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int_0^{2\pi} 2\cos\!\big(\tfrac{t}{2}\big)\,dt" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
