// 2021 Mathematical Methods — Exam 2, Section B Question 4 (14 marks). A table-tennis ball
// machine: a normal model, a sample proportion, then a piecewise density function and a
// transformation of it. Question text transcribed from the original paper. Answers checked
// with sympy/scipy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_A: SAExaminerStats = {
  marks: [22, 78],
  average: 0.8,
  comment: <>This question was answered well. A common error was 0.228.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [36, 64],
  average: 0.7,
  comment: <>Some students rounded their answer to 10.6.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [44, 24, 33],
  average: 0.9,
  comment: (
    <>
      Exact answers were required. <Katex tex="E\!\left(\hat P\right)=2" /> and{' '}
      <Katex tex="\mathrm{sd}\!\left(\hat P\right)=\tfrac{\sqrt{46}}{25}" /> were often seen.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [42, 18, 40],
  average: 1,
  comment: (
    <>
      Some students gave the correct <Katex tex="n" /> and <Katex tex="p" /> values but not
      the final answer. Others wrote <Katex tex="\Pr(X>3)" /> instead of{' '}
      <Katex tex="\Pr(X\ge3)" />.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [79, 21],
  average: 0.2,
  comment: <>A common incorrect answer was 0.04.</>,
}

const EXAM_F: SAExaminerStats = {
  marks: [51, 11, 37],
  average: 0.9,
  comment: (
    <>
      Some students worked out the mean and not the median. Others set up the hybrid
      function incorrectly. Students who used <Katex tex="f(x)" /> when writing out the
      definite integral were more successful. Students should define the hybrid function on
      their technology to save time.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [53, 9, 6, 32],
  average: 1.2,
  comment: (
    <>
      Some students worked out the variance instead of the standard deviation. Once again,
      students who used <Katex tex="f(x)" /> when writing out the definite integrals were
      more successful.
    </>
  ),
}

const EXAM_H: SAExaminerStats = {
  marks: [86, 12, 2],
  average: 0.2,
  comment: <>Many students were unable to set up the correct equations. The terminals were often incorrect.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="W \sim \mathrm{N}\!\left(10,\ 0.8^2\right)" />,
    reason: <>The standard deviation is <Katex tex="0.8" />, so the <em>variance</em> is <Katex tex="0.64" /> — feeding 0.8 in as a variance is what gives the report's 0.228.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(11, ∞, 10, 0.8)</Cas>,
    reason: <><Katex tex="11" /> is <Katex tex="1.25" /> standard deviations above the mean.</>,
  },
  {
    working: <Katex display tex="\boxed{0.106}" />,
    reason: 'To three decimal places.',
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(W<k) = 0.8" />,
    reason: '"80% of ball speeds are below k" — a left-tail area, so an inverse normal.',
  },
  {
    working: <Cas fn="invNorm">invNorm(0.8, 10, 0.8)</Cas>,
    reason: <>Gives <Katex tex="10.6733\ldots" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k = 10.7\ \text{m s}^{-1}}" />,
    reason: <>Round, do not truncate: <Katex tex="10.67" /> goes to <Katex tex="10.7" />, not <Katex tex="10.6" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="E\!\left(\hat P\right) = p = 0.08 = \tfrac{2}{25}" />,
    reason: <>A sample proportion is unbiased. Writing "2" instead of <Katex tex="\tfrac{2}{25}" /> is the report's named slip.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}\!\left(\hat P\right) = \sqrt{\frac{p(1-p)}{n}} = \sqrt{\frac{0.08\times0.92}{25}}" />,
    reason: <><Katex tex="n=25" /> is the sample size, not the number of samples.</>,
  },
  {
    working: <Katex display tex="= \sqrt{\frac{46/625}{25}} = \sqrt{\frac{46}{15\,625}}" />,
    reason: <><Katex tex="0.08\times0.92=0.0736=\tfrac{46}{625}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{E\!\left(\hat P\right) = \tfrac{2}{25}, \quad \mathrm{sd}\!\left(\hat P\right) = \frac{\sqrt{46}}{125}}" />,
    reason: <>Exact, as required — about <Katex tex="0.0543" />. The denominator is 125, not 25, because <Katex tex="\sqrt{15\,625}=125" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\hat P = \frac{X}{25} \text{ where } X \sim \mathrm{Bi}(25,\ 0.08)" />,
    reason: 'Turning the proportion back into a count is what makes the binomial usable.',
  },
  {
    working: <Katex display tex="\hat P > 0.1 \iff X > 2.5 \iff X \ge 3" />,
    reason: <>Because <Katex tex="X" /> is a whole number, <Katex tex="X>2.5" /> and <Katex tex="X\ge3" /> are the same event — but <Katex tex="X>3" /> is not, which is the report's named error.</>,
  },
  {
    working: <Cas fn="binomCdf">1 − binomCdf(25, 0.08, 0, 2)</Cas>,
    reason: 'The complement of the lower tail.',
  },
  {
    working: <Katex display tex="\boxed{0.323}" />,
    reason: 'To three decimal places.',
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 0 \ \text{ for } x>50" />,
    reason: <>The support of the density ends at 50, so no spin above that can occur. The 0.04 some students gave is <Katex tex="f(20)" />, the peak <em>height</em>, not a spin value.</>,
  },
  {
    working: <Katex display tex="\boxed{50 \text{ revolutions per second}}" />,
    reason: <>Quick sanity check that this is a valid density: <Katex tex="\int_0^{20}\tfrac{x}{500}dx=0.4" /> and <Katex tex="\int_{20}^{50}\tfrac{50-x}{750}dx=0.6" />, totalling 1 ✓.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^{20}\frac{x}{500}\,dx = \frac{400}{1000} = 0.4 < 0.5" />,
    reason: 'Checking the first branch first tells you which branch the median lies in — and saves solving the wrong equation.',
  },
  {
    working: <Katex display tex="\int_{20}^{m}\frac{50-x}{750}\,dx = 0.1" />,
    reason: 'The remaining 0.1 of probability needed to reach the halfway point.',
  },
  {
    working: <Katex display tex="\frac{1}{750}\left[50x-\tfrac{x^2}{2}\right]_{20}^{m} = 0.1" />,
    reason: 'Antidifferentiating.',
  },
  {
    working: <Katex display tex="m^2-100m+1750 = 0 \implies m = 50\pm5\sqrt{30}" />,
    reason: <><Katex tex="50+5\sqrt{30}\approx77.4" /> is outside the support, so it is rejected.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 50-5\sqrt{30} \approx 22.6 \text{ rev/s}}" />,
    reason: <>Just above 20, as the 0.4 already told us it must be.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="E(X) = \int_0^{20}\frac{x^2}{500}\,dx+\int_{20}^{50}\frac{x(50-x)}{750}\,dx" />,
    reason: 'Both branches contribute; define the hybrid function on the CAS and integrate it in one go.',
  },
  {
    working: <Katex display tex="= \tfrac{16}{3}+18 = \tfrac{70}{3}" />,
    reason: <>About <Katex tex="23.33" />, comfortably above the median — the long right tail pulls the mean up.</>,
  },
  {
    working: <Katex display tex="E\!\left(X^2\right) = \int_0^{20}\frac{x^3}{500}\,dx+\int_{20}^{50}\frac{x^2(50-x)}{750}\,dx = 80+570 = 650" />,
    reason: 'The same split, with an extra factor of x.',
  },
  {
    working: <Katex display tex="\mathrm{Var}(X) = 650-\left(\tfrac{70}{3}\right)^2 = \tfrac{950}{9}" />,
    reason: <><Katex tex="\left(\tfrac{70}{3}\right)^2=\tfrac{4900}{9}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{sd} = \frac{5\sqrt{38}}{3} \approx 10.3 \text{ rev/s}}" />,
    reason: <>Take the square root — leaving <Katex tex="105.6" /> answers a different question.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = a\,f\!\left(\frac{x}{b}\right): \ \text{horizontal dilation by } b, \text{ vertical dilation by } a" />,
    reason: 'Reading the transformation off the rule.',
  },
  {
    working: <Katex display tex="\int_{-\infty}^{\infty}a\,f\!\left(\tfrac{x}{b}\right)dx = ab\int_{-\infty}^{\infty}f(u)\,du = ab = 1" />,
    reason: <>A density must still integrate to 1, which forces <Katex tex="a=\tfrac1b" /> — the constraint that makes this a one-unknown problem.</>,
  },
  {
    working: <Katex display tex="\text{new median} = b\times\text{old median}" />,
    reason: 'A horizontal dilation scales every x-value, the median included.',
  },
  {
    working: <Katex display tex="b\left(50-5\sqrt{30}\right) = 30 \implies b = \frac{30}{22.6138\ldots}" />,
    reason: 'Using the exact median from part f.',
  },
  {
    working: <Katex display tex="\boxed{b = 1.33, \quad a = \tfrac1b = 0.75}" />,
    reason: <>To two decimal places. Check: <Katex tex="1.3266\times22.614=30.0" /> ✓, and the support stretches to <Katex tex="50b\approx66.3" /> rev/s.</>,
  },
]

