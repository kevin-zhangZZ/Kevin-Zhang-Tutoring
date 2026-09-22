// 2025 Mathematical Methods — Exam 2, Section B Question 3 (14 marks). A commuting driver:
// a quartic density for the travel time, a binomial for being late, a normal for the wait at
// a light, and a three-light distribution. Question text transcribed from the original
// paper. Answers checked with sympy/scipy and against the VCAA examination report. Solution
// is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_AI: SAExaminerStats = {
  marks: [13, 87],
  average: 0.9,
  comment: (
    <>
      This question was answered well. Some students used the incorrect formula for the mean.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [17, 18, 65],
  average: 1.5,
  comment: (
    <>
      Some responses worked out the variance but did not proceed to compute the standard
      deviation. Some students gave the approximate answer <Katex tex="5.34\ldots" /> and
      were not awarded full marks.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [19, 81],
  average: 0.8,
}

const EXAM_BII: SAExaminerStats = {
  marks: [28, 10, 62],
  average: 1.3,
  comment: (
    <>
      Some students just gave the answer without showing appropriate working. Other students
      rounded incorrectly.
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
      An integer value was required. Many students tried to solve an equation exactly; some
      correctly used trial and error. Others just gave the answer without working.
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
  comment: <>This question was not answered well.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [41, 16, 42],
  average: 1.0,
  comment: (
    <>
      Some students had the second and fifth columns correct but not the third and fourth,
      often interchanging them. Others did not attempt the question or appeared to guess, as
      their probabilities were unreasonable.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(T) = \int_{29}^{59}t\,f(t)\,dt" />,
    reason: 'The definition for a continuous random variable — not the midpoint of the interval.',
  },
  {
    working: <Katex display tex="= \frac{1}{1\,215\,000}\int_{29}^{59}t(t-29)(59-t)^3\,dt" />,
    reason: <>Straight into <Cas fn="nInt" />, or define <Katex tex="f" /> first with <Cas fn="define" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(T) = 39 \text{ minutes}}" />,
    reason: <>Exactly 39. Sensible: the cubic factor <Katex tex="(59-t)^3" /> pulls the density hard towards the left end, so the mean sits well below the midpoint 44.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{Var}(T) = \int_{29}^{59}(t-39)^2f(t)\,dt" />,
    reason: <>Or <Katex tex="\int t^2f\,dt-39^2" /> — either form works.</>,
  },
  {
    working: <Katex display tex="= \frac{200}{7}" />,
    reason: 'A tidy exact value, which is the hint that an exact answer is wanted.',
  },
  {
    working: <Katex display tex="\mathrm{sd}(T) = \sqrt{\frac{200}{7}} = \frac{10\sqrt2}{\sqrt7}" />,
    reason: <>Stopping at the variance was one listed error; giving the decimal <Katex tex="5.34" /> was the other.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{sd}(T) = \frac{10\sqrt{14}}{7} \approx 5.35 \text{ minutes}}" />,
    reason: 'Rationalised. Exact form was required.',
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{late} \iff T>47" />,
    reason: <>The journey takes longer than the <Katex tex="k=47" /> minutes allowed.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(T>47) = \int_{47}^{59}\frac{1}{1\,215\,000}(t-29)(59-t)^3\,dt = 0.08704}" />,
    reason: <>The upper terminal is 59, where the density ends — not <Katex tex="\infty" />. Exactly, this is <Katex tex="\tfrac{272}{3125}" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="L\sim\text{Bi}(5,\,0.08704)" />,
    reason: 'Five independent days, each with the same probability of a late arrival.',
  },
  {
    working: <Katex display tex="\Pr(L\ge1) = 1-\Pr(L=0)" />,
    reason: 'The complement is a single term instead of five.',
  },
  {
    working: <Katex display tex="= 1-(1-0.08704)^5 = 1-(0.91296)^5" />,
    reason: 'No binomial coefficient needed for the zero term.',
  },
  {
    working: <Katex display tex="= 1-0.63425 = 0.365752\ldots" />,
    reason: 'One evaluation.',
  },
  {
    working: <Katex display tex="\boxed{0.3658}" />,
    reason: 'Four decimal places, as asked.',
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\hat{P} = \frac{L}{5} \ \text{ with } L\sim\text{Bi}(5,\,0.08704)" />,
    reason: 'The sample proportion over a five-day week — a binomial count divided by 5.',
  },
  {
    working: <Katex display tex="0.4 \le \hat{P} \le 0.6 \iff 2 \le L \le 3" />,
    reason: <><Katex tex="0.4\times5=2" /> and <Katex tex="0.6\times5=3" />, both attainable, so both endpoints are included.</>,
  },
  {
    working: <Katex display tex="\Pr(2\le L\le3) = \text{binomCdf}(5,\,0.08704,\,2,\,3)" />,
    reason: <>By <Cas fn="binomCdf" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0.0631}" />,
    reason: <>Four decimal places. Small, as expected: with <Katex tex="p\approx0.087" /> the driver is usually late at most once a week.</>,
  },
]

