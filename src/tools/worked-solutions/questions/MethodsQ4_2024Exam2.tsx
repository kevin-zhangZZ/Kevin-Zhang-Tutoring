// 2024 Mathematical Methods — Exam 2, Section B Question 4 (15 marks). Airport luggage: a
// continuous density for the mass of one bag, a compound discrete variable for the number of
// heavy bags per traveller, then sample proportions and confidence intervals. Question text
// transcribed from the original paper (2024 papers are image-only, so read from rendered
// pages). Answers checked with sympy/scipy and against the VCAA examination report. Solution
// is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [21, 79],
  average: 0.8,
  comment: (
    <>
      This question was answered well.{' '}
      <Katex tex="\int_0^{30}f(x)\,dx" />, <Katex tex="\int_0^{23}f(x)\,dx" /> and{' '}
      <Katex tex="\int_{23}^{\infty}f(x)\,dx" /> were common incorrect answers.
      <br />
      There were some transcription errors when students tried to write{' '}
      <Katex tex="\tfrac{1}{67\,500}x^2(30-x)" /> instead of writing <Katex tex="f(x)" />.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: <>This question was answered well.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [21, 9, 71],
  average: 1.5,
  comment: (
    <>
      Some students worked out the variance. Others did not square the mean in the first method
      shown above. Some did not show any working.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [31, 18, 52],
  average: 1.2,
  comment: (
    <>
      Some students evaluated <Katex tex="\tfrac{\Pr(X>18)}{\Pr(X>23)}=2.243" />, giving an
      answer greater than one. Others incorrectly used 0.5 in the denominator,{' '}
      <Katex tex="\tfrac{\Pr(X>18)}{0.5}=0.468" />. Some tried to use the normal distribution.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [64, 36],
  average: 0.4,
  comment: (
    <>
      This was a &lsquo;show that&rsquo; question. Adequate working needed to be shown.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [86, 3, 11],
  average: 0.3,
  comment: (
    <>
      This question was not answered well. Some students attempted a tree diagram but were unable
      to get the correct values. Others left the question blank.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [50, 18, 33],
  average: 0.9,
  comment: (
    <>
      <Katex tex="\Pr(Y\ge7)=0.743" /> was a common incorrect answer. Some students attempted
      to use the normal distribution.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [67, 15, 18],
  average: 0.5,
  comment: (
    <>
      Some students were able to find the standard deviation but then evaluated{' '}
      <Katex tex="\Pr\!\left(6<Y<10\right)" />. Others used the normal approximation.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [44, 56],
  average: 0.6,
  comment: (
    <>
      This question was done reasonably well. Some students attempted to do it by hand and
      were unsuccessful.
    </>
  ),
}

const EXAM_EII: SAExaminerStats = {
  marks: [92, 8],
  average: 0.1,
  comment: (
    <>
      Many students were able find the minimum value, 11, but not the maximum value. A common
      incorrect answer for the maximum value was 50. Others had 10 as the minimum and 40 as the
      maximum.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{heavy} \iff X>23" />,
    reason: <>Reading the definition from the stem.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X>23) = \int_{23}^{30}\frac{1}{67500}x^2(30-x)\,dx}" />,
    reason: <>The upper terminal is 30, not <Katex tex="\infty" /> — the density is zero beyond 30, so integrating further adds nothing but is not what was asked for. Its value, <Katex tex="0.2339\ldots" />, is the 0.234 used later.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="E(X) = \int_0^{30}x\,f(x)\,dx = \frac{1}{67500}\int_0^{30}\left(30x^3-x^4\right)dx" />,
    reason: <>The definition of the mean of a continuous random variable.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{67500}\left[\frac{30x^4}{4}-\frac{x^5}{5}\right]_0^{30} = \frac{1}{67500}\left(6\,075\,000-4\,860\,000\right)" />,
    reason: <>Or straight to the calculator.</>,
  },
  {
    working: <Katex display tex="\boxed{E(X) = \frac{1\,215\,000}{67\,500} = 18 \text{ kg}}" />,
    reason: <>Comfortably above the midpoint 15, which fits a density skewed towards the heavy end.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Var}(X) = \int_0^{30}x^2f(x)\,dx - \left[E(X)\right]^2" />,
    reason: <>Or equivalently ∫(x − 18)²f(x) dx. Either way the mean must be squared.</>,
  },
  {
    working: <Katex display tex="\int_0^{30}x^2f(x)\,dx = 360" />,
    reason: <>By <Cas fn="nInt" />.</>,
  },
  {
    working: <Katex display tex="\text{Var}(X) = 360-18^2 = 360-324 = 36" />,
    reason: <>This is the variance, not the answer — the question asked for the standard deviation.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{sd}(X) = \sqrt{36} = 6 \text{ kg}}" />,
    reason: <>The report notes some students gave the variance, 36, as their answer.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X>23\mid X>18) = \frac{\Pr(X>23 \cap X>18)}{\Pr(X>18)} = \frac{\Pr(X>23)}{\Pr(X>18)}" />,
    reason: <>Every bag over 23 kg is also over 18 kg, so the intersection is just <Katex tex="\{X>23\}" />. Getting the fraction upside down gives 2.243, which cannot be a probability.</>,
  },
  {
    working: <Katex display tex="\Pr(X>23) = \int_{23}^{30}f(x)\,dx = 0.23392\ldots" />,
    reason: <>From part a.</>,
  },
  {
    working: <Katex display tex="\Pr(X>18) = \int_{18}^{30}f(x)\,dx = 0.52480" />,
    reason: <>Not 0.5 — the mean of a skewed distribution is not its median, and the report notes some students incorrectly used 0.5. (Its printed example, "Pr(X &gt; 18)/0.5 = 0.468", should read Pr(X &gt; 23)/0.5: <Katex tex="\tfrac{0.2339}{0.5}=0.468" />.)</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{0.23392\ldots}{0.52480} = 0.446}" />,
    reason: <>Three decimal places, as asked.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="W=2 \implies \text{the traveller checked in two pieces, and both are heavy}" />,
    reason: <>Two heavy pieces are impossible for the 10% and 40% groups, so only the two-piece group contributes.</>,
  },
  {
    working: <Katex display tex="\Pr(W=2) = 0.5\times0.234\times0.234" />,
    reason: <>The masses are independent of each other and of the number checked in, as the stem states.</>,
  },
  {
    working: <Katex display tex="= 0.5\times0.054756 = 0.027378" />,
    reason: <>Every line of this counts in a "show that" — the report notes adequate working needed to be shown.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(W=2) = 0.027 \ \text{(3 d.p.)}}" />,
    reason: <>As required.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(W=0) = 0.1\times1 + 0.4\times0.766 + 0.5\times0.766^2" />,
    reason: <>Three ways to check in no heavy bags: bring none, bring one that is light, or bring two that are both light. Here <Katex tex="1-0.234=0.766" />.</>,
  },
  {
    working: <Katex display tex="= 0.1+0.3064+0.293378 = 0.699778" />,
    reason: <>Adding the three branches.</>,
  },
  {
    working: <Katex display tex="\Pr(W=1) = 0.4\times0.234 + 0.5\times2\times0.234\times0.766" />,
    reason: <>One heavy bag either is the only bag, or is one of two — and the <Katex tex="2" /> counts which of the two it is.</>,
  },
  {
    working: <Katex display tex="= 0.0936+0.179244 = 0.272844" />,
    reason: <>Adding the two branches.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(W=0) = 0.700, \qquad \Pr(W=1) = 0.273}" />,
    reason: <>Check: <Katex tex="0.699778+0.272844+0.027378 = 1" /> exactly, which is a complete verification of all three entries.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="Y \sim \text{Bi}(35,\,0.234), \quad \hat{P} = \frac{Y}{35}" />,
    reason: <>The number of heavy bags in the sample. A sample proportion question is a binomial question in disguise, and the stem says not to approximate.</>,
  },
  {
    working: <Katex display tex="\hat{P}>0.2 \iff Y > 7 \iff Y \ge 8" />,
    reason: <><Katex tex="0.2\times35 = 7" /> exactly, so <Katex tex="Y=7" /> gives <Katex tex="\hat{P}=0.2" />, which is <em>not</em> greater than 0.2 and must be excluded. Including it gives <Katex tex="\Pr(Y\ge7)=0.743" />, which the report notes was a common incorrect answer.</>,
  },
  {
    working: <Katex display tex="\Pr(Y\ge8) = 1-\Pr(Y\le7) = 1-\text{binomCdf}(35,\,0.234,\,0,\,7)" />,
    reason: <>By <Cas fn="binomCdf" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0.595}" />,
    reason: <>Three decimal places.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="E\!\left(\hat{P}\right) = p = 0.234" />,
    reason: <>The sample proportion is unbiased.</>,
  },
  {
    working: <Katex display tex="\text{sd}\!\left(\hat{P}\right) = \sqrt{\frac{p(1-p)}{n}} = \sqrt{\frac{0.234\times0.766}{35}} = 0.071563" />,
    reason: <>The standard deviation of the sample proportion.</>,
  },
  {
    working: <Katex display tex="0.234\pm0.071563 \implies 0.162437 < \hat{P} < 0.305563" />,
    reason: <>Within one standard deviation of the mean.</>,
  },
  {
    working: <Katex display tex="\times 35: \quad 5.685 < Y < 10.695 \iff 6 \le Y \le 10" />,
    reason: <>Converting back to counts. This is the crux: <Katex tex="Y" /> is a whole number, so the interval rounds <em>inwards</em> to 6 through 10.</>,
  },
  {
    working: <Katex display tex="\Pr(6\le Y\le10) = \text{binomCdf}(35,\,0.234,\,6,\,10)" />,
    reason: <>Both endpoints included. The report notes some students evaluated <Katex tex="\Pr(6<Y<10)" /> instead.</>,
  },
  {
    working: <Katex display tex="\boxed{0.684}" />,
    reason: <>Reassuringly near the 0.68 a normal distribution would give — but the question explicitly forbade that route.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="\hat{p} = \frac{10}{50} = 0.2, \qquad n = 50" />,
    reason: <>The point estimate from this sample.</>,
  },
  {
    working: <Katex display tex="z = \text{invNorm}(0.95,0,1) = 1.6449" />,
    reason: <>For 90% confidence, 5% sits in each tail. Using <Katex tex="1.96" /> would give a 95% interval.</>,
  },
  {
    working: <Katex display tex="0.2 \pm 1.6449\sqrt{\frac{0.2\times0.8}{50}} = 0.2\pm1.6449\times0.056569" />,
    reason: <>Or use the calculator's one-proportion <Katex tex="z" />-interval directly.</>,
  },
  {
    working: <Katex display tex="\boxed{(0.107,\ 0.293)}" />,
    reason: <>Three decimal places.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{width} = 2z\sqrt{\frac{\hat{p}(1-\hat{p})}{50}}" />,
    reason: <>Only <Katex tex="\hat{p}" /> changes between the two samples, so the comparison is entirely about <Katex tex="\hat{p}(1-\hat{p})" />.</>,
  },
  {
    working: <Katex display tex="\hat{p}(1-\hat{p}) > 0.2\times0.8 = 0.16" />,
    reason: <>Wider means a bigger product under the root.</>,
  },
  {
    working: <Katex display tex="\hat{p}(1-\hat{p}) \text{ is a parabola peaking at } \hat{p}=0.5 \implies 0.2<\hat{p}<0.8" />,
    reason: <>The product equals 0.16 at both <Katex tex="0.2" /> and <Katex tex="0.8" />, and exceeds it strictly between — the symmetry that supplies the upper limit, which the report notes many students missed.</>,
  },
  {
    working: <Katex display tex="0.2<\frac{k}{50}<0.8 \implies 10<k<40" />,
    reason: <>Where <Katex tex="k" /> is the number of heavy pieces. Both ends are strict, since equality reproduces the same width.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{minimum } 11, \qquad \text{maximum } 39}" />,
    reason: <>Answering 50 for the maximum gives <Katex tex="\hat{p}=1" /> and a width of zero — the narrowest interval possible, not the widest. The report notes 50 was a common incorrect answer.</>,
  },
]

