// 2017 Specialist Mathematics — Exam 2, MCQ 18. VCAA examination report: 42% correct.
// Mean and variance of a linear combination of two independent normals. Question text
// transcribed from the original paper; solution is original.
// Interactive (extras): spec-2017-mcq18-spread — 4U and −3V as separate curves, then their sum W
// with a simulated histogram, then the tail W > 5 standardised; a toggle shows the
// subtracted-variance curve (sd √7) failing. WrongMethod: subtracting the variances (25% chose A;
// 9/√7 = 9√7/7 checked). itute agrees (E); Pr(Z > 1.8) ≈ 0.036 checked with scipy.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SpreadWidget = lazyWidget(() => import('../interactives/spec-2017-mcq18-spread'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 25, B: 9, C: 14, D: 8, E: 42 },
  answer: 'E',
  noAnswer: 1,
  comment: <Katex tex="\mathrm{E}(W)=-4,\ \mathrm{sd}(W)=5" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(W) = 4\mathrm{E}(U)-3\mathrm{E}(V) = 4(5)-3(8)" />,
    reason: <>To standardise <Katex tex="W" /> you need its mean and standard deviation. Expectation is linear, so each coefficient multiplies its mean, sign included.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(W) = 20-24 = -4" />,
    reason: <>The mean is negative. Keep the sign: it is used when standardising.</>,
    more: <>Taking <Katex tex="\mathrm{E}(W)=+4" /> here is what leads to <Katex tex="0.2" /> instead of <Katex tex="1.8" /> at the end (option D).</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(W) = 4^2\mathrm{Var}(U)+(-3)^2\mathrm{Var}(V)" />,
    reason: <>Variances of independent variables <em>add</em>, and each coefficient is squared, so <Katex tex="(-3)^2=9" /> and the minus sign disappears.</>,
    more: <>Why: <Katex tex="-3V" /> is just <Katex tex="3V" /> flipped to the other side of zero, so it is exactly as spread out as <Katex tex="3V" />, and its variance is <Katex tex="9\,\mathrm{Var}(V)" />, not <Katex tex="-9\,\mathrm{Var}(V)" />.</>,
  },
  {
    working: <Katex display tex="= 16(1)+9(1) = 25 \implies \mathrm{sd}(W)=\sqrt{25}=5" />,
    reason: <>The standard deviation is the square root of the variance.</>,
  },
  {
    working: <Katex display tex="\Pr(W>5) = \Pr\!\left(Z>\frac{5-(-4)}{5}\right)" />,
    reason: <>A linear combination of independent normals is normal, so standardise with <Katex tex="Z=\dfrac{W-\mu}{\sigma}" />. Watch the double negative: <Katex tex="5-(-4)=9" />.</>,
    more: <><Katex tex="Z" /> counts how many standard deviations <Katex tex="5" /> sits above the mean: it is <Katex tex="9" /> above <Katex tex="-4" />, and <Katex tex="9\div5=1.8" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(Z>1.8)}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: <>Option A subtracts the variances, giving <Katex tex="\mathrm{sd}(W)=\sqrt7" /> and <Katex tex="\tfrac{9}{\sqrt7}=\tfrac{9\sqrt7}{7}" />; option C is that with the inequality reversed. Option D, <Katex tex="\Pr(Z>0.2)" />, comes from taking <Katex tex="\mathrm{E}(W)=+4" />; option B has the inequality reversed.</>,
  },
]

export default function SpecialistQ18_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            <Katex tex="U" /> and <Katex tex="V" /> are independent normally distributed
            random variables, where <Katex tex="U" /> has a mean of <Katex tex="5" /> and a
            variance of <Katex tex="1" />, and <Katex tex="V" /> has a mean of{' '}
            <Katex tex="8" /> and a variance of <Katex tex="1" />. The random variable{' '}
            <Katex tex="W" /> is defined by <Katex tex="W=4U-3V" />.
          </p>
          <p>
            In terms of the standard normal variable <Katex tex="Z" />,{' '}
            <Katex tex="\Pr(W>5)" /> is equivalent to
          </p>
        </>
      }
      background={
        <p>
          For independent <Katex tex="U" /> and <Katex tex="V" />:{' '}
          <Katex tex="\mathrm{E}(aU+bV)=a\mathrm{E}(U)+b\mathrm{E}(V)" /> — signs carry
          through — but{' '}
          <Katex tex="\mathrm{Var}(aU+bV)=a^2\mathrm{Var}(U)+b^2\mathrm{Var}(V)" /> — always a
          sum, whatever the signs of <Katex tex="a" /> and <Katex tex="b" />. If{' '}
          <Katex tex="U" /> and <Katex tex="V" /> are normal, so is <Katex tex="aU+bV" />.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\Pr\!\left(Z>\tfrac{9\sqrt7}{7}\right)" /> },
        { letter: 'B', content: <Katex tex="\Pr(Z<1.8)" /> },
        { letter: 'C', content: <Katex tex="\Pr\!\left(Z<\tfrac{9\sqrt7}{7}\right)" /> },
        { letter: 'D', content: <Katex tex="\Pr(Z>0.2)" /> },
        { letter: 'E', content: <Katex tex="\Pr(Z>1.8)" />, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Why 4U − 3V is more spread out than 4U alone">
            <SpreadWidget />
          </Explore>
          <WrongMethod
            title="Var(4U − 3V) = 16 Var(U) − 9 Var(V): the minus sign carries through"
            source="25% chose A"
            working={
              <>
                <Katex display tex="\mathrm{Var}(W)=16-9=7 \implies \mathrm{sd}(W)=\sqrt7" />
                <Katex display tex="\Pr\!\left(Z>\tfrac{5-(-4)}{\sqrt7}\right)=\Pr\!\left(Z>\tfrac{9\sqrt7}{7}\right)" />
                <Katex display tex="\text{(option A)}" />
              </>
            }
          >
            <p>
              The coefficient is squared before anything is added: <Katex tex="(-3)^2=+9" />. To catch it: a variance of{' '}
              <Katex tex="7" /> would make <Katex tex="W" /> less variable than <Katex tex="4U" /> on its own (variance{' '}
              <Katex tex="16" />), which can&apos;t happen when another independent random quantity is added in.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
