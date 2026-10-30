// 2025 Mathematical Methods — Exam 2, Section B Question 3 (14 marks). A commuting driver:
// a quartic density for the travel time, a binomial for being late, a normal for the wait at
// a light, and a three-light distribution. Question text transcribed from the original
// paper. Answers checked with sympy/scipy and against the VCAA examination report. Solution
// is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_AI: SAExaminerStats = {
  marks: [13, 87],
  average: 0.9,
  comment: (
    <>
      This question was answered well. <Katex tex="38" /> was an occasional incorrect response.
      Some students used the incorrect formula for the mean. Others made transcription errors when
      transcribing the formula.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [17, 18, 65],
  average: 1.5,
  comment: (
    <>
      Some responses were not awarded full marks because while they worked out the variance, they
      did not proceed to compute the standard deviation. Others gave the correct answer but did not
      show any working. Some students gave the approximate answer <Katex tex="5.34\ldots" /> and
      were not awarded full marks.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [19, 81],
  average: 0.8,
  comment: (
    <>
      This question was answered well.{' '}
      <Katex tex="\displaystyle\int_{29}^{47}f(t)\,dt=0.08704" /> was an occasional incorrect
      response.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [28, 10, 62],
  average: 1.3,
  comment: (
    <>
      Some students just gave the answer without showing appropriate working. Other students
      rounded their answer incorrectly, giving <Katex tex="0.3657" /> instead of{' '}
      <Katex tex="0.3658" />. Some students incorrectly multiplied <Katex tex="0.08704" /> by{' '}
      <Katex tex="5" />.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [45, 6, 49],
  average: 1.0,
  comment: <>Some students did not show appropriate working and were not awarded full marks.</>,
}

const EXAM_BIV: SAExaminerStats = {
  marks: [67, 16, 17],
  average: 0.5,
  comment: (
    <>
      <Katex tex="k=49.1" /> was a common incorrect answer. An integer value was required. Many
      students tried to solve <Katex tex="\displaystyle\int_k^{59}f(x)\,dx=0.2" />. Some students
      correctly used trial and error. Others just gave the answer, without showing appropriate
      working as required.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [21, 79],
  average: 0.8,
  comment: <>This question was answered well.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [52, 48],
  average: 0.5,
  comment: (
    <>
      This question was not answered well. <Katex tex="\sigma=0.48" /> and{' '}
      <Katex tex="\sigma=1.19" /> were common incorrect responses.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [41, 16, 42],
  average: 1.0,
  comment: (
    <>
      Some students had the second and fifth columns correct but not the third and fourth columns,
      often interchanging these two columns. Others did not attempt the question or appeared to
      guess the answers as their probabilities were unreasonable. Some put <Katex tex="0.06" />,
      instead of <Katex tex="0.006" />.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(T) = \int_{29}^{59}t\,f(t)\,dt" />,
    reason: <>The definition of the mean for a continuous random variable: integrate <Katex tex="t\,f(t)" /> over the interval where the density is non-zero.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{1\,215\,000}\int_{29}^{59}t(t-29)(59-t)^3\,dt" />,
    reason: <>Straight into <Cas fn="nInt" />, or define <Katex tex="f" /> first with <Cas fn="define" />.</>,
    more: <>Defining <Katex tex="f" /> once pays off: parts a.ii., b.i. and b.iv. all integrate the same density.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(T) = 39 \text{ minutes}}" />,
    reason: <>The integral comes out at exactly 39.</>,
    more: <>Sensible: the cubic factor <Katex tex="(59-t)^3" /> pulls the density hard towards the left end, so the mean sits well below the midpoint 44 (the midpoint is only the mean for a symmetric density). The report lists 38 as an occasional incorrect answer and notes students who used the wrong formula for the mean or made transcription errors copying the formula in, so check that <Katex tex="\int_{29}^{59}f(t)\,dt=1" /> after typing <Katex tex="f" /> in.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{Var}(T) = \int_{29}^{59}(t-39)^2f(t)\,dt" />,
    reason: <>Variance is the mean of the squared distance from the mean, <Katex tex="\mathrm{E}(T)=39" /> from part a.i.</>,
    more: <>Equivalently, <Katex tex="\mathrm{Var}(T)=\int_{29}^{59}t^2f(t)\,dt-39^2" />; both give the same value.</>,
  },
  {
    working: <Katex display tex="= \frac{200}{7}" />,
    reason: <>Evaluate the integral exactly with the CAS integral template; <Cas fn="nInt" /> would only give the decimal <Katex tex="28.571\ldots" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}(T) = \sqrt{\frac{200}{7}} = \frac{10\sqrt2}{\sqrt7}" />,
    reason: <>The question asks for the standard deviation, so take the square root of the variance.</>,
    more: <>The report notes some students worked out the variance and did not proceed to the standard deviation, which loses a mark.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{sd}(T) = \frac{10\sqrt{14}}{7} \approx 5.35 \text{ minutes}}" />,
    reason: <>Multiply top and bottom by <Katex tex="\sqrt7" /> to simplify. No accuracy is specified, so give the exact value; the decimal is only a sense check.</>,
    more: <>When a VCAA question names no number of decimal places, an exact answer is expected. The report notes that students who gave the approximate answer <Katex tex="5.34\ldots" /> were not awarded full marks. Any exact form is fine: the report gives <Katex tex="\tfrac{10\sqrt{14}}{7}" />, <Katex tex="\sqrt{\tfrac{200}{7}}" /> and <Katex tex="\tfrac{10\sqrt2}{\sqrt7}" />.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{late} \iff T>47" />,
    reason: <>The journey takes longer than the <Katex tex="k=47" /> minutes allowed.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(T>47) = \int_{47}^{59}f(t)\,dt = 0.08704}" />,
    reason: <>Integrate the density from 47 up to 59, where the density ends. As required.</>,
    more: <>The report also gives <Katex tex="\int_{47}^{\infty}f(t)\,dt" /> or <Katex tex="1-\int_{29}^{47}f(t)\,dt" />. It lists <Katex tex="\int_{29}^{47}f(t)\,dt=0.08704" /> as an occasional incorrect response: that integral is the probability of arriving <em>on time</em> (it equals 0.91296), so the terminals must match "late", not just the number 47. Exactly, the probability is <Katex tex="\tfrac{272}{3125}" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="L\sim\text{Bi}(5,\,0.08704)" />,
    reason: <>Five independent days, each late with the same probability 0.08704 from part b.i, so the number of late days is binomial.</>,
  },
  {
    working: <Katex display tex="\Pr(L\ge1) = 1-\Pr(L=0)" />,
    reason: <>"At least one" is the complement of "none", which is a single term instead of five.</>,
    more: <>The report notes some students multiplied 0.08704 by 5. That adds the five daily probabilities as if lateness on different days could never overlap; it overcounts weeks with two or more late days (it gives 0.4352, not 0.3658).</>,
  },
  {
    working: <Katex display tex="= 1-(1-0.08704)^5 = 1-(0.91296)^5" />,
    reason: <>No late days means on time every day: <Katex tex="0.91296" /> multiplied five times.</>,
  },
  {
    working: <Katex display tex="= 1-0.634247\ldots = 0.365752\ldots" />,
    reason: <>Evaluate on CAS, or use <Cas fn="binomCdf" /> with lower bound 1 and upper bound 5.</>,
  },
  {
    working: <Katex display tex="\boxed{0.3658}" />,
    reason: <>Four decimal places, as asked: the fifth digit is 5, so round up.</>,
    more: <>The report notes some students gave 0.3657, rounding incorrectly, and some gave only the answer: write the binomial set-up or the <Katex tex="1-(1-0.08704)^5" /> expression as working.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\hat{P} = \frac{L}{5} \ \text{ with } L\sim\text{Bi}(5,\,0.08704)" />,
    reason: <>The proportion of late days in the week is the number of late days divided by 5.</>,
  },
  {
    working: <Katex display tex="0.4 \le \hat{P} \le 0.6 \iff 2 \le L \le 3" />,
    reason: <><Katex tex="0.4\times5=2" /> and <Katex tex="0.6\times5=3" />, both attainable, so both endpoints are included.</>,
  },
  {
    working: <Katex display tex="\Pr(2\le L\le3) = \text{binomCdf}(5,\,0.08704,\,2,\,3)" />,
    reason: <>By <Cas fn="binomCdf" />, with lower bound 2 and upper bound 3.</>,
    more: <>The report notes some students did not show appropriate working and were not awarded full marks. Writing the distribution of <Katex tex="L" /> and the probability statement <Katex tex="\Pr(2\le L\le3)" /> is the working it expects.</>,
  },
  {
    working: <Katex display tex="\boxed{0.0631}" />,
    reason: <>Four decimal places.</>,
    more: <>Small, as expected: with <Katex tex="p\approx0.087" /> the driver is usually late at most once a week. By hand it is <Katex tex="\binom52(0.08704)^2(0.91296)^3+\binom53(0.08704)^3(0.91296)^2" />.</>,
  },
]

const ROWS_BIV: WorkingRow[] = [
  {
    working: <Katex display tex="p_k = \Pr(T>k) = \int_k^{59}f(t)\,dt" />,
    reason: <>The daily probability of being late now depends on <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="1-(1-p_k)^5 = 0.2" />,
    reason: <>"Late at least once in five days", exactly as in part b.ii., but with <Katex tex="p_k" /> in place of 0.08704.</>,
    more: <>The report notes many students tried to solve <Katex tex="\int_k^{59}f(x)\,dx=0.2" />. That sets the probability of being late on <em>one</em> day to 0.2, but 0.2 is the probability of being late at least once in the whole <em>week</em>. The integral has to go through the binomial first.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}(1-p_k)^5 &= 0.8 \\ p_k &= 1-0.8^{1/5} = 0.04365\ldots\end{aligned}" />,
    reason: <>Undo the binomial first: this is the daily probability that gives a weekly probability of 0.2.</>,
  },
  {
    working: <Katex display tex="\int_k^{59}f(t)\,dt = 0.04365\ldots \implies k = 49.0997\ldots" />,
    reason: <>By <Cas fn="nSolve" />. This <Katex tex="k" /> is not an integer, so test the integers either side of it.</>,
    more: <>The report notes <Katex tex="k=49.1" /> was a common incorrect answer: it is this solution rounded, but the question asks for an integer <Katex tex="k" />. The "correct to one decimal place" in the question is what makes an integer possible: the weekly probability only has to <em>round</em> to 0.2.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}k=49:\quad p_{49} &= 0.04527 \\ 1-(1-p_{49})^5 &= 0.2068\end{aligned}" />,
    reason: <><Katex tex="p_{49}=\int_{49}^{59}f(t)\,dt" /> by <Cas fn="nInt" />. The weekly probability 0.2068 rounds to 0.2 ✓.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}k=48&: \ 0.2811 \ (\to0.3) \\ k=50&: \ 0.1447 \ (\to0.1)\end{aligned}" />,
    reason: <>Same calculation for the neighbouring integers: neither rounds to 0.2. The probability only falls as <Katex tex="k" /> grows, so no other integer can work.</>,
    more: <>A larger <Katex tex="k" /> allows more time, so fewer trips are late: every integer below 48 gives more than 0.2811 and every integer above 50 gives less than 0.1447. The report notes some students correctly used trial and error, and others just gave the answer without showing appropriate working, as required.</>,
  },
  {
    working: <Katex display tex="\boxed{k = 49 \text{ minutes}}" />,
    reason: <>An integer, as required.</>,
    more: <>Allowing 49 minutes leaves roughly a one-in-five chance of being late at least once in a week.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="W\sim\mathrm{N}\!\left(2.5,\,0.6^2\right)" />,
    reason: <>The wait time at the light is normal with mean 2.5 and standard deviation 0.6.</>,
  },
  {
    working: <Katex display tex="\Pr(W<3.5) = \text{normCdf}(-\infty,\,3.5,\,2.5,\,0.6)" />,
    reason: <>By <Cas fn="normCdf" />, with lower bound <Katex tex="-\infty" /> for "less than".</>,
    more: <>Equivalently, standardise: <Katex tex="\Pr\!\left(Z<\tfrac{3.5-2.5}{0.6}\right)=\Pr(Z<1.667)=0.9522\ldots" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0.95}" />,
    reason: <>The CAS gives <Katex tex="0.9522\ldots" />; two decimal places, as asked.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(W>3.5) = 0.02 \implies \Pr(W<3.5) = 0.98" />,
    reason: <>"Longer than 3.5 minutes" is the upper tail; <Cas fn="invNorm" /> needs the area to the <em>left</em>, so use <Katex tex="1-0.02" />.</>,
  },
  {
    working: <Katex display tex="\frac{3.5-2.5}{\sigma} = \text{invNorm}(0.98) = 2.0537\ldots" />,
    reason: <>The unknown is <Katex tex="\sigma" />, so it can't go into <Cas fn="invNorm" />. Standardise instead: the <Katex tex="z" />-score of 3.5 has 0.98 of the standard normal below it.</>,
    more: <>The report lists <Katex tex="\sigma=1.19" /> as a common incorrect response. That is what <Katex tex="\tfrac{1}{\text{invNorm}(0.8)}" /> gives, i.e. reading 2% as 0.2 (20%).</>,
  },
  {
    working: <Katex display tex="\sigma = \frac{1}{2.0537\ldots} = 0.4869\ldots" />,
    reason: <>The numerator is <Katex tex="3.5-2.5=1" />, so <Katex tex="\sigma" /> is the reciprocal of the <Katex tex="z" />-score.</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma = 0.49}" />,
    reason: <>Two decimal places: the third digit is 6, so <Katex tex="0.486\ldots" /> rounds up.</>,
    more: <>The report lists <Katex tex="\sigma=0.48" /> as a common incorrect response, which is <Katex tex="0.4869\ldots" /> truncated rather than rounded. Check: 0.49 is smaller than the 0.6 in part c.i., which fits, since a tighter spread pushes less probability past 3.5 minutes (2% here against about 5% there).</>,
  },
]

