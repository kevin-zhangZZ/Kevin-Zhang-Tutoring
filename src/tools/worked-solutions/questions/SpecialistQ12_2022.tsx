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
    reason: 'The only condition available, and it turns the question into trigonometry.',
  },
  {
    working: <Katex display tex="\bigl(-\operatorname{cosec}(x)\bigr)\bigl(\cos(x)\bigr)+\sqrt3\cdot1 = 0" />,
    reason: 'Matching components and adding.',
  },
  {
    working: <Katex display tex="-\frac{\cos(x)}{\sin(x)}+\sqrt3 = 0 \implies \cot(x) = \sqrt3" />,
    reason: <><Katex tex="\operatorname{cosec}(x)=\tfrac{1}{\sin(x)}" />, so the product is exactly <Katex tex="\cot(x)" />.</>,
  },
  {
    working: <Katex display tex="\tan(x) = \frac{1}{\sqrt3}" />,
    reason: <>Easier to solve in this form. Note <Katex tex="\sin(x)\ne0" /> automatically, since <Katex tex="\operatorname{cosec}(x)" /> would be undefined.</>,
  },
  {
    working: <Katex display tex="x = \frac\pi6 \ \text{ or } \ x = \frac\pi6+\pi = \frac{7\pi}{6}" />,
    reason: <>Tangent has period <Katex tex="\pi" />, so solutions come a half-turn apart, both in the quadrants where it is positive (1st and 3rd).</>,
  },
  {
    working: <Katex display tex="\boxed{x = \frac\pi6 \ \text{ and } \ \frac{7\pi}{6}}" />,
    reason: <>Option <b>A</b>. Option <b>E</b> pairs <Katex tex="\tfrac\pi6" /> with <Katex tex="\tfrac{5\pi}{6}" />, which is where <Katex tex="\tan" /> is <em>negative</em>.</>,
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
          <Katex tex="\underset{\sim}{v}(x)=\cos(x)\underset{\sim}{i}+\underset{\sim}{j}" />. If{' '}
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
