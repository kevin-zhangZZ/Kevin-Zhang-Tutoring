// 2019 Specialist Mathematics — Exam 2, MCQ 20. VCAA examination report: 70% correct. The
// p value for a one-sided test on a sample mean. Question text transcribed from the original
// paper (no diagram). Solution is original.
// Answer B checked with scipy: sd(x̄) = 0.02887, z = −0.95255, Pr(Z < −0.95255) = 0.17041. The VCAA
// report prints no comment for this question; itute agrees (B). Distractors verified with scipy:
// C (13%) is Pr(Z < −0.09525) = 0.46206, standardising with σ = 0.2887 instead of σ/√100; A is the
// size of that z value, 0.0953; D is the upper tail 1 − 0.1704 = 0.8296; E is |z| = 0.9525.
// Interactive diagram (§15): interactives/spec-2019-mcq20-tail.tsx draws the H₀ distribution of the
// sample mean, N(0.5, 0.02887²), with the left tail below x̄ shaded, an x̄ slider (p drops below 0.05
// at about 0.4525), and a toggle for option C's σ = 0.2887. This site's own figure; VCAA printed no
// diagram for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const TailWidget = lazyWidget(() => import('../interactives/spec-2019-mcq20-tail'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 70, C: 13, D: 7, E: 4 },
  noAnswer: 1,
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{sd}\left(\overline{X}\right)=\dfrac{\sigma}{\sqrt n}=\dfrac{0.2887}{\sqrt{100}}=0.02887" />,
    reason: <>The test is about a <em>sample mean</em>, so we need the spread of <Katex tex="\overline{X}" />, not of single random numbers. Averaging <Katex tex="100" /> numbers shrinks the standard deviation by a factor of <Katex tex="\sqrt{100}=10" />.</>,
  },
  {
    working: <Katex display tex="\overline{X}\sim N\!\left(0.5,\ 0.02887^2\right)" />,
    reason: <>Everything is worked out <b>assuming <Katex tex="H_0" /> is true</b>, so the mean is <Katex tex="0.5" />. The random numbers themselves are uniform, not normal, but the mean of <Katex tex="100" /> of them is approximately normal (central limit theorem).</>,
  },
  {
    working: <Katex display tex="p=\Pr\left(\overline{X}\le0.4725 \mid \mu=0.5\right)" />,
    reason: <>The <Katex tex="p" /> value is the probability of a sample mean at least as extreme as the one observed, if <Katex tex="H_0" /> is true. <Katex tex="H_1:\mu<0.5" /> says which way &ldquo;extreme&rdquo; points: <em>smaller</em>. So it is the left tail only; a one-sided test has no doubling.</>,
  },
  {
    working: (
      <>
        <Katex display tex="z=\dfrac{0.4725-0.5}{0.02887}" />
        <Katex display tex="=\dfrac{-0.0275}{0.02887}\approx-0.9525" />
      </>
    ),
    reason: <>Standardising shows how unusual the sample is: its mean is less than one standard deviation below the claimed <Katex tex="0.5" />.</>,
  },
  {
    working: <Katex display tex="p=\Pr(Z<-0.9525)\approx0.1704" />,
    reason: <>Standard normal lower tail. Or skip the <Katex tex="z" /> step and use the distribution of <Katex tex="\overline{X}" /> directly: <Cas fn="normCdf">normCdf(−∞, 0.4725, 0.5, 0.2887/√100)</Cas>.</>,
  },
  {
    working: <Katex display tex="\boxed{p\approx0.1704}" />,
    reason: <>Matches option <b>B</b>. Option <b>D</b>, <Katex tex="0.8296=1-0.1704" />, is the upper tail, the wrong direction for <Katex tex="H_1" />. Option <b>E</b>, <Katex tex="0.9525" />, is the size of the <Katex tex="z" /> value, not a probability. Option <b>C</b>, <Katex tex="0.4621" />, standardises with <Katex tex="\sigma" /> instead of <Katex tex="\tfrac{\sigma}{\sqrt n}" />, and option <b>A</b>, <Katex tex="0.0953" />, is the size of that wrong <Katex tex="z" /> value. Since <Katex tex="p>0.05" />, this sample gives no real evidence that the calculator is faulty.</>,
    more: <>See the Common Mistake below for option C.</>,
  },
]

export default function SpecialistQ20_2019() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The random number function of a calculator is designed to generate random numbers
            that are uniformly distributed from <Katex tex="0" /> to <Katex tex="1" />. When
            working properly, a calculator generates random numbers from a population where{' '}
            <Katex tex="\mu=0.5" /> and <Katex tex="\sigma=0.2887" />
          </p>
          <p>
            When checking the random number function of a particular calculator, a sample of{' '}
            <Katex tex="100" /> random numbers was generated and was found to have a mean of{' '}
            <Katex tex="\overline{x}=0.4725" />
            <br />
            Assuming <Katex tex="H_0:\mu=0.5" /> and{' '}
            <Katex tex="H_1:\mu<0.5" />, and <Katex tex="\sigma=0.2887" />, the <Katex tex="p" />{' '}
            value for a one-sided test is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.0953" /> },
        { letter: 'B', content: <Katex tex="0.1704" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="0.4621" /> },
        { letter: 'D', content: <Katex tex="0.8296" /> },
        { letter: 'E', content: <Katex tex="0.9525" /> },
      ]}
      background={
        <Background title="What a p value measures">
          <p>
            A hypothesis test starts by assuming <Katex tex="H_0" /> is true. The <Katex tex="p" /> value is then the
            probability of getting a sample result at least as extreme as the one actually observed, where
            &ldquo;extreme&rdquo; means in the direction <Katex tex="H_1" /> points.
          </p>
          <p>
            A small <Katex tex="p" /> value (below <Katex tex="0.05" />, say) means such a sample would be rare if{' '}
            <Katex tex="H_0" /> were true, which is evidence against <Katex tex="H_0" />. A large one means the sample is
            quite ordinary under <Katex tex="H_0" />.
          </p>
        </Background>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="The p value: how often a working calculator gives a mean this low">
            <TailWidget />
          </Explore>
          <WrongMethod
            title="Standardise with the σ = 0.2887 given in the question"
            source="13% chose C"
            working={
              <>
                <Katex display tex="z=\dfrac{0.4725-0.5}{0.2887}\approx-0.0953" />
                <Katex display tex="\Pr(Z<-0.0953)\approx0.4621" />
                <Katex display tex="\text{(option C)}" />
              </>
            }
          >
            <p>
              <Katex tex="\sigma=0.2887" /> is the spread of <em>single</em> random numbers. The test is about the mean of{' '}
              <Katex tex="100" /> of them, and averages vary much less than single values: the standard deviation of{' '}
              <Katex tex="\overline{X}" /> is <Katex tex="\tfrac{\sigma}{\sqrt n}=0.02887" />, ten times smaller. Using{' '}
              <Katex tex="\sigma" /> makes a sample mean <Katex tex="0.0275" /> below <Katex tex="0.5" /> look tiny, when
              for means of <Katex tex="100" /> it is almost a whole standard deviation.
            </p>
            <p>
              To catch it: the sample size <Katex tex="n=100" /> is in the question for a reason. If it never appeared in
              your working, you used the wrong standard deviation.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
