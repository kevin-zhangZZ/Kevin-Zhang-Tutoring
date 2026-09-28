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
    reason: <>To standardise you need the centre and the spread of <Katex tex="W" />, so find those first. Expectation is linear, so the coefficients pass straight through, signs included: the centre of <Katex tex="4U" /> is <Katex tex="20" /> and the centre of <Katex tex="-3V" /> is <Katex tex="-24" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(W) = 20-24 = -4" />,
    reason: <>Negative, which is easy to miss and is what makes the final standardisation come out at <Katex tex="1.8" /> rather than <Katex tex="0.2" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(W) = 4^2\mathrm{Var}(U)+(-3)^2\mathrm{Var}(V)" />,
    reason: <>Variances of independent variables <em>add</em>, and each coefficient is squared, so <Katex tex="(-3)^2=9" /> and the minus sign disappears. Why: variance measures spread, and <Katex tex="-3V" /> is just <Katex tex="3V" /> flipped to the other side of zero, exactly as spread out. Adding a second independent random quantity can only add spread. Subtracting the variances is the classic error.</>,
  },
  {
    working: <Katex display tex="= 16(1)+9(1) = 25 \implies \mathrm{sd}(W)=5" />,
    reason: <>Note <Katex tex="16+9=25" /> is deliberate: the numbers were chosen so the standard deviation is a whole number.</>,
  },
  {
    working: <Katex display tex="\Pr(W>5) = \Pr\!\left(Z>\frac{5-(-4)}{5}\right)" />,
    reason: <>Standardising with <Katex tex="Z=\dfrac{W-\mu}{\sigma}" /> counts how many standard deviations <Katex tex="5" /> is above the mean. The double negative in the numerator is the last trap: <Katex tex="5-(-4)=9" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(Z>1.8)}" />,
    reason: <>Matches option <b>E</b>. Option A (25%) subtracts the variances, giving <Katex tex="\mathrm{sd}(W)=\sqrt7" /> and <Katex tex="\tfrac{9}{\sqrt7}=\tfrac{9\sqrt7}{7}" />; option C is that with the inequality reversed. Option D, <Katex tex="\Pr(Z>0.2)" />, comes from taking <Katex tex="\mathrm{E}(W)=+4" />; option B has the inequality reversed.</>,
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
          sum, whatever the signs of <Katex tex="a" /> and <Katex tex="b" />. Subtracting
          variables cannot reduce the spread. A linear combination of independent normal
          variables is itself normal, which is why <Katex tex="W" /> can be standardised to{' '}
          <Katex tex="Z" />.
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
              The coefficient is squared before anything is added: <Katex tex="(-3)^2=+9" />. A minus sign flips{' '}
              <Katex tex="V" /> to the other side of zero, but a flipped curve is exactly as wide as the original, so{' '}
              <Katex tex="-3V" /> contributes the same spread as <Katex tex="3V" />. To catch it: a variance of{' '}
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