const DIST_TABLE = (
  <div className="overflow-x-auto">
    <table className="text-[13.5px] border-collapse">
      <tbody>
        <tr>
          <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal">
            <Katex tex="y" />
          </th>
          {[0, 1, 2, 3].map((v) => (
            <td key={v} className="border border-gray-300 dark:border-gray-700 px-4 py-1.5 text-center">{v}</td>
          ))}
        </tr>
        <tr>
          <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal whitespace-nowrap">
            <Katex tex="\Pr(Y=y)" />
          </th>
          {['0.504', '0.398', '0.092', '0.006'].map((v) => (
            <td key={v} className="border border-gray-300 dark:border-gray-700 px-4 py-1.5 text-center">{v}</td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
)

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}A,\,B,\,C\ \text{red}&: \ 0.2,\ 0.3,\ 0.1 \\ \text{not red}&: \ 0.8,\ 0.7,\ 0.9\end{aligned}" />,
    reason: <>The lights have <em>different</em> probabilities, so <Katex tex="Y" /> is not binomial: list each case and multiply, using independence.</>,
  },
  {
    working: <Katex display tex="\Pr(Y=0) = 0.8\times0.7\times0.9 = 0.504" />,
    reason: <>No red lights: all three not red.</>,
  },
  {
    working: <Katex display tex="\Pr(Y=3) = 0.2\times0.3\times0.1 = 0.006" />,
    reason: <>All three red. Note the third decimal place: 0.006, not 0.06.</>,
    more: <>The report notes some students put 0.06 instead of 0.006.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(Y=1) &= (0.2)(0.7)(0.9)+(0.8)(0.3)(0.9) \\ &\quad +(0.8)(0.7)(0.1)\end{aligned}" />,
    reason: <>Three ways: only <Katex tex="A" /> red, only <Katex tex="B" /> red, or only <Katex tex="C" /> red. The other two lights must be not red.</>,
  },
  {
    working: <Katex display tex="= 0.126+0.216+0.056 = 0.398" />,
    reason: <>Adding the three terms.</>,
  },
  {
    working: <Katex display tex="\Pr(Y=2) = 1-0.504-0.398-0.006 = 0.092" />,
    reason: <>The four probabilities must sum to 1, which is quicker than listing the three pairs.</>,
    more: <>As a check, list the pairs directly: <Katex tex="(0.2)(0.3)(0.9)+(0.2)(0.7)(0.1)+(0.8)(0.3)(0.1)" /> <Katex tex="=0.054+0.014+0.024=0.092" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0.504,\ 0.398,\ 0.092,\ 0.006}" />,
    reason: <>Check the order: with every light usually not red, one red light is far more likely than two.</>,
    more: <>The report notes some students interchanged the third and fourth columns (the values for <Katex tex="y=1" /> and <Katex tex="y=2" />), and others appeared to guess, giving probabilities that were unreasonable.</>,
  },
  {
    working: DIST_TABLE,
    reason: <>The completed table.</>,
  },
]

