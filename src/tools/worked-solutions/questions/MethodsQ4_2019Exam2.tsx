// 2019 Mathematical Methods — Exam 2, Question 4 (17 marks).
// The Lorenz birdwing butterfly's life span (a continuous random variable, parts a-c), its
// wingspan (normally distributed, parts d-e), a binomial model for "very large" butterflies
// in a sample of 36 (part f), and a confidence interval used to back out a sample size from
// Town B (part g). Question text transcribed from the original paper. VCAA printed no diagram;
// the graph of the probability density function is this site's own explanatory figure
// (matplotlib), since parts a.–c. are areas under it. Cross-checked against
// the VCAA examination report and itute's independent solutions, and independently re-derived
// (every numeric part confirmed by computer algebra; the exact fractions behind the rounded
// answers in b. and c. are shown). Solution is original.
//
// Interactives (interactives/meth-2019e2-q4*): a. the mean as the balance point of the density,
// with the median marked (balance vs equal areas); c. conditioning as restricting to the
// survivors and rescaling, with the report's X ≤ 4 | X ≤ 2 misreading; e. the bottom-5% cut-off
// vs μ − 2σ = 9.9; f.ii. the tail stack Pr(X ≥ n) against the 1% line, with the Pr(X > n) slip;
// f.iv. the ±1 sd band picking out whole bars X = 1, 2, 3, with the forbidden normal
// approximation; g. the confidence-interval "funnel" whose edges meet the given endpoints at
// n = 200, with the 0.0527-centre and missing-1.96 slips. Each wrong method in the WrongMethod
// boxes was recomputed in Python and gives the stated wrong answer. A tutor video (scout notes)
// finishes c. with 0.2627 — that is Pr(X ≥ 4) alone; the report, itute and our working all give
// 0.2878.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import pdfSrc from './meth-2019e2-q4-pdf.png'

const BalanceWidget = lazyWidget(() => import('../interactives/meth-2019e2-q4a-balance'))
const GivenWidget = lazyWidget(() => import('../interactives/meth-2019e2-q4c-given'))
const CutoffWidget = lazyWidget(() => import('../interactives/meth-2019e2-q4e-cutoff'))
const TailWidget = lazyWidget(() => import('../interactives/meth-2019e2-q4fii-tail'))
const WithinWidget = lazyWidget(() => import('../interactives/meth-2019e2-q4fiv-within'))
const FunnelWidget = lazyWidget(() => import('../interactives/meth-2019e2-q4g-funnel'))

