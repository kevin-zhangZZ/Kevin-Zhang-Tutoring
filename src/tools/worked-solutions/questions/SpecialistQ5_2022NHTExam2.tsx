// 2022 Specialist NHT — Exam 2, Section B Question 5 (10 marks). The NHT report gives sample
// answers only, with no statistics. Ball-bearing diameters: the sampling distribution of the
// mean of 10, a one-tailed test (hypotheses, p value, conclusion, the largest sample mean that
// keeps H0), control limits a and b that each cut off 1%, and a binomial count of how many of
// five sample means fall outside them. Question text transcribed from the original paper (no
// diagram). Answers checked with scipy and against the VCAA report's sample answers: a. 0.5 and
// 0.0016; c. 0.425 (0.426 also accepted, which is what the rounded sd 0.0016 gives); e. 0.5026;
// f. 0.496, 0.504; g. 0.092. The report prints its answer to a. as "x̄ = 0.5, s = 0.0016"; the
// working says so. The two WrongMethods in g. are verified slips (0.054, 0.048), not taken from
// the report, which has no comments. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\bar X \sim \mathrm{N}\!\left(0.5,\ \frac{0.005^2}{10}\right)" />,
    reason: <>The diameters are normal with <Katex tex="\mu=0.5" /> and <Katex tex="\sigma=0.005" />, so the mean of a sample of <Katex tex="n=10" /> is normal with the same mean and variance <Katex tex="\tfrac{\sigma^2}{n}" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}\left(\bar X\right) = 0.5 \ \text{cm}" />,
    reason: <>Sample means centre on the population mean.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}\left(\bar X\right) = \frac{0.005}{\sqrt{10}} = 0.0015811\ldots" />,
    reason: <>The standard deviation of the sample mean is <Katex tex="\tfrac{\sigma}{\sqrt n}" />: averaging 10 bearings smooths out the variation by a factor of <Katex tex="\sqrt{10}\approx3.16" />.</>,
    more: <>Keep the unrounded value (or the exact <Katex tex="\tfrac{0.005}{\sqrt{10}}" />) for every later part. Using the rounded 0.0016 instead is why VCAA also accepted 0.426 in part c.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{mean } 0.5 \text{ cm}, \quad \text{sd} \approx 0.0016 \text{ cm}}" />,
    reason: <>Standard deviation correct to four decimal places, as asked. VCAA writes these as <Katex tex="\bar x=0.5" />, <Katex tex="s=0.0016" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{H_0: \ \mu = 0.5, \qquad H_1: \ \mu > 0.5}" />,
    reason: <>Let <Katex tex="\mu" /> be the mean diameter (in cm) of all the ball bearings the machine now produces. <Katex tex="H_0" /> is the calibrated value. The test is whether the mean is now <em>greater</em> than 0.5 cm, so <Katex tex="H_1" /> is one-sided: <Katex tex="\mu>0.5" />.</>,
    more: <>Hypotheses are about the population mean <Katex tex="\mu" />, never the sample mean 0.5003, which is already known. Writing <Katex tex="\mu\ne0.5" /> would set up a two-tailed test, which is not what the stem describes.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="p = \Pr\!\left(\bar X \ge 0.5003 \ \middle|\ \mu = 0.5\right)" />,
    reason: <>The <Katex tex="p" /> value is the probability, assuming <Katex tex="H_0" /> is true, of a sample mean at least as extreme as the one observed. <Katex tex="H_1" /> is <Katex tex="\mu>0.5" />, so &ldquo;extreme&rdquo; means <em>high</em>: the upper tail.</>,
  },
  {
    working: (
      <Cas fn="normCdf">
        normCdf(0.5003, ∞, 0.5, 0.005/√10)
      </Cas>
    ),
    reason: <>The upper tail from the observed 0.5003, with the mean and standard deviation of <Katex tex="\bar X" /> from part a.</>,
    more: <>Standardised: <Katex tex="z=\tfrac{0.5003-0.5}{0.0015811}=0.190" />, so the sample mean is less than a fifth of a standard deviation above 0.5.</>,
  },
  {
    working: <Katex display tex="\boxed{p \approx 0.425}" />,
    reason: <><Katex tex="p=0.4247\ldots" />, correct to three decimal places.</>,
    more: <>VCAA also accepted 0.426, which is what the rounded standard deviation 0.0016 gives. Sanity check: 0.5003 is very close to 0.5, so a sample mean that high is common under <Katex tex="H_0" />: a <Katex tex="p" /> value a little under 0.5 makes sense.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="p = 0.425 > 0.05" />,
    reason: <>Compare the <Katex tex="p" /> value with the 5% significance level. Only a <Katex tex="p" /> value below 0.05 is evidence against <Katex tex="H_0" />. This comparison is the &ldquo;reason involving <Katex tex="p" />&rdquo; the question asks for.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{As } p > 0.05, \text{ do not reject } H_0\text{:} \\ \text{no evidence that the mean} \\ \text{diameter is greater than } 0.5 \text{ cm}\end{gathered}}" />,
    reason: <>Not rejecting <Katex tex="H_0" /> means the sample is consistent with the machine still being correctly calibrated, so on this evidence it does not need resetting.</>,
    more: <>&ldquo;Do not reject&rdquo; is not the same as &ldquo;accept&rdquo;: the test hasn&apos;t shown <Katex tex="\mu=0.5" />, only that a sample mean of 0.5003 is entirely ordinary if it is.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr\!\left(\bar X > c \ \middle|\ \mu = 0.5\right) = 0.05" />,
    reason: <>The higher the sample mean, the smaller its <Katex tex="p" /> value. <Katex tex="H_0" /> survives while <Katex tex="p\ge0.05" />, so the largest sample mean that keeps it is the one whose upper-tail area is exactly 0.05. Call it <Katex tex="c" />.</>,
    more: <>This is part c. run backwards: there the sample mean was known and the tail area found; here the tail area 0.05 is known and the sample mean is found.</>,
  },
  {
    working: (
      <Cas fn="invNorm">
        invNorm(0.95, 0.5, 0.005/√10)
      </Cas>
    ),
    reason: <>invNorm takes the area to the <em>left</em>, and an upper tail of 0.05 leaves 0.95 to the left.</>,
  },
  {
    working: <Katex display tex="c = 0.50260\ldots" />,
    reason: <>Equivalently <Katex tex="c=0.5+1.6449\times\tfrac{0.005}{\sqrt{10}}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0.5026 \ \text{cm}}" />,
    reason: <>Correct to four decimal places.</>,
    more: <>Check: <Katex tex="c" /> must be above the observed 0.5003 (which was not rejected in part d.), and it is.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\bar X \sim \mathrm{N}\!\left(0.5,\ \left(\tfrac{0.005}{\sqrt{10}}\right)^2\right)" />,
    reason: <>The machine is assumed to be on target, so this is the sampling distribution from part a.</>,
  },
  {
    working: (
      <>
        <Cas fn="invNorm">invNorm(0.01, 0.5, 0.005/√10)</Cas>
        <Katex display tex="a = 0.49632\ldots" />
      </>
    ),
    reason: <><Katex tex="\Pr(\bar X<a)=0.01" />: an area of 0.01 to the left of <Katex tex="a" />.</>,
  },
  {
    working: (
      <>
        <Cas fn="invNorm">invNorm(0.99, 0.5, 0.005/√10)</Cas>
        <Katex display tex="b = 0.50367\ldots" />
      </>
    ),
    reason: <><Katex tex="\Pr(\bar X>b)=0.01" /> leaves <Katex tex="0.99" /> to the left of <Katex tex="b" />.</>,
    more: <>By symmetry about the mean 0.5, <Katex tex="b=0.5+(0.5-a)" />, so one invNorm call is enough.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 0.496, \quad b = 0.504}" />,
    reason: <>Both correct to three decimal places.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr\!\left(\bar X \notin (a,b)\right) = 0.01+0.01 = 0.02" />,
    reason: <>By the definition of <Katex tex="a" /> and <Katex tex="b" /> in part f., a sample mean falls below <Katex tex="a" /> with probability 0.01 and above <Katex tex="b" /> with probability 0.01. Use these exact values, not the rounded <Katex tex="a" /> and <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="Y \sim \mathrm{Bi}(5,\ 0.02)" />,
    reason: <>Let <Katex tex="Y" /> be the number of the five sample means outside the interval. Five independent random samples, each either outside or not, with the same probability 0.02 each time: binomial.</>,
  },
  {
    working: <Katex display tex="\Pr(Y=1) = \binom{5}{1}(0.02)^1(0.98)^4" />,
    reason: <>&ldquo;Only one&rdquo; means exactly one.</>,
    more: <>On CAS this is <Cas fn="binomPdf">binomPdf(5, 0.02, 1)</Cas></>,
  },
  {
    working: <Katex display tex="\boxed{0.092}" />,
    reason: <><Katex tex="0.0922\ldots" />, correct to three decimal places.</>,
    more: <>Plausible: with only a 2% chance each, most days have no sample outside the interval (<Katex tex="0.98^5\approx0.904" />), and exactly one is the next most likely outcome.</>,
  },
]

