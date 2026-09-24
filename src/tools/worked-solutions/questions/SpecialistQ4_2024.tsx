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
    reason: <>In the fourth quadrant <Katex tex="\cos(x)>0" />, so take the positive root.</>,
  },
  {
    working: <Katex display tex="\cos^2(x)+\sin^2(x)=1 \;\implies\; \cos(x) = \sqrt{1-a^2}" />,
    reason: <>Pythagorean identity.</>,
  },
  {
    working: <Katex display tex="\cos(x) = 2\cos^2\!\big(\tfrac{x}{2}\big)-1" />,
    reason: <>Double-angle (half-angle) identity for cosine.</>,
  },
  {
    working: <Katex display tex="\cos^2\!\big(\tfrac{x}{2}\big) = \frac{1+\sqrt{1-a^2}}{2}" />,
    reason: <>Rearrange, substituting the value of cos(x) found above.</>,
  },
  {
    working: <Katex display tex="\frac{x}{2}\in\big(\tfrac{3\pi}{4},\pi\big)" />,
    reason: <>Halve the original range for <Katex tex="x" /> — this places <Katex tex="x/2" /> in the second quadrant.</>,
  },
  {
    working: <>In the second quadrant, cosine is <b>negative</b>.</>,
    reason: <>So <Katex tex="\cos(x/2)" /> must take the <b>negative</b> square root. Option <b>C</b>, chosen by 38%, is the positive root.</>,
  },
  {
    working: <Katex display tex="\boxed{\cos\!\big(\tfrac{x}{2}\big) = -\sqrt{\frac{1+\sqrt{1-a^2}}{2}} = -\frac{\sqrt{1+\sqrt{1-a^2}}}{\sqrt2}}" />,
    reason: <>Matches option <b>A</b>.</>,
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
