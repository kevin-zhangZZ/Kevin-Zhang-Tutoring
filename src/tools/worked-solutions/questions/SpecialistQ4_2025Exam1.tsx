// 2025 Specialist Mathematics — Exam 1 Question 4 (5 marks). A density needing partial
// fractions for its mean, then the distribution of a sample mean. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [32, 23, 9, 37],
  average: 1.5,
  comment: (
    <>
      Students should know how to find the expected value (mean) of a continuous random variable.
      This question required partial fractions to be applied. A small number of students did not
      realise this and were unable to progress with the problem. A significant number of responses
      were not awarded full marks, either because:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          the initial expression missed the ‘<Katex tex="t" />’ term on the numerator, or
        </li>
        <li>
          the coefficients for the partial fractions were incorrect, or
        </li>
        <li>
          the working towards the given answer was unclear.
        </li>
      </ul>
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [34, 17, 49],
  average: 1.2,
  comment: (
    <>
      Many students were able to find the mean and standard deviation of the sampling
      distribution. Some students drew a diagram to aid in identifying the required area under the
      standard normal curve. A common incorrect response was <Katex tex="0.16" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\mathrm{E}(T) &= \int_0^1 t\,f(t)\,dt \\ &= \frac{3}{2\log_e(2)}\int_0^1\frac{t}{(t+1)(2-t)}\,dt\end{aligned}" />,
    reason: <>The mean of a continuous random variable is <Katex tex="\int t\,f(t)\,dt" /> over where <Katex tex="f" /> is non-zero; the constant comes out front.</>,
    more: <>Don't drop the <Katex tex="t" /> on the numerator: without it you are integrating <Katex tex="f(t)" /> itself, which just gives <Katex tex="1" /> (total probability). The report lists missing the <Katex tex="t" /> as one reason responses were not awarded full marks.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{t}{(t+1)(2-t)} &= \frac{A}{t+1}+\frac{B}{2-t} \\ \implies t &= A(2-t)+B(t+1)\end{aligned}" />,
    reason: <>The numerator <Katex tex="t" /> isn't a multiple of the denominator's derivative <Katex tex="1-2t" />, so split into partial fractions over the two linear factors.</>,
    more: <>Multiplying both sides by <Katex tex="(t+1)(2-t)" /> clears the fractions, giving an identity true for every <Katex tex="t" />. The report notes a small number of students did not realise partial fractions were needed and could not progress. Whenever the reverse chain rule fails and the denominator factorises into distinct linear factors, reach for partial fractions.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} t=-1&: \ -1 = 3A \implies A = -\tfrac13 \\ t=2&: \ 2 = 3B \implies B = \tfrac23\end{aligned}" />,
    reason: <>Substituting <Katex tex="t=-1" /> makes the <Katex tex="B" /> term vanish, and <Katex tex="t=2" /> makes the <Katex tex="A" /> term vanish (<Katex tex="2-(-1)=3" />, <Katex tex="2+1=3" />).</>,
    more: <>Incorrect coefficients were one of the reasons the report gives for lost marks, so check with a third value: <Katex tex="t=0" /> gives <Katex tex="0 = 2A+B = -\tfrac23+\tfrac23" /> ✓.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\int_0^1\left(\frac{-\tfrac13}{t+1}+\frac{\tfrac23}{2-t}\right)dt \\ &= \left[-\tfrac13\log_e(t+1)-\tfrac23\log_e(2-t)\right]_0^1\end{aligned}" />,
    reason: <>Use <Katex tex="\int\frac{1}{2-t}\,dt = -\log_e(2-t)" />: the inner derivative is <Katex tex="-1" />, so a minus sign appears.</>,
    more: <>No absolute-value signs are needed: on <Katex tex="0\le t\le1" /> both <Katex tex="t+1" /> and <Katex tex="2-t" /> are positive. A quick check: differentiating <Katex tex="-\tfrac23\log_e(2-t)" /> gives <Katex tex="-\tfrac23\cdot\tfrac{-1}{2-t} = \tfrac{2/3}{2-t}" /> ✓.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&= \left(-\tfrac13\log_e(2)-0\right)-\left(0-\tfrac23\log_e(2)\right) \\ &= \tfrac13\log_e(2)\end{aligned}" />,
    reason: <>Substitute <Katex tex="t=1" /> then <Katex tex="t=0" />; <Katex tex="\log_e(1)=0" /> removes two of the four terms.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(T) = \frac{3}{2\log_e(2)}\times\frac{\log_e(2)}{3} = \frac12}" />,
    reason: <>Multiply by the constant taken out in the first line; the <Katex tex="\log_e(2)" /> and the <Katex tex="3" /> cancel. As required.</>,
    more: <>In a "show that" the answer is given, so the marks are for the working. The report lists "working towards the given answer was unclear" as a reason for lost marks — write every line above, including the substitution of both limits, rather than jumping to <Katex tex="\tfrac12" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}\overline{T} \sim \mathrm{N}\!\left(\mu,\ \frac{\sigma^2}{n}\right) \ \text{ approximately,} \\ \text{with } \mu = \tfrac12, \ \sigma = 0.3, \ n = 25\end{gathered}" />,
    reason: <>The stem says sample means are approximately normal; their mean is the population mean <Katex tex="\mu=\mathrm{E}(T)=\tfrac12" /> from part a.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}\!\left(\overline{T}\right) = \frac{0.3}{\sqrt{25}} = \frac{0.3}{5} = 0.06" />,
    reason: <>The standard deviation of a sample mean is <Katex tex="\sigma/\sqrt{n}" /> — divide by <Katex tex="\sqrt{n}" />, not by <Katex tex="n" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\Pr\!\left(0.44<\overline{T}<0.5\right) \\ &= \Pr\!\left(\frac{0.44-0.5}{0.06}<Z<\frac{0.5-0.5}{0.06}\right)\end{aligned}" />,
    reason: <>Standardise both endpoints with <Katex tex="z=\dfrac{x-\mu}{\mathrm{sd}}" />, using the sample mean's sd <Katex tex="0.06" />, not <Katex tex="0.3" />.</>,
  },
  {
    working: <Katex display tex="= \Pr(-1<Z<0)" />,
    reason: <><Katex tex="\tfrac{-0.06}{0.06}=-1" /> and <Katex tex="\tfrac{0}{0.06}=0" />: the interval runs from one sd below the mean up to the mean.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(-1<Z<0) &= \Pr(0<Z<1) \\ &= \Pr(Z<1)-\tfrac12\end{aligned}" />,
    reason: <>By symmetry of the standard normal about zero; the area left of <Katex tex="0" /> is <Katex tex="\tfrac12" />, so subtract it from <Katex tex="\Pr(Z<1)" />.</>,
    more: <>The report notes some students drew a diagram; it helps to shade the strip between <Katex tex="z=-1" /> and <Katex tex="z=0" />. The report's common incorrect response <Katex tex="0.16" /> is most likely <Katex tex="1-0.84 = \Pr(Z<-1)" />, the tail to the left of <Katex tex="-1" />, not the strip between <Katex tex="-1" /> and the mean. The strip and that tail together make up the left half, so <Katex tex="0.16+0.34=0.5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0.84-0.5 = 0.34}" />,
    reason: <>Using the given <Katex tex="\Pr(Z<1)=0.84" />.</>,
  },
]

