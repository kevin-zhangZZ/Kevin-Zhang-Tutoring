// 2022 Specialist NHT — Exam 1, Question 8 (6 marks). The NHT report gives sample answers only,
// with no statistics; its one note beyond the bare answer (part b.: σ_E > 0) is quoted as that
// part's examiner comment. Linear combinations of independent normal print runs: the mean and sd
// of S + D, the values of σ_E keeping sd(S + D + E) ≤ 60, then a sample size from a known-σ 95%
// confidence interval. Question text transcribed from the original paper. Answers checked with
// sympy and against the VCAA report's sample answers (4500 and 50; σ_E ∈ (0, √1100]; n = 16).
// The report's part a. working writes Var(S) + Var(D) = 30² + 40², the two variances in the
// opposite order to S and D; the sum is the same. Solution is original. Widget:
// interactives/spec-2022nhte1-q8b-pythagoras.tsx (sds of independent variables combine like
// perpendicular sides: 40, 30, 50, then σ_E against the radius-60 arc).

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const PythagorasWidget = lazyWidget(() => import('../interactives/spec-2022nhte1-q8b-pythagoras'))

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      Note that <Katex tex="\sigma_E>0" />, as <Katex tex="E" /> is a normally distributed random variable.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="S\sim N\!\left(2000,\,40^2\right),\quad D\sim N\!\left(2500,\,30^2\right)" />,
    reason: <>Name the random variables: <Katex tex="S" /> and <Katex tex="D" /> are the print runs (in pages) of one Standard and one Deluxe cartridge. Used in succession, the total number of pages is <Katex tex="S+D" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{E}(S+D) &= \text{E}(S)+\text{E}(D) \\ &= 2000+2500 = 4500 \end{aligned}" />,
    reason: <>Means always add, whether or not the variables are independent.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\operatorname{Var}(S+D) &= \operatorname{Var}(S)+\operatorname{Var}(D) \\ &= 40^2+30^2 = 1600+900 = 2500\end{aligned}" />,
    reason: <>The question says the print runs are <b>independent</b>, so the <b>variances</b> add. Each variance is the standard deviation squared.</>,
  },
  {
    working: <Katex display tex="\text{sd}(S+D) = \sqrt{2500} = 50" />,
    reason: <>The standard deviation is the square root of the variance.</>,
    more: <>A 3–4–5 triangle in disguise: <Katex tex="\sqrt{30^2+40^2}=50" />. Standard deviations of independent variables combine like the two shorter sides of a right-angled triangle, which the widget in part b shows.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned} \text{E}(S+D) &= 4500\text{ pages} \\ \text{sd}(S+D) &= 50\text{ pages} \end{aligned}}" />,
    reason: <>Both quantities the question asks for, in pages.</>,
    more: <>Sanity check: 50 is more than either sd alone (two uncertain print runs are more uncertain than one) but less than <Katex tex="40+30=70" />, because some of the variation in one cartridge cancels against the other.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \operatorname{Var}(S+D+E) &= 40^2+30^2+\sigma_E^2 \\ &= 2500+\sigma_E^2 \end{aligned}" />,
    reason: <>The three print runs are independent, so the three variances add. The first two together are 2500 from part a.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{sd}(S+D+E)\le60 \\ \iff &2500+\sigma_E^2 \le 60^2 = 3600 \end{aligned}" />,
    reason: <>Both sides are positive, so squaring keeps the inequality the same way round: the sd is at most 60 exactly when the variance is at most <Katex tex="60^2" />.</>,
  },
  {
    working: <Katex display tex="\sigma_E^2 \le 1100 \implies \sigma_E \le \sqrt{1100} = 10\sqrt{11}" />,
    reason: <><Katex tex="\sigma_E" /> is a standard deviation, so it isn&apos;t negative, and we can take the positive square root. <Katex tex="\sqrt{1100}=\sqrt{100\times11}=10\sqrt{11}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0<\sigma_E\le10\sqrt{11}}" />,
    reason: <>VCAA writes this as <Katex tex="\sigma_E\in\left(0,\sqrt{1100}\right]" />. The left end is open: a normal distribution has a positive standard deviation (with <Katex tex="\sigma_E=0" /> every Elite cartridge would print exactly the same number of pages, and <Katex tex="E" /> wouldn&apos;t be normal). The right end is closed because the question says &ldquo;less than <b>or equal to</b>&rdquo; 60.</>,
    more: <><Katex tex="10\sqrt{11}\approx33.2" /> pages. Check: with <Katex tex="\sigma_E=10\sqrt{11}" />, the variance is <Katex tex="2500+1100=3600" /> and the sd is exactly 60.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\bar x = \frac{1960.4+1999.6}{2} = 1980" />,
    reason: <>A confidence interval for <Katex tex="\mu" /> is <Katex tex="\left(\bar x-z\tfrac{\sigma}{\sqrt n},\ \bar x+z\tfrac{\sigma}{\sqrt n}\right)" />, symmetric about the sample mean, so the centre is <Katex tex="\bar x" />. We don&apos;t actually need it to find <Katex tex="n" />, only the half-width.</>,
  },
  {
    working: <Katex display tex="z\frac{\sigma}{\sqrt n} = \frac{1999.6-1960.4}{2} = \frac{39.2}{2} = 19.6" />,
    reason: <>The margin of error is half the width of the interval.</>,
  },
  {
    working: <Katex display tex="z = 1.96,\quad \sigma = 40" />,
    reason: <>For 95% confidence, <Katex tex="\Pr(-z<Z<z)=0.95" /> gives <Katex tex="z\approx1.96" />, &ldquo;<Katex tex="z" /> correct to two decimal places&rdquo; as the question says. <Katex tex="\sigma=40" /> is the known population sd of the Standard cartridge.</>,
  },
  {
    working: <Katex display tex="1.96\times\frac{40}{\sqrt n} = 19.6 \implies \frac{40}{\sqrt n} = 10" />,
    reason: <>Divide both sides by 1.96: <Katex tex="\tfrac{19.6}{1.96}=10" />. The numbers are chosen so this is exact.</>,
  },
  {
    working: <Katex display tex="\sqrt n = 4 \implies \boxed{n = 16}" />,
    reason: <>Rearrange <Katex tex="\frac{40}{\sqrt n}=10" /> to <Katex tex="\sqrt n=\frac{40}{10}=4" />, then square both sides. <Katex tex="n" /> is a sample size, so it must be a positive whole number, and 16 is.</>,
    more: <>Sanity check: a sample of 16 has <Katex tex="\tfrac{\sigma}{\sqrt n}=\tfrac{40}{4}=10" />, and <Katex tex="1980\pm1.96\times10=1980\pm19.6" /> gives back <Katex tex="(1960.4,\ 1999.6)" />.</>,
  },
]

