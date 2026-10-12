// 2019 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 67% correct (no comment
// in the report for this question). Finding the standard deviation of a normal distribution from a
// given tail probability. Question text transcribed from the original paper (no diagram). Solution
// is original; answer agrees with itute. Interactive: meth-2019-mcq14-sigma (slide σ, or jump to
// each option's value, and watch Pr(X > 190); only σ ≈ 5.317 gives 0.97). No WrongMethod: none of
// the distractors (3.3, 6.1, 9.4, 12.1) traces to a single verifiable slip.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const SigmaWidget = lazyWidget(() => import('../interactives/meth-2019-mcq14-sigma'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 67, C: 8, D: 7, E: 3 },
  noAnswer: 1,
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim N\!\left(200,\ \sigma^2\right), \qquad \Pr(X>190)=0.97" />,
    reason: <>The probability is given and <Katex tex="\sigma" /> is unknown, so standardise to <Katex tex="Z" />, which has no unknowns, and use the inverse normal on that.</>,
    more: <>This is the reverse of the usual &ldquo;find the probability&rdquo; set-up: a <em>parameter</em> is the unknown. <Cas fn="invNorm" /> needs actual numbers for the mean and standard deviation, so it can&apos;t be used on <Katex tex="X" /> with <Katex tex="\sigma" /> unknown.</>,
  },
  {
    working: <Katex display tex="\Pr(X<190) = 1-0.97 = 0.03" />,
    reason: <><Cas fn="invNorm" /> works with the area to the <em>left</em> of a value. <Katex tex="97\%" /> lies to the right of <Katex tex="190" />, so <Katex tex="3\%" /> lies to its left.</>,
    more: <>A quick sketch helps: <Katex tex="190" /> is below the mean, deep in the left tail.</>,
  },
  {
    working: <Katex display tex="Z = \dfrac{X-\mu}{\sigma} \implies z = \dfrac{190-200}{\sigma} = \dfrac{-10}{\sigma}" />,
    reason: <>Standardise <Katex tex="190" />: it is <Katex tex="10" /> g below the mean, which is <Katex tex="\tfrac{10}{\sigma}" /> standard deviations below.</>,
    more: <>A <Katex tex="z" />-value counts how many standard deviations a value is from the mean, so the unknown <Katex tex="\sigma" /> now sits inside a <Katex tex="z" />-value we can find.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\Pr\!\left(Z<\dfrac{-10}{\sigma}\right)=0.03" />
        <Katex display tex="\dfrac{-10}{\sigma} = \operatorname{invNorm}(0.03) \approx -1.8808" />
      </>
    ),
    reason: <><Cas fn="invNorm" /> on the standard normal gives the <Katex tex="z" />-value with <Katex tex="3\%" /> of the area below it. It is negative, as it must be: <Katex tex="190" /> is below the mean.</>,
  },
  {
    working: <Katex display tex="\sigma = \dfrac{-10}{-1.8808} \approx 5.317" />,
    reason: <>Solve for <Katex tex="\sigma" />.</>,
    more: <>Unlike <Cas fn="invNorm" />, a CAS <em>solve</em> can handle the unknown, so you can skip the standardising altogether: <Cas fn="solve" /> <Katex tex="\operatorname{normCdf}(190,\infty,200,\sigma)=0.97" /> for <Katex tex="\sigma" />, adding <Katex tex="\mid \sigma>0" /> so only the positive standard deviation comes back (see <Cas fn="normCdf" />).</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma \approx 5.3 \text{ g}}" />,
    reason: <>Matches option <b>B</b>, correct to one decimal place.</>,
    more: <>Quick sanity check: <Katex tex="97\%" /> of packets are heavier than <Katex tex="190" />, so the <Katex tex="10" /> g gap must be a bit under two standard deviations, making <Katex tex="\sigma" /> a bit over <Katex tex="5" />. Checking the other options the same way: <Katex tex="\sigma=3.3" /> puts about <Katex tex="99.9\%" /> above <Katex tex="190" />, <Katex tex="\sigma=6.1" /> only about <Katex tex="94.9\%" />, and <Katex tex="9.4" /> and <Katex tex="12.1" /> are further off still (about <Katex tex="85.6\%" /> and <Katex tex="79.6\%" />).</>,
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
      extras={
        <Explore title="Slide σ until 97% of packets are heavier than 190 g">
          <SigmaWidget />
        </Explore>
      }
    />
  )
}