export default function SpecialistQ4_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (5 marks)</p>
        <p>
          The waiting time, <Katex tex="T" /> hours, to see a particular doctor at a clinic
          has a distribution with a probability density function <Katex tex="f" /> defined by
        </p>
        <div className="py-1 hidden sm:block">
          <Katex
            display
            tex="f(t)=\begin{cases}\dfrac{3}{2\log_e(2)}\left(\dfrac{1}{(t+1)(2-t)}\right) & 0<t\le1\\[10pt] 0 & \text{elsewhere}\end{cases}"
          />
        </div>
        {/* Phone: same content, with the domain set under the rule so it fits the width. */}
        <div className="py-1 sm:hidden">
          <Katex
            display
            tex="f(t)=\begin{cases}\dfrac{3}{2\log_e(2)}\left(\dfrac{1}{(t+1)(2-t)}\right) \\[4pt] \qquad 0<t\le1\\[10pt] 0 \qquad \text{elsewhere}\end{cases}"
          />
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Plan for part a: write <Katex tex="\mathrm{E}(T)" /> as an integral, split the
              integrand by partial fractions, and integrate each piece to a logarithm.
            </p>
            <p>
              The constant <Katex tex="\tfrac{3}{2\log_e 2}" /> looks forbidding but is chosen
              so <Katex tex="f" /> integrates to <Katex tex="1" /> (total probability); in the mean it
              simply multiplies the final integral.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Expected Value"
        marks={3}
        statement={<>Use integration to show that <Katex tex="\mathrm{E}(T)=\tfrac12" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sample Mean"
        marks={2}
        statement={
          <>
            For random samples of 25 waiting times, it may be assumed that the sample means
            are approximately normally distributed.
            <br />
            Find the probability that the average waiting time for a random sample of 25
            patients is between 0.44 hours and 0.5 hours.
            <br />
            Use <Katex tex="\sigma=0.3" /> and <Katex tex="\Pr(Z<1)=0.84" />
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
