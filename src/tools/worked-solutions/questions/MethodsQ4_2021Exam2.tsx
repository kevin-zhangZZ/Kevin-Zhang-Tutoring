// 2021 Mathematical Methods — Exam 2, Section B Question 4 (14 marks). A table-tennis ball
// machine: a normal model, a sample proportion, then a piecewise density function and a
// transformation of it. Question text transcribed from the original paper. Answers checked
// with sympy/scipy and against the VCAA examination report. Solution is original.
// Interactives: meth-2021e2-q4e-max-spin (part e: the maximum spin is read on the x-axis, 0.04
// is a height), meth-2021e2-q4f-half-area (part f: the first rule holds only 0.4, plus the
// report's wrong set-up) and meth-2021e2-q4h-stretch (part h: the two equations ab = 1 and
// half the area left of 30, with the terminal 50b). Parts c and g (also under 40%) have no
// widget: their named errors (decimals / np / missing ÷n; giving the variance) are slips.
// Part h's ab = 1 is argued by area scaling under dilations, not a change of variable.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const MaxSpinWidget = lazyWidget(() => import('../interactives/meth-2021e2-q4e-max-spin'))
const HalfAreaWidget = lazyWidget(() => import('../interactives/meth-2021e2-q4f-half-area'))
const StretchWidget = lazyWidget(() => import('../interactives/meth-2021e2-q4h-stretch'))

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
      function incorrectly, for example,{' '}
      <Katex tex="\displaystyle\int_0^m\left(\frac{x}{500}\right)dx+\int_{20}^m\left(\frac{50-x}{750}\right)dx=\frac12" />{' '}
      or <Katex tex="\displaystyle\int_0^m\frac{x}{500}+\frac{50-x}{750}\,dx=\frac12" />.
      Students who used <Katex tex="f(x)" /> when writing out the definite integral were
      more successful with the method mark for this question. Students should define the
      hybrid function on their technology to save time.
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
      more successful with this question.
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
    reason: <><Katex tex="\mathrm{N}\!\left(\mu,\ \sigma^2\right)" /> lists the variance, but normCdf takes the standard deviation, <Katex tex="0.8" />, not <Katex tex="0.64" />.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(11, ∞, 10, 0.8)</Cas>,
    reason: <>An upper-tail area, from 11 up to <Katex tex="\infty" />. For a continuous variable, <Katex tex="\ge" /> and <Katex tex=">" /> give the same probability.</>,
  },
  {
    working: <Katex display tex="\boxed{0.106}" />,
    reason: <>To three decimal places.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(W<k) = 0.8" />,
    reason: <>"80% of ball speeds are below k" — a left-tail area, so an inverse normal.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.8, 10, 0.8)</Cas>,
    reason: <>invNorm takes the area to the <em>left</em> of <Katex tex="k" />, here 0.8. It gives <Katex tex="10.6733\ldots" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k = 10.7\ \text{m s}^{-1}}" />,
    reason: <>Round, do not truncate: <Katex tex="10.67" /> goes to <Katex tex="10.7" />, not <Katex tex="10.6" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="E\!\left(\hat P\right) = p = 0.08 = \tfrac{2}{25}" />,
    reason: <>The mean of a sample proportion is the population proportion, <Katex tex="p" />. The answer 2, which the report saw often, is <Katex tex="np=25\times0.08" />: the mean <em>number</em> of balls that miss, not the proportion.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}\!\left(\hat P\right) = \sqrt{\frac{p(1-p)}{n}} = \sqrt{\frac{0.08\times0.92}{25}}" />,
    reason: <><Katex tex="n=25" /> is the sample size. Leaving out the <Katex tex="\div n" /> gives <Katex tex="\sqrt{0.08\times0.92}=\tfrac{\sqrt{46}}{25}" />, the other answer the report saw often.</>,
  },
  {
    working: <Katex display tex="= \sqrt{\frac{46/625}{25}} = \sqrt{\frac{46}{15\,625}}" />,
    reason: <><Katex tex="0.08\times0.92=0.0736=\tfrac{46}{625}" />. Keep fractions: exact answers were required.</>,
  },
  {
    working: <Katex display tex="\boxed{E\!\left(\hat P\right) = \tfrac{2}{25}, \quad \mathrm{sd}\!\left(\hat P\right) = \frac{\sqrt{46}}{125}}" />,
    reason: <><Katex tex="\sqrt{15\,625}=125" />. The sd is about <Katex tex="0.0543" />, but that decimal is not exact.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\hat P = \frac{X}{25} \text{ where } X \sim \mathrm{Bi}(25,\ 0.08)" />,
    reason: <>The binomial counts balls, so turn the proportion back into a count: <Katex tex="X" /> is the number of the 25 balls that miss the table.</>,
  },
  {
    working: <Katex display tex="\hat P > 0.1 \iff X > 2.5 \iff X \ge 3" />,
    reason: <>Because <Katex tex="X" /> is a whole number, <Katex tex="X>2.5" /> and <Katex tex="X\ge3" /> are the same event — but <Katex tex="X>3" /> is not, which is the report's named error.</>,
  },
  {
    working: <Cas fn="binomCdf">1 − binomCdf(25, 0.08, 0, 2)</Cas>,
    reason: <><Katex tex="\Pr(X\ge3)=1-\Pr(X\le2)" />. (Using <Katex tex="\Pr(X>3)" /> instead would give 0.135.)</>,
  },
  {
    working: <Katex display tex="\boxed{0.323}" />,
    reason: <>To three decimal places. Stating <Katex tex="n" /> and <Katex tex="p" /> is not enough; the answer is this probability.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 0 \ \text{ for } x>50" />,
    reason: <>A spin is a value of <Katex tex="X" />, read along the horizontal axis. The density is non-zero only for <Katex tex="0<x<50" />, so no spin above 50 can occur.</>,
  },
  {
    working: <Katex display tex="\boxed{50 \text{ revolutions per second}}" />,
    reason: <>The common wrong answer, 0.04, is <Katex tex="f(20)=\tfrac{20}{500}" />: the greatest <em>height</em> of the graph, read on the vertical axis. A height is a density, not a spin.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^{m} f(x)\,dx = \frac12" />,
    reason: <>The median <Katex tex="m" /> is the spin with half the probability (half the area under <Katex tex="f" />) below it. It is not the mean, <Katex tex="\int x f(x)\,dx" />, which some students found instead. The report notes that students who wrote <Katex tex="f(x)" /> in the integral like this were more successful with the method mark.</>,
  },
  {
    working: <Katex display tex="\int_0^{20}\frac{x}{500}\,dx = \left[\frac{x^2}{1000}\right]_0^{20} = 0.4 < 0.5" />,
    reason: <><Katex tex="f" /> has two rules, so first find which one the median lies under. The first rule holds only 0.4 of the area, so the median is past 20.</>,
  },
  {
    working: <Katex display tex="\int_{20}^{m}\frac{50-x}{750}\,dx = 0.1" />,
    reason: <>Past 20, <Katex tex="f(x)=\tfrac{50-x}{750}" />, and the area from 20 to <Katex tex="m" /> must supply the remaining <Katex tex="0.5-0.4=0.1" />. Do not keep <Katex tex="\tfrac{x}{500}" /> running past 20, as one of the report's wrong set-ups does: that rule no longer applies there.</>,
  },
  {
    working: <Katex display tex="\frac{1}{750}\left[50x-\frac{x^2}{2}\right]_{20}^{m} = 0.1" />,
    reason: <>Antidifferentiate term by term.</>,
  },
  {
    working: <Katex display tex="50m-\frac{m^2}{2}-800 = 75" />,
    reason: <>At <Katex tex="x=20" />: <Katex tex="50(20)-\tfrac{20^2}{2}=1000-200=800" />. Then multiply both sides by 750.</>,
  },
  {
    working: <Katex display tex="m^2-100m+1750 = 0 \implies m = 50\pm5\sqrt{30}" />,
    reason: <>Multiply by <Katex tex="-2" /> and rearrange, then use the quadratic formula (<Katex tex="\sqrt{3000}=10\sqrt{30}" />) or solve on CAS. Reject <Katex tex="50+5\sqrt{30}\approx77.4" />: this equation only holds for <Katex tex="20\le m\le50" />.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 50-5\sqrt{30} \approx 22.6 \text{ rev/s}}" />,
    reason: <>To one decimal place. It is just above 20, as the 0.4 said it must be.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{sd}(X) = \sqrt{E\!\left(X^2\right)-\left[E(X)\right]^2}" />,
    reason: <>The variance is <Katex tex="E\!\left(X^2\right)-\left[E(X)\right]^2" />, and the standard deviation is its square root. So find <Katex tex="E(X)" /> and <Katex tex="E\!\left(X^2\right)" /> first.</>,
  },
  {
    working: <Katex display tex="E(X) = \int_0^{20}\frac{x^2}{500}\,dx+\int_{20}^{50}\frac{x(50-x)}{750}\,dx" />,
    reason: <><Katex tex="E(X)=\int x f(x)\,dx" />. <Katex tex="f" /> has two rules, so the integral splits at 20. On CAS, <Cas fn="define">Define f(x)</Cas> as a hybrid (piecewise) function, then integrate <Katex tex="x f(x)" /> from 0 to 50 in one go.</>,
  },
  {
    working: <Katex display tex="= \tfrac{16}{3}+18 = \tfrac{70}{3}" />,
    reason: <>About <Katex tex="23.3" />, just above the median: the long tail on the right pulls the mean up.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}E\!\left(X^2\right) &= \int_0^{20}\frac{x^3}{500}\,dx+\int_{20}^{50}\frac{x^2(50-x)}{750}\,dx\\ &= 80+570 = 650\end{aligned}" />,
    reason: <><Katex tex="E\!\left(X^2\right)=\int x^2 f(x)\,dx" />: the same split, with <Katex tex="x^2" /> in place of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(X) = 650-\left(\tfrac{70}{3}\right)^2 = \tfrac{950}{9}" />,
    reason: <><Katex tex="\left(\tfrac{70}{3}\right)^2=\tfrac{4900}{9}" />, and <Katex tex="650=\tfrac{5850}{9}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{sd}(X) = \frac{5\sqrt{38}}{3} \approx 10.3 \text{ rev/s}}" />,
    reason: <>The question asks for the standard deviation, so take the square root. Some students stopped at the variance, <Katex tex="105.6" />.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^{50b} a\,f\!\left(\frac{x}{b}\right)dx = 1" />,
    reason: <><Katex tex="g" /> is a probability density, so its total area is 1. The terminals are 0 and <Katex tex="50b" />, not 0 and 50: <Katex tex="f\!\left(\tfrac{x}{b}\right)" /> is non-zero only when <Katex tex="0<\tfrac{x}{b}<50" />, that is <Katex tex="0<x<50b" />.</>,
  },
  {
    working: <Katex display tex="\int_0^{30} a\,f\!\left(\frac{x}{b}\right)dx = \frac12" />,
    reason: <>The new median is 30, so half of the area under <Katex tex="g" /> lies left of 30. Two unknowns need two equations. You can <Cas fn="define">Define f(x)</Cas> as a hybrid function and <Cas fn="solve">solve</Cas> the pair for <Katex tex="a" /> and <Katex tex="b" /> on CAS, or reason it through by hand as below.</>,
  },
  {
    working: <Katex display tex="ab = 1" />,
    reason: <>The graph of <Katex tex="a\,f\!\left(\tfrac{x}{b}\right)" /> is the graph of <Katex tex="f" /> dilated by factor <Katex tex="b" /> from the <Katex tex="y" />-axis (widths <Katex tex="\times\, b" />) and by factor <Katex tex="a" /> from the <Katex tex="x" />-axis (heights <Katex tex="\times\, a" />). That multiplies every area by <Katex tex="ab" />. The area under <Katex tex="f" /> is 1, so the first equation says <Katex tex="ab=1" />.</>,
  },
  {
    working: <Katex display tex="\int_0^{30/b} f(x)\,dx = \frac12 \implies \frac{30}{b} = 50-5\sqrt{30}" />,
    reason: <>Undo the dilation: the area under <Katex tex="g" /> from 0 to 30 is <Katex tex="ab=1" /> times the area under <Katex tex="f" /> from 0 to <Katex tex="\tfrac{30}{b}" />. So half of <Katex tex="f" />'s area lies left of <Katex tex="\tfrac{30}{b}" />, which makes <Katex tex="\tfrac{30}{b}" /> the median of <Katex tex="f" /> from part f.</>,
  },
  {
    working: <Katex display tex="b = \frac{30}{50-5\sqrt{30}} = 1.3266\ldots" />,
    reason: <>The stretch moves the median from <Katex tex="22.6" /> out to 30, so <Katex tex="b" /> is a little over 1.</>,
  },
  {
    working: <Katex display tex="a = \frac{1}{b} = 0.7538\ldots" />,
    reason: <>From <Katex tex="ab=1" />. Stretching the graph sideways must be balanced by squashing it down, so <Katex tex="a<1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 0.75, \quad b = 1.33}" />,
    reason: <>To two decimal places. The spins now run from 0 up to <Katex tex="50b\approx66.3" /> rev/s.</>,
  },
]

