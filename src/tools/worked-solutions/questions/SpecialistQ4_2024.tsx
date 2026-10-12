// 2024 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 27% correct. This
// year's paper used four options (A–D) rather than five. Half-angle identity for cos(x/2)
// given sin(x) and the quadrant of x. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 27, B: 23, C: 38, D: 10 },
  answer: 'A',
  comment: (
    <>
      <Katex tex="\cos^2(x)+\sin^2(x)=1" />
      <br />
      <Katex tex="\Rightarrow \cos(x)=\sqrt{1-a^2}" />
      <br />
      <Katex tex="\cos(x)=2\cos^2\left(\dfrac{x}{2}\right)-1" />
      <br />
      <Katex tex="\sqrt{1-a^2}=2\cos^2\left(\dfrac{x}{2}\right)-1" />
      <br />
      <Katex tex="\cos\left(\dfrac{x}{2}\right)=\pm\sqrt{\dfrac{\sqrt{1-a^2}+1}{2}}" />
      <br />
      <Katex tex="x\in\left(\dfrac{3\pi}{2},2\pi\right)\ \therefore \dfrac{x}{2}\in\left(\dfrac{3\pi}{4},\pi\right)\ \therefore \cos\left(\dfrac{x}{2}\right)<0\ \therefore \text{take negative root}" />
      <br />
      Take positive root since <Katex tex="x\in\left(\dfrac{3\pi}{2},2\pi\right)" /> so{' '}
      <Katex tex="\cos x>0" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\sin(x)=a,\quad x\in\big(\tfrac{3\pi}{2},2\pi\big)\ \text{(fourth quadrant)}" />,
    reason: (
      <>
        Note the quadrant first: the answer needs two sign decisions, one for <Katex tex="\cos(x)" /> and one for{' '}
        <Katex tex="\cos\!\big(\tfrac{x}{2}\big)" />.
      </>
    ),
    more: (
      <>
        In the fourth quadrant sine is negative, so <Katex tex="-1<a<0" />. That fact is what makes options B and D
        impossible (see the last row).
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\cos^2(x)&=1-\sin^2(x)\\ &=1-a^2\\ \cos(x)&=\sqrt{1-a^2}\end{aligned}"
      />
    ),
    reason: (
      <>
        Pythagorean identity. Take the <b>positive</b> root, because cosine is positive in the fourth quadrant.
      </>
    ),
  },
  {
    working: <Katex display tex="\cos(x) = 2\cos^2\!\big(\tfrac{x}{2}\big)-1" />,
    reason: (
      <>
        Double-angle identity <Katex tex="\cos(2\theta)=2\cos^2(\theta)-1" /> with <Katex tex="\theta=\tfrac{x}{2}" />: it
        links the <Katex tex="\cos(x)" /> we know to the <Katex tex="\cos\!\big(\tfrac{x}{2}\big)" /> we want.
      </>
    ),
    more: (
      <>
        The other forms, <Katex tex="1-2\sin^2(\theta)" /> and <Katex tex="\cos^2(\theta)-\sin^2(\theta)" />, would bring in{' '}
        <Katex tex="\sin\!\big(\tfrac{x}{2}\big)" />, which isn&apos;t asked for. Pick the version that contains only the
        function you are solving for.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\sqrt{1-a^2}&=2\cos^2\!\big(\tfrac{x}{2}\big)-1\\ \cos^2\!\big(\tfrac{x}{2}\big)&=\frac{1+\sqrt{1-a^2}}{2}\\ \cos\!\big(\tfrac{x}{2}\big)&=\pm\frac{\sqrt{1+\sqrt{1-a^2}}}{\sqrt2}\end{aligned}"
      />
    ),
    reason: (
      <>
        Substitute <Katex tex="\cos(x)=\sqrt{1-a^2}" />, solve for <Katex tex="\cos^2\!\big(\tfrac{x}{2}\big)" />, then
        square-root, writing the denominator as <Katex tex="\sqrt2" /> as the options do. Keep both signs for now.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{x}{2}\in\big(\tfrac{3\pi}{4},\pi\big)" />,
    reason: (
      <>
        Halve the given interval for <Katex tex="x" />. This places <Katex tex="\tfrac{x}{2}" /> in the second
        quadrant.
      </>
    ),
  },
  {
    working: <>In the second quadrant, cosine is <b>negative</b>.</>,
    reason: (
      <>
        So <Katex tex="\cos\!\big(\tfrac{x}{2}\big)" /> takes the <b>negative</b> square root. Its sign depends on where{' '}
        <Katex tex="\tfrac{x}{2}" /> lies, not where <Katex tex="x" /> lies.
      </>
    ),
    more: (
      <>
        This is the trap. The fourth quadrant made <Katex tex="\cos(x)" /> positive two rows ago, and it is tempting to
        carry that positive sign through. But halving the angle moves it to a different quadrant, so the sign has to be
        decided again. The report&apos;s solution makes both decisions: positive root for <Katex tex="\cos(x)" />, negative
        root for <Katex tex="\cos\!\big(\tfrac{x}{2}\big)" />. Its last line, &ldquo;Take positive root
        since &hellip; <Katex tex="\cos x>0" />&rdquo;, explains the earlier step <Katex tex="\cos(x)=\sqrt{1-a^2}" />, not
        the final sign.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{\cos\!\big(\tfrac{x}{2}\big)=-\frac{\sqrt{1+\sqrt{1-a^2}}}{\sqrt2}}"
      />
    ),
    reason: <>Matches option <b>A</b>.</>,
    more: (
      <>
        Option <b>C</b> (38%, the most common answer) is the positive root: the sign of <Katex tex="\cos(x)" /> was used
        for <Katex tex="\cos\!\big(\tfrac{x}{2}\big)" />. Options <b>B</b> and <b>D</b> aren&apos;t even real numbers here:
        since <Katex tex="-1<a<0" />, <Katex tex="a^2-1<0" /> (so B&apos;s inner root fails), and{' '}
        <Katex tex="0<\sqrt{1-a^2}<1" /> makes <Katex tex="\sqrt{1-a^2}-1<0" /> (so D&apos;s outer root fails). Check with{' '}
        <Katex tex="x=\tfrac{7\pi}{4}" />: <Katex tex="a=-\tfrac{1}{\sqrt2}" />, and A gives{' '}
        <Katex tex="-0.924" />, the same as <Katex tex="\cos\!\big(\tfrac{7\pi}{8}\big)\approx-0.924" />.
      </>
    ),
  },
]

export default function SpecialistQ4_2024() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="\sin(x)=a" />, where <Katex tex="x\in\big(\tfrac{3\pi}{2},2\pi\big)" />, then{' '}
          <Katex tex="\cos\!\big(\tfrac{x}{2}\big)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\dfrac{\sqrt{1+\sqrt{1-a^2}}}{\sqrt2}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\dfrac{\sqrt{1-\sqrt{a^2-1}}}{\sqrt2}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{\sqrt{1+\sqrt{1-a^2}}}{\sqrt2}" /> },
        { letter: 'D', content: <Katex tex="-\dfrac{\sqrt{\sqrt{1-a^2}-1}}{\sqrt2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
