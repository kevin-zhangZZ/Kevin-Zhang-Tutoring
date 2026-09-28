// 2018 Specialist Mathematics — Exam 2, MCQ 19. VCAA examination report: 57% correct.
// A probability about the sample mean, using the distribution of X̄ rather than X itself.
// Question text transcribed from the original paper; solution is original. Value checked
// (0.95323); agrees with itute (E). Distractors verified numerically: C = Pr(X > 65) with sd 4/3
// (0.77337); B and D = the variance 16/9 used as the sd, without / with the ÷√5 (0.71311,
// 0.89577). A (0.5000) has no clean slip and is not attributed.
//
// Interactive (extras): interactives/spec-2018-mcq19-averaging — the curve of X̄ for n cats over
// the dashed one-cat curve, area above 65 shaded; n = 1 gives option C, n = 5 option E. Its toggle
// treats 16/9 as the standard deviation (options B and D).
// WrongMethods: the one-cat distribution (option C, 25%) and 16/9 as the sd (options B and D).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const Averaging = lazyWidget(() => import('../interactives/spec-2018-mcq19-averaging'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 7, C: 25, D: 7, E: 57 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim N(\mu, \sigma^2), \qquad \mu=66, \ \sigma^2=\frac{16}{9}" />,
    reason: <>The gestation period of a single cat. The question gives the <em>variance</em>, so the standard deviation is <Katex tex="\sigma=\sqrt{\tfrac{16}{9}}=\tfrac43" />; the CAS wants the standard deviation, never the variance.</>,
  },
  {
    working: <Katex display tex="\bar X \sim N\!\left(\mu, \frac{\sigma^2}{n}\right), \qquad n=5" />,
    reason: <>How would I know this is the distribution to use? The question asks about the <em>average</em> of a sample of five cats, not one cat. The average of five independent cats is still centred on <Katex tex="66" />, but it is less spread, because long and short gestations in the same sample cancel.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} \mathrm{Var}(\bar X) &= \frac{16/9}{5} \\ &= \frac{16}{45} \end{aligned}" />
        <Katex display tex="\begin{aligned} \mathrm{sd}(\bar X) &= \sqrt{\frac{16}{45}} \\ &= \frac{4}{3\sqrt5} \end{aligned}" />
      </>
    ),
    reason: <>Divide the <em>variance</em> by <Katex tex="n" />, or equivalently the standard deviation by <Katex tex="\sqrt n" />: <Katex tex="\tfrac{4/3}{\sqrt5}\approx0.596" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\Pr(\bar X > 65) = \Pr\!\left(Z > \frac{65-66}{4/(3\sqrt5)}\right)" />
        <Katex display tex="= \Pr\bigl(Z > -0.75\sqrt5\bigr) = \Pr(Z>-1.677)" />
      </>
    ),
    reason: <>Standardise using the standard deviation of the sample mean, not of one cat. On CAS you can skip the <Katex tex="z" /> step: <Cas fn="normCdf">normCdf(65, ∞, 66, (4/3)/√5)</Cas>.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(Z>-1.677) \approx 0.9532}" />,
    reason: <>Matches option <b>E</b>. Option <b>C</b> <Katex tex="(0.7734)" /> is <Katex tex="\Pr(X>65)" /> for a single cat: the standard deviation <Katex tex="\tfrac43" /> never divided by <Katex tex="\sqrt5" />. Options <b>B</b> <Katex tex="(0.7131)" /> and <b>D</b> <Katex tex="(0.8958)" /> use the variance <Katex tex="\tfrac{16}{9}" /> as if it were the standard deviation, without and with the <Katex tex="\div\sqrt5" />. Sense check: the average of five cats sticks closer to <Katex tex="66" /> than one cat does, so its probability of being above <Katex tex="65" /> must be <em>bigger</em> than one cat's <Katex tex="0.7734" />.</>,
  },
]

export default function SpecialistQ19_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The gestation period of cats is normally distributed with mean <Katex tex="\mu=66" /> days and
            variance <Katex tex="\sigma^2=\dfrac{16}{9}" />.
          </p>
          <p>
            The probability that a sample of five cats chosen at random has an average gestation period
            greater than 65 days is closest to
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.5000" /> },
        { letter: 'B', content: <Katex tex="0.7131" /> },
        { letter: 'C', content: <Katex tex="0.7734" /> },
        { letter: 'D', content: <Katex tex="0.8958" /> },
        { letter: 'E', content: <Katex tex="0.9532" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Why an average varies less than one value">
          <p>
            If <Katex tex="X_1, \ldots, X_5" /> are five independent cats, each with variance <Katex tex="\sigma^2" />,
            their sum has variance <Katex tex="5\sigma^2" /> (variances of independent variables add). The average is
            the sum divided by <Katex tex="5" />, and dividing a variable by <Katex tex="5" /> divides its variance by{' '}
            <Katex tex="5^2" />:
          </p>
          <Katex display tex="\mathrm{Var}(\bar X) = \frac{5\sigma^2}{25} = \frac{\sigma^2}{5}, \qquad \mathrm{sd}(\bar X) = \frac{\sigma}{\sqrt5}" />
          <p>
            So whenever a question says <em>sample</em>, <em>average</em> or <em>mean of n</em>, switch to{' '}
            <Katex tex="\bar X" /> and divide the standard deviation by <Katex tex="\sqrt n" /> before doing anything else.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Why the average of five cats rarely falls below 65">
            <Averaging />
          </Explore>
          <WrongMethod
            title="Use the cats' own distribution, sd = 4/3"
            source="25% chose C"
            working={<Katex display tex="\Pr(X>65) = \Pr\!\left(Z>\tfrac{65-66}{4/3}\right) \approx 0.7734" />}
          >
            <p>
              That is the chance that <em>one</em> cat's gestation exceeds <Katex tex="65" /> days. The question is about
              the average of five, which has standard deviation <Katex tex="\tfrac{4/3}{\sqrt5}\approx0.596" />, so{' '}
              <Katex tex="65" /> is <Katex tex="1.68" /> standard deviations below the mean instead of <Katex tex="0.75" />.
              To catch it, underline the word <em>average</em> in the question: it means <Katex tex="\bar X" />.
            </p>
          </WrongMethod>
          <WrongMethod
            title="The 16/9 is the standard deviation"
            source="7% chose B, 7% chose D"
            working={
              <>
                <Katex display tex="\Pr\!\left(Z>\tfrac{-1}{16/9}\right) \approx 0.7131" />
                <Katex display tex="\Pr\!\left(Z>\tfrac{-1}{(16/9)/\sqrt5}\right) \approx 0.8958" />
              </>
            }
          >
            <p>
              <Katex tex="\sigma^2" /> is the variance, and the question labels it that way. Take the square root first:{' '}
              <Katex tex="\sigma=\tfrac43" />. A CAS normal command asks for <Katex tex="\sigma" />, so feeding it{' '}
              <Katex tex="\tfrac{16}{9}" /> makes every curve too wide.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