const ROWS_BIV: WorkingRow[] = [
  {
    working: <Katex display tex="p_k = \Pr(T>k) = \int_k^{59}f(t)\,dt, \qquad 1-(1-p_k)^5 = 0.2" />,
    reason: <>Both quantities depend on <Katex tex="k" />, so this cannot be solved in one line — and the answer must be an integer.</>,
  },
  {
    working: <Katex display tex="(1-p_k)^5 = 0.8 \implies p_k = 1-0.8^{1/5} = 0.04365" />,
    reason: 'Working backwards gives the target daily probability.',
  },
  {
    working: <Katex display tex="k=49: \ p_{49} = 0.04527 \implies 1-(1-p_{49})^5 = 0.2068" />,
    reason: <>Rounds to 0.2 ✓. The target <Katex tex="0.04365" /> sits between <Katex tex="p_{49}" /> and <Katex tex="p_{50}" />, so 49 and 50 are the only integers worth testing.</>,
  },
  {
    working: <Katex display tex="k=48: \ 0.2811 \ (\to0.3); \qquad k=50: \ 0.1447 \ (\to0.1)" />,
    reason: <>The neighbours confirm that 49 is the only integer that works — trial and error over a couple of values, which is the method the examiner endorsed.</>,
  },
  {
    working: <Katex display tex="\boxed{k = 49 \text{ minutes}}" />,
    reason: <>An integer, as required. Allowing 49 minutes leaves roughly a one-in-five chance of being late at least once in a week.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="W\sim\mathrm{N}\!\left(2.5,\,0.6^2\right)" />,
    reason: 'The wait time at the light.',
  },
  {
    working: <Katex display tex="\Pr(W<3.5) = \text{normCdf}(-\infty,\,3.5,\,2.5,\,0.6)" />,
    reason: <>By <Cas fn="normCdf" />. Equivalently <Katex tex="\Pr\!\left(Z<\tfrac{3.5-2.5}{0.6}\right)=\Pr(Z<1.667)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0.95}" />,
    reason: 'Two decimal places.',
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(W>3.5) = 0.02 \implies \Pr(W<3.5) = 0.98" />,
    reason: 'Turning the upper tail into a cumulative probability.',
  },
  {
    working: <Katex display tex="\frac{3.5-2.5}{\sigma} = \text{invNorm}(0.98) = 2.0537" />,
    reason: <>Standardise first — the unknown is <Katex tex="\sigma" />, so <Cas fn="invNorm" /> has to be applied to the <em>standard</em> normal.</>,
  },
  {
    working: <Katex display tex="\sigma = \frac{1}{2.0537} = 0.48691\ldots" />,
    reason: 'Rearranging.',
  },
  {
    working: <Katex display tex="\boxed{\sigma = 0.49}" />,
    reason: <>Two decimal places. Smaller than the 0.6 in part c.i., which fits: a tighter spread pushes less probability past 3.5 minutes.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{red}) = 0.2,\ 0.3,\ 0.1 \text{ for } A,\,B,\,C; \ \text{not red} = 0.8,\ 0.7,\ 0.9" />,
    reason: <>The three lights are independent but have <em>different</em> probabilities, so this is not binomial — every case has to be counted separately.</>,
  },
  {
    working: <Katex display tex="\Pr(Y=0) = 0.8\times0.7\times0.9 = 0.504" />,
    reason: 'All three green.',
  },
  {
    working: <Katex display tex="\Pr(Y=3) = 0.2\times0.3\times0.1 = 0.006" />,
    reason: 'All three red — the other easy corner.',
  },
  {
    working: <Katex display tex="\Pr(Y=1) = (0.2)(0.7)(0.9)+(0.8)(0.3)(0.9)+(0.8)(0.7)(0.1)" />,
    reason: 'Three ways: exactly A red, exactly B red, or exactly C red.',
  },
  {
    working: <Katex display tex="= 0.126+0.216+0.056 = 0.398" />,
    reason: 'Adding the three terms.',
  },
  {
    working: <Katex display tex="\Pr(Y=2) = 1-0.504-0.398-0.006 = 0.092" />,
    reason: <>Faster than enumerating the three pairs, and it doubles as a check that the four probabilities sum to 1.</>,
  },
  {
    working: <Katex display tex="\boxed{0.504,\ 0.398,\ 0.092,\ 0.006}" />,
    reason: <>The report notes students who swapped the middle two — a sanity check settles it: one red light is much more likely than two.</>,
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
            tex="f(t)=\begin{cases}\dfrac{1}{1\,215\,000}(t-29)(59-t)^3 & 29\le t\le59\\[8pt] 0 & \text{otherwise}\end{cases}"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Three different distributions appear in one question and the transitions are what
            the marks are for. <Katex tex="T" /> is continuous (part a. and b.i.); the number
            of late days in a week is <em>binomial</em> with that integral as its{' '}
            <Katex tex="p" /> (parts b.ii.–b.iv.); the wait at a light is <em>normal</em>{' '}
            (part c.); and the number of red lights in part d. is none of these, because the
            three lights have different probabilities.
          </p>
          <p>
            Part b.iv. has no closed-form route: <Katex tex="k" /> appears inside an integral
            that then goes through a binomial. Working backwards to the required daily
            probability and then testing integers is the intended method, and the examiner
            endorsed trial and error explicitly.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a.i"
        marks={1}
        statement={<>Find the mean time taken, in minutes, for the driver to travel to work each day.</>}
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
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
        marks={1}
        statement={
          <>
            If <Katex tex="k=47" />, write a definite integral to show that the probability of
            the driver being late is <Katex tex="0.08704" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={2}
        statement={
          <>
            If <Katex tex="k=47" />, find the probability that the driver will be late on at
            least one day in a five-day working week. Give your answer correct to four decimal
            places.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
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
        marks={1}
        statement={
          <>
            If <Katex tex="\sigma=0.6" />, find the probability that the wait time will be
            less than 3.5 minutes. Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="\sigma" /> such that there is a 2% chance of a wait
            time longer than 3.5 minutes. Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="d"
        marks={2}
        statement={
          <>
            The driver passes through three traffic lights (<Katex tex="A" />,{' '}
            <Katex tex="B" /> and <Katex tex="C" />) on their journey to work, with
            probabilities of being red of 0.2, 0.3 and 0.1 respectively. Let{' '}
            <Katex tex="Y" /> be the random variable representing the number of traffic lights
            that are red, assuming independence. Complete the table for the probability
            distribution of <Katex tex="Y" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
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
      </PartCard>
    </div>
  )
}
