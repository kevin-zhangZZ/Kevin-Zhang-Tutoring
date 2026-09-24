// 2016 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 56% correct.
// A sample proportion question that is really a binomial in disguise — the question even
// says not to use a normal approximation. Question text transcribed from the original
// paper; answer verified numerically. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 56, B: 13, C: 11, D: 13, E: 6 },
  answer: 'A',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\hat P = \frac{X}{16}, \qquad X\sim\mathrm{Bi}(16,\,0.2)" />,
    reason: <>A sample proportion is just a count divided by the sample size. Because the container holds a million blocks, removing 16 barely changes the proportion, so the draws are effectively independent.</>,
  },
  {
    working: <Katex display tex="\hat P \ge \frac{3}{16} \iff X \ge 3" />,
    reason: <>Multiply both sides by <Katex tex="16" />. Turning the proportion back into a count is the whole trick — and the reason the question says not to use a normal approximation.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(16, 0.2, 3, 16)</Cas>,
    reason: <>Cumulative from <Katex tex="3" /> to <Katex tex="16" /> inclusive.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge3) = 1-\Pr(X\le2) = 1-0.3518" />,
    reason: <>Or via the complement, adding <Katex tex="\Pr(X=0)+\Pr(X=1)+\Pr(X=2)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.6482}" />,
    reason: <>Matches option <b>A</b>. Option B (13%), <Katex tex="0.8593" />, is <Katex tex="\Pr(X\ge2)" /> — an off-by-one on the count. Sensible: the expected count is <Katex tex="16\times0.2=3.2" />, so "at least 3" should be a bit over half — and it is.</>,
  },
]

export default function MethodsQ17_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Inside a container there are one million coloured building blocks. It is known
            that <Katex tex="20\%" /> of the blocks are red. A sample of <Katex tex="16" />{' '}
            blocks is taken from the container. For samples of <Katex tex="16" /> blocks,{' '}
            <Katex tex="\hat P" /> is the random variable of the distribution of sample
            proportions of red blocks. (Do not use a normal approximation.)
          </p>
          <p>
            <Katex tex="\Pr\!\left(\hat P\ge\tfrac{3}{16}\right)" /> is closest to
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.6482" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="0.8593" /> },
        { letter: 'C', content: <Katex tex="0.7543" /> },
        { letter: 'D', content: <Katex tex="0.6542" /> },
        { letter: 'E', content: <Katex tex="0.3211" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
