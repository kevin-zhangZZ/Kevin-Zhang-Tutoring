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
    reason: <>A sample proportion is the count of reds divided by <Katex tex="16" />; with a million blocks, the draws are effectively independent.</>,
    more: <>Why independent: the container holds a million blocks, so removing 16 barely changes the proportion of red ones. Each draw is then red with probability <Katex tex="0.2" />, whatever the earlier draws were, which makes the count binomial.</>,
  },
  {
    working: <Katex display tex="\hat P \ge \frac{3}{16} \iff X \ge 3" />,
    reason: <>Multiply both sides by <Katex tex="16" />. As a count, it is an exact binomial — which is what "do not use a normal approximation" asks for.</>,
    more: <>Keep the "or equal to": <Katex tex="X\ge3" /> includes <Katex tex="X=3" />, so the binomial sum starts at <Katex tex="3" />, not <Katex tex="4" />. (<Katex tex="\Pr(X\ge4)\approx0.4019" /> is not an option.) A normal approximation, <Katex tex="\hat P\approx\mathrm{N}\!\left(0.2,\,0.1^2\right)" /> with <Katex tex="\sqrt{0.2\times0.8/16}=0.1" />, would give about <Katex tex="0.5497" /> — far from the exact value with a sample this small, which is why the question rules it out.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(16, 0.2, 3, 16)</Cas>,
    reason: <>Cumulative from <Katex tex="3" /> to <Katex tex="16" /> inclusive.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge3) = 1-\Pr(X\le2) = 1-0.3518" />,
    reason: <>The same value as a check, via the complement: <Cas fn="binomCdf">binomCdf(16, 0.2, 0, 2)</Cas> <Katex tex="=0.3518" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.6482}" />,
    reason: <>Matches option <b>A</b> — a bit over half, as expected since the mean count is <Katex tex="16\times0.2=3.2" />.</>,
    more: <>B (13%), <Katex tex="0.8593" />, is <Katex tex="\Pr(X\ge2)" /> — an off-by-one on the count, e.g. typing a lower bound of <Katex tex="2" /> or computing <Katex tex="1-\Pr(X\le1)" />. D (13%), <Katex tex="0.6542" />, sits very close to A, so read the CAS output digit by digit. C and E don't come from any natural slip with this binomial.</>,
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
