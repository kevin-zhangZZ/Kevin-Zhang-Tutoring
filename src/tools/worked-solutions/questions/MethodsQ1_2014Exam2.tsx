// 2014 Mathematical Methods (CAS) — Exam 2, Section 2 Question 1 (7 marks). Period and
// amplitude of a sinusoidal population model, then the fraction of a year spent below a given
// level. Question text transcribed from the original paper (no diagram given). Answers
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_A: SAExaminerStats = {
  marks: [4, 13, 83],
  average: 1.8,
  comment: (
    <>
      This question was answered well. However, some students did not answer both parts of
      the question. Most had the correct period but some expressed the amplitude as{' '}
      <Katex tex="800" /> or <Katex tex="1600" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [9, 5, 86],
  average: 1.8,
  comment: (
    <>
      This question was answered well. Some students used calculus, which was not necessary.
      Some gave their answers as coordinate pairs, such as <Katex tex="(0,1600)" /> and{' '}
      <Katex tex="(3,800)" />, but this was incorrect.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [9, 91],
  average: 0.9,
  comment: (
    <>
      Some students used their technology in degrees instead of radians and gave the answer{' '}
      <Katex tex="1593" /> wombats.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [33, 38, 29],
  average: 1,
  comment: (
    <>
      Many students obtained 4 months but did not find the fraction of time. Others did not
      find all the <Katex tex="t" /> values. Some wrote their answers in terms of dates.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="n(t) = 1200+400\cos\!\left(\tfrac{\pi t}{3}\right)" />,
    reason: <>Compare with <Katex tex="a+b\cos(kt)" />: the amplitude is <Katex tex="|b|" /> and the period is <Katex tex="\tfrac{2\pi}{k}" />.</>,
  },
  {
    working: <Katex display tex="\text{amplitude} = 400" />,
    reason: <>The coefficient of the cosine — the swing either side of the mean, not the full swing (800) and not the peak value (1600).</>,
  },
  {
    working: <Katex display tex="\text{period} = \frac{2\pi}{\pi/3} = 2\pi\times\frac3\pi = 6" />,
    reason: <>Six months. Both parts are needed for the two marks.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="-1 \le \cos\!\left(\tfrac{\pi t}{3}\right) \le 1" />,
    reason: <>No calculus required — a cosine simply ranges between <Katex tex="\pm1" />.</>,
  },
  {
    working: <Katex display tex="\text{maximum} = 1200+400 = 1600 \text{ wombats}" />,
    reason: <>When the cosine is 1.</>,
  },
  {
    working: <Katex display tex="\text{minimum} = 1200-400 = 800 \text{ wombats}" />,
    reason: <>When the cosine is <Katex tex="-1" />. Populations, so give numbers of wombats, not coordinate pairs.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="n(10) = 1200+400\cos\!\left(\tfrac{10\pi}{3}\right)" />,
    reason: <>Substituting <Katex tex="t=10" />. Make sure the calculator is in <em>radians</em> — degrees gives 1593.</>,
  },
  {
    working: <Katex display tex="\tfrac{10\pi}3 = 3\pi+\tfrac\pi3 \implies \cos\!\left(\tfrac{10\pi}3\right) = -\cos\!\left(\tfrac\pi3\right) = -\tfrac12" />,
    reason: <>Subtracting a full turn leaves <Katex tex="\tfrac{4\pi}3" />, which is in the third quadrant.</>,
  },
  {
    working: <Katex display tex="\boxed{n(10) = 1200-200 = 1000 \text{ wombats}}" />,
    reason: <>An exact value, and a whole number of wombats.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Cas fn="solve">solve(1200 + 400cos(πt/3) = 1000, t) | 0 ≤ t ≤ 12</Cas>,
    reason: <>Find every time the population is <em>equal</em> to <Katex tex="n(10)=1000" /> first; the intervals below it sit between those times.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\tfrac{\pi t}{3}\right) = -\tfrac12 \implies \tfrac{\pi t}{3} = \tfrac{2\pi}{3},\ \tfrac{4\pi}{3},\ \tfrac{8\pi}{3},\ \tfrac{10\pi}{3}" />,
    reason: <>Over <Katex tex="0\le t\le12" /> the argument runs from 0 to <Katex tex="4\pi" />, two full turns, so there are four solutions.</>,
  },
  {
    working: <Katex display tex="t = 2,\ 4,\ 8,\ 10" />,
    reason: <>Missing some of these is what the report says cost marks.</>,
  },
  {
    working: <Katex display tex="n(3) = 1200-400 = 800 < 1000" />,
    reason: <>Testing a point inside <Katex tex="(2,4)" /> shows the population is below 1000 there, and by the 6-month periodicity the same holds on <Katex tex="(8,10)" />.</>,
  },
  {
    working: <Katex display tex="\text{time below} = (4-2)+(10-8) = 4 \text{ months}" />,
    reason: <>Two intervals of two months each.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{4}{12} = \frac13}" />,
    reason: <>The question asks for a <em>fraction of time</em>, so the answer is <Katex tex="\tfrac13" /> of the year, not "4 months".</>,
  },
]

export default function MethodsQ1_2014Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (7 marks)</p>
        <p>
          The population of wombats in a particular location varies according to the rule{' '}
          <Katex tex="n(t)=1200+400\cos\!\left(\tfrac{\pi t}{3}\right)" />, where{' '}
          <Katex tex="n" /> is the number of wombats and <Katex tex="t" /> is the number of
          months after 1 March 2013.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={<>Find the period and amplitude of the function <Katex tex="n" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={<>Find the maximum and minimum populations of wombats in this location.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" marks={1} statement={<>Find <Katex tex="n(10)" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={2}
        statement={
          <>
            Over the 12 months from 1 March 2013, find the fraction of time when the
            population of wombats in this location was less than <Katex tex="n(10)" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
