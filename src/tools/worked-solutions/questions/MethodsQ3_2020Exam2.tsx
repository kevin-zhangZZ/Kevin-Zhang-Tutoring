// 2020 Mathematical Methods — Exam 2, Section B Question 3 (12 marks). Delivery times: a
// normal distribution, a conditional probability, a shifted mean, then a binomial tail and
// a law of total probability. Question text transcribed from the original paper (the part c.
// reference "on page 19" becomes "above"); the figure is a crop of VCAA's own artwork. Answers
// checked with scipy/sympy and against the VCAA examination report and itute, which agree on
// every part (itute's part c. sketch shows the same two shifted curves over the window).
// Solution is original.
//
// Interactive diagrams (§15), all this site's own explanatory figures computed from the
// question's rules: part b. shades the given half T > 0 and the slice 0 < T ≤ c inside it, with a
// toggle for the report's Pr(T ≤ 3)-on-top error (interactives/meth-2020e2-q3b-given.tsx);
// part c. slides the mean k across the fixed window and plots the area against k, which hits
// 46.48% twice (interactives/meth-2020e2-q3c-slide.tsx); part d. draws Bi(8, 0.85) as bars with a
// ×20 magnifier on the left tail and toggles for the report's X ≤ 4 and p = 0.15 errors
// (interactives/meth-2020e2-q3d-tail.tsx); part e.i. lists every on-time/late
// sequence for n ≤ 4 so "one or more late" is visibly all but one row, with the report's
// 1 − 0.15ⁿ shown taking the wrong row (interactives/meth-2020e2-q3ei-outcomes.tsx); part e.ii.
// plots 1 − 0.85ⁿ against n with a zoom on 18 vs 19 and a toggle for the carried-forward
// 1 − 0.15ⁿ (interactives/meth-2020e2-q3eii-threshold.tsx); part f. is the tree diagram as a
// unit-square area model, where the extra above 0.75 must fill the gap below it
// (interactives/meth-2020e2-q3f-balance.tsx).
//
// Sept 2026 review: the stem box before e.i/e.ii now carries the paper's "e." label and the
// paper's bold "not" in e.i. and e.ii. is restored. Tutors' videos (LMKMaths, Mr Nie) were read
// for part c.: LMK's CAS solve and his translation argument both find only k = −1.5 (he considers
// the mirror-image interval and then sets it aside); Mr Nie finds both by solving with the
// integral of the density, and warns that solving normCdf with an unknown mean returned only
// −1.5 on his calculator. Our working leads with the symmetry argument so the second value is
// never missed.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import normalSrc from './meth-2020e2-q3-normal.png'

const GivenWidget = lazyWidget(() => import('../interactives/meth-2020e2-q3b-given'))
const SlideWidget = lazyWidget(() => import('../interactives/meth-2020e2-q3c-slide'))
const TailWidget = lazyWidget(() => import('../interactives/meth-2020e2-q3d-tail'))
const OutcomesWidget = lazyWidget(() => import('../interactives/meth-2020e2-q3ei-outcomes'))
const ThresholdWidget = lazyWidget(() => import('../interactives/meth-2020e2-q3eii-threshold'))
const BalanceWidget = lazyWidget(() => import('../interactives/meth-2020e2-q3f-balance'))

