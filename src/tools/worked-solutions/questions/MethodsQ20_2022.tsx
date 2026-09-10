// 2022 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 30% correct — the
// hardest MCQ on this paper. Probability a projectile clears a horizontal distance, given a
// normally distributed launch angle. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 30, B: 24, C: 25, D: 13, E: 8 },
  answer: 'A',
  noAnswer: 1,
  comment: <>Solve <Katex tex="d(\theta)\geq40" /> for <Katex tex="\theta" /> or sketch the graphs: <Katex tex="26.565^\circ\leq\theta\leq63.434^\circ" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\theta \sim N(42,8^2)" />,
    reason: 'The launch angle, in degrees.',
  },
  {
    working: <Katex display tex="50\sin(2\theta) > 40 \;\iff\; \sin(2\theta) > 0.8" />,
    reason: 'Translate the distance condition into a condition on θ.',
  },
  {
    working: <Katex display tex="2\theta \in \big(\sin^{-1}(0.8),\ 180^\circ-\sin^{-1}(0.8)\big) = (53.13^\circ,\ 126.87^\circ)" />,
    reason: <>Solve <Katex tex="\sin(2\theta)>0.8" /> for the relevant range near the given mean.</>,
  },
  {
    working: <Katex display tex="\theta \in (26.565^\circ,\ 63.434^\circ)" />,
    reason: 'Halve throughout.',
  },
  {
    working: <Katex display tex="\Pr(26.565<\theta<63.434) = \Pr\!\left(\frac{26.565-42}{8}<Z<\frac{63.434-42}{8}\right)" />,
    reason: 'Standardise using the given mean and standard deviation.',
  },
  {
    working: <Katex display tex="= \Pr(-1.929<Z<2.679)" />,
    reason: 'Evaluate the z-scores.',
  },
  {
    working: <Katex display tex="\boxed{\approx 0.969}" />,
    reason: <>Evaluate on CAS — matches option <b>A</b>. (Solutions from an extra period, e.g. θ near 206°, are so many standard deviations from the mean that they contribute negligibly.)</>,
  },
]

export default function MethodsQ20_2022() {
  return (
    <MCQShell
      question={
        <p>
          A soccer player kicks a ball with an angle of elevation of <Katex tex="\theta^\circ" />, where{' '}
          <Katex tex="\theta" /> is a normally distributed random variable with a mean of{' '}
          <Katex tex="42^\circ" /> and a standard deviation of <Katex tex="8^\circ" />.
          <br />
          The horizontal distance that the ball travels before landing is given by the function{' '}
          <Katex tex="d=50\sin(2\theta)" />.
          <br />
          The probability that the ball travels more than 40 m horizontally before landing is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.969" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="0.937" /> },
        { letter: 'C', content: <Katex tex="0.226" /> },
        { letter: 'D', content: <Katex tex="0.149" /> },
        { letter: 'E', content: <Katex tex="0.027" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
