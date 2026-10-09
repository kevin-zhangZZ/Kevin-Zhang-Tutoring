// 2022 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 69% correct.
// A dot product that collapses to a single cotangent equation. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 69, B: 7, C: 12, D: 5, E: 6 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{u}\cdot\underset{\sim}{v} = 0 \ \text{ for perpendicular vectors}" />,
    reason: <>Perpendicular vectors have a dot product of zero, and this turns the question into a trigonometric equation.</>,
  },
  {
    working: <Katex display tex="\bigl(-\operatorname{cosec}(x)\bigr)\bigl(\cos(x)\bigr)+\sqrt3\cdot1 = 0" />,
    reason: <>Multiply the <Katex tex="\underset{\sim}{i}" /> components, multiply the <Katex tex="\underset{\sim}{j}" /> components, and add.</>,
  },
  {
    working: <Katex display tex="-\frac{\cos(x)}{\sin(x)}+\sqrt3 = 0 \implies \cot(x) = \sqrt3" />,
    reason: <>Since <Katex tex="\operatorname{cosec}(x)=\tfrac{1}{\sin(x)}" />, the product <Katex tex="\operatorname{cosec}(x)\cos(x)" /> is <Katex tex="\tfrac{\cos(x)}{\sin(x)}=\cot(x)" />.</>,
    more: <>This needs <Katex tex="\sin(x)\ne0" />, otherwise <Katex tex="\operatorname{cosec}(x)" /> is undefined. None of the solutions found below has <Katex tex="\sin(x)=0" />, so none has to be excluded.</>,
  },
  {
    working: <Katex display tex="\tan(x) = \frac{1}{\sqrt3}" />,
    reason: <>Taking the reciprocal of both sides, since <Katex tex="\tan(x)=\tfrac{1}{\cot(x)}" />. The exact values you know are for <Katex tex="\tan" />, so this form is easier to solve.</>,
  },
  {
    working: <Katex display tex="x = \frac\pi6 + k\pi, \ k\in Z" />,
    reason: <><Katex tex="\tan\bigl(\tfrac\pi6\bigr)=\tfrac{1}{\sqrt3}" />, and <Katex tex="\tan" /> has period <Katex tex="\pi" />, so the solutions are <Katex tex="\pi" /> apart, in the 1st and 3rd quadrants where <Katex tex="\tan" /> is positive.</>,
    more: <>No domain is given, so every value in this list is a possible value of <Katex tex="x" />. Each option lists two values, so the answer is the option whose two values are <em>both</em> in this list.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \frac\pi6 \ \text{ and } \ \frac{7\pi}{6}}" />,
    reason: <>Matches option <b>A</b> (<Katex tex="k=0" /> and <Katex tex="k=1" />).</>,
    more: <>Option <b>C</b> solves <Katex tex="\cot(x)=-\sqrt3" />, which is what you get if the minus sign on <Katex tex="\operatorname{cosec}(x)" /> is dropped. Option <b>B</b> solves <Katex tex="\tan(x)=\sqrt3" />, which mixes up <Katex tex="\cot" /> and <Katex tex="\tan" />. Option <b>D</b> solves <Katex tex="\tan(x)=-\sqrt3" />, which makes both slips. Option <b>E</b> pairs <Katex tex="\tfrac\pi6" /> with <Katex tex="\tfrac{5\pi}{6}" />, the second solution you would use for <Katex tex="\sin" />, but <Katex tex="\tan" /> is <em>negative</em> at <Katex tex="\tfrac{5\pi}{6}" />.</>,
  },
]

export default function SpecialistQ12_2022() {
  return (
    <MCQShell
      question={
        <p>
          Consider the vectors{' '}
          <Katex tex="\underset{\sim}{u}(x)=-\operatorname{cosec}(x)\underset{\sim}{i}+\sqrt3\,\underset{\sim}{j}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{v}(x)=\cos(x)\underset{\sim}{i}+\underset{\sim}{j}" />.
          <br />
          If{' '}
          <Katex tex="\underset{\sim}{u}(x)" /> is perpendicular to{' '}
          <Katex tex="\underset{\sim}{v}(x)" />, then possible values for <Katex tex="x" /> are
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac\pi6 \text{ and } \frac{7\pi}{6}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\frac\pi3 \text{ and } \frac{4\pi}{3}" /> },
        { letter: 'C', content: <Katex tex="\frac{5\pi}{6} \text{ and } \frac{11\pi}{6}" /> },
        { letter: 'D', content: <Katex tex="\frac{2\pi}{3} \text{ and } \frac{5\pi}{3}" /> },
        { letter: 'E', content: <Katex tex="\frac\pi6 \text{ and } \frac{5\pi}{6}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