const EXAM_A: SAExaminerStats = {
  marks: [32, 68],
  average: 0.7,
  comment: <><Katex tex="-1" /> or 2 minutes were seen occasionally.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [45, 15, 41],
  average: 1,
  comment: (
    <>
      Many students were able to recognise that this was a conditional probability question.
      Some were unable to write <Katex tex="\Pr(0<T\le3)" /> correctly. Others had 0.77 as
      the numerator and 0.5 as the denominator, creating an answer greater than 1. Some
      rounded too early, and 0.546 was seen occasionally.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [58, 17, 19, 6],
  average: 0.7,
  comment: (
    <>
      Appropriate working must be shown. Drawing a diagram is a suitable method. Many
      students did not find <Katex tex="k=-2.5" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [40, 19, 41],
  average: 1,
  comment: (
    <>
      Most students were able to recognise the binomial distribution, giving the correct{' '}
      <Katex tex="n" /> and <Katex tex="p" /> values. <Katex tex="p=0.15" /> was seen
      occasionally. A common incorrect answer was <Katex tex="\Pr(X\le4)=0.021" />.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [76, 24],
  average: 0.2,
  comment: <><Katex tex="1-0.15^n" /> was a common incorrect answer.</>,
}

const EXAM_EII: SAExaminerStats = {
  marks: [77, 23],
  average: 0.2,
  comment: (
    <>
      Some students left their answer as 18.43 or rounded down to 18. A common incorrect
      answer was 2, due to students solving <Katex tex="1-0.15^n>0.95" />.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [96, 1, 3],
  average: 0.1,
  comment: (
    <>
      Students who used a tree diagram were generally successful. Some gave approximate
      answers when exact answers were required.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="T \sim \mathrm{N}\left(0,4^2\right)" />,
    reason: <>Mean 0, standard deviation 4. <Katex tex="\Pr(T\le a)=0.6" /> says the area under the curve to the <em>left</em> of <Katex tex="a" /> is 0.6.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.6, 0, 4)</Cas>,
    reason: <>An inverse normal, not a normal CDF: the probability is given and the cut-off is wanted. <Cas fn="invNorm" /> takes the area to the left of the cut-off, which is exactly what <Katex tex="\Pr(T\le a)" /> is.</>,
  },
  {
    working: <Katex display tex="a = 1.0133\ldots" />,
    reason: <>Check the sign: 0.6 is more than half, so <Katex tex="a" /> must be above the mean of 0, and only a little above, since 0.6 is only a little more than 0.5. An answer of <Katex tex="-1" /> (the report notes it was seen occasionally) fails this check: it is the cut-off with 0.6 of the area to its <em>right</em>, <Katex tex="\texttt{invNorm}(0.4,0,4)=-1.01\ldots" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 1 \text{ minute}}" />,
    reason: <>To the nearest minute, as asked: one minute after the scheduled time.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(T\le3\mid T>0)" />,
    reason: <>Translate the words first. &ldquo;No later than three minutes after&rdquo; is <Katex tex="T\le3" />: it can be exactly 3, but not later. &ldquo;Given that it arrives after its scheduled delivery time&rdquo; is the condition <Katex tex="T>0" />, and a condition goes behind the bar.</>,
  },
  {
    working: <Katex display tex="= \frac{\Pr(0<T\le3)}{\Pr(T>0)}" />,
    reason: <>Conditional probability: <Katex tex="\Pr(A\mid B)=\frac{\Pr(A\cap B)}{\Pr(B)}" />. On top, <em>both</em> things must happen: late (<Katex tex="T>0" />) and no later than 3 (<Katex tex="T\le3" />), which is the band <Katex tex="0<T\le3" />. <Katex tex="\Pr(T\le3)" /> on its own would also count deliveries that arrived early, which the condition has already ruled out. That is the report&apos;s 0.77 over 0.5, an answer greater than 1.</>,
    more: <>See the diagram below.</>,
  },
  {
    working: <Katex display tex="\Pr(T>0) = 0.5" />,
    reason: <>The mean is 0, so exactly half the distribution lies above it. No calculator needed.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(0, 3, 0, 4) = 0.27337…</Cas>,
    reason: <>The numerator: the area under the curve between 0 and 3.</>,
  },
  {
    working: <Katex display tex="\frac{0.27337\ldots}{0.5} = 0.54674\ldots" />,
    reason: <>Keep full precision until the last line. Rounding the numerator to 0.273 first gives 0.546, which the report notes was seen occasionally.</>,
  },
  {
    working: <Katex display tex="\boxed{0.547}" />,
    reason: <>To three decimal places. Sanity check: just over half of the late deliveries are at most 3 minutes late. That is plausible, since 3 minutes is less than one standard deviation (4 minutes) past the mean, where the curve is still high.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(-3\le T\le2) = 0.4648\ldots" />,
    reason: <>The given 46.48% (<Cas fn="normCdf">normCdf(−3, 2, 0, 4)</Cas> = 0.46483…). Read the interval relative to the mean of 0: it runs from <b>3 below</b> the mean to <b>2 above</b> it.</>,
  },
  {
    working: <Katex display tex="X \sim \mathrm{N}\left(k,4^2\right), \quad \Pr(-4.5\le X\le0.5) = 0.4648\ldots" />,
    reason: <>Let <Katex tex="X" /> be the delivery time under the improved model. Only the mean has changed. With <Katex tex="\sigma" /> still 4, the bell curve has exactly the same shape, just slid along the <Katex tex="t" />-axis, so any interval that sits the same way relative to the mean holds the same area.</>,
  },
  {
    working: <Katex display tex="\Pr(k-3\le X\le k+2) = 0.4648\ldots" />,
    reason: <>The old interval, slid along with the curve: 3 below to 2 above the new mean.</>,
  },
  {
    working: <Katex display tex="\Pr(k-2\le X\le k+3) = 0.4648\ldots" />,
    reason: <>A normal curve is symmetric about its mean, so the <em>mirror-image</em> interval, 2 below to 3 above, holds the same area too. This is the step that finds the second value; the report notes many students did not find <Katex tex="k=-2.5" />.</>,
  },
  {
    working: <Katex display tex="k-3=-4.5,\ \ k+2=0.5 \implies k=-1.5" />,
    reason: <>Match the window <Katex tex="-4.5\le t\le0.5" /> to the first placement. Both ends give the same <Katex tex="k" /> because both intervals are 5 wide. This is the report&apos;s &ldquo;translation of 1.5 units in the direction of the negative <Katex tex="t" />-axis&rdquo;.</>,
  },
  {
    working: <Katex display tex="k-2=-4.5,\ \ k+3=0.5 \implies k=-2.5" />,
    reason: <>Match it to the mirror-image placement.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(−4.5, 0.5, −2.5, 4) = 0.46483…</Cas>,
    reason: <>Check each value on the calculator (<Katex tex="k=-1.5" /> gives the same 0.46483…). You can also go straight to <Cas fn="solve">solve(normCdf(−4.5, 0.5, k, 4) = 0.4648, k)</Cas>, but a solver may return only one of the two roots, depending on the calculator and its starting point. The symmetry argument, or a graph of the area against <Katex tex="k" />, is what tells you to look for two.</>,
    more: <>The lower graph in the diagram below is one like this.</>,
  },
  {
    working: <Katex display tex="\boxed{k = -1.5 \ \text{ or } \ k = -2.5}" />,
    reason: <>Both are exact, so they are already correct to one decimal place. With 3 marks, working must be shown, and the report notes that drawing a diagram is a suitable method: sketch the curve over the window with its mean 3 in from the left end (<Katex tex="k=-1.5" />), and again with it 2 in from the left end (<Katex tex="k=-2.5" />).</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="X = \text{number on time or earlier}, \quad X \sim \mathrm{Bi}(8,0.85)" />,
    reason: <>Eight deliveries, each independently on time (or earlier) or not, with the same probability 0.85 each time: a binomial count. Count the outcome that 0.85 describes, so <Katex tex="p=0.85" />, not 0.15.</>,
  },
  {
    working: <Katex display tex="\text{fewer than half of eight} \implies X<4 \implies X\le3" />,
    reason: <>Half of 8 is 4, and &ldquo;fewer than&rdquo; leaves 4 itself out. <Katex tex="X" /> is a count, so <Katex tex="X<4" /> is the same as <Katex tex="X\le3" />. The report&apos;s common incorrect answer used <Katex tex="X\le4" />.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(8, 0.85, 0, 3)</Cas>,
    reason: <>A cumulative tail (0, 1, 2 or 3 on time), not a single term.</>,
  },
  {
    working: <Katex display tex="= 0.0028538\ldots" />,
    reason: <>Tiny, as it should be: on average <Katex tex="8\times0.85=6.8" /> of the 8 are on time, so 3 or fewer is far out in the tail.</>,
  },
  {
    working: <Katex display tex="\boxed{0.003}" />,
    reason: <>To three decimal places.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{one or more late}) = 1-\Pr(\text{none late})" />,
    reason: <>&ldquo;Not on time or earlier&rdquo; means late. &ldquo;One or more late&rdquo; covers 1, 2, …, <Katex tex="n" /> late: <Katex tex="n" /> separate cases. Its opposite, &ldquo;none late&rdquo;, is a single case, so work with the complement.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{none late}) = \Pr(\text{all on time}) = 0.85^n" />,
    reason: <>None late means every one of the <Katex tex="n" /> deliveries is on time or earlier. They are independent, so multiply <Katex tex="n" /> factors of 0.85. (Equivalently, with <Katex tex="L\sim\mathrm{Bi}(n,0.15)" /> the number late, <Katex tex="\Pr(L=0)=\binom{n}{0}0.15^0\,0.85^n=0.85^n" />.)</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(\text{one or more late}) = 1-0.85^n}" />,
    reason: <>Check with <Katex tex="n=1" />: a single delivery is late with probability 0.15, and <Katex tex="1-0.85^1=0.15" />. The report&apos;s common incorrect answer, <Katex tex="1-0.15^n" />, fails this check (it gives 0.85).</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="1-0.85^n \ge 0.95" />,
    reason: <>&ldquo;At least 0.95&rdquo; is <Katex tex="\ge" />, using the expression from part e.i.</>,
  },
  {
    working: <Katex display tex="0.85^n \le 0.05" />,
    reason: <>Rearranging: the chance that <em>all</em> are on time has to drop to 5% or less.</>,
  },
  {
    working: <Katex display tex="n\log_e(0.85) \le \log_e(0.05)" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides to bring <Katex tex="n" /> down. (<Katex tex="\log_e" /> is increasing, so this step keeps the direction of the inequality.)</>,
  },
  {
    working: <Katex display tex="n \ge \frac{\log_e(0.05)}{\log_e(0.85)} = 18.43\ldots" />,
    reason: <><Katex tex="\log_e(0.85)" /> is negative, because <Katex tex="0.85<1" />, and dividing by a negative number flips the inequality. The direction makes sense: more deliveries give more chances of a late one, so <Katex tex="n" /> has to be <em>at least</em> something. (Or <Cas fn="solve">solve(1 − 0.85^n ≥ 0.95, n)</Cas>.)</>,
  },
  {
    working: <Katex display tex="\begin{aligned}n=18&: \ 1-0.85^{18} = 0.946\ldots < 0.95\\ n=19&: \ 1-0.85^{19} = 0.954\ldots \ge 0.95\end{aligned}" />,
    reason: <><Katex tex="n" /> counts deliveries, so it must be a whole number, and 18.43 is not one. Check the whole numbers either side: 18 falls just short, 19 clears it.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 19}" />,
    reason: <>Round <em>up</em>, not to the nearest integer: <Katex tex="n\ge18.43\ldots" /> asks for the first whole number past 18.43. The report notes some students left their answer as 18.43 or rounded down to 18.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{array}{lcl}\text{before 4 pm}: \ 1-y & \longrightarrow & \text{on time}: \ 0.85\\[2pt] \text{after 4 pm}: \ y & \longrightarrow & \text{on time}: \ x\end{array}" />,
    reason: <>A tree diagram in two stages: first <em>when</em> the delivery is made (after 4 pm with probability <Katex tex="y" />, so before 4 pm with <Katex tex="1-y" />), then whether it is on time. Before 4 pm the company&apos;s claim holds, so 0.85; after 4 pm it is <Katex tex="x" />. The report notes students who used a tree diagram were generally successful.</>,
  },
  {
    working: <Katex display tex="0.85(1-y)+xy = 0.75" />,
    reason: <>&ldquo;Overall&rdquo; means across all deliveries, before and after 4 pm together. Multiply along each on-time branch and add the two branches (the law of total probability). The result is a weighted average of 0.85 and <Katex tex="x" />, weighted by how many deliveries fall in each group.</>,
  },
  {
    working: <Katex display tex="0.85-0.85y+xy = 0.75 \implies y(0.85-x) = 0.1" />,
    reason: <>Expand, then collect the <Katex tex="y" /> terms.</>,
  },
  {
    working: <Katex display tex="y = \frac{0.1}{0.85-x} = \frac{2}{17-20x}" />,
    reason: <>Multiplying top and bottom by 20 gives the report&apos;s form. Since <Katex tex="x\le0.7<0.85" />, the denominator is positive. The analyst doesn&apos;t give one value of <Katex tex="x" />, only <Katex tex="0.3\le x\le0.7" />, so <Katex tex="y" /> isn&apos;t one number either: it has a range of values, and the question wants its ends.</>,
  },
  {
    working: <Katex display tex="x \uparrow \implies 0.85-x \downarrow \implies y \uparrow" />,
    reason: <>As <Katex tex="x" /> increases, the denominator shrinks, so <Katex tex="y" /> increases: <Katex tex="y" /> is an increasing function of <Katex tex="x" /> on <Katex tex="[0.3,0.7]" />, and its smallest and largest values come at the endpoints. In context: the worse the after-4 pm record, the fewer deliveries can be after 4 pm if the overall rate is still to reach 0.75.</>,
  },
  {
    working: <Katex display tex="x = 0.3: \ y = \frac{0.1}{0.55} = \frac{2}{11}" />,
    reason: <>The minimum.</>,
  },
  {
    working: <Katex display tex="x = 0.7: \ y = \frac{0.1}{0.15} = \frac{2}{3}" />,
    reason: <>The maximum.</>,
  },
  {
    working: <Katex display tex="\boxed{y_{\min} = \tfrac{2}{11}, \quad y_{\max} = \tfrac{2}{3}}" />,
    reason: <>Exact values: the report notes some students gave approximate answers (about 0.18 and 0.67) when exact answers were required. Check the minimum: with <Katex tex="y=\tfrac{2}{11}" />, <Katex tex="0.85\times\tfrac{9}{11}+0.3\times\tfrac{2}{11}=\tfrac{8.25}{11}=0.75" />. Only 3% of students earned both marks.</>,
  },
]

