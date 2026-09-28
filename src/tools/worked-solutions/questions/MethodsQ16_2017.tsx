// 2017 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 41% correct.
// Use a given probability to first back out p, then compute a different binomial probability.
// Question text transcribed from the original paper; solution is original.
// Interactive: "P̂ is X/5 on a relabelled axis" (interactives/meth-2017-mcq16-bars.tsx) — the six
// bars of Bi(5, p) with both X and P̂ labels, a p slider (p = 1/3 is the p ↔ 1 − p swap, option A)
// and a toggle that reads > as ≥ (option E). WrongMethod boxes for options E and A, both verified.
// Note: option D, 0.5390, is Pr(X ≤ 3) = 131/243 = 0.53909…, which is 0.5391 to four decimal
// places; VCAA printed it as 0.5390. It is a distractor, so the answer is unaffected.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const BarsWidget = lazyWidget(() => import('../interactives/meth-2017-mcq16-bars'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 15, C: 41, D: 17, E: 13 },
  answer: 'C',
  noAnswer: 2,
  comment: (
    <>
      <Katex tex="X\sim\mathrm{Bi}(5,p)" />
      <br />
      <Katex tex="\Pr(X=0)=\dbinom{5}{0}p^0(1-p)^5=\dfrac{1}{243},\ p=\dfrac23" />
      <br />
      <Katex tex="\Pr(X>3)=\Pr(X\ge4)=0.4609" />, correct to four decimal places
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\hat P = \frac{X}{5}, \qquad X \sim \mathrm{Bi}(5,p)" />,
    reason: (
      <>
        A proportion out of five people is a <em>count</em> out of five, so write <Katex tex="\hat P=\tfrac X5" />, where{' '}
        <Katex tex="X" /> is how many of the five live in a capital city. Each person is an independent trial with the same
        chance <Katex tex="p" />, so <Katex tex="X" /> is binomial, and every <Katex tex="\hat P" /> statement becomes an{' '}
        <Katex tex="X" /> statement.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} \Pr(\hat P=0) &= \Pr(X=0) \\ &= (1-p)^5 \\ &= \frac{1}{243} \end{aligned}" />
        <Katex display tex="\begin{aligned} \implies\; 1-p &= \left(\frac{1}{243}\right)^{1/5} \\ &= \frac13 \end{aligned}" />
      </>
    ),
    reason: (
      <>
        <Katex tex="\hat P=0" /> means <em>none</em> of the five lives in a capital city: five failures, each with
        probability <Katex tex="1-p" />. Since <Katex tex="243=3^5" />, take the fifth root. On CAS,{' '}
        <Cas fn="solve">solve((1−p)^5 = 1/243, p)</Cas>.
      </>
    ),
  },
  {
    working: <Katex display tex="p = \frac23" />,
    reason: (
      <>
        A quick check: &ldquo;nobody lives in a capital city&rdquo; is as rare as 1 in 243, so most people must, and{' '}
        <Katex tex="p" /> should be large. <Katex tex="\tfrac23" /> passes; <Katex tex="\tfrac13" /> would not.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \Pr(\hat P>0.6) &= \Pr(X>3) \\ &= \Pr(X=4)+\Pr(X=5) \end{aligned}" />,
    reason: (
      <>
        Multiply <Katex tex="\tfrac X5>0.6" /> by <Katex tex="5" /> to get <Katex tex="X>3" />. <Katex tex="X" /> is a whole
        number, so it starts at <Katex tex="4" />: <Katex tex="X=3" /> is <Katex tex="\hat P=0.6" /> exactly, which is not{' '}
        <em>greater</em> than <Katex tex="0.6" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} \Pr(X=4) &= \binom54\left(\frac23\right)^4\left(\frac13\right)^1 \\ &= \frac{80}{243} \end{aligned}" />
        <Katex display tex="\begin{aligned} \Pr(X=5) &= \left(\frac23\right)^5 \\ &= \frac{32}{243} \end{aligned}" />
      </>
    ),
    reason: (
      <>
        The binomial formula with <Katex tex="n=5,\ p=\tfrac23" />. On CAS, <Cas fn="binomCdf">binomCdf(5, 2/3, 4, 5)</Cas>{' '}
        does both at once.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\Pr(\hat P>0.6) = \frac{112}{243} \approx 0.4609}" />,
    reason: (
      <>
        Matches option <b>C</b>. Option E, <Katex tex="0.7901" />, is <Katex tex="\Pr(X\ge3)" />, which includes{' '}
        <Katex tex="\hat P=0.6" /> itself. Option A, <Katex tex="0.0453" />, is <Katex tex="\Pr(X\ge4)" /> with{' '}
        <Katex tex="p=\tfrac13" />. Option D is (to within rounding) <Katex tex="\Pr(X\le3)=\tfrac{131}{243}" />, the other
        tail.
      </>
    ),
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
      background={
        <Background title="A sample proportion is a binomial count in disguise">
          <p>
            For samples of size <Katex tex="n" />, <Katex tex="\hat P=\tfrac Xn" /> where <Katex tex="X\sim\mathrm{Bi}(n,p)" />{' '}
            counts the successes. So <Katex tex="\hat P" /> can only take the values <Katex tex="0,\tfrac1n,\tfrac2n,\dots,1" />,
            and any probability about <Katex tex="\hat P" /> is found by multiplying through by <Katex tex="n" /> and working
            with <Katex tex="X" />.
          </p>
          <p>
            Because <Katex tex="X" /> is discrete, the boundary value matters: <Katex tex="\Pr(X>3)" /> and{' '}
            <Katex tex="\Pr(X\ge3)" /> are different numbers.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.0453" /> },
        { letter: 'B', content: <Katex tex="0.3209" /> },
        { letter: 'C', content: <Katex tex="0.4609" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0.5390" /> },
        { letter: 'E', content: <Katex tex="0.7901" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="P̂ is X/5: the same six bars, and > 0.6 starts after the line">
            <BarsWidget />
          </Explore>
          <WrongMethod
            title="0.6 × 5 = 3, so P̂ > 0.6 means X ≥ 3"
            source="13% chose E"
            working={
              <>
                <Katex display tex="\Pr(X\ge3)=\tfrac{80}{243}+\tfrac{80}{243}+\tfrac{32}{243}" />
                <Katex display tex="=\tfrac{192}{243}\approx0.7901" />
              </>
            }
          >
            <p>
              <Katex tex="X=3" /> is <Katex tex="\hat P=0.6" /> exactly, and <Katex tex="0.6" /> is not greater than{' '}
              <Katex tex="0.6" />. Changing <Katex tex=">" /> to <Katex tex="\ge" /> adds a whole bar of probability,{' '}
              <Katex tex="\tfrac{80}{243}" />. To catch it, list the values <Katex tex="\hat P" /> can take (
              <Katex tex="0,\ 0.2,\ 0.4,\ 0.6,\ 0.8,\ 1" />) and tick only those that satisfy the inequality.
            </p>
          </WrongMethod>
          <WrongMethod
            title="1/243 = (1/3)⁵, so p = 1/3"
            source="12% chose A"
            working={
              <>
                <Katex display tex="p^5=\tfrac1{243}\implies p=\tfrac13" />
                <Katex display tex="\Pr(X\ge4)=\tfrac{10}{243}+\tfrac1{243}\approx0.0453" />
              </>
            }
          >
            <p>
              <Katex tex="p^5" /> is the chance that <em>all five</em> live in a capital city, which is{' '}
              <Katex tex="\Pr(\hat P=1)" />. The given event, <Katex tex="\hat P=0" />, is five people who
              don&apos;t, so the base is <Katex tex="1-p" />. Say the event in words before writing the power.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
