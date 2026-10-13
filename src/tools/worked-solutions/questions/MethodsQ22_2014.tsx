// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 22. VCAA examination report: 37% correct.
// John throws 4 darts (Pr(hit) = 1/4 each), Rebecca throws 2 (Pr(hit) = 1/2 each) — the ratio
// Pr(Rebecca hits at least once) : Pr(John hits at least once). Question text transcribed
// from the original paper; solution is original.
// Interactive: interactives/meth-2014-mcq22-bars.tsx (probability bars built throw by throw).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const BarsWidget = lazyWidget(() => import('../interactives/meth-2014-mcq22-bars'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 17, B: 15, C: 15, D: 15, E: 37 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\Pr(R\ge1):\Pr(J\ge1) \;=\; 1-\Pr(R=0):1-\Pr(J=0) \;=\; 1-\left(\tfrac12\right)^2 : 1-\left(\tfrac34\right)^4 \;=\; 192:175" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \Pr(\text{John misses all 4}) &= \left(\dfrac34\right)^4 \\ &= \dfrac{81}{256} \end{aligned}" />,
    reason: <>John misses with probability <Katex tex="1-\tfrac14=\tfrac34" /> on each throw. The throws are independent, so multiply for all 4.</>,
    more: <>Start with the misses because &ldquo;at least once&rdquo; covers 1, 2, 3 or 4 hits, four separate cases, while &ldquo;never&rdquo; is a single case.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \Pr(\text{John} \ge 1) &= 1-\dfrac{81}{256} \\ &= \dfrac{175}{256} \end{aligned}" />,
    reason: '"At least one hit" is the complement of "no hits", so subtract from 1.',
    more: (
      <>
        Equivalently, the number of John&apos;s hits is <Katex tex="J \sim \text{Bi}(4, \tfrac14)" /> and this is{' '}
        <Katex tex="1-\Pr(J=0)" />; <Cas fn="binomCdf">binomCdf(4, 1/4, 1, 4)</Cas> gives <Katex tex="0.6836\ldots" />,
        but a decimal is no help for matching a ratio of whole numbers. A common slip is to add the throws,{' '}
        <Katex tex="4 \times \tfrac14 = 1" />, which would make John certain to hit. That adds up overlapping cases
        (two hits get counted twice); <Katex tex="1" /> is John&apos;s expected number of hits, not a probability.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \Pr(\text{Rebecca misses both}) &= \left(\dfrac12\right)^2 \\ &= \dfrac14 \end{aligned}" />,
    reason: <>Rebecca misses with probability <Katex tex="1-\tfrac12=\tfrac12" /> on each of her 2 throws. Independent, so multiply.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \Pr(\text{Rebecca} \ge 1) &= 1-\dfrac14 \\ &= \dfrac34 \\ &= \dfrac{192}{256} \end{aligned}" />,
    reason: <>Complement again. Write it over 256 so it can be compared directly with John&apos;s result.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(\text{Rebecca}\ge 1) : \Pr(\text{John}\ge 1) = 192:175}" />,
    reason: <>Rebecca first, as the question asks. The common denominator 256 cancels. Matches option <b>E</b>.</>,
    more: (
      <>
        Where the other options come from. A (<Katex tex="1:1" />) matches the expected numbers of hits,{' '}
        <Katex tex="2\times\tfrac12=4\times\tfrac14=1" />, which are not probabilities. B (<Katex tex="32:27" />) is the
        ratio for <em>exactly</em> one hit each, <Katex tex="\tfrac12 : \tfrac{27}{64}" />. C (<Katex tex="64:85" />)
        swaps John&apos;s hit and miss: <Katex tex="1-\left(\tfrac14\right)^4=\tfrac{255}{256}" />, and{' '}
        <Katex tex="192:255 = 64:85" />. D (<Katex tex="2:1" />) compares single throws,{' '}
        <Katex tex="\tfrac12:\tfrac14" />. Sanity check: Rebecca&apos;s better aim only slightly outweighs John&apos;s
        extra throws, so a ratio just above <Katex tex="1" /> is plausible. The diagram below builds both probabilities
        throw by throw.
      </>
    ),
  },
]

export default function MethodsQ22_2014() {
  return (
    <MCQShell
      question={
        <>
          <p>
            John and Rebecca are playing darts. The result of each of their throws is independent of the
            result of any other throw. The probability that John hits the bullseye with a single throw is{' '}
            <Katex tex="\tfrac14" />. The probability that Rebecca hits the bullseye with a single throw is{' '}
            <Katex tex="\tfrac12" />. John has four throws and Rebecca has two throws.
          </p>
          <p className="mt-2">
            The ratio of the probability of Rebecca hitting the bullseye at least once to the probability of
            John hitting the bullseye at least once is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="1:1" /> },
        { letter: 'B', content: <Katex tex="32:27" /> },
        { letter: 'C', content: <Katex tex="64:85" /> },
        { letter: 'D', content: <Katex tex="2:1" /> },
        { letter: 'E', content: <Katex tex="192:175" />, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <Explore title="Each throw can only hit what the earlier misses leave over">
          <BarsWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
