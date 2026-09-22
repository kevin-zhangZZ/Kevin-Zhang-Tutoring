// 2020 Mathematical Methods — Exam 2, Section B Question 3 (12 marks). Delivery times: a
// normal distribution, a conditional probability, a shifted mean, then a binomial tail and
// a law of total probability. Question text transcribed from the original paper; the figure
// is a crop of VCAA's own artwork. Answers checked with scipy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import normalSrc from './meth-2020e2-q3-normal.png'

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
      answer was 2, due to students solving <Katex tex="1-0.15^n\ge0.95" />.
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
    reason: <>Mean zero, standard deviation four — so <Katex tex="a" /> will be small and positive, since 0.6 is just above half.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.6, 0, 4)</Cas>,
    reason: <>An inverse-normal, not a normal CDF: the probability is given and the cut-off is wanted.</>,
  },
  {
    working: <Katex display tex="a = 1.0133\ldots" />,
    reason: <>Minutes after the scheduled time.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 1 \text{ minute}}" />,
    reason: <>To the nearest minute, as asked.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="T\le3 \ \text{ is the event}; \quad T>0 \ \text{ is the condition}" />,
    reason: <>"No later than 3 minutes after" caps <Katex tex="T" /> at 3; "given that it arrives after its scheduled time" is what goes behind the bar.</>,
  },
  {
    working: <Katex display tex="\Pr(T\le3\mid T>0) = \frac{\Pr(0<T\le3)}{\Pr(T>0)}" />,
    reason: <>The intersection of <Katex tex="T\le3" /> and <Katex tex="T>0" /> is the band <Katex tex="0<T\le3" /> — not <Katex tex="T\le3" /> on its own, which is the report's error that gives a probability above 1.</>,
  },
  {
    working: <Katex display tex="\Pr(T>0) = 0.5" />,
    reason: <>The mean is 0, so exactly half the distribution lies above it. No calculator needed.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(0, 3, 0, 4) = 0.27337…</Cas>,
    reason: <>The numerator.</>,
  },
  {
    working: <Katex display tex="\frac{0.27337\ldots}{0.5} = 0.54674\ldots" />,
    reason: <>Keep full precision until the last line — rounding the numerator to 0.273 first gives 0.546.</>,
  },
  {
    working: <Katex display tex="\boxed{0.547}" />,
    reason: <>To three decimal places.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{old: } [-3,2] \text{ about a mean of } 0 \implies \text{width } 5, \text{ reaching } 3 \text{ left and } 2 \text{ right}" />,
    reason: <>What matters is the interval's position <em>relative to the mean</em>, because <Katex tex="\sigma" /> is unchanged at 4.</>,
  },
  {
    working: <Katex display tex="\text{new: } [-4.5,0.5] \text{ also has width } 5" />,
    reason: <>So the same area can be captured — the mean just has to sit in the right place inside it.</>,
  },
  {
    working: <Katex display tex="\text{option 1: } k-3 = -4.5 \text{ and } k+2 = 0.5 \implies k = -1.5" />,
    reason: <>Slide the whole picture 1.5 units in the negative <Katex tex="t" /> direction.</>,
  },
  {
    working: <Katex display tex="\text{option 2: } k-2 = -4.5 \text{ and } k+3 = 0.5 \implies k = -2.5" />,
    reason: <>A normal curve is symmetric, so the mirror-image placement captures the same area. This is the value most students missed.</>,
  },
  {
    working: <Cas fn="solve">solve(normCdf(−4.5, 0.5, k, 4) = 0.4648, k)</Cas>,
    reason: <>Or solve it directly; the symmetry argument is what tells you to look for <em>two</em> roots.</>,
  },
  {
    working: <Katex display tex="\boxed{k = -1.5 \text{ or } k = -2.5}" />,
    reason: <>Both already exact to one decimal place. A sketch of the two shifted curves over the fixed interval is accepted working.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="X = \text{number on time or earlier}, \quad X \sim \mathrm{Bi}(8,0.85)" />,
    reason: <>Count the outcome the 0.85 describes, so <Katex tex="p=0.85" />, not 0.15.</>,
  },
  {
    working: <Katex display tex="\text{fewer than half of eight} \implies X<4 \implies X\le3" />,
    reason: <>Fewer than 4, so 4 itself is excluded — the report's common error is <Katex tex="X\le4" />.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(8, 0.85, 0, 3)</Cas>,
    reason: <>A cumulative tail, not a single term.</>,
  },
  {
    working: <Katex display tex="= 0.0028538\ldots" />,
    reason: <>Tiny, as expected when the success rate is high.</>,
  },
  {
    working: <Katex display tex="\boxed{0.003}" />,
    reason: <>To three decimal places.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{all } n \text{ on time or earlier}) = 0.85^n" />,
    reason: <>Deliveries are independent, so multiply.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(\text{one or more late}) = 1-0.85^n}" />,
    reason: <>The complement. Using <Katex tex="0.15^n" /> here answers a different question — the chance <em>every</em> delivery is late.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="1-0.85^n \ge 0.95 \implies 0.85^n \le 0.05" />,
    reason: <>From part e(i).</>,
  },
  {
    working: <Katex display tex="n \ge \frac{\log_e(0.05)}{\log_e(0.85)} = 18.433\ldots" />,
    reason: <>Dividing by a negative logarithm flips the inequality.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 19}" />,
    reason: <>Round <em>up</em>, not to the nearest integer: 18 deliveries leave the probability just under 0.95.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{after 4 pm}) = y, \quad \Pr(\text{before 4 pm}) = 1-y" />,
    reason: <>The two branches of a tree diagram.</>,
  },
  {
    working: <Katex display tex="0.85(1-y)+xy = 0.75" />,
    reason: <>Law of total probability: before 4 pm the rate is the claimed 0.85, after 4 pm it is <Katex tex="x" />, and the two must average out to the observed 0.75.</>,
  },
  {
    working: <Katex display tex="0.85-0.85y+xy = 0.75 \implies y(x-0.85) = -0.1" />,
    reason: <>Collecting the <Katex tex="y" /> terms.</>,
  },
  {
    working: <Katex display tex="y = \frac{0.1}{0.85-x}" />,
    reason: <>Since <Katex tex="x\le0.7<0.85" />, the denominator is positive — and <Katex tex="y" /> grows as <Katex tex="x" /> does, so the endpoints of <Katex tex="x" /> give the endpoints of <Katex tex="y" />.</>,
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
    reason: <>Exact values, as the report insists — about 0.18 and 0.67. Only 3% of students earned both marks.</>,
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
          <img
            src={normalSrc}
            alt="A bell curve centred at t = 0 on an axis scaled from −12 to 12 minutes — from the original 2020 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
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
      </PartCard>

      <PartCard
        letter="c"
        marks={3}
        statement={
          <>
            Using the model described above, the transport company can make 46.48% of its
            deliveries over the interval <Katex tex="-3\le t\le2" />. It has an improved
            delivery model with a mean of <Katex tex="k" /> and a standard deviation of four
            minutes. Find the values of <Katex tex="k" />, correct to one decimal place, so
            that 46.48% of the transport company's deliveries can be made over the interval{' '}
            <Katex tex="-4.5\le t\le0.5" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        <p>
          A rival transport company claims that there is a 0.85 probability that each delivery
          it makes will arrive on time or earlier. Assume that whether each delivery is on
          time or earlier is independent of other deliveries.
        </p>
      </div>

      <PartCard
        letter="d"
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
      </PartCard>

      <PartCard
        letter="e.i"
        marks={1}
        statement={
          <>
            Assuming that the rival company's claim is true, consider a day in which it makes{' '}
            <Katex tex="n" /> deliveries. Express, in terms of <Katex tex="n" />, the
            probability that one or more deliveries will not arrive on time or earlier.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        marks={1}
        statement={
          <>
            Hence, or otherwise, find the minimum value of <Katex tex="n" /> such that there
            is at least a 0.95 probability that one or more deliveries will not arrive on time
            or earlier.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <PartCard
        letter="f"
        marks={2}
        statement={
          <>
            An analyst from a government department believes the rival transport company's
            claim is only true for deliveries made before 4 pm. For deliveries made after 4
            pm, the analyst believes the probability of a delivery arriving on time or earlier
            is <Katex tex="x" />, where <Katex tex="0.3\le x\le0.7" />. After observing a
            large number of the rival transport company's deliveries, the analyst believes
            that the overall probability that a delivery arrives on time or earlier is
            actually 0.75. Let the probability that a delivery is made after 4 pm be{' '}
            <Katex tex="y" />. Assuming that the analyst's beliefs are true, find the minimum
            and maximum values of <Katex tex="y" />.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
