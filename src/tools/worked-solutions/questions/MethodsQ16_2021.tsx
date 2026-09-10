// 2021 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 31% correct. Finding
// sin(x) + cos(y) given cos(x) and sin²(y), with both angles restricted to the fourth
// quadrant. Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 31, B: 11, C: 32, D: 9, E: 15 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\cos(x)=\tfrac35,\ \sin^2(y)=\tfrac{25}{169} \;\implies\; \sin(y)=-\tfrac{5}{13},\ \cos(y)=\tfrac{12}{13},\ \sin(x)=-\tfrac45" />
      <br />
      <Katex tex="\sin(x)+\cos(y) = -\tfrac45+\tfrac{12}{13} = \tfrac{8}{65}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x,y \in \left[\tfrac{3\pi}{2},2\pi\right] \;\implies\; \text{fourth quadrant}" />,
    reason: <>In the fourth quadrant, cosine is positive and sine is negative for both angles.</>,
  },
  {
    working: <Katex display tex="\cos(x)=\tfrac35 \;\implies\; \sin(x) = -\sqrt{1-\tfrac{9}{25}} = -\sqrt{\tfrac{16}{25}} = -\tfrac45" />,
    reason: <>Pythagorean identity, taking the negative root since <Katex tex="x" /> is in the fourth quadrant.</>,
  },
  {
    working: <Katex display tex="\sin^2(y) = \tfrac{25}{169} \;\implies\; \sin(y) = -\sqrt{\tfrac{25}{169}} = -\tfrac{5}{13}" />,
    reason: <>Again the negative root, since <Katex tex="y" /> is in the fourth quadrant.</>,
  },
  {
    working: <Katex display tex="\cos(y) = \sqrt{1-\tfrac{25}{169}} = \sqrt{\tfrac{144}{169}} = \tfrac{12}{13}" />,
    reason: <>Positive root, since <Katex tex="\cos(y)>0" /> in the fourth quadrant.</>,
  },
  {
    working: <Katex display tex="\sin(x)+\cos(y) = -\frac45+\frac{12}{13}" />,
    reason: 'Combine the two values found.',
  },
  {
    working: <Katex display tex="= \frac{-4(13)+12(5)}{65} = \frac{-52+60}{65}" />,
    reason: <>Common denominator <Katex tex="65 = 5\times13" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{8}{65}}" />,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function MethodsQ16_2021() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="\cos(x)=\tfrac35" /> and <Katex tex="\sin^2(y)=\tfrac{25}{169}" />, where{' '}
          <Katex tex="x\in\left[\tfrac{3\pi}{2},2\pi\right]" /> and <Katex tex="y\in\left[\tfrac{3\pi}{2},2\pi\right]" />.
          <br />
          The value of <Katex tex="\sin(x)+\cos(y)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{8}{65}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="-\tfrac{112}{65}" /> },
        { letter: 'C', content: <Katex tex="\tfrac{112}{65}" /> },
        { letter: 'D', content: <Katex tex="-\tfrac{8}{65}" /> },
        { letter: 'E', content: <Katex tex="\tfrac{64}{65}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