export default function MethodsQ4_2021Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (14 marks)</p>
        <p>
          A teacher coaches their school's table tennis team. The teacher has an adjustable
          ball machine that they use to help the players practise. The speed, measured in
          metres per second, of the balls shot by the ball machine is a normally distributed
          random variable <Katex tex="W" />. The teacher sets the ball machine with a mean
          speed of 10 metres per second and a standard deviation of 0.8 metres per second.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Determine <Katex tex="\Pr(W\ge11)" />, correct to three decimal places.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="k" />, in metres per second, which 80% of ball
            speeds are below. Give your answer in metres per second, correct to one decimal
            place.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        <p>
          The teacher adjusts the height setting for the ball machine. The machine now shoots
          balls high above the table tennis table. Unfortunately, with the new height
          setting, 8% of balls do not land on the table. Let <Katex tex="\hat P" /> be the
          random variable representing the sample proportion of balls that do not land on the
          table in random samples of 25 balls.
        </p>
      </div>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            Find the mean and the standard deviation of <Katex tex="\hat P" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={2}
        statement={
          <>
            Use the binomial distribution to find{' '}
            <Katex tex="\Pr\!\left(\hat P>0.1\right)" />, correct to three decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-2">
        <p>
          The teacher can also adjust the spin setting on the ball machine. The spin, measured
          in revolutions per second, is a continuous random variable <Katex tex="X" /> with
          the probability density function
        </p>
        <p className="py-1">
          <Katex
            display
            tex="f(x)=\begin{cases}\dfrac{x}{500}, & 0\le x<20\\[6pt] \dfrac{50-x}{750}, & 20\le x\le50\\[6pt] 0, & \text{elsewhere}\end{cases}"
          />
        </p>
      </div>

      <PartCard
        letter="e"
        marks={1}
        statement={
          <>
            Find the maximum possible spin applied by the ball machine, in revolutions per
            second.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        marks={2}
        statement={
          <>
            Find the median spin, in revolutions per second, correct to one decimal place.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        marks={3}
        statement={
          <>
            Find the standard deviation of the spin, in revolutions per second, correct to
            one decimal place.
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>

      <PartCard
        letter="h"
        marks={2}
        statement={
          <>
            The teacher adjusts the spin setting so that the median spin becomes 30
            revolutions per second. This will transform the original probability density
            function <Katex tex="f" /> to a new probability density function{' '}
            <Katex tex="g" />, where <Katex tex="g(x)=a\,f\!\left(\tfrac{x}{b}\right)" />.
            Find the values of <Katex tex="a" /> and <Katex tex="b" /> for which the new
            median spin is 30 revolutions per second, giving your answer correct to two
            decimal places.
          </>
        }
        examinerReport={EXAM_H}
      >
        <WorkingTable rows={ROWS_H} />
      </PartCard>
    </div>
  )
}