export default function SpecialistQ8_2022NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (6 marks)</p>
        <p>
          A printer can use three types of ink cartridges: Standard, Deluxe and Elite. The Standard cartridge has a mean
          print run (the average number of pages that can be printed before all of the ink has been used up) of 2000
          pages with a standard deviation of 40 pages. The mean print run of the Deluxe cartridge is 2500 pages with a
          standard deviation of 30 pages. The mean print run of the Elite cartridge is <Katex tex="\mu_E" /> pages with a
          standard deviation of <Katex tex="\sigma_E" /> pages. The print runs of each type of cartridge are normally
          distributed and independent.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Linear Combinations"
        marks={2}
        statement={
          <>
            Find the expected print run and the standard deviation when one Standard cartridge and one Deluxe cartridge
            are used in succession (that is, one is used after the other is finished).
          </>
        }
      >
        <Background>
          <p>
            For any random variables, <Katex tex="\text{E}(X+Y)=\text{E}(X)+\text{E}(Y)" />. If <Katex tex="X" /> and{' '}
            <Katex tex="Y" /> are also <b>independent</b>, <Katex tex="\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)" />.
            Standard deviations never add directly: square them to get variances, add those, then take the square root.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Add the two standard deviations"
          working={<Katex display tex="\text{sd}(S+D) = 40+30 = 70" />}
        >
          <Katex tex="\sqrt{40^2+30^2}\ne40+30" />. It is the variances that add for independent variables, so square,
          add, and square-root. A quick check: the sd of a sum of independent variables is always less than the sum of
          their sds (here 50, not 70).
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Linear Combinations"
        marks={2}
        statement={
          <>
            One of each of the three types of cartridges is used in succession.
            <br />
            For what values of <Katex tex="\sigma_E" /> is the standard deviation of the print run for this situation
            less than or equal to 60?
          </>
        }
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Standard deviations of independent variables combine like the sides of a right-angled triangle">
          <PythagorasWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="c"
        topic="Confidence Interval"
        marks={2}
        statement={
          <>
            A person knows that the standard deviation of the print run of the Standard cartridge is 40 but this person
            does not know the mean. A random sample of <Katex tex="n" /> Standard cartridges is selected and these
            cartridges are used in the printer in succession. The 95% confidence interval, using <Katex tex="z" /> correct
            to two decimal places, for the mean print run based on this sample is (1960.4, 1999.6).
            <br />
            Find the value of <Katex tex="n" />.
          </>
        }
      >
        <Background>
          <p>
            When the population standard deviation <Katex tex="\sigma" /> is known, an approximate 95% confidence interval
            for the population mean is <Katex tex="\left(\bar x-1.96\tfrac{\sigma}{\sqrt n},\ \bar x+1.96\tfrac{\sigma}{\sqrt n}\right)" />.
            The interval is centred on the sample mean, and its half-width (the margin of error) shrinks as{' '}
            <Katex tex="\sqrt n" /> grows. Given the interval, its half-width gives an equation for <Katex tex="n" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
