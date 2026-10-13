// 2016 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 78% correct.
// Standardising a normal probability. Question text transcribed from the original paper;
// solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 6, C: 6, D: 6, E: 78 },
  answer: 'E',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="Z = \frac{X-\mu}{\sigma}" />,
    reason: <>To turn a probability about <Katex tex="X" /> into one about <Katex tex="Z" />, standardise: subtract the mean, divide by the standard deviation.</>,
  },
  {
    working: <Katex display tex="z = \frac{12.5-12}{0.25} = \frac{0.5}{0.25} = 2" />,
    reason: <>Dividing by <Katex tex="0.25" /> is multiplying by <Katex tex="4" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X>12.5) = \Pr(Z>2)" />,
    reason: <>Subtracting <Katex tex="12" /> and dividing by the positive <Katex tex="0.25" /> never flips an inequality, so "greater than" stays "greater than".</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(Z>2)}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: <>Check: <Katex tex="12.5" /> is two standard deviations above the mean, so by the <Katex tex="95\%" /> rule about <Katex tex="2.5\%" /> lies beyond it; <Cas fn="normCdf">normCdf(2, ∞, 0, 1)</Cas> gives <Katex tex="\approx0.023" />. The answer can also be written <Katex tex="\Pr(Z<-2)" /> by symmetry, but none of A–D is that. Each of A–D uses a wrong <Katex tex="z" />-value or the wrong tail. C, <Katex tex="\Pr(Z<1)\approx0.84" />, is more than a half — impossible, since <Katex tex="12.5" /> is above the mean. A is the tail beyond <Katex tex="4" /> standard deviations, which would need <Katex tex="X>13" />. B and D are equal to each other by symmetry — both about <Katex tex="0.067" />, the tail beyond <Katex tex="1.5" /> standard deviations (<Katex tex="X>12.375" />) — so neither can be right.</>,
  },
]

export default function MethodsQ16_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The random variable, <Katex tex="X" />, has a normal distribution with mean{' '}
            <Katex tex="12" /> and standard deviation <Katex tex="0.25" />
          </p>
          <p>
            If the random variable, <Katex tex="Z" />, has the standard normal distribution,
            then the probability that <Katex tex="X" /> is greater than <Katex tex="12.5" />{' '}
            is equal to
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\Pr(Z<-4)" /> },
        { letter: 'B', content: <Katex tex="\Pr(Z<-1.5)" /> },
        { letter: 'C', content: <Katex tex="\Pr(Z<1)" /> },
        { letter: 'D', content: <Katex tex="\Pr(Z\ge1.5)" /> },
        { letter: 'E', content: <Katex tex="\Pr(Z>2)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