export default function MethodsQ3_2020Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (12 marks)</p>
        <p>
          A transport company has detailed records of all its deliveries. The number of
          minutes a delivery is made before or after its scheduled delivery time can be
          modelled as a normally distributed random variable, <Katex tex="T" />, with a mean
          of zero and a standard deviation of four minutes. A graph of the probability
          distribution of <Katex tex="T" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={normalSrc}
            alt="A bell curve centred at t = 0 on an axis scaled from −12 to 12 minutes — from the original 2020 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Inverse Normal"
        marks={1}
        statement={
          <>
            If <Katex tex="\Pr(T\le a)=0.6" />, find <Katex tex="a" /> to the nearest minute.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Conditional Probability"
        marks={2}
        statement={
          <>
            Find the probability, correct to three decimal places, of a delivery being no
            later than three minutes after its scheduled delivery time, given that it arrives
            after its scheduled delivery time.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="A “given” shrinks the whole: the answer is the orange slice’s share of the blue half">
          <GivenWidget />
        </Explore>
        <WrongMethod
          title="Put Pr(T ≤ 3) on top"
          source="Examiner's report"
          working={<Katex display tex="\frac{\Pr(T\le3)}{\Pr(T>0)} = \frac{0.7733\ldots}{0.5} = 1.546\ldots" />}
        >
          A probability greater than 1 is the giveaway. <Katex tex="\Pr(T\le3)" /> includes every delivery that arrived
          early (<Katex tex="T\le0" />, half of all deliveries), but the condition says this delivery was late, so those
          outcomes can&apos;t happen. The top of a conditional probability is the overlap of the event and the condition,
          here <Katex tex="0<T\le3" />, and it always sits inside the bottom, so the answer can never pass 1.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Normal Distribution"
        marks={3}
        statement={
          <>
            Using the model described above, the transport company can make 46.48% of its
            deliveries over the interval <Katex tex="-3\le t\le2" />.
            <br />
            It has an improved delivery model with a mean of <Katex tex="k" /> and a standard
            deviation of four minutes.
            <br />
            Find the values of <Katex tex="k" />, correct to one decimal place, so
            that 46.48% of the transport company's deliveries can be made over the interval{' '}
            <Katex tex="-4.5\le t\le0.5" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Slide the mean: the window holds 46.48% twice, once either side of centre">
          <SlideWidget />
        </Explore>
        <WrongMethod
          title="Line the window up with the old interval and stop at k = −1.5"
          source="Examiner's report"
          working={<Katex display tex="k-3=-4.5 \implies k=-1.5 \quad (\text{only})" />}
        >
          That is one of two placements. The window can also sit 2 below and 3 above the mean, the mirror image, and
          because the curve is symmetric it holds exactly the same area. Another way to see it: the area inside a fixed
          window is largest when the window is centred on the mean (at <Katex tex="k=-2" /> it is about 46.80%) and falls
          away on both sides, so a value just under that maximum is reached twice. The question&apos;s own words,
          &ldquo;find the <b>values</b> of <Katex tex="k" />&rdquo;, were the hint that there is more than one.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          A rival transport company claims that there is a 0.85 probability that each delivery it
          makes will arrive on time or earlier.
          <br />
          Assume that whether each delivery is on time or earlier is independent of other
          deliveries.
        </p>
      </div>

      <PartCard
        letter="d"
        topic="Binomial Distribution"
        marks={2}
        statement={
          <>
            Assuming that the rival company's claim is true, find the probability that on a
            day in which the rival company makes eight deliveries, fewer than half of them
            arrive on time or earlier. Give your answer correct to three decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <Explore title="Fewer than half of eight is the bars 0 to 3, far out in the tail, and not the bar at 4">
          <TailWidget />
        </Explore>
        <WrongMethod
          title="“Fewer than half” means X ≤ 4"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned}&\Pr(X\le4)\\ &=\texttt{binomCdf}(8,\,0.85,\,0,\,4)\\ &= 0.021\ldots\end{aligned}" />}
        >
          Half of 8 is 4, and fewer than half is fewer than 4, so 4 itself is out. <Cas fn="binomCdf" /> counts both of
          its bounds, so an upper bound of 4 adds the whole <Katex tex="X=4" /> bar, <Katex tex="\Pr(X=4)\approx0.0185" />,
          which is most of the wrong answer. Before reaching for the calculator, list the whole numbers the words allow
          (0, 1, 2, 3).
        </WrongMethod>
        <WrongMethod
          title="Use p = 0.15"
          source="Examiner's report"
          working={<Katex display tex="\texttt{binomCdf}(8,\,0.15,\,0,\,3) = 0.978\ldots" />}
        >
          0.15 is the chance of being <em>late</em>. With <Katex tex="X" /> counting deliveries that are on time or
          earlier, <Katex tex="p" /> has to be the chance of that, 0.85. The size of the answer gives it away: if 85% of
          deliveries are on time, a day with fewer than half on time should be rare, not 98% likely.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">e.</p>
        <p>
          Assuming that the rival company's claim is true, consider a day in which it makes{' '}
          <Katex tex="n" /> deliveries.
        </p>
      </div>

      <PartCard
        letter="e.i"
        topic="At Least One"
        marks={1}
        statement={
          <>
            Express, in terms of <Katex tex="n" />, the probability that one or more deliveries
            will <b>not</b> arrive on time or earlier.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
        <Explore title="“One or more late” is every possible day except one: the day they are all on time">
          <OutcomesWidget />
        </Explore>
        <WrongMethod
          title="One or more not on time, so 1 − 0.15ⁿ"
          source="Examiner's report"
          working={<Katex display tex="1-0.15^n" />}
        >
          <Katex tex="0.15^n" /> is the chance that <em>every</em> delivery is late, so <Katex tex="1-0.15^n" /> is the
          chance that they are not all late, which means at least one is <b>on time</b>. That is a different event. The
          opposite of &ldquo;one or more late&rdquo; is &ldquo;none late&rdquo;, which is &ldquo;all on time&rdquo;,{' '}
          <Katex tex="0.85^n" />. To catch it, try <Katex tex="n=1" />: one delivery is late with probability 0.15, but{' '}
          <Katex tex="1-0.15^1=0.85" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Minimum Sample Size"
        marks={1}
        statement={
          <>
            Hence, or otherwise, find the minimum value of <Katex tex="n" /> such that there
            is at least a 0.95 probability that one or more deliveries will <b>not</b> arrive
            on time or earlier.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
        <Explore title="The chance of a late delivery creeps towards 1: the first whole n to clear 0.95 is 19">
          <ThresholdWidget />
        </Explore>
        <WrongMethod
          title="Round 18.43 to the nearest whole number"
          source="Examiner's report"
          working={<Katex display tex="n \ge 18.43\ldots \implies n = 18" />}
        >
          Check it: <Katex tex="1-0.85^{18}=0.946\ldots" />, which is less than 0.95, so 18 deliveries aren&apos;t
          enough. <Katex tex="n\ge18.43\ldots" /> means <Katex tex="n" /> must be at least 18.43, and 18 isn&apos;t. For a
          minimum whole number, always round <b>up</b>, then check that the number below fails and yours passes.
        </WrongMethod>
        <WrongMethod
          title="Carry forward 1 − 0.15ⁿ from part e.i"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned}&1-0.15^n>0.95\\ &\implies n>1.579\ldots \implies n=2\end{aligned}" />}
        >
          A sanity check catches this. With two deliveries from a company that is on time 85% of the time, both are on
          time with probability <Katex tex="0.85^2\approx0.72" />, so a late one is nowhere near 95% certain. An answer
          that small should send you back to part e.i.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="f"
        topic="Total Probability"
        marks={2}
        statement={
          <>
            An analyst from a government department believes the rival transport company's
            claim is only true for deliveries made before 4 pm. For deliveries made after 4
            pm, the analyst believes the probability of a delivery arriving on time or earlier
            is <Katex tex="x" />, where <Katex tex="0.3\le x\le0.7" />
            <br />
            After observing a large number of the rival transport company's deliveries, the
            analyst believes that the overall probability that a delivery arrives on time or
            earlier is actually 0.75
            <br />
            Let the probability that a delivery is made after 4 pm be <Katex tex="y" />.
            <br />
            Assuming that the analyst's beliefs are true, find the minimum
            and maximum values of <Katex tex="y" />.
          </>
        }
        examinerReport={EXAM_F}
      >
        <Background title="An overall probability is a weighted average">
          <p>
            The deliveries fall into two groups, before and after 4 pm, and each group has its
            own chance of being on time. The overall chance is not the plain average of the two:
            each group counts in proportion to its share of the deliveries. That is what the tree
            diagram (the law of total probability) computes:{' '}
            <Katex tex="\Pr(\text{on time}) = \Pr(\text{before})\Pr(\text{on time}\mid\text{before}) + \Pr(\text{after})\Pr(\text{on time}\mid\text{after})" />.
          </p>
          <p>
            So 0.75 must lie between <Katex tex="x" /> and 0.85, and the bigger the after-4 pm
            share <Katex tex="y" />, the closer the overall rate is pulled towards <Katex tex="x" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <Explore title="0.75 is an average of 0.85 and x: the after-4 pm share y is what balances it">
          <BalanceWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