const EXAM_A: SAExaminerStats = {
  marks: [17, 4, 78],
  average: 1.6,
  comment: (
    <>
      This question was done well. Some students worked out the median instead of the mean or
      evaluated <Katex tex="\displaystyle\int_0^5\left(\frac{4}{625}\left(5x^3-x^4\right)\right)dx" />.
      Other students gave an approximate answer. Some students tried to treat <Katex tex="f" /> as
      a discrete random variable.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [42, 4, 55],
  average: 1.2,
  comment: (
    <>
      Some students found the probability but did not multiply by <Katex tex="80" />. Other
      students used a discrete random variable or the normal distribution. Some students
      evaluated <Katex tex="\displaystyle80\int_0^2\left(\frac{4}{625}\left(5x^3-x^4\right)\right)dx" /> or{' '}
      <Katex tex="\displaystyle80\int_3^5\left(\frac{4}{625}\left(5x^3-x^4\right)\right)dx" />. Other
      students rounded to 74.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [26, 17, 57],
  average: 1.3,
  comment: (
    <>
      Many students used conditional probability. Some students used{' '}
      <Katex tex="\Pr(X\le4\mid X\le2)" />. Other students rounded answers too early.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [19, 81],
  average: 0.8,
  comment: <>This question was answered well. Some students rounded incorrectly, giving their answer as <Katex tex="0.1511" /> or <Katex tex="0.1516" />.</>,
}

const EXAM_E: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: <>This question was answered reasonably well. A common incorrect answer was <Katex tex="9.9" />.</>,
}

const EXAM_FI: SAExaminerStats = {
  marks: [27, 73],
  average: 0.8,
  comment: <>This question was answered well.</>,
}

const EXAM_FII: SAExaminerStats = {
  marks: [58, 19, 23],
  average: 0.7,
  comment: <>A common incorrect answer was <Katex tex="n=6" />. Some students gave an answer without any working. Trial and error is an acceptable method.</>,
}

const EXAM_FIII: SAExaminerStats = {
  marks: [45, 13, 42],
  average: 1.0,
  comment: <>Some students found <Katex tex="E(X)=36\times0.0527=1.8972" />. Many students were able to find the standard deviation.</>,
}

const EXAM_FIV: SAExaminerStats = {
  marks: [70, 11, 19],
  average: 0.5,
  comment: <>Many students were able to find the first interval. Some students used the normal distribution. Others rounded their answer to 0.738.</>,
}

const EXAM_G: SAExaminerStats = {
  marks: [69, 6, 25],
  average: 0.6,
  comment: <>Many students had the proportion as 0.0527 or 0.55 instead of 0.055. Others did not include the 1.96.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="E(X) = \int_{-\infty}^{\infty} x\,f(x)\,dx = \int_0^5 x\cdot\dfrac{4}{625}\left(5x^3-x^4\right)dx" />,
    reason: (
      <>
        The mean weights each life span <Katex tex="x" /> by how likely it is, <Katex tex="f(x)" />, and adds up:
        that is where the extra <Katex tex="x" /> comes from. Outside <Katex tex="[0,5]" /> the density is zero, so
        only that stretch contributes. (Leave the <Katex tex="x" /> out and you get{' '}
        <Katex tex="\int_0^5 f(x)\,dx=1" />, the total area of <em>every</em> density, so it can&apos;t be the mean.)
      </>
    ),
  },
  {
    working: <Katex display tex="= \dfrac{4}{625}\int_0^5\left(5x^4-x^5\right)dx" />,
    reason: <>Multiply <Katex tex="x" /> through the bracket first — it turns the integrand into two simple power terms.</>,
  },
  {
    working: <Katex display tex="= \dfrac{4}{625}\left[x^5-\dfrac{x^6}{6}\right]_0^5 = \dfrac{4}{625}\left(3125-\dfrac{15\,625}{6}\right)" />,
    reason: <>Antidifferentiate term by term, then substitute the terminals (the lower one gives <Katex tex="0" />).</>,
  },
  {
    working: <Katex display tex="= \dfrac{4}{625}\times\dfrac{3125}{6} = \dfrac{20}{6}" />,
    reason: <><Katex tex="3125=\tfrac{18\,750}{6}" />, so the bracket is <Katex tex="\tfrac{18\,750-15\,625}{6}=\tfrac{3125}{6}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{E(X) = \dfrac{10}{3} \text{ weeks}}" />,
    reason: <>Exact form: Section B needs exact answers unless told otherwise, and the report notes some students gave an approximate answer. Sanity check: <Katex tex="\tfrac{10}{3}\approx3.3" /> weeks sits sensibly inside the <Katex tex="0" />–<Katex tex="5" /> week range, a bit left of the density's peak at <Katex tex="x=\tfrac{15}{4}" />: the long, thin left tail pulls the balance point towards <Katex tex="0" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={pdfSrc} alt="Graph of the probability density function on 0 ≤ x ≤ 5, peaking near x = 3.75, with the region from x = 2 to x = 5 shaded to show Pr(X > 2) ≈ 0.913 — this site's own explanatory figure" className="w-full max-w-[400px]" />
      </div>
    ),
    reason: <>"Lives longer than two weeks" is the shaded area to the right of <Katex tex="x=2" /> — clearly most of the total area, so the answer should come out well above half.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\Pr(X>2) = \int_2^5 \dfrac{4}{625}\left(5x^3-x^4\right)dx" />
        <Katex display tex="= \dfrac{4}{625}\left[\dfrac{5x^4}{4}-\dfrac{x^5}{5}\right]_2^5" />
      </>
    ),
    reason: <>The area under the density from <Katex tex="2" /> to the end of its domain at <Katex tex="5" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{At } x=5:\ \dfrac{5(625)}{4}-\dfrac{3125}{5} = \dfrac{625}{4}" />
        <Katex display tex="\text{At } x=2:\ \dfrac{5(16)}{4}-\dfrac{32}{5} = \dfrac{68}{5}" />
      </>
    ),
    reason: <>Evaluating the antiderivative at each terminal.</>,
  },
  {
    working: <Katex display tex="\Pr(X>2) = \dfrac{4}{625}\left(\dfrac{625}{4}-\dfrac{68}{5}\right) = \dfrac{2853}{3125} = 0.91296" />,
    reason: <>Upper minus lower. The fraction is exact, so nothing has been rounded yet.</>,
  },
  {
    working: <Katex display tex="\text{Expected number} = 80\times0.91296 = 73.0368" />,
    reason: <>"How many are expected" is a count, not a probability. Each of the <Katex tex="80" /> butterflies independently either lives past two weeks or doesn't, so the count is <Katex tex="\operatorname{Bi}(80,\ 0.91296)" />, whose mean is <Katex tex="np" />. The report notes some students found the probability but did not multiply by <Katex tex="80" />.</>,
  },
  {
    working: <Katex display tex="\boxed{73 \text{ butterflies}}" />,
    reason: <>To the nearest whole butterfly: <Katex tex="73.04" /> rounds <em>down</em>. The report notes others rounded to <Katex tex="74" />; the nearest integer is not the next one up.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\Pr(X\ge4 \mid X\ge2) = \dfrac{\Pr(X\ge4 \cap X\ge2)}{\Pr(X\ge2)}" />
        <Katex display tex="= \dfrac{\Pr(X\ge4)}{\Pr(X\ge2)}" />
      </>
    ),
    reason: <>Conditional probability. A butterfly that lives at least <Katex tex="4" /> weeks has automatically lived at least <Katex tex="2" />, so the overlap of the two events is just the smaller one — that's what collapses the numerator.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\Pr(X\ge4) = \int_4^5 \dfrac{4}{625}\left(5x^3-x^4\right)dx" />
        <Katex display tex="= \dfrac{821}{3125} = 0.26272" />
      </>
    ),
    reason: <>Same antiderivative as part b., evaluated from <Katex tex="4" /> to <Katex tex="5" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge4 \mid X\ge2) = \dfrac{821/3125}{2853/3125} = \dfrac{821}{2853}" />,
    reason: <>The <Katex tex="3125" />s cancel — which is why carrying exact values through beats rounding early. The report notes students who rounded too early: <Katex tex="\tfrac{0.2627}{0.9130}=0.28773\ldots" /> gives <Katex tex="0.2877" />, wrong in the fourth decimal place.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.2878}" />,
    reason: <>Correct to four decimal places, as asked. (For a continuous variable <Katex tex="\Pr(X\ge4)" /> and <Katex tex="\Pr(X>4)" /> are the same thing — a single exact value has zero probability.)</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="L \sim N\!\left(14.1,\ 2.1^2\right)" />,
    reason: <>Let <Katex tex="L" /> be the wingspan in cm. Careful: the second parameter is the <em>variance</em>, so the standard deviation <Katex tex="2.1" /> is squared here.</>,
  },
  {
    working: <Katex display tex="\Pr(16<L<18)" />,
    reason: <>Straight to technology: <Cas fn="normCdf">normCdf(16, 18, 14.1, 2.1)</Cas> gives it. The bounds go first and the parameters last, and the final argument is the standard deviation <Katex tex="2.1" />, not the variance <Katex tex="2.1^2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.1512}" />,
    reason: <>The CAS shows <Katex tex="0.151150\ldots" />: the fifth decimal is <Katex tex="5" />, so the fourth rounds <em>up</em> to <Katex tex="0.1512" />. Just chopping off the extra digits gives <Katex tex="0.1511" />, one of the report&apos;s incorrect answers. Sanity check: <Katex tex="16" /> and <Katex tex="18" /> sit about <Katex tex="0.9" /> and <Katex tex="1.9" /> standard deviations above the mean, so a probability around <Katex tex="15\%" /> is the right size. ✓</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Find } \ell \text{ with } \Pr(L<\ell)=0.05" />,
    reason: <>"In the smallest <Katex tex="5\%" />" means the bottom <Katex tex="5\%" /> of the distribution, so the cut-off has <Katex tex="5\%" /> of the area to its <em>left</em>. The greatest wingspan still counted as very small is exactly that cut-off.</>,
  },
  {
    working: <Katex display tex="\ell \approx 10.6458" />,
    reason: <>The inverse normal runs the distribution backwards — give it an area, it returns the boundary: <Cas fn="invNorm">invNorm(0.05, 14.1, 2.1)</Cas> here. The first argument is always the area to the <em>left</em>, which is why <Katex tex="0.05" /> goes in without any adjustment.</>,
  },
  {
    working: <Katex display tex="\boxed{\ell \approx 10.6 \text{ cm}}" />,
    reason: <>One decimal place. Sanity check: <Katex tex="10.6" /> is <Katex tex="1.645" /> standard deviations below the mean — closer in than two, because the bottom <Katex tex="5\%" /> is a fatter slice than the bottom <Katex tex="2.5\%" />.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \operatorname{Bi}(36,\ 0.0527)" />,
    reason: <>Let <Katex tex="X" /> be the number of very large butterflies in the sample. The four binomial conditions all hold: a fixed number of trials (<Katex tex="36" />), two outcomes per trial (very large or not), a constant probability (<Katex tex="0.0527" />), and independent selections.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge3) = 1-\Pr(X\le2)" />,
    reason: <>"<Katex tex="3" /> or more" is the opposite of "<Katex tex="2" /> or fewer" — the boundary value <Katex tex="3" /> belongs to the event, which is where off-by-one errors creep in.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.2947}" />,
    reason: <>Either <Cas fn="binomCdf">1 - binomCdf(36, 0.0527, 0, 2)</Cas> using the complement, or <Cas fn="binomCdf">binomCdf(36, 0.0527, 3, 36)</Cas> counting the wanted values directly. Both bounds are inclusive, so the upper one is <Katex tex="36" />, not <Katex tex="35" />.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Want the smallest integer } n \text{ with } \Pr(X\ge n) < 0.01" />,
    reason: <>Here <Katex tex="n" /> is a threshold count, not the sample size (that is still <Katex tex="36" />). As <Katex tex="n" /> climbs, "<Katex tex="n" /> or more" loses bars from the bottom of its tail, so the probability only falls. Test values until it first drops below <Katex tex="1\%" />; the report confirms trial and error is acceptable.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\Pr(X\ge6) = 0.01066\ldots > 0.01 \quad \text{(too big)}" />
        <Katex display tex="\Pr(X\ge7) = 0.00244\ldots < 0.01 \quad \checkmark" />
      </>
    ),
    reason: <>Each line is one call: <Cas fn="binomCdf">binomCdf(36, 0.0527, 6, 36)</Cas> and then the same with <Katex tex="7" /> as the lower bound. Both lines are needed as working: one shows <Katex tex="6" /> fails, the other shows <Katex tex="7" /> succeeds, which together prove <Katex tex="7" /> is the <em>smallest</em>.</>,
  },
  {
    working: <Katex display tex="\boxed{n=7}" />,
    reason: <>The first integer that passes. The report notes some students gave an answer without any working — the two probabilities above are what earn the method mark.</>,
  },
]

