// 2019 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 67% correct. Finding
// the standard deviation of a normal distribution from a given tail probability. Question text
// transcribed from the original paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 67, C: 8, D: 7, E: 3 },
  noAnswer: 1,
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim N\!\left(200,\ \sigma^2\right), \qquad \Pr(X>190)=0.97" />,
    reason: <>The mean is known, the standard deviation is the unknown — the reverse of the usual set-up, so the standard normal has to be used as the bridge.</>,
  },
  {
    working: <Katex display tex="\Pr(X<190) = 1-0.97 = 0.03" />,
    reason: <>Switch to the lower tail, because that's the form the inverse normal expects.</>,
  },
  {
    working: <Katex display tex="Z = \dfrac{X-\mu}{\sigma} = \dfrac{190-200}{\sigma} = \dfrac{-10}{\sigma}" />,
    reason: <>Standardising converts any normal variable into <Katex tex="Z\sim N(0,1)" />, whose values are the same for everyone — so the unknown <Katex tex="\sigma" /> can be isolated.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(Z<\dfrac{-10}{\sigma}\right)=0.03 \implies \dfrac{-10}{\sigma} = \operatorname{invNorm}(0.03) \approx -1.8808" />,
    reason: <>The inverse normal returns the <Katex tex="z" />-value with <Katex tex="3\%" /> of the area below it. It is negative, which is the check that the answer is heading the right way — <Katex tex="190" /> is below the mean.</>,
  },
  {
    working: <Katex display tex="\sigma = \dfrac{-10}{-1.8808} \approx 5.317" />,
    reason: <>Solving for <Katex tex="\sigma" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma \approx 5.3 \text{ g}}" />,
    reason: <>Matches option <b>B</b>. Quick sanity check: <Katex tex="190" /> is <Katex tex="10" /> g below the mean, and <Katex tex="97\%" /> of packets are heavier than that — so <Katex tex="10" /> g must be a bit under two standard deviations, making <Katex tex="\sigma" /> a bit over <Katex tex="5" />. ✓</>,
  },
]

export default function MethodsQ14_2019() {
  return (
    <MCQShell
      question={
        <p>
          The weights of packets of lollies are normally distributed with a mean of{' '}
          <Katex tex="200" /> g. If <Katex tex="97\%" /> of these packets of lollies have a
          weight of more than <Katex tex="190" /> g, then the standard deviation of the
          distribution, correct to one decimal place, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="3.3\text{ g}" /> },
        { letter: 'B', content: <Katex tex="5.3\text{ g}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="6.1\text{ g}" /> },
        { letter: 'D', content: <Katex tex="9.4\text{ g}" /> },
        { letter: 'E', content: <Katex tex="12.1\text{ g}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