export default function MethodsQ4_2021Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (14 marks)</p>
        <p>
          A teacher coaches their school's table tennis team.
          <br />
          The teacher has an adjustable ball machine that they use to help the players
          practise.
          <br />
          The speed, measured in metres per second, of the balls shot by the ball machine is a
          normally distributed random variable <Katex tex="W" />.
          <br />
          The teacher sets the ball machine with a mean speed of 10 metres per second and a
          standard deviation of 0.8 metres per second.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Normal Distribution"
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
        topic="Inverse Normal"
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

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The teacher adjusts the height setting for the ball machine. The machine now shoots
          balls high above the table tennis table.
          <br />
          Unfortunately, with the new height setting, 8% of balls do not land on the table.
          <br />
          Let <Katex tex="\hat P" /> be the random variable representing the sample proportion of balls that do not land on the
          table in random samples of 25 balls.
        </p>
      </div>

      <PartCard
        letter="c"
        topic="Sample Proportion"
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
        topic="Binomial Distribution"
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

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          The teacher can also adjust the spin setting on the ball machine.
          <br />
          The spin, measured in revolutions per second, is a continuous random variable <Katex tex="X" /> with
          the probability density function
        </p>
        <p className="py-1">
          <Katex
            display
            tex="f(x)=\begin{cases}\dfrac{x}{500} & 0\le x<20\\[6pt] \dfrac{50-x}{750} & 20\le x\le50\\[6pt] 0 & \text{elsewhere}\end{cases}"
          />
        </p>
      </div>

      <PartCard
        letter="e"
        topic="Continuous PDF"
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
        <Explore title="The maximum spin is read along the x-axis: f(20) = 0.04 is a height, not a spin">
          <MaxSpinWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="f"
        topic="Median"
        marks={2}
        statement={
          <>
            Find the median spin, in revolutions per second, correct to one decimal place.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
        <Explore title="Why the median needs the second rule: the first rule holds only 0.4 of the area">
          <HalfAreaWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="g"
        topic="Standard Deviation"
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
        topic="Transformed PDF"
        marks={2}
        statement={
          <>
            The teacher adjusts the spin setting so that the median spin becomes 30
            revolutions per second. This will transform the original probability density
            function <Katex tex="f" /> to a new probability density function{' '}
            <Katex tex="g" />, where <Katex tex="g(x)=a\,f\!\left(\tfrac{x}{b}\right)" />.
            <br />
            Find the values of <Katex tex="a" /> and <Katex tex="b" /> for which the new
            median spin is 30 revolutions per second, giving your answer correct to two
            decimal places.
          </>
        }
        examinerReport={EXAM_H}
      >
        <WorkingTable rows={ROWS_H} />
        <Explore title="Two unknowns, two conditions: the area must stay 1, and half of it must lie left of 30">
          <StretchWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
