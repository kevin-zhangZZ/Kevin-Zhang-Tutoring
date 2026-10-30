// 2023 Specialist NHT — Exam 1, Question 2 (4 marks). The NHT report gives sample answers only,
// with no statistics, and no notes. Sum of two independent normal variables: E(C), Var(C) and a
// tail probability Pr(C > 4) from the given Pr(−2 ≤ Z ≤ 2) = 0.9545 and symmetry. Question text
// transcribed from the original paper. Answers checked with sympy/arithmetic and against the
// report's sample answers (3; 0.25; 0.023). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{E}(C)=\text{E}(V+M)=\text{E}(V)+\text{E}(M)" />,
    reason: <>The expected value of a sum is the sum of the expected values (this holds for any random variables).</>,
  },
  {
    working: <Katex display tex="\boxed{\text{E}(C)=1+2=3\text{ hours}}" />,
    reason: <>On average, vacuuming takes 1 hour and mopping 2 hours, so cleaning takes 3 hours on average.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{Var}(C)=\operatorname{Var}(V)+\operatorname{Var}(M)" />,
    reason: <>The question says the mopping time is <b>independent</b> of the vacuuming time, so the variances add.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&=0.3^2+0.4^2\\&=0.09+0.16\end{aligned}" />,
    reason: <>Each variance is its standard deviation squared.</>,
  },
  {
    working: <Katex display tex="\boxed{\operatorname{Var}(C)=0.25}" />,
    reason: <>As required.</>,
    more: <>So <Katex tex="\text{sd}(C)=\sqrt{0.25}=0.5" /> hours, which part c. needs. It is a 3–4–5 triangle scaled by 0.1: <Katex tex="\sqrt{0.3^2+0.4^2}=0.5" />, less than <Katex tex="0.3+0.4" /> because standard deviations do not simply add.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="C\sim N\!\left(3,\ 0.5^2\right)" />,
    reason: <>A sum of independent normal random variables is itself normal. Its mean and variance come from parts a. and b., so the standard deviation is <Katex tex="\sqrt{0.25}=0.5" />.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{not finished by 1.00 pm})=\Pr(C>4)" />,
    reason: <>From 9.00 am to 1.00 pm is 4 hours. The cleaning is not finished by then exactly when it takes more than 4 hours.</>,
  },
  {
    working: <Katex display tex="\Pr(C>4)=\Pr\!\left(Z>\frac{4-3}{0.5}\right)=\Pr(Z>2)" />,
    reason: <>Standardise with <Katex tex="z=\tfrac{c-\mu}{\sigma}" />: 4 hours is exactly two standard deviations above the mean, which is why the question gives <Katex tex="\Pr(-2\le Z\le2)" />.</>,
  },
  {
    working: <Katex display tex="\Pr(Z>2)=\frac{1-0.9545}{2}=\frac{0.0455}{2}=0.02275" />,
    reason: <>The probability outside <Katex tex="[-2,2]" /> is <Katex tex="1-0.9545" />, and by the symmetry of the standard normal curve half of it lies above 2 and half below <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(C>4)\approx0.023}" />,
    reason: <>Round 0.02275 to three decimal places, as the question asks.</>,
    more: <>Sanity check: about 2% of the time Sam takes longer than mean plus two standard deviations, which matches the &ldquo;95% within two standard deviations&rdquo; rule (5% outside, half of it on the high side).</>,
  },
]

export default function SpecialistQ2_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (4 marks)</p>
        <p>
          The time taken for Sam to vacuum the house, <Katex tex="V" /> hours, is normally distributed
          with a mean of 1 hour and a standard deviation of 0.3 hours. The time taken for Sam to mop the
          floor, <Katex tex="M" /> hours, is independent of the time taken to vacuum and is normally
          distributed with a mean of 2 hours and a standard deviation of 0.4 hours. The time taken for
          Sam to clean the house, <Katex tex="C" /> hours, is the sum of the times taken to vacuum and to
          mop, <Katex tex="V+M=C" />.
        </p>
      </div>

      <PartCard letter="a" topic="Linear Combinations" marks={1} statement={<>Find the expected value of <Katex tex="C" />.</>}>
        <Background>
          <p>
            For any random variables <Katex tex="\text{E}(X+Y)=\text{E}(X)+\text{E}(Y)" />. If they are
            also independent, <Katex tex="\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)" />,
            and if they are normal, <Katex tex="X+Y" /> is normal too.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Linear Combinations" marks={1} statement={<>Show that the variance of <Katex tex="C" /> is 0.25</>}>
        <WorkingTable rows={ROWS_B} />
        <WrongMethod title="Add the standard deviations, then square" working={<Katex display tex="(0.3+0.4)^2=0.49" />}>
          Standard deviations of independent variables never add. Square each one first to get the
          variances, and add those: <Katex tex="0.09+0.16=0.25" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Normal Distribution"
        marks={2}
        statement={
          <>
            Sam wants to clean the house before a friend visits at 1.00 pm.
            <br />
            If Sam starts cleaning at 9.00 am, what is the probability that the cleaning will not be
            finished by 1.00 pm? Use <Katex tex="\Pr(-2\le Z\le2)=0.9545" /> and give your answer correct
            to three decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
        <WrongMethod title="Divide by the variance instead of the standard deviation" working={<Katex display tex="\Pr\!\left(Z>\frac{4-3}{0.25}\right)=\Pr(Z>4)" />}>
          The <Katex tex="z" />-score divides by the standard deviation, <Katex tex="\sqrt{0.25}=0.5" />,
          not the variance. A <Katex tex="z" /> of 4 also leaves you with no way to use the given
          probability, which is a strong hint that something has gone wrong.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