export default function SpecialistQ5_2022NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (10 marks)</p>
        <p>
          A machine is calibrated to produce ball bearings such that their diameters are normally
          distributed with a mean of 0.5 cm and a standard deviation of 0.005 cm. To determine
          whether the machine is working correctly, random samples of 10 ball bearings are
          selected at various times and the mean diameter of the 10 ball bearings in each sample
          is calculated.
        </p>
        <p>
          For a particular sample of 10 ball bearings, the mean diameter is 0.5003 cm. It is
          proposed to carry out a statistical test at the 5% level of significance to determine
          whether the machine is now producing ball bearings with a mean diameter greater than
          0.5 cm and possibly needs resetting. Assume that the standard deviation is still
          0.005 cm.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Everything in this question is about <Katex tex="\bar X" />, the mean of a sample of
              10, not a single ball bearing. Its distribution is{' '}
              <Katex tex="\mathrm{N}\!\left(\mu,\tfrac{\sigma^2}{n}\right)" />: same centre, much
              narrower spread. Parts b.–e. are one hypothesis test using it; parts f.–g. use the same
              distribution as a quality-control rule, flagging any sample mean in the outer 1% at
              either end.
            </p>
            <p>
              Part g. then switches tools: once you know the chance that one sample mean is flagged,
              counting how many of five independent samples are flagged is a binomial question.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Sample Mean Distribution"
        marks={2}
        statement={
          <>
            Write down the mean and the standard deviation of the sampling distribution for
            samples of 10 ball bearings. Give the value of the standard deviation correct to four
            decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Hypotheses"
        marks={1}
        statement={<>Write down suitable null and alternative hypotheses for the statistical test.</>}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="p-Value"
        marks={1}
        statement={
          <>
            Find, correct to three decimal places, the <Katex tex="p" /> value for the statistical
            test.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Conclusion"
        marks={1}
        statement={
          <>
            Draw an appropriate conclusion about the hypotheses in <b>part b.</b> from the{' '}
            <Katex tex="p" /> value found in <b>part c.</b> Give a reason involving{' '}
            <Katex tex="p" /> for your conclusion.
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Critical Value"
        marks={1}
        statement={
          <>
            Find the largest sample mean of 10 ball bearings that could be observed for the null
            hypothesis not to be rejected at the 5% level of significance. Assume that the machine
            is still producing ball bearings with a standard deviation of 0.005 cm. Give your
            answer correct to four decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The settings of the machine will be checked if a sample mean <Katex tex="\bar x" /> of 10
          ball bearings falls outside the interval <Katex tex="(a,b)" />, where{' '}
          <Katex tex="\Pr\left(\bar x<a\right)=0.01" /> and{' '}
          <Katex tex="\Pr\left(\bar x>b\right)=0.01" />
        </p>
      </div>

      <PartCard
        letter="f"
        topic="Control Limits"
        marks={2}
        statement={
          <>
            Find the values of <Katex tex="a" /> and <Katex tex="b" />, correct to three decimal
            places, assuming that the machine is producing ball bearings with a mean diameter of
            0.5 cm and a standard deviation of 0.005 cm.
          </>
        }
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        topic="Binomial Probability"
        marks={2}
        statement={
          <>
            On a certain day, five random samples of 10 ball bearings are selected.
            <br />
            Find the probability that only one of the five sample means falls outside the interval
            found in <b>part f.</b> Give your answer correct to three decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_G} />
        <WrongMethod
          title="Recompute the chance of falling outside from the rounded a and b"
          working={<Katex display tex="\begin{gathered}\Pr(\bar X<0.496)+\Pr(\bar X>0.504) \\ \approx0.0114 \implies \Pr(Y=1)\approx0.054\end{gathered}" />}
        >
          Rounding <Katex tex="a" /> and <Katex tex="b" /> to three decimal places widens the interval
          noticeably compared with the spread of <Katex tex="\bar X" /> (its standard deviation is only
          about 0.0016), which nearly halves the tail probability. The interval was <em>defined</em> so
          that each tail is exactly 0.01, so the probability is exactly 0.02, with no calculation needed.
        </WrongMethod>
        <WrongMethod
          title="Use 0.01 as the probability of falling outside"
          working={<Katex display tex="\binom51(0.01)(0.99)^4\approx0.048" />}
        >
          0.01 is only one tail. &ldquo;Outside <Katex tex="(a,b)" />&rdquo; means below{' '}
          <Katex tex="a" /> <em>or</em> above <Katex tex="b" />, so add both tails: 0.02.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