export default function MethodsQ3_2025Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (14 marks)</p>
        <p>
          The time taken for a driver to travel to work each day, in minutes, is modelled by a
          continuous random variable <Katex tex="T" /> with probability density function
        </p>
        <div className="py-1">
          <Katex
            display
            tex="f(t)=\begin{cases}\dfrac{1}{1\,215\,000}(t-29)(59-t)^3, \\ \qquad\qquad\qquad 29\le t\le59 \\[8pt] 0, \quad \text{otherwise}\end{cases}"
          />
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Three different distributions appear in one question; the key skill is recognising
              which one each part needs. <Katex tex="T" /> is continuous (part a. and b.i.); the number
              of late days in a week is <em>binomial</em> with that integral as its{' '}
              <Katex tex="p" /> (parts b.ii.–b.iv.); the wait at a light is <em>normal</em>{' '}
              (part c.); and the number of red lights in part d. is none of these, because the
              three lights have different probabilities.
            </p>
            <p>
              Part b.iv. has no closed-form route: <Katex tex="k" /> appears inside an integral
              that then goes through a binomial. Working backwards to the required daily
              probability and then testing integers is a reliable method.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a.i"
        topic="Mean of PDF"
        marks={1}
        statement={<>Find the mean time taken, in minutes, for the driver to travel to work each day.</>}
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Standard Deviation"
        marks={2}
        statement={
          <>
            Find the standard deviation of the time taken, in minutes, for the driver to
            travel to work each day.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">b.</span> The driver
          allows <Katex tex="k" /> minutes to travel to work each day. If the journey takes
          longer than <Katex tex="k" /> minutes, the driver will be late. Whether the driver
          is late on a particular day is independent of whether they are late on any other
          day.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Continuous PDF"
        marks={1}
        statement={
          <>
            If <Katex tex="k=47" />, write a definite integral to show that the probability of
            the driver being late is <Katex tex="0.08704" />
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="At Least One"
        marks={2}
        statement={
          <>
            If <Katex tex="k=47" />, find the probability that the driver will be late on at
            least one day in a five-day working week.
            <br />
            Give your answer correct to four decimal places.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Sample Proportion"
        marks={2}
        statement={
          <>
            For <Katex tex="k=47" />, let <Katex tex="\hat{P}" /> be the proportion of days
            the driver is late in any five-day working week. Find{' '}
            <Katex tex="\Pr\!\left(0.4\le\hat{P}\le0.6\right)" /> correct to four decimal
            places.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <PartCard
        letter="b.iv"
        topic="Find Parameter"
        marks={2}
        statement={
          <>
            Find the <b>integer</b> <Katex tex="k" /> such that the probability, correct to
            one decimal place, of the driver being late at least once in any five-day working
            week is 0.2
          </>
        }
        examinerReport={EXAM_BIV}
      >
        <WorkingTable rows={ROWS_BIV} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">c.</span> At a given
          traffic light, the wait time is modelled by a normal distribution with a mean of 2.5
          minutes and a standard deviation of <Katex tex="\sigma" /> minutes.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Normal Distribution"
        marks={1}
        statement={
          <>
            If <Katex tex="\sigma=0.6" />, find the probability that the wait time will be
            less than 3.5 minutes.
            <br />
            Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Inverse Normal"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="\sigma" /> such that there is a 2% chance of a wait
            time longer than 3.5 minutes.
            <br />
            Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Discrete Distribution"
        marks={2}
        statement={
          <div className="flex flex-col gap-3">
            <p>
              The driver passes through three traffic lights (<Katex tex="A" />,{' '}
              <Katex tex="B" /> and <Katex tex="C" />) on their journey to work. The probability
              of each traffic light being red is shown in the table below.
            </p>
            <div className="overflow-x-auto">
              <table className="text-[13.5px] border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5">Traffic light</td>
                    {['A', 'B', 'C'].map((v) => (
                      <td key={v} className="border border-gray-300 dark:border-gray-700 px-5 py-1.5 text-center"><Katex tex={v} /></td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5">Probability that the traffic light is red</td>
                    {['0.2', '0.3', '0.1'].map((v) => (
                      <td key={v} className="border border-gray-300 dark:border-gray-700 px-5 py-1.5 text-center">{v}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Let <Katex tex="Y" /> be the random variable representing the number of traffic
              lights that are red on the driver’s journey to work. Assume that each traffic light
              being red is independent of any other traffic light being red.
              <br />
              Complete the following table for the probability distribution of{' '}
              <Katex tex="Y" />.
            </p>
            <div className="overflow-x-auto">
              <table className="text-[13.5px] border-collapse">
                <tbody>
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal"><Katex tex="y" /></th>
                    {[0, 1, 2, 3].map((v) => (
                      <td key={v} className="border border-gray-300 dark:border-gray-700 px-6 py-1.5 text-center">{v}</td>
                    ))}
                  </tr>
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal whitespace-nowrap"><Katex tex="\Pr(Y=y)" /></th>
                    {[0, 1, 2, 3].map((v) => (
                      <td key={v} className="border border-gray-300 dark:border-gray-700 px-6 py-3" />
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