export default function MethodsQ4_2024Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (15 marks)</p>
        <p>
          At an airport, luggage is weighed before it is checked in.
        </p>
        <p>
          The mass of each piece of luggage, in kilograms, is modelled by a continuous random variable{' '}
          <Katex tex="X" />, whose probability density function is
        </p>
        <div className="py-1">
          <Katex
            display
            tex="f(x)=\begin{cases}\dfrac{1}{67500}x^2(30-x) & 0\le x\le30\\[8pt] 0 & \text{elsewhere}\end{cases}"
          />
        </div>
        <p>A piece of luggage is labelled as heavy if its mass exceeds 23 kg.</p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The question moves through three different objects that all describe the same
            luggage. <Katex tex="X" /> is the mass of <em>one</em> bag (continuous);{' '}
            <Katex tex="W" /> is the number of heavy bags <em>one traveller</em> checks in
            (discrete, and not binomial, because how many bags they bring is itself random);{' '}
            <Katex tex="\hat{P}" /> is the proportion of heavy bags in a <em>sample</em>{' '}
            (binomial, scaled). Deciding which one a part is about is most of the work.
          </p>
          <p>
            Two boundary details carry marks. In d.i., <Katex tex="0.2\times35=7" /> exactly,
            so <Katex tex="\hat{P}>0.2" /> means <Katex tex="Y\ge8" />, not{' '}
            <Katex tex="Y\ge7" />. In d.ii., the interval of <Katex tex="\hat{P}" /> values
            converts to <Katex tex="5.685<Y<10.695" />, which for a whole number means{' '}
            <Katex tex="6\le Y\le10" /> — rounding inwards, not outwards.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Continuous PDF"
        marks={1}
        statement={
          <>
            Write a definite integral which gives the probability that a piece of luggage is
            labelled as heavy.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b.i" topic="Mean of PDF" marks={1} statement={<>Find the mean of <Katex tex="X" />.</>} examinerReport={EXAM_BI}>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard letter="b.ii" topic="Standard Deviation" marks={2} statement={<>Find the standard deviation of <Katex tex="X" />.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Conditional Probability"
        marks={2}
        statement={
          <>
            Given that the mass of a piece of luggage is more than the mean, find the
            probability that it is labelled as heavy, correct to three decimal places.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">
          Use the following information to answer parts c and d of this question.
        </p>
        <p>Of the travellers flying from the airport</p>
        <ul className="list-disc pl-6 flex flex-col gap-1">
          <li>10% do not check in any luggage</li>
          <li>40% check in exactly one piece of luggage</li>
          <li>50% check in exactly two pieces of luggage.</li>
        </ul>
        <p>
          Assume that the mass of each piece of luggage is independent of the number of pieces
          checked in by each traveller. Use the value of 0.234 for the probability that a piece
          of luggage is labelled as heavy.
        </p>
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">c.</span> Let{' '}
          <Katex tex="W" /> be the discrete random variable that represents the number of
          pieces of luggage labelled as <b>heavy</b> checked in by each traveller.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Discrete Distribution"
        marks={1}
        statement={
          <>
            Show that <Katex tex="\Pr(W=2)=0.027" />, correct to three decimal places.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Discrete Distribution"
        marks={2}
        statement={
          <>
            Complete the table below for the probability distribution <Katex tex="W" />,
            correct to three decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
        <div className="overflow-x-auto">
          <table className="text-[13.5px] border-collapse">
            <tbody>
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal">
                  <Katex tex="w" />
                </th>
                {[0, 1, 2].map((v) => (
                  <td key={v} className="border border-gray-300 dark:border-gray-700 px-4 py-1.5 text-center">{v}</td>
                ))}
              </tr>
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal whitespace-nowrap">
                  <Katex tex="\Pr(W=w)" />
                </th>
                {['', '', '0.027'].map((v, i) => (
                  <td key={i} className="border border-gray-300 dark:border-gray-700 px-4 py-1.5 text-center">{v}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          On a particular day, a random sample of 35 pieces of luggage was selected at the
          airport.
          <br />
          Let <Katex tex="\hat{P}" /> be the random variable that represents the
          proportion of luggage labelled as heavy in random samples of 35.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Sample Proportion"
        marks={2}
        statement={
          <>
            Find <Katex tex="\Pr\!\left(\hat{P}>0.2\right)" />, correct to three decimal
            places.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Sample Proportion"
        marks={2}
        statement={
          <>
            Determine the probability that <Katex tex="\hat{P}" /> lies within one standard
            deviation of its mean, correct to three decimal places. Do <b>not</b> use a normal
            approximation.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e.i"
        topic="Confidence Interval"
        marks={1}
        statement={
          <>
            In one random sample of 50 pieces of luggage, 10 are labelled as heavy.
            <br />
            Use this sample to find an approximate 90% confidence interval for <Katex tex="p" />, the
            population proportion of luggage labelled as heavy, correct to three decimal
            places.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Confidence Interval"
        marks={1}
        statement={
          <>
            A second random sample of 50 pieces of luggage is selected. Using this sample, the
            approximate 90% confidence interval for <Katex tex="p" />, the population
            proportion of luggage labelled as heavy, is <b>wider</b> than the one obtained
            above in <b>part e.i</b>.
            <br />
            State the minimum and maximum possible number of pieces
            of luggage labelled as heavy in the second sample.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>
    </div>
  )
}
