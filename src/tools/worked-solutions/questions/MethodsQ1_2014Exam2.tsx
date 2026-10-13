// 2014 Mathematical Methods (CAS) — Exam 2, Section 2 Question 1 (7 marks). Period and
// amplitude of a sinusoidal population model, then the fraction of a year spent below a given
// level. Question text transcribed from the original paper (no diagram given). Answers
// checked with sympy and against the VCAA examination report. Solution is original.
// Interactive: part (d) only (29% full marks): a level slider showing both dips and the fraction.
// Parts (a)-(c) do not qualify (83-91% full marks).

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const BelowLevel = lazyWidget(() => import('../interactives/meth-2014e2-q1d-below'))

const EXAM_A: SAExaminerStats = {
  marks: [4, 13, 83],
  average: 1.8,
  comment: (
    <>
      This question was answered well. However, some students did not answer both parts of
      the question. Most had the correct period but some expressed the amplitude as{' '}
      <Katex tex="[800,1600]" />.
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
    reason: <>The coefficient of the cosine: the swing either side of the mean line <Katex tex="n=1200" />. A single number, not the range <Katex tex="[800,1600]" />.</>,
    more: <>The population moves between <Katex tex="1200-400=800" /> and <Katex tex="1200+400=1600" />, but that interval is the <em>range</em>, not the amplitude. The report says some students gave the amplitude as <Katex tex="[800,1600]" />. The amplitude is half the distance from the minimum to the maximum: <Katex tex="\tfrac{1600-800}{2}=400" />.</>,
  },
  {
    working: <Katex display tex="\text{period} = \frac{2\pi}{\pi/3} = 2\pi\times\frac3\pi = 6" />,
    reason: <>Here <Katex tex="k=\tfrac\pi3" />. Six months, because <Katex tex="t" /> is measured in months.</>,
    more: <>Check: from <Katex tex="t=0" /> to <Katex tex="t=6" /> the argument <Katex tex="\tfrac{\pi t}{3}" /> runs from <Katex tex="0" /> to <Katex tex="2\pi" />, exactly one full cycle of cosine.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{amplitude } 400, \quad \text{period } 6 \text{ months}}" />,
    reason: <>Both are needed for the two marks.</>,
    more: <>The report notes some students answered only one of the two. When a question asks for two things, finish with a line that states both.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="-1 \le \cos\!\left(\tfrac{\pi t}{3}\right) \le 1" />,
    reason: <>A cosine ranges between <Katex tex="-1" /> and <Katex tex="1" />, so no calculus is needed.</>,
    more: <>The report says some students used calculus, which was not necessary. Setting <Katex tex="n'(t)=0" /> works, but it is slower and you still have to decide which turning point is the maximum.</>,
  },
  {
    working: <Katex display tex="\text{maximum} = 1200+400 = 1600 \text{ wombats}" />,
    reason: <>When the cosine is 1.</>,
  },
  {
    working: <Katex display tex="\text{minimum} = 1200-400 = 800 \text{ wombats}" />,
    reason: <>When the cosine is <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{maximum } 1600 \text{ wombats} \\ \text{minimum } 800 \text{ wombats}\end{gathered}}" />,
    reason: <>The question asks for populations, so give numbers of wombats, not coordinate pairs.</>,
    more: <>The report marked answers such as <Katex tex="(0,1600)" /> and <Katex tex="(3,800)" /> incorrect. Those points say <em>when</em> the extremes happen, which was not asked; the populations are the <Katex tex="n" />-values alone.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="n(10) = 1200+400\cos\!\left(\tfrac{10\pi}{3}\right)" />,
    reason: <>Substitute <Katex tex="t=10" />. If you use the calculator, it must be in <em>radians</em>.</>,
    more: <>The report says some students had their technology in degrees and gave 1593 wombats: that is <Katex tex="1200+400\cos(10.47^\circ)" />, treating <Katex tex="\tfrac{10\pi}{3}\approx10.47" /> as degrees. A sense check catches it: 1593 is almost the maximum, but <Katex tex="t=10" /> is two-thirds of the way through a 6-month cycle, nowhere near a peak.</>,
  },
  {
    working: <Katex display tex="\tfrac{10\pi}3 = 2\pi+\tfrac{4\pi}3 \implies \cos\!\left(\tfrac{10\pi}3\right) = \cos\!\left(\tfrac{4\pi}3\right) = -\tfrac12" />,
    reason: <>Subtract a full turn. <Katex tex="\tfrac{4\pi}3" /> is in the third quadrant (cosine negative) with related angle <Katex tex="\tfrac\pi3" />, so the value is <Katex tex="-\cos\tfrac\pi3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n(10) = 1200+400\left(-\tfrac12\right) = 1000 \text{ wombats}}" />,
    reason: <>An exact whole number of wombats.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Cas fn="solve">solve(1200 + 400cos(πt/3) = 1000, t) | 0 ≤ t ≤ 12</Cas>,
    reason: <>First find every time the population <em>equals</em> <Katex tex="n(10)=1000" />; the intervals below it lie between those times. CAS gives <Katex tex="t=2,4,8,10" />.</>,
  },
  {
    working: <Katex display tex="400\cos\!\left(\tfrac{\pi t}{3}\right) = -200 \implies \cos\!\left(\tfrac{\pi t}{3}\right) = -\tfrac12" />,
    reason: <>By hand (same result): rearrange for the cosine.</>,
  },
  {
    working: <Katex display tex="\tfrac{\pi t}{3} = \tfrac{2\pi}{3},\ \tfrac{4\pi}{3},\ \tfrac{8\pi}{3},\ \tfrac{10\pi}{3}" />,
    reason: <>Cosine is negative in quadrants 2 and 3, related angle <Katex tex="\tfrac\pi3" />. For <Katex tex="0\le t\le12" /> the argument runs 0 to <Katex tex="4\pi" />: two turns, four solutions.</>,
    more: <>The first turn gives <Katex tex="\pi-\tfrac\pi3=\tfrac{2\pi}3" /> and <Katex tex="\pi+\tfrac\pi3=\tfrac{4\pi}3" />; adding <Katex tex="2\pi" /> to each gives <Katex tex="\tfrac{8\pi}3" /> and <Katex tex="\tfrac{10\pi}3" /> in the second turn.</>,
  },
  {
    working: <Katex display tex="t = 2,\ 4,\ 8,\ 10" />,
    reason: <>Multiply each by <Katex tex="\tfrac3\pi" />. The second pair is the first pair plus one period (6 months).</>,
    more: <>The report says some students did not find all the <Katex tex="t" /> values. The usual slip is stopping after one cycle (<Katex tex="t=2,4" />), which gives only 2 months below 1000. Over 12 months a 6-month cycle happens twice, so there must be a second dip.</>,
  },
  {
    working: <Katex display tex="n(3) = 1200-400 = 800 < 1000" />,
    reason: <>Test a point inside <Katex tex="(2,4)" />: the population is below 1000 there. By periodicity, the same holds on <Katex tex="(8,10)" />.</>,
    more: <>On the rest of the year (0 to 2, 4 to 8, 10 to 12) the population is above 1000, e.g. <Katex tex="n(0)=n(6)=1600" />. The dips sit around the minima at <Katex tex="t=3" /> and <Katex tex="t=9" />.</>,
  },
  {
    working: <Katex display tex="\text{time below} = (4-2)+(10-8) = 4 \text{ months}" />,
    reason: <>Two intervals of two months each.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{4}{12} = \frac13}" />,
    reason: <>The question asks for a <em>fraction of time</em>: 4 months out of 12, so <Katex tex="\tfrac13" /> of the year.</>,
    more: <>The report says many students obtained 4 months but did not find the fraction, and some wrote their answers in terms of dates (the dips are 1 May to 1 July 2013 and 1 November 2013 to 1 January 2014). Neither answers the question asked.</>,
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
        topic="Period & Amplitude"
        marks={2}
        statement={<>Find the period and amplitude of the function <Katex tex="n" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Max & Min"
        marks={2}
        statement={<>Find the maximum and minimum populations of wombats in this location.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" topic="Function Value" marks={1} statement={<>Find <Katex tex="n(10)" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Trig Inequality"
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
        <Explore title="A 6-month cycle dips below 1000 twice in a year">
          <BelowLevel />
        </Explore>
      </PartCard>
    </div>
  )
}
