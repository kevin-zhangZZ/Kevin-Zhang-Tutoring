// 2024 Mathematical Methods NHT — Exam 1, Question 5 (4 marks). The NHT report gives sample
// answers only, with no statistics; its notes on parts a. (the sd formula is on the formula
// sheet) and b. (probability beyond one standard deviation) are quoted as those parts' examiner
// comments. The sampling distribution of a sample proportion (p = 0.9, n = 100), then a normal
// approximation using the given Pr(Z > −1) ≈ 0.84. Question text transcribed from the original
// paper. Answers checked with sympy and against the VCAA report's sample answers (0.9 and 0.03;
// 0.16). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT_A: SAExaminerStats = {
  comment: <>The formula for standard deviation is on the formula sheet.</>,
}

const REPORT_B: SAExaminerStats = {
  comment: <>This question required finding the probability beyond one standard deviation from the mean.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="p=0.9,\quad n=100" />,
    reason: <>The population proportion of seeds that grow is 90%, and each sample has 100 seeds.</>,
  },
  {
    working: <Katex display tex="\text{E}(\hat P)=p=0.9" />,
    reason: <>The sample proportion is centred on the population proportion: on average, samples get it right.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{sd}(\hat P)&=\sqrt{\frac{p(1-p)}{n}}=\sqrt{\frac{0.9\times0.1}{100}}\\ &=\sqrt{\frac{0.09}{100}}=\frac{0.3}{10}=0.03\end{aligned}" />,
    reason: <>The formula is on the formula sheet. <Katex tex="\sqrt{0.09}=0.3" /> and <Katex tex="\sqrt{100}=10" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{E}(\hat P)=0.9,\quad \text{sd}(\hat P)=0.03}" />,
    reason: <>VCAA also writes the sd as <Katex tex="\tfrac{3}{100}" />; both forms are exact.</>,
    more: <>Sanity check: a typical sample proportion is within a few hundredths of 0.9 (about 87 to 93 seeds in 100), which is plausible.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\hat P\overset{\text{approx}}{\sim}N\!\left(0.9,\ 0.03^2\right)" />,
    reason: <>The question says to use a normal approximation, with the mean and sd from part a.</>,
  },
  {
    working: <Katex display tex="\text{more than 93 of 100 seeds}\iff \hat P>0.93" />,
    reason: <>Convert the count to a proportion: <Katex tex="\tfrac{93}{100}=0.93" />.</>,
    more: <>The normal approximation treats <Katex tex="\hat P" /> as continuous, so &ldquo;more than&rdquo; and &ldquo;at least&rdquo; give the same answer here. No continuity correction is used in Methods.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(\hat P>0.93)&=\Pr\!\left(Z>\frac{0.93-0.9}{0.03}\right)\\ &=\Pr(Z>1)\end{aligned}" />,
    reason: <>Standardise: <Katex tex="z=\tfrac{x-\mu}{\sigma}" />. 0.93 is exactly one standard deviation above the mean.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(Z>1)&=\Pr(Z<-1)\\ &=1-\Pr(Z>-1)\\ &\approx1-0.84\end{aligned}" />,
    reason: <>The standard normal curve is symmetric about 0, so the tail above 1 matches the tail below <Katex tex="-1" />. That tail is everything except <Katex tex="\Pr(Z>-1)" />, which the question gives.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(\hat P>0.93)\approx0.16}" />,
    reason: <>Correct to two decimal places, as asked.</>,
    more: <>Sanity check: about 68% of a normal distribution is within one sd of the mean, leaving about 16% in each tail.</>,
  },
]

export default function MethodsQ5_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (4 marks)</p>
        <p>
          In a nursery, 90% of the seeds will grow into seedlings. Let <Katex tex="\hat P" /> be the random variable
          representing the sample proportion of seeds that will grow into seedlings for samples of size 100.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Sample Proportion"
        marks={2}
        statement={<>Find the mean and standard deviation of <Katex tex="\hat P" />.</>}
        examinerReport={REPORT_A}
      >
        <Background>
          <p>
            <Katex tex="\hat P" /> is the proportion of &ldquo;successes&rdquo; in a random sample. Different samples
            give different values, so <Katex tex="\hat P" /> has its own distribution: mean <Katex tex="p" /> (the
            population proportion) and standard deviation <Katex tex="\sqrt{\tfrac{p(1-p)}{n}}" />, which shrinks as
            the sample size <Katex tex="n" /> grows.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Standardising"
        marks={2}
        statement={
          <>
            Let <Katex tex="Z" /> be the standard normal random variable such that <Katex tex="Z\sim N(0,1)" /> and{' '}
            <Katex tex="\Pr(Z>-1)\approx0.84" />.
            <br />
            <br />
            Using a normal approximation of <Katex tex="\hat P" />, estimate the probability that in a sample of 100,
            more than 93 seeds will grow into seedlings. Give your answer correct to two decimal places.
          </>
        }
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Use the given 0.84 directly"
          working={<Katex display tex="\Pr(Z>1)\approx0.84" />}
        >
          The given value is for <Katex tex="Z>-1" />, the large region to the right of <Katex tex="-1" />. The
          region to the right of <Katex tex="+1" /> is a small tail, so its probability must be well under 0.5. Sketch
          the bell curve and shade both regions before writing a number.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
