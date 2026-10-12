// 2025 Specialist Mathematics — Exam 2, MCQ 18. VCAA examination report: 49% correct. This
// year's paper used four options (A–D) rather than five. Finding unknown constants from where
// two 3D lines intersect. Question text transcribed from the original paper. Solution is
// original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 23, C: 19, D: 49 },
  answer: 'D',
  comment: (
    <>
      Knowing the lines intersect at the point <Katex tex="(4,3,t)" /> allows simultaneous
      equations to be developed and solved.
      <br />
      <Katex tex="4=2+\lambda\ \Rightarrow\ \lambda=2" />
      <br />
      <Katex tex="3=r-\lambda\ \Rightarrow\ r=5" />
      <br />
      <Katex tex="t=-3+4\lambda\ \Rightarrow\ t=5" />
      <br />
      <Katex tex="4=1+\mu\ \Rightarrow\ \mu=3" />
      <br />
      <Katex tex="t=s-\mu\ \Rightarrow\ 5=s-3\ \Rightarrow\ s=8" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r_1}(\lambda) = (2+\lambda)\underset{\sim}{i} + (r-\lambda)\underset{\sim}{j} + (-3+4\lambda)\underset{\sim}{k}" />,
    reason: <>Expand <Katex tex="\underset{\sim}{r_1}(\lambda)=2\underset{\sim}{i}+r\underset{\sim}{j}-3\underset{\sim}{k}+\lambda(\underset{\sim}{i}-\underset{\sim}{j}+4\underset{\sim}{k})" /> component-wise, so each coordinate can be set equal to the point <Katex tex="(4,3,t)" />.</>,
  },
  {
    working: <Katex display tex="2+\lambda = 4 \;\implies\; \lambda=2" />,
    reason: <>Start with the <Katex tex="x" />-coordinate: it is the only equation with a single unknown.</>,
  },
  {
    working: <Katex display tex="r - \lambda = 3 \;\implies\; r = 3+2 = 5" />,
    reason: <>Match the <Katex tex="y" />-coordinate, using <Katex tex="\lambda=2" />.</>,
  },
  {
    working: <Katex display tex="t = -3+4\lambda = -3+8 = 5" />,
    reason: <>Match the <Katex tex="z" />-coordinate — the point's <Katex tex="z" />-coordinate is <Katex tex="t" /> itself.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r_2}(\mu) = (1+\mu)\underset{\sim}{i} + \mu\underset{\sim}{j} + (s-\mu)\underset{\sim}{k}" />,
    reason: <>Now expand <Katex tex="\underset{\sim}{r_2}(\mu)=\underset{\sim}{i}+s\underset{\sim}{k}+\mu(\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k})" />. There is no <Katex tex="\underset{\sim}{j}" /> term outside the bracket, so the <Katex tex="y" />-coordinate is just <Katex tex="\mu" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} 1+\mu = 4 \;&\implies\; \mu=3 \\ y=\mu=3 \;&\checkmark \end{aligned}" />,
    reason: <>Match the <Katex tex="x" />-coordinate, then confirm consistency against <Katex tex="y=3" />.</>,
    more: (
      <>
        The <Katex tex="y" />-check matters: if <Katex tex="\mu" /> had come out different from 3, line 2 could not
        pass through <Katex tex="(4,3,t)" /> for any <Katex tex="s" />, and something would have gone wrong.
      </>
    ),
  },
  {
    working: <Katex display tex="s-\mu = t \;\implies\; s = t+\mu = 5+3 = 8" />,
    reason: <>Match the <Katex tex="z" />-coordinate of line 2, using <Katex tex="t=5" /> found from line 1.</>,
  },
  {
    working: <Katex display tex="\boxed{r=5,\quad s=8,\quad t=5}" />,
    reason: <>Matches option <b>D</b> — in the order <Katex tex="r" />, <Katex tex="s" />, <Katex tex="t" /> the question asks for.</>,
    more: (
      <>
        Option <b>C</b> (5, 5 and 8) has the right numbers with <Katex tex="s" /> and <Katex tex="t" /> swapped, so
        read the order the question lists them in. Options <b>A</b> (2, 3 and 5) and <b>B</b> (5, 3 and 5) put 2
        or 3 where <Katex tex="r" /> or <Katex tex="s" /> belongs; those are the parameter values{' '}
        <Katex tex="\lambda=2" /> and <Katex tex="\mu=3" />, not the constants.
      </>
    ),
  },
]

export default function SpecialistQ18_2025() {
  return (
    <MCQShell
      question={
        <p>
          The lines given by <Katex tex="\underset{\sim}{r_1}(\lambda) = 2\underset{\sim}{i}+r\underset{\sim}{j}-3\underset{\sim}{k}+\lambda(\underset{\sim}{i}-\underset{\sim}{j}+4\underset{\sim}{k})" />{' '}
          and <Katex tex="\underset{\sim}{r_2}(\mu) = \underset{\sim}{i}+s\underset{\sim}{k}+\mu(\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k})" /> intersect at the point{' '}
          <Katex tex="(4,3,t)" />, where <Katex tex="\lambda,\mu\in R" /> and <Katex tex="r" />, <Katex tex="s" />{' '}
          and <Katex tex="t" /> are real constants.
          <br />
          The values of <Katex tex="r" />, <Katex tex="s" /> and <Katex tex="t" /> respectively are
        </p>
      }
      options={[
        { letter: 'A', content: '2, 3 and 5' },
        { letter: 'B', content: '5, 3 and 5' },
        { letter: 'C', content: '5, 5 and 8' },
        { letter: 'D', content: '5, 8 and 5', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
