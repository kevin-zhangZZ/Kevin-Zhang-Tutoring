// 2021 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 31% correct. Finding
// sin(x) + cos(y) given cos(x) and sin²(y), with both angles restricted to the fourth
// quadrant. Question text transcribed from the original paper. Solution is original.
// Widget: interactives/meth-2021-mcq16-quadrant.tsx (drag P and Q around the unit circle).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const QuadrantWidget = lazyWidget(() => import('../interactives/meth-2021-mcq16-quadrant'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 31, B: 11, C: 32, D: 9, E: 15 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\cos(x)=\tfrac35,\ \sin^2(y)=\tfrac{25}{169}" />
      <br />
      <Katex tex="\sin(y)=-\tfrac{5}{13},\ \cos(y)=\tfrac{12}{13}" />
      <br />
      <Katex tex="\cos(x)=\tfrac35,\ \sin(x)=-\tfrac45" />
      <br />
      <Katex tex="\sin(x)+\cos(y)=-\tfrac45+\tfrac{12}{13}=\tfrac{8}{65}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x,y \in \left[\tfrac{3\pi}{2},2\pi\right] \;\implies\; \text{fourth quadrant}" />,
    reason: <>Angles from <Katex tex="\tfrac{3\pi}{2}" /> to <Katex tex="2\pi" /> are the last quarter-turn of the unit circle. On the unit circle cosine is the horizontal coordinate and sine the vertical one, and a fourth-quadrant point is right of and below the centre. So for both angles, cosine is positive and sine is negative.</>,
  },
  {
    working: <Katex display tex="\sin^2(x) = 1-\cos^2(x) = 1-\tfrac{9}{25} = \tfrac{16}{25}" />,
    reason: <>Pythagorean identity <Katex tex="\sin^2(x)+\cos^2(x)=1" />.</>,
  },
  {
    working: <Katex display tex="\sin(x) = \pm\tfrac45 \;\implies\; \sin(x) = -\tfrac45" />,
    reason: <>A square root gives two values, and the identity can't tell them apart: the quadrant decides. <Katex tex="x" /> is in the fourth quadrant, where sine is negative, so reject <Katex tex="+\tfrac45" />.</>,
  },
  {
    working: <Katex display tex="\cos^2(y) = 1-\sin^2(y) = 1-\tfrac{25}{169} = \tfrac{144}{169}" />,
    reason: <>The same identity for <Katex tex="y" />. Only <Katex tex="\sin^2(y)" /> is needed, so the sign of <Katex tex="\sin(y)" /> (which is <Katex tex="-\tfrac{5}{13}" />) never matters here.</>,
  },
  {
    working: <Katex display tex="\cos(y) = \pm\tfrac{12}{13} \;\implies\; \cos(y) = \tfrac{12}{13}" />,
    reason: <>Cosine is positive in the fourth quadrant, so reject <Katex tex="-\tfrac{12}{13}" />.</>,
  },
  {
    working: <Katex display tex="\sin(x)+\cos(y) = -\frac45+\frac{12}{13}" />,
    reason: <>Combine the two values found.</>,
  },
  {
    working: <Katex display tex="= \frac{-4(13)+12(5)}{65} = \frac{-52+60}{65}" />,
    reason: <>Common denominator <Katex tex="65 = 5\times13" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{8}{65}}" />,
    reason: <>Matches option <b>A</b>. Wrong sign choices give three of the other options:keeping <Katex tex="\sin(x)=+\tfrac45" /> gives C, <Katex tex="\tfrac45+\tfrac{12}{13}=\tfrac{112}{65}" />; taking <Katex tex="\cos(y)=-\tfrac{12}{13}" /> gives B, <Katex tex="-\tfrac{112}{65}" />; both signs wrong gives D, <Katex tex="-\tfrac{8}{65}" />.</>,
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
      extras={
        <Explore title="Only the points on the fourth-quadrant arc are allowed, so sin(x) is negative and cos(y) positive">
          <QuadrantWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
