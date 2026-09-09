// 2017 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 41% correct.
// Use a given probability to first back out p, then compute a different binomial probability.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 15, C: 41, D: 17, E: 13 },
  answer: 'C',
  noAnswer: 2,
  comment: (
    <>
      <Katex tex="X\sim\mathrm{Bi}(5,p)" />: <Katex tex="\Pr(X=0)=(1-p)^5=\tfrac{1}{243}" />, then{' '}
      <Katex tex="\Pr(X>3)=\Pr(X=4)+\Pr(X=5)\approx0.4609" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\hat P = \frac{X}{5}, \qquad X \sim \mathrm{Bi}(5,p)" />,
    reason: <>The sample proportion from 5 independent trials, each with success probability <Katex tex="p" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\Pr(\hat P=0) = \Pr(X=0) = (1-p)^5 = \frac{1}{243}" />
        <Katex display tex="\implies\; 1-p = \left(\frac{1}{243}\right)^{1/5} = \frac13" />
      </>
    ),
    reason: <>Since <Katex tex="243=3^5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p = \frac23}" />,
  },
  {
    working: <Katex display tex="\Pr(\hat P>0.6) = \Pr(X>3) = \Pr(X=4)+\Pr(X=5)" />,
    reason: <>Since <Katex tex="X" /> only takes integer values <Katex tex="0" /> to <Katex tex="5" />, <Katex tex="X/5>0.6" /> means <Katex tex="X>3" />, i.e. <Katex tex="X\in\{4,5\}" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\Pr(X=4) = \binom54\left(\frac23\right)^4\left(\frac13\right)^1 = \frac{80}{243}" />
        <Katex display tex="\Pr(X=5) = \left(\frac23\right)^5 = \frac{32}{243}" />
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\Pr(\hat P>0.6) = \frac{80}{243}+\frac{32}{243} = \frac{112}{243} \approx 0.4609}" />,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function MethodsQ16_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            For random samples of five Australians, <Katex tex="\hat P" /> is the random variable that
            represents the proportion who live in a capital city.
          </p>
          <p>
            Given that <Katex tex="\Pr(\hat P=0) = \dfrac{1}{243}" />, then <Katex tex="\Pr(\hat P>0.6)" />,
            correct to four decimal places, is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.0453" /> },
        { letter: 'B', content: <Katex tex="0.3209" /> },
        { letter: 'C', content: <Katex tex="0.4609" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0.5390" /> },
        { letter: 'E', content: <Katex tex="0.7901" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