const ROWS_FIII: WorkingRow[] = [
  {
    working: <Katex display tex="E(\hat P) = p = \boxed{0.0527}" />,
    reason: <>The sample proportion is centred on the true population proportion — on average the sample gets it right. Why: <Katex tex="\hat P=\tfrac{X}{36}" />, so <Katex tex="E(\hat P)=\tfrac{E(X)}{36}=\tfrac{36p}{36}=p" />.</>,
  },
  {
    working: <Katex display tex="sd(\hat P) = \sqrt{\dfrac{p(1-p)}{n}} = \sqrt{\dfrac{0.0527\times0.9473}{36}}" />,
    reason: <>Standard formula from the formula sheet, with <Katex tex="n=36" />. It is the binomial sd scaled the same way: <Katex tex="sd(\tfrac{X}{36})=\tfrac{\sqrt{36p(1-p)}}{36}=\sqrt{\tfrac{p(1-p)}{36}}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{sd(\hat P) \approx 0.0372}" />,
    reason: <>Four decimal places for both parts of the answer.</>,
  },
]

const ROWS_FIV: WorkingRow[] = [
  {
    working: <Katex display tex="0.0527-0.0372 < \hat P < 0.0527+0.0372" />,
    reason: <>"Within one standard deviation of <Katex tex="0.0527" />" — the centre from part f.iii., plus and minus the standard deviation from the same part.</>,
  },
  {
    working: <Katex display tex="0.01546\ldots < \hat P < 0.08993\ldots" />,
    reason: <>Use the unrounded standard deviation, <Katex tex="0.03723\ldots" />, so the endpoints are accurate.</>,
  },
  {
    working: <Katex display tex="\hat P = \dfrac{X}{36} \implies 36\times0.01546 < X < 36\times0.08993" />,
    reason: <>Convert the proportion back into a <em>count</em> of butterflies by multiplying through by the sample size.</>,
  },
  {
    working: <Katex display tex="0.5566\ldots < X < 3.2378\ldots \implies X\in\{1,2,3\}" />,
    reason: <>Butterflies come in whole numbers, so only the integers strictly inside the interval are possible.</>,
  },
  {
    working: <Katex display tex="\Pr(1\le X\le3) \text{ where } X\sim\operatorname{Bi}(36,\ 0.0527)" />,
    reason: <>The exact binomial distribution from part f.i., as the question instructs, rather than a normal approximation to <Katex tex="\hat P" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.7380}" />,
    reason: <><Cas fn="binomCdf">binomCdf(36, 0.0527, 1, 3)</Cas> covers it, both bounds inclusive — exactly what <Katex tex="X\in\{1,2,3\}" /> needs. Four decimal places, so write the trailing zero — the report notes some students rounded to <Katex tex="0.738" />.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\text{CI} = \left(\hat p - 1.96\sqrt{\dfrac{\hat p(1-\hat p)}{n}},\ \ \hat p + 1.96\sqrt{\dfrac{\hat p(1-\hat p)}{n}}\right)" />,
    reason: <>The approximate <Katex tex="95\%" /> confidence interval from the formula sheet. It is symmetric about <Katex tex="\hat p" />, which is what makes it possible to work backwards.</>,
  },
  {
    working: <Katex display tex="\hat p = \dfrac{0.0234+0.0866}{2} = 0.055" />,
    reason: <>How would I know? The interval is <Katex tex="\hat p\pm" /> (the same amount), so <Katex tex="\hat p" /> sits exactly halfway between the endpoints. The report notes many students had the proportion as <Katex tex="0.0527" /> or <Katex tex="0.55" />: <Katex tex="0.0527" /> is Town A's probability, and <Katex tex="0.55" /> is ten times too big.</>,
  },
  {
    working: <Katex display tex="1.96\sqrt{\dfrac{\hat p(1-\hat p)}{n}} = \dfrac{0.0866-0.0234}{2} = 0.0316" />,
    reason: <>The margin of error is <em>half</em> the interval's width.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\sqrt{\dfrac{0.055\times0.945}{n}} = \dfrac{0.0316}{1.96} = 0.016122\ldots" />
        <Katex display tex="\dfrac{0.051975}{n} = 0.00025993\ldots" />
      </>
    ),
    reason: <>Divide by <Katex tex="1.96" />, then square both sides to free <Katex tex="n" />.</>,
  },
  {
    working: <Katex display tex="n = \dfrac{0.051975}{0.00025993\ldots} \approx 199.96" />,
    reason: <>Solving for <Katex tex="n" />. On CAS it is one line: <Cas fn="solve">solve(0.055 + 1.96·√(0.055·0.945/n) = 0.0866, n)</Cas>.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 200}" />,
    reason: <>A sample size must be a whole number, and the given interval endpoints were themselves rounded to four decimal places, which is why the arithmetic lands just short of <Katex tex="200" />.</>,
  },
]

export default function MethodsQ4_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (17 marks)</p>
        <p>The Lorenz birdwing is the largest butterfly in Town A.</p>
        <p className="mt-2">
          The probability density function that describes its life span, <Katex tex="X" />, in
          weeks, is given by
        </p>
        <Katex display tex="f(x)=\begin{cases}\dfrac{4}{625}\left(5x^3-x^4\right) & 0\le x\le5\\[4pt] 0 & \text{elsewhere}\end{cases}" />
      </div>

      <div className="text-[13px] leading-relaxed">
        <Background title="Before You Start">
          <p>
            This question runs through three different probability models in turn, and the main
            skill being tested is noticing which one is in play:
          </p>
          <p>
            <b>Parts a.–c.: a continuous random variable</b> given by a probability density
            function. Probabilities are <em>areas</em> under the density curve, so every question
            is an integral. The mean is <Katex tex="\displaystyle\int x\,f(x)\,dx" /> — note the
            extra factor of <Katex tex="x" />, which weights each value by how likely it is.
          </p>
          <p>
            <b>Parts d.–e.: a normal distribution</b> for the wingspans — technology
            (normCdf and invNorm) does the work.
          </p>
          <p>
            <b>Parts f.–g.: counting and proportions.</b> Each butterfly either is or isn't
            "very large", so counting them across a sample of <Katex tex="36" /> is a{' '}
            <em>binomial</em> problem, and the proportion <Katex tex="\hat P = \tfrac{X}{36}" />{' '}
            is a sample proportion.
          </p>
        </Background>
      </div>

      <PartCard letter="a" topic="Mean of PDF" marks={2} statement="Find the mean life span of the Lorenz birdwing butterfly." examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
        <Explore title="The mean is where the density balances">
          <BalanceWidget />
        </Explore>
        <WrongMethod
          title="The mean is the value that splits the area in half"
          source="Examiner's report"
          working={<Katex display tex="\int_0^m f(x)\,dx=\tfrac12 \implies m\approx3.431" />}
        >
          That is the <em>median</em>. It splits the area in half, but the mean balances area <em>times distance</em>:
          here the thin left tail stretches all the way to <Katex tex="0" />, so it pulls the mean{' '}
          (<Katex tex="\tfrac{10}{3}\approx3.333" />) to the left of the median. Catch it by the wording: "mean" or
          "expected value" means the integral must contain <Katex tex="x\,f(x)" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="Expected Number" marks={2} statement="In a sample of 80 Lorenz birdwing butterflies, how many butterflies are expected to live longer than two weeks, correct to the nearest integer?" examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="“Longer than two weeks” is the area from 0 to 2"
          source="Examiner's report"
          working={<Katex display tex="80\int_0^2 f(x)\,dx = 80\times0.08704 \approx 7" />}
        >
          That counts the butterflies that die <em>within</em> two weeks, the opposite event. "Longer than two weeks"
          is <Katex tex="X>2" />, the area to the <em>right</em> of <Katex tex="2" />, and the graph shows it is most of
          the area. The report also lists <Katex tex="80\int_3^5 f(x)\,dx\approx53" />, which treats life span as
          whole weeks ("more than 2" becoming "3 or more"); its general comments add that some students were confused
          by the wording "live longer than two weeks", and that some thought the life span <Katex tex="X" /> was discrete. <Katex tex="X" /> is
          continuous, so the area starts right at <Katex tex="2" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="c" topic="Conditional Probability" marks={2} statement="What is the probability that a Lorenz birdwing butterfly lives for at least four weeks, given that it lives for at least two weeks, correct to four decimal places?" examinerReport={EXAM_C}>
        <Background>
          <p>
            "Given that" signals conditional probability:{' '}
            <Katex tex="\Pr(A\mid B)=\dfrac{\Pr(A\cap B)}{\Pr(B)}" />. Think of it as shrinking the
            world down to only the butterflies that made it past two weeks, then asking what
            fraction of <em>those</em> also made it past four.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="“Given” shrinks the world to the survivors">
          <GivenWidget />
        </Explore>
        <WrongMethod
          title="“At least four weeks” means X ≤ 4"
          source="Examiner's report"
          working={<Katex display tex="\Pr(X\le4\mid X\le2)=\frac{\Pr(X\le2)}{\Pr(X\le2)}=1" />}
        >
          "At least four weeks" means four weeks <em>or more</em>: <Katex tex="X\ge4" />. With the inequalities
          flipped, every butterfly that died by week <Katex tex="2" /> has certainly died by week <Katex tex="4" />, so the
          answer comes out as <Katex tex="1" />, a certainty. A conditional probability of exactly <Katex tex="1" /> in a
          question asking for four decimal places is a sign the events have been misread.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The wingspans of Lorenz birdwing butterflies in Town A are normally distributed with a
          mean of <Katex tex="14.1" /> cm and a standard deviation of <Katex tex="2.1" /> cm.
        </p>
      </div>

      <PartCard letter="d" topic="Normal Distribution" marks={1} statement="Find the probability that a randomly selected Lorenz birdwing butterfly in Town A has a wingspan between 16 cm and 18 cm, correct to four decimal places." examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" topic="Inverse Normal" marks={1} statement={<>A Lorenz birdwing butterfly is considered to be very small if its wingspan is in the smallest 5% of all the Lorenz birdwing butterflies in Town A.<br />Find the greatest possible wingspan, in centimetres, for a very small Lorenz birdwing butterfly in Town A, correct to one decimal place.</>} examinerReport={EXAM_E}>
        <WorkingTable rows={ROWS_E} />
        <Explore title="Why the bottom 5% is not two standard deviations down">
          <CutoffWidget />
        </Explore>
        <WrongMethod
          title="Bottom 5% means two standard deviations below the mean"
          source="Examiner's report"
          working={<Katex display tex="14.1-2\times2.1=9.9" />}
        >
          The 95% rule puts <Katex tex="95\%" /> of values within two standard deviations, so the leftover{' '}
          <Katex tex="5\%" /> is shared between <em>both</em> tails: only about <Katex tex="2.3\%" /> of wingspans are
          below <Katex tex="9.9" />. For <Katex tex="5\%" /> in one tail you need invNorm, which lands{' '}
          <Katex tex="1.645" /> standard deviations down. Check any cut-off with normCdf: the area below{' '}
          <Katex tex="9.9" /> is <Katex tex="0.0228" />, not <Katex tex="0.05" />.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Each year, a detailed study is conducted on a random sample of <Katex tex="36" />{' '}
          Lorenz birdwing butterflies in Town A. A Lorenz birdwing butterfly is considered to be
          very large if its wingspan is greater than <Katex tex="17.5" /> cm. The probability that the wingspan of
          any Lorenz birdwing butterfly in Town A is greater than <Katex tex="17.5" /> cm is{' '}
          <Katex tex="0.0527" />, correct to four decimal places.
        </p>
      </div>

      <PartCard letter="f.i" topic="Binomial Distribution" marks={1} statement="Find the probability that three or more of the butterflies, in a random sample of 36 Lorenz birdwing butterflies from Town A, are very large, correct to four decimal places." examinerReport={EXAM_FI}>
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard letter="f.ii" topic="Binomial Distribution" marks={2} statement={<>The probability that <Katex tex="n" /> or more butterflies, in a random sample of 36 Lorenz birdwing butterflies from Town A, are very large is less than 1%.<br />Find the smallest value of <Katex tex="n" />, where <Katex tex="n" /> is an integer.</>} examinerReport={EXAM_FII}>
        <WorkingTable rows={ROWS_FII} />
        <Explore title="“n or more” is the whole tail, stacked up">
          <TailWidget />
        </Explore>
        <WrongMethod
          title="Test Pr(X > n) < 0.01 instead"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\Pr(X>5)\approx0.0107 > 0.01" />
              <Katex display tex="\Pr(X>6)\approx0.0024 < 0.01 \implies n=6" />
            </>
          }
        >
          "<Katex tex="n" /> or more" includes <Katex tex="n" /> itself, so the event is <Katex tex="X\ge n" />.{' '}
          <Katex tex="\Pr(X>6)" /> is really <Katex tex="\Pr(X\ge7)" />, which is why it passes, and it lands on the
          report's common wrong answer <Katex tex="n=6" />. Checking the single bar{' '}
          <Katex tex="\Pr(X=6)\approx0.0082" /> lands on <Katex tex="6" /> too. Write the event with <Katex tex="\ge" />{' '}
          first, then make sure the lower bound you type into binomCdf is <Katex tex="n" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="f.iii" topic="Sample Proportion" marks={2} statement={<>For random samples of <Katex tex="36" /> Lorenz birdwing butterflies in Town A, <Katex tex="\hat P" /> is the random variable that represents the proportion of butterflies that are very large.<br />Find the expected value and the standard deviation of <Katex tex="\hat P" />, correct to four decimal places.</>} examinerReport={EXAM_FIII}>
        <Background>
          <p>
            <Katex tex="\hat P" /> (read "p-hat") is the <em>sample</em> proportion: take a sample
            of <Katex tex="36" />, count the very large ones, divide by <Katex tex="36" />.
            Different samples give different answers, so <Katex tex="\hat P" /> is itself a random
            variable, with a mean and a standard deviation of its own:{' '}
            <Katex tex="E(\hat P)=p" /> and <Katex tex="sd(\hat P)=\sqrt{\tfrac{p(1-p)}{n}}" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_FIII} />
        <WrongMethod
          title="The expected value is np"
          source="Examiner's report"
          working={<Katex display tex="E(X)=36\times0.0527=1.8972" />}
        >
          That is the expected <em>number</em> of very large butterflies. <Katex tex="\hat P" /> is a{' '}
          <em>proportion</em>, <Katex tex="\tfrac{X}{36}" />, so its mean is <Katex tex="\tfrac{1.8972}{36}=0.0527" />. The
          report's general advice uses this very part as its example of checking that an answer is reasonable:{' '}
          <Katex tex="E(\hat P)" /> cannot be greater than one.
        </WrongMethod>
      </PartCard>

      <PartCard letter="f.iv" topic="Sample Proportion" marks={2} statement="What is the probability that a sample proportion of butterflies that are very large lies within one standard deviation of 0.0527, correct to four decimal places? Do not use a normal approximation." examinerReport={EXAM_FIV}>
        <Background>
          <p>
            "Do not use a normal approximation" is the instruction that makes this part work. It
            means: don't treat <Katex tex="\hat P" /> as a bell curve and quote the usual{' '}
            <Katex tex="68\%" />. Instead, translate the interval for <Katex tex="\hat P" /> into a
            range of whole-number <em>counts</em>, and use the exact binomial distribution on
            those.
          </p>
        </Background>
        <WorkingTable rows={ROWS_FIV} />
        <Explore title="Within one standard deviation picks out whole bars">
          <WithinWidget />
        </Explore>
        <WrongMethod
          title="Within one standard deviation is about 68%"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\hat P\approx N\!\left(0.0527,\ 0.0372^2\right)" />
              <Katex display tex="\Pr(0.0155<\hat P<0.0899)\approx0.6827" />
            </>
          }
        >
          That is the normal approximation, which the question explicitly rules out. <Katex tex="\hat P" /> can only be{' '}
          <Katex tex="0,\ \tfrac1{36},\ \tfrac2{36},\ldots" />, and with an expected count of only{' '}
          <Katex tex="1.9" /> the distribution is lumpy and skewed, nothing like a bell. Convert the interval to counts
          and add the binomial bars that fall inside it.
        </WrongMethod>
      </PartCard>

      <PartCard letter="g" topic="Confidence Interval" marks={2} statement={<>The Lorenz birdwing butterfly also lives in Town B.<br />In a particular sample of Lorenz birdwing butterflies from Town B, an approximate 95% confidence interval for the proportion of butterflies that are very large was calculated to be (0.0234, 0.0866), correct to four decimal places.<br />Determine the sample size used in the calculation of this confidence interval.</>} examinerReport={EXAM_G}>
        <Background>
          <p>
            This part runs the confidence-interval formula <em>backwards</em>: normally you are
            given <Katex tex="\hat p" /> and <Katex tex="n" /> and asked for the interval; here you
            are given the interval and asked for <Katex tex="n" />. Two facts unlock it — the
            interval is centred on <Katex tex="\hat p" />, and its half-width is the margin of
            error <Katex tex="1.96\sqrt{\tfrac{\hat p(1-\hat p)}{n}}" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_G} />
        <Explore title="How the interval's width pins down n">
          <FunnelWidget />
        </Explore>
        <WrongMethod
          title="Use p̂ = 0.0527, the probability given earlier"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="0.0527+1.96\sqrt{\tfrac{0.0527\times0.9473}{n}}=0.0866" />
              <Katex display tex="\implies n\approx167" />
            </>
          }
        >
          <Katex tex="0.0527" /> belongs to Town A; this sample is from Town B, and a confidence interval is always
          centred on its <em>own</em> sample proportion. The tell: solving with the lower endpoint, <Katex tex="0.0234" />, gives a different answer,{' '}
          <Katex tex="n\approx223" />. Find{' '}
          <Katex tex="\hat p" /> as the midpoint first.
        </WrongMethod>
        <WrongMethod
          title="Leave out the 1.96"
          source="Examiner's report"
          working={<Katex display tex="0.055+\sqrt{\tfrac{0.055\times0.945}{n}}=0.0866 \implies n\approx52" />}
        >
          Without it the margin is only one standard deviation of <Katex tex="\hat P" />, roughly a{' '}
          <Katex tex="68\%" /> interval. The <Katex tex="1.96" /> is what makes it approximately <Katex tex="95\%" />:
          it is the <Katex tex="z" />-value with <Katex tex="2.5\%" /> in each tail.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
